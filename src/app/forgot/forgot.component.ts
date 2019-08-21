import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Forgot');

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit, OnDestroy {
  version: string = environment.version;
  error: string | undefined;
  resetForm!: FormGroup;
  isLoading = false;
  message: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  forgot() {
    this.isLoading = true;
    const forgot$ = this.authenticationService.forgotPassword(this.resetForm.value.email);
    forgot$
      .pipe(
        finalize(() => {
          this.resetForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        res => {
          this.message = {
            text:
              "Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.",
            class: 'success',
            freeze: true
          };
          console.log(this.message);
        },
        err => {
          log.debug(`Reset error: ${err}`);
          this.message = {
            text: err.error.message,
            class: 'danger'
          };
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
}
