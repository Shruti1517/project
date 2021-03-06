import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import * as mygloabal  from'../mygloabal';
@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  private BaseUrl :string;
  private baseurl :string;

  constructor(private http: HttpClient) {

    this.BaseUrl=mygloabal.BaseUrl;
    this.baseurl=mygloabal.baseurl;
   }

  
  
  addTenant(info:any){
  return this.http.post<any>(this.BaseUrl +'addTenantByLand',info).pipe(map((res:any)=>{
    return res;
  }));
}


getTenantListCrByLand(){
    return this.http.get<any>(this.BaseUrl +'getTenantListCrByLand').pipe(map((res:any)=>{
      return res;
    }));
  }
  


  addLandlordStaff(info:any){
    return this.http.post<any>(this.BaseUrl +'addLandlordStaff',info).pipe(map((res:any)=>{
      return res;
    }));
  }

  getStaffCrByLand(){
    return this.http.get<any>(this.BaseUrl +'getStaffCrByLand').pipe(map((res:any)=>{
      return res;
    }));

  }

  
activeDeactivateLandStaff(info:any){

  return this.http.post<any>(this.BaseUrl +'activeDeactivateLandStaff',info).pipe(map((res:any)=>{
    return res;
  }));
}
linkTeants(info:any){

  return this.http.post<any>(this.BaseUrl +'linkUnitTenants',info).pipe(map((res:any)=>{
    return res;
  }));
}
removelinkTeants(info:any){

  return this.http.post<any>(this.BaseUrl +'removeTenants',info).pipe(map((res:any)=>{
    return res;
  }));
}
get_unit_data(info:any){

  return this.http.post<any>(this.BaseUrl +'get_unit_data_id',info).pipe(map((res:any)=>{
    return res;
  }));
}
get_tenant_data(info:any){

  return this.http.post<any>(this.BaseUrl +'get_tenant_data_id',info).pipe(map((res:any)=>{
    return res;
  }));
}
save_editTenantData(info:any){

  return this.http.post<any>(this.BaseUrl +'save_editTenant',info).pipe(map((res:any)=>{
    return res;
  }))
}
deleteTenant_data(info:any){

  return this.http.post<any>(this.BaseUrl +'delete_Tenant_data',info).pipe(map((res:any)=>{
    return res;
  }))
}
getLeaseData(info:any){

  return this.http.post<any>(this.BaseUrl +'get_lease_data',info).pipe(map((res:any)=>{
    return res;
  }))
}
getLandlordStaff_data(info:any){

  return this.http.post<any>(this.BaseUrl +'get_landlord_stafesData',info).pipe(map((res:any)=>{
    return res;
  }))
}
saveLandlordStaff_data(info:any){

  return this.http.post<any>(this.BaseUrl +'save_landlord_staff',info).pipe(map((res:any)=>{
    return res;
  }))
}
DeleteLandlordStaff_data(info:any){

  return this.http.post<any>(this.BaseUrl +'delete_landlord_staff',info).pipe(map((res:any)=>{
    return res;
  }))
}
addDesignationNew(info:any){

  return this.http.post<any>(this.BaseUrl +'add_new_designation',info).pipe(map((res:any)=>{
    return res;
  }))
}
getDesignation(info:any){

  return this.http.post<any>(this.BaseUrl +'get_all_designation',info).pipe(map((res:any)=>{
    return res;
  }))
}
addsuppliersNew(info:any){

  return this.http.post<any>(this.BaseUrl +'add_new_suppliers',info).pipe(map((res:any)=>{
    return res;
  }))
} 
getSuppliersList(info:any){

  return this.http.post<any>(this.BaseUrl +'get_suppliers_list',info).pipe(map((res:any)=>{
    return res;
  }))
}
getEditSuppliersData(info:any){

  return this.http.post<any>(this.BaseUrl +'get_edit_suppliers_data',info).pipe(map((res:any)=>{
    return res;
  }))
}
saveEditSuppliersData(info:any){

  return this.http.post<any>(this.BaseUrl +'save_edit_suppliers_data',info).pipe(map((res:any)=>{
    return res;
  }))
}
deleteConfirmSupplier(info:any){

  return this.http.post<any>(this.BaseUrl +'delete_confirm_supplier',info).pipe(map((res:any)=>{
    return res;
  }))
}
getTransactionType(info:any){
  return this.http.post<any>(this.BaseUrl +'get_transaction_type',info).pipe(map((res:any)=>{
    return res;
  }));
}

getNotification()
{
  return this.http.get<any>(this.BaseUrl+"getnotification").pipe(map(res=>{
    return res;
  }))
}
get_request_data(){
  
  return this.http.get<any>(this.baseurl +'get_request_data').pipe(map((res:any)=>{
    return res;
  }));

}

}
