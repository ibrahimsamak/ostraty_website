import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppOperationService } from 'src/app/services/app-operation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild("btnRefresh") btnRefresh: ElementRef;

   usertype = ""
  isLoggedIn = null

  constructor(private helper:AppOperationService,private router :Router) { 
    var user = this.helper.checkLoggedInUser()
    if(user){
      this.isLoggedIn = helper.checkLoggedInUser();
      this.usertype = user.user_type;
    }
  
  }

  ngOnInit() {
    var user = this.helper.checkLoggedInUser()
    if(user){
      this.usertype = user.user_type;
    }
  }

  logout(){
    localStorage.removeItem("user");
    this.btnRefresh.nativeElement.click()
  }
}
