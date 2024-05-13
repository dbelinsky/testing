import { Validator } from './Validator';

document.addEventListener('DOMContentLoaded', () => {
  const validator = new Validator();

  document.querySelector('.input').addEventListener('input', validator.handleCardInput.bind(validator));
  document.querySelector('.button').addEventListener('click', validator.validateCard.bind(validator));
});
