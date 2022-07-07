import { Component, OnInit } from '@angular/core';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.css']
})
export class NewServiceComponent implements OnInit {

  userDetails = {
    other_file1:"",
    other_file2:"",
    other_file3:"",
    payment_for_no: 0,
    notes: "",
    payment_for: "",
  }
  services = []
  constructor(
    private app:AppOperationService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getPaymentsService()
  }
  getPaymentsService(){
    this.app.getPaymentfor().subscribe(res=>{
      this.services = res[appConstant.ITEMS] as any[]
      
    })
  }

  SendAction(){
    var formData = new FormData();
    let user =  this.app.checkLoggedInUser();

    formData.append("other_file1", this.userDetails.other_file1);
    formData.append("other_file2", this.userDetails.other_file2);
    formData.append("other_file3", this.userDetails.other_file3);
    formData.append("payment_for_no", String(this.userDetails.payment_for_no));
    formData.append("notes", this.userDetails.notes);
    formData.append("payment_for", this.userDetails.payment_for);
    formData.append("type", this.userDetails.payment_for);
    formData.append("ammount", String(this.userDetails.payment_for_no));
    formData.append("user_id", user._id);
   


    this.app.addRequest(formData).subscribe(res=>{
      let msg = res[appConstant.MESSAGE];
      if(res[appConstant.STATUS]){
        this.toastr.success(msg,'نجاح');
        this.router.navigate(["/request"])
      }else{
        this.toastr.error(msg,'خطأ');
      }
    })
  }

  processImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.userDetails.other_file1 = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = _event => {};
    }
  }

  processImage2(event) {
    if (event.target.files && event.target.files[0]) {
      this.userDetails.other_file2 = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = _event => {};
    }
  }

  processImage3(event) {
    if (event.target.files && event.target.files[0]) {
      this.userDetails.other_file3 = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = _event => {};
    }
  }
}
