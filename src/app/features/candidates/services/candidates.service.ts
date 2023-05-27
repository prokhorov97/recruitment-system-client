import { ObserversModule } from "@angular/cdk/observers";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class CandidatesService {
    constructor(
        private httpClient: HttpClient
        )
    {}

    getCandidatesList() {
        return this.httpClient.get(environment.apiUrl + '/api/candidates');
    }
}