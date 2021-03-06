import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {QuestionnaireService} from './services/questionnaire.service';
import { QuestionnaireComponent } from './questionnaire.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './services/auth.interceptor';

@NgModule({
  declarations: [QuestionnaireComponent],
  providers: [
      QuestionnaireService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', redirectTo: '1', pathMatch: 'full'},
      {path: '1', component: QuestionnaireComponent},
      {path: '2', component: QuestionnaireComponent}
    ]),
  ]
})
export class QuestionnaireModule {}
