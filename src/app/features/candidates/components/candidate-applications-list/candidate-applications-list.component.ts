import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";
import { VacanciesService } from "src/app/features/vacancies/services/vacancies.service";
import { CandidatesService } from "../../services/candidates.service";
import { AppComponent } from "src/app/app.component";
import { DictionaryService } from "src/app/shared/services/dictionary.service";

@Component({
    selector: 'candidate-applications-list',
    templateUrl: './candidate-applications-list.component.html',
    styleUrls: ['./candidate-applications-list.component.scss']
})
export class CandidateApplicationsListComponent implements OnInit { 
    isDataLoaded: boolean = true;
    skillsFormControl = new FormControl([]);
    skills: any[] = [];
    cities: any[] = [];
    applicationStatuses: any[] = [];
    applications: any[] = [];
    applicationsFiltered: any[] = [];

    sortTypeFormControl = new FormControl();
    vacancyFormControl = new FormControl('');
    citiesFormControl = new FormControl([]);
    applicationStatusesFormControl = new FormControl([]);
    minSalaryFormControl = new FormControl();
    maxSalaryFormControl = new FormControl();
    minExpFormControl = new FormControl();
    maxExpFormControl = new FormControl();

    sortTypes = [
        {
            id: 1,
            displayText: 'Сортировать по возрастанию ожидаемой зп'
        },
        {
            id: 2,
            displayText: 'Сортировать по убыванию ожидаемой зп'
        },
        {
            id: 3,
            displayText: 'Сортировать по возрастанию стажа'
        },        {
            id: 4,
            displayText: 'Сортировать по убыванию стажа'
        }
    ]


    constructor(
        private router: Router,
        private candidatesService: CandidatesService,
        private dictionaryService: DictionaryService,
        private vacanciesService: VacanciesService
    ){}

    ngOnInit(): void {
        this.getFilters();
        this.loadApplicatons(); 
    }

    loadApplicatons() {
        this.candidatesService.getApplicationsList().subscribe((result: any) => {
            this.applications = result;
            this.applicationsFiltered = this.applications;
        });
    }

    removeSkill(keyword: string) {
        const index = this.skills.indexOf(keyword);
        if (index >= 0) {
          this.skills.splice(index, 1);
          this.filter();
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
        this.filter();
    }

    openCandidate(candidate: any) {
        this.router.navigate(['/application', candidate.id])
    }


    getFilters() {
        this.getCities();
        this.getApplicationStatuses();
        this.getVacnciesByHr();
    }

    getCities() {
        this.dictionaryService.getCities().subscribe((result: any) => this.cities = result);
    }

    getApplicationStatuses() {
        this.dictionaryService.getApplicationStatuses().subscribe((result: any) => this.applicationStatuses = result);
    }

    getVacnciesByHr() {
        this.vacanciesService.getVacanciesListByHr().subscribe(result => console.log(result))
    }

    filter() {
        let vacancyNameFilter = this.vacancyFormControl.value;
        let minSalaryFilter = this.minSalaryFormControl.value;
        let maxSalaryFilter = this.maxSalaryFormControl.value;
        let minExpFilter = this.minExpFormControl.value;
        let maxExpFilter = this.maxExpFormControl.value;
        let selectedCityIds = this.citiesFormControl.value?.map((city: any) => city.id);
        let selectedSkills = this.skills;

        this.applicationsFiltered = this.applications.filter(application => application.vacancyName.toLowerCase().includes(vacancyNameFilter?.toLowerCase()));

        console.log(selectedSkills);

        if (minSalaryFilter)
            this.applicationsFiltered = this.applicationsFiltered.filter(application => application.expectedSalary >= minSalaryFilter);

        if (maxSalaryFilter)
            this.applicationsFiltered = this.applicationsFiltered.filter(application => application.expectedSalary <= maxSalaryFilter);

            
        if (minExpFilter)
            this.applicationsFiltered = this.applicationsFiltered.filter(application => (application.experienceNumber / 12) >= minExpFilter);

        if (maxExpFilter)
            this.applicationsFiltered = this.applicationsFiltered.filter(application => (application.experienceNumber / 12) <= maxExpFilter);

        if (selectedCityIds && selectedCityIds.length > 0)
            this.applicationsFiltered = this.applicationsFiltered.filter(application => selectedCityIds?.some(id => id === application.city.id));

        if (selectedSkills && selectedSkills.length > 0)
            this.applicationsFiltered = this.applicationsFiltered.filter(application => selectedSkills?.some(skill => application.skills.toLowerCase().includes(skill.toLowerCase())));

    }

    resetFilters() {
        this.applicationsFiltered = this.applicationsFiltered;
        
        this.vacancyFormControl = new FormControl('');
        this.minSalaryFormControl = new FormControl();
        this.maxSalaryFormControl = new FormControl();
        this.minExpFormControl = new FormControl();
        this.maxExpFormControl = new FormControl();

        this.citiesFormControl = new FormControl([]);
        this.skillsFormControl = new FormControl([]);
    }

    
    sort() {
        let sortType = this.sortTypeFormControl.value;
        if (sortType.id === 1)
            this.applicationsFiltered = this.applicationsFiltered.sort((a, b) => a.expectedSalary-b.expectedSalary);

        if (sortType.id === 2)
            this.applicationsFiltered = this.applicationsFiltered.sort((a, b) => b.expectedSalary-a.expectedSalary);

        if (sortType.id === 3)
            this.applicationsFiltered = this.applicationsFiltered.sort((a, b) => a.experienceNumber-b.experienceNumber);

        if (sortType.id === 4)
            this.applicationsFiltered = this.applicationsFiltered.sort((a, b) => b.experienceNumber-a.experienceNumber);
    }
}