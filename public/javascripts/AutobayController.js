/**
 * Created with JetBrains PhpStorm.
 * User: Almira
 */

/**
 * Dit is de constructor van de AutobayController,
 * De AutobayController kan zo vaak als je wil worden aangemaakt.
 * Ik maak er een constructor van om een specifieke object van te maken die zijn eigen methodes en variabels heeft.
 * De AutobayController is er eigenlijk meer voor de client, wat ze te zien krijgen,
 * Wanneer de autobayController wordt er meteen de callback functie opgeroepen die de tabel maakt voor de client.
 * De calback functie wordt aangeroepene door de ajaxhelper, door de url mee te geven en de functie die moet worden uitgevoerd nadat je response krijg.
 * Dan handelt de functie de response af dmv de autobayview te creeeren en daarvan de buildtable methode aan te roepen.
 *
 * De reden dat ik alle functies en variables in de constructor zet is om het zoveel mogenlijk op een class te laten lijken met zijn eigen methodes/variables.
 * Om het erin te zetten zien het er ook meer uit als een class.
 * @constructor : Constructor van de AutobayController class.
 */
function AutobayController(){
    /**
     * De url waar de routes liggen.
     * @type {String} url /routes;
     */
    this.url= '/car';
    /**
     * De callback functie voor wanneer er informatie uit de database moet worden gehaald en je iets met de response mee wil doen.
     * @param data : dit is de response van de opvraging.
     */
    this.callback= function(data){
            var View = new AutobayView();
            View.buildTable(data.doc);
    }


}
$(document).ready(function () {
    var autobaycontroller = new AutobayController();
    AjaxHelper.retrieve(autobaycontroller.url, autobaycontroller.callback);
})