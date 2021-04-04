import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {QuestionnaireService} from './questionnaire.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  providers: [QuestionnaireService],
  imports: [
    CommonModule,
      HttpClientModule,
    RouterModule.forRoot([
      {path: ':pid'}
    ]),
  ]
})
export class QuestionnaireModule {
  constructor(router: Router) {
    router.events.subscribe( (event) => {

    });
  }
}
