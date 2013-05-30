/**
 * Created with JetBrains PhpStorm.
 * User: Almira
 */

/**
 * Dit is de constructor van de AdminView,
 * De AdminView kan zo vaak als je wil worden aangemaakt.
 * Ik maak er een constructor van om een specifieke object van te maken die zijn eigen methodes en variabels heeft.
 * De autobayview is eigenlijk specifiek voor wanneer een "admin" auto's wil beheren.
 * Je kan delete en dit wordt dan ellemaal gemaaktdoor de view, want die laat het ook letterlijk in de tabllen zien wanneer je verwijder of verandert of toevoegt
 *
 * De reden dat ik alle functies en variables in de constructor zet is om het zoveel mogenlijk op een class te laten lijken met zijn eigen methodes/variables.
 * Om het erin te zetten zien het er ook meer uit als een class.
 * @constructor : Constructor van de AdminView class.
 */
function AdminView(){
    /**
     * hier wordt een zoomedView gemaakt en opgeslagen in variable zodat er gebruik van kunnen worden gemaakt.
     * @type {ZoomedView} : ZoomedView constructor.
     */
    var zoomview = new ZoomedView();

    /**
     * Hier wordt een autobayView gemaakt om de methodes te kunenn gebruiken van de contructor.
     * @type {AutobayView} : AutobayView constructor.
     */
    var autobayview = new AutobayView();

    /**
     * de id waar er momenteel op wordt "gehover"
     */
    var id;

    /**
     * bestaande tabel die de client zien
     * @type {HTMLElement} de tabel
     */
    var table = document.getElementById('CarTable');

    /**
     * hier wordt de adminviewtabel opgeroepen om de view voor de admin te veranderen
     */
    adminViewTable();

    /**
     *  Hier worden de extra cellen toegevoegt voor de tabel zodat hij niet gelemaal opnieuw moet worden gemaakt.
     *  De events worden hier geset voor wanneer je erop klik ( add, edit, sold, delte)
     */
    function adminViewTable(){
        var th = document.createElement('th');
            th.colSpan = 3;
            th.className = 'add';
        var txt = document.createTextNode('add');
        th.onmousedown = function (e){e.preventDefault();zoomEditView(); return false;}
        th.appendChild(txt);
        for(var i =0 ; i < table.getElementsByTagName('tbody')[0].childNodes.length; i++) {
            var tr = table.getElementsByTagName('tbody')[0].childNodes[i];
            setAdminViewOptions(tr);
        }
        table.getElementsByTagName('thead')[0].childNodes[0].appendChild(th);
    }

    /**
     * hier worden alle event geset, wanneer je op edit klikt of add etc.
     * @param tr de rij waar je op hoverd zodat de id wordt opgeslagen.
     */
    function setAdminViewOptions(tr) {
        tr.onmouseover = function (e) {
            id = this.id;
            return false;
        }
        tr.onmousedown = function (e) {
            return false;
        };
        var td = document.createElement('td');
        var text = document.createTextNode("Edit");
        td.className = "edit";
        td.onmousedown = function (e) {
            edit(e, id);
            return false;
        };
        var td2 = document.createElement('td');
        td2.className = "sold";
        td2.onmousedown = function (e) {
            sold(e, id);
            return false;
        };
        var text2 = document.createTextNode("Sold");
        var td3 = document.createElement('td');
        td3.className = "delete";
        td3.onmousedown = function (e) {
            deleteCar(e, id);
            return false;
        };
        var text3 = document.createTextNode("Delete");
        td.appendChild(text);
        td2.appendChild(text2);
        td3.appendChild(text3);
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
    }

    /**
     * functie delete car , hij wordt uit de tabel verwijdert maar ook uit de database dmv ajaxhelper.delete.
     * @param e het event
     * @param id de id van de auto die verwijdert moet worden.
     */
    function deleteCar(e,id){
        if(e.which === LEFT_CLICK){
            table.getElementsByTagName('tbody')[0].removeChild(document.getElementById(id));
            var callback = function(data){
            alert("De auto is verwijdert");
        }
            var url = "/car/"+id;
            AjaxHelper.delete(url,callback);
        }
    }

    /**
     * functie edit car, hiervoor wordt er een zoom gedaan met de detail die je kunt bewerken en opslaan.
     * door retrieve te gebruiken haal je specifieke auto gegevens op en wordt deze gevult door de methode fillform.
     * @param e : het event
     * @param id : de id van de specifieke auto.
     */
    function edit(e,id){
        var url = '/car/'+id;
        if(e.which === LEFT_CLICK){
            zoomEditView();
            AjaxHelper.retrieve(url,fillForm);
        }
    }

    /**
     * hier wordt een auto op sold geset en geupdate in de tabel, je kunt hem niet meer zien maar hij blijft in de data base staan
     * De date wordt opgeslagen van wanneer hij verkocht is.
     * @param e
     * @param id
     */
    function sold(e,id){
        var url = '/car/'+id;
        var data = {sold:true, soldDate:Date.now};
        function callback(data){
            table.getElementsByTagName('tbody')[0].removeChild(document.getElementById(id));
            alert("de auto is verkocht");
        }
        if(e.which === LEFT_CLICK){
        AjaxHelper.update(url,callback,data);
        }
    }

    /**
     * dit is de zoom wanneer je wil wijzigen/toevoegen
     * eerst wordt popup gemaakt dan formdiv en deze wordt dan geappend.
     */
    function zoomEditView(){
        zoomview.createAndAddOverlay();
        var popup = createPopup();
        var formDiv= createFormDiv();
        var div = document.createElement('div');
        div.className = "formInDiv";
        div.appendChild(formDiv);
        popup.appendChild(div);
        document.body.appendChild(popup);
    }

    /**
     * De fillform methode deze methode wordt opgeroepen wanneer je een auto wil wijzigen,
     * eerst wordt er een leef formulier gemaakt en hier wordt deze gevult met de data die er is.
     * wanneer je dit opslaat krijg je ook te zien in de tabel.
     * @param data de data van de auto.
     */
    function fillForm(data){
        var allData = [data.doc.make, data.doc.style, data.doc.color, data.doc.year,
            data.doc.price, data.doc.imageUrl, data.doc.power, data.doc.fuel, data.doc.engine,data.doc.id];

        var inputId = ['make','style','color','year','price','imageUrl','power','fuel','engine','id'];
        for(var i = 0; i <10 ; i ++){
          document.getElementById(inputId[i]).value = allData[i];
        }

        document.getElementById('save').onclick = function (e){
            e.preventDefault();
            e.stopPropagation();
            saveData(document.getElementById('EditAdd-Form'),data.doc._id);
            return false;;}
    }

    /**
     * MEt de functie createForm div wordt er een lege formulier gemaakt e geset.
     * @return {HTMLElement} het formulier
     */
    function createFormDiv(){
        var form = document.createElement("form");
        form.id = 'EditAdd-Form';
        form.method = "post";
        var table = document.createElement('table');
        table.id = "EditAdd-Table";
        var inputId = ['make','style','color','year','price','imageUrl','power','fuel','engine','id'];

        for (var i = 0; i < 10; i++) {
            var th = document.createElement('th');
            var tr = document.createElement('tr');
            var text = document.createTextNode(inputId[i]);
            th.appendChild(text);
            var input = document.createElement('input');
            input.type = "text";
            input.name = inputId[i];
          //  input.id = inputId[i];
            input.disabled = false;
            tr.appendChild(th);
            tr.appendChild(input);
            table.appendChild(tr);
        }

        var button = document.createElement('button');
        button.id = 'save';
        button.onclick = function(e) {saveDataNewData(e,this.form);return false;};
        var text = document.createTextNode("Save");
        button.appendChild(text);
        form.appendChild(table);
        form.appendChild(button);
        return form;
    }

    /**
     * Deze functie wordt opgeroepen wanneer er een event is, wanneer je een gewijzigt auto wil opslaan.
     * voor deze auto heb je een specifieke id en je wilt het alleen updaten.
     * @param form de form met alle input value
     * @param id de id van de auto
     */
    function saveData(form,id){
        var url = '/car/'+ id;

        var data = {imageUrl:form.imageUrl.value,make:form.make.value,style:form.style.value, color:form.color.value, year:form.year.value,
            price:form.price.value, power:form.power.value, fuel:form.fuel.value, engine:form.engine.value,id:form.id.value};

        var callback = function(data){
            document.getElementById('CarTable').getElementsByTagName('tbody')[0].removeChild(document.getElementById(data.doc._id));
            var row = document.createElement('tr');
            row.id = data.doc._id;
            createCells(row, data.doc,table.getElementsByTagName('tbody')[0]);
            setAdminViewOptions(row);
            row.onmousedown= function (e){id = this.id; return false;};
            alert("uw record is opgeslagen");
        }

        AjaxHelper.update(url,callback,data);
    }

    /**
     * deze functie wordt opgreopen waneer er een event is, wanneer je een nieuwe auto wil opslaan.
     * Voor deze auto hebt je geen specifieke id want die moet worden gemaakt dmv create/posten.
     * @param e het event
     * @param form de form met alle input values
     * @return {Boolean} set de waardes op false zodat default events niet worden getriggert
     */
    function saveDataNewData(e,form){
        var url = '/car';
        console.log("in the post");
        var data = {imageUrl:form.imageUrl.value,make:form.make.value,style:form.style.value, color:form.color.value, year:form.year.value,
            price:form.price.value, power:form.power.value, fuel:form.fuel.value, engine:form.engine.value,id:form.id.value};

        var callback = function(data){
            var row = document.createElement('tr');
            row.id = data.doc._id;
            createCells(row, data.doc,table.getElementsByTagName('tbody')[0]);
            setAdminViewOptions(row);
            row.onmousedown= function (e){id = this.id; return false;};
            alert("uw record is opgeslagen");
        }
        AjaxHelper.post(url,callback,data);

        e.preventDefault();
        e.stopPropagation();
        return false;
    }


}
