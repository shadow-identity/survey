import { Injectable } from '@angular/core';
import {SURVEY} from './survey-mock';
import {Survey} from './survey';

@Injectable()
export class SurveyService {
  getSurvey(): Promise<Survey> {
    return Promise.resolve(SURVEY);
  }
}