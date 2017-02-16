import {PresentateurModel, PresentateurImpl} from "./PresentateurModel";
import {PresentateurProvider} from "../providers/presentateur-provider";
/**
 * Created by kedri on 11/02/2017.
 */


export interface SessionModel {
  id: String,
  title: String,
  confRoom: String,
  desc: String,
  type: String
  difficulty: number,
  all: Boolean,
  lang: String,
  hour: String,
  hours:Hour,
  video: String,
  slides: String,
  speakers: PresentateurModel[]
  chevauche(session:SessionModel):boolean;

}

export class SessionImpl implements SessionModel{

  id: String;
  title: String;
  confRoom: String;
  desc: String;
  type: String;
  difficulty: number;
  all: Boolean;
  lang: String;
  hour: String;
  hours:Hour;
  video: String;
  slides: String;
  speakers: PresentateurModel[];

  constructor(obj){
  this.id= obj.id;
  this.title= obj.title;
  this.confRoom=obj.confRoom;
  this.desc= obj.desc;
  this.type= obj.type;
  this.difficulty=obj.difficulty;
  this.all= obj.all;
  this.lang= obj.lang;
  this.hour= obj.hour;
  this.hours=null;
  this.video= obj.video;
  this.slides= obj.slides;
  if (obj.speakers)this.speakers = obj.speakers.map(s=>{return new PresentateurProvider().loadOne(s)});

    }

  chevauche(session:SessionModel):boolean{
  if( session.hours.hourStart <= this.hours.hourStart && session.hours.hourEnd >= this.hours.hourStart && session.hours.minEnd > this.hours.minStart )
    return true;
  else if(this.hours.hourStart <= session.hours.hourStart && this.hours.hourEnd >= session.hours.hourEnd )
  return true;
  else if(session.hours.hourStart <= this.hours.hourEnd && session.hours.minStart <= this.hours.minEnd  && session.hours.hourEnd > this.hours.hourEnd && session.hours.minEnd > this.hours.minEnd)
    return true;
  else if(this.hours.hourStart >= session.hours.hourStart && this.hours.hourEnd >= session.hours.hourEnd )
    return true;
  else
    return false;
  }
}
export class Hour{
  id:       String;
  hourStart:String;
  minStart: String;
  hourEnd:  String;
  minEnd:   String;

  constructor(obj){
    this.id=obj.id;
    this.hourStart=obj.hourStart;
    this.minStart=obj.minStart;
    this.hourEnd=obj.hourEnd;
    this.minEnd=obj.minEnd;

              }
}
