"use strict";
var PresentateurImpl = (function () {
    function PresentateurImpl(objet) {
        this.id = objet.id;
        this.topspeaker = objet.topspeaker;
        this.firstname = objet.firstname;
        this.lastname = objet.lastname;
        this.image = objet.image;
        this.category = new Catergory(objet.category);
        this.category.class = objet.class;
        this.category.title = objet.title;
    }
    ;
    return PresentateurImpl;
}());
exports.PresentateurImpl = PresentateurImpl;
var Category = (function () {
    function Category() {
    }
    return Category;
}());
exports.Category = Category;
