import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, Firestore, doc, collectionData, updateDoc } from "@angular/fire/firestore";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { Duznici } from "../models/duznici";

@Injectable()
export class ServerService{


    constructor(private fb:FormBuilder, private firestore:Firestore){
    }

    private _$observer = new Subject<void>()
    get $observer(){
        return this._$observer;
    }
    addUser(form:any, typeOfPage){
        const dbInstance = collection(this.firestore, typeOfPage)
        return addDoc(dbInstance, form)
        .then((val) => {
            console.log("User added!\n", val);
            this._$observer.next()
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    removeUser(id, typeOfPage){
        const dbInstance = doc(this.firestore, typeOfPage + "/", id )
        return deleteDoc(dbInstance)
        
        .then((val) => {
            console.log("User with removed!\n", val)
        })
        .catch((err) => {
            console.log(err.message); 
        })
    }

    getUsers(typeOfPage){
        const dbInstance = collection(this.firestore, typeOfPage)
        return collectionData(dbInstance, {idField:"id"}) as Observable<any[]>
    }

    duzniciFormBuilder = this.fb.group({
        name: ["", Validators.required],
        debit: ["", Validators.required],
        whatHeTook: ["", Validators.required],
        date: ["", Validators.required],
    })

    evidencijaClanarineFormBuilder = this.fb.group({
        name:["", Validators.required],
        monthlyMembershipFee:["", Validators.required],
        phoneNum:["", Validators.required],
        dateForCalculate: [""],
        dateForShow: [""]
    })

    zapisDolaska = this.fb.group({
        name: ["", Validators.required],
        date: new Date()
    })

    perventWhiteSpace(event){
        if(event.target.selectionStart === 0 && event.keyCode == 32){
            event.preventDefault()
        }   return
    }

    updateUserDuznik(form:any, id){
        const userToUpdate = doc(this.firestore, "duznici", id )
        updateDoc(userToUpdate, {
            name: form.name,
            debit: form.debit,
            whatHeTook:form.whatHeTook
        })
        .then((val) => {
            console.log("User updated!", val);
        })
        .catch((err) => {
            console.error("Greska!");
            console.log(err);
        })
    }

    updateVezbacaClanarine(form, id){
        const userToUpdate = doc(this.firestore, "EvidencijaClanarine", id)
        return updateDoc(userToUpdate, {
            name: form.name,
            phoneNum: form.phoneNum,
            monthlyMembershipFee: form.monthlyMembershipFee
        })
    }

    
    oznacenaPromena:string;
    oznaciPromenu(){
       return this.oznacenaPromena = "oznacena-promena";
    }
}