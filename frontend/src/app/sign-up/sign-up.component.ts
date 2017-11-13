import { Component, OnInit } from '@angular/core';
import { ConnectDbService } from '../connect-db.service';
import { Router } from '@angular/router';
import { VerifySignUpComponent } from '../verify-sign-up/verify-sign-up.component';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  text:String='';
  userDetails: FormGroup;
  

  constructor(public connect: ConnectDbService, public router: Router, public fb: FormBuilder) {
    this.userDetails = fb.group({
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      pasword: ['', [Validators.minLength(6),Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      phoneNumber: ['', [Validators.required]]
    })
   }

  makeid() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++){
      this.text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return this.text;
  }

  signup() {
    if(){

    }
      else {

   // window.open("http://localhost:4200/verify", "", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
   // this.makeid();
  //  this.Newuser.code = this.text;
    this.connect.PostUser(this.Newuser).subscribe(res => { })
  }

  }

  cancel() {
    this.Newuser.email = "";
    this.Newuser.phoneNumber = "";
    this.Newuser.password = "";
    this.Newuser.name = "";
  }


  ngOnInit() {
  }

}
