import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Output() registerEvent = new EventEmitter();

  constructor(
    public router: Router,
    private usersService: UsersService,
    public navService: NavbarService
  ) {}

  ngOnInit(): void {
    this.navService.show();
  }

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    image: new FormControl(),
  });

  get userName() {
    return this.registerForm.get('userName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get gender() {
    return this.registerForm.get('gender');
  }

  subscriber;

  onClickRegisterSubmit() {
    if (this.registerForm.valid) {
      let user = this.registerForm.value;
      if (user.gender == 'female') {
        user.image = 'https://localhost:4001/defaultfemale.jpeg';
      } else {
        user.image = 'https://localhost:4001/defaultmale.jpg';
      }
      this.registerEvent.emit(user);
      this.registerUser(user);
      this.router.navigateByUrl('');
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  registerUser(user) {
    this.subscriber = this.usersService.registerUser(user).subscribe(
      (res) => {
        if (res) {
          localStorage.setItem('token', res['token']);
          this.router.navigate(['/']);
        } else {
          // this.invalidLogin = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {}
}