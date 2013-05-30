(function () {

    /**
     * dit wordt gebruikt voor CRUD calls tussen client en server
     * @type {Object} : object met alle functies : post retrieve update en delete
     */
    var AjaxHelper = {

        // CREATE
        /**
         * Met de functie moet je de url, calback en data meegeven
         * zonder deze parametrs wordt het niet opgeroepen.
         * wanneer er succesfol response is wordt de callback methode opgroepen met de meeggeven retobj
         * @param url de url naar call
         * @param callback functie die moet worden uitgevoerd worden op succes.
         * @param data de data die moet worden gepost.
         */
        post: function (url,callback, data) {
            $.ajax({
                    url: url,
                    type: "post",
                    data: data,
                    success: function (retObj) {
                        callback(retObj)
                    }
                }
            );
        },

        // RETRIEVE
        /**
         * Maakt een get request eigenlijk en haalt alleen data op en on succes voert de callback functie.
         * @param url de url naar call
         * @param callback functie die moet worden uitgevoerd worden op succes.
         */
        retrieve: function (url, callback) {
            $.ajax({
                    url: url,
                    type: "get",
                    success: function (retObj) {
                        callback(retObj)
                    }
                }
            );
        },

        // UPDATE
        /**
         * Updates de data die al bestaat.
         * @param url de url naar call
         * @param callback functie die moet worden uitgevoerd worden op succes.
         * @param data de data die moet worden gepost.
         */
        update: function (url, callback, data) {
            $.ajax({
                    url: url,
                    type: "put",
                    data: data,
                    success: function (retObj) {
                        callback(retObj)
                    }
                }
            );
        },

        // DELETE
        /**
         * Een delete request en voert de callback on succes.
         ** @param url de url naar call
         * @param callback functie die moet worden uitgevoerd worden op succes.
         */
        delete: function (url, callback) {
            $.ajax({
                    url: url,
                    type: "delete",
                    success: function (retObj) {
                        callback(retObj)
                    }
                }
            );
        }

    }
    // Export AjaxHelper for global access.
    window.AjaxHelper = AjaxHelper;
}());