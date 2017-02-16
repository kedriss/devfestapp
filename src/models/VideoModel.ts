/**
 * Created by kedri on 14/02/2017.
 */

export class VideoModel{
  idSession:String;
  id:Number;
  url:String;
  typeV:string;

  constructor(video){
    this.idSession= video.idSession;
    this.id = video.id;
    this.url= video.url;
    this.typeV=video.typeV;
  }

}

export class AudioModel extends VideoModel{

}
