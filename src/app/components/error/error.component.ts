import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;

  constructor(public navService:NavbarService) { }

  ngOnInit(): void {
    this.navService.hide();
  }

}
