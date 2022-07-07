import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-update-donator',
  templateUrl: './update-donator.component.html',
  styleUrls: ['./update-donator.component.css']
})
export class UpdateDonatorComponent implements OnInit {

  userDetails = {
    _id:"",
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    Id_no: "",
    user_type: "admin",
    paymentMethod_type: "",
    ammount: 0,
    paymentMethod_id: "",
    type: "",
    notes:""
  }

  donate_type = ['لمرة واحد','اقتطاع شهري ','اقتطاع سنوي']
  services = []
  constructor(private helper: AppOperationService,private route: ActivatedRoute,private toastr: ToastrService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getPaymentsService()
    this.getDonatorProfile()
   
  }

  getDonatorProfile(){
    let user =  this.helper.checkLoggedInUser();
    this.helper.getAdminPorofile(user._id).subscribe(res=>{
      let response =  res[appConstant.ITEMS] as any
      this.userDetails = response

      this.userDetails.paymentMethod_id = response.payment_for._id
    })
  }

  getPaymentsService(){
    this.helper.getPaymentmethod().subscribe(res=>{
      this.services = res[appConstant.ITEMS] as any[]
    })
  }

  SendAction(){
    this.helper.updateAdmin(this.userDetails._id,this.userDetails).subscribe(res=>{
      let msg = res[appConstant.MESSAGE];
      if(res[appConstant.STATUS]){
        this.toastr.success(msg,'نجاح');
      }else{
        this.toastr.error(msg,'خطأ');
      }
    })
  }
}
