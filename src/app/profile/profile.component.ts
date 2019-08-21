import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, CredentialsService, untilDestroyed } from '@app/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  isLoading = false;
  messageProfileForm: any;
  messagePasswordForm: any;

  constructor(
    private fb: FormBuilder,
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  get user(): any | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials : null;
  }

  onSubmitProfileForm() {
    this.isLoading = true;
    const updateProfile$ = this.authenticationService.updateProfile(this.user.id, this.profileForm.value);
    updateProfile$
      .pipe(
        finalize(() => {
          this.profileForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        res => {
          this.messageProfileForm = { text: 'Your profile updated successfully', class: 'success' };
        },
        err => {
          this.messageProfileForm = { text: err.error.message, class: 'danger' };
        }
      );
  }

  onSubmitPasswordForm() {
    this.isLoading = true;
    const payload = {
      id: this.user.id,
      password: this.passwordForm.controls['password'].value,
      passwordNew: this.passwordForm.controls['passwordNew'].value
    };
    const updatePassword$ = this.authenticationService.updatePassword(this.user.id, payload);
    updatePassword$
      .pipe(
        finalize(() => {
          this.passwordForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        res => {
          this.messagePasswordForm = { text: 'Your password updated successfully', class: 'success' };
        },
        err => {
          this.messagePasswordForm = { text: err.error.message, class: 'danger' };
        }
      );
  }

  private createForm() {
    this.profileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern('[a-z0-9.@]*')]]
    });
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordNew: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfrim: ['', [Validators.required, Validators.minLength(8)]]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator = (): any => {
    if (this.passwordForm) {
      let data =
        this.passwordForm.get('passwordNew').value === this.passwordForm.get('passwordConfrim').value
          ? null
          : { mismatch: true };
      return data;
    }
  };
}
