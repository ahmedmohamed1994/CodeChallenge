import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.css']
})
export class SearchHotelComponent implements OnInit {
  public from_date: string;
  public to_date: string;

  constructor(private router:Router) { }

  ngOnInit() {
    this.doJquery();
  }
  SearchHotel(){
    let from_date = $('input[name="from_date"]').val();
    let to_date = $('input[name="to_date"]').val();
    this.router.navigate(['/hotels/results'], { queryParams: { from: from_date,to:to_date } });
    console.log(from_date,to_date,'ss')
  }
  doJquery(){
    var that = this;
    $(() => {

      // date picker validation
     
      $('input[name="from_date"]').datepicker({
        startDate: '+' + 1 + 'd',
        endDate: "+" + 10 + "y",
        autoclose: true,
        title: "Check In",
        orientation: "bottom auto",
        format: "dd-mm-yyyy"

      });
      function padStr(num, size) {
        var s = num + "";
        while (s.length < size)
          s = "0" + s;
        return s;

      }


      $('input[name="to_date"]').datepicker({

        startDate: '+' + 1 + 'd',
        endDate: "+" + 10 + "y",
        autoclose: true,
        title: "Check out",
        orientation: " auto",
        format: "dd-mm-yyyy"
      });



      $('input[name="from_date"]').datepicker().on('changeDate', function () {
        let fromDate = $('input[name="from_date"]').datepicker('getDate');
        let toDate = $('input[name="to_date"]').datepicker('getDate');
        let formatted_fromDate = padStr(fromDate.getDate(), 2) + '-' + padStr(fromDate.getMonth() + 1, 2) + '-' +  fromDate.getFullYear();
        $('input[name="to_date"]').datepicker('setStartDate', formatted_fromDate);
        $('input[name="to_date"]').removeAttr('disabled');
        $('input[name="to_date"]').datepicker('show');
        $('input[name="to_date"]').val('');


      })
      $('input[name="to_date"]').datepicker().on('changeDate', function () {
        let toDate = $('input[name="to_date"]').datepicker('getDate');
        if (toDate) {
          let formatted_toDate = padStr(toDate.getDate(), 2) + '-' + padStr(toDate.getMonth() + 1, 2) + '-'  + toDate.getFullYear();
          
        }


      });


      if ($('input[name="from_date"]').val().length) {
        $('input[name="to_date"]').removeAttr('disabled');
        let date = new Date($('input[name="from_date"]').val());
        $('input[name="to_date"]').datepicker('setStartDate', date);
      }
     
    });
  }
}
