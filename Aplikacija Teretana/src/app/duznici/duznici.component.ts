import { Component, OnDestroy, OnInit } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Duznici } from '../shared/models/duznici';
import { ServerService } from '../shared/services/server.service';

@Component({
  selector: 'app-duznici',
  templateUrl: './duznici.component.html',
  styleUrls: ['./duznici.component.css']
})
export class DuzniciComponent implements OnInit, OnDestroy {

  constructor(private server:ServerService, private route:ActivatedRoute, private firestore:Firestore, private fb:FormBuilder) { }
  ngOnInit() {
    this.nameParams = this.route.snapshot.paramMap.get("name")
    this.uzmiDuznike()
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe
    
  }

  userForUpdateID:any;
  nameParams:string;
  showLessDate = false;
  enableEdit = false;
  enableEditObject:any = null;
  promeniDate(){
    this.showLessDate = !this.showLessDate;
  }
  duzniciFormBuilderAdd = this.server.duzniciFormBuilder;
  duzniciFormBuilderEdit:any = this.server.duzniciFormBuilder;
  duznici:any[] = [];
  // duznici:any = [];

  datum: Date;
  $subs:Subscription;

  uzmiDuznike(){
      this.$subs = this.server.getUsers(this.nameParams).subscribe((val) => {
       return this.duznici = val
    })
    return this.duznici
    }

  chosenObjectForEdit(id){
    this.userForUpdateID = id;
     this.enableEditObject = this.duznici.find(x => x.id == id)
     console.log(this.enableEditObject);
     

     this.duzniciFormBuilderEdit = this.fb.group({
        name: [this.enableEditObject.name],
        debit: [this.enableEditObject.debit],
        whatHeTook: [this.enableEditObject.whatHeTook]
     })
     console.log(this.enableEditObject);
  }

  dodajDuznike(form){
    if(form.valid){
      let getCurrentDate = Date.now()
      form.value.date = getCurrentDate
      this.server.addUser(form.value, this.nameParams)
    }
  }

  perventWhiteSpace(event){
    this.server.perventWhiteSpace(event)
  }

  obrisiDuznika(id){
    let potvrdi = confirm("Da li zelite da obrisete ovog korisnika?")
    potvrdi ? this.server.removeUser(id, this.nameParams) : null
  }

  onSubmitEditUser(form:any){
    this.server.updateUserDuznik(form.value, this.userForUpdateID)
    this.enableEditObject = undefined;
  }

  findUser:string;
  

  page = 1;
  totalRecords:string;





  formaGrupaEdit = this.fb.group({
    name:[""],
    age:[""]
  })

  listaZdravihLjudi:any[] = []
  zapocniEdit:any;
  idZaEdit

  uzmiCovekaZaEdit(id){
    this.idZaEdit = id;
    
    this.zapocniEdit = !this.zapocniEdit;
    this.zapocniEdit = this.listaZdravihLjudi.find(x => x.id == id)

    this.formaGrupaEdit = this.fb.group({
      name: [this.zapocniEdit.name],
      age: [this.zapocniEdit.age]
    })
  }

  pogledajZdrave(){
    console.log(this.listaZdravihLjudi);
    
  }

}