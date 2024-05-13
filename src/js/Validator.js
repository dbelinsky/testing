/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { displayValidationMessage } from './message';

// eslint-disable-next-line import/prefer-default-export
export class Validator {
  constructor() {
    this.cardInput = document.querySelector('.input');
    this.validationMessage = document.querySelector('.validation-message');
    this.cardLogos = document.querySelectorAll('.card-logo');

    this.handleCardInput = this.handleCardInput.bind(this);
    this.validateCard = this.validateCard.bind(this);
  }

  isValidCardNumber(cardNumber) {
    const cleanedNumber = cardNumber.replace(/\s/g, '');

    if (!/^\d{13,19}$/.test(cleanedNumber)) {
      return false;
    }

    const digits = Array.from(cleanedNumber, Number).reverse();

    for (let i = 1; i < digits.length; i += 2) {
      digits[i] *= 2;
      if (digits[i] > 9) {
        digits[i] -= 9;
      }
    }

    return digits.reduce((acc, val) => acc + val, 0) % 10 === 0;
  }

  getCardType(cardNumber) {
    const cleanedNumber = cardNumber.substr(0, 16);
    const firstDigit = cleanedNumber.charAt(0);

    if (/^4/.test(firstDigit)) {
      return 'visa';
    } else if (/^5/.test(firstDigit)) {
      return 'mastercard';
    } else if (/^2/.test(firstDigit)) {
      return 'mir';
    } else if (/^6/.test(firstDigit)) {
      return 'maestro';
    } else if (/^3[47]/.test(cleanedNumber)) {
      return 'american_express';
    } else {
      return 'Unknown';
    }
  }

  validateCard(event) {
    event.preventDefault();
    const cardNumber = this.cardInput.value.replace(/\s/g, '');

    if (this.isValidCardNumber(cardNumber)) {
      const cardType = this.getCardType(cardNumber);
      const message = `Карта действительна. Тип: ${cardType}`;
      displayValidationMessage(this.validationMessage, message);
    } else {
      displayValidationMessage(this.validationMessage, 'Invalid card number. Try again');
    }
  }

  updateCardLogoVisibility(cardNumber) {
    const cardType = this.getCardType(cardNumber);

    this.cardLogos.forEach((logo) => {
      if (logo.classList.contains(cardType)) {
        logo.style.filter = 'brightness(100%)';
      } else {
        logo.style.filter = 'brightness(45%)';
      }
    });
  }

  handleCardInput() {
    const cardNumber = this.cardInput.value.replace(/\s/g, '');

    if (cardNumber.trim() === '') {
      this.validationMessage.textContent = '';
      this.cardLogos.forEach((logo) => {
        logo.style.filter = 'brightness(100%)';
      });
    } else {
      this.updateCardLogoVisibility(cardNumber);
    }
  }
}
