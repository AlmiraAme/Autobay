/**
 * Created with JetBrains PhpStorm.
 * User: Almira
 */
/**
 * de left click dit globaal omdat ik het zowat voor elk event gebruik
 * @type {Number} : de linker muisklik
 */
var LEFT_CLICK = 1;
/**
 * het aantal kolommen in de tabel.
 * @type {Number} aantal Coloms
 */
var numberOfColoms = 6;

/**
 * Dit is de constructor van de AutobayView,
 * De AdminController kan zo vaak als je wil worden aangemaakt.
 * Ik maak er een constructor van om een specifieke object van te maken die zijn eigen methodes en variabels heeft.
 * De autobayview is eigenlijk specifiek voor wanneer een "client" een auto wil inzoomen of wil bieden.
 * voor het ingezoemde scherm wordt ze ZoomedView constructor vooral gebruikt.
 *
 * De reden dat ik alle functies en variables in de constructor zet is om het zoveel mogenlijk op een class te laten lijken met zijn eigen methodes/variables.
 * Om het erin te zetten zien het er ook meer uit als een class.
 * @constructor : Constructor van de AutobayView class.
 */
function AutobayView(){

    /**
     * hier wordt de oncontextmenu op false gezet zodat er geen default events worden opgeroepen.
     * @return {Boolean} False;
     */
    document.oncontextmenu= function(){return false;};
    /**
     * hier wordt een zoomedView gemaakt en opgeslagen in variable zodat er gebruik van kunnen worden gemaakt.
     * @type {ZoomedView} : ZoomedView constructor.
     */
    var zoomedView = new ZoomedView();

    /**
     * Hier wordt de table gebuilt met de meegegeven data,
     * Eerst wordt een tabel gemaakt met de head en body en in de body worden de data in rijen ingevult.
     * @param data : de data waarmee de tabel wordt gevult.
     */
    this.buildTable = function(data){
        var table = document.createElement('table');
        table.id = 'CarTable'
        var tableHeader = document.createElement('thead');
        var tbody = document.createElement('tbody');
        fillTableHeader(tableHeader, table);
        createRows(tbody,data);
        table.appendChild(tbody);
        document.getElementById('sub-container').appendChild(table);
    };

    /**
     * hier wordt de haeder gevult met standaat waarden en dan woden ze ingezet in de tabel
     * @param tableHeader : De table header met tablerow en de th cellen erin
     * @param table : de tabel waar alles in moet.
     */
    function fillTableHeader(tableHeader, table) {
        var textArray = ['', 'Merk', 'Type', 'Kleur', 'Bouwjaar', 'vraagprijs'];
        var row = document.createElement('tr');
        for (var j = 0; j < numberOfColoms; j++) {
            var tableH = document.createElement('th');
            var text = document.createTextNode(textArray[j]);
            tableH.appendChild(text);
            row.appendChild(tableH);
        }
        tableHeader.appendChild(row);
        table.appendChild(tableHeader)

    }

    /**
     * Dit is de functie createRows waar de rijen met data worden ingevult van de response.
     * de tbody wordt megegeven zodat de rijen in de body worden gezet en natuurlijk de data.
     * Hiervoor heb ik jquery gebruikt omdat dat het makkelijks alle data uit een lange object/array haalt.
     * Dit was de kortste manieer om te doen.
     * Ik maak voor alle data een rij en dan creer ik de cellen met da values erin en zet deze in de rij.
     * de rij heeft ook een event wanneer je op de row klikt wordt het ingezoomt.
     *
     * //used http://stackoverflow.com/questions/684672/loop-through-javascript-object
     //http://api.jquery.com/jQuery.each/
     * @param tbody De body van de tabel
     * @param data De response data
     */
    function createRows(tbody, data) {
        $.each(data, function(key, value){
            var row = document.createElement('tr');
            row.id = value._id;
            createCells(row, value,tbody);
            row.onmousedown= function (e){mouseDown(e, value);};
        });
    };

    /**
     * De mouseDown event, wanneer deze wordt getriggert wordt de zoomin functie opgeroepen om in te zoomen.
     * @param e: het event
     * @param data : de data dat moet worden vergroot/uitgebreid zoals een specifieke auto.
     */
    function mouseDown(e, data) {
        if(e.which === LEFT_CLICK){
            zoomedView.zoomIn(data);
        }
    }
}

/**
 * de createCells functie, hierbij wordt de row data en tbody meegegeven zodat alles er mooit wordt ingezet.
 * Dit zijn best wel lange functies maar dat komt er van als je javascript gebruikt.
 * @param row : de rij vaar de cellen in moeten komen
 * @param data : de data dat in de cellen moet komen
 * @param tbody : de tbody waar de rijen in moeten komen.
 */
function createCells(row, data,tbody) {
    var dataFill = [data.imageUrl,data.make,data.style,data.color,data.year,data.price]
    for (var k = 0; k < numberOfColoms; k++) {
        var tableCell = document.createElement('td');
        if(k === 0){
            var img = createImage(dataFill, data);
            tableCell.appendChild(img);
        }else{
            var text = document.createTextNode(dataFill[k]);
            tableCell.appendChild(text);
        }
        row.appendChild(tableCell);
    }
    tbody.appendChild(row);
};

/**
 * dit is waneer er een image moet worden gezet. dit is ook te hergebruiken indien nodig.
 * Hij set de src en alt van de img en overige dingen en return deze
 * @param dataFill De imgsrc
 * @param data De overige data voor het alt tag
 * @return {HTMLElement} : de image return hij weer.
 */
function createImage(dataFill, data) {
    var img = document.createElement('img');
    img.src = 'images/' + dataFill[0];
    img.alt = data.make + " " + data.style + " " + data.year;
    img.style.maxWidth = 30 + '%';
    return img;
}