import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, CredentialsService, I18nService } from '@app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private credentialsService: CredentialsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern('[a-z0-9.@]*')]],
      password: [this.user.password, [Validators.required, Validators.minLength(15)]],
      newPassword: ['', [Validators.required, Validators.minLength(15)]],
      newPasswordAgain: ['', [Validators.required, Validators.minLength(15)]]
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.username);
    console.log('Email', form.value.email);
    console.log('Password', form.value.password);
  }

  get user(): any | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials : null;
  }
}
