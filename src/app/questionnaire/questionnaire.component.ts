import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
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
                  <input class="input" [type]="question.type"
                         [formControlName]="question.id.toString()">
              </div>
          </form>
          <button (click)="nextAction()">{{ nextActionLabel }}</button>
      </div>
      <pre>{{ questionsForm.value | json }}</pre>
  `,
  styles: [`
    .input {
        background-color: blue;
    }
  `]
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  private questionsSubscription: Subscription;

  public questionsForm: FormGroup;
  public questions: Array<Question>;
  public nextActionLabel: string;

  constructor(private questionnaireService: QuestionnaireService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.questionsForm = new FormGroup({});

    this.questionsForm.valueChanges.subscribe( values => {
      console.log(values);
    });

    this.route.params.subscribe(params => {
        this.questionnaireService.getQuestions(1);
        this.nextActionLabel = 'NEXT';
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
      const key = question.id.toString();
      const initialValue = localStorage.getItem(key);

      this.questionsForm.addControl(question.id.toString(), new FormControl(initialValue || '' ));
    });
  }

  nextAction(): void {

  }
}
