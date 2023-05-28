import { Component, OnInit } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";

@Component({
    selector: 'calendar',
    templateUrl: 'calendar.component.html',
    styleUrls: ['calendar.component.scss']
  })
  export class CalendarComponent implements OnInit {
    constructor(
        private calendarService: CalendarService
    ){}

    ngOnInit(): void {
        this.getToken();
    }
        
    getToken() {
        this.calendarService.getToken().subscribe((result: any) => console.log(result));
        this.calendarService.getToken2().subscribe((result: any) => console.log(result)); 
    }

  }