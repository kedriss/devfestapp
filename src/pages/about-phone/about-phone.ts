import {Component} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {Device} from "ionic-native";
/*
  Generated class for the AboutPhone page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about-phone',
  templateUrl: 'about-phone.html'
})
export class AboutPhonePage {cordova
  cordovaName:String;
  model:String;
  platformName:String;
  uuid:String;
  version:String;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private platform:Platform) {
    platform.ready().then(() => {
     this.cordovaName= Device.cordova;
     this.model =Device.model ;
     this.platformName= Device.platform;
     this.uuid=Device.uuid;
     this.version = Device.version;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPhonePage');
  }

}
