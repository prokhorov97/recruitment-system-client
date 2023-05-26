import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ModalService } from "src/app/shared/services/modal.service";

@Component({
    selector: 'candidate-card',
    templateUrl: './candidate-card.component.html',
    styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent {
    candidateId: any = 0;
    candidate: any = {
        id: 1,
        name: 'Петров Максим Алексеевич',
        position_name: 'Java разработчик', 
        city: {
            id: 1, 
            name: 'Москва'
        },
        application: {
            status: 'Новая заявка',
            comment: 'Какой-то интересный комментарий Какой-то интересный комеентарий Какой-то интересный комеентарий Какой-то интересный комеентарийКакой-то интересный комеентарий'
        },
        expected_salary: 200000,
        work_format: {
            id: 1,
            name: 'Гибридный'
        },
        expirience: '10 лет',
        age: '30 лет',
        skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
        educations: [{
                university_name: 'НИУ ВШЭ, Москва',
                specialization: 'Магистр Менеджмента',
                year_start: 2020,
                year_end: 2022
            },
            {
                university_name: 'МГУ, Москва',
                specialization: 'Бакалавр Компьютерных наук',
                year_start: 2016,
                year_end: 2020
            },
        ],
        expiriences: [
            {
                company_name: 'Сбер',
                position_name: 'Java разработчик',
                start_date: 'Сентрябрь 2020',
                end_date: 'Февраль 2022',
                description: `Потрясающее описание кандидата Потрясающее описание кандидата 
                Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата 
                Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата 
                Потрясающее описание кандидата`,
            },
            {
                company_name: 'ВТБ',
                position_name: 'Java разработчик',
                start_date: 'Сентрябрь 2016',
                end_date: 'Август 2018',
                description: `Потрясающее описание кандидата Потрясающее описание кандидата 
                Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата 
                Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата 
                Потрясающее описание кандидата`,
            }
        ],
        description: 'Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата Потрясающее описание кандидата',
        phone: '79193002211',
        email: 'coolemail@gmal.com',
        telegram: 'ispl07'
    }

    constructor(
        public modalService: ModalService,
        private router: Router,
        private activateRoute: ActivatedRoute
        ){
        this.candidateId = activateRoute.snapshot.params['id'];
    }

    updateAppilcationStatusToViewed() {

    }
}