import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {QuestionnaireService} from './services/questionnaire.service';
import { QuestionnaireComponent } from './questionnaire.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [QuestionnaireComponent],
  providers: [QuestionnaireService],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: ':pid', component: QuestionnaireComponent}
    ]),
  ]
})
export class QuestionnaireModule {}
