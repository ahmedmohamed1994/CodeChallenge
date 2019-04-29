
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient) {

  }

  private requestOptions() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-type': 'application/json','Authorization': `Bearer ` + token});
    headers.append('Authorization', `Bearer ` + token);
    return headers;
  }

  
  get(url) {
    return this.http.get(url,{ headers: this.requestOptions(), observe: 'response' }).pipe(catchError(this.handleError));
  }
  delete(url) {
    return this.http.delete(url,  { headers: this.requestOptions(), observe: 'response' }).pipe(catchError(this.handleError));
  }
  post(url, data) {
    return this.http.post(url, data, { headers: this.requestOptions(), observe: 'response' }).pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }
}
