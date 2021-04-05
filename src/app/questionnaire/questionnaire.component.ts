import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionnaireService} from './services/questionnaire.service';
import {Question} from './question';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

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
          <button (click)="nextAction()">{{ nextActionLabel }}</button>
      </div>
  `,
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  private questionsSubscription: Subscription;

  public questionsForm: FormGroup;
  public questions: Array<Question>;
  public nextActionLabel: string;

  constructor(private questionnaireService: QuestionnaireService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.questionsForm = new FormGroup({});

    this.route.params.subscribe(params => {
      if (params.pid === '1') {
        this.questionnaireService.getQuestions(params.pid);
        this.nextActionLabel = 'NEXT';
      }
      if (params.pid === '2') {
        this.questionnaireService.getQuestions(params.pid);
        this.nextActionLabel = 'SUBMIT';
      }
    });

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

  nextAction(): void {

  }
}
