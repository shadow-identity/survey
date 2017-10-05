import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'survey-result',
  templateUrl: './result.component.html'
})

export class ResultComponent {
  @Input() correctAnswers: number;
  @Input() totalAnswers: number;
  @Output() doAgain = new EventEmitter<boolean>();

  onReset() {
    this.doAgain.emit()
  }
}
