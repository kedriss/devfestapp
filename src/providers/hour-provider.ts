import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import data from "../data/devfest-2015.json";
import {Hour} from "../models/SessionModel";
/*
  Generated class for the HourProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HourProvider {


  constructor(public http: Http) {
    console.log('Hello HourProvider Provider');
  }

  load(idHour):Hour{
   return new Hour(data.hours[idHour]);
  }

  compare(a:Hour,b:Hour):number{
    if(a.hourStart.concat(a.minStart.toString())> b.hourStart.concat(b.minStart.toString()))
    return 1;
    if(a.hourStart.concat(a.minStart.toString())< b.hourStart.concat(b.minStart.toString()))
      return -1;
    return 0;
  }
}
