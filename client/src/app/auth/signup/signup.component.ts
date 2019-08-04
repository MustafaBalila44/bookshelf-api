import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Signup } from '../auth.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup: Signup = new Signup();
  errorMSG='';
  constructor(private authService: AuthService) { }
  accept = false;
  ngOnInit() {
  
  }

  onSubmit(form) {

     this.authService.signup(this.signup).subscribe((response) => {
       console.log(response);
     }, (error) => {
       this.errorMSG = error.statusText;
     });
  }

}
