import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from './survey';


@Component({
  selector: 'survey-cycle',
  template: `
      <survey-question [question]="question"
                       (onNextPressed)="onNextPressed($event)">
      </survey-question>
  `
})

export class SurveyCycleComponent implements OnInit {
  @Input() questions: Question[] = [];
  @Output() onResult = new EventEmitter<number>();

  private correctCounter: number = 0;
  private questionNumber: number = 0;
  question: Question;

  onNextPressed(isCorrect: boolean): void {
    this.questionNumber++;
    isCorrect && this.correctCounter++;
    if (this.questionNumber === this.questions.length) {
      this.onResult.emit(this.correctCounter)
    }
    this.question = this.questions[this.questionNumber];
  }

  ngOnInit() {
    this.question = this.questions[this.questionNumber];
  }
}
