import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionnaireService} from './services/questionnaire.service';
import {Question} from './question';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';


class NirValidators {
  static isNir(control: AbstractControl): ValidationErrors | null {
    if (control.value !== 'nir') {
      return {
        isNir: 'THe value must be nir'
      };
    }
    return null;
  }
}

@Component({
  selector: 'fun-questionnaire',
  template: `
      <div class="">
          Questionnaire
          <form [formGroup]="questionsForm">
              <div *ngFor="let question of questions">
                  <label>{{question.text}}</label>
                  <input class="input" required [type]="question.type"
                         [formControlName]="question.id.toString()">
                  <!--                  <pre>{{getControl(question.id.toString()).errors |  json}}</pre>-->
                  <span style="color: red" *ngIf="getControl(question.id.toString()).errors?.required">
                      Required field
                  </span>
              </div>
          </form>
          <button (click)="nextAction()">{{ nextActionLabel }}</button>
      </div>
      <pre>{{ questionsForm.value | json }}</pre>
  `,
  styles: [`
      .ng-invalid.ng-dirty {
          border-color: red;
      }

      .ng-dirty {
      }
  `]
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

    this.questionsForm.valueChanges.subscribe(values => {
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

  getControl(controlName: string): FormControl {
    return this.questionsForm.get(controlName) as FormControl;
  }

  private buildFormFromQuestions(questions: Array<Question>): void {
    questions.forEach(question => {
      const key = question.id.toString();
      const initialValue = localStorage.getItem(key);

      this.questionsForm.addControl(question.id.toString(),
          new FormControl(initialValue || '', [NirValidators.isNir]));
    });
  }

  nextAction(): void {

  }
}
