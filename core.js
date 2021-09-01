
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
}
