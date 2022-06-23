let
    getParams = function (e) {
        for (var a = window.location.search.substring(1).split("&"), t = 0; t < a.length; t++) {
            var n = a[t].split("=");
            if (n[0] == e) return n[1]
        }
        return !1
    },

    capitalizeFirstLetter = function (str) {
        str = str.toLowerCase()
        var pieces = str.split(" ");
        for (var i = 0; i < pieces.length; i++) {
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    },

    getSearchParameters = function () {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    },

    transformToAssocArray = function (prmstr) {
        var params = {};
        var prmarr = prmstr.split("&");
        for (var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = decodeURI(tmparr[1]);
        }
        return params;
    },
    
    getSearchCookies = function () {
        var prmstr = document.cookie;
        return prmstr != null && prmstr != "" ? transformCookiesToAssocArray(prmstr) : {};
    },

    transformCookiesToAssocArray = function (prmstr) {
        var params = {};
        var prmarr = prmstr.split(";");
        for (var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = decodeURI(tmparr[1]);
        }
        return params;
    },

    newObj = function (array, values = false) {
        if (!values) {
            return Object.entries(array)
        } else {
            return Object.values(array)
        }
    },

    Consult = function (e) {
        return fetch(e.URL, {
            method: "POST",
            body: new URLSearchParams(e.Data).toString(),
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                "Authorization": "Basic RGV2OlNIRTE1MDI5OEF3RHI="
            }
        })
    },

    Insert = function (URL, Data) {
        return fetch(URL, {
            method: "POST",
            body: Data
        })
    },

    strpos = function (haystack, needle, offset) {
        var i = (haystack + '').indexOf(needle, (offset || 0));
        return i === -1 ? false : true;
    },

    //Elemento é Visivel
    elementIsVisible = function (dom_element, callback) {

        // elementIsVisible(element, function() {
        //      Ação
        // });

        if (!(dom_element instanceof HTMLElement)) {
            console.error('dom_element must be a valid HTMLElement');
        }

        if (typeof callback !== 'function') {
            console.error(
                'Second parameter must be a function, got',
                typeof callback,
                'instead',
            );
        }

        function isOnViewport(elem) {
            var rect = elem.getBoundingClientRect();
            var docElem = document.documentElement;
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || docElem.clientHeight) &&
                rect.right <= (window.innerWidth || docElem.clientWidth)
            );
        }

        var executeCallback = (function () {
            var wasExecuted = false;
            return function () {
                if (!wasExecuted && isOnViewport(dom_element)) {
                    wasExecuted = true;
                    callback();
                }
            };
        })();

        window.addEventListener('scroll', executeCallback, false);
    },

    executeWhenReachedPagePercentage = function (percentage, callback) {

        // executeWhenReachedPagePercentage(75, function() {
        //     Ação
        // });


        if (typeof percentage !== 'number') {
            console.error(
                'First parameter must be a number, got',
                typeof percentage,
                'instead',
            );
        }

        if (typeof callback !== 'function') {
            console.error(
                'Second parameter must be a function, got',
                typeof callback,
                'instead',
            );
        }

        function getDocumentLength() {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            )
        }

        function getWindowLength() {
            return window.innerHeight ||
                (document.documentElement || document.body).clientHeight;
        }

        function getScrollableLength() {
            if (getDocumentLength() > getWindowLength()) {
                return getDocumentLength() - getWindowLength();
            } else {
                return 0;
            }
        }

        var scrollableLength = getScrollableLength();

        window.addEventListener("resize", function () {
            scrollableLength = getScrollableLength();
        }, false)

        function getCurrentScrolledLengthPosition() {
            return window.pageYOffset ||
                (document.documentElement || document.body.parentNode || document.body).scrollTop;
        }

        function getPercentageScrolled() {
            if (scrollableLength == 0) {
                return 100;
            } else {
                return getCurrentScrolledLengthPosition() / scrollableLength * 100;
            }
        }

        var executeCallback = (function () {
            var wasExecuted = false;
            return function () {
                if (!wasExecuted && getPercentageScrolled() > percentage) {
                    wasExecuted = true;
                    callback();
                }
            };
        })();

        if (getDocumentLength() == 0 ||
            (getWindowLength() / getDocumentLength() * 100 >= percentage)) {
            callback();
        } else {
            window.addEventListener('scroll', executeCallback, false);
        }
    };
