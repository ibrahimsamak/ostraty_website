import { Component, OnInit } from '@angular/core';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userDetails = {
    _id:"",
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
    isWork: false,
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
    bank_name:"",
    account_no: "",
    iban: "",
    type:"user",
    id_file:"",
    iban_file:"",
  }
  gender = ['ذكر','انثى']
  work = ['حكومي','خاص']
  optionnal = [{value:true,name:"نعم"},{value:false,name:"لا"}];
  social = [{"id":1, "name":"اعزب"} ,{"id":2, "name":"متزوج"} , {"id":3, "name":"مطلق"} ,{"id":4, "name":"أرملة"}]
  services = []

  constructor(
    private app:AppOperationService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getPaymentsService()
    this.getUserProfile()
  }

  getPaymentsService(){
    this.app.getPaymentfor().subscribe(res=>{
      this.services = res[appConstant.ITEMS] as any[]
      
    })
  }

  getUserProfile(){
    let user =  this.app.checkLoggedInUser();
    this.app.getUserPorofile(user._id).subscribe(res=>{
      let response =  res[appConstant.ITEMS] as any
      this.userDetails = response
      this.userDetails.payment_for = response.payment_for._id
    })
  }

  SendAction(){
    var formData = new FormData();
    formData.append("_id", this.userDetails._id);
    formData.append("full_name", this.userDetails.full_name);
    formData.append("email", this.userDetails.email);
    formData.append("password", this.userDetails.password);
    formData.append("phone_number", this.userDetails.phone_number);
    formData.append("Id_no", this.userDetails.Id_no);
    formData.append("user_type", this.userDetails.user_type);
    formData.append("gender", this.userDetails.gender);
    formData.append("social_status", this.userDetails.social_status);
    formData.append("house_type", this.userDetails.house_type);
    formData.append("isObligation", this.userDetails.isObligation);
    formData.append("benefit_no", this.userDetails.benefit_no);
    // formData.append("notes", this.userDetails.notes);
    // formData.append("payment_for", this.userDetails.payment_for);
    formData.append("account_no", this.userDetails.account_no);
    formData.append("iban", this.userDetails.iban);
    formData.append("bank_name", this.userDetails.bank_name);
    formData.append("type", "user");
    formData.append("id_file", this.userDetails.id_file);
    formData.append("iban_file", this.userDetails.iban_file);

    if(!this.userDetails.has_children){
      this.userDetails.children_no = 0
    }
    if(!this.userDetails.isWork){
      this.userDetails.work_type = ""
    }

    formData.append("has_children", String(this.userDetails.has_children));
    formData.append("children_no", String(this.userDetails.children_no));
    formData.append("isWork", String(this.userDetails.isWork));
    formData.append("work_type", this.userDetails.work_type);
    formData.append("income", String(this.userDetails.income));
    formData.append("Obligation", String(this.userDetails.Obligation));
    formData.append("number_of_dependents", String(this.userDetails.number_of_dependents));
    // formData.append("payment_for_no", String(this.userDetails.payment_for_no));

    
    this.app.updateUser(this.userDetails._id,formData).subscribe(res=>{
      let msg = res[appConstant.MESSAGE];
      if(res[appConstant.STATUS]){
        var userObj = res[appConstant.ITEMS] as any
        localStorage.setItem("user", JSON.stringify(userObj))
        this.toastr.success(msg,'نجاح');
      }else{
        this.toastr.error(msg,'خطأ');
      }
    })
  }

  processImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.userDetails.id_file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = _event => {};
    }
  }

  processImage2(event) {
    if (event.target.files && event.target.files[0]) {
      this.userDetails.iban_file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = _event => {};
    }
  }
}
