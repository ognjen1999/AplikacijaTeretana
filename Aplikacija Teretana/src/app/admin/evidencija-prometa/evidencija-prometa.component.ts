import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ServerService } from 'src/app/shared/services/server.service';
// declare var google:any;
declare function chart(): void;

@Component({
  selector: 'app-evidencija-prometa',
  templateUrl: './evidencija-prometa.component.html',
  styleUrls: ['./evidencija-prometa.component.css']
})
export class EvidencijaPrometaComponent implements OnInit, OnDestroy {

  constructor( private admin:AdminService, private server:ServerService ) { }

  trenutnaCenaClanarine:any;
  private $subscriber:Subscription;

  ukupnaCifraDuznika:number = 0;
  ukupnaZaradaZaOvajMesec:number = 0;
  
  ngOnDestroy() {
    this.admin.adminToken = false;
    this.$subscriber.unsubscribe;
  }
  
  ngOnInit() {
    chart()
    this.getUsers();
    this.uzmiDuznike();

  }
  uzmiKljuc = localStorage.getItem("kljuc")

  editCurrentPrice:boolean = false;;

  toggleEditCurrentPrice(){
    this.editCurrentPrice = !this.editCurrentPrice
  }

  PromeniCenuClanarine(novaCena:any){
    localStorage.setItem("vrednostClanarine", JSON.stringify(novaCena))
  }

  listaVezbacaClanarine:any;

  getUsers(){
    this.$subscriber = this.server.getUsers("EvidencijaClanarine").subscribe((val) => {
      this.listaVezbacaClanarine = val;
      this.ukupnoAktivnihVezbaca()
      this.trenutnaCenaClanarine = JSON.parse(localStorage.getItem("vrednostClanarine"))
       

     })
   }
   trenutnoAktivnihVezbaca = localStorage.getItem("trenutnoAktivnihVezbaca");

   ukupnoAktivnihVezbaca(){
    let listaMesecne = this.listaVezbacaClanarine.filter((x) => {
      return x.monthlyMembershipFee >= 1
    })
    this.trenutnoAktivnihVezbaca = listaMesecne.length;
    localStorage.setItem("trenutnoAktivnihVezbaca", this.trenutnoAktivnihVezbaca)
    
    
   }


   listaDuznika:any = []

   uzmiDuznike(){
    this.$subscriber = this.server.getUsers("duznici").subscribe((val) => {
       this.listaDuznika = val

       val.forEach((e:any) => {
        return this.ukupnaCifraDuznika += parseInt(e.debit)
       })
    })
   }


}