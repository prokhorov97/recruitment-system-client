import { NgModule } from "@angular/core";
import { LoginService } from "./services/login.service";
import { RegistrationService } from "./services/registration.service";
import { AuthGuard } from "./helpers/auth.guard";
import { TokenInterceptor } from "./helpers/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { GratitudeComponent } from "./components/gratitude/gratitude.component";

@NgModule({
    declarations: [
        NotFoundComponent,
        GratitudeComponent
    ],
    exports: [
        NotFoundComponent,
        GratitudeComponent
    ],
    providers: [
        LoginService,
        RegistrationService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ]
})
export class CoreModule {}