import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {PresentateurImpl, PresentateurModel} from "../models/PresentateurModel";
import data from "../data/devfest-2015.json";
/*
  Generated class for the PresentateurProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PresentateurProvider {

  constructor() {
    console.log('Hello PresentateurProvider Provider');
  }
  // Load all github users
   load():PresentateurModel[] {
    var speacker= data.speakers.map(s => {return new PresentateurImpl(s);});
    return speacker;
  }
  loadOne(id):PresentateurModel {
    var speacker= data.speakers.filter(e=>e.id==id).map(p=>new PresentateurImpl(p))[0];
    return speacker;
  }
}
