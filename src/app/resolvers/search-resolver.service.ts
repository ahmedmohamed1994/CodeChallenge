import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { map, take  } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { SearchHotelService } from '../services/search-hotel.service';

@Injectable()
export class SearchResolver implements Resolve<Observable<any>> {

    constructor(private searchHotelSer: SearchHotelService, private router: Router) {
       
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
       return  this.searchHotelSer.searchHotel().pipe(map((res: HttpResponse<any>) => {
           return res.body;
       }));
     
      }
    
}
