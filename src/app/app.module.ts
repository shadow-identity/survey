import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {QuestionComponent} from './question.component';
import {FormsModule} from '@angular/forms';
import {SurveyCycleComponent} from './surveyCycle.component';
import {ResultComponent} from './result.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, QuestionComponent, SurveyCycleComponent, ResultComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
