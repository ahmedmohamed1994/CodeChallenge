import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';
@Injectable({
  providedIn: 'root'
})
export class SearchHotelService {
  baseUrl = environment.apiUrl ;

  constructor(private http:HttpClientService) { }

  searchHotel(){
     return this.http.get(this.baseUrl);
  }
}
