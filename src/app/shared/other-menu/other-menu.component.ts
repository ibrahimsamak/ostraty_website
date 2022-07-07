import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppOperationService } from 'src/app/services/app-operation.service';

@Component({
  selector: 'app-other-menu',
  templateUrl: './other-menu.component.html',
  styleUrls: ['./other-menu.component.css']
})
export class OtherMenuComponent implements OnInit {
  @ViewChild("btnRefresh") btnRefresh: ElementRef;

  isLoggedIn = null
  constructor(private opperation:AppOperationService,private router :Router) { 
    let user = opperation.checkLoggedInUser();
    if(user){
      this.isLoggedIn = user
    }
  }

 
  usertype = ""
  ngOnInit() {
    var user = this.opperation.checkLoggedInUser()
    if(user){
      this.usertype = user.user_type;
    }
  }

  logout(){
    localStorage.removeItem("user");
    this.btnRefresh.nativeElement.click()
  }

  mobileMenu(){
    var currentClass = document.getElementsByTagName("nav")[0].className;
    if(currentClass == 'mobile-background-nav')
        document.getElementsByTagName("nav")[0].className = "mobile-background-nav in";
    else
       document.getElementsByTagName("nav")[0].className = "mobile-background-nav";
  }
}
