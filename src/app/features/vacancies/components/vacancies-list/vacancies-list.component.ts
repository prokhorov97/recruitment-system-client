import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { VacanciesService } from "../../services/vacancies.service";

@Component({
    selector: 'vacancies-list',
    templateUrl: './vacancies-list.component.html',
    styleUrls: ['./vacancies-list.component.scss']
})
export class VacanciesListComponent implements OnInit { 
    isDataLoaded: boolean = true;

    constructor(
        private router: Router,
        private vacanciesService: VacanciesService
    ){}

    ngOnInit() {
        this.loadVacancies();
    }

    loadVacancies() {
        this.isDataLoaded = false;
        this.vacanciesService.getVacanciesList()
            .subscribe((result: any) => {
                this.vacancies = result;
                this.isDataLoaded = true    
            }, error => {
                this.isDataLoaded = true
        });
    }
    
    vacancies: any[] = [
        // {
        //     id: 1,
        //     name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
        //     city: 'Москва',
        //     experience: '3-5 лет',
        //     format: 'Гибридный формат работы'
        // },
        // {
        //     id: 1,
        //     name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента) 123123123123 123123',
        //     city: 'Москва',
        //     experience: '3-5 лет',
        //     format: 'Гибридный формат работы'
        // },
        // {
        //     id: 1,
        //     name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
        //     city: 'Москва',
        //     experience: '3-5 лет',
        //     format: 'Гибридный формат работы'
        // },
        // {
        //     id: 1,
        //     name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
        //     city: 'Москва',
        //     experience: '3-5 лет',
        //     format: 'Гибридный формат работы'
        // },
        // {
        //     id: 1,
        //     name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
        //     city: 'Москва',
        //     experience: '3-5 лет',
        //     format: 'Гибридный формат работы'
        // },
        // {
        //     id: 1,
        //     name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
        //     city: 'Москва',
        //     experience: '3-5 лет',
        //     format: 'Гибридный формат работы'
        // },
        // {
        //     id: 1,
        //     name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
        //     city: 'Москва',
        //     experience: '3-5 лет',
        //     format: 'Гибридный формат работы'
        // }
    ];



    openVacancy(vacancy: any) {
        this.router.navigate(['/vacancy', vacancy.id]);
    }
}