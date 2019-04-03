import { Component, OnInit } from '@angular/core';
import{ LandlordService } from '../../_services/landlord.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from '../../mygloabal';

@Component({
  selector: 'app-land-nav',
  templateUrl: './land-nav.component.html',
  styleUrls: ['./land-nav.component.css']
})
export class LandNavComponent implements OnInit {
public profilephoto:any;
url=Url;
  constructor(private router:Router,public landlordService: LandlordService) { 

    let userInfo= JSON.parse(localStorage.getItem('currentUser'));
   this.profilephoto= userInfo.userinfo.profilephoto;

  }

  ngOnInit() {

    this.getNotification()
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getNotification()
  {
      this.landlordService.getNotification().subscribe((data)=>{
        console.log(data);
      })  
  }
}
