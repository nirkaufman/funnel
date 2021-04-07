import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Question} from '../question';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

const mock: Array<Question> = [
  {
    id: 1004,
    text: 'Your email address is:',
    type: 'TEXT'
  },
  {
    id: 1005,
    text: 'address',
    type: 'TEXT'
  },
  {
    id: 1006,
    text: 'Zip code',
    type: 'TEXT'
  },
  {
    id: 1007,
    text: 'City',
    type: 'TEXT'
  },
  {
    id: 1008,
    text: 'I agree with terms please create my policy',
    type: 'CHECKBOX'
  },
];

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
    // of(mock)
    //     .pipe(finalize(() => this.isLoadingSubject.next(false)))
    //     .subscribe(questions => this.questionsSubject.next(mock));

    this.httpClient.get<Array<Question>>('https://jsonplaceholder.typicode.com/users')
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
        .subscribe(questions => this.questionsSubject.next(mock));
  }
}
