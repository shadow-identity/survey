import {Component, OnInit} from '@angular/core';
import {SurveyService} from './survey.service';
import {Survey} from './survey';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [SurveyService]
})
export class AppComponent implements OnInit {
  survey: Survey = {name: '', questions: []};
  result?: number;
  appStates = {loading: 'loading', asking: 'asking', results: 'results'};
  appState: string = this.appStates.loading;

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.getSurvey()
  }

  getSurvey(): void {
    this.surveyService.getSurvey().then(survey => {
      this.survey = survey;
      this.appState = this.appStates.asking
    })
  }

  onResult(correctNumber: number): void {
    this.result = correctNumber;
    this.appState = this.appStates.results
  }

  doAgain() {
    this.appState = this.appStates.asking
  }
}
