import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordValidator(
  formControl: AbstractControl
): ValidationErrors {
  const password = formControl.value;

  const errors = {
    ...hasMinLength(password),
    ...hasMinNumber(password),
    ...hasMinUpper(password),
    ...hasMinLower(password),
    ...hasSpecialCharacter(password),
  };

  const hasErros = Object.keys(errors).length > 0;

  return hasErros ? errors : null;
}

function hasMinLength(password: string) {
  const valid = /([0-9a-zA-Z.#?!@$%^&*-+/]){8,}/.test(password);

  return valid ? {} : { hasMinLengthError: true };
}

function hasMinNumber(password: string) {
  const valid = /([0-9]){2,}/.test(password);

  return valid ? {} : { hasMinNumberError: true };
}

function hasMinUpper(password: string) {
  const valid = /([A-Z]){1,}/.test(password);

  return valid ? {} : { hasMinUpperError: true };
}

function hasMinLower(password: string) {
  const valid = /([a-z]){1,}/.test(password);

  return valid ? {} : { hasMinLowerError: true };
}

function hasSpecialCharacter(password: string) {
  const valid = /([.#?!@$%^&*-+/]){1,}/;

  return valid ? {} : { hasSpecialCharacterError: true };
}
