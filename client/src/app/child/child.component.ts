import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  navbarOpen = false;
  sticky = true

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  constructor() { }

  ngOnInit() {
  }

}



