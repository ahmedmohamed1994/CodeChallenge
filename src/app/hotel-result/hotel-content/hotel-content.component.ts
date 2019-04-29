import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hotel-content',
  templateUrl: './hotel-content.component.html',
  styleUrls: ['./hotel-content.component.css']
})
export class HotelContentComponent implements OnInit {
  @Input() hotelSearchResults;
  @Input() hotelSearchParams;
  @Input() events: Observable<void>;


  public showLoader: boolean;
  public numberOfNights: number;
  public hotelSearchResponse: any[];
  public hotels: any[];
  public displayedHotels: any[];
  public fromDate:any;
  public toDate:any;
  public displayLoadMoreBtn = true;

  
  
  private limit = 0; 
  private hotelsPerPage = 5;
  private eventsSubscription: any

  constructor() { }

  ngOnInit() {
    this.handleHotelResult(this.hotelSearchParams, this.hotelSearchResults);

    this.eventsSubscription = this.events.subscribe((data) => this.filterHotels(data));
this.getAvailable();
  }
  filterHotels(filteredData: any) {
    this.hotels = this.hotelSearchResponse.filter(hotel => {
      let available = true;

      if (filteredData.hotelNames.length > 0) {
        available = available && filteredData.hotelNames.includes(hotel.name);
      }


      if (filteredData.hotelCities.length > 0) {
        available = available && filteredData.hotelCities.includes(hotel.city);
      }

      if (filteredData.priceRange.min != null) {
        available = available && hotel.price >= filteredData.priceRange.min;        
      }

      if (filteredData.priceRange.max != null) {
        available = available && hotel.price <= filteredData.priceRange.max;        
      }

      return available;
    });

    this.handleFirstDisplay();

    this.handleLoadMore();
  }
    /** 
   * Init first display of hotels
  */
 handleFirstDisplay() {
  this.displayedHotels = [];
  this.limit = this.hotelsPerPage;
}

/**
 * Handle load more button
 */
private handleLoadMore() {
  this.displayedHotels = this.hotels.slice(0, this.limit);
  this.displayLoadMoreBtn = this.hotels.length > this.hotelsPerPage && this.displayedHotels.length < this.hotels.length;
}

/**
 * Load more hotels by increasing value 
 */
loadMoreHotels() {
  this.limit += this.hotelsPerPage;
  this.handleLoadMore();
}
handleHotelResult(data: any, result: any) {
    this.hotelSearchResponse = result.hotels;
    this.hotels = result.hotels;
    this.handleFirstDisplay();
    this.handleLoadMore();
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date(data.to);
    let secondDate = new Date(data.from);
    this.toDate = data.to;
    this.fromDate =data.from;
    this.numberOfNights = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
} 
sort(type){
if(type == 'high'){
  this.hotelSearchResponse.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
}else if (type == 'low'){
  this.hotelSearchResponse.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}else if (type == 'a-z'){
  this.hotelSearchResponse.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
}
else if (type == 'z-a'){
  this.hotelSearchResponse.sort((a, b) => a.name !== b.name ? a.name < b.name ? 1 : -1 : 0);
}
this.handleFirstDisplay();

this.handleLoadMore();
}

getAvailable(){
// let fromDate  = new Date(from);
// let toDate  = new Date(to);
// if(this.fromDate <= fromDate && this.toDate <= toDate){
//     return 'available';
// }else{
//   return 'not available';
// }
let dateFrom = this.fromDate;
let dateTo = this.toDate;
console.log(dateFrom);
console.log(dateTo);

let d1 = dateFrom.split("-");
let d2 = dateTo.split("-");

let from_ = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
let to_   = new Date(d2[2], parseInt(d2[1])-1, d2[0]); 



let dates= ["01-06-2020", "02-07-2020", "02-08-2020", "02-09-2020", "02-07-2023", "12-10-2020", "02-011-2020"];

dates.forEach(element => {
   let parts:any = element.split("-");
   let date= new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
        if (date >= from_ && date <= to_) {
           console.log('dates in range', date);
        }
})
 }
}
