import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  @ViewChild("btnFile") btnFile: ElementRef;
  userDetails = {
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    Id_no: "",
    user_type: "user",
    gender: "",
    social_status: "",
    has_children: false,
    children_no: 0,
    isWork: true,
    work_type: "",
    house_type: "",
    income: 0,
    isObligation: null,
    Obligation: 0,
    number_of_dependents: 0,
    benefit_no: "",
    payment_for_no: 0,
    notes: "",
    payment_for: "",
  }

  gender = ['ذكر','انثى']
  work = ['حكومي','خاص']
  optionnal = [{value:true,name:"نعم"},{value:false,name:"لا"}];
  social = [{"id":1, "name":"اعزب"} ,{"id":2, "name":"متزوج"} , {"id":3, "name":"مطلق"} ,{"id":4, "name":"أرملة"}]
  services = []

  file_url = ""
  constructor(private helper: AppOperationService,private route: ActivatedRoute, private toastr: ToastrService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getPaymentsService()
  
  }

  getPaymentsService(){
    this.helper.getPaymentfor().subscribe(res=>{
      this.services = res[appConstant.ITEMS] as any[]
    })
  }
  SendAction(){
    console.log(this.userDetails)

    this.helper.addUer(this.userDetails).subscribe(res=>{
      let msg = res[appConstant.MESSAGE];
      if(res[appConstant.STATUS]){
        this.toastr.success(msg,'نجاح');
        // let files = res["files"] as any[];
        // this.file_url = files[0].file_url;
        let userId = res["items"]["_id"];
        // this.addRequest(userId);
     
        setTimeout(() => {
          // this.btnFile.nativeElement.click();
          this.router.navigate(["/login"]);
        }, 1000);
      }else{
        this.toastr.error(msg,'خطأ');
      }
    })
  }

  addRequest(userId){
    var obj = {
      user_id: userId,
      ammount:this.userDetails.payment_for_no,
      notes:this.userDetails.notes,
      type:this.userDetails.payment_for,
      other:""
    }
    this.helper.addRequest(obj).subscribe(res=>{
  
    })
  }
}
