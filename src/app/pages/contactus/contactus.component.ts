import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contact = {
    name: '',
    jawal: '',
    email: '',
    title: '',
    message: ''
  }
  returnMsg = "";
  
  constructor(
    private helper: AppOperationService, 
    private route: ActivatedRoute,
     private toastr: ToastrService
  ) {}

  ngOnInit() {
  }

  SendAction() {
    this.helper.addContact(this.contact).subscribe(res => {
      let msg = res[appConstant.MESSAGE]
      if(res[appConstant.STATUS]){
        this.contact = {
          name: '',
          jawal: '',
          email: '',
          title: '',
          message: ''
        }
        this.toastr.success(msg,'نجاح');
      }else{
        this.toastr.error(msg,'خطأ');
      }  
    })
  }

}
