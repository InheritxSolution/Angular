import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class ValidationService {

  constructor() { }
  /**
   * email validation
   */
  emailValidator(control) {
    if (control.value != "" && 
    control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  /**
   * mobile validation
   */
  mobileValidator(control) {
    const pattern = /[-( )0-9]+$/;
    if (!pattern.test(control.value)) {
      return { 'invalidMobile': true };
    }
    else{
      return null;
    }
  }

  /**
  * Compare Two Field
  */
  compareField(firstKey: string, secondKey: string) {
    return (group: FormGroup) => {
      let firstField = group.controls[firstKey];
      let secondfield = group.controls[secondKey];
      if (firstField.value !== secondfield.value) {
        return secondfield.setErrors({ notEquivalent: true });
      }
      else {
        (secondfield.errors !== null && secondfield.errors['notEquivalent'] !== undefined) ? secondfield.setErrors(null) : false;
      }
    }
  }
  
  /**
  * Validate if url is in proper format
  */
  urlvalidation(control){
    const pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!pattern.test(control.value)) {
      return { 'invalidURL': true };
    }
    else{
      return null;
    }
  }

}
