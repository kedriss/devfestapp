import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {SessionsProvider} from "../../providers/sessions-provider";
import {SessionPage} from "../session/session";
import {PresentateurModel} from "../../models/PresentateurModel";
import {PresentateurProvider} from "../../providers/presentateur-provider";
import {SessionModel} from "../../models/SessionModel";
import {Contact, Contacts, ContactField, ContactName, InAppBrowser} from "ionic-native";

/*
  Generated class for the Presentateur page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-presentateur',
  templateUrl: 'presentateur.html'
})
export class PresentateurPage {
  speacker: PresentateurModel;
  sessions: SessionModel[];
  SyncContact=null;
  firstload=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private  presentateurProvider: PresentateurProvider,
              private sessionprovider:SessionsProvider) {
    this.speacker = presentateurProvider.loadOne(this.navParams.data);
    this.sessions = sessionprovider.loadSpeakerSessions(this.navParams.data);

    this.isContact().then((bool)=>{this.SyncContact=bool;});
  }
  ionViewDidLoad() {
   }
  urlImage(url:String):String{
    return "assets/images/"+url;
  }
  private getContact():Promise<Contact>{
    return Contacts.find(['displayName','name','nickname'],{filter: this.speacker.firstname+' '+this.speacker.lastname}).then((contacts)=>{
      if(contacts.length>0){
         return Promise.resolve(contacts[0]);
      }
    });
  }
  private isContact():Promise<boolean>{
    return Contacts.find(['displayName','name','nickname'],{filter: this.speacker.firstname+' '+this.speacker.lastname}).then((contacts)=>{
      if(contacts.length>0){
       return Promise.resolve(true);
      }else{
        this.firstload=false;
        return Promise.resolve(false)
      }
    }
      );
    };

  openPageSession(idSession){
    this.navCtrl.push(SessionPage,idSession);
  }

  addContact(){
    if(!this.firstload)
      this.isContact().then((iscontact)=>{
        if(!iscontact){
          var contact = new Contact();
          var contactName = new ContactName();
          contactName.familyName=this.speacker.lastname;
          contactName.middleName=this.speacker.firstname;
          contact.name = contactName;
          contact.note = this.speacker.about?this.speacker.about.toString():"";
          contact.urls = this.speacker.socials.
            map(s=>{
              var contactField = new ContactField();
              contactField.type="URL";
              contactField.value=s.link.toString();
              return contactField;
            })
          contact.save().then(()=>this.isContact());
        }else {
          this.getContact().then((contact)=>{
            contact.remove();
          })
        }
        }
      )
    this.firstload=false;
  }

  openAppBrowser(url){
    let browser = new InAppBrowser(url, '_system');
   // browser.executeScript(...);
    //browser.insertCSS(...);
    //browser.close();
  }
}
