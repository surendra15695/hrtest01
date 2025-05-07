import { Injectable } from '@angular/core';

@Injectable()
export class ShareddataService {
  public sharedData:number;
  public sharedPage:string="";

  constructor(){
    this.sharedData = 0;
    this.sharedPage="";
  }

  setData (data) {
    this.sharedData = data;
  }
  getData () {
    return this.sharedData;
  }

  setPage (pagename) {
    this.sharedPage = pagename;
  }
  getPage () {
    return this.sharedPage;
  }

}