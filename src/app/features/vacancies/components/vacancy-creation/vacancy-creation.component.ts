import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute } from "@angular/router";
import { DictionaryService } from "src/app/shared/services/dictionary.service";
import { VacanciesService } from "../../services/vacancies.service";

@Component({
    selector: 'vacancy-creation',
    templateUrl: './vacancy-creation.component.html',
    styleUrls: ['./vacancy-creation.component.scss']
})
export class VacancyCreationComponent implements OnInit {
    commonDataFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        unit: ['', Validators.required],
        city: [{id: '', name: ''}, Validators.required],
        owner: [{id: '', name: ''}, Validators.required],
        workFormat: [{id: '', name: ''}, Validators.required]
    });

    conditionsFormGroup = this.formBuilder.group({
        minSalary: ['', Validators.required],
        maxSalary: ['', Validators.required],
        publicSalary: ['', Validators.required],
        requiredExperience: [{id: '', name: ''}, Validators.required]
    });

    descriptionFormGroup = this.formBuilder.group({
        description: ['', Validators.required],
        requirements: ['', Validators.required],
        responsibilities: ['', Validators.required],
        benefits: ['', Validators.required]
    });

    skillsFormControl = new FormControl([]);
    skills: any[] = [];
    cities: any[] = [];
    owners: any[] = [];
    workFormats: any[] = [];
    requiredExpiriences: any[] = [];

    constructor(
        private vacanciesService: VacanciesService,
        private dictionaryService: DictionaryService,
        private formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute) {

    }
    ngOnInit(): void {
        this.getDictionaries();
    }

    getDictionaries() {
        this.getCities();
        this.getWorkFormats();
        this.getRequiredExpiriences();
        this.getOwners();
    }

    getCities() {
        this.dictionaryService.getCities().subscribe((result: any) => this.cities = result);
    }

    getWorkFormats() {
        this.dictionaryService.getWorkFormats().subscribe((result: any) => this.workFormats = result);
    }
    
    getRequiredExpiriences() {
        this.dictionaryService.getRequiredExpiriences().subscribe((result: any) => this.requiredExpiriences = result);
    }

    getOwners() {
        this.dictionaryService.getOwners().subscribe((result: any) => this.owners = result);
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

    createVacancy() {
        let vacancy = {
            "name": this.commonDataFormGroup.controls.name.value,
            "unitName" : this.commonDataFormGroup.controls.unit.value,
            "minSalary": this.conditionsFormGroup.controls.minSalary.value,
            "maxSalary": this.conditionsFormGroup.controls.maxSalary.value,
            "publicSalary": this.conditionsFormGroup.controls.publicSalary.value,
            "description": this.descriptionFormGroup.controls.description.value,
            "requirements": this.descriptionFormGroup.controls.requirements.value,
            "responsibilities": this.descriptionFormGroup.controls.responsibilities.value,
            "benefits": this.descriptionFormGroup.controls.benefits.value,
            "skills": this.skills.join(', '),
            "cityId": this.commonDataFormGroup.controls.city.value?.id,
            "ownerId": this.commonDataFormGroup.controls.owner.value?.id,
            "vacancyStatusId": 1,
            "workFormatId": this.commonDataFormGroup.controls.workFormat.value?.id,
            "requiredExperienceId": this.conditionsFormGroup.controls.requiredExperience.value?.id
        };
        this.vacanciesService.createVacancy(vacancy)
            .subscribe(

            );
    }
}
