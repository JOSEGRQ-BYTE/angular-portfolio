import { Component, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast, ToastType } from './models/toast.model';
import { LoadingStatusService } from './services/loading-status/loading-status.service';
import { ToastNotificationService } from './services/notification/toast-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-portfolio';

  public toast$: Observable<Toast>;
  public loading$: Observable<boolean>;

  constructor(private toastService: ToastNotificationService, private loadingService: LoadingStatusService)
  {
    this.toast$ = this.toastService.toastSubject.asObservable();
    this.loading$ = this.loadingService.loading$;
  }

  getToastColor(type: ToastType | undefined)
  {
    switch (type) 
    {
      case ToastType.SUCCESS:
        return 'green';
      case ToastType.NOTIFICATION:
        return 'blue';
      case ToastType.ERROR:
        return 'red';
      case ToastType.WARNING:
          return 'yellow';
      default:
        return 'grey';
    }
  }

  onDismissToast()
  {
    this.toastService.dismissToast();
  }
}
