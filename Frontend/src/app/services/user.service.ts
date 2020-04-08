import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  isLogged: boolean = false;

  //Validador password.
  matchValidator(controlName: string, matchControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchControl = formGroup.controls[matchControlName];

      if (matchControl.errors && !matchControl.errors.mustMatch) {
        // return si otro validador ha encontrado algun error en el matchControl
        return;
      }

      // Genera un error si no existe matching de passwords
      if (control.value !== matchControl.value) {
        matchControl.setErrors({ mustMatch: true });
      } else {
        matchControl.setErrors(null);
      }
    }
  }
}
