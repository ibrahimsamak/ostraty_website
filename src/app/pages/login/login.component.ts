import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("btnRefresh") btnRefresh: ElementRef;

  userDetails={
    email:"",
    password:""
  };
  
  returnMsg = '';
  constructor(
    private helper: AppOperationService,
    private route: ActivatedRoute ,
    private toastr: ToastrService,
    private router: Router
    ) {}

  ngOnInit() {
  }

  SendAction(){
    this.helper.userLogin(this.userDetails).subscribe(res=>{
      let msg = res[appConstant.MESSAGE];
      if(res[appConstant.STATUS]){
        let jsonObj = JSON.stringify(res[appConstant.ITEMS] as any);
        localStorage.setItem("user",jsonObj);
        this.toastr.success("تم تسجيل الدخول بنجاح",'نجاح');
        setTimeout(() => {
          this.btnRefresh.nativeElement.click()
        }, 1000);
      }else{
        this.toastr.error(msg,'خطأ');
      }
    })
  }
}
