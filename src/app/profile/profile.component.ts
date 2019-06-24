import { Component, OnInit } from '@angular/core';
import { AuthenticationService, CredentialsService, I18nService } from '@app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private credentialsService: CredentialsService) {}

  ngOnInit() {}

  get user(): any | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials : null;
  }
}
