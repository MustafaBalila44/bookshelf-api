


import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
 
})
export class  StatusComponent implements OnInit {
 
  isLinear = false;

  isEditable = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
  

  }

}
















