import { Validator } from '../Validator';

describe('Validator class', () => {
  let validator;

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <input class="input" />
        <div class="validation-message"></div>
        <div class="card-logo visa"></div>
        <div class="card-logo mastercard"></div>
      </div>
    `;

    validator = new Validator();
  });

  test('isValidCardNumber должен вернуть true для валлидного номера карты', () => {
    const validCardNumber = '4111111111111111';
    expect(validator.isValidCardNumber(validCardNumber)).toBe(true);
  });

  test('isValidCardNumber должен вернуть false для невалидного номера карты', () => {
    const invalidCardNumber = '1234567890123456';
    expect(validator.isValidCardNumber(invalidCardNumber)).toBe(false);

    const invalidCardNumberRegEx = '1234 5678 9012 abc';
    expect(validator.isValidCardNumber(invalidCardNumberRegEx)).toBe(false);
  });

  test('getCardType должен вернуть корректный тип карты', () => {
    expect(validator.getCardType('4111111111111111')).toBe('visa');
    expect(validator.getCardType('5152674556410329')).toBe('mastercard');
    expect(validator.getCardType('6011111111111117')).toBe('maestro');
    expect(validator.getCardType('343116428895577')).toBe('american_express');
    expect(validator.getCardType('2200700148940686')).toBe('mir');
    expect(validator.getCardType('1234567890123456')).toBe('Unknown');
  });

  test('validateCard должен вывести сообщение для валидного номера карты', () => {
    const validCardNumber = '4111111111111111';
    validator.cardInput.value = validCardNumber;
    validator.validateCard({ preventDefault: jest.fn() });

    const expectedMessage = 'Карта действительна. Тип: visa';
    expect(validator.validationMessage.textContent).toBe(expectedMessage);
  });

  test('validateCard должен вывести сообщение для невалидного номера карты', () => {
    const invalidCardNumber = '1234567890123456';
    validator.cardInput.value = invalidCardNumber;
    validator.validateCard({ preventDefault: jest.fn() });

    const expectedMessage = 'Invalid card number. Try again';
    expect(validator.validationMessage.textContent).toBe(expectedMessage);
  });

  test('updateCardLogoVisibility обновить видимость логотипов для карт', () => {
    const validCardNumber = '4111111111111111';
    validator.updateCardLogoVisibility(validCardNumber);

    expect(validator.cardLogos[0].style.filter).toBe('brightness(100%)');
    expect(validator.cardLogos[1].style.filter).toBe('brightness(45%)');
  });

  test('handleCardInput обновить видимость логотипов для карт в инпуте', () => {
    const validCardNumber = '4111111111111111';
    validator.cardInput.value = validCardNumber;
    validator.handleCardInput();

    expect(validator.cardLogos[0].style.filter).toBe('brightness(100%)');
    expect(validator.cardLogos[1].style.filter).toBe('brightness(45%)');
  });

  test('handleCardInput должен сбросить видимость логотипов для карт в инпуте', () => {
    validator.cardInput.value = '';
    validator.handleCardInput();

    expect(validator.validationMessage.textContent).toBe('');
    expect(validator.cardLogos[0].style.filter).toBe('brightness(100%)');
    expect(validator.cardLogos[1].style.filter).toBe('brightness(100%)');
  });
});
