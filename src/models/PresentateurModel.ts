/**
 * Created by kedri on 09/02/2017.
 */
export interface PresentateurModel {
  id: string,
  topspeaker: boolean,
  firstname: string,
  lastname: string,
  image: string,
  category: Category,
  socials : Social[],
  about: String;

}

export class PresentateurImpl implements PresentateurModel{
  id: string;
  topspeaker: boolean;
  firstname: string;
  lastname: string;
  image: string;
  category: Category;
  socials : Social[];
  about: String;
  constructor(objet){
    this.id = objet.id;
    this.topspeaker=objet.topspeaker;
    this.firstname= objet.firstname;
    this.lastname= objet.lastname;
    this.image= objet.image;
    this.about = objet.about;
    if (objet.category )this.category = new Category(objet.category);
    if(objet.socials) this.socials = objet.socials.map(s => new Social(s))
  };
}
export class Category {
  class: string;
  title: string;
  constructor(obj){
    this.class=obj.class;
    this.title= obj.title;
  };
}

export class Social{
  class:String;
  link:String;
  constructor(obj){
    this.class = obj.class;
    this.link = obj.link;
  }
}
