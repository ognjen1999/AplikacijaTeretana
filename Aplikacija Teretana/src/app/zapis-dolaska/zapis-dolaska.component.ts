import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ZapisDolaska } from '../shared/models/zapisDolaska';
import { ServerService } from '../shared/services/server.service';

@Component({
  selector: 'app-zapis-dolaska',
  templateUrl: './zapis-dolaska.component.html',
  styleUrls: ['./zapis-dolaska.component.css']
})
export class ZapisDolaskaComponent implements OnInit, OnDestroy {

  constructor(private router:Router, private route:ActivatedRoute, private server:ServerService) { }

  zapisDolaskaBuilder = this.server.zapisDolaska;
  $subs : Subscription;
  
  sati = false;
  PokaziSate(){
    this.sati = !this.sati;
  }
  listaDolaskaVezbacaGrupisano:any = [];
  listaDolazakaVezbaca:any = []
  onSearch:any;

  listaDolaskaVezbacaPoGrupama:any;

  listaDolaskaVezbaca:any[] = []
  listaEvidencijaClanarina:any = []

  nameParams:string
  ngOnInit(): void {
   this.nameParams = this.route.snapshot.paramMap.get("name")
   this.uzmiListuDolaskaVezbaca()
   this.uzmiListuEvidencijaClanarine()
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe
  }

  zapisiDolazakKorisnika(form){
    let proveriValidnostImena = this.listaEvidencijaClanarina.some((e) => {
     
        return e.name.toLowerCase() == form.value.name.toLowerCase();
    })
    if(form.valid){

    if(proveriValidnostImena){
     this.zapisiDolazakVezbaca(form)
    }
    else{
      alert("Ovaj vezbac nema uplacenu clanarinu!\nIli mu je istekla.")
    }
    
      }
    
    else{
      alert("Something went wrong")
    }
    console.log(form.value);
  }

  zapisiDolazakVezbaca(form){
    let currentDate = new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear();
      let time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
      form.value.date = currentDate
      form.value.time = time
      this.server.addUser(form.value, this.nameParams)
  }

  uzmiListuDolaskaVezbaca() {
   this.$subs = this.server.getUsers(this.nameParams)
   .subscribe((val) => {
     this.listaDolaskaVezbaca = val;
     this.listaDolaskaVezbacaGrupisano = [];
     this.listaDolaskaVezbaca.forEach((e) => {

      let datumPostoji: boolean = this.listaDolaskaVezbacaGrupisano.some((d) => {
        return e.date == d.date;
      });

      datumPostoji ? this.dodajLjudeUPostojecuGrupu(e) : this.dodajLjudeGrupisano(e)
      
    })
   })
  }

  dodajLjudeGrupisano(e){
    this.listaDolaskaVezbacaGrupisano.push({
      date: e.date,
      listaDolazakaVezbaca: [{
        name: e.name,
        date: e.date,
        time: e.time
      },]
    })
  }

  dodajLjudeUPostojecuGrupu(e){
      let grupa = this.listaDolaskaVezbacaGrupisano.find((v) => {
          return e.date == v.date;
        });
        
        if(grupa){
          grupa.listaDolazakaVezbaca.push({
            name: e.name,
            date: e.date,
            time: e.time
          });
        }
  }

  uzmiListuEvidencijaClanarine(){
    this.$subs = this.server.getUsers("EvidencijaClanarine").subscribe((v) => {
      this.listaEvidencijaClanarina = v;

      
    })
  }

  page = 1;
  totalRecords:string;

  logujListe(){
    console.log(this.listaDolaskaVezbacaGrupisano);
    console.log(this.listaDolaskaVezbaca);
  }
}