import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public signin:any;
  public abc:any;
  public oneSignalToken:any;
  public userInfo:any = [];
  public invalidCredential=false;
  deactive=false;


  
  constructor(private _AuthService:AuthenticationService,private router: Router) {
    this.signin = new FormGroup({      
      phoneOrEmail:new FormControl(),
      pass:new FormControl()                                   
       });
       this.checklogin();
   }
  
  ngOnInit() {
    
  }

  formSubmit(){
    this.deactive=false
    this.invalidCredential=false;
      var res = this.signin.value;   
      this.signin = new FormGroup({      
        phoneOrEmail : new FormControl(res.phoneOrEmail,[Validators.required] ),
        pass : new FormControl(res.pass,[Validators.required])                                       
      });
      
      if(this.signin.valid){    
        $("#overlayDivLoader").show();   
        this._AuthService.login(res).subscribe((data)=>{   
          
          $("#overlayDivLoader").hide();
          if(data=='success'){
            var OneSignal = window['OneSignal'] || [];
            OneSignal.push(function() {
              OneSignal.init({
                appId: "cf3acffd-20c8-4436-baf0-b27dc47160bf",
              });
            });
           
                OneSignal.getUserId().then(function (userId) {
                  console.log("User ID is", userId);
                  this.oneSignalToken=userId;
                  
            });
            
            this._AuthService.saveOnesignalId(this.oneSignalToken).subscribe((data)=>{
              console.log(data)
            })
           this.checklogin();
           
          }else{
         if(data=='Deactivate')
         {
          this.deactive=true;
         }else{
          this.invalidCredential=true;
         }
          
          }
        },
        error=>{
          console.log(error);
        }    
      );
    }  

    
    
      
  }


  checklogin(){

      
    let currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    if (currentUser !=null){

           let  info=JSON.parse(currentUser);
          if(info.userinfo.role =='tenant'){
            this.router.navigate(['/tenant-search']);
            }else if(info.userinfo.role =='landlord'){

              this.router.navigate(['/landlord-dash']);
            }else if (info.userinfo.role =='admin'){

              this.router.navigate(['/admin-dash']);
            }
            
            else{
            
            //  this.router.navigate(['/login']);
            }
      } else{
            
      // this.router.navigate(['/login']);
      }

  }

}
