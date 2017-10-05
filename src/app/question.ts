export class Option {
  text: string;
  shouldBeSet: boolean;
  set?: boolean;
}

export class Question {
  question: string;
  options: Option[];
}

export class Survey {
  name: string;
  questions: Question[];
}
