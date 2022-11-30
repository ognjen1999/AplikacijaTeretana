import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AdminService } from './shared/services/admin.service';
import { ServerService } from './shared/services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router, public admin:AdminService, public server:ServerService){}

  ngOnInit(): void {
    this.getUsers()
    this.mesecnaClanarina = JSON.parse(localStorage.getItem("vrednostClanarine"))
  }

  $sbj = new Subject<void>()

  showProgram = false;
  showExpiredUsers = false;

  listaVezbaca:any = []
  counter:any;

  toggleShowHideProgram(){
    this.showProgram = !this.showProgram
    console.log(this.showProgram);
  }

  adminMode = false;

  goLoginAdmin(){
    this.adminMode = !this.adminMode;
    this.adminMode ? this.router.navigate(["login-admin"]) : this.router.navigate(["Clanarina/" + "EvidencijaClanarine"])
  }

  checkUsersExpired(){
    this.router.navigate(["users-expired"])
  }

  getUsers(){
   this.server.getUsers("EvidencijaClanarine").subscribe((v) => {
     this.listaVezbaca = v;

     this.counter = v.filter(x => x.monthlyMembershipFee == 0).length
   })
  }

  mesecnaClanarina:any;

  today = new Date()


}