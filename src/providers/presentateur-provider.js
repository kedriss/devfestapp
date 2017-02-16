"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var PresentateurModel_1 = require("../models/PresentateurModel");
var devfest_2015_json_1 = require('../data/devfest-2015.json');
/*
  Generated class for the PresentateurProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var PresentateurProvider = (function () {
    function PresentateurProvider(http) {
        this.http = http;
        console.log('Hello PresentateurProvider Provider');
    }
    // Load all github users
    PresentateurProvider.prototype.load = function () {
        var speacker = devfest_2015_json_1.default.speakers.map(function (s) { return new PresentateurModel_1.PresentateurImpl(s); });
        return speacker;
    };
    PresentateurProvider.prototype.loadOne = function (id) {
        var speacker = devfest_2015_json_1.default.speakers.filter(function (e) { return e.id == id; });
        console.log(speacker);
        return speacker;
    };
    PresentateurProvider = __decorate([
        core_1.Injectable()
    ], PresentateurProvider);
    return PresentateurProvider;
}());
exports.PresentateurProvider = PresentateurProvider;
