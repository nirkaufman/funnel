import { Component, OnInit } from '@angular/core';
import {QuestionnaireService} from './services/questionnaire.service';
import {Question} from './question';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'fun-questionnaire',
  template: `
    <div class="">
      questionnaire works!
        <pre>{{ questions | json }}</pre>
    </div>
  `,
  styles: []
})
export class QuestionnaireComponent implements OnInit {
  public questionsForm: FormGroup;
  public questions: Array<Question>;

  constructor(private questionnaireService: QuestionnaireService) {}

  ngOnInit(): void {
    this.questionnaireService.getQuestions(1);

    this.questionnaireService.questions$.subscribe( questions => {
      this.questionsForm = this.buildFormFromQuestions(questions);
      this.questions = questions;
      console.log(this.questionsForm);
    });
  }

  private buildFormFromQuestions(questions: Array<Question>): FormGroup {
    const questionsForm = new FormGroup({});

    questions.forEach( question => {
      questionsForm.addControl(question.id.toString(), new FormControl());
    });

    return questionsForm;
  }

}
