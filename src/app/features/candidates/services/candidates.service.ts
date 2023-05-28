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

    getCandidate(id: number) {
        return this.httpClient.get(environment.apiUrl + '/api/candidates/' + id);
    }

    getApplicationsList() {
        return this.httpClient.get(environment.apiUrl + '/api/applications');
    }

    getApplication(id: number) {
        return this.httpClient.get(environment.apiUrl + '/api/applications/' + id);
    }

    reject(idApplication: number) {
        return this.httpClient.post(environment.apiUrl + '/api/mail/reject',  {idApplication});
    }

    offer(idApplication: number) {
        return this.httpClient.post(environment.apiUrl + '/api/mail/offer', {idApplication});
    }

    invitation(idApplication: number) {
        return this.httpClient.post(environment.apiUrl + '/api/mail/invitation', {idApplication});
    }

    agreement(idApplication: number) {
        return this.httpClient.post(environment.apiUrl + '/api/mail/agreement', {idApplication});
    }

    accept(idApplication: number) {
        return this.httpClient.post(environment.apiUrl + '/api/mail/accept', {idApplication});
    }
}