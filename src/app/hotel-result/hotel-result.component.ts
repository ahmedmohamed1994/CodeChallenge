import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hotel-result',
  templateUrl: './hotel-result.component.html',
  styleUrls: ['./hotel-result.component.css']
})
export class HotelResultComponent implements OnInit {
public hotelSearchResults:any;
public hotelSearchParams:any;
public eventsSubject: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute) {

   }

  ngOnInit() {
    this.hotelSearchResults = this.route.snapshot.data.hotelSearchRes;
    this.hotelSearchParams = this.route.snapshot.queryParams;
  }
  filter(e: any,type:string) {
    this.eventsSubject.next(e);
    
  }
}
