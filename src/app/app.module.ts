import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { BoardsModule } from './boards/boards.module';
import { BoardModule } from './board/board.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { ForgotModule } from './forgot/forgot.module';
import { ResetModule } from './reset/reset.module';
import { RecoveryModule } from './recovery/recovery.module';
import { ListModule } from './list/list.module';
import { CardModule } from './card/card.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    BoardsModule,
    BoardModule,
    AboutModule,
    LoginModule,
    RegisterModule,
    ForgotModule,
    ResetModule,
    RecoveryModule,
    ProfileModule,
    CardModule,
    ListModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, AlertComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
