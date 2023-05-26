import { NgModule } from "@angular/core";
import { VacanciesListComponent } from "./components/vacancies-list/vacancies-list.component";
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from "@angular/platform-browser";
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { VacancyCardComponent } from "./components/vacancy-card/vacancy-card.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { SharedModule } from "src/app/shared/shared,module";
import { MatStepperModule } from '@angular/material/stepper';
import { VacancyApplicationComponent } from "./components/vacancy-application/vacancy-application.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { VacanciesService } from "./services/vacancies.service";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { VacancyCreationComponent } from "./components/vacancy-creation/vacancy-creation.component";

@NgModule({
    declarations: [
        VacanciesListComponent,
        VacancyCardComponent,
        VacancyApplicationComponent,
        VacancyCreationComponent
    ],
    imports: [
        MatListModule,
        BrowserModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        AppRoutingModule,
        SharedModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatChipsModule
    ],
    exports: [
        VacanciesListComponent,
        VacancyCardComponent,
        VacancyApplicationComponent,
        VacancyCreationComponent
    ],
    providers: [
        VacanciesService
    ]
})
export class VacanciesModule { }