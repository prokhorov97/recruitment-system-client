import { ObserversModule } from "@angular/cdk/observers";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class VacanciesService {
    constructor(
        private httpClient: HttpClient
        )
    {}

    getVacanciesList() {
        return this.httpClient.get(environment.apiUrl + '/api/vacancies');
    }

    getVacanciesListByHr() {
        return this.httpClient.get(environment.apiUrl + '/api/vacancies/hr');
    }

    getVacancy(id: number) {
        return this.httpClient.get(environment.apiUrl + '/api/vacancies/' + id);
    }

    createApplication(application: any) {
        return this.httpClient.post(environment.apiUrl + '/api/applications', application);
    }

    createVacancy(vacancy: any) {
        return this.httpClient.post(environment.apiUrl + '/api/vacancies', vacancy);
    }
}