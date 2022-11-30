import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DuzniciComponent } from './duznici/duznici.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EvidencijaClanarineComponent } from './evidencija-clanarine/evidencija-clanarine.component';
import { ZapisDolaskaComponent } from './zapis-dolaska/zapis-dolaska.component';
import { ServerService } from './shared/services/server.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FilterPipe } from './shared/cumstomPipes/filter.pipe';
import { AuthService } from './shared/services/auth.service';
import {SortPipe} from "./shared/cumstomPipes/sort.pipe";
import { NgxMaskModule } from 'ngx-mask';
import { LoginAdminComponent } from "./admin/login-admin/login-admin.component";
import { EvidencijaPrometaComponent } from './admin/evidencija-prometa/evidencija-prometa.component';
import { AdminService } from './shared/services/admin.service';
import { UsersExpiredComponent } from './users-expired/users-expired.component';
import { guardService } from './shared/services/guard.service';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FilterDatePipe } from './shared/cumstomPipes/filterDate.pipe';

const appRoutes:Routes = [
  {path:"duznici/:name", component:DuzniciComponent},
  {path:"Clanarina/:name", component:EvidencijaClanarineComponent},
  {path:"zapisDolaska/:name", component:ZapisDolaskaComponent},
  {path:"login-admin", component:LoginAdminComponent},
  {path:"evidencija-prometa", component:EvidencijaPrometaComponent, 
  canActivate:[guardService]
},
  {path:"users-expired", component:UsersExpiredComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    DuzniciComponent,
    EvidencijaClanarineComponent,
    ZapisDolaskaComponent,
    FilterPipe,
    FilterDatePipe,
    SortPipe,
    LoginAdminComponent,
    EvidencijaPrometaComponent,
    UsersExpiredComponent
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  providers: [ServerService, AuthService, AdminService, guardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
