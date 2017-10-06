import {Question, Survey} from './survey';

export let question42: Question = {
  question: 'Answer to the Ultimate Question of Life, the Universe, and Everything',
  options: [{text: '93', shouldBeSet: false}, {text: '42', shouldBeSet: true}, {text: '21', shouldBeSet: false}]
};

export let questionVegetables: Question = {
  question: 'Select only vegetables',
  options: [
    {text: 'Potato', shouldBeSet: true},
    {text: 'Rock', shouldBeSet: false},
    {text: 'Cucumber', shouldBeSet: true},
    {text: 'Mushroom', shouldBeSet: false}]
};

export let SURVEY: Survey = {
  name: 'Example survey',
  questions: [
    question42,
    questionVegetables,
  ]
};
