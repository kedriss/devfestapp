import {Component, NgZone} from "@angular/core";
import {NavController, NavParams, ViewController, ActionSheetController} from "ionic-angular";
import {Camera, MediaCapture, MediaFile, FileOpener,  SocialSharing} from "ionic-native";
import {SessionImpl} from "../../models/SessionModel";
import {DataBaseProvider} from "../../providers/data-base-provider";
import {ImageModel} from "../../models/ImageModel";
import {VideoModel, AudioModel} from "../../models/VideoModel";

/*
  Generated class for the Notes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  static SELECT_NOTES ="Select contenu FROM notes where idSession = ? ";
  static SELECT_PHOTOS ='SELECT id,idSession, image FROM photosSession WHERE idSession = ?';
  static SELECT_VIDEOS ='SELECT id,idSession, url FROM videosSession WHERE idSession = ?';
  static SELECT_AUDIOS ='SELECT id,idSession, url FROM audiosSession WHERE idSession = ?';
  static INSERT_NOTES ='INSERT INTO notes (idSession,contenu) VALUES(?,?)';
  static INSERT_PHOTO ='INSERT INTO photosSession (idSession,image) VALUES(?,?)';
  static INSERT_VIDEO ='INSERT INTO videosSession (idSession,url,url2,typeV) VALUES(?,?,?,?)';
  static INSERT_AUDIO ='INSERT INTO audiosSession (idSession,url,url2,typeV) VALUES(?,?,?,?)';
  static DELETE_NOTES ='DELETE FROM notes where idSession = ?';
  static DELETE_PHOTO ='DELETE FROM photosSession where id = ?';
  static DELETE_VIDEO ='DELETE FROM videosSession where id = ?';
  static DELETE_AUDIO ='DELETE FROM audiosSession where id = ?';

  noteContent: String;
  session: SessionImpl;
  images:ImageModel[];
  videos: VideoModel[];
  audios:AudioModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private zone:NgZone, private dateBaseProvider: DataBaseProvider,public actionSheetCtrl: ActionSheetController) {
    this.session = this.navParams.data as SessionImpl;
    this.images = [];
    this.videos = [];
    this.audios = [];
    this.dateBaseProvider.getDatabase().then((db)=> {
      db.executeSql(NotesPage.SELECT_NOTES, [this.session.id]).then((contenus) => {
        if (contenus.rows.item(0)) {
          this.noteContent = contenus.rows.item(0).contenu;
        }
      }).then(()=>{
        db.executeSql(NotesPage.SELECT_PHOTOS,[this.session.id]).then((images)=>{
          for(let i =0; i<images.rows.length;i++) {
            this.images.push(this.getImageImageModel(images.rows.item(i).id, images.rows.item(i).image))
          }
        })
        db.executeSql(NotesPage.SELECT_VIDEOS,[this.session.id]).then((videos)=>{
          for(let i =0; i<videos.rows.length;i++) {
            this.videos.push(new VideoModel({id:videos.rows.item(i).id, idSession:this.session.id,typeV:videos.rows.item(i).typeV,url:videos.rows.item(i).url}))
          }
        })
        db.executeSql(NotesPage.SELECT_AUDIOS,[this.session.id]).then((audio)=>{
          for(let i =0; i<audio.rows.length;i++) {
            this.audios.push(new AudioModel({id:audio.rows.item(i).id, idSession:this.session.id,typeV:audio.rows.item(i).typeV,url:audio.rows.item(i).url}))
          }
        })
      })
    })
  }

  ionViewDidLoad() {
  }

  saveNote() {
    this.dateBaseProvider.getDatabase().then((db)=>{
       db.executeSql(NotesPage.DELETE_NOTES, [this.session.id]).then(()=>{
         db.executeSql(NotesPage.INSERT_NOTES, [this.session.id, this.noteContent])
    })
    });
  }
//////////////////////IMAGES/////////////////////
  getImageImageModel(id,image):ImageModel{
    return new ImageModel({id:id,idSession:this.session.id,image:image});
  }
  savePic(data:String):Promise<ImageModel>{
    return this.dateBaseProvider.getDatabase().then((db)=> {
     return db.executeSql(NotesPage.INSERT_PHOTO,[this.session.id,data]).then((image)=>
      {
        return Promise.resolve(this.getImageImageModel(image.id,data));
      }).catch((error)=>Promise.reject("l'enregistrement a merdé"+error));
    })
  }
  takepic() {
    var options = {
      destinationType: 0,
      sourceType: 1,
      encodingType: 0,
      quality:50,
      allowEdit: false,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((data) => {
      var imgdata = "data:image/jpeg;base64," + data;
      this.savePic(imgdata).then((image)=>{
        this.images.push(image);
      })
    }, (error) => {
    });
  }
  pickpic() {
    var options = {
      destinationType: 0,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: 0,
      quality:50,
      allowEdit: false,
      saveToPhotoAlbum: false
    };
    Camera.getPicture(options).then((data) => {
      var imgdata = "data:image/jpeg;base64," + data;
      this.savePic(imgdata).then((image)=>{
        this.zone.run(() => { this.images.push(image)});
      }).catch((message)=>(alert(message)));
    }, (error) => {
      alert(error);
    });
  }

  deletePic(id){
    this.dateBaseProvider.getDatabase().then((db)=>{
      db.executeSql(NotesPage.DELETE_PHOTO,[id]).then(rs=>{
        this.images = this.images.filter(i=>i.id!=id);
      })
    })
  }
/////////////////Video////////////////////////////////

  saveVideo(data:MediaFile):Promise<VideoModel>{
    return this.dateBaseProvider.getDatabase().then((db)=> {
      return db.executeSql(NotesPage.INSERT_VIDEO,
        [this.session.id,data.fullPath,null,data.type]).then((video)=>
      {
        return Promise.resolve(new VideoModel({id:video.id, idSession:this.session.id,url:video.url, url2:null,typeV:video.typeV}));
      }).catch((error)=>Promise.reject("l'enregistrement a merdé"+error));
    })
  }
  takeVideo(){
  MediaCapture.captureVideo( 
     { 
     limit:1, // nombre de clip audio 
    duration:10 // durée limite en seconde 
    }).then((mediaFile)=>{
      this.saveVideo(mediaFile[0]).then((video)=>{
      this.videos.push(video);
    })
  })
  }
  deleteVideo(id){
    this.dateBaseProvider.getDatabase().then((db)=>{
      db.executeSql(NotesPage.DELETE_VIDEO,[id]).then(rs=>{
        this.videos = this.videos.filter(i=>i.id!=id);
      })
    })
  }

  ///////////////Audio///////////////////
  saveAudio(data:MediaFile):Promise<AudioModel>{
    return this.dateBaseProvider.getDatabase().then((db)=> {
      return db.executeSql(NotesPage.INSERT_AUDIO,
        [this.session.id,data.fullPath,null,data.type]).then((audio)=>
      {
        return Promise.resolve(new AudioModel({id:audio.id, idSession:this.session.id,url:audio.url, url2:null,typeV:audio.typeV}));
      }).catch((error)=>Promise.reject("l'enregistrement a merdé"+error));
    })
  }
  takeAudio(){
    MediaCapture.captureAudio(
      {
        limit:1, // nombre de clip audio 
        duration:360 // durée limite en seconde 
      }).then((mediaFile)=>{
      this.saveAudio(mediaFile[0]).then((audio)=>{
        this.audios.push(audio);
      })
    })
  }
  deleteAudio(id){
    this.dateBaseProvider.getDatabase().then((db)=>{
      db.executeSql(NotesPage.DELETE_AUDIO,[id]).then(rs=>{
        this.audios = this.audios.filter(i=>i.id!=id);
      })
    })
  }
  playAudio(id){
    var audios =this.audios.filter(a=>a.id===id);
    var audio = audios[0];
   FileOpener.open(audio.url.toString(),audio.typeV.toString());

  }
///////////// ACTIONSHEET///////////////
  presentActionSheet(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Que faire avec l'image?",
      buttons: [
        {
          text: 'Partager',
          role: 'destructive',
          handler: () => {
            this.share(this.images.filter(i=>i.id==id)[0]);
          }
        },{
          text: 'Supprimer',
          handler: () => {
           this.deletePic(id);
          }
        },{
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  share(image : ImageModel){
    SocialSharing.share(this.noteContent?this.noteContent.toString():"",this.session.title.toString()/*Subject*/,image.image.toString()/*File*/,null)
  }
}
