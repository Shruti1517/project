import { Component, OnInit } from '@angular/core';
import {LandlordService} from '../../_services/landlord.service';
@Component({
  selector: 'app-request-landloard-dash',
  templateUrl: './request-landloard-dash.component.html',
  styleUrls: ['./request-landloard-dash.component.css']
})
export class RequestLandloardDashComponent implements OnInit {
data:any []=[];
config: any;
  constructor(private landlordService:LandlordService) {
    this.config= {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems:this.data.length
    };
   } 
  ngOnInit() {
    this.landlordService.get_request_data().subscribe((res: any) => {
      this.data=res;
      console.log(res);   
     }, (error) => {
       console.log(error);
     })    
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
}
