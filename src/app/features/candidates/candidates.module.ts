import { NgModule } from "@angular/core";
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from "@angular/platform-browser";
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from "src/app/app-routing.module";
import { SharedModule } from "src/app/shared/shared,module";
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { CandidatesService } from "./services/candidates.service";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { CandidatesListComponent } from "./components/candidates-list/candidates-list.component";
import { CandidateApplicationsListComponent } from "./components/candidate-applications-list/candidate-applications-list.component";
import { CandidateCardComponent } from "./components/candidate-card/candidate-card.component";
import { CandidateApplicationCardComponent } from "./components/candidate-application-card/candidate-application-card.component";

@NgModule({
    declarations: [
        CandidatesListComponent,
        CandidateApplicationsListComponent,
        CandidateCardComponent,
        CandidateApplicationCardComponent
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
        CandidatesListComponent,
        CandidateApplicationsListComponent,
        CandidateCardComponent,
        CandidateApplicationCardComponent
    ],
    providers: [
        CandidatesService
    ]
})
export class CandidatesModule { }