import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppOperationService } from 'src/app/services/app-operation.service';
import { appConstant } from 'src/app/services/_constant/appConstant';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {
  notifications = []
  constructor(private helper: AppOperationService,private route: ActivatedRoute) {}

  ngOnInit() {
    let user = this.helper.checkLoggedInUser()
    if(user){
      let id = user._id;
      this.getNotifications(id);
    }
  }

  getNotifications(id){
    this.helper.getNotifications(id).subscribe(res=>{
      this.notifications = res[appConstant.ITEMS] as any[]
    })
  }
}
