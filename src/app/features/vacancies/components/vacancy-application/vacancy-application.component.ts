import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'vacancy-application',
    templateUrl: './vacancy-application.component.html',
    styleUrls: ['./vacancy-application.component.scss']
})
export class VacancyApplicationComponent { 
    personDataFormGroup = this.formBuilder.group({
        city: ['', Validators.required],
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
        description: [''],
    });
    
    skills: any[] = [];
    isAgree: boolean = false;
    vacancyId: any = 0;
    vacancyName: any = '';

    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(
        private formBuilder:FormBuilder,
        private activateRoute: ActivatedRoute,
        private router: Router){
         
        this.routeSubscription = activateRoute.params.subscribe(params=>this.vacancyId=params['vacancyId']);
        this.querySubscription = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.vacancyName = queryParam['vacancyName'];
            }
        );
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
            graduation_year: ['', Validators.required],
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
            company_name: ['', Validators.required],
            position_name: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
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

    show() {
        console.log(this.personDataFormGroup.controls);
        console.log(this.educations);
        console.log(this.experiences);
        console.log(this.skillsFormControl.value)
        console.log(this.finalFormGroup.controls);
        this.router.navigate(['/gratitude']);
    }
}