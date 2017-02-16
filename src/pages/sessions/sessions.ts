import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {SessionsProvider} from "../../providers/sessions-provider";
import {SessionModel} from "../../models/SessionModel";
import {SessionPage} from "../session/session";
import {PoolSession} from "../../models/PoolSession";
import {ParcoursProvider} from "../../providers/parcours-provider";

/*
  Generated class for the Sessions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage {
sessions: PoolSession[];
sessionsSave: PoolSession[];
isAdded: String[];
searchInput="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public sessionsmodel:SessionsProvider,private parcoursProvider: ParcoursProvider) {
  this.sessions=[];
  this.isAdded = [];
  this.parcoursProvider.toPoolSession(this.sessionsmodel.load()).forEach((s)=>{
    this.sessions.push(s);
    s.sessions.forEach((session)=>this.sessionColor(session));
  });
  this.sessionsSave=this.sessions;
  }
updateAffichage(){
    console.log(this.searchInput);
    if(this.searchInput){
    this.sessions = this.sessionsSave.filter((s)=>{
          if (s.sessions.filter((session)=>{
            if(session.title.toUpperCase().includes(this.searchInput.toUpperCase()))
              return true;
            else return false}).length >0 )
            return true;
          else return false})


    }else{
      this.sessions=this.sessionsSave;
    }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionsPage');
  }

  openPageSession(idSession){
    this.navCtrl.push(SessionPage, idSession);
  }
  getColor(session:SessionModel):string{
    return this.isAdded[session.id.toString()];
  }
  sessionColor(session:SessionModel){
  return this.parcoursProvider.isAdded(session).then((isAdded)=>{
    if (isAdded)
      this.isAdded[session.id.toString()]= "selected";
    else this.isAdded[session.id.toString()]= ""
  })
  }
}
