import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent  implements OnInit {

  obj = {
    _id: "",
    image:"",
    title: "",
    content: "",
    details:"",
    createAt:""
  }
  constructor(private helper: AppOperationService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'] == undefined ? null : params['id'];
      this.getSingleNews(id);
    })
  }

  getSingleNews(id){
    this.helper.getSingleNews(id).subscribe(res=>{
      this.obj = res[appConstant.ITEMS] as any
    })
  }
}
