import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Question} from './question.interface';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

@Injectable()
export class QuestionnaireService {
  private questionsSubject: BehaviorSubject<Array<Question>>;
  private isLoadingSubject: BehaviorSubject<boolean>;

  public questions$: Observable<Array<Question>>;
  public loading$: Observable<boolean>;

  constructor(private httpClient: HttpClient) {
    this.questionsSubject = new BehaviorSubject([]);
    this.isLoadingSubject = new BehaviorSubject(false);

    this.questions$ = this.questionsSubject.asObservable();
    this.loading$ = this.isLoadingSubject.asObservable();
  }

  public getQuestions(pageId: number): void {
    this.isLoadingSubject.next(true);
    this.httpClient.get<Array<Question>>('//path')
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
        .subscribe( questions => this.questionsSubject.next(questions));
  }
}


