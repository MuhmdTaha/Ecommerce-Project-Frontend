import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @Output() loginEvent = new EventEmitter();

  constructor(public router:Router, private usersService: UsersService, private route: ActivatedRoute) { }


  ngOnInit(): void {
  }
  subscriber;
  loginForm = new FormGroup({
    email:new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    password:new FormControl('',Validators.required),
    remember:new FormControl(false)
  })

  invalidLogin;

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  onClickLoginSubmit(){
    if(this.loginForm.valid){
      let user = this.loginForm.value;
      this.loginUser(user);
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

  loginUser(user){
    this.subscriber = this.usersService.loginUser(user).subscribe(
      res => {
        if (res){
          localStorage.setItem('token', res['token']);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
        else{
          this.invalidLogin = true;
        }    
      },
      err => {
        this.invalidLogin = true;
        console.log("error",err);
      }
    )
  }

  ngOnDestroy(): void {
  }


}