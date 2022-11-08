import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class AppValidation
{
  static MatchValidator(sourceName: string, targetName: string): ValidatorFn 
  {
    return (controls: AbstractControl): ValidationErrors | null => 
    {   
        // Get both controls
        const source = controls.get(sourceName);
        const target = controls.get(targetName);

      //if (checkControl?.errors && !checkControl.errors['matching'])
      //  return null;

      if (source?.value !== target?.value) 
      {
        // append error and return it
        controls.get(targetName)?.setErrors({ matching: true });
        return { matching: true };
      } 
      // null means they match OR no errors
      else 
        return null;
    };
  }
}