import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
    providedIn: 'root'
})
export class SharedcomponentdataService {
    pageName: BehaviorSubject<string>;
    nextPageName: BehaviorSubject<string>;
    paramId: BehaviorSubject<string>;
    nextParamId: BehaviorSubject<string>;
    constructor() { 
        this.pageName = new BehaviorSubject("");
        this.nextPageName = new BehaviorSubject("");
        this.paramId = new BehaviorSubject("");
        this.nextParamId = new BehaviorSubject("");
    }
 
    setPageName(pageName:string) {
        this.pageName.next(pageName);
    }

    setNextPageName(nextPageName:string) {
        this.nextPageName.next(nextPageName);
    }

    setParamId(paramId:string) {
        this.paramId.next(paramId);
    }
    
    setNextParamId(nextParamId:string) {
        this.nextParamId.next(nextParamId);
    }
}