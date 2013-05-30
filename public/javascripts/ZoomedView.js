/**
 * Created with JetBrains PhpStorm.
 * User: Almira
 */

function ZoomedView(){
    /**
     * de zoomin functie maakt eer de overlay en dan wordt de overlay gevult
     * @param data De data dat moet worden vergroot.
     */
    this.zoomIn = function(data) {
        this.createAndAddOverlay();
        fillZoom(data);
    }

    /**
     * hier wordt eers een overlay gemaakt en gezet in de body.
     */
    this.createAndAddOverlay = function(){
        var overlay = document.createElement("div");
        overlay.id = 'overlay';
        overlay.className= 'overlay';
        document.body.appendChild(overlay);
    }

    /**
     * Die is de fullzoom functie, de data wordt meegeveven voor de dailt.
     * Eerst wordt er een popup div gemaat dan nog 2 apparte voor detail view en bieding view.
     * dan worden deze in de body gezet
     * @param data De data waar je de details van wil of een bod op wil doen.
     */
    function fillZoom(data){
        var popupDiv = createPopup();
        var detailDiv = createDetail(data);
        var bidDiv = createBidTabel(data);
        popupDiv.appendChild(detailDiv);
        popupDiv.appendChild(bidDiv);
        document.body.appendChild(popupDiv);
    }

    /**
     * dit is specifiek voor de cardetail hiering vind je de informatie van de auto waar je op hebt geklikt.
     * Eerst wordt er een image gemaakt en in de div gezet en dan de tabel en die wordt ook in de div gezet.
     * @param data De data wat je vergroot wil hebben
     * @return {HTMLElement} returnt de detail div zodat hij kan worden gezet in de body.
     */
    function createDetail(data){
        var img = document.createElement('img');
        img.src = 'images/'+data.imageUrl;
        img.alt = data.make+" "+data.style+" "+data.year;
        var detailDiv = document.createElement('div');
        detailDiv.id = "detail";
        var table = createTableDetail(data);
        detailDiv.appendChild(img);
        detailDiv.appendChild(table);
        return detailDiv;
    }


    /**
     *
     * Eerst wordt de tabel gemaakt dan wordt de tabel gevult en dan wordt een functie aangeroepen om de tabel te fullen.
     * @param data : de data dat moet worden weergegeven
     * @return {HTMLElement} : geeft de tabel terug.
     */
    function createTableDetail(data){
        var table = document.createElement('table');
        table.id = 'detailTable';
        var tbody = document.createElement('tbody');
        fillTableDetail(data, tbody);
        table.appendChild(tbody);
        return table;
    }

    /**
     * Dit is dan ook weer een hele lange functie maar dat komt ervan als je javascript gebruikt.
     * Hier wordt voor elke value een textnode th en tr voor gemaakt en geappend.
     * @param data : data die in de tabel komt.
     * @param tbody : de body waar de informatie in staat.
     */
    function fillTableDetail(data, tbody) {
        var lijst = ['Merk:', 'Type:', 'Kleur:', 'Bouwjaar:', 'Vraagprijs:', 'Motor:', 'Brandstof:', 'Vermogen:'];
        var datalijst = [data.make, data.style, data.color, data.year, data.price, data.engine, data.fuel, data.power];
        var lengthDetail = lijst.length;
        for (var i = 0; i < lengthDetail; i++) {
            var tr = document.createElement('tr');
            var th = document.createElement('th');
            var text = document.createTextNode(lijst[i]);
            th.appendChild(text);
            tr.appendChild(th);
            var td = document.createElement('td');
            var text2 = document.createTextNode(datalijst[i]);
            td.appendChild(text2);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    }

    /**
     * Deze functie creart de header van de Div zodat je duidelijk ziet de je in biedingen zit.
     * @param bidDiv De div waarin de header in moet.
     */
    function createHeader(bidDiv) {
        var headerBid = document.createElement('h1');
        var text = document.createTextNode("Biedingen");
        headerBid.appendChild(text);
        bidDiv.appendChild(headerBid);
    }

    /**
     * dit is de tabel waar alle biedingen in staan die er tot nu toe zijn voor de auto
     * @param data : data die moet worden ingevuld
     * @return {HTMLElement} : de bidDiv (div waar all einformatie in staat over diedingen)
     */
    function createBidTabel(data){
        var bidDiv = document.createElement('div');
        bidDiv.id = "bid";
        createHeader(bidDiv);
        createBiedingenTable(bidDiv,data);
        createBieding(bidDiv,data);
        return bidDiv;
    }

    /**
     * dit is waarschijnlijk de allerlangste functie , hier wordt een form gecreert met de input waardes en button natuurlijk.
     * wanneer je iets invult en op bied klikt wordt dit uitgevoerd en wordt er een bod gemaakt en in data base gezet indien je geen 2 bodden al hebt gedaan.
     * @param bidDiv : Div waar de form in moet
     * @param data : data die er al is zoals de id van de auto waar de bod op wordt gedaan.
     */
    function createBieding(bidDiv,data){
       var form = document.createElement('form');
        form.id = "bid-form";
        form.method = "post";
       var input = document.createElement('input');
        input.type = "text";
        input.name = "phone";
        input.pattern = "06[\\-]{0,1}\\d{8}";
        input.placeholder = "Telefoonnummer";
       var input1 = document.createElement('input');
        input1.type = "number";
        input1.name = "price";
        input1.min = ""+data.price*0.8;
        input1.placeholder = "Bod";
        form.appendChild(input);
        form.appendChild(input1);
       var button = document.createElement('button');
       var text = document.createTextNode("Bied");
       button.onclick= function(e){submitForm(e,data._id, this.form); return false;}
        button.appendChild(text);
        form.appendChild(button);
        bidDiv.appendChild(form);
    }

    /**
     * Dit is de submit form, deze wordt opgeroepen wanneer je bied,
     * Eerst kijkt hij of je input valideert en dan pas maakt hij een bod aan dmv de ajaxhelper.post.
     * @param e de event
     * @param id de id van de auto
     * @param form de form waar de input staat.
     */
    function submitForm(e,id,form){
        e.stopPropagation();
        e.preventDefault();
        if((form.phone.value.length === 10 && !isNaN(form.phone.value)) && (parseFloat(form.price.min) < parseFloat(form.price.value))){
           var data = {phone:form.phone.value,price:form.price.value}
           var callback = addBid;
           var url = '/car/'+id+'/bid';
           AjaxHelper.post(url,callback,data);
           alert("Uw bod is opgeslagen");
        }else{
            alert("u telefoonnummer is fout of u bod is te laag");
        }
    }

    /**
     * de bod wordt toegevoeg aan de body indien er een bod is.
     * @param data De response data.
     */
    function addBid(data){
        if(data.doc){
            buildRowBody(data.doc);
        }
    }

    /**
     * Dit is de createBiedingen table Hier maakt hij echt de tabel en voor eelke bid een row met de data erin
     * @param bidDiv : de div waar het in moet zitten
     * @param data : de data die moet worden opgeslagen in de tabel.
     */
    function createBiedingenTable(bidDiv,data){
        var bidTable = document.createElement('table');
        bidTable.id = "bidtable";
        var bidHead = createBidTableHead();
        bidTable.appendChild(bidHead);
        var bidBody = document.createElement('tbody');
        if(data.bids!= null || data.bids != undefined){
            $.each(data.bids, function(key, value){
                var url= '/bid/'+value+ '';
                var callback= function(data){
                    buildRowBody(data.doc);
                }
                AjaxHelper.retrieve(url,callback);
            });
        }
        bidTable.appendChild(bidHead);
        bidTable.appendChild(bidBody);
        bidDiv.appendChild(bidTable);
    }

    /**
     * hier wordt een rij gemaakt met de cellen en text voor de telefoon en prijs.
     * @param data : data van 1 bid.
     */
    function buildRowBody(data){
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        var text = document.createTextNode(data.phone);
        var text2 = document.createTextNode(data.price);
        td.appendChild(text);
        td2.appendChild(text2);
        tr.appendChild(td);
        tr.appendChild(td2);
        document.getElementById('bidtable').childNodes[1].appendChild(tr);

    }

    /**
     * De header van de tabel
     * @return {HTMLElement} return de thead;
     */
    function createBidTableHead() {
        var bidHead = document.createElement('thead');
        var telnr = document.createElement('th');
        var telnrtext = document.createTextNode("Telefoonnummer");
        var bod = document.createElement('th');
        var bodtext = document.createTextNode("Bod");
        telnr.appendChild(telnrtext);
        bod.appendChild(bodtext);
        bidHead.appendChild(telnr);
        bidHead.appendChild(bod);
        return bidHead;
    }

}

/**
 * dit is een globale functie zodat er meerderen de createpopup kunnen gebruiken zoals de adminview
 * Hier wordt een popup gemaakt een een sluit button
 * @return {HTMLElement} : return de popup div.
 */
function createPopup() {
    var popupDiv = document.createElement('div');
    popupDiv.className = 'popup';
    popupDiv.id = 'popup';
    var button = document.createElement('button');
    button.className = "exit";
    var text = document.createTextNode("sluiten");
    button.appendChild(text);
    button.onclick = function(e){zoomOut(e); return false;}
    popupDiv.appendChild(button);
    return popupDiv;
}

/**
 * de zoomout functie die wordt opgeroepene als je op sluit klikt bij popupdiv
 * @param e: het event.
 */
function zoomOut(e) {
    if(e.which === LEFT_CLICK){
        document.body.removeChild(document.getElementById('overlay'));
        document.body.removeChild(document.getElementById('popup'));
    }
}