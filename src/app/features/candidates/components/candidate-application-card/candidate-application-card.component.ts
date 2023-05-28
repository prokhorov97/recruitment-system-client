import { Component, OnInit } from "@angular/core";
import { CandidatesService } from "../../services/candidates.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'candidate-application-card',
    templateUrl: './candidate-application-card.component.html',
    styleUrls: ['./candidate-application-card.component.scss']
})
export class CandidateApplicationCardComponent implements OnInit {
    applicationId: number;
    application: any;
    
    constructor(
        private candidateService: CandidatesService,
        private router: Router,
        private activateRoute: ActivatedRoute
        ){
            this.applicationId = activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.loadApplciation();
    }

    loadApplciation() {
        this.candidateService.getApplication(this.applicationId).subscribe(result => {
            this.application = result;
        });
    }

    reject() {
        this.candidateService.reject(this.applicationId).subscribe(result => console.log(result));
    }

    invitation() {
        this.candidateService.invitation(this.applicationId).subscribe(result => console.log(result));
    }

    offer() {
        this.candidateService.offer(this.applicationId).subscribe(result => console.log(result));
    }

    agreement() {
        this.candidateService.agreement(this.applicationId).subscribe(result => console.log(result));
    }

    accept() {
        this.candidateService.accept(this.applicationId).subscribe(result => console.log(result));
    }
}