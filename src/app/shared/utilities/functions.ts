export default class FunctionHelpers
{
  static IsIntanceOfError(obj: any): boolean 
  {
    if (obj && obj.hasOwnProperty('error') && obj.hasOwnProperty('status'))
        return true;
    return false;
  }
}