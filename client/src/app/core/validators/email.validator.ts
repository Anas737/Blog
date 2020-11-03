import { AbstractControl, ValidationErrors } from '@angular/forms';

export function EmailValidator(formControl: AbstractControl): ValidationErrors {
  const valid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/.test(
    formControl.value
  );

  return valid ? null : { hasEmailError: true };
}
