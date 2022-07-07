import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-donates-list',
  templateUrl: './donates-list.component.html',
  styleUrls: ['./donates-list.component.css']
})
export class DonatesListComponent implements OnInit {
  donates = []
  totals = 0.0
  constructor(
    private helper: AppOperationService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPaymentByAdmin();
  }

  getPaymentByAdmin(){
    let user = this.helper.checkLoggedInUser()
    if(user){
      let id = user._id;
      this.helper.getPaymentByAdmin(id).subscribe(res=>{
        this.donates = res[appConstant.ITEMS] as any[]
        this.totals = res["total_payment"]
      })
    } 
  }

  approve(_id){
    var obj = { id: _id };
    this.helper.approvePayment(obj).subscribe(res=>{
      let msg = res[appConstant.MESSAGE] as any;
      if(res[appConstant.STATUS]){
        this.toastr.success(msg,'نجاح');       
      }else{
        this.toastr.error(msg,'خطأ');
      }
      this.getPaymentByAdmin()
    })
  }
}
