import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css']
})
export class StaticPageComponent implements OnInit {

  obj = {
    _id: "",
    title: "",
    content: ""
  }
  constructor(private helper: AppOperationService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let type = params['type'] == undefined ? null : params['type'];
      this.getStaticPage(type)
    })
  }

  getStaticPage(type){
    this.helper.getStaticPagenData().subscribe(res=>{
      let arr = res[appConstant.ITEMS] as any[]
      if(type == 'about')
      this.obj = arr[1] as any;
      if(type == 'condition')
      this.obj = arr[0] as any;
      if(type == 'app')
      this.obj =  arr[2] as any;;
    })
  }
}
