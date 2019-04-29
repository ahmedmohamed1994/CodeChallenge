import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-hotel-filter',
  templateUrl: './hotel-filter.component.html',
  styleUrls: ['./hotel-filter.component.css']
})
export class HotelFilterComponent implements OnInit {
 @Input() hotelSearchResults;
 @Input() hotelSearchParams;
 @Output() out: EventEmitter<any> = new EventEmitter<any>();

 public limitNames:number = 3;
 public limitCities:number = 3;

 public displayNames:boolean = true;
 public displayCities:boolean = true;
 /**
   * List of hotels 
   * 
   * @var Array
   */
  public hotelNames = [];

    /**
   * List of hotel cities
   * 
   *  @var Array
   */
  public hotelCities = [];
  /**
   * List of hotel prices
   * 
   *  @var Array
   */
  public hotelPrices = [];

  /**
   * Price range
   * 
   * @var Object
   */
  public priceRange = {
    min: 0,
    max: 0,
  };

  /**
   * hotel Currency
   * 
   * @var string
   */
  public hotelCurrency: string;

  /**
   * min price 
   * 
   * @var number
   */
  public minPrice: number;

  /**
   * max price 
   * 
   * @var number
   */
  public maxPrice: number;

  /**
   * filter Data
   * 
   * @var Object
   */
  public filterData = {
    hotelNames: [],
    hotelCities: [],
    priceRange: {
      min: null,
      max: null,
    },
  };
  public totals = {
    hotelNames: {},
    hotelCities:{},
  }

  public hotelNamesFilter = [];
  public hotelCitiesFilter = [];
  constructor() { }

  ngOnInit() {
    this.handleHotelResult();
   this.doJquery();
  }
  handleHotelResult() {
    for (let hotel of this.hotelSearchResults.hotels) {
      this.collectHotels(hotel);
      this.collectPrices(hotel);
      this.collectHotelCity(hotel);
      this.increaseHotels(hotel);
      this.increaseHotelCities(hotel);
    }
  }
    /**
   * Collect hotels that will be used on filter
   * 
   * @returns void
   */
  private collectHotels(hotel) {
    if (!this.hotelNames.includes(hotel.name)) {
      this.hotelNames.push(hotel.name);
      let uniqueNames = [];
      $.each(this.hotelNames, function (me, el) {
        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
      });
      this.hotelNames = uniqueNames;
    }
  }
    /**
   * collect room prices that will be used on filter
   * 
   * @returns void
   */
  private collectPrices(hotel) {
    if (!this.hotelPrices.includes(hotel.price)) {
      this.hotelPrices.push(hotel.price);
    }
    this.minPrice = Math.min(...this.hotelPrices);
    this.maxPrice = Math.max(...this.hotelPrices);
    this.hotelCurrency = 'USD';
  }
    /**
   * Collect hotels city name that will be used on filter
   * 
   * @returns void
   */
  private collectHotelCity(hotel) {
    if (!this.hotelCities.includes(hotel.city)) {
      this.hotelCities.push(hotel.city);
    }

  }
    /**
   * Increase number of hotels based on the given hotel name
   * 
   * @param hotel 
   */
  increaseHotels(hotel) {
    if (! this.totals.hotelNames[hotel.name]) {
      this.totals.hotelNames[hotel.name] = 0;
    }

    this.totals.hotelNames[hotel.name]++;
  }
   /**
   * Increase number of hotels based on the given city name
   * 
   * @param hotel 
   */
  increaseHotelCities(hotel) {
    if (! this.totals.hotelCities[hotel.city]) {
      this.totals.hotelCities[hotel.city] = 0;
    }

    this.totals.hotelCities[hotel.city]++;
  }
  filter(e: any, type: any) {
    let value = e.source.value;
    let checked = e.checked;
    if (type === 'hotelNames') {
      if (checked == true) {
        this.hotelNamesFilter.push(value);
        this.filterData[type] = this.hotelNamesFilter;
      } else {
        this.hotelNamesFilter.splice(this.hotelNamesFilter.indexOf(value), 1);
      }
    }
    else if (type === 'hotelCities') {
      if (checked == true) {
        this.hotelCitiesFilter.push(value);
        this.filterData[type] = this.hotelCitiesFilter;
      } else {
        this.hotelCitiesFilter.splice(this.hotelCitiesFilter.indexOf(value), 1);
      }

    }
    else {
      this.filterData.priceRange = this.priceRange;
    }
    this.out.emit(this.filterData);
  }
  doJquery() {
    $(() => {
      let priceSlider = $("#filterByPrice").ionRangeSlider({
        min: this.minPrice,
        max: this.maxPrice,
        from: this.minPrice,
        to: this.maxPrice,
        type: 'double',
        prefix: this.hotelCurrency,
        grid: true,
        grid_num: 10,
        onChange: priceSlider => {
          this.priceRange.min = priceSlider.from;
          this.priceRange.max = priceSlider.to;
          let obj = { checked: true, source: { value: this.priceRange } }
          this.filter(obj, 'priceRange');
        },
      });

      priceSlider = priceSlider.data('ionRangeSlider');

      priceSlider.update({
        min: this.minPrice,
        max: this.maxPrice,
        from: this.minPrice,
        to: this.maxPrice,
        type: 'double',
        prefix: this.hotelCurrency,
      });

    });
  }
  showMore(type){
    if(type == 'names'){
      this.displayNames = false;
      this.limitNames = this.hotelNames.length;
    }else if(type == 'cities'){
      this.displayCities = false;
      this.limitCities = this.hotelCities.length;
    }
  }
  showLess(type){
    if(type == 'names'){
      this.displayNames = true;
      this.limitNames = 3;
    }else if(type == 'cities'){
      this.displayCities = true;
      this.limitCities = 3;
    }
  }
  
}
