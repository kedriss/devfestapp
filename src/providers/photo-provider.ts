import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";

/*
  Ce provider permet de retourner les sessions choisies;
  Il permet aussi de verifier que l'ajout d'une session ne se chevauche pas avec une autre session deja choisi.
*/
@Injectable()
export class PhotoProvider {

  constructor(public http: Http) {
    console.log('Hello PhotoProvider Provider');
  }
}
