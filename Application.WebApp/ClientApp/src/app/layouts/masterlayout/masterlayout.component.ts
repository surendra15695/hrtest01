import { Component, OnInit } from '@angular/core';
import {NavMenuComponent} from '../../nav-menu/nav-menu.component';
import { PersistanceService } from '../../sharedservices/persitence.service';

@Component({
  selector: 'app-masterlayout',
  templateUrl: './masterlayout.component.html',
  styleUrls: ['./masterlayout.component.css']
})
export class MasterlayoutComponent implements OnInit {
  userName:string;
  constructor(
    private persistance: PersistanceService,
  ) { 
   // console.log(this.persistance.get("menudata"));
    // if (this.persistance.get('timeslogin') == "0") {
    //   this.persistance.set('timeslogin', "1");
    //   location.reload();

    // }
  }

  ngOnInit() {
  }

  

}
