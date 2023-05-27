import { NgModule } from "@angular/core";
import { LoginService } from "./services/login.service";
import { RegistrationService } from "./services/registration.service";
import { AuthGuard } from "./helpers/auth.guard";
import { TokenInterceptor } from "./helpers/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { GratitudeComponent } from "./components/gratitude/gratitude.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from "./components/login/login.component";

@NgModule({
    declarations: [
        NotFoundComponent,
        GratitudeComponent,
        RegistrationComponent,
        LoginComponent
    ],
    exports: [
        NotFoundComponent,
        GratitudeComponent,
        RegistrationComponent,
        LoginComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
    ],
    providers: [
        LoginService,
        RegistrationService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
})
export class CoreModule {}