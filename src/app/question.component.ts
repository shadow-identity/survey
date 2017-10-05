import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Option, Question, Survey} from './survey';


@Component({
  selector: 'survey-question',
  templateUrl: './question.component.html',
  styles: [`
      .survey-disabled {
          cursor: not-allowed;
      }
  `]
})

export class QuestionComponent implements OnChanges {

  @Input() question: Question = {question: '', options: []};
  @Output() onNextPressed = new EventEmitter<boolean>();

  inputType: string = '';
  isSubmitted: boolean = false;
  answers: { text: string, set: boolean }[];

  getInputType(): string {
    const correctAnswersCount = this.question.options.filter(option => option.shouldBeSet === true).length;
    return correctAnswersCount > 1 ? 'checkbox' : 'radio'
  }

  onOptionSelect(option: Option): void {
    if (this.inputType === 'radio') {
      this.answers.forEach(option => option.set = false);
    }
    let answer = this.answers.find(answerOption => option.text === answerOption.text)
    this.findAnswer(option.text).set = !this.findAnswer(option.text).set
  }

  findAnswer(text: string) {
    return this.answers.find(answerOption => text === answerOption.text)
  }
  onSubmit(): void {
    this.isSubmitted = true;
  }

  isChecked(optionText: string): boolean {
    return this.findAnswer(optionText).set
  }

  onNext(): void {
    this.onNextPressed.emit(this.isAnswerCorrect())
  }

  defineAnsweredClass(option: Option): string {
    if (!this.isSubmitted) {
      return ''
    } else if (this.findAnswer(option.text).set && this.findAnswer(option.text).set !== option.shouldBeSet) {
      return 'list-group-item-danger'
    } else if (option.shouldBeSet) {
      return 'list-group-item-success'
    }
  }

  isAnswerCorrect(): boolean {
    return this.question.options
      .map(option => [option.shouldBeSet, this.findAnswer(option.text).set])
      .reduce((acc, curr) => acc && curr[0] === curr[1], true);
  }

  ngOnChanges(): void {
    this.isSubmitted = false;
    // Unfortunately we can't use Object.assign to copy objects so we will work with map.
    this.answers = this.question.options.map(option => ({text: option.text, set: false}));
    this.inputType = this.getInputType();
  }
}
