import { displayValidationMessage } from '../message';

test('Должен правильно отображать сообщение', () => {
  const element = document.createElement('div');
  displayValidationMessage(element, 'Test Message');
  expect(element.textContent).toBe('Test Message');
});
