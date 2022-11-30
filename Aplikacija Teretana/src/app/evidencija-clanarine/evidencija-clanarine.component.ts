import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerService } from '../shared/services/server.service';

@Component({
  selector: 'app-evidencija-clanarine',
  templateUrl: './evidencija-clanarine.component.html',
  styleUrls: ['./evidencija-clanarine.component.css']
})
export class EvidencijaClanarineComponent implements OnInit, OnDestroy {

  constructor(private server:ServerService, private route:ActivatedRoute, private fb:FormBuilder) { }
  nameParams:string;
  ngOnInit(): void {
    this.nameParams = this.route.snapshot.paramMap.get("name")
    this.getUsers()
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe
  }

  onSearch:string;

  $subs : Subscription;

  timeMode = false;
  editUserObject:any;

  toggleTimeMode(){
    this.timeMode = !this.timeMode
  }

  userForEditId

  startEditingUser(id){
    this.editUserObject = this.listaClanarine.find(x => x.id == id)
    this.userForEditId = id;
    console.log(this.editUserObject);

    this.clanarineFormGroupEdit = this.fb.group({
      name: [this.editUserObject.name, Validators.required],
      monthlyMembershipFee: [this.editUserObject.monthlyMembershipFee, Validators.required],
      phoneNum: [this.editUserObject.phoneNum, Validators.required]
  })
  }

  finishEditing(form){
    this.server.updateVezbacaClanarine(form.value, this.userForEditId)
    

    this.editUserObject = undefined;
  }

  listaClanarine:any = []

  clanarineFormGroup:any = this.server.evidencijaClanarineFormBuilder;
  clanarineFormGroupEdit:any = this.server.evidencijaClanarineFormBuilder;

  ukupnoSvihClanova:number;

  onSubmit(form){
    if(form.valid){

     this.dodajVezbacaClanarine(form)
     this.dodajCountULokalStorage()
  }
    }

    dodajVezbacaClanarine(form){
      let dateForShow = Date.now()
      let dateForCalculate = [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()]
    form.value.dateForCalculate = dateForCalculate
    form.value.dateForShow = dateForShow

    this.server.addUser(form.value, this.nameParams)
    }

      //Koristim da bi ga kasnije ubacio u grafikon koji se nalazi
      //na ruti evidencija prometa
    dodajCountULokalStorage(){
      let ukupniVezbaci = localStorage.getItem("ukupnoSvihClanova")
      this.ukupnoSvihClanova = (parseInt(ukupniVezbaci) + 1)
      console.log();
      
      localStorage.setItem("ukupnoSvihClanova", JSON.stringify(this.ukupnoSvihClanova))
    }

  getUsers(){
   this.$subs = this.server.getUsers(this.nameParams).subscribe((val) => {
       this.listaClanarine = val
       if(new Date().getMinutes() == 25){
         this.oduzmiOmogucenoDugme()
       }
    })
    return this.listaClanarine
  }

  //Koristim da bi ga kasnije ubacio u grafikon koji se nalazi
  //na ruti evidencija prometa
  ukupnoObrisanihVezbaca;

  removeUser(id){
    let potvrdi = confirm("Da li zelite da obrisete ovog korisnika ?")
    if(potvrdi){
      this.server.removeUser(id, this.nameParams)


      let obrisaniVezbaci = localStorage.getItem("ukupnoObrisanihClanova")
      this.ukupnoObrisanihVezbaca = (parseInt(obrisaniVezbaci) + 1)
      console.log(this.ukupnoObrisanihVezbaca);
      localStorage.setItem("ukupnoObrisanihClanova", JSON.stringify(this.ukupnoObrisanihVezbaca))
    }
  }

  page = 1;
  totalRecords:string;

  omoguciDugmeDisable:any = false;

  //funkcija koja nadgleda vezbacev datum i oduzima mu mesecnu clanarnu za jedan
  //ako je proslo mesec dana
  oduzmiOmogucenoDugme(){
    localStorage.removeItem("dugmeZaMesece")
    this.omoguciDugmeDisable = true;
    let uzmiDanasnjiDan = new Date().getDate()
    this.listaClanarine.forEach((e) => {
      let stoniranje = this.listaClanarine.filter((x) => {
        return x.dateForCalculate[0] == uzmiDanasnjiDan
      })
      if(e.dateForCalculate[0] == uzmiDanasnjiDan){

        this.clanarineFormGroupEdit = this.fb.group({
      name: [stoniranje.name, Validators.required],
      monthlyMembershipFee: [stoniranje.monthlyMembershipFee -1, Validators.required],
      phoneNum: [stoniranje.phoneNum, Validators.required]
        })
      }
    })
  }

}