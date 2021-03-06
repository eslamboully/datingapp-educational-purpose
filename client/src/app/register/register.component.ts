import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  // model: any = {}
  registerForm: FormGroup;
  constructor(private accountService: AccountService,private toastr: ToastrService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm () {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('',Validators.required),
    //   password: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('',[Validators.required,this.matchValues('password')]),
    
    // });

    this.registerForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required,this.matchValues('password')]]
    });

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  matchValues(matchTo: string) : ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true};
    } 
  }

  register() {
    // this.accountService.register(this.registerForm).subscribe( reponse => {
      // this.cancel();
    // },error => {
      // error.forEach(errorElement => {
        // this.toastr.error('error');
      // });
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
