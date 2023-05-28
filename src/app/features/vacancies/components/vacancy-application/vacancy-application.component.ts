import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { VacanciesService } from "../../services/vacancies.service";
import { DictionaryService } from "src/app/shared/services/dictionary.service";

@Component({
    selector: 'vacancy-application',
    templateUrl: './vacancy-application.component.html',
    styleUrls: ['./vacancy-application.component.scss']
})
export class VacancyApplicationComponent implements OnInit { 
    cities: any[] = [];
    degrees: any[] = [];
    requiredExpiriences: any[] = [];

    personDataFormGroup = this.formBuilder.group({
        city: [{}, Validators.required],
        last_name: ['', Validators.required],
        first_name: ['', Validators.required],
        mid_name: ['', Validators.required],
        birthday: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone:  ['',  [Validators.required, Validators.pattern('[7-8]{1}[0-9]{9}')]], 
        telegram: ['', Validators.required]
    });
    
    educationFormGroup = this.formBuilder.group({
        educations: this.formBuilder.array([])
    });

    skillsFormControl = new FormControl([]);

    expirienceFormGroup = this.formBuilder.group({
        experiences: this.formBuilder.array([])
    });

    finalFormGroup = this.formBuilder.group({
        expectedSalary: [NaN, Validators.required],
        description: [''],
    });
    
    skills: any[] = [];
    isAgree: boolean = false;
    vacancyId: any = 0;
    vacancyName: any = '';

    errorMessage: any;

    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(
        private vacanciesService: VacanciesService,
        private dictionaryService: DictionaryService,
        private formBuilder:FormBuilder,
        private activateRoute: ActivatedRoute,
        private router: Router){
         
        this.routeSubscription = activateRoute.params.subscribe(params=>this.vacancyId=params['id']);
        this.querySubscription = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.vacancyName = queryParam['vacancyName'];
            }
        );
    }

    ngOnInit(): void {
        this.getFilters();
    }

      
    get educations() {
        return this.educationFormGroup.controls["educations"] as FormArray;
    }
  
    get experiences() {
        return this.expirienceFormGroup.controls["experiences"] as FormArray;
    }

    addEducation() {
        const educationForm = this.formBuilder.group({
            university: ['', Validators.required],
            graduationYear: ['', Validators.required],
            specialization: ['', Validators.required],
            degree: ['', Validators.required]
        });
        this.educations.push(educationForm);
    }

    deleteEducation(educationIndex: number) {
        this.educations.removeAt(educationIndex);
    }

    addExperience() {
        const experienceForm = this.formBuilder.group({
            companyName: ['', Validators.required],
            positionName: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.experiences.push(experienceForm);
    }

    deleteExperience(experienceIndex: number) {
        this.experiences.removeAt(experienceIndex);
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

    getFilters() {
        this.getCities();
        this.getDegrees();
    }

    getCities() {
        this.dictionaryService.getCities().subscribe((result: any) => this.cities = result);
    }

    getDegrees() {
        this.dictionaryService.getDegrees().subscribe((result: any) => this.degrees = result);
    }


    sendApplication() {
        let application = {
            vacancyId: parseInt(this.vacancyId),
            expectedSalary: this.finalFormGroup.controls.expectedSalary.value,
            desiredPosition: this.vacancyName,
            birthday: this.personDataFormGroup.controls.birthday.value,
            firstName: this.personDataFormGroup.controls.first_name.value,
            midName: this.personDataFormGroup.controls.mid_name.value,
            lastName: this.personDataFormGroup.controls.last_name.value,
            email: this.personDataFormGroup.controls.email.value,
            phone: this.personDataFormGroup.controls.phone.value,
            telegram: this.personDataFormGroup.controls.telegram.value,
            skills: this.skillsFormControl.value?.join(', '),
            description: this.finalFormGroup.controls.description.value,
            city: this.personDataFormGroup.controls.city.value,
            educations: this.educationFormGroup.controls.educations.value,
            experiences: this.expirienceFormGroup.controls.experiences.value
        }

        this.vacanciesService.createApplication(application)
            .subscribe((result: any) => {
                if (result?.created) {
                    this.router.navigate(['/gratitude']);
                }
                else {
                    this.errorMessage = result.massage;
                }
            });
    }
}