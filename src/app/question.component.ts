import {Component} from '@angular/core';
import {Option, Question} from './question';


@Component({
  selector: 'question',
  template: `
      <div class="panel panel-default">
          <div class="panel-body">
              <h3>{{question.question}}</h3>
              <div class="list-group">
                  <a href="#"
                     *ngFor="let option of question.options"
                     [class]="defineAnsweredClass(option) + ' list-group-item'"
                     [ngClass]="{'survey-disabled': isSubmitted}"
                     (click)="!isSubmitted && onOptionSelect(option)">
                      <input type="{{inputType}}" [checked]="option.set" [ngClass]="{'disabled': isSubmitted}">
                      {{option.text}} {{option.set}}
                  </a>
              </div>
              <div *ngIf="!isSubmitted; else nextButton">
                  <input class="btn btn-default" type="submit" value="Submit" (click)="onSubmit()">
              </div>
              <ng-template #nextButton>
                  <input class="btn btn-default" type="submit" value="Next" (click)="onNext()">
              </ng-template>
          </div>
      </div>
  `,
  styles: [`
      .survey-disabled {
          cursor: not-allowed;
      }
  `]
})

export class QuestionComponent {
  question: Question = {
    question: 'wat',
    options: [{text: 'yep', shouldBeSet: true}, {text: 'nope', shouldBeSet: false}, {text: 'dont know', shouldBeSet: true}]
  };

  inputType: string = this.getInputType();
  isSubmitted: boolean = false;

  getInputType(): string {
    const correctAnswersCount = this.question.options.filter(option => option.shouldBeSet === true).length;
    return correctAnswersCount > 1 ? 'checkbox' : 'radio'
  }

  onOptionSelect(option: Option): void {
    if (this.inputType === 'radio') {
      this.question.options.filter(option => option.set === true).forEach(option => option.set = false)
    }
    option.set = !option.set
  }

  onSubmit(): void {
    this.isSubmitted = true;
  }

  onNext(): boolean {
    return this.isAnswerCorrect()
  }

  defineAnsweredClass(option: Option): string {
    if (!this.isSubmitted) {
      return ''
    } else if (option.set && option.set === option.shouldBeSet) {
      return 'list-group-item-success'
    } else if (option.set && option.set !== option.shouldBeSet) {
      return 'list-group-item-danger'
    } else if (option.shouldBeSet) {
      return 'list-group-item-info'
    }
  }

  isAnswerCorrect() {
    return this.question.options.filter(option => option.shouldBeSet === option.set).length
      === this.question.options.filter(option => option.set === true).length
  }
}
