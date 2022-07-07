import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news = []
  type = ""
  constructor(private helper: AppOperationService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let type = params['type'] == undefined ? null : params['type'];
      this.getNews(type)
    })
  }
  getNews(str){
    var type = 0
    if(str == 'news'){
      type = 1
      this.type = "أخبار العائلة"
    }else{
      type = 2
      this.type = "المناسبات"
    }
    this.helper.getNews(type,10).subscribe(x=>{
      this.news = x[appConstant.ITEMS] as any[]
    })
  }

}
