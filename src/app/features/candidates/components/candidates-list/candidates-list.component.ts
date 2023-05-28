import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";
import { LoginService } from "src/app/core/services/login.service";
import { CandidatesService } from "../../services/candidates.service";
import { DictionaryService } from "src/app/shared/services/dictionary.service";

@Component({
    selector: 'candidates-list',
    templateUrl: './candidates-list.component.html',
    styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
    isDataLoaded: boolean = true;
    skillsFormControl = new FormControl([]);
    skills: any[] = [];
    cities: any[] = [];
    candidates: any[] = [];
    candidatesFiltered: any[] = [];

    sortTypeFormControl = new FormControl();
    vacancyFormControl = new FormControl('');
    citiesFormControl = new FormControl([]);
    minSalaryFormControl = new FormControl();
    maxSalaryFormControl = new FormControl();
    minExpFormControl = new FormControl();
    maxExpFormControl = new FormControl();

    sortTypes = [
        {
            id: 1,
            displayText: 'Сортировать по возрастанию ожидаемой зп'
        },
        {
            id: 2,
            displayText: 'Сортировать по убыванию ожидаемой зп'
        },
        {
            id: 3,
            displayText: 'Сортировать по возрастанию стажа'
        },        {
            id: 4,
            displayText: 'Сортировать по убыванию стажа'
        }
    ]

    constructor(
        private router: Router,
        private candidatesService: CandidatesService,
        private dictionaryService: DictionaryService
    ) { }

    ngOnInit(): void {
        this.getFilters();
        this.loadCandidates();
    }

    getFilters() {
        this.getCities();
    }

    getCities() {
        this.dictionaryService.getCities().subscribe((result: any) => this.cities = result);
    }

    loadCandidates() {
        this.candidatesService.getCandidatesList().subscribe((result: any) => {
            this.candidates = result;
            this.candidatesFiltered = this.candidates;
        });
    }

    removeSkill(keyword: string) {
        const index = this.skills.indexOf(keyword);
        if (index >= 0) {
            this.skills.splice(index, 1);
            this.filter();
        }
    }

    addSkill(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our keyword
        if (value) {
            this.skills.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();
        this.filter();
    }

    openCandidate(candidate: any) {
        this.router.navigate(['/candidate', candidate.id])
    }

    filter() {
        let vacancyNameFilter = this.vacancyFormControl.value;
        let minSalaryFilter = this.minSalaryFormControl.value;
        let maxSalaryFilter = this.maxSalaryFormControl.value;
        let minExpFilter = this.minExpFormControl.value;
        let maxExpFilter = this.maxExpFormControl.value;
        let selectedCityIds = this.citiesFormControl.value?.map((city: any) => city.id);
        let selectedSkills = this.skills;

        this.candidatesFiltered = this.candidates.filter(candidate => candidate.desiredPosition.toLowerCase().includes(vacancyNameFilter?.toLowerCase()));

        console.log(this.skills);

        if (minSalaryFilter)
            this.candidatesFiltered = this.candidatesFiltered.filter(candidate => candidate.expectedSalary >= minSalaryFilter);

        if (maxSalaryFilter)
            this.candidatesFiltered = this.candidatesFiltered.filter(candidate => candidate.expectedSalary <= maxSalaryFilter);

            
        if (minExpFilter)
            this.candidatesFiltered = this.candidatesFiltered.filter(candidate => (candidate.experienceNumber / 12) >= minExpFilter);

        if (maxExpFilter)
            this.candidatesFiltered = this.candidatesFiltered.filter(candidate => (candidate.experienceNumber / 12) <= maxExpFilter);

        if (selectedCityIds && selectedCityIds.length > 0)
            this.candidatesFiltered = this.candidatesFiltered.filter(candidate => selectedCityIds?.some(id => id === candidate.city.id));

        if (selectedSkills && selectedSkills.length > 0)
            this.candidatesFiltered = this.candidatesFiltered.filter(candidate => selectedSkills?.some(skill => candidate.skills.toLowerCase().includes(skill.toLowerCase())));

    }

    resetFilters() {
        this.candidatesFiltered = this.candidates;
        
        this.vacancyFormControl = new FormControl('');
        this.minSalaryFormControl = new FormControl();
        this.maxSalaryFormControl = new FormControl();
        this.minExpFormControl = new FormControl();
        this.maxExpFormControl = new FormControl();

        this.citiesFormControl = new FormControl([]);
        this.skillsFormControl = new FormControl([]);
    }

    sort() {
        let sortType = this.sortTypeFormControl.value;
        if (sortType.id === 1)
            this.candidatesFiltered = this.candidatesFiltered.sort((a, b) => a.expectedSalary-b.expectedSalary);

        if (sortType.id === 2)
            this.candidatesFiltered = this.candidatesFiltered.sort((a, b) => b.expectedSalary-a.expectedSalary);

        if (sortType.id === 3)
            this.candidatesFiltered = this.candidatesFiltered.sort((a, b) => a.experienceNumber-b.experienceNumber);

        if (sortType.id === 4)
            this.candidatesFiltered = this.candidatesFiltered.sort((a, b) => b.experienceNumber-a.experienceNumber);
    }
}
