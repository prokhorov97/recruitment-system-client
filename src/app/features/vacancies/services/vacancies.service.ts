import { ObserversModule } from "@angular/cdk/observers";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class VacanciesService {
    constructor(
        private httpClient: HttpClient
        )
    {}

    getVacanciesList() {
        return this.httpClient.get(environment.apiUrl + '/api/vacancies', { 
            headers : {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
            }});
    }
}