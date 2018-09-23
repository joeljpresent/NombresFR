"use strict";
var NombresFR;
(function (NombresFR) {
    NombresFR.MAX_SAFE_NUMBER = 9007199254740992;
    NombresFR.CHIFFRES = {
        0: "zéro",
        1: "un",
        2: "deux",
        3: "trois",
        4: "quatre",
        5: "cinq",
        6: "six",
        7: "sept",
        8: "huit",
        9: "neuf"
    };
    NombresFR.DIX_PLUS = {
        0: "dix",
        1: "onze",
        2: "douze",
        3: "treize",
        4: "quatorze",
        5: "quinze",
        6: "seize",
        7: "dix-sept",
        8: "dix-huit",
        9: "dix-neuf"
    };
    NombresFR.DIZAINES = {
        1: "dix",
        2: "vingt",
        3: "trente",
        4: "quarante",
        5: "cinquante",
        6: "soixante",
        7: "soixante-dix",
        8: "quatre-vingts",
        9: "quatre-vingt-dix"
    };
    NombresFR.MILLE_PUISSANCE = {
        2: "million",
        3: "milliard",
        4: "billion",
        5: "billiard",
        6: "trillion",
        7: "trilliard",
        8: "quadrillion",
        9: "quadrilliard"
    };
})(NombresFR || (NombresFR = {}));
var NombresFR;
(function (NombresFR) {
    function upTo99(n) {
        if (n < 0 || n >= 100)
            throw new RangeError("Argument not in range [0..99].");
        var chiffreUnites = Math.floor(n % 10);
        var chiffreDizaines = Math.floor(n / 10);
        switch (chiffreDizaines) {
            case 0:
                return NombresFR.CHIFFRES[chiffreUnites];
            case 1:
                return NombresFR.DIX_PLUS[chiffreUnites];
            case 7:
                if (chiffreUnites === 1)
                    return "soixante-et-onze";
                return "soixante-" + NombresFR.DIX_PLUS[chiffreUnites];
            case 8:
                if (chiffreUnites === 0)
                    return "quatre-vingts";
                return "quatre-vingt-" + NombresFR.CHIFFRES[chiffreUnites];
            case 9:
                return "quatre-vingt-" + NombresFR.DIX_PLUS[chiffreUnites];
            default:
                if (chiffreUnites === 0)
                    return NombresFR.DIZAINES[chiffreDizaines];
                if (chiffreUnites === 1)
                    return NombresFR.DIZAINES[chiffreDizaines] + "-et-un";
                return NombresFR.DIZAINES[chiffreDizaines] + "-" + NombresFR.CHIFFRES[chiffreUnites];
        }
    }
    function upTo999(n) {
        if (n < 0 || n >= 1000)
            throw new RangeError("Argument not in range [0..999].");
        var chiffreCentaines = Math.floor(n / 100);
        var reste = n % 100;
        var resteTexte = upTo99(reste);
        switch (chiffreCentaines) {
            case 0:
                return resteTexte;
            case 1:
                if (reste === 0)
                    return "cent";
                return "cent-" + resteTexte;
            default:
                if (reste === 0)
                    return NombresFR.CHIFFRES[chiffreCentaines] + "-cents";
                return NombresFR.CHIFFRES[chiffreCentaines] + "-cent-" + resteTexte;
        }
    }
    function upToAMillion(n) {
        if (n < 0 || n >= 1000000)
            throw new RangeError("Argument not in range [0..999'999].");
        var nombreMilliers = Math.floor(n / 1000);
        var nombreMilliersTexte = upTo999(nombreMilliers);
        var reste = n % 1000;
        var resteTexte = upTo999(reste);
        switch (nombreMilliers) {
            case 0:
                return upTo999(n);
            case 1:
                if (reste === 0)
                    return "mille";
                return "mille-" + resteTexte;
            default:
                if (reste === 0)
                    return nombreMilliersTexte + "-mille";
                return nombreMilliersTexte + "-mille-" + resteTexte;
        }
    }
    function zillions(n, puissanceDeMille) {
        if (n < 1 || n >= 1000)
            throw new RangeError("Argument not in range [1..999].");
        if (n < 2)
            return "un " + NombresFR.MILLE_PUISSANCE[puissanceDeMille];
        return upTo999(n) + " " + NombresFR.MILLE_PUISSANCE[puissanceDeMille] + "s";
    }
    function moreThanAMillion(n) {
        var nombreMillions = Math.floor(n / 1000000);
        var res = "";
        for (var i = 2; nombreMillions > 0; i++) {
            if (nombreMillions % 1000 != 0)
                res = zillions(nombreMillions % 1000, i) + (res ? " " : "") + res;
            nombreMillions = Math.floor(nombreMillions / 1000);
        }
        if (n % 1000000 === 0)
            return res;
        return res + " " + upToAMillion(n % 1000000);
    }
    function positiveNumber(n) {
        if (n < 0)
            throw new RangeError("Argument should be non-negative.");
        if (n > NombresFR.MAX_SAFE_NUMBER)
            throw new RangeError("Function only accepts numbers whose absolute value is less than 2^53");
        if (n < 1000000)
            return upToAMillion(n);
        return moreThanAMillion(n);
    }
    function toString(n) {
        if (n < 0)
            return "moins " + positiveNumber(-n);
        return positiveNumber(n);
    }
    NombresFR.toString = toString;
})(NombresFR || (NombresFR = {}));
