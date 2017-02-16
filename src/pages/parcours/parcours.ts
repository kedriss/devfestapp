import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ParcoursProvider} from "../../providers/parcours-provider";
import {SessionModel} from "../../models/SessionModel";
import {PoolSession} from "../../models/PoolSession";
import {SessionPage} from "../session/session";

/*
  Generated class for the Parcours page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-parcours',
  templateUrl: 'parcours.html'
})
export class ParcoursPage {

  private sessions :PoolSession[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private parcoursProvider: ParcoursProvider) {
    this.sessions =[];
    this.parcoursProvider.loadGrouped().then((sessions)=>{
      console.log(sessions);
     for (var index in sessions)
      this.sessions.push(sessions[index]);

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParcoursPage');
  }
  openPageSession(idSession){
    this.navCtrl.push(SessionPage, idSession);
  }
}
