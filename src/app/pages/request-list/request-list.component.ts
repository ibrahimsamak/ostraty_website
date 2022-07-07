import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests = []
  totals = 0.0
  id;
  userDetails;
  showButton = false;
  constructor(
    private helper: AppOperationService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getRequest();
  }

  getRequest(){
    let user = this.helper.checkLoggedInUser()
    if(user){
      this.id = user._id;
      this.helper.getRequest(this.id).subscribe(res=>{
        this.requests = res[appConstant.ITEMS] as any[]
        this.totals = res["total_payment"]
        this.getUserProfile()
      })
    } 
  }

  getUserProfile(){
    let user =  this.helper.checkLoggedInUser();
    this.helper.getUserPorofile(user._id).subscribe(res=>{
      let response =  res[appConstant.ITEMS] as any
      this.userDetails = response
      if(!this.userDetails.id_file || this.userDetails.id_file == '' || !this.userDetails.iban_file || this.userDetails.iban_file == '' || !this.userDetails.iban || this.userDetails.iban == '' || !this.userDetails.account_no || this.userDetails.account_no == '' ){
        this.showButton = false;
      }else{
        this.showButton = true;
      }
    })
  }

  cancel(_id){
    var obj = { 
      id: _id ,
      status: 4
    };
    this.helper.cancelRequest(obj).subscribe(res=>{
      let msg = res[appConstant.MESSAGE] as any;
      if(res[appConstant.STATUS]){
        this.toastr.success(msg,'نجاح');       
      }else{
        this.toastr.error(msg,'خطأ');
      }
      this.getRequest()
    })
  }
}
