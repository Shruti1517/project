import { Component, OnInit } from '@angular/core';
import {TenantService } from '../../_services/tenant.service';
import { FormControl,FormGroup, Validators,FormArray, FormBuilder} from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Url } from '../../mygloabal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { generate } from 'rxjs';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
declare var $ :any;
@Component({
  selector: 'app-tenant-servies-req',
  templateUrl: './tenant-servies-req.component.html',
  styleUrls: ['./tenant-servies-req.component.css']
})
export class TenantServiesReqComponent implements OnInit {
  closeResult: string;
  unitData:any;
  unit_id:any;
  url=Url;
  
  /*** Service Request Section Variable:Start */
  serviceRequest=false;
  name:string;
  unitName:any;
  Submit:any;
  unit_data:any;
  serviceAddForm:FormGroup;
  editServiceAddForm:FormGroup;
  transactionFile:any;
  serviceRequstData:any;
  editservice=[];
  editServiceRequestData:any;
  /*** Service Request Section Variable:End */

  /*** Transaction Section Variable:Start */
  transactionDetails:any;
  transactionHistory:any;
  transaction:any;
  additonal:any;
  deduction:any;
  /*** Transaction Section Variable:End */

  /*** History Section Variable:Start */
  history=false;
  /*** History Section Variable:End */

  /*** contact Section Variable:Start */
   contact=false;
  /*** contact Section Variable:End */

   /*** Lease Section Variable:Start */
   leaseDetails=false;
   lease_data:any;
  /*** Lease Section Variable:End */

  /*** Files Section Variable:Start */
  addTenantDocumentForm:FormGroup;
  filesDetails=false;
  files_data:any;
  tenantDocument=false;
  addFilesSubmit=false;
  documentType:any;
  Doument:any;
  /*** Files Section Variable:End */
  
  constructor(public tenantService:TenantService,public toastr:ToastrManager,public formBuilder:FormBuilder) {


   }

  ngOnInit() {
    /* Transaction Details Section in ngOnInit:start */
    this.transactionDetails=true;
    this.tenantService.getTransactionDetails().subscribe((data)=>{
    this.transactionHistory=data['transaction_data'];
    console.log(this.transactionHistory);
     this.unitData=data['unit_data'][0];
     this.unit_id=this.unitData['id'];
    });
     /* Transaction Details Section in ngOnInit:END*/
    /* Files Details Section :Start */
    this.addTenantDocumentForm = this.formBuilder.group({
      document_name:['',Validators.required],
      document_type:['',Validators.required],
      document_file:['',Validators.required]
    });
    /* Files Details Section :END */

    this.Submit=false;
   

    this.serviceAddForm=this.formBuilder.group({
      unit_id:['', Validators.required],
      title:['', Validators.required],
      details:['', Validators.required],
      file:['']
      
    });

    this.editServiceAddForm=this.formBuilder.group({
      unit:['', Validators.required],
      title:['', Validators.required],
      details:['', Validators.required],
      file:['']
      
    });

  }
  detectTransactionFile(event)
  {
    this.transactionFile=event.target.files;
  }
  sendRequest()
  {
    this.Submit=true;
    if(this.serviceAddForm.valid)
    {
      var  formData = new FormData();
      console.log(this.transactionFile);
      if(this.transactionFile !=undefined)
      {
        formData.append('selecteFiles',this.transactionFile[0]);
      }
     
      formData.append('unit_id',this.unit_data);
      formData.append('title',this.serviceAddForm.value.title);
      formData.append('description',this.serviceAddForm.value.details);

     // this.serviceAddForm.controls['unit_id'].setValue(this.unit_data);
      this.tenantService.addRequest(formData).subscribe((data)=>{
        this.toastr.successToastr(' Service request sent successfully ', 'Success!');
        $('#ProfileUpdateModal').modal('hide');
        this.Submit=false;
        this.ngOnInit();
      })
    }
    
  }
  hideAddRequest()
  {
    $('#ProfileUpdateModal').modal('hide');
    this.serviceAddForm.reset();
  }
  hideEditRequest()
  {
    $('#editServiceRequst').modal('hide');
  }

  editServiceRequest(ind)
  {
    
    this.editservice=this.editServiceRequestData[ind];
    console.log(this.editservice);
    $('#editServiceRequst').modal('show');
  }
  get addServiceForm()
  {
    return this.serviceAddForm.controls;
  }
  get editServiceForm()
  {
    return this.editServiceAddForm.controls;
  }
  SentServiceRequest()
  {
    $('#ProfileUpdateModal').modal('show');
  }

  /********************************************Transaction  Section :Start **************************************/

  /*########### Transaction Details PopUp:Start ###########*/
  transactionDetailsShow()
  {
    this.contact=false;
    this.history=false;
    this.transactionDetails=true;
    this.serviceRequest=false;
    this.leaseDetails=false;
    this.filesDetails=false;
  }
  showReciptPopup(transaction_id)
  {
    this.tenantService.getReciptData(transaction_id).subscribe((data)=>{
     this.transaction=data['transaction'];
     this.additonal=data['additonal'];
     this.deduction=data['deduction'];
     console.log(data);
    })
    $('#myModalRecipt').modal('show');
  }
  hideRecipt()
  {
    $('#myModalRecipt').modal('hide');
  }
  genratePdf()
  {
    var data = document.getElementById('PdfRecipt');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Transaction.pdf'); // Generated PDF   
    });  
    
  }
 /*########### Transaction Details PopUp:End ###########*/
  /********************************************Transaction Section :END **************************************/
  
  /********************************************Lease Section :Start **************************************/

  /*########### Show Lease Details PopUp:Start ###########*/
  leaseDeatilsShow()
  {
    this.tenantService.getleaseDetails().subscribe((data)=>{
      this.lease_data=data;
    });
    this.contact=false;
    this.history=false;
    this.transactionDetails=false;
    this.serviceRequest=false;
    this.leaseDetails=true;
    this.filesDetails=false;
  }
 /*########### Show Lease Details PopUp:End ###########*/
  /********************************************Lease Section :END **************************************/
  
  /********************************************Files Section :Start **************************************/



  filesDetailsShow()
  {
    this.tenantService.getFilesDetails().subscribe((data)=>{
    this.files_data=data;
    });
    this.filesDetails=true;
    this.contact=false;
    this.history=false;
    this.transactionDetails=false;
    this.serviceRequest=false;
    this.leaseDetails=false;

  }
  get addDocTenantForm(){
    return this.addTenantDocumentForm.controls;
  }

  detectDocumentFile(event:any)
  {
    this.Doument=event.target.files;
  }
  addTenantDocumentPopup()
  {   
    this.tenantService.getDocumnetType(this.unit_id).subscribe((data)=>{
    this.documentType=data['document_type'];
      });
    this.tenantDocument=true;
  }

    
  cancelTenantDocumentPopup()
  {
     this.tenantDocument=false;
  }
  

 
   addTenantDocument()
   {
    this.addFilesSubmit=true;
     if(this.addTenantDocumentForm.valid)
     {
      // document_name:['',Validators.required],
      // document_type:['',Validators.required],
      // document_file:['',Validators.required]
       var formData= new FormData();
       formData.append('selectFile',this.Doument[0]);
       formData.append('unit_id',this.unit_id);
       formData.append('document_name',this.addTenantDocumentForm.value.document_name);
       formData.append('document_type',this.addTenantDocumentForm.value.document_type);
       formData.append('document_file',this.addTenantDocumentForm.value.document_file);


       //var alldata={'unit_id':this.unit_id,'data':this.addTenantDocumentForm.value}
       this.tenantService.saveAddTenantDocument(formData).subscribe((data)=>{
         console.log(data);
        this.toastr.successToastr('Document Added successfully ', 'Success!');
        this.addFilesSubmit=false;
        this.tenantDocument=false;
        this.documentType=data['document_type'];
        });
     }
     
   }
 
  /********************************************Files Section :END **************************************/

   /********************************************History Section :Start **************************************/

   /*############ Display History Details:Start ##############*/
  historyDetailsShow()
  {
    this.contact=false;
    this.history=true;
    this.transactionDetails=false;
    this.serviceRequest=false;
    this.leaseDetails=false;
    this.filesDetails=false;
  }

  /*############ Display History Details:END ##############*/
  /********************************************History Section :END **************************************/

  /************************************Service Request Section :Start **************************************/

   /*############ Service Request Details:Start ##############*/
  serviceRequestDetailsShow()
  {
    $('.overlayDivLoader').show();
    this.tenantService.getTenantServiceData().subscribe((data)=>{
      if(data['unit_data'].length !=0)
      {
         this.unitName=data['unit_data'][0]['flatHoseNo'];
         this.unit_data=data['unit_data'][0]['id'];
      }
     
      this.serviceRequstData=data['service_request'];
      this.editServiceRequestData=data['service_request'];
      console.log(data);
      console.log('dzgv');
    })
    this.contact=false;
    this.history=false;
    this.transactionDetails=false;
    this.serviceRequest=true;
    this.leaseDetails=false;
    this.filesDetails=false;
    $('.overlayDivLoader').hide();
  }

   /*############ Service Request Details:End ##############*/

  /**************************************Service Request Section :END **************************************/
  
  /************************************Contact Landlord Section :Start **************************************/

   /*############ Contact Landlord Details:Start ##############*/
   contactLandlordShow()
   {
    this.contact=true;
    this.history=false;
    this.transactionDetails=false;
    this.serviceRequest=false;
    this.leaseDetails=false;
    this.filesDetails=false;
   }
 
    /*############ Contact Landlord Details:End ##############*/


    showAllMessage()
    {
      $('#tenantMessage').modal('show');
    }
 
   /**************************************Contact Landlord Section :END **************************************/
   
   
 
  
  
  editRequest()
  {
    this.Submit=true;
    if(this.editServiceAddForm.valid)
    {
      var  formData = new FormData();
      console.log(this.transactionFile);
      if(this.transactionFile !=undefined)
      {
        formData.append('selecteFiles',this.transactionFile[0]);
      }
     formData.append('id',this.editservice['id']);
      formData.append('unit_id',this.editservice['unit_id']);
      formData.append('title',this.editServiceAddForm.value.title);
      formData.append('description',this.editServiceAddForm.value.details);

     // this.serviceAddForm.controls['unit_id'].setValue(this.unit_data);
      this.tenantService.editRequest(formData).subscribe((data)=>{
        
         this.toastr.successToastr(' Service request Update successfully ', 'Success!');
        $('#editServiceRequst').modal('hide');
        this.Submit=false;
        // this.ngOnInit();
      })
    }
    
  }
  
  // open(content) {
  //    this.name="amol";
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {

  //     console.log(reason)
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
 
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  // save(content){

  // }

}
