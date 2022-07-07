import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  news = []
  isLoggedIn = false
  constructor(private helper: AppOperationService,private route: ActivatedRoute) {
    var user = this.helper.checkLoggedInUser()
    if(user){
      this.isLoggedIn = helper.checkLoggedInUser();
    }
  }

  ngOnInit() {
    this.getNews()
  }

  getNews(){
    this.helper.getNews(1,3).subscribe(res=>{
      this.news = res[appConstant.ITEMS] as any[]
    });
  }
}
