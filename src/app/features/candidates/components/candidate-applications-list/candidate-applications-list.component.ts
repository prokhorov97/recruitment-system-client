import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";

@Component({
    selector: 'candidate-applications-list',
    templateUrl: './candidate-applications-list.component.html',
    styleUrls: ['./candidate-applications-list.component.scss']
})
export class CandidateApplicationsListComponent implements OnInit { 
    isDataLoaded: boolean = true;
    skillsFormControl = new FormControl([]);
    skills: any[] = [];

    candidates: any[] = [
        {
            id: 1,
            expected_salary: 200000,
            city: 'Москва',
            fio: 'Петров А.Б.',
            experience_years: '10 лет',
            skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
            phone: '79193002211',
            email: 'coolemail@gmal.com',
            telegram: 'ispl07'
        },
        {
            id: 1,
            expected_salary: 200000,
            city: 'Москва',
            fio: 'Петров А.Б.',
            experience_years: '10 лет',
            skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
            phone: '79193002211',
            email: 'coolemail@gmal.com',
            telegram: 'ispl07'
        },
        {
            id: 1,
            expected_salary: 200000,
            city: 'Москва',
            fio: 'Петров А.Б.',
            experience_years: '10 лет',
            skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
            phone: '79193002211',
            email: 'coolemail@gmal.com',
            telegram: 'ispl07'
        },
        {
            id: 1,
            expected_salary: 200000,
            city: 'Москва',
            fio: 'Петров А.Б.',
            experience_years: '10 лет',
            skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
            phone: '79193002211',
            email: 'coolemail@gmal.com',
            telegram: 'ispl07'
        },
        {
            id: 1,
            expected_salary: 200000,
            city: 'Москва',
            fio: 'Петров А.Б.',
            experience_years: '10 лет',
            skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
            phone: '79193002211',
            email: 'coolemail@gmal.com',
            telegram: 'ispl07'
        },{
            id: 1,
            expected_salary: 200000,
            city: 'Москва',
            fio: 'Петров А.Б.',
            experience_years: '10 лет',
            skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
            phone: '79193002211',
            email: 'coolemail@gmal.com',
            telegram: 'ispl07'
        },{
            id: 1,
            expected_salary: 200000,
            city: 'Москва',
            fio: 'Петров А.Б.',
            experience_years: '10 лет',
            skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
            phone: '79193002211',
            email: 'coolemail@gmal.com',
            telegram: 'ispl07'
        },{
            id: 1,
            expected_salary: 200000,
            city: 'Москва',
            fio: 'Петров А.Б.',
            experience_years: '10 лет',
            skills: 'Java Core, algorithms and data structures, Hibernate, PostgreSQL, Spring Core, Spring Boot, Spring Security, Git',
            phone: '79193002211',
            email: 'coolemail@gmal.com',
            telegram: 'ispl07'
        }
    ]

    constructor(
        private router: Router,
        // private vacanciesService: VacanciesService
    ){}

    ngOnInit(): void {
    }

    removeSkill(keyword: string) {
        const index = this.skills.indexOf(keyword);
        if (index >= 0) {
          this.skills.splice(index, 1);
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
    }

    openCandidate(candidate: any) {
        this.router.navigate(['/candidate', candidate.id])
    }
}