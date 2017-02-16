import {Component} from "@angular/core";
import {NavController, NavParams, ViewController, ModalController} from "ionic-angular";
import {SessionsProvider} from "../../providers/sessions-provider";
import {SessionModel} from "../../models/SessionModel";
import {HourProvider} from "../../providers/hour-provider";
import {PresentateurPage} from "../presentateur/presentateur";
import {ModalPage} from "modal-page";
import {NotesPage} from "../notes/notes";
import {ParcoursProvider} from "../../providers/parcours-provider";

/*
  Generated class for the Session page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-session',
  templateUrl: 'session.html'
})
export class SessionPage {
  session : SessionModel;
  image :String;
  firstload=true;
  onParcours=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, sessionProvider : SessionsProvider,
              hourProvider: HourProvider,public modalCtrl: ModalController , private viewCtrl:ViewController, private parcoursProvider:ParcoursProvider) {
    this.session = sessionProvider.loadOne(this.navParams.data);
    this.session.hours = hourProvider.load(this.session.hour);
    parcoursProvider.isAdded(this.session).then((isAdded)=> {
      this.onParcours = isAdded;
      if (!isAdded) this.firstload=false;
    })

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionPage');
  }

  openPagePresentateur(param){
     this.navCtrl.push(PresentateurPage,param);
  }
  openNotes(param){

  }
  urlImage(url:String):String{
    return "assets/images/"+url;
  }
  openNotesModal(idSession) {
    //let modal =
      this.navCtrl.push(NotesPage,this.session);
    //modal.present();
  }
  pushOnParcours(){
    if(!this.firstload) {
      this.parcoursProvider.isAdded(this.session).then((isAdded)=>{
       if(!isAdded){
         console.log('on ajoute');
       this.parcoursProvider.addsession(this.session);}
      else {
         console.log('on supprime');
         this.parcoursProvider.removeSession(this.session);
       }
      })
    }
    this.firstload=false;
  }

}
