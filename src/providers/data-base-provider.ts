import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite, Toast} from "ionic-native";
import {Platform} from "ionic-angular";

/*
  Generated class for the DataBaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataBaseProvider {
  database: SQLite;
  static NOTES_TABLE_CREATION_SQL="CREATE TABLE IF NOT EXISTS notes ( idSession TEXT PRIMARY KEY, contenu TEXT)";
  static IMAGES_TABLE_CREATION_SQL="CREATE TABLE IF NOT EXISTS photosSession (id INTEGER PRIMARY KEY AUTOINCREMENT, idSession TEXT , image TEXT)";
  static VIDEOS_TABLE_CREATION_SQL="CREATE TABLE IF NOT EXISTS videosSession (id INTEGER PRIMARY KEY AUTOINCREMENT, idSession TEXT , url TEXT,url2 TEXT,typeV TEXT)";
  static AUDIOS_TABLE_CREATION_SQL="CREATE TABLE IF NOT EXISTS audiosSession (id INTEGER PRIMARY KEY AUTOINCREMENT, idSession TEXT , url TEXT,url2 TEXT,typeV TEXT)";
  static PARCOURS_TABLE_CREATION_SQL="CREATE TABLE IF NOT EXISTS PARCOURS (id INTEGER PRIMARY KEY AUTOINCREMENT, idSession TEXT)";

  private static readonly DATABASE_OPTIONS = {
    name: "devfest_2015.db",
    location: "default"
  };
  constructor(public http: Http, private platform:Platform) {

  }

  getDatabase(): Promise<SQLite> {
    if (!this.database) {
      return this.initDatabase().then(() => this.database);
    } else {
      return Promise.resolve(this.database);
    }
  }

  private initDatabase(): Promise<SQLite> {
    return this.platform.ready()
      .then(() => {
        const database = new SQLite();
        return database.openDatabase(DataBaseProvider.DATABASE_OPTIONS)
          .then(
            () => {
              database.executeSql(DataBaseProvider.NOTES_TABLE_CREATION_SQL, {})
                .catch(error => Toast.showShortBottom('Unable to create NOTES').subscribe());
              database.executeSql(DataBaseProvider.IMAGES_TABLE_CREATION_SQL, {})
                .catch(error => {
                  console.log('error', error);
                  Toast.showShortBottom('Unable to create IMAGES').subscribe()
                });
              database.executeSql(DataBaseProvider.VIDEOS_TABLE_CREATION_SQL, {})
                .catch(error => {
                  console.log('error', error);
                  Toast.showShortBottom('Unable to create VIDEOS').subscribe()
                });
              database.executeSql(DataBaseProvider.AUDIOS_TABLE_CREATION_SQL, {})
                .catch(error => {
                  console.log('error', error);
                  Toast.showShortBottom('Unable to create AUDIO').subscribe()
                });
              database.executeSql(DataBaseProvider.PARCOURS_TABLE_CREATION_SQL, {})
                .catch(error => {
                  console.log('error', error);
                  Toast.showShortBottom('Unable to create PARCOURS').subscribe()
                });
              this.database = database;
            },
            error => Toast.showShortBottom("Unable to open database").subscribe()
          )
      });
  }
}
