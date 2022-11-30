import { Injectable } from "@angular/core";
import { signInWithEmailAndPassword, Auth } from "@angular/fire/auth";

@Injectable()
export class AuthService{

    constructor(private auth:Auth){}

    logIn(form:any){
        signInWithEmailAndPassword(this.auth, form.value.email, form.value.password)
        .then((val) => {
            console.log("User loged", val)
        })
        .catch((err) => {
            console.log(err.message)
            
        })
    }

}