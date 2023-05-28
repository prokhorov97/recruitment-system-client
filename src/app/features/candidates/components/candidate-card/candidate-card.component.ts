import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ModalService } from "src/app/shared/services/modal.service";
import { CandidatesService } from "../../services/candidates.service";

@Component({
    selector: 'candidate-card',
    templateUrl: './candidate-card.component.html',
    styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {
    @Input() candidateId: any;
    candidate: any;
    
    constructor(
        private candidateService: CandidatesService,
        private router: Router,
        private activateRoute: ActivatedRoute
        ){
            if (!this.candidateId)
                this.candidateId = activateRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.getCandidate();
    }

    getCandidate(   ){
        this.candidateService.getCandidate(this.candidateId)
        .subscribe(result => {
            this.candidate = result;
            console.log(this.candidate);
        });;
    }
}