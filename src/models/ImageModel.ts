/**
 * Created by kedri on 13/02/2017.
 */
export class ImageModel{
  id:Number;
  idSession:String;
  image:String;
  constructor(obj){
    this.id= obj.id;
    this.idSession= obj.idSession;
    this.image = obj.image;
  }
}
