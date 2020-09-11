var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function (b, d, a) {
    if (null == b)
        throw new TypeError("The 'this' value for String.prototype." + a + " must not be null or undefined");
    if (d instanceof RegExp)
        throw new TypeError("First argument to String.prototype." + a + " must not be a regular expression");
    return b + ""
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (b, d, a) {
    b != Array.prototype && b != Object.prototype && (b[d] = a.value)
};
$jscomp.getGlobal = function (b) {
    return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (b, d, a, c) {
    if (d) {
        a = $jscomp.global;
        b = b.split(".");
        for (c = 0; c < b.length - 1; c++) {
            var e = b[c];
            e in a || (a[e] = {});
            a = a[e]
        }
        b = b[b.length - 1];
        c = a[b];
        d = d(c);
        d != c && null != d && $jscomp.defineProperty(a, b, {
            configurable: !0,
            writable: !0,
            value: d
        })
    }
};
$jscomp.polyfill("String.prototype.repeat", function (b) {
    return b ? b : function (b) {
        var a = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > b || 1342177279 < b)
            throw new RangeError("Invalid count value");
        b |= 0;
        for (var c = ""; b; )
            if (b & 1 && (c += a), b >>>= 1)
                a += a;
        return c
    }
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var b = 0;
    return function (d) {
        return $jscomp.SYMBOL_PREFIX + (d || "") + b++
    }
}
();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var b = $jscomp.global.Symbol.iterator;
    b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {}
};
$jscomp.initSymbolAsyncIterator = function () {
    $jscomp.initSymbol();
    var b = $jscomp.global.Symbol.asyncIterator;
    b || (b = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function () {}
};
$jscomp.arrayIterator = function (b) {
    var d = 0;
    return $jscomp.iteratorPrototype(function () {
        return d < b.length ? {
                done: !1,
                value: b[d++]
            }
            : {
                done: !0
            }
    })
};
$jscomp.iteratorPrototype = function (b) {
    $jscomp.initSymbolIterator();
    b = {
        next: b
    };
    b[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return b
};
$jscomp.iteratorFromArray = function (b, d) {
    $jscomp.initSymbolIterator();
    b instanceof String && (b += "");
    var a = 0,
        c = {
            next: function () {
                if (a < b.length) {
                    var e = a++;
                    return {
                        value: d(e, b[e]),
                        done: !1
                    }
                }
                c.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return c.next()
            }
        };
    c[Symbol.iterator] = function () {
        return c
    };
    return c
};
$jscomp.polyfill("Array.prototype.keys", function (b) {
    return b ? b : function () {
        return $jscomp.iteratorFromArray(this, function (b) {
            return b
        })
    }
}, "es6", "es3");
resultToDraw = {
    json1: "",
    json2: "",
    colorLine: [],
    stepDiff: [],
    currentLine: 0,
    tab: ""
};

myCodeMirrorResult2 = myCodeMirrorResult1 = myCodeMirrorText2 = myCodeMirrorText1 = null;
nbDiff = 0;
function onChangeText() {
    services.billboard.emptyAndHide(["editor-error1", "editor-valid1"]);
    services.billboard.emptyAndHide(["editor-error2", "editor-valid2"]);
    document.getElementById("result").style.display = "none";
    if ("" !== myCodeMirrorText1.getValue("\n"))
        try {
            var b = JSON.parse(myCodeMirrorText1.getValue("\n"));
            !1 === b && services.billboard.setAndDisplay("editor-error1", "Invalid JSON")
        } catch (a) {
            services.billboard.setAndDisplay("editor-error1", "Invalid JSON")
        }
    if ("" !== myCodeMirrorText2.getValue("\n"))
        try {
            var d =
                JSON.parse(myCodeMirrorText2.getValue("\n"));
            !1 === d && services.billboard.setAndDisplay("editor-error2", "Invalid JSON")
        } catch (a) {
            services.billboard.setAndDisplay("editor-error2", "Invalid JSON")
        }
    b && d && (currentDiff = null, nbDiff = 0, resultToDraw = {
        json1: "",
        json2: "",
        colorLine: [],
        stepDiff: [],
        currentLine: 0,
        tab: ""
    }, b = compareJSON(b, d, resultToDraw, {
        tree: []
    }),
        displayJSONDiff(resultToDraw, b));
    jumpto('result');
}

function jumpto(anchor) {
    window.location.href = "#" + anchor;
}

function onScroll(b) {
    setTimeout(function () {
        var d = b.getScrollInfo();
        d && (myCodeMirrorResult1 == b ? myCodeMirrorResult2.scrollTo(d.left, d.top) : myCodeMirrorResult1.scrollTo(d.left, d.top))
    }, 10)
}

var dropZone = document.getElementById("dropZone"), dropZone2 = document.getElementById("dropZone2"), DiffStatus = {
    SAME: 0,
    ONLY1: 1,
    ONLY2: 2,
    DIFFERENT: 3
};

function compareJSON(b, d, a, c) {
    var e = {};
    if ("undefined" == typeof b) {
        nbDiff += 1;
        e = displayElement(d, a, {
            array: c && c.array,
            coma: c && c.coma2
        });
        a.json2 += e.json;
        a.json1 += "\n".repeat(e.nbLine);
        for (var f = 1; f <= e.nbLine; f++)
            a.colorLine.push({
                line: a.currentLine,
                color: DiffStatus.ONLY2
            }), a.currentLine++;
        return {
            diff: d
        }
    }
    if ("undefined" == typeof d) {
        nbDiff += 1;
        e = displayElement(b, a, {
            array: c && c.array,
            coma: c && c.coma1
        });
        a.json1 += e.json;
        a.json2 += "\n".repeat(e.nbLine);
        for (f = 1; f <= e.nbLine; f++)
            a.colorLine.push({
                line: a.currentLine,
                color: DiffStatus.ONLY1
            }), a.currentLine++;
        return {
            diff: b
        }
    }
    if (null == b && null == d)
        a.json1 += (c && c.array ? a.tab : "") + "null" + (c && c.coma1 ? "," : "") + "\n", a.json2 += (c && c.array ? a.tab : "") + "null" + (c && c.coma2 ? "," : "") + "\n", a.currentLine++;
    else {
        if (null == b) {
            nbDiff += 1;
            e = displayElement(d, a, {
                array: c && c.array,
                coma: c && c.coma2
            });
            a.json2 += e.json;
            a.json1 += (c && c.array ? a.tab : "") + "null" + (c && c.coma1 ? "," : "") + "\n".repeat(e.nbLine);
            for (f = 1; f <= e.nbLine; f++)
                a.colorLine.push({
                    line: a.currentLine,
                    color: DiffStatus.DIFFERENT
                }), a.currentLine++;
            return {
                diff: d
            }
        }
        if (null == d) {
            nbDiff += 1;
            e = displayElement(b, a, {
                array: c && c.array,
                coma: c && c.coma1
            });
            a.json1 += e.json;
            a.json2 += (c && c.array ? a.tab : "") + "null" + (c && c.coma2 ? "," : "") + "\n".repeat(e.nbLine);
            for (f = 1; f <= e.nbLine; f++)
                a.colorLine.push({
                    line: a.currentLine,
                    color: DiffStatus.DIFFERENT
                }), a.currentLine++;
            return {
                diff: b
            }
        }
        if (typeof b != typeof d || Array.isArray(b) && !Array.isArray(d) || !Array.isArray(b) && Array.isArray(d)) {
            nbDiff += 1;
            e = displayElement(b, a, {
                array: c && c.array,
                coma: c && c.coma1
            });
            a.json1 += e.json;
            var h = displayElement(d,
                a, {
                    array: c && c.array,
                    coma: c && c.coma2
                });
            a.json2 += h.json;
            for (f = 1; f <= Math.max(e.nbLine, h.nbLine); f++)
                a.colorLine.push({
                    line: a.currentLine,
                    color: DiffStatus.DIFFERENT
                }), a.currentLine++;
            e.nbLine >= h.nbLine ? a.json2 += "\n".repeat(e.nbLine - h.nbLine) : a.json1 += "\n".repeat(h.nbLine - e.nbLine);
            return {
                diff: b
            }
        }
        if (Array.isArray(b)) {
            a.json1 += (c && c.array ? a.tab : "") + "[\n";
            a.json2 += (c && c.array ? a.tab : "") + "[\n";
            a.currentLine += 1;
            a.tab += "\t";
            var k = [],
                g = 0;
            b.forEach(function (e, f) {
                g++;
                (e = compareJSON(e, d[f], a, {
                    tree: c.tree.concat([[f]]),
                    array: !0,
                    coma1: f != b.length - 1,
                    coma2: f < d.length - 1
                })) && k.push(e.diff)
            });
            d.forEach(function (d, e) {
                e >= b.length && (g++, (d = compareJSON(b[e], d, a, {
                    tree: c.tree.concat([[e]]),
                    array: !0,
                    coma2: g < g.length
                })) && k.push(d.diff))
            });
            a.tab = a.tab.substring(0, a.tab.length - 1);
            a.json1 += a.tab + "]" + (c && c.coma1 ? "," : "") + "\n";
            a.json2 += a.tab + "]" + (c && c.coma2 ? "," : "") + "\n";
            a.currentLine += 1;
            if (k.length)
                return {
                    diff: k
                }
        } else if ("object" == typeof b) {
            a.json1 += (c && c.array ? a.tab : "") + "{\n";
            a.json2 += (c && c.array ? a.tab : "") + "{\n";
            a.currentLine += 1;
            a.tab += "\t";
            var l = {};
            g = 0;
            Object.keys(b).forEach(function (e, f) {
                d.hasOwnProperty(e) ? (a.json1 += a.tab + '"' + e + '": ', a.json2 += a.tab + '"' + e + '": ', g++) : a.json1 += a.tab + '"' + e + '": ';
                if (f = compareJSON(b[e], d[e], a, {
                    tree: c.tree.concat([e]),
                    coma1: f != Object.keys(b).length - 1,
                    coma2: d.hasOwnProperty(e) && g < Object.keys(d).length
                }))
                    l[e] = f.diff
            });
            Object.keys(d).forEach(function (e) {
                if (!b.hasOwnProperty(e)) {
                    a.json2 += a.tab + '"' + e + '": ';
                    g++;
                    var f = compareJSON(b[e], d[e], a, {
                        tree: c.tree.concat([e]),
                        coma2: g < Object.keys(d).length
                    });
                    f && (l[e] = f.diff)
                }
            });
            a.tab = a.tab.substring(0, a.tab.length - 1);
            a.json1 += a.tab + "}" + (c && c.coma1 ? "," : "") + "\n";
            a.json2 += a.tab + "}" + (c && c.coma1 ? "," : "") + "\n";
            a.currentLine += 1;
            if (Object.keys(l).length)
                return {
                    diff: l
                }
        } else {
            a.json1 += displayElement(b, a, {
                array: c && c.array,
                coma: c && c.coma1
            }).json;
            a.json2 += displayElement(d, a, {
                array: c && c.array,
                coma: c && c.coma2
            }).json;
            if (b != d)
                return nbDiff += 1, a.colorLine.push({
                    line: a.currentLine,
                    color: DiffStatus.DIFFERENT
                }), a.currentLine++, {
                    diff: b
                };
            a.currentLine++
        }
    }
    return null
}
function displayElement(b, d, a) {
    var c = {
        nbLine: 0,
        json: ""
    };
    null == b ? c.json = (a && a.array ? d.tab : "") + "null" + (a && a.coma ? "," : "") + "\n" : "string" == typeof b ? c.json = (a && a.array ? d.tab : "") + '"' + b + '"' + (a && a.coma ? "," : "") + "\n" : "number" == typeof b ? c.json = (a && a.array ? d.tab : "") + b + "" + (a && a.coma ? "," : "") + "\n" : Array.isArray(b) ? (c.json = (a && a.array ? d.tab : "") + "[\n", c.nbLine++, d.tab += "\t", b.forEach(function (a, f) {
        a = displayElement(a, d, {
            array: !0,
            coma: f + 1 != b.length
        });
        c.json += a.json;
        c.nbLine += a.nbLine
    }), d.tab = d.tab.substring(0, d.tab.length -
        1), c.json += d.tab + "]" + (a && a.coma ? "," : "") + "\n") : "object" == typeof b ? (c.json = d.tab + "{\n", c.nbLine++, d.tab += "\t", Object.keys(b).forEach(function (a, f) {
        f = displayElement(b[a], d, {
            coma: f + 1 != Object.keys(b).length
        });
        c.json += d.tab + '"' + a + '": ' + f.json;
        c.nbLine += f.nbLine
    }), d.tab = d.tab.substring(0, d.tab.length - 1), c.json += d.tab + "}" + (a && a.coma ? "," : "") + "\n") : c.json = b + (a && a.coma ? "," : "") + "\n";
    c.nbLine++;
    return c
}
function displayJSONDiff(b, d) {
    myCodeMirrorResult1.setValue(b.json1);
    myCodeMirrorResult2.setValue(b.json2);
    // d && d.diff ? myCodeMirrorResultDiff.setValue(JSON.stringify(d.diff, null, 2)) : myCodeMirrorResultDiff.setValue("");
    b.colorLine.sort(function (a, b) {
        return a.line - b.line
    });
    var a = null;
    b.colorLine.forEach(function (c) {
        myCodeMirrorResult1.addLineClass(c.line, "background", "json_diff_color_" + c.color);
        myCodeMirrorResult2.addLineClass(c.line, "background", "json_diff_color_" + c.color);
        (null == a || c.line > a + 1) && b.stepDiff.push(c);
        a = c.line
    });
    // document.getElementById("nb-diff").innerHTML = "比较结果："+nbDiff + " difference(s)";
    document.getElementById('spanDiff').innerText = "比对结果:  " + nbDiff + ' difference(s)';
    if(nbDiff>0) {
        $("#spanDiff").css({"background-color":"#ef5350","color":"#fff"});
    }else{
        $("#spanDiff").css({"background-color":"#00c853","color":"#fff"});
    }
    myCodeMirrorText1.setSize(null, 200);
    myCodeMirrorText2.setSize(null, 200);
    document.getElementById("result").style.display = ""
}
currentDiff = null;
function removeSelectionPrevious(b, d) {
    null !== d && (b.removeLineClass(d, "background", "text-compare-select-top"), b.removeLineClass(d, "background", "text-compare-select-bottom"), b.removeLineClass(d, "background", "text-compare-select-middle"))
}
function jumpToLine(b, d) {
    var a = b.charCoords({
            line: d,
            ch: 0
        }, "local").top,
        c = b.getScrollerElement().offsetHeight / 4;
    b.scrollTo(null, a - c);
    b.addLineClass(d, "background", "text-compare-select-top");
    b.addLineClass(d, "background", "text-compare-select-bottom");
    b.addLineClass(d, "background", "text-compare-select-middle")
}
function previous() {
    resultToDraw.stepDiff.sort(function (b, d) {
        return d.line - b.line
    });
    resultToDraw.stepDiff.some(function (b) {
        return null == currentDiff || b.line < currentDiff ? (removeSelectionPrevious(myCodeMirrorResult1, currentDiff), removeSelectionPrevious(myCodeMirrorResult2, currentDiff), currentDiff = b.line, jumpToLine(myCodeMirrorResult1, currentDiff), jumpToLine(myCodeMirrorResult2, currentDiff), !0) : !1
    })
}
var editorHeight = 800;
function plus() {
    editorHeight += 350;
    myCodeMirrorResult1.setSize(null, editorHeight);
    myCodeMirrorResult2.setSize(null, editorHeight)
}
function minus() {
    editorHeight -= 350;
    450 > editorHeight && (editorHeight = 450);
    myCodeMirrorResult1.setSize(null, editorHeight);
    myCodeMirrorResult2.setSize(null, editorHeight)
}
function next() {
    resultToDraw.stepDiff.sort(function (b, d) {
        return b.line - d.line
    });
    resultToDraw.stepDiff.some(function (b) {
        return null == currentDiff || b.line > currentDiff ? (removeSelectionPrevious(myCodeMirrorResult1, currentDiff), removeSelectionPrevious(myCodeMirrorResult2, currentDiff), currentDiff = b.line, jumpToLine(myCodeMirrorResult1, currentDiff), jumpToLine(myCodeMirrorResult2, currentDiff), !0) : !1
    })
}

addEvent(window, "load", function () {
    myCodeMirrorText1 = services.codeMirror.create("editor-container-text", {
        mode: "application/json",
        lineNumbers: !0,
        lineWrapping: !0
    });
    myCodeMirrorText2 = services.codeMirror.create("editor-container-text-2", {
        mode: "application/json",
        lineNumbers: !0,
        lineWrapping: !0
    });
    myCodeMirrorResult1 = services.codeMirror.create("editor-container-result1", {
        mode: "application/json",
        readOnly: !0,
        lineNumbers: !1,
        lineWrapping: !0,
        viewportMargin: Infinity
    });
    myCodeMirrorResult2 = services.codeMirror.create("editor-container-result2", {
        mode: "application/json",
        readOnly: !0,
        lineNumbers: !1,
        lineWrapping: !0,
        viewportMargin: Infinity
    });

    myCodeMirrorText1.setSize(null, editorHeight);
    myCodeMirrorText2.setSize(null, editorHeight);

    myCodeMirrorResult1.setSize(null, editorHeight);
    myCodeMirrorResult2.setSize(null, editorHeight);

    myCodeMirrorText1.on("change",
        onChangeText);
    myCodeMirrorText2.on("change", onChangeText);
    myCodeMirrorResult1.on("scroll", function () {
        onScroll(myCodeMirrorResult1)
    });
    myCodeMirrorResult2.on("scroll", function () {
        onScroll(myCodeMirrorResult2)
    });
    // setTimeout(function () {
    //     onChangeText();
    //     next()
    // }, 10);

    $("#btnShare").click(function(){
        //filePair = {originalFile:myCodeMirrorText1.getValue(),newFile:myCodeMirrorText2.getValue()};
        var originalFile = myCodeMirrorText1.getValue();
        var newFile = myCodeMirrorText2.getValue();
        var format = "json";
        postAjax("/saveFilePair",{originalFile:originalFile,newFile:newFile, format:format},function (data) {
            popupInfo(data.result);
        });
    });

    var url = new URL(window.location.href);
    var reportName = url.searchParams.get("reportName");
    if (reportName) {
        postAjax("/getJsonsPair", {
            reportName: reportName
        }, function(filePair) {
            myCodeMirrorText1.setSize(null, 200);
            myCodeMirrorText2.setSize(null, 200);
            myCodeMirrorText1.setValue(filePair.originalFile);
            myCodeMirrorText2.setValue(filePair.newFile);
            onChangeText();
        });
    }else{
        document.getElementById("result").style.display = "none";
    }
});
