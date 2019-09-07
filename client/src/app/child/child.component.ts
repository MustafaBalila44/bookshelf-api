import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  navbarOpen = false;
  sticky = true;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(public auth : AuthService) { }

  ngOnInit() {
    
  }

  signout(){
    this.auth.logoutUser();
  }

}



