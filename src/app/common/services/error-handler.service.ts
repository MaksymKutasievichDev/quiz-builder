import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  public handleError(error: any): void {
    console.warn(`Something went wrong`, error);
    //POST request for sending error to the backend
  }
}
