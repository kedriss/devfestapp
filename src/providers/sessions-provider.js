"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var devfest_2015_json_1 = require('../data/devfest-2015.json');
/*
  Generated class for the SessionsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var SessionsProvider = (function () {
    function SessionsProvider(http) {
        this.http = http;
        console.log('Hello SessionsProvider Provider');
    }
    // Load all github users
    SessionsProvider.prototype.load = function () {
        var sessions = devfest_2015_json_1.default.sessions;
        return sessions;
    };
    SessionsProvider.prototype.loadOne = function (idSession) {
        var sessions = devfest_2015_json_1.default.sessions.filter(function (s) { return s.id == idSession; });
        return sessions;
    };
    SessionsProvider.prototype.loadSpeakerSessions = function (idSpeaker) {
        var sessions = devfest_2015_json_1.default.sessions.filter(function (s) { return SessionsProvider.contains(s.speakers, idSpeaker); });
        console.log(sessions);
        return sessions;
    };
    SessionsProvider.contains = function (a, obj) {
        if (a && obj)
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    console.log('ouaip');
                    return true;
                }
            }
        return false;
    };
    SessionsProvider = __decorate([
        core_1.Injectable()
    ], SessionsProvider);
    return SessionsProvider;
}());
exports.SessionsProvider = SessionsProvider;
