import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([
    {path: '', redirectTo: 'questionnaire', pathMatch: 'full'},
    {
      // lazy load the questionnaire module
      path: 'questionnaire',
      loadChildren: () => import('./questionnaire/questionnaire.module')
          .then(m => m.QuestionnaireModule)
    }
  ])],
  bootstrap: [AppComponent]
})
export class AppModule {
}
