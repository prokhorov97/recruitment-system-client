import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'vacancy-creation',
    templateUrl: './vacancy-creation.component.html',
    styleUrls: ['./vacancy-creation.component.scss']
})
export class VacancyCreationComponent {
    commonDataFormGroup = this.formBuilder.group({
        city: ['', Validators.required],
        owner: ['', Validators.required],
        work_format: ['', Validators.required]
    });

    conditionsFormGroup = this.formBuilder.group({
        min_salary: ['', Validators.required],
        max_salary: ['', Validators.required],
        public_salary: ['', Validators.required],
        required_experience: ['', Validators.required]
    });

    descriptionFormGroup = this.formBuilder.group({
        description: ['', Validators.required],
        requirements: ['', Validators.required],
        responsibilities: ['', Validators.required],
        benefits: ['', Validators.required]
    });


    skillsFormControl = new FormControl([]);
    skills: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute) {

    }

    removeSkill(keyword: string) {
        const index = this.skills.indexOf(keyword);
        if (index >= 0) {
            this.skills.splice(index, 1);
        }
    }

    addSkill(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our keyword
        if (value) {
            this.skills.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();
    }
}