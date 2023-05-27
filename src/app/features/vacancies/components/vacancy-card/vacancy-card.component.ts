import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ModalService } from "src/app/shared/services/modal.service";
import { VacanciesService } from "../../services/vacancies.service";

@Component({
    selector: 'vacancy-card',
    templateUrl: './vacancy-card.component.html',
    styleUrls: ['./vacancy-card.component.scss']
})
export class VacancyCardComponent implements OnInit {
    vacancyId: any = 0;
    vacancy: any;

    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute,
        private vacanciesService: VacanciesService
        ){
        this.vacancyId = activateRoute.snapshot.params['id'];
    }
    
    ngOnInit(): void {
        this.loadVacancy();
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

    loadVacancy() {
        this.vacanciesService.getVacancy(this.vacancyId)
        .subscribe(result => {
            this.vacancy = result;
            console.log(this.vacancy)
        });
    }
}