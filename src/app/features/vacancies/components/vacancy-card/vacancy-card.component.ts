import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ModalService } from "src/app/shared/services/modal.service";

@Component({
    selector: 'vacancy-card',
    templateUrl: './vacancy-card.component.html',
    styleUrls: ['./vacancy-card.component.scss']
})
export class VacancyCardComponent {
    vacancyId: any = 0;
    vacancy: any = {
        id: 1,
        name: 'Senior помидор Java (Платформа автоматизации процесса рекрутмента)',
        city: {
            id: 1, 
            name: 'Москва'
        },
        work_format: {
            id: 1,
            name: 'Гибридный'
        },
        required_expirience: {
            id: 1,
            name: '3-5 лет'
        },
        description: 'Потрясающее описание вакансии Потрясающее описание вакансии Потрясающее описание вакансии Потрясающее описание вакансии Потрясающее описание вакансии Потрясающее описание вакансии Потрясающее описание вакансии Потрясающее описание вакансии Потрясающее описание вакансии Потрясающее описание вакансии',
        responsibilities: 'Очень отвественная обязанность номер один Очень отвественная обязанность номер один;\n'+
        'Очень отвественная обязанность номер один;\n' +
        'Очень отвественная обязанность номер один Очень отвественная обязанность номер один;',
        requirements: 'Очень важное требование номер один;\n' +
        'Очень важное требование номер один;\n' +
        'Очень важное требование номер один Очень важное требование номер один;',
        benefits: `Очень важное условие номер один;
        Очень важное условие номер один;`
    }

    constructor(
        public modalService: ModalService,
        private router: Router,
        private activateRoute: ActivatedRoute
        ){
        this.vacancyId = activateRoute.snapshot.params['id'];
    }
    
    respond() {
        console.log(this.vacancy);
        this.router.navigate(
            ['/vacancy-application', this.vacancy.id], 
            {
                queryParams:{
                    'vacancyName': this.vacancy.name, 
                }
            }
        );
    }
}