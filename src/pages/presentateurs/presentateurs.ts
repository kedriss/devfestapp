import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {PresentateurPage} from "../presentateur/presentateur";
import {PresentateurProvider} from "../../providers/presentateur-provider";
import {PresentateurModel} from "../../models/PresentateurModel";

/*
  Generated class for the Presentateurs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-presentateurs',
  templateUrl: 'presentateurs.html'
})
export class PresentateursPage {
  speackers: PresentateurModel[];
  speackersSave: PresentateurModel[];
  searchInput="";
  constructor(public navCtrl: NavController, public navParams: NavParams, private presentateurProvider : PresentateurProvider) {
    this.speackers = presentateurProvider.load();
    this.speackersSave = presentateurProvider.load();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentateursPage');
  }
  urlImage(url:String):String{
    return "assets/images/"+url;
  }
  openPage(param) {
    // navigate to the new page if it is not the current page
    this.navCtrl.push(PresentateurPage,param);
  }
  updateAffichage(){
    if(this.searchInput){
      this.speackers= this.speackers.filter((s)=>{return s.firstname.concat(s.lastname).toUpperCase().includes(this.searchInput.toUpperCase())})
    }else {
      this.speackers=this.speackersSave;
    }
  }
}
