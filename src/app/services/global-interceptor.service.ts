import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import { Router } from "@angular/router";
import {
    MatSnackBar,
  } from '@angular/material/snack-bar';
 
@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
    
  constructor( private _snackBar: MatSnackBar) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept')
        this._snackBar.open('Failed to fetch data', 'Dismiss',{
          panelClass: 'notif-success'
        });
        return throwError(() => new Error('Failed to fetch data'));
      })
    )
  }
}