import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from './survey';


@Component({
  selector: 'survey-cycle',
  template: `
      <survey-question [question]="question"
                       [counter]="counter"
                       (onNextPressed)="onNextPressed($event)">
      </survey-question>
  `
})

export class SurveyCycleComponent implements OnInit {
  @Input() questions: Question[] = [];
  @Output() onResult = new EventEmitter<number>();

  private correctCounter: number = 0;
  private questionNumber: number = 0;
  counter: number[] = [0, 0];
  question: Question;

  onNextPressed(isCorrect: boolean): void {
    this.questionNumber++;
    this.updateCounter();
    isCorrect && this.correctCounter++;
    if (this.questionNumber === this.questions.length) {
      this.onResult.emit(this.correctCounter)
    }
    this.question = this.questions[this.questionNumber];
  }

  updateCounter() {
    this.counter = [this.questionNumber + 1, this.questions.length];
  }

  ngOnInit() {
    this.updateCounter();
    this.question = this.questions[this.questionNumber];
  }
}
