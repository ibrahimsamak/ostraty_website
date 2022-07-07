import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  userDetails={
    email:"",
    phone_number:""
  };
  
  returnMsg = '';
  constructor(
    private helper: AppOperationService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router:Router
    ) {}

  ngOnInit() {
  
  }

  SendAction(){
    this.helper.forgetPassword(this.userDetails).subscribe(res=>{
      let msg = res[appConstant.MESSAGE];
      if(res[appConstant.STATUS]){
        this.toastr.success(msg,'نجاح');
        this.router.navigate(["/login"])
      }else{
        this.toastr.error(msg,'خطأ');
      }
    })
  }
}
