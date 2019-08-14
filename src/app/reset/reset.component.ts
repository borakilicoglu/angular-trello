import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';

const log = new Logger('Reset');

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit, OnDestroy {
  version: string = environment.version;
  error: string | undefined;
  resetForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {}

  public id: string;
  public date: string;
  public message: string;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap
      .get('params')
      .substring(0, this.route.snapshot.paramMap.get('params').lastIndexOf('-'));
    this.date = this.route.snapshot.paramMap
      .get('params')
      .substr(this.route.snapshot.paramMap.get('params').lastIndexOf('-') + 1);
    this.createForm();
  }

  ngOnDestroy() {}

  reset() {
    this.isLoading = true;
    this.resetForm.controls['id'].setValue(this.id);
    this.resetForm.controls['date'].setValue(this.date);
    console.log(this.resetForm.value);
    const reset$ = this.authenticationService.resetPassword(this.resetForm.value);
    reset$
      .pipe(
        finalize(() => {
          this.resetForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        credentials => {
          this.message = 'True.';
          // log.debug(`${credentials.username} successfully logged in`);
          // this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
        },
        error => {
          log.debug(`Reset error: ${error}`);
          this.error = error;
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

  createForm() {
    this.resetForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        passwordConfrim: ['', Validators.required],
        id: [''],
        date: ['']
      },
      { validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator = () => {
    if (this.resetForm) {
      let data =
        this.resetForm.get('password').value === this.resetForm.get('passwordConfrim').value
          ? null
          : { mismatch: true };
      return data;
    }
  };
}
