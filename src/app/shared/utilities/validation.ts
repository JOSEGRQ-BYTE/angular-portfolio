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

  static ContainsValidator(expression: RegExp, error: ValidationErrors): ValidatorFn 
  {
    return (control: AbstractControl): { [key: string]: any } | null => 
    {
        // If contains value test expression and return null if NO errors otherwise return error
        if(!!control.value)
            return expression.test(control.value) ? null : error;
        else        
            return null;
    };
  }
}