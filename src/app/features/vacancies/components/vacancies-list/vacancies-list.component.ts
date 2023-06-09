import { Component, OnChanges, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { VacanciesService } from "../../services/vacancies.service";
import { DictionaryService } from "src/app/shared/services/dictionary.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'vacancies-list',
    templateUrl: './vacancies-list.component.html',
    styleUrls: ['./vacancies-list.component.scss']
})
export class VacanciesListComponent implements OnInit { 
    isDataLoaded: boolean = true;
    vacancies: any[] = [];
    vacanciesFiltered: any[] = [];
    cities: any[] = [];
    workFormats: any[] = [];
    requiredExpiriences: any[] = [];
    
    vacancyFormControl = new FormControl('');
    minSalaryFormControl = new FormControl();
    maxSalaryFormControl = new FormControl();
    citiesFormControl = new FormControl([]);
    workFormatsFormControl = new FormControl([]);
    requiredExpiriencesFormControl = new FormControl([]);

    constructor(
        private router: Router,
        private vacanciesService: VacanciesService,
        private dictionaryService: DictionaryService
    ){}

    ngOnInit() {
        this.loadVacancies();
        this.getFilters();
    }

    loadVacancies() {
        this.isDataLoaded = false;

        if (this.router.url.includes('my-vacancies')) {
            this.vacanciesService.getVacanciesListByHr()
            .subscribe((result: any) => {
                this.vacancies = result;
                this.vacanciesFiltered = this.vacancies;
                this.isDataLoaded = true    
            }, error => {
                this.isDataLoaded = true
            });
        } else {
            this.vacanciesService.getVacanciesList()
            .subscribe((result: any) => {
                this.vacancies = result;
                this.vacanciesFiltered = this.vacancies;
                this.isDataLoaded = true    
            }, error => {
                this.isDataLoaded = true
            });
        }

    }
    
    getFilters() {
        this.getCities();
        this.getWorkFormats();
        this.getRequiredExpiriences();
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

    filter() {
        let vacancyNameFilter = this.vacancyFormControl.value;
        let minSalaryFilter = this.minSalaryFormControl.value;
        let maxSalaryFilter = this.maxSalaryFormControl.value;
        let selectedCityIds = this.citiesFormControl.value?.map((city: any) => city.id);
        let selectedWorkFormatIds = this.workFormatsFormControl.value?.map((workFormat: any) => workFormat.id);
        let requiredExpirienceIds = this.requiredExpiriencesFormControl.value?.map((requiredExpirience: any) => requiredExpirience.id);

        this.vacanciesFiltered = this.vacancies.filter(vacancy => vacancy.name.toLowerCase().includes(vacancyNameFilter?.toLowerCase()));

        if (minSalaryFilter) 
            this.vacanciesFiltered = this.vacanciesFiltered.filter(vacancy => vacancy.publicSalary >= minSalaryFilter);
        
        if (maxSalaryFilter) 
            this.vacanciesFiltered = this.vacanciesFiltered.filter(vacancy => vacancy.publicSalary <= maxSalaryFilter);

        if (selectedCityIds && selectedCityIds.length > 0)
            this.vacanciesFiltered = this.vacanciesFiltered.filter(vacancy => selectedCityIds?.some(id => id === vacancy.city.id));

        if (selectedWorkFormatIds && selectedWorkFormatIds.length > 0)
            this.vacanciesFiltered = this.vacanciesFiltered.filter(vacancy => selectedWorkFormatIds?.some(id => id === vacancy.workFormat.id));

        if (requiredExpirienceIds && requiredExpirienceIds.length > 0)
            this.vacanciesFiltered = this.vacanciesFiltered.filter(vacancy => requiredExpirienceIds?.some(id => id === vacancy.requiredExperience.id));
        
    }
   
    resetFilters() {
        this.vacanciesFiltered = this.vacancies;
        
        this.vacancyFormControl = new FormControl('');
        this.minSalaryFormControl = new FormControl();
        this.maxSalaryFormControl = new FormControl();
        this.citiesFormControl = new FormControl([]);
        this.workFormatsFormControl = new FormControl([]);
        this.requiredExpiriencesFormControl = new FormControl([]);
    }

    openVacancy(vacancy: any) {
        this.router.navigate(['/vacancy', vacancy.id]);
    }
}