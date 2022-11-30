import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { createUserWithEmailAndPassword } from "@firebase/auth";

@Injectable({providedIn:"root"})
export class AdminService{
    constructor(private auth:Auth, private fb:FormBuilder){}

    adminToken = false;
    
    adminLogin(form:any){
        signInWithEmailAndPassword(this.auth, form.value.email, form.value.password)
        .then((val) => {
            this.adminToken = true;
            console.log("User loged", val)
        })
        .catch((err) => {
            console.log(err.message)
        })
    };

    createAdmin(form:any){
        createUserWithEmailAndPassword(this.auth, form.value.email, form.value.password)
        .then((val) => {
            console.log("User created", val);
        })
        .catch((err) => {
            console.log(err.message);
        })
    };

    adminFormBuilder = this.fb.group({
        email: [""],
        password: [""]
    })

}