import { NgModule } from "@angular/core";
import { ModalComponent } from "./components/modal/modal.component";
import { ModalService } from "./services/modal.service";
import { MatIconModule } from "@angular/material/icon";
import { PhoneInputComponent } from "./components/phone-input/phone-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DictionaryService } from "./services/dictionary.service";

@NgModule({
    declarations: [
        ModalComponent,
        PhoneInputComponent
    ],
    exports: [
        ModalComponent,
        PhoneInputComponent
    ],
    providers: [
        ModalService,
        DictionaryService
    ],
    imports: [
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {}