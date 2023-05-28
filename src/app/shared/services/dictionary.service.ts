import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class DictionaryService {
    constructor(
        private httpClient: HttpClient
        )
    {}

    getCities() {
        return this.httpClient.get(environment.apiUrl + '/api/cities'); 
    }
    
    getWorkFormats() {
        return this.httpClient.get(environment.apiUrl + '/api/work-formats'); 
    }

    getRequiredExpiriences() {
        return this.httpClient.get(environment.apiUrl + '/api/required-experiences'); 
    }

    getVacancyStatuses() {
        return this.httpClient.get(environment.apiUrl + '/api/vacancy-statuses'); 
    }

    getApplicationStatuses() {
        return this.httpClient.get(environment.apiUrl + '/api/application-statuses'); 
    }
    
    getDegrees() {
        return this.httpClient.get(environment.apiUrl + '/api/degrees'); 
    }

    getOwners() {
        return this.httpClient.get(environment.apiUrl + '/api/owners'); 
    }
}