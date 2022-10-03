import { Injectable } from '@angular/core';


export enum UserModes 
{
  LIGHT = 'light',
  DARK = 'dark',  
}

@Injectable({
  providedIn: 'root'
})
export class UserModeService 
{
  private readonly defaultMode: UserModes = UserModes.LIGHT;
  private readonly activeStyle: HTMLLinkElement;

  constructor() 
  {
    this.activeStyle = document.createElement('link');
    this.activeStyle.rel = 'stylesheet';
    document.head.appendChild(this.activeStyle);

    if (!!localStorage.getItem('user-mode')) 
      this.activeStyle.href = `/${this.currentUserMode}.css`;
  }



  public get currentUserMode(): UserModes 
  {
    const userMode = localStorage.getItem('user-mode') as UserModes;
    return userMode ?? this.defaultMode;
  }

  public set userMode(mode: UserModes)
  {
    localStorage.setItem('user-mode', mode);
    this.activeStyle.href = `/${mode}.css`;
  }
}
