import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userForm: FormGroup;
  rolList = [];
  constructor(private formBuilder: FormBuilder, private apiSrvc: ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: ['', [Validators.compose([Validators.required, Validators.email])]],
      password: ['', [Validators.compose([Validators.required])]],
    });

    this.apiSrvc.getAll('rol').subscribe((a: any) => {
      this.rolList = a.body.role;
    });

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.compose([Validators.required])]],
      mail: ['', [Validators.compose([Validators.required, Validators.email])]],
      password: ['', [Validators.compose([Validators.required])]],
      id_rol: ['', [Validators.compose([Validators.required])]]
    });
  }

  logIn(): void {

  }

  saveUser() {
    this.apiSrvc.create('user', this.userForm.value).subscribe(a => {
      alert('Se guardo');
    })
  }

}
