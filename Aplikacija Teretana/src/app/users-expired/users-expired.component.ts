import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerService } from '../shared/services/server.service';

@Component({
  selector: 'app-users-expired',
  templateUrl: './users-expired.component.html',
  styleUrls: ['./users-expired.component.css']
})
export class UsersExpiredComponent implements OnInit, OnDestroy {

  constructor(private server:ServerService) { }

  ngOnInit() {
    this.getUsers()
  }

  $subscriber:Subscription;
  
  ngOnDestroy(){
    this.$subscriber.unsubscribe
  }

  usersExpiredList:any = [];

  getUsers(){
   this.$subscriber = this.server.getUsers("EvidencijaClanarine").subscribe((val) => {
      this.usersExpiredList = val.filter(v => v.monthlyMembershipFee <= 0);
    })
  }

  ukupnoObrisanihVezbaca

  removeUser(id){
    this.server.removeUser(id, "EvidencijaClanarine")

    let obrisaniVezbaci = localStorage.getItem("ukupnoObrisanihClanova")
      this.ukupnoObrisanihVezbaca = (parseInt(obrisaniVezbaci) + 1)
      console.log(this.ukupnoObrisanihVezbaca);
      localStorage.setItem("ukupnoObrisanihClanova", JSON.stringify(this.ukupnoObrisanihVezbaca))
  }
}