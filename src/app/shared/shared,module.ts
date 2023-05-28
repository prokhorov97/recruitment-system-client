import { NgModule } from "@angular/core";
import { ModalComponent } from "./components/modal/modal.component";
import { ModalService } from "./services/modal.service";
import { MatIconModule } from "@angular/material/icon";
import { PhoneInputComponent } from "./components/phone-input/phone-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DictionaryService } from "./services/dictionary.service";
import { MatListModule } from "@angular/material/list";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CalendarService } from "./services/calendar.service";

@NgModule({
    declarations: [
        ModalComponent,
        PhoneInputComponent,
        CalendarComponent
    ],
    exports: [
        ModalComponent,
        PhoneInputComponent,
        CalendarComponent
    ],
    providers: [
        ModalService,
        DictionaryService,
        CalendarService
    ],
    imports: [
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule
    ]
})
export class SharedModule {}