var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function () {
    var a = 0;
    return function (b) {
        return $jscomp.SYMBOL_PREFIX + (b || "") + a++
    }
}
();
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
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
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function () {}
};
$jscomp.arrayIterator = function (a) {
    var b = 0;
    return $jscomp.iteratorPrototype(function () {
        return b < a.length ? {
                done: !1,
                value: a[b++]
            }
            : {
                done: !0
            }
    })
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.iteratorFromArray = function (a, b) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var c = 0,
        d = {
            next: function () {
                if (c < a.length) {
                    var e = c++;
                    return {
                        value: b(e, a[e]),
                        done: !1
                    }
                }
                d.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return d.next()
            }
        };
    d[Symbol.iterator] = function () {
        return d
    };
    return d
};
$jscomp.polyfill = function (a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.polyfill("Array.prototype.keys", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a) {
            return a
        })
    }
}, "es6", "es3");
function Services() {
    this.file = new File(this);
    this.http = new Http(this);
    this.converter = new Converter(this);
    this.billboard = new Billboard(this);
    this.codeMirror = new _CodeMirror(this);
    this.work = new Work(this);
    this.dom = new DOM(this);
    this.json = new _JSON(this);
    this.comment = new _COMMENT(this);
    this.progressBar = new _ProgressBar(this);
    this.storage = new _Storage(this);
    this.grid = new _Grid(this)
}
Services.prototype.HTMLEntities = function (a) {
    a = String(a);
    var b = {
        "<": "&lt;",
        ">": "&gt;"
    };
    Object.keys(b).forEach(function (c) {
        a = a.replace(new RegExp(c, "g"), b[c])
    });
    return a
};
Services.prototype.copyToClipBoard = function (a) {
    var b = document.createElement("textarea");
    b.textContent = a;
    document.body.appendChild(b);
    a = document.getSelection();
    var c = document.createRange();
    c.selectNode(b);
    a.removeAllRanges();
    a.addRange(c);
    document.execCommand("copy");
    a.removeAllRanges();
    document.body.removeChild(b)
};
Services.prototype.getOrGenerateIdentifier = function () {
    var a = services.storage.getItem("identifier");
    if (null === a || void 0 === a)
        a = this.uniqid(), services.storage.setItem("identifier", a);
    return a
};
Services.prototype.reverseDisplay = function (a) {
    if (a = "string" === typeof a ? document.getElementById(a) : a)
        a.style.display = "none" == a.style.display ? "" : "none"
};
Services.prototype.uniqid = function (a) {
    void 0 == a && (a = "");
    a = a + String((new Date).getTime()) + Math.floor(1E6 * Math.random());
    return "undefined" !== typeof md5 ? md5(a) : a
};
Services.prototype.addClass = function (a, b) {
    a.classList ? a.classList.add(b) : hasClass(a, b) || (a.className += " " + b)
};
Services.prototype.removeClass = function (a, b) {
    a.classList ? a.classList.remove(b) : hasClass(a, b) && (a.className = a.className.replace(new RegExp("(\\s|^)" + b + "(\\s|$)"), " "))
};
Services.prototype.openTabber = function (a, b, c) {
    b || (b = "w3-dark-grey");
    var d = c ? document.querySelectorAll(c) : document.getElementsByClassName("tabber");
    for (c = 0; c < d.length; c++)
        d[c].style.display = "none", this.removeClass(document.getElementById("button-" + d[c].id), b);
    document.getElementById(a).style.display = "block";
    this.addClass(document.getElementById("button-" + a), b)
};
function _Grid(a) {
    this.services = a
}
_Grid.prototype.displayResult = function (a, b) {
    for (var c = document.getElementById("results"), d = c.getElementsByTagName("tbody")[0], e = c.getElementsByTagName("thead")[0], f = c.rows.length - 1; 0 <= f; f--)
        c.deleteRow(f);
    exportCSV = "";
    var g = [];
    a.forEach(function (a) {
        Object.keys(a).forEach(function (a) {
            -1 === g.indexOf(a) && g.push(a)
        })
    });
    var h = 0,
        k = e.insertRow(e.rows.length);
    g.forEach(function (a) {
        k.insertCell(h).appendChild(document.createTextNode(a));
        exportCSV += (0 < h ? b : "") + a;
        h++
    });
    exportCSV += "\n";
    var l = 0;
    a.forEach(function (a) {
        l++;
        var c = d.insertRow(d.rows.length);
        1 === l % 2 && (c.className = "sqlite-results-odd");
        h = 0;
        g.forEach(function (d) {
            c.insertCell(h).appendChild(document.createTextNode(null == a[d] ? "" : a[d]));
            exportCSV += (0 < h ? b : "") + (null == a[d] ? "" : a[d]);
            h++
        });
        exportCSV += "\n"
    });
    return exportCSV
};
function _Storage(a) {
    this.services = a;
    this.identifier = null
}
_Storage.prototype.localStorage = function () {
    return "undefined" !== typeof Storage
};
_Storage.prototype.getItem = function (a) {
    return "undefined" !== typeof Storage ? localStorage.getItem(a) : null
};
_Storage.prototype.setItem = function (a, b) {
    "undefined" !== typeof Storage && localStorage.setItem(a, b)
};
function _ProgressBar(a) {
    this.services = a;
    this.id = null
}
_ProgressBar.prototype.stop = function () {
    clearInterval(this.id);
    document.getElementById("myProgress").style.display = "none"
};
_ProgressBar.prototype.start = function (a) {
    function b() {
        100 <= f ? (clearInterval(c.id), d.style.display = "none") : (95 <= f ? (clearInterval(c.id), c.id = setInterval(b, 6E4)) : 90 <= f ? (clearInterval(c.id), c.id = setInterval(b, 3E4)) : 80 <= f ? (clearInterval(c.id), c.id = setInterval(b, 10 * a)) : 70 <= f ? (clearInterval(c.id), c.id = setInterval(b, 8 * a)) : 50 <= f ? (clearInterval(c.id), c.id = setInterval(b, 4 * a)) : 30 <= f && (clearInterval(c.id), c.id = setInterval(b, 2 * a)), f++, e.style.width = f + "%")
    }
    void 0 == a && (a = 50);
    var c = this,
        d = document.getElementById("myProgress"),
        e = document.getElementById("myBar"),
        f = 1;
    this.id = setInterval(b, a);
    d.style.display = "";
    return this.id
};
function _COMMENT(a) {
    this.services = a;
    this.editor = []
}
_COMMENT.prototype.init = function () {
    var a = this,
        b = services.codeMirror.create("editor-container-comments", {
            lineNumbers: !0,
            viewportMargin: Infinity
        });
    b.setSize(null, 180);
    this.editor.push({
        id: null,
        editor: b
    });
    b.on("focus", function (b, d) {
        b = document.getElementById("comment-extra-data");
        "none" == b.style.display && (a.services.http.get(websiteURL + "/captchaHtml", function (a) {
            document.getElementById("captcha").innerHTML = a
        }), b.style.display = "")
    })
};
_COMMENT.prototype.reply = function (a) {
    var b = document.getElementById("comment-reply-" + a);
    b && ("none" == b.style.display ? (b.style.display = "", this.editor.some(function (b) {
        return b.id == a ? !0 : !1
    }) || (this.editor.push({
        id: a,
        editor: services.codeMirror.create("editor-container-comments" + a, {
            lineNumbers: !0,
            viewportMargin: Infinity
        })
    }), services.http.get(websiteURL + "/captchaHtml-" + a, function (b) {
        document.getElementById("captcha" + a).innerHTML = b
    }))) : b.style.display = "none")
};
_COMMENT.prototype.send = function (a, b) {
    var c = document.getElementById("comment-name" + (null == b ? "" : b)),
        d = document.getElementById("comment-email" + (null == b ? "" : b)),
        e = document.getElementById("comment-website" + (null == b ? "" : b)),
        f = document.getElementById("comment-captcha" + (null == b ? "" : b)),
        g;
    if ("" == c.value)
        alert("You must enter a name.");
    else {
        this.editor.some(function (a) {
            return a.id == b ? (g = a.editor, !0) : !1
        });
        var h = this;
        this.services.http.post(websiteURL + "/add-comment", (null == b ? "" : "&parent=" + b) + "&captcha=" + f.value +
            "&uri=" + a + "&name=" + encodeURIComponent(c.value) + "&email=" + encodeURIComponent(d.value) + "&url=" + encodeURIComponent(e.value) + "&comment=" + encodeURIComponent(g.getValue("\n")), function (a) {
            "1" == a.trim() ? (g.setValue(""), null != b && h.reply(), alert("Your comment is awaiting moderation.")) : alert("Bad captcha or an error has occured");
            h.services.http.get(websiteURL + "/captchaHtml" + (null == b ? "" : "-" + b), function (a) {
                document.getElementById("captcha" + (null == b ? "" : b)).innerHTML = a
            })
        })
    }
};
function _JSON(a) {
    this.services = a
}
_JSON.prototype.minify = function (a) {
    try {
        var b = JSON.parse(a);
        return JSON.stringify(b)
    } catch (c) {
        return this._format(a, null)
    }
};
_JSON.prototype.format = function (a) {
    return this._format(a, "")
};
_JSON.prototype._readArray = function (a, b) {
    var c = {
        str: a.str.trim().substring(1)
    };
    for (a.result = "[" + (null == b ? "" : "\n" + b); ; )
        if (this._readElement(c, b), a.result += c.result, c.rest = c.rest.trim(), "," == c.rest.charAt(0))
            a.result += "," + (null == b ? "" : "\n" + b), c.str = c.rest.substring(1);
        else if ("]" == c.rest.charAt(0)) {
            a.result += (null == b ? "" : "\n" + b) + "]";
            a.rest = c.rest.substring(1);
            break
        } else
            c.str = c.rest
};
_JSON.prototype._readObject = function (a, b) {
    var c = {
        str: a.str.trim().substring(1)
    };
    for (a.result = null == b ? "{" : "{\n" + b + "\t"; ; ) {
        this._readAttribute(c, null == b ? null : b + "\t");
        a.result += c.result;
        c.rest = c.rest.trim();
        if (":" == c.rest.charAt(0))
            a.result += ":", c.rest = c.rest.substring(1), c.rest = c.rest.trim(), c.str = c.rest, this._readElement(c, null == b ? null : b + "\t\t"), a.result += c.result, c.rest = c.rest.trim();
        else {
            a.rest = c.rest;
            break
        }
        if ("," == c.rest.charAt(0))
            a.result += null == b ? "," : ",\n" + b + "\t", c.str = c.rest.substring(1);
        else if ("}" ==
            c.rest.charAt(0)) {
            a.result += null == b ? "}" : "\n" + b + "}";
            a.rest = c.rest.substring(1);
            break
        } else
            c.str = c.rest
    }
};
_JSON.prototype._readAttribute = function (a, b) {
    a.str = a.str.trim();
    '"' == a.str.charAt(0) ? this._readString(a, b) : this._readText(a, b, !1)
};
_JSON.prototype._readText = function (a, b, c) {
    a.str = a.str.trim();
    for (b = 0; b < a.str.length; b++) {
        var d = a.str.charAt(b);
        if (-1 !== '"{}[],:\n\r'.indexOf(d))
            break
    }
    c && 0 == b ? (a.result = a.str.substring(0, 1), a.rest = a.str.substring(1)) : (a.result = a.str.substring(0, b), a.rest = a.str.substring(b))
};
_JSON.prototype._readString = function (a) {
    a.str = a.str.substring(1);
    for (var b = a.str.indexOf('"'); -1 !== b && 0 != b && "\\" == a.str.charAt(b - 1); )
        b = a.str.indexOf('"', b + 1);
    -1 !== b ? (a.result = '"' + a.str.substring(0, b + 1), a.rest = a.str.substring(b + 1)) : (a.result = a.str, a.rest = "")
};
_JSON.prototype._readNumeric = function (a) {
    a.str = a.str.trim();
    for (var b = 0; b <= a.str.length - 1 && -1 !== "0123456789".indexOf(a.str.charAt(b)); )
        b++;
    if (b <= a.str.length - 1 && "." == a.str.charAt(b))
        for (b++; b <= a.str.length - 1 && -1 !== "0123456789".indexOf(a.str.charAt(b)); )
            b++;
    a.result = a.str.substring(0, b).trim();
    a.rest = a.str.substring(b)
};
_JSON.prototype._readElement = function (a, b) {
    a.str = a.str.trim();
    "{" == a.str.charAt(0) ? this._readObject(a, b) : "[" == a.str.charAt(0) ? this._readArray(a, b) : "]" == a.str.charAt(0) ? (a.result = "", a.rest = a.str) : '"' == a.str.charAt(0) ? this._readString(a, b) : -1 !== "0123456789".indexOf(a.str.charAt(0)) ? this._readNumeric(a, b) : this._readText(a, b, !0)
};
_JSON.prototype._format = function (a, b) {
    var c = "";
    for (a = {
        str: a.trim()
    }; this._readElement(a, b), c += a.result + (null == b ? "" : "\n"), "" != a.rest; )
        a.str = a.rest;
    return c
};
_JSON.prototype.json2csv = function (a) {
    var b = {
        json2csv: function (a) {
            if (a instanceof Array)
                return b.array2csv(a);
            if (a instanceof Object)
                return [b.object2csv(a)];
            var c = {};
            c[a] = a;
            return [c]
        },
        array2csv: function (a) {
            var c = [];
            a.forEach(function (a) {
                if (a instanceof Array) {
                    var d = {};
                    b.array2csv(a).forEach(function (a, b) {
                        for (var c in a)
                            d[b + "/" + c] = a[c]
                    });
                    c.push(d)
                } else
                    a instanceof Object ? c.push(b.object2csv(a)) : (d = {}, d[a] = a, c.push(d))
            });
            return c
        },
        object2csv: function (a) {
            var c = {},
                e;
            for (e in a) {
                var f = a[e];
                if (f instanceof
                    Array)
                    b.array2csv(f).forEach(function (a, b) {
                        for (var d in a)
                            c[e + "/" + b + "/" + d] = a[d]
                    });
                else if (f instanceof Object) {
                    f = b.object2csv(f);
                    for (var g in f)
                        c[e + "/" + g] = f[g]
                } else
                    c[e] = f
            }
            return c
        }
    };
    return b.json2csv(a)
};
function DOM(a) {
    this.services = a
}
DOM.prototype.selectItemByValue = function (a, b) {
    for (var c = 0; c < a.options.length; c++)
        if (a.options[c].value == b) {
            a.selectedIndex = c;
            break
        }
};
function Work(a) {
    this.services = a
}
Work.prototype.executeUniq = function (a, b, c, d) {
    this.services.billboard.emptyAndHide(["editor-error", "editor-valid"]);
    var e = a.getValue("");
    try {
        var f = b(e)
    } catch (g) {
        d ? this.services.billboard.setAndDisplay("editor-error", d) : (this.services.billboard.setAndDisplay("editor-error", g.message), this.services.codeMirror.setLineInError(a, g));
        return
    }
    f && f.message ? this.services.billboard.setAndDisplay("editor-valid", f.message) : this.services.billboard.setAndDisplay("editor-valid", c)
};
Work.prototype.executeDuo = function (a, b, c, d, e) {
    this.services.billboard.emptyAndHide(["editor-error", "editor-valid"]);
    var f = a.getValue("");
    b.setValue("");
    try {
        var g = c(f);
        b.setValue(g)
    } catch (h) {
        e ? this.services.billboard.setAndDisplay("editor-error", e) : (this.services.billboard.setAndDisplay("editor-error", h.message), this.services.codeMirror.setLineInError(a, h));
        return
    }
    this.services.billboard.setAndDisplay("editor-valid", d)
};
function Billboard(a) {
    this.services = a
}
Billboard.prototype.emptyAndHide = function (a) {
    var b = this;
    if (a instanceof Array)
        a.forEach(function (a) {
            b.emptyAndHide(a)
        });
    else if (a = "string" === typeof a ? document.getElementById(a) : a)
        a.innerText = "", a.style.display = "none"
};
Billboard.prototype.setAndDisplay = function (a, b) {
    (a = "string" === typeof a ? document.getElementById(a) : a) && b && (a.innerText = b, a.style.display = "")
};
function _CodeMirror(a) {
    this.services = a;
    this.errors = []
}
_CodeMirror.prototype.create = function (a, b) {
    var c = CodeMirror.fromTextArea("string" === typeof a ? document.getElementById(a) : a, b),
        d = this;
    c.on("change", function (a) {
        d.resetError(c)
    });
    return c
};
_CodeMirror.prototype.setLineInError = function (a, b) {
    b.message && -1 !== b.message.indexOf("at position ") && (b = b.message.substring(b.message.indexOf("at position ") + 12), b = (a.getValue("\n").substring(0, parseInt(b)).match(/\n/g) || []).length, a.addLineClass(b, "background", "CodeMirror-error"), this.errors.push({
        codeMirror: a,
        line: b
    }))
};
_CodeMirror.prototype.resetError = function (a) {
    var b = [];
    this.errors.forEach(function (c) {
        c.codeMirror === a && (a.removeLineClass(c.line, "background", "CodeMirror-error"), b.push(c))
    });
    var c = this;
    b.forEach(function (a) {
        c.errors.splice(c.errors.indexOf(a), 1)
    })
};
function File(a) {
    this.services = a
}
var ReadModeEnum = {
    TEXT: 1,
    ARRAY_BUFFER: 2,
    DATA_URL: 3
};
File.prototype.dragAndDrop = function (a, b, c, d) {
    a && (a.addEventListener("dragover", function (a) {
        try {
            a.stopPropagation(),
                a.preventDefault(),
                a.dataTransfer.dropEffect = "copy"
        } catch (f) {}
    }), a.addEventListener("drop", function (a) {
        a.stopPropagation();
        a.preventDefault();
        b ? services.file.readSingleFile(a, b, function (a) {
            c(a)
        }, d) : c(a)
    }))
};
File.prototype.readSingleFile = function (a, b, c, d) {
    if (a.target && a.target.files)
        var e = a.target.files;
    else
        a.dataTransfer && a.dataTransfer.files && (e = a.dataTransfer.files);
    if (e && 0 != e.length)
        if (d && d.group) {
            var f = e,
                g = "",
                h = function () {
                    var a = f.shift();
                    if (a) {
                        var d = new FileReader;
                        d.onload = function () {
                            g += d.result;
                            h()
                        };
                        b === ReadModeEnum.ARRAY_BUFFER ? d.readAsArrayBuffer(a) : b === ReadModeEnum.DATA_URL ? d.readAsDataURL(a) : d.readAsText(a)
                    } else
                        c(g)
                };
            h()
        } else
            Array.prototype.forEach.call(e, function (a) {
                var d = new FileReader;
                d.onload = function () {
                    c(d.result, {
                        file: a
                    })
                };
                b === ReadModeEnum.ARRAY_BUFFER ? d.readAsArrayBuffer(a) : b === ReadModeEnum.DATA_URL ? d.readAsDataURL(a) : d.readAsText(a)
            });
    else
        c(null)
};
File.prototype.filename = function (a) {
    var b = "";
    a && (b = 0 <= a.indexOf("\\") ? a.lastIndexOf("\\") : a.lastIndexOf("/"), b = a.substring(b), 0 === b.indexOf("\\") || 0 === b.indexOf("/")) && (b = b.substring(1));
    return b
};
File.prototype.sizeFormat = function (a) {
    var b = -1;
    do
        a /= 1024, b++;
    while (1024 < a);
    return Math.max(a, .1).toFixed(1) + " kB; MB; GB; TB;PB;EB;ZB;YB".split(";")[b]
};
File.prototype.export = function (a) {
    var b = a.blob ? a.blob : new Blob([a.data], {
        type: a.mime
    });
    if (navigator.msSaveBlob)
        navigator.msSaveBlob(b, a.filename);
    else {
        var c = document.createElement("a");
        void 0 !== c.download && (b = URL.createObjectURL(b), c.setAttribute("href", b), c.setAttribute("download", a.filename), c.style.visibility = "hidden", document.body.appendChild(c), c.click(), document.body.removeChild(c))
    }
};
function Http(a) {
    this.services = a
}
Http.prototype.get = function (a, b, c, d) {
    if (d && d.remote)
        return d.remote = !1, this.post(myDomain + "/rest-client-request", JSON.stringify({
            method: "GET",
            url: a,
            headers: [],
            body: ""
        }), function (a, d) {
            var e = JSON.parse(a);
            e.getAllResponseHeaders = function () {
                return e.headers
            };
            200 != e.status ? c(e) : b(e.responseText, e)
        }, function (a) {
            a = JSON.parse(responseText);
            c(a)
        });
    var e = new XMLHttpRequest;
    e.open("GET", a, !0);
    e.onreadystatechange = function () {
        if (4 === this.readyState)
            if (200 !== this.status) {
                if (c)
                    return c(this);
                alert("An error has occured.")
            } else
                b(d &&
                d.responseType && "blob" == d.responseType ? this.response : this.responseText, this)
    };
    d && d.responseType && (e.responseType = d.responseType);
    e.send()
};
Http.prototype.post = function (a, b, c, d, e) {
    if (e && e.remote)
        return e.remote = !1, this.post(myDomain + "/rest-client-request", JSON.stringify({
            method: "POST",
            url: a,
            headers: e.headers ? e.headers : [],
            body: b
        }), function (a, b) {
            var e = JSON.parse(a);
            e.getAllResponseHeaders = function () {
                return e.headers
            };
            e.error && (e.error = e.error);
            200 != e.status ? d(e) : c(e.responseText, e)
        }, function (a) {
            a = JSON.parse(responseText);
            d(a)
        }, e);
    var f = new XMLHttpRequest;
    f.open("POST", a, !0);
    f.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    f.onreadystatechange = function () {
        if (4 === this.readyState)
            if (200 !== this.status) {
                if (d)
                    return d(this);
                alert("An error has occured.")
            } else
                c(this.responseText, this)
    };
    e && e.headers && e.headers.forEach(function (a) {
        f.setRequestHeader(a.name, a.value)
    });
    b ? f.send(b) : f.send()
};
function Converter(a) {
    this.services = a
}
Converter.prototype.atob = function (a) {
    return atob(a)
};
Converter.prototype.btoa = function (a) {
    return btoa(a)
};
Converter.prototype.json2xml = function (a) {
    var b = "",
        c = "",
        d = this,
        e = JSON.parse(a);
    if (0 === Object.keys(e).length)
        return "<root></root>";
    if (1 < Object.keys(e).length || 1 === Object.keys(e).length && Array.isArray(e[Object.keys(e)[0]]))
        c += "\t", b += "<root>\n";
    Object.keys(e).forEach(function (a) {
        b += d.object2xml(e[a], Array.isArray(e) ? "element" : a, c)
    });
    if (1 < Object.keys(e).length || 1 === Object.keys(e).length && Array.isArray(e[Object.keys(e)[0]]))
        b += "\n</root>";
    return b
};
Converter.prototype.object2xml = function (a, b, c) {
    var d = "",
        e = this;
    if (a instanceof Array)
        a.forEach(function (a) {
            Array.isArray(a) ? (d += c + "<" + b + ">\n", d += e.object2xml(a, b, c + "\t"), d += c + "</" + b + ">\n") : d += e.object2xml(a, b, c)
        });
    else if ("object" == typeof a) {
        var f = !1,
            g = !1;
        d += c + "<" + b;
        if (null === a)
            d += "/>\n";
        else if (Object.keys(a).forEach(function (b) {
            "#text" == b ? g = !0 : "@" == b.charAt(0) ? d += " " + b.substr(1) + '="' + a[b].toString().replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;").replace("'", "&apos;").replace('"', "&quot;") +
                '"' : f = !0
        }), d += f ? ">\n" : g ? ">" : "/>\n", f || g)
            e = this, Object.keys(a).forEach(function (b) {
                "#text" == b ? d += a[b].replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;").replace("'", "&apos;").replace('"', "&quot;") : "@" != b.charAt(0) && (d += e.object2xml(a[b], b, c + "\t"))
            }), d += ("\n" == d.charAt(d.length - 1) ? c : "") + "</" + b + ">\n"
    } else
        d += c + "<" + b + ">" + a.toString().replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;").replace("'", "&apos;").replace('"', "&quot;") + "</" + b + ">\n";
    return d
};
Converter.prototype.xml2dom = function (a) {
    a = (new DOMParser).parseFromString(a, "text/xml");
    var b = window.navigator.userAgent;
    if (-1 === b.indexOf("MSIE ") && -1 === b.indexOf("Trident")) {
        b = a;
        var c = (new DOMParser).parseFromString("<", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
        b = "http://www.w3.org/1999/xhtml" === c ? 0 < b.getElementsByTagName("parsererror").length : 0 < b.getElementsByTagNameNS(c, "parsererror").length;
        if (b)
            throw Error("XML: Parse error");
    }
    9 == a.nodeType && (a = a.documentElement);
    return a
};
Converter.prototype.xml2json = function (a) {
    a = (new DOMParser).parseFromString(a, "text/xml");
    var b = window.navigator.userAgent;
    if (-1 === b.indexOf("MSIE ") && -1 === b.indexOf("Trident")) {
        b = a;
        var c = (new DOMParser).parseFromString("<", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
        b = "http://www.w3.org/1999/xhtml" === c ? 0 < b.getElementsByTagName("parsererror").length : 0 < b.getElementsByTagNameNS(c, "parsererror").length;
        if (b)
            throw Error("XML: Parse error");
    }
    9 == a.nodeType && (a = a.documentElement);
    return "{\n" +
        this.object2json(this.xml2Object(a), a.nodeName, "\t") + "\n}"
};
Converter.prototype.xml2Object = function (a) {
    var b = {};
    this.removeWhiteSpace(a);
    switch (a.nodeType) {
        case 1:
            if (a.attributes.length)
                for (var c = 0; c < a.attributes.length; c++)
                    b["@" + a.attributes[c].nodeName] = (a.attributes[c].nodeValue || "").toString();
            if (a.firstChild) {
                var d = 0,
                    e = 0,
                    f = !1;
                Array.prototype.slice.call(a.childNodes).forEach(function (a) {
                    switch (a.nodeType) {
                        case 1:
                            f = !0;
                            break;
                        case 3:
                            a.nodeValue.match(/[^ \f\n\r\t\v]/) && d++;
                            break;
                        case 4:
                            e++
                    }
                });
                if (f)
                    if (2 > d && 2 > e)
                        for (this.removeWhiteSpace(a), c = a.firstChild; c; c =
                            c.nextSibling)
                            3 == c.nodeType ? b["#text"] = this.escape(c.nodeValue) : 4 == c.nodeType ? b["#cdata"] = this.escape(c.nodeValue) : b[c.nodeName] ? b[c.nodeName]instanceof Array ? b[c.nodeName][b[c.nodeName].length] = this.xml2Object(c) : b[c.nodeName] = [b[c.nodeName], this.xml2Object(c)] : b[c.nodeName] = this.xml2Object(c);
                    else
                        a.attributes.length ? b["#text"] = this.escape(this.innerTextNode(a)) : b = this.escape(this.innerTextNode(a));
                else if (d)
                    a.attributes.length ? b["#text"] = this.escape(this.innerTextNode(a)) : b = this.escape(this.innerTextNode(a));
                else if (e)
                    if (1 < e)
                        b = this.escape(this.innerTextNode(a));
                    else
                        for (c = a.firstChild; c; c = c.nextSibling)
                            b["#cdata"] = this.escape(c.nodeValue)
            }
            a.attributes.length || a.firstChild || (b = null);
            break;
        case 7:
        case 8:
        case 10:
            b = null;
            break;
        case 9:
            b = this.xml2Object(a.documentElement);
            break;
        default:
            throw Error("nodeType error");
    }
    return b
};
Converter.prototype.object2json = function (a, b, c) {
    var d = b ? '"' + b + '"' : "";
    if (null == a)
        d += (b && ":") + "null";
    else if (a instanceof Array) {
        for (var e = 0, f = a.length; e < f; e++)
            a[e] = this.object2json(a[e], "", c + "\t");
        d += (b ? ":[" : "[") + (1 < a.length ? "\n" + c + "\t" + a.join(",\n" + c + "\t") + "\n" + c : a.join("")) + "]"
    } else if ("object" == typeof a) {
        e = [];
        for (f in a)
            e[e.length] = this.object2json(a[f], f, c + "\t");
        d += (b ? ":{" : "{") + (1 < e.length ? "\n" + c + "\t" + e.join(",\n" + c + "\t") + "\n" + c : e.join("")) + "}"
    } else
        d = "string" == typeof a ? d + ((b && ":") + '"' + a.toString() +
            '"') : d + ((b && ":") + a.toString());
    return d
};
Converter.prototype.innerTextNode = function (a) {
    var b = "";
    for (a = a.firstChild; a; )
        3 == a.nodeType && (b += a.nodeValue), a = a.nextSibling;
    return b
};
Converter.prototype.escape = function (a) {
    return a.replace(/[\\]/g, "\\\\").replace(/["]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r").replace(/^\s+|\s+$/gm, "")
};
Converter.prototype.removeWhiteSpace = function (a) {
    a.normalize();
    for (var b = a.firstChild; b; )
        switch (b.nodeType) {
            case 1:
                this.removeWhiteSpace(b);
                b = b.nextSibling;
                break;
            case 3:
                if (b.nodeValue.match(/[^ \f\n\r\t\v]/))
                    b = b.nextSibling;
                else {
                    var c = b;
                    b = b.nextSibling;
                    a.removeChild(c)
                }
                break;
            default:
                b = b.nextSibling
        }
    return a
};
services = new Services;
Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function (a, b) {
        if (null == this)
            throw new TypeError('"this" is null or not defined');
        var c = Object(this),
            d = c.length >>> 0;
        if ("function" !== typeof a)
            throw new TypeError("predicate must be a function");
        for (var e = 0; e < d; ) {
            var f = c[e];
            if (a.call(b, f, e, c))
                return f;
            e++
        }
    }
});
Object.prototype.cloneObject || Object.defineProperty(Object.prototype, "cloneObject", {
    value: function (a, b, c) {
        c || (c = null);
        var d = null;
        null === a || void 0 === a || "object" !== typeof a ? d = a : a instanceof Array ? (d = [], a.forEach(function (a) {
            d.push(Object.cloneObject(a, b, c))
        })) : (d = Object.create(Object.getPrototypeOf(a)), Object.keys(a).forEach(function (e) {
            a.hasOwnProperty(e) && !0 === Object.getOwnPropertyDescriptor(a, e).enumerable && (null == b || b(d, a, e, c)) && (d[e] = Object.cloneObject(a[e], b, d))
        }));
        return d
    }
});
!function () {
    function a(a) {
        var b = 0;
        if (a.offsetParent) {
            do
                b += a.offsetTop;
            while (a = a.offsetParent);
            return b
        }
    }
    var b = window.addEventListener || function (a, b) {
            window.attachEvent("on" + a, b)
        },
        c = window.removeEventListener || function (a, b, c) {
            window.detachEvent("on" + a, b)
        },
        d = {
            cache: [],
            mobileScreenSize: 500,
            addObservers: function () {
                b("scroll", d.throttledLoad);
                b("resize", d.throttledLoad)
            },
            removeObservers: function () {
                c("scroll", d.throttledLoad, !1);
                c("resize", d.throttledLoad, !1)
            },
            throttleTimer: (new Date).getTime(),
            throttledLoad: function () {
                var a =
                    (new Date).getTime();
                200 <= a - d.throttleTimer && (d.throttleTimer = a, d.loadVisibleImages())
            },
            loadVisibleImages: function () {
                var b = window.pageYOffset || document.documentElement.scrollTop,
                    c = b - 300;
                b = b + (window.innerHeight || document.documentElement.clientHeight) + 300;
                for (var g = 0; g < d.cache.length; ) {
                    var h = d.cache[g],
                        k = a(h);
                    k >= c - (h.height || 0) && k <= b ? (k = h.getAttribute("data-src-mobile"), h.onload = function () {
                        this.name = "lazy-loaded"
                    }, k && screen.width <= d.mobileScreenSize ? h.src = k : h.src = h.getAttribute("data-src"), h.removeAttribute("data-src"),
                        h.removeAttribute("data-src-mobile"), d.cache.splice(g, 1)) : g++
                }
                0 === d.cache.length && d.removeObservers()
            },
            init: function () {
                document.querySelectorAll || (document.querySelectorAll = function (a) {
                    var b = document,
                        c = b.documentElement.firstChild,
                        d = b.createElement("STYLE");
                    return c.appendChild(d),
                        b.__qsaels = [],
                        d.styleSheet.cssText = a + "{x:expression(document.__qsaels.push(this))}",
                        window.scrollBy(0, 0),
                        b.__qsaels
                });
                b("load", function f() {
                    for (var a = document.querySelectorAll("img[data-src]"), b = 0; b < a.length; b++)
                        d.cache.push(a[b]);
                    d.addObservers();
                    d.loadVisibleImages();
                    c("load", f, !1)
                })
            }
        };
    d.init()
}
();
