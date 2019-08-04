import { Component, OnInit } from '@angular/core';
import { Requestbook } from '../request';
import {SendrequestService} from '../sendrequest.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  home: Requestbook = new Requestbook();

  constructor(private sendrequestService: SendrequestService) { }

  ngOnInit() {
  }
  onSubmit(form) {

    this.sendrequestService.Requestbook(this.home).subscribe((response) => {
      console.log(response); 
    
    } )
    
 
}
}




