import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-register-donator',
  templateUrl: './register-donator.component.html',
  styleUrls: ['./register-donator.component.css']
})
export class RegisterDonatorComponent implements OnInit {
  @ViewChild("btnFile") btnFile: ElementRef;

  userDetails = {
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
  file_url = ""
  constructor(private helper: AppOperationService,private route: ActivatedRoute,private toastr: ToastrService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getPaymentsService()
  
  }

  getPaymentsService(){
    this.helper.getPaymentmethod().subscribe(res=>{
      this.services = res[appConstant.ITEMS] as any[]
    })
  }
  SendAction(){
    this.helper.addUer(this.userDetails).subscribe(res=>{
      let msg = res[appConstant.MESSAGE];
      if(res[appConstant.STATUS]){
        this.toastr.success(msg,'نجاح');
        // let files = res["files"] as any[];
        // this.file_url = files[0].file_url;
        let userId = res["items"]["_id"];
        this.addPayment(userId);

        setTimeout(() => {
          // this.btnFile.nativeElement.click();
          this.router.navigate(["/login"]);
        }, 1000);
      }else{
        this.toastr.error(msg,'خطأ');
      }
    })
  }

  addPayment(userId){
    var obj = {
      isComplete: "1",
      ammount: this.userDetails.ammount,
      from_user:userId,
      methodType : this.userDetails.paymentMethod_id,
    }
    this.helper.addPayment(obj).subscribe(res=>{

    })
  }
  
}
