import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private admin:AdminService) { }

  ngOnInit(): void {
  }

  smileySmiles = "not-laughting";

  adminForm = this.admin.adminFormBuilder;

  adminLogin(form:any){
    if(form.valid){
      this.admin.adminLogin(form)
      this.smileySmiles = "laughting";
    }
    else{
      alert("Greska")
    }
  }

  //email: admin@gmail.com
  //password: admindjordje

  adminSignUp(form:any){
    if(form.valid){
      this.admin.createAdmin(form)
    }
    else{
      alert("Greska")
    }
  }

}
