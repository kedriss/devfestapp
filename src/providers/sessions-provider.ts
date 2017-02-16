import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import data from "../data/devfest-2015.json";
import {SessionModel, SessionImpl} from "../models/SessionModel";
import {HourProvider} from "./hour-provider";
/*
  Generated class for the SessionsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SessionsProvider {

  constructor(public http: Http, private hourprovider:HourProvider) {
    console.log('Hello SessionsProvider Provider');

  }
  // Load all github users
  load():SessionModel[] {
    var sessions= data.sessions.map(s=>new SessionImpl(s)).map(s=>{s.hours = this.hourprovider.load(s.hour); return s});
    return sessions;
}
  loadOne(idSession):SessionModel {
    var session= data.sessions.filter(s=>s.id==idSession).map(s=> new SessionImpl(s))[0];
    return session;
  }
  loadSpeakerSessions(idSpeaker):SessionModel[]{
    var sessions= data.sessions.filter(s=>{return SessionsProvider.contains(s.speakers,idSpeaker)})
      .map(s=> {return new SessionImpl(s)});
    return sessions;
  }

  static contains(a, obj) {
    if(a && obj)
    for (var i = 0; i < a.length; i++) {
      if (a[i] === obj) return true;
    }
    return false;
  }

}


