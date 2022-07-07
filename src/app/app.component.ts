import { Component } from '@angular/core';
import { ServiceService } from "./services/service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'osraty';
  constructor(
    private dynamicScriptLoader: ServiceService,
  ) {
    
  }


  private loadScripts() {
    this.dynamicScriptLoader
      .load(
        "script2",
        "script3",
        "script4",
        "script5",
        "script6",
        "script7",
        "script8",
        "script9",
        "script10",
        "script11",
        "script12",
        "script13",
        "script14",
        "script15",
        "script16"
      )
      .then(data => {
        // Script Loaded Successfully
      })
      .catch(error => console.log(error));
  }

  ngOnInit() {
    this.loadScripts();
  }

}
