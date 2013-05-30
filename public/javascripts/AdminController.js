/**
 * Created with JetBrains PhpStorm.
 * User: Almira
 */

/**
 * vast data voor het inloggen.
 * @type {String} de username;
 */
adminUserName = "admin";
/**
 * vast data voor het inloggen.
 * @type {String} de password.
 */
adminPassWord = "root";

/**
 * Dit is de constructor van de AdminController,
 * De AdminController kan zo vaak als je wil worden aangemaakt.
 * Ik maak er een constructor van om een specifieke object van te maken die zijn eigen methodes en variabels heeft.
 * De admincontroller is er om voor het inloggen te zorgen, dus te checken of je de goede persoon bent en daarna de table te updaten zodat je kan toevoegen,delete en update.
 *
 * De reden dat ik alle functies en variables in de constructor zet is om het zoveel mogenlijk op een class te laten lijken met zijn eigen methodes/variables.
 * Om het erin te zetten zien het er ook meer uit als een class.
 * @constructor : Constructor van de admincontroller class.
 */
function AdminController(){
    /**
     *
     * Hierin set ik meteen de eventhandler in het geval je wil inloggen,
     * hiervoor zoek ik de butten eerst op, daarna zet ik de functie die hij moet uitvoeren indien je die indrukt.
     * in dit geval checkt hij of je ingevulde waardes zoals username en password goed zijn,
     * indien dit zo is wordt de tabel bijgewerkt en login scherm verwijdert.
     */
    var loginForm = document.getElementById('loginForm');
    var button = loginForm.getElementsByTagName('button')[0];
    button.onclick = function(e){ login(e,this.form);return false;}
    /**
     * dus de functie voor het inloggen die checkt of jij hebt bent en indien dit het geval is maakt hij de view aan.
     * @param e : het event
     * @param form : de form waarin de values zitten.
     */
    function login(e,form){
        e.preventDefault();
        e.stopPropagation();
        if(form.username.value === adminUserName && form.password.value === adminPassWord){
            document.getElementsByTagName('header')[0].removeChild(document.getElementById('login'));
            var adminView = AdminView();
        }
        else{
            alert("uw wachtwoord of username klopt niet");
        }
    }
}

$(document).ready(function () {
    var admincontroller = new AdminController();

})