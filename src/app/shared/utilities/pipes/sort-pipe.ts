import { Pipe, PipeTransform } from '@angular/core';
//import { orderBy } from 'lodash';

@Pipe({ name: 'sortByProperty' })
export class SortByPropertyPipe implements PipeTransform {

  transform(currentArray: any[], property: string | null = null, precedence: string | null = null): any[] 
  {
    if(!currentArray)
        return currentArray;

    if (currentArray.length == 0 || precedence == null || property == null) 
        return currentArray;

    if (currentArray.length <= 1) 
        return currentArray;

    if (!property) // MAKE ASC DEFAULT
    { 
        if(precedence.toUpperCase() == 'DESC')
            return currentArray.sort().reverse();
        return currentArray.sort();
        
    }
    
    return currentArray.sortByProperty(property, precedence);
  }
}