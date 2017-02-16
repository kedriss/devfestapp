import {SessionModel, Hour} from "./SessionModel";
/**
 * Created by kedri on 16/02/2017.
 */

export class PoolSession{
  sessions :SessionModel[];
  hour :String;
  hours:Hour;

  constructor(){
    this.sessions=[];

  }

}
