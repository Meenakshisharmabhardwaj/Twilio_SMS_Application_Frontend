import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap,retry } from 'rxjs/internal/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of,throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SmsServiceService {
 localUrl="https://localhost:44344/sendSMS";

  constructor(private http: HttpClient) { }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
  sendSMS(data:any): Observable<any> 
  {
   return this.http.post<any>(this.localUrl, data);
  }
}
