import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SessionsPage} from "../sessions/sessions";
import {PresentateursPage} from "../presentateurs/presentateurs";
import {ParcoursPage} from "../parcours/parcours";

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {

  }

  openSessions(){
    this.navCtrl.push(SessionsPage);
  }
  openPresentateurs(){
    this.navCtrl.push(PresentateursPage);
  }
  openParcours(){
    this.navCtrl.push(ParcoursPage);
  }
}
