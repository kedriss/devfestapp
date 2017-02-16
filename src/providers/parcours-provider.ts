import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SessionModel} from "../models/SessionModel";
import {DataBaseProvider} from "./data-base-provider";
import {SessionsProvider} from "./sessions-provider";
import {PoolSession} from "../models/PoolSession";
import {HourProvider} from "./hour-provider";

/*
  Generated class for the ParcoursProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParcoursProvider {

  static PARCOURS_INSERT_SQL= "INSERT INTO PARCOURS (idSession) VALUES(?)";
  static SELECT_SESSIONS_PARCOURS ="SELECT idSession FROM PARCOURS";
  static SELECT_SESSIONS_PARCOURS_ID ="SELECT idSession FROM PARCOURS where idSession = ?";
  static DELETE_SESSIONS_PARCOURS_ID ="DELETE FROM PARCOURS where idSession = ?";
  constructor(public http: Http, private dataBaseProvider:DataBaseProvider, private sessionProvider :SessionsProvider, private hourProvider:HourProvider) {
    console.log('Hello ParcoursProvider Provider');
  }

  /**
   * Ajoute une session au parcours
   * @param session
   */
  addsession(session:SessionModel):Promise<boolean>{
    return this.dataBaseProvider.getDatabase().then((db)=>{
      return db.executeSql(ParcoursProvider.PARCOURS_INSERT_SQL,[session.id]).then((sessionP)=>{
        return Promise.resolve(true);
      })
    })
  }

  isAdded(session:SessionModel):Promise<boolean>{
    return this.dataBaseProvider.getDatabase().then((db)=> {
      return  db.executeSql(ParcoursProvider.SELECT_SESSIONS_PARCOURS_ID, [session.id]).then((session) => {
        if (session.rows.length > 0)
        return Promise.resolve(true);
        return Promise.resolve(false);
      })
    })
  }

  load():Promise<SessionModel[]>{
    var sessions:SessionModel[];
    sessions = [];
   return this.dataBaseProvider.getDatabase().then((db)=> {
     return  db.executeSql(ParcoursProvider.SELECT_SESSIONS_PARCOURS, []).then((session) => {
        for (let i = 0; i < session.rows.length; i++) {
          sessions.push(this.sessionProvider.loadOne(session.rows.item(i).idSession))
        }
       return Promise.resolve(sessions);
      })
    })
  }
   loadGrouped():Promise<PoolSession[]>{
     var sessions:SessionModel[];
     sessions = [];
     return this.dataBaseProvider.getDatabase().then((db)=> {
       return  db.executeSql(ParcoursProvider.SELECT_SESSIONS_PARCOURS, []).then((session) => {
         for (let i = 0; i < session.rows.length; i++) {
          var sess= this.sessionProvider.loadOne(session.rows.item(i).idSession);
          sess.hours= this.hourProvider.load(sess.hour);
          sessions.push(sess);
         }
         return Promise.resolve(this.toPoolSession(sessions));
       })
     })
   }
  removeSession(session:SessionModel):Promise<boolean>{
    return this.dataBaseProvider.getDatabase().then((db)=>{
      return db.executeSql(ParcoursProvider.DELETE_SESSIONS_PARCOURS_ID,[session.id]).then((sessionP)=>{
        return Promise.resolve(true);
      })
    })
  }

  IsPossiblyToAdd(session:SessionModel):Promise<boolean>{
    this.dataBaseProvider.getDatabase().then((db)=>{
      db.executeSql('select idSession from PARCOURS where idSession = ?',[session.id]).then(sessions=>{
        for(let i =0; i<sessions.rows.length;i++) {
          let sessionP = this.sessionProvider.loadOne(sessions.rows.item(i).idSession);

        }
      })
    })
    return Promise.resolve(false);
  }

   toPoolSession(sessions :SessionModel[]):PoolSession[]{
    var poolSessions : PoolSession[];
    poolSessions =[];
    sessions.forEach(s=>{
      if(!poolSessions[parseInt(s.hours.hourStart.concat(s.hours.minStart.toString()))]){
        var pool = new PoolSession();
        pool.hour=s.hour;
        pool.hours=this.hourProvider.load(s.hour);
        pool.sessions.push(s);
        poolSessions[parseInt(s.hours.hourStart.concat(s.hours.minStart.toString()))] = pool;
      }
      else{
        poolSessions[parseInt(s.hours.hourStart.concat(s.hours.minStart.toString()))].sessions.push(s)
      }
    })

    return poolSessions;

  }

}
