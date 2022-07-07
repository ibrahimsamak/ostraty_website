import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { appConstant } from "./_constant/appConstant";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AppOperationService {
  constructor(private http: HttpClient) {}

  checkLoggedInUser(){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user){
      return user
    }else{
      return null
    }
  }

  getToken(){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user){
      return user.token
    }else{
      return ""
    }
  }

  headerWithoutToken(){
    return {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      })
    };
  } 
  
  headerWithToken(){
    return {
      headers: new HttpHeaders({
        Content: "application/json",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        token: this.getToken()
      })
    };
  } 

  headerWithTokenAndWithImages(){
    return {
      headers: new HttpHeaders({
        Content: "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: this.getToken(),
      }),
    };
  } 

  getStaticPagenData() {
    return this.http.get(appConstant.BASE_URL + "staticpage");
  }

  addContact(conent) {
    return this.http.post(
      appConstant.BASE_URL + "contact",
      JSON.stringify(conent),
      this.headerWithoutToken()
    );
  }



  getNews(type,limit){
    return this.http.get(appConstant.BASE_URL + "news/"+type+"?page=0&limit="+limit);
  }

  getSingleNews(id){
    return this.http.get(appConstant.BASE_URL + "singlenews/"+id);
  }
 
  getPaymentfor(){
    return this.http.get(appConstant.BASE_URL + "paymentfor");
  }

  getPaymentmethod(){
    return this.http.get(appConstant.BASE_URL + "paymentmethod");
  }
  
  addUer(conent) {
    return this.http.post(
      appConstant.BASE_URL + "user",
      JSON.stringify(conent),
      this.headerWithoutToken()
    );
  }
  
  userLogin(conent) {
    return this.http.post(
      appConstant.BASE_URL + "user_login",
      JSON.stringify(conent),
      this.headerWithoutToken()
    );
  }
  
  forgetPassword(conent) {
    return this.http.post(
      appConstant.BASE_URL + "user_forget",
      JSON.stringify(conent),
      this.headerWithoutToken()
    );
  }

  updateUser(id,conent){
    return this.http.post(
      appConstant.BASE_URL + "user/"+id,
      conent,
      this.headerWithTokenAndWithImages()
    );
  }

  updateAdmin(id,content){
    return this.http.post(
      appConstant.BASE_URL + "admin/"+id,
      JSON.stringify(content),
      this.headerWithToken()
    );
  }

  getUserPorofile(id){
    return this.http.get(appConstant.BASE_URL + "users/"+id,this.headerWithToken());
  }

  getAdminPorofile(id){
    return this.http.get(appConstant.BASE_URL + "admin/"+id,this.headerWithToken());
  }

  getNotifications(id){
    return this.http.get(appConstant.BASE_URL + "getNotfications/"+id,this.headerWithToken());
  }

  getPaymentByAdmin(id){
    return this.http.get(appConstant.BASE_URL + "PaymentByAdmin/"+id,this.headerWithToken());
  }

  getRequest(id){
    return this.http.get(appConstant.BASE_URL + "RequestByUser/"+id,this.headerWithToken());
  }
  

  approvePayment(content){
    return this.http.post(
      appConstant.BASE_URL + "approvePaymentByUser",
      JSON.stringify(content),
      this.headerWithToken()
    );
  }

  addPayment(conent) {
    return this.http.post(
      appConstant.BASE_URL + "Payment",
      JSON.stringify(conent),
      this.headerWithoutToken()
    );
  }

  cancelRequest(content){
    return this.http.post(
      appConstant.BASE_URL + "updateRequest",
      JSON.stringify(content),
      this.headerWithToken()
    );
  }

  addRequest(conent) {
    return this.http.post(
      appConstant.BASE_URL + "Request",
      conent,
      this.headerWithTokenAndWithImages()
    );
  }
}
