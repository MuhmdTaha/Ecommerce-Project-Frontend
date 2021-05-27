import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private usersService: UsersService, public router:Router) {
  }
  @Input() public user;
  id;

  ngOnInit(): void {
    this.updateInfoForm = new FormGroup({
      userName: new FormControl(this.user.userName, Validators.required),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      password: new FormControl(),
      gender: new FormControl(this.user.gender, Validators.required),
      // image: new FormControl(this.user.image, Validators.required),
    })
    this.id = this.user._id;
  }
  
  subscriber;
  updateInfoForm;


  get userName() {
    return this.updateInfoForm.get('userName');
  }
  get email() {
    return this.updateInfoForm.get('email');
  }
  get password() {
    return this.updateInfoForm.get('password');
  }
  get gender() {
    return this.updateInfoForm.get('gender');
  }
  // get image(){
  //   return this.updateInfoForm.get('image');
  // }

  


  onClickUpdateInfoSubmit(){
    if (this.updateInfoForm.valid) {
      let updatedUser = this.updateInfoForm.value;
      this.updateUser(this.user._id, updatedUser);
      this.activeModal.close();
      location.reload();
    }
    else{
      this.updateInfoForm.markAllAsTouched();
    }
  }

  updateUser(id, updatedUser) {
    this.subscriber = this.usersService.updateUser(id, updatedUser).subscribe(
      res => {
        this.user = res;
        this.user._id=this.id;
        localStorage.setItem('token', res['token']);
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnDestroy():void{
  }

}