import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Signin } from '../auth.model';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signin: Signin = new Signin();
  errorMSG='';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  
  }

  onSubmit(form) {
     this.authService.signin(this.signin).subscribe((response) => {
       console.log(response);
     }, (error) => {
      this.errorMSG = error.statusText;
    });
  }

} 
