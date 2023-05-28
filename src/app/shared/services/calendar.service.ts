import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class CalendarService {
    constructor(
        private httpClient: HttpClient
        )
    {}

    getToken() {
        return this.httpClient.get(environment.apiUrl + '/api/oauth2/login');
    }

    getToken2() {
        let headerParams = new HttpParams();
        headerParams.append('client_id', '854910222939-jodur43jguglttvf8ltato4v7925u8f5.apps.googleusercontent.com');
        headerParams.append('redirect_uri', 'http://localhost:4200');
        headerParams.append('response_type', 'token');
        headerParams.append('scope', 'https://www.googleapis.com/auth/calendar');
        headerParams.append('state', '/profile');
        return this.httpClient.get('https://accounts.google.com/o/oauth2/auth', { params: headerParams });
    }


    getCalendars() {
        return this.httpClient.get(environment.apiUrl + '/api/calendars');
    }

    getEvents(id: number) {
        return this.httpClient.get(environment.apiUrl + '/api/calendars/' + id);
    }

    createEvent(event: any) {
        return this.httpClient.post(environment.apiUrl + '/api/events', event)
    }
}