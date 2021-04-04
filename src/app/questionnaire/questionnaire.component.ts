import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionnaireService} from './services/questionnaire.service';
import {Question} from './question';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'fun-questionnaire',
  template: `
      <div class="">
          Questionnaire
          <form [formGroup]="questionsForm">
              <div *ngFor="let question of questions">
                  <label>{{question.text}}</label>
                  <input [type]="question.type"
                         [formControlName]="question.id.toString()">
              </div>
          </form>
          
      </div>
  `,
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  private questionsSubscription: Subscription;

  public questionsForm: FormGroup;
  public questions: Array<Question>;

  constructor(private questionnaireService: QuestionnaireService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.questionsForm = new FormGroup({});
    this.questionnaireService.getQuestions(1);

    this.route.params.subscribe( params => console.log(params));

    this.questionsSubscription = this.questionnaireService.questions$.subscribe(questions => {
      this.buildFormFromQuestions(questions);
      this.questions = questions;
    });
  }

  ngOnDestroy(): void {
    this.questionsSubscription.unsubscribe();
  }

  private buildFormFromQuestions(questions: Array<Question>): void {
    questions.forEach(question => {
      this.questionsForm.addControl(question.id.toString(), new FormControl());
    });
  }

}
