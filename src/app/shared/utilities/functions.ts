export default class FunctionHelpers
{
  static IsIntanceOfError(obj: any): boolean 
  {
    if (obj && obj.hasOwnProperty('error') && obj.hasOwnProperty('status'))
        return true;
    return false;
  }

  static sortByProperty(property: string, precedence: string | null = null) : any[]
  { 
    if(!Array.isArray(this))
      return [];

    return this.sort((firstObject, secondObject) => 
    {
        if (firstObject[property] < secondObject[property]) 
        {
          if(precedence == null || precedence.toUpperCase() == 'ASC')
            return -1;
          return 1;
        }
        if (firstObject[property] > secondObject[property]) 
        {
          if(precedence == null || precedence.toUpperCase() == 'ASC')
            return 1;
          return -1;
        }

        return 0
    });
}
}