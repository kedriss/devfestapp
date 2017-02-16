import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {HelloIonicPage} from "../pages/hello-ionic/hello-ionic";
import {SessionPage} from "../pages/session/session";
import {PresentateurPage} from "../pages/presentateur/presentateur";
import {PresentateursPage} from "../pages/presentateurs/presentateurs";
import {SessionsPage} from "../pages/sessions/sessions";
import {PresentateurProvider} from "../providers/presentateur-provider";
import {SessionsProvider} from "../providers/sessions-provider";
import {HourProvider} from "../providers/hour-provider";
import {SafePipe} from "../models/SafePipe";
import {AboutPhonePage} from "../pages/about-phone/about-phone";
import {NotesPage} from "../pages/notes/notes";
import {PhotoProvider} from "../providers/photo-provider";
import {DataBaseProvider} from "../providers/data-base-provider";
import {ParcoursProvider} from "../providers/parcours-provider";
import {ParcoursPage} from "../pages/parcours/parcours";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    SessionsPage,
    SessionPage,
    PresentateurPage,
    PresentateursPage,
    SafePipe,
    AboutPhonePage,
    NotesPage,
    ParcoursPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    SessionsPage,
    SessionPage,
    PresentateurPage,
    PresentateursPage,
    AboutPhonePage,
    NotesPage,
    ParcoursPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PresentateurProvider, SessionsProvider,HourProvider,DataBaseProvider,PhotoProvider, ParcoursProvider]
})
export class AppModule {}
