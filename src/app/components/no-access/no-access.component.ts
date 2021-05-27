
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.css']
})
export class NoAccessComponent implements OnInit {
  faLock = faLock;
  constructor(public navService:NavbarService) { }

  ngOnInit(): void {
    this.navService.hide();
  }

}