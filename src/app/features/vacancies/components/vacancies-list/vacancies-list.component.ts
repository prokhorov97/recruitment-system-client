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
    citiesFormControl = new FormControl([]);
    workFormatsFormControl = new FormControl([]);
    requiredExpiriencesFormControl = new FormControl([]);

    // filterGroup = new FormGroup({
    //     "vacancy": this.vacancyFormControl,
    //     "cities":  this.citiesFormControl,
    //     "workFormats":  this.workFormatsFormControl,
    //     "requiredExp":  this.requiredExpiriencesFormControl
    // });

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
        this.vacanciesService.getVacanciesList()
            .subscribe((result: any) => {
                this.vacancies = result;
                this.vacanciesFiltered = this.vacancies;
                this.isDataLoaded = true    
            }, error => {
                this.isDataLoaded = true
        });
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
        let selectedCityIds = this.citiesFormControl.value?.map((city: any) => city.id);
        let selectedWorkFormatIds = this.workFormatsFormControl.value?.map((workFormat: any) => workFormat.id);
        let requiredExpirienceId = this.requiredExpiriencesFormControl.value?.map((requiredExpirience: any) => requiredExpirience.id);

        this.vacanciesFiltered = this.vacancies.filter(vacancy => vacancy.name.toLowerCase().includes(vacancyNameFilter?.toLowerCase()));
        
        if (selectedCityIds && selectedCityIds.length > 0)
            this.vacanciesFiltered = this.vacanciesFiltered.filter(vacancy => selectedCityIds?.some(id => id === vacancy.city.id));

        if (selectedWorkFormatIds && selectedWorkFormatIds.length > 0)
            this.vacanciesFiltered = this.vacanciesFiltered.filter(vacancy => selectedWorkFormatIds?.some(id => id === vacancy.workFormat.id));
    }

    // filterByVacancyName() {
    //     this.vacanciesFiltered =  this.vacancies.filter(vacancy => vacancy.name.includes(this.vacancyFormControl.value));
    // }

    // filterByCity() {
    //     this.vacanciesFiltered = this.vacancies.filter(vacancy => {
    //         let selectedCities = this.citiesFormControl.value; 
    //         return selectedCities?.some((city: any) => {
    //             vacancy.city.id == city.id
    //         });
    //     });
    // }
    
    resetFilters() {
        this.vacanciesFiltered = this.vacancies;
        this.vacancyFormControl = new FormControl('');
        this.citiesFormControl = new FormControl([]);
        this.workFormatsFormControl = new FormControl([]);
        this.requiredExpiriencesFormControl = new FormControl([]);
    }

    // vacancies: any[] = [
    //     {
    //         id: 1,
    //         name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
    //         city: 'Москва',
    //         experience: '3-5 лет',
    //         format: 'Гибридный формат работы'
    //     },
    //     {
    //         id: 1,
    //         name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента) 123123123123 123123',
    //         city: 'Москва',
    //         experience: '3-5 лет',
    //         format: 'Гибридный формат работы'
    //     },
    //     {
    //         id: 1,
    //         name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
    //         city: 'Москва',
    //         experience: '3-5 лет',
    //         format: 'Гибридный формат работы'
    //     },
    //     {
    //         id: 1,
    //         name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
    //         city: 'Москва',
    //         experience: '3-5 лет',
    //         format: 'Гибридный формат работы'
    //     },
    //     {
    //         id: 1,
    //         name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
    //         city: 'Москва',
    //         experience: '3-5 лет',
    //         format: 'Гибридный формат работы'
    //     },
    //     {
    //         id: 1,
    //         name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
    //         city: 'Москва',
    //         experience: '3-5 лет',
    //         format: 'Гибридный формат работы'
    //     },
    //     {
    //         id: 1,
    //         name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
    //         city: 'Москва',
    //         experience: '3-5 лет',
    //         format: 'Гибридный формат работы'
    //     }
    // ];



    openVacancy(vacancy: any) {
        this.router.navigate(['/vacancy', vacancy.id]);
    }
}