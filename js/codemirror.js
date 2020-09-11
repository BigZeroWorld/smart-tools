var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (z, I, E) {
    z instanceof String && (z = String(z));
    for (var u = z.length, V = 0; V < u; V++) {
        var ka = z[V];
        if (I.call(E, ka, V, z))
            return {
                i: V,
                v: ka
            }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (z, I, E) {
    z != Array.prototype && z != Object.prototype && (z[I] = E.value)
};
$jscomp.getGlobal = function (z) {
    return "undefined" != typeof window && window === z ? z : "undefined" != typeof global && null != global ? global : z
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (z, I, E, u) {
    if (I) {
        E = $jscomp.global;
        z = z.split(".");
        for (u = 0; u < z.length - 1; u++) {
            var V = z[u];
            V in E || (E[V] = {});
            E = E[V]
        }
        z = z[z.length - 1];
        u = E[z];
        I = I(u);
        I != u && null != I && $jscomp.defineProperty(E, z, {
            configurable: !0,
            writable: !0,
            value: I
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function (z) {
    return z ? z : function (z, E) {
        return $jscomp.findInternal(this, z, E).v
    }
}, "es6", "es3");
(function (z, I) {
    "object" === typeof exports && "undefined" !== typeof module ? module.exports = I() : "function" === typeof define && define.amd ? define(I) : z.CodeMirror = I()
})(this, function () {
    function z(a) {
        return new RegExp("(^|\\s)" + a + "(?:$|\\s)\\s*")
    }
    function I(a) {
        for (var b = a.childNodes.length; 0 < b; --b)
            a.removeChild(a.firstChild);
        return a
    }
    function E(a, b) {
        return I(a).appendChild(b)
    }
    function u(a, b, c, d) {
        a = document.createElement(a);
        c && (a.className = c);
        d && (a.style.cssText = d);
        if ("string" == typeof b)
            a.appendChild(document.createTextNode(b));
        else if (b)
            for (c = 0; c < b.length; ++c)
                a.appendChild(b[c]);
        return a
    }
    function V(a, b, c, d) {
        a = u(a, b, c, d);
        a.setAttribute("role", "presentation");
        return a
    }
    function ka(a, b) {
        3 == b.nodeType && (b = b.parentNode);
        if (a.contains)
            return a.contains(b);
        do
            if (11 == b.nodeType && (b = b.host), b == a)
                return !0;
        while (b = b.parentNode)
    }
    function wa() {
        try {
            var a = document.activeElement
        } catch (b) {
            a = document.body || null
        }
        for (; a && a.shadowRoot && a.shadowRoot.activeElement; )
            a = a.shadowRoot.activeElement;
        return a
    }
    function Ha(a, b) {
        var c = a.className;
        z(b).test(c) ||
        (a.className += (c ? " " : "") + b)
    }
    function Nc(a, b) {
        a = a.split(" ");
        for (var c = 0; c < a.length; c++)
            a[c] && !z(a[c]).test(b) && (b += " " + a[c]);
        return b
    }
    function Oc(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return function () {
            return a.apply(null, b)
        }
    }
    function Ia(a, b, c) {
        b || (b = {});
        for (var d in a)
            !a.hasOwnProperty(d) || !1 === c && b.hasOwnProperty(d) || (b[d] = a[d]);
        return b
    }
    function ia(a, b, c, d, e) {
        null == b && (b = a.search(/[^\s\u00a0]/), -1 == b && (b = a.length));
        d = d || 0;
        for (e = e || 0; ; ) {
            var f = a.indexOf("\t", d);
            if (0 > f || f >= b)
                return e + (b -
                    d);
            e += f - d;
            e += c - e % c;
            d = f + 1
        }
    }
    function Q(a, b) {
        for (var c = 0; c < a.length; ++c)
            if (a[c] == b)
                return c;
        return -1
    }
    function Pc(a, b, c) {
        for (var d = 0, e = 0; ; ) {
            var f = a.indexOf("\t", d);
            -1 == f && (f = a.length);
            var g = f - d;
            if (f == a.length || e + g >= b)
                return d + Math.min(g, b - e);
            e += f - d;
            e += c - e % c;
            d = f + 1;
            if (e >= b)
                return d
        }
    }
    function Qc(a) {
        for (; gc.length <= a; )
            gc.push(y(gc) + " ");
        return gc[a]
    }
    function y(a) {
        return a[a.length - 1]
    }
    function hc(a, b) {
        for (var c = [], d = 0; d < a.length; d++)
            c[d] = b(a[d], d);
        return c
    }
    function hg(a, b, c) {
        for (var d = 0, e = c(b); d < a.length &&
        c(a[d]) <= e; )
            d++;
        a.splice(d, 0, b)
    }
    function Wd() {}
    function Xd(a, b) {
        Object.create ? a = Object.create(a) : (Wd.prototype = a, a = new Wd);
        b && Ia(b, a);
        return a
    }
    function Rc(a) {
        return /\w/.test(a) || "\u0080" < a && (a.toUpperCase() != a.toLowerCase() || ig.test(a))
    }
    function ic(a, b) {
        return b ? -1 < b.source.indexOf("\\w") && Rc(a) ? !0 : b.test(a) : Rc(a)
    }
    function Yd(a) {
        for (var b in a)
            if (a.hasOwnProperty(b) && a[b])
                return !1;
        return !0
    }
    function Sc(a) {
        return 768 <= a.charCodeAt(0) && jg.test(a)
    }
    function Zd(a, b, c) {
        for (; (0 > c ? 0 < b : b < a.length) && Sc(a.charAt(b)); )
            b +=
                c;
        return b
    }
    function rb(a, b, c) {
        for (var d = b > c ? -1 : 1; ; ) {
            if (b == c)
                return b;
            var e = (b + c) / 2;
            e = 0 > d ? Math.ceil(e) : Math.floor(e);
            if (e == b)
                return a(e) ? b : c;
            a(e) ? c = e : b = e + d
        }
    }
    function kg(a, b, c) {
        this.input = c;
        this.scrollbarFiller = u("div", null, "CodeMirror-scrollbar-filler");
        this.scrollbarFiller.setAttribute("cm-not-content", "true");
        this.gutterFiller = u("div", null, "CodeMirror-gutter-filler");
        this.gutterFiller.setAttribute("cm-not-content", "true");
        this.lineDiv = V("div", null, "CodeMirror-code");
        this.selectionDiv = u("div", null,
            null, "position: relative; z-index: 1");
        this.cursorDiv = u("div", null, "CodeMirror-cursors");
        this.measure = u("div", null, "CodeMirror-measure");
        this.lineMeasure = u("div", null, "CodeMirror-measure");
        this.lineSpace = V("div", [this.measure, this.lineMeasure, this.selectionDiv, this.cursorDiv, this.lineDiv], null, "position: relative; outline: none");
        var d = V("div", [this.lineSpace], "CodeMirror-lines");
        this.mover = u("div", [d], null, "position: relative");
        this.sizer = u("div", [this.mover], "CodeMirror-sizer");
        this.sizerWidth =
            null;
        this.heightForcer = u("div", null, null, "position: absolute; height: 30px; width: 1px;");
        this.gutters = u("div", null, "CodeMirror-gutters");
        this.lineGutter = null;
        this.scroller = u("div", [this.sizer, this.heightForcer, this.gutters], "CodeMirror-scroll");
        this.scroller.setAttribute("tabIndex", "-1");
        this.wrapper = u("div", [this.scrollbarFiller, this.gutterFiller, this.scroller], "CodeMirror");
        B && 8 > F && (this.gutters.style.zIndex = -1, this.scroller.style.paddingRight = 0);
        U || Aa && sb || (this.scroller.draggable = !0);
        a && (a.appendChild ?
            a.appendChild(this.wrapper) : a(this.wrapper));
        this.reportedViewFrom = this.reportedViewTo = this.viewFrom = this.viewTo = b.first;
        this.view = [];
        this.externalMeasured = this.renderedView = null;
        this.lastWrapHeight = this.lastWrapWidth = this.viewOffset = 0;
        this.updateLineNumbers = null;
        this.nativeBarWidth = this.barHeight = this.barWidth = 0;
        this.scrollbarsClipped = !1;
        this.lineNumWidth = this.lineNumInnerWidth = this.lineNumChars = null;
        this.alignWidgets = !1;
        this.maxLine = this.cachedCharWidth = this.cachedTextHeight = this.cachedPaddingH =
            null;
        this.maxLineLength = 0;
        this.maxLineChanged = !1;
        this.wheelDX = this.wheelDY = this.wheelStartX = this.wheelStartY = null;
        this.shift = !1;
        this.activeTouch = this.selForContextMenu = null;
        c.init(this)
    }
    function t(a, b) {
        b -= a.first;
        if (0 > b || b >= a.size)
            throw Error("There is no line " + (b + a.first) + " in the document.");
        for (; !a.lines; )
            for (var c = 0; ; ++c) {
                var d = a.children[c],
                    e = d.chunkSize();
                if (b < e) {
                    a = d;
                    break
                }
                b -= e
            }
        return a.lines[b]
    }
    function Ja(a, b, c) {
        var d = [],
            e = b.line;
        a.iter(b.line, c.line + 1, function (a) {
            a = a.text;
            e == c.line && (a =
                a.slice(0, c.ch));
            e == b.line && (a = a.slice(b.ch));
            d.push(a);
            ++e
        });
        return d
    }
    function Tc(a, b, c) {
        var d = [];
        a.iter(b, c, function (a) {
            d.push(a.text)
        });
        return d
    }
    function qa(a, b) {
        if (b -= a.height)
            for (; a; a = a.parent)
                a.height += b
    }
    function C(a) {
        if (null == a.parent)
            return null;
        var b = a.parent;
        a = Q(b.lines, a);
        for (var c = b.parent; c; b = c, c = c.parent)
            for (var d = 0; c.children[d] != b; ++d)
                a += c.children[d].chunkSize();
        return a + b.first
    }
    function Ka(a, b) {
        var c = a.first;
        a: do {
            for (var d = 0; d < a.children.length; ++d) {
                var e = a.children[d],
                    f = e.height;
                if (b < f) {
                    a = e;
                    continue a
                }
                b -= f;
                c += e.chunkSize()
            }
            return c
        } while (!a.lines);
        for (d = 0; d < a.lines.length; ++d) {
            e = a.lines[d].height;
            if (b < e)
                break;
            b -= e
        }
        return c + d
    }
    function tb(a, b) {
        return b >= a.first && b < a.first + a.size
    }
    function Uc(a, b) {
        return String(a.lineNumberFormatter(b + a.firstLineNumber))
    }
    function q(a, b, c) {
        void 0 === c && (c = null);
        if (!(this instanceof q))
            return new q(a, b, c);
        this.line = a;
        this.ch = b;
        this.sticky = c
    }
    function x(a, b) {
        return a.line - b.line || a.ch - b.ch
    }
    function Vc(a, b) {
        return a.sticky == b.sticky && 0 == x(a, b)
    }
    function Wc(a) {
        return q(a.line,
            a.ch)
    }
    function jc(a, b) {
        return 0 > x(a, b) ? b : a
    }
    function kc(a, b) {
        return 0 > x(a, b) ? a : b
    }
    function v(a, b) {
        if (b.line < a.first)
            return q(a.first, 0);
        var c = a.first + a.size - 1;
        if (b.line > c)
            return q(c, t(a, c).text.length);
        a = t(a, b.line).text.length;
        c = b.ch;
        b = null == c || c > a ? q(b.line, a) : 0 > c ? q(b.line, 0) : b;
        return b
    }
    function $d(a, b) {
        for (var c = [], d = 0; d < b.length; d++)
            c[d] = v(a, b[d]);
        return c
    }
    function lc(a, b, c) {
        this.marker = a;
        this.from = b;
        this.to = c
    }
    function ub(a, b) {
        if (a)
            for (var c = 0; c < a.length; ++c) {
                var d = a[c];
                if (d.marker == b)
                    return d
            }
    }
    function Xc(a, b) {
        if (b.full)
            return null;
        var c = tb(a, b.from.line) && t(a, b.from.line).markedSpans,
            d = tb(a, b.to.line) && t(a, b.to.line).markedSpans;
        if (!c && !d)
            return null;
        a = b.from.ch;
        var e = b.to.ch,
            f = 0 == x(b.from, b.to),
            g;
        if (c)
            for (var h = 0; h < c.length; ++h) {
                var k = c[h],
                    l = k.marker;
                if (null == k.from || (l.inclusiveLeft ? k.from <= a : k.from < a) || !(k.from != a || "bookmark" != l.type || f && k.marker.insertLeft)) {
                    var m = null == k.to || (l.inclusiveRight ? k.to >= a : k.to > a);
                    (g || (g = [])).push(new lc(l, k.from, m ? null : k.to))
                }
            }
        c = g;
        var p;
        if (d)
            for (g = 0; g <
            d.length; ++g)
                if (h = d[g], k = h.marker, null == h.to || (k.inclusiveRight ? h.to >= e : h.to > e) || h.from == e && "bookmark" == k.type && (!f || h.marker.insertLeft))
                    l = null == h.from || (k.inclusiveLeft ? h.from <= e : h.from < e), (p || (p = [])).push(new lc(k, l ? null : h.from - e, null == h.to ? null : h.to - e));
        d = 1 == b.text.length;
        e = y(b.text).length + (d ? a : 0);
        if (c)
            for (f = 0; f < c.length; ++f)
                if (g = c[f], null == g.to)
                    (h = ub(p, g.marker), h) ? d && (g.to = null == h.to ? null : h.to + e) : g.to = a;
        if (p)
            for (a = 0; a < p.length; ++a)
                f = p[a], null != f.to && (f.to += e), null == f.from ? ub(c, f.marker) || (f.from =
                    e, d && (c || (c = [])).push(f)) : (f.from += e, d && (c || (c = [])).push(f));
        c && (c = ae(c));
        p && p != c && (p = ae(p));
        a = [c];
        if (!d) {
            b = b.text.length - 2;
            var n;
            if (0 < b && c)
                for (d = 0; d < c.length; ++d)
                    null == c[d].to && (n || (n = [])).push(new lc(c[d].marker, null, null));
            for (c = 0; c < b; ++c)
                a.push(n);
            a.push(p)
        }
        return a
    }
    function ae(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            null != c.from && c.from == c.to && !1 !== c.marker.clearWhenEmpty && a.splice(b--, 1)
        }
        return a.length ? a : null
    }
    function lg(a, b, c) {
        var d = null;
        a.iter(b.line, c.line + 1, function (a) {
            if (a.markedSpans)
                for (var b =
                    0; b < a.markedSpans.length; ++b) {
                    var c = a.markedSpans[b].marker;
                    !c.readOnly || d && -1 != Q(d, c) || (d || (d = [])).push(c)
                }
        });
        if (!d)
            return null;
        a = [{
            from: b,
            to: c
        }
        ];
        for (b = 0; b < d.length; ++b) {
            c = d[b];
            for (var e = c.find(0), f = 0; f < a.length; ++f) {
                var g = a[f];
                if (!(0 > x(g.to, e.from) || 0 < x(g.from, e.to))) {
                    var h = [f, 1],
                        k = x(g.from, e.from),
                        l = x(g.to, e.to);
                    (0 > k || !c.inclusiveLeft && !k) && h.push({
                        from: g.from,
                        to: e.from
                    });
                    (0 < l || !c.inclusiveRight && !l) && h.push({
                        from: e.to,
                        to: g.to
                    });
                    a.splice.apply(a, h);
                    f += h.length - 3
                }
            }
        }
        return a
    }
    function be(a) {
        var b =
            a.markedSpans;
        if (b) {
            for (var c = 0; c < b.length; ++c)
                b[c].marker.detachLine(a);
            a.markedSpans = null
        }
    }
    function ce(a, b) {
        if (b) {
            for (var c = 0; c < b.length; ++c)
                b[c].marker.attachLine(a);
            a.markedSpans = b
        }
    }
    function de(a, b) {
        var c = a.lines.length - b.lines.length;
        if (0 != c)
            return c;
        c = a.find();
        var d = b.find(),
            e = x(c.from, d.from) || (a.inclusiveLeft ? -1 : 0) - (b.inclusiveLeft ? -1 : 0);
        return e ? -e : (c = x(c.to, d.to) || (a.inclusiveRight ? 1 : 0) - (b.inclusiveRight ? 1 : 0)) ? c : b.id - a.id
    }
    function La(a, b) {
        a = Ba && a.markedSpans;
        if (a)
            for (var c, d = 0; d < a.length; ++d)
                if (c =
                    a[d], c.marker.collapsed && null == (b ? c.from : c.to) && (!e || 0 > de(e, c.marker)))
                    var e = c.marker;
        return e
    }
    function ee(a, b, c, d, e) {
        a = t(a, b);
        if (a = Ba && a.markedSpans)
            for (b = 0; b < a.length; ++b) {
                var f = a[b];
                if (f.marker.collapsed) {
                    var g = f.marker.find(0),
                        h = x(g.from, c) || (f.marker.inclusiveLeft ? -1 : 0) - (e.inclusiveLeft ? -1 : 0),
                        k = x(g.to, d) || (f.marker.inclusiveRight ? 1 : 0) - (e.inclusiveRight ? 1 : 0);
                    if (!(0 <= h && 0 >= k || 0 >= h && 0 <= k) && (0 >= h && (f.marker.inclusiveRight && e.inclusiveLeft ? 0 <= x(g.to, c) : 0 < x(g.to, c)) || 0 <= h && (f.marker.inclusiveRight &&
                    e.inclusiveLeft ? 0 >= x(g.from, d) : 0 > x(g.from, d))))
                        return !0
                }
            }
    }
    function ra(a) {
        for (var b; b = La(a, !0); )
            a = b.find(-1, !0).line;
        return a
    }
    function Yc(a, b) {
        a = t(a, b);
        var c = ra(a);
        return a == c ? b : C(c)
    }
    function fe(a, b) {
        if (b > a.lastLine())
            return b;
        var c = t(a, b);
        if (!Ma(a, c))
            return b;
        for (; a = La(c, !1); )
            c = a.find(1, !0).line;
        return C(c) + 1
    }
    function Ma(a, b) {
        var c = Ba && b.markedSpans;
        if (c)
            for (var d, e = 0; e < c.length; ++e)
                if (d = c[e], d.marker.collapsed && (null == d.from || !d.marker.widgetNode && 0 == d.from && d.marker.inclusiveLeft && Zc(a, b, d)))
                    return !0
    }
    function Zc(a, b, c) {
        if (null == c.to)
            return b = c.marker.find(1, !0), Zc(a, b.line, ub(b.line.markedSpans, c.marker));
        if (c.marker.inclusiveRight && c.to == b.text.length)
            return !0;
        for (var d, e = 0; e < b.markedSpans.length; ++e)
            if (d = b.markedSpans[e], d.marker.collapsed && !d.marker.widgetNode && d.from == c.to && (null == d.to || d.to != c.from) && (d.marker.inclusiveLeft || c.marker.inclusiveRight) && Zc(a, b, d))
                return !0
    }
    function sa(a) {
        a = ra(a);
        for (var b = 0, c = a.parent, d = 0; d < c.lines.length; ++d) {
            var e = c.lines[d];
            if (e == a)
                break;
            else
                b += e.height
        }
        for (a =
                 c.parent; a; c = a, a = c.parent)
            for (d = 0; d < a.children.length && (e = a.children[d], e != c); ++d)
                b += e.height;
        return b
    }
    function mc(a) {
        if (0 == a.height)
            return 0;
        for (var b = a.text.length, c, d = a; c = La(d, !0); )
            c = c.find(0, !0), d = c.from.line, b += c.from.ch - c.to.ch;
        for (d = a; c = La(d, !1); )
            a = c.find(0, !0), b -= d.text.length - a.from.ch, d = a.to.line, b += d.text.length - a.to.ch;
        return b
    }
    function $c(a) {
        var b = a.display;
        a = a.doc;
        b.maxLine = t(a, a.first);
        b.maxLineLength = mc(b.maxLine);
        b.maxLineChanged = !0;
        a.iter(function (a) {
            var d = mc(a);
            d > b.maxLineLength &&
            (b.maxLineLength = d, b.maxLine = a)
        })
    }
    function mg(a, b, c, d) {
        if (!a)
            return d(b, c, "ltr", 0);
        for (var e = !1, f = 0; f < a.length; ++f) {
            var g = a[f];
            if (g.from < c && g.to > b || b == c && g.to == b)
                d(Math.max(g.from, b), Math.min(g.to, c), 1 == g.level ? "rtl" : "ltr", f), e = !0
        }
        e || d(b, c, "ltr")
    }
    function vb(a, b, c) {
        var d;
        wb = null;
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (f.from < b && f.to > b)
                return e;
            f.to == b && (f.from != f.to && "before" == c ? d = e : wb = e);
            f.from == b && (f.from != f.to && "before" != c ? d = e : wb = e)
        }
        return null != d ? d : wb
    }
    function xa(a, b) {
        var c = a.order;
        null == c &&
        (c = a.order = ng(a.text, b));
        return c
    }
    function ea(a, b, c) {
        if (a.removeEventListener)
            a.removeEventListener(b, c, !1);
        else if (a.detachEvent)
            a.detachEvent("on" + b, c);
        else {
            var d = (a = a._handlers) && a[b];
            d && (c = Q(d, c), -1 < c && (a[b] = d.slice(0, c).concat(d.slice(c + 1))))
        }
    }
    function J(a, b) {
        var c = a._handlers && a._handlers[b] || nc;
        if (c.length)
            for (var d = Array.prototype.slice.call(arguments, 2), e = 0; e < c.length; ++e)
                c[e].apply(null, d)
    }
    function N(a, b, c) {
        "string" == typeof b && (b = {
            type: b,
            preventDefault: function () {
                this.defaultPrevented = !0
            }
        });
        J(a, c || b.type, a, b);
        return ad(b) || b.codemirrorIgnore
    }
    function ge(a) {
        var b = a._handlers && a._handlers.cursorActivity;
        if (b) {
            a = a.curOp.cursorActivityHandlers || (a.curOp.cursorActivityHandlers = []);
            for (var c = 0; c < b.length; ++c)
                - 1 == Q(a, b[c]) && a.push(b[c])
        }
    }
    function ja(a, b) {
        return 0 < (a._handlers && a._handlers[b] || nc).length
    }
    function bb(a) {
        a.prototype.on = function (a, c) {
            w(this, a, c)
        };
        a.prototype.off = function (a, c) {
            ea(this, a, c)
        }
    }
    function Y(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    function he(a) {
        a.stopPropagation ?
            a.stopPropagation() : a.cancelBubble = !0
    }
    function ad(a) {
        return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue
    }
    function xb(a) {
        Y(a);
        he(a)
    }
    function ie(a) {
        var b = a.which;
        null == b && (a.button & 1 ? b = 1 : a.button & 2 ? b = 3 : a.button & 4 && (b = 2));
        la && a.ctrlKey && 1 == b && (b = 3);
        return b
    }
    function og(a) {
        if (null == bd) {
            var b = u("span", "\u200b");
            E(a, u("span", [b, document.createTextNode("x")]));
            0 != a.firstChild.offsetHeight && (bd = 1 >= b.offsetWidth && 2 < b.offsetHeight && !(B && 8 > F))
        }
        a = bd ? u("span", "\u200b") : u("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
        a.setAttribute("cm-text", "");
        return a
    }
    function pg(a, b) {
        2 < arguments.length && (b.dependencies = Array.prototype.slice.call(arguments, 2));
        cd[a] = b
    }
    function oc(a) {
        if ("string" == typeof a && cb.hasOwnProperty(a))
            a = cb[a];
        else if (a && "string" == typeof a.name && cb.hasOwnProperty(a.name)) {
            var b = cb[a.name];
            "string" == typeof b && (b = {
                name: b
            });
            a = Xd(b, a);
            a.name = b.name
        } else {
            if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a))
                return oc("application/xml");
            if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+json$/.test(a))
                return oc("application/json")
        }
        return "string" ==
        typeof a ? {
                name: a
            }
            : a || {
            name: "null"
        }
    }
    function dd(a, b) {
        b = oc(b);
        var c = cd[b.name];
        if (!c)
            return dd(a, "text/plain");
        a = c(a, b);
        if (db.hasOwnProperty(b.name)) {
            c = db[b.name];
            for (var d in c)
                c.hasOwnProperty(d) && (a.hasOwnProperty(d) && (a["_" + d] = a[d]), a[d] = c[d])
        }
        a.name = b.name;
        b.helperType && (a.helperType = b.helperType);
        if (b.modeProps)
            for (var e in b.modeProps)
                a[e] = b.modeProps[e];
        return a
    }
    function qg(a, b) {
        a = db.hasOwnProperty(a) ? db[a] : db[a] = {};
        Ia(b, a)
    }
    function Na(a, b) {
        if (!0 === b)
            return b;
        if (a.copyState)
            return a.copyState(b);
        a = {};
        for (var c in b) {
            var d = b[c];
            d instanceof Array && (d = d.concat([]));
            a[c] = d
        }
        return a
    }
    function ed(a, b) {
        for (var c; a.innerMode; ) {
            c = a.innerMode(b);
            if (!c || c.mode == a)
                break;
            b = c.state;
            a = c.mode
        }
        return c || {
            mode: a,
            state: b
        }
    }
    function je(a, b, c) {
        return a.startState ? a.startState(b, c) : !0
    }
    function ke(a, b, c, d) {
        var e = [a.state.modeGen],
            f = {};
        le(a, b.text, a.doc.mode, c, function (a, b) {
            return e.push(a, b)
        }, f, d);
        var g = c.state;
        d = function (d) {
            c.baseTokens = e;
            var h = a.state.overlays[d],
                k = 1,
                p = 0;
            c.state = !0;
            le(a, b.text, h.mode, c, function (a,
                                               b) {
                for (var d = k; p < a; ) {
                    var c = e[k];
                    c > a && e.splice(k, 1, a, e[k + 1], c);
                    k += 2;
                    p = Math.min(a, c)
                }
                if (b)
                    if (h.opaque)
                        e.splice(d, k - d, a, "overlay " + b), k = d + 2;
                    else
                        for (; d < k; d += 2)
                            a = e[d + 1], e[d + 1] = (a ? a + " " : "") + "overlay " + b
            }, f);
            c.state = g;
            c.baseTokens = null;
            c.baseTokenPos = 1
        };
        for (var h = 0; h < a.state.overlays.length; ++h)
            d(h);
        return {
            styles: e,
            classes: f.bgClass || f.textClass ? f : null
        }
    }
    function me(a, b, c) {
        if (!b.styles || b.styles[0] != a.state.modeGen) {
            var d = yb(a, C(b)),
                e = b.text.length > a.options.maxHighlightLength && Na(a.doc.mode, d.state),
                f =
                    ke(a, b, d);
            e && (d.state = e);
            b.stateAfter = d.save(!e);
            b.styles = f.styles;
            f.classes ? b.styleClasses = f.classes : b.styleClasses && (b.styleClasses = null);
            c === a.doc.highlightFrontier && (a.doc.modeFrontier = Math.max(a.doc.modeFrontier, ++a.doc.highlightFrontier))
        }
        return b.styles
    }
    function yb(a, b, c) {
        var d = a.doc,
            e = a.display;
        if (!d.mode.startState)
            return new ta(d, !0, b);
        var f = rg(a, b, c),
            g = f > d.first && t(d, f - 1).stateAfter,
            h = g ? ta.fromSaved(d, g, f) : new ta(d, je(d.mode), f);
        d.iter(f, b, function (d) {
            fd(a, d.text, h);
            var c = h.line;
            d.stateAfter =
                c == b - 1 || 0 == c % 5 || c >= e.viewFrom && c < e.viewTo ? h.save() : null;
            h.nextLine()
        });
        c && (d.modeFrontier = h.line);
        return h
    }
    function fd(a, b, c, d) {
        var e = a.doc.mode;
        a = new K(b, a.options.tabSize, c);
        a.start = a.pos = d || 0;
        for ("" == b && ne(e, c.state); !a.eol(); )
            gd(e, a, c.state), a.start = a.pos
    }
    function ne(a, b) {
        if (a.blankLine)
            return a.blankLine(b);
        if (a.innerMode && (a = ed(a, b), a.mode.blankLine))
            return a.mode.blankLine(a.state)
    }
    function gd(a, b, c, d) {
        for (var e = 0; 10 > e; e++) {
            d && (d[0] = ed(a, c).mode);
            var f = a.token(b, c);
            if (b.pos > b.start)
                return f
        }
        throw Error("Mode " +
            a.name + " failed to advance stream.");
    }
    function oe(a, b, c, d) {
        var e = a.doc,
            f = e.mode;
        b = v(e, b);
        var g = t(e, b.line);
        c = yb(a, b.line, c);
        a = new K(g.text, a.options.tabSize, c);
        var h;
        for (d && (h = []); (d || a.pos < b.ch) && !a.eol(); ) {
            a.start = a.pos;
            var k = gd(f, a, c.state);
            d && h.push(new pe(a, k, Na(e.mode, c.state)))
        }
        return d ? h : new pe(a, k, c.state)
    }
    function qe(a, b) {
        if (a)
            for (; ; ) {
                var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!c)
                    break;
                a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
                var d = c[1] ? "bgClass" : "textClass";
                null == b[d] ?
                    b[d] = c[2] : (new RegExp("(?:^|s)" + c[2] + "(?:$|s)")).test(b[d]) || (b[d] += " " + c[2])
            }
        return a
    }
    function le(a, b, c, d, e, f, g) {
        var h = c.flattenSpans;
        null == h && (h = a.options.flattenSpans);
        var k = 0,
            l = null,
            m = new K(b, a.options.tabSize, d),
            p = a.options.addModeClass && [null];
        for ("" == b && qe(ne(c, d.state), f); !m.eol(); ) {
            if (m.pos > a.options.maxHighlightLength) {
                h = !1;
                g && fd(a, b, d, m.pos);
                m.pos = b.length;
                var n = null
            } else
                n = qe(gd(c, m, d.state, p), f);
            if (p) {
                var r = p[0].name;
                r && (n = "m-" + (n ? r + " " + n : r))
            }
            if (!h || l != n) {
                for (; k < m.start; )
                    k = Math.min(m.start,
                        k + 5E3), e(k, l);
                l = n
            }
            m.start = m.pos
        }
        for (; k < m.pos; )
            a = Math.min(m.pos, k + 5E3), e(a, l), k = a
    }
    function rg(a, b, c) {
        for (var d, e, f = a.doc, g = c ? -1 : b - (a.doc.mode.innerMode ? 1E3 : 100); b > g; --b) {
            if (b <= f.first)
                return f.first;
            var h = t(f, b - 1),
                k = h.stateAfter;
            if (k && (!c || b + (k instanceof pc ? k.lookAhead : 0) <= f.modeFrontier))
                return b;
            h = ia(h.text, null, a.options.tabSize);
            if (null == e || d > h)
                e = b - 1, d = h
        }
        return e
    }
    function sg(a, b) {
        a.modeFrontier = Math.min(a.modeFrontier, b);
        if (!(a.highlightFrontier < b - 10)) {
            for (var c = a.first, d = b - 1; d > c; d--) {
                var e = t(a,
                    d).stateAfter;
                if (e && (!(e instanceof pc) || d + e.lookAhead < b)) {
                    c = d + 1;
                    break
                }
            }
            a.highlightFrontier = Math.min(a.highlightFrontier, c)
        }
    }
    function re(a, b) {
        if (!a || /^\s*$/.test(a))
            return null;
        b = b.addModeClass ? tg : ug;
        return b[a] || (b[a] = a.replace(/\S+/g, "cm-$&"))
    }
    function se(a, b) {
        var c = V("span", null, null, U ? "padding-right: .1px" : null);
        c = {
            pre: V("pre", [c], "CodeMirror-line"),
            content: c,
            col: 0,
            pos: 0,
            cm: a,
            trailingSpace: !1,
            splitSpaces: (B || U) && a.getOption("lineWrapping")
        };
        b.measure = {};
        for (var d = 0; d <= (b.rest ? b.rest.length : 0); d++) {
            var e =
                    d ? b.rest[d - 1] : b.line,
                f = void 0;
            c.pos = 0;
            c.addToken = vg;
            var g = a.display.measure;
            if (null != hd)
                g = hd;
            else {
                var h = E(g, document.createTextNode("A\u062eA")),
                    k = zb(h, 0, 1).getBoundingClientRect();
                h = zb(h, 1, 2).getBoundingClientRect();
                I(g);
                g = k && k.left != k.right ? hd = 3 > h.right - k.right : !1
            }
            g && (f = xa(e, a.doc.direction)) && (c.addToken = wg(c.addToken, f));
            c.map = [];
            var l = b != a.display.externalMeasured && C(e);
            a: {
                var m = h = k = g = void 0,
                    p = void 0,
                    n = void 0,
                    r = void 0;
                f = c;
                l = me(a, e, l);
                var L = e.markedSpans,
                    q = e.text,
                    u = 0;
                if (L)
                    for (var t = q.length, H =
                        0, w = 1, x = "", v = 0; ; ) {
                        if (v == H) {
                            p = m = h = k = n = "";
                            g = null;
                            v = Infinity;
                            for (var z = [], ba = void 0, A = 0; A < L.length; ++A) {
                                var R = L[A],
                                    y = R.marker;
                                "bookmark" == y.type && R.from == H && y.widgetNode ? z.push(y) : R.from <= H && (null == R.to || R.to > H || y.collapsed && R.to == H && R.from == H) ? (null != R.to && R.to != H && v > R.to && (v = R.to, m = ""), y.className && (p += " " + y.className), y.css && (n = (n ? n + ";" : "") + y.css), y.startStyle && R.from == H && (h += " " + y.startStyle), y.endStyle && R.to == v && (ba || (ba = [])).push(y.endStyle, R.to), y.title && !k && (k = y.title), y.collapsed && (!g || 0 > de(g.marker,
                                    y)) && (g = R)) : R.from > H && v > R.from && (v = R.from)
                            }
                            if (ba)
                                for (A = 0; A < ba.length; A += 2)
                                    ba[A + 1] == v && (m += " " + ba[A]);
                            if (!g || g.from == H)
                                for (ba = 0; ba < z.length; ++ba)
                                    te(f, 0, z[ba]);
                            if (g && (g.from || 0) == H) {
                                te(f, (null == g.to ? t + 1 : g.to) - H, g.marker, null == g.from);
                                if (null == g.to)
                                    break a;
                                g.to == H && (g = !1)
                            }
                        }
                        if (H >= t)
                            break;
                        for (z = Math.min(t, v); ; ) {
                            if (x) {
                                ba = H + x.length;
                                g || (A = ba > z ? x.slice(0, z - H) : x, f.addToken(f, A, r ? r + p : p, h, H + A.length == v ? m : "", k, n));
                                if (ba >= z) {
                                    x = x.slice(z - H);
                                    H = z;
                                    break
                                }
                                H = ba;
                                h = ""
                            }
                            x = q.slice(u, u = l[w++]);
                            r = re(l[w++], f.cm.options)
                        }
                    }
                else
                    for (g =
                             1; g < l.length; g += 2)
                        f.addToken(f, q.slice(u, u = l[g]), re(l[g + 1], f.cm.options))
            }
            e.styleClasses && (e.styleClasses.bgClass && (c.bgClass = Nc(e.styleClasses.bgClass, c.bgClass || "")), e.styleClasses.textClass && (c.textClass = Nc(e.styleClasses.textClass, c.textClass || "")));
            0 == c.map.length && c.map.push(0, 0, c.content.appendChild(og(a.display.measure)));
            0 == d ? (b.measure.map = c.map, b.measure.cache = {}) : ((b.measure.maps || (b.measure.maps = [])).push(c.map), (b.measure.caches || (b.measure.caches = [])).push({}))
        }
        U && (d = c.content.lastChild,
        /\bcm-tab\b/.test(d.className) || d.querySelector && d.querySelector(".cm-tab")) && (c.content.className = "cm-tab-wrap-hack");
        J(a, "renderLine", a, b.line, c.pre);
        c.pre.className && (c.textClass = Nc(c.pre.className, c.textClass || ""));
        return c
    }
    function xg(a) {
        var b = u("span", "\u2022", "cm-invalidchar");
        b.title = "\\u" + a.charCodeAt(0).toString(16);
        b.setAttribute("aria-label", b.title);
        return b
    }
    function vg(a, b, c, d, e, f, g) {
        if (b) {
            if (a.splitSpaces) {
                var h = a.trailingSpace;
                if (1 < b.length && !/  /.test(b))
                    h = b;
                else {
                    for (var k = "", l = 0; l <
                    b.length; l++) {
                        var m = b.charAt(l);
                        " " != m || !h || l != b.length - 1 && 32 != b.charCodeAt(l + 1) || (m = "\u00a0");
                        k += m;
                        h = " " == m
                    }
                    h = k
                }
            } else
                h = b;
            k = h;
            l = a.cm.state.specialChars;
            m = !1;
            if (l.test(b)) {
                h = document.createDocumentFragment();
                for (var p = 0; ; ) {
                    l.lastIndex = p;
                    var n = l.exec(b),
                        r = n ? n.index - p : b.length - p;
                    if (r) {
                        var L = document.createTextNode(k.slice(p, p + r));
                        B && 9 > F ? h.appendChild(u("span", [L])) : h.appendChild(L);
                        a.map.push(a.pos, a.pos + r, L);
                        a.col += r;
                        a.pos += r
                    }
                    if (!n)
                        break;
                    p += r + 1;
                    "\t" == n[0] ? (n = a.cm.options.tabSize, n -= a.col % n, r = h.appendChild(u("span",
                        Qc(n), "cm-tab")), r.setAttribute("role", "presentation"), r.setAttribute("cm-text", "\t"), a.col += n) : ("\r" == n[0] || "\n" == n[0] ? (r = h.appendChild(u("span", "\r" == n[0] ? "\u240d" : "\u2424", "cm-invalidchar")), r.setAttribute("cm-text", n[0])) : (r = a.cm.options.specialCharPlaceholder(n[0]), r.setAttribute("cm-text", n[0]), B && 9 > F ? h.appendChild(u("span", [r])) : h.appendChild(r)), a.col += 1);
                    a.map.push(a.pos, a.pos + 1, r);
                    a.pos++
                }
            } else
                a.col += b.length, h = document.createTextNode(k), a.map.push(a.pos, a.pos + b.length, h), B && 9 > F && (m = !0),
                    a.pos += b.length;
            a.trailingSpace = 32 == k.charCodeAt(b.length - 1);
            if (c || d || e || m || g)
                return b = c || "", d && (b += d), e && (b += e), d = u("span", [h], b, g), f && (d.title = f), a.content.appendChild(d);
            a.content.appendChild(h)
        }
    }
    function wg(a, b) {
        return function (c, d, e, f, g, h, k) {
            e = e ? e + " cm-force-border" : "cm-force-border";
            for (var l = c.pos, m = l + d.length; ; ) {
                for (var p = void 0, n = 0; n < b.length && !(p = b[n], p.to > l && p.from <= l); n++);
                if (p.to >= m)
                    return a(c, d, e, f, g, h, k);
                a(c, d.slice(0, p.to - l), e, f, null, h, k);
                f = null;
                d = d.slice(p.to - l);
                l = p.to
            }
        }
    }
    function te(a,
                b, c, d) {
        var e = !d && c.widgetNode;
        e && a.map.push(a.pos, a.pos + b, e);
        !d && a.cm.display.input.needsContentAttribute && (e || (e = a.content.appendChild(document.createElement("span"))), e.setAttribute("cm-marker", c.id));
        e && (a.cm.display.input.setUneditable(e), a.content.appendChild(e));
        a.pos += b;
        a.trailingSpace = !1
    }
    function ue(a, b, c) {
        for (var d = this.line = b, e; d = La(d, !1); )
            d = d.find(1, !0).line, (e || (e = [])).push(d);
        this.size = (this.rest = e) ? C(y(this.rest)) - c + 1 : 1;
        this.node = this.text = null;
        this.hidden = Ma(a, b)
    }
    function qc(a, b, c) {
        var d =
                [],
            e;
        for (e = b; e < c; )
            b = new ue(a.doc, t(a.doc, e), e), e += b.size, d.push(b);
        return d
    }
    function yg(a, b) {
        if (a = a.ownsGroup)
            try {
                var c = a.delayedCallbacks,
                    d = 0;
                do {
                    for (; d < c.length; d++)
                        c[d].call(null);
                    for (var e = 0; e < a.ops.length; e++) {
                        var f = a.ops[e];
                        if (f.cursorActivityHandlers)
                            for (; f.cursorActivityCalled < f.cursorActivityHandlers.length; )
                                f.cursorActivityHandlers[f.cursorActivityCalled++].call(null, f.cm)
                    }
                } while (d < c.length)
            }
            finally {
                eb = null,
                    b(a)
            }
    }
    function S(a, b) {
        var c = a._handlers && a._handlers[b] || nc;
        if (c.length) {
            var d = Array.prototype.slice.call(arguments,
                2);
            if (eb)
                var e = eb.delayedCallbacks;
            else
                Ab ? e = Ab : (e = Ab = [], setTimeout(zg, 0));
            for (var f = function (a) {
                e.push(function () {
                    return c[a].apply(null, d)
                })
            }, g = 0; g < c.length; ++g)
                f(g)
        }
    }
    function zg() {
        var a = Ab;
        Ab = null;
        for (var b = 0; b < a.length; ++b)
            a[b]()
    }
    function ve(a, b, c, d) {
        for (var e = 0; e < b.changes.length; e++) {
            var f = b.changes[e];
            if ("text" == f) {
                f = a;
                var g = b,
                    h = g.text.className,
                    k = we(f, g);
                g.text == g.node && (g.node = k.pre);
                g.text.parentNode.replaceChild(k.pre, g.text);
                g.text = k.pre;
                k.bgClass != g.bgClass || k.textClass != g.textClass ?
                    (g.bgClass = k.bgClass, g.textClass = k.textClass, id(f, g)) : h && (g.text.className = h)
            } else if ("gutter" == f)
                xe(a, b, c, d);
            else if ("class" == f)
                id(a, b);
            else if ("widget" == f) {
                f = a;
                g = b;
                h = d;
                g.alignable && (g.alignable = null);
                k = g.node.firstChild;
                for (var l; k; k = l)
                    l = k.nextSibling, "CodeMirror-linewidget" == k.className && g.node.removeChild(k);
                ye(f, g, h)
            }
        }
        b.changes = null
    }
    function Bb(a) {
        a.node == a.text && (a.node = u("div", null, null, "position: relative"), a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text), a.node.appendChild(a.text),
        B && 8 > F && (a.node.style.zIndex = 2));
        return a.node
    }
    function we(a, b) {
        var c = a.display.externalMeasured;
        return c && c.line == b.line ? (a.display.externalMeasured = null, b.measure = c.measure, c.built) : se(a, b)
    }
    function id(a, b) {
        var c = b.bgClass ? b.bgClass + " " + (b.line.bgClass || "") : b.line.bgClass;
        c && (c += " CodeMirror-linebackground");
        if (b.background)
            c ? b.background.className = c : (b.background.parentNode.removeChild(b.background), b.background = null);
        else if (c) {
            var d = Bb(b);
            b.background = d.insertBefore(u("div", null, c), d.firstChild);
            a.display.input.setUneditable(b.background)
        }
        b.line.wrapClass ? Bb(b).className = b.line.wrapClass : b.node != b.text && (b.node.className = "");
        b.text.className = (b.textClass ? b.textClass + " " + (b.line.textClass || "") : b.line.textClass) || ""
    }
    function xe(a, b, c, d) {
        b.gutter && (b.node.removeChild(b.gutter), b.gutter = null);
        b.gutterBackground && (b.node.removeChild(b.gutterBackground), b.gutterBackground = null);
        if (b.line.gutterClass) {
            var e = Bb(b);
            b.gutterBackground = u("div", null, "CodeMirror-gutter-background " + b.line.gutterClass,
                "left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px; width: " + d.gutterTotalWidth + "px");
            a.display.input.setUneditable(b.gutterBackground);
            e.insertBefore(b.gutterBackground, b.text)
        }
        e = b.line.gutterMarkers;
        if (a.options.lineNumbers || e) {
            var f = Bb(b),
                g = b.gutter = u("div", null, "CodeMirror-gutter-wrapper", "left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px");
            a.display.input.setUneditable(g);
            f.insertBefore(g, b.text);
            b.line.gutterClass && (g.className += " " + b.line.gutterClass);
            !a.options.lineNumbers ||
            e && e["CodeMirror-linenumbers"] || (b.lineNumber = g.appendChild(u("div", Uc(a.options, c), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + d.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.display.lineNumInnerWidth + "px")));
            if (e)
                for (b = 0; b < a.options.gutters.length; ++b)
                    c = a.options.gutters[b], (f = e.hasOwnProperty(c) && e[c]) && g.appendChild(u("div", [f], "CodeMirror-gutter-elt", "left: " + d.gutterLeft[c] + "px; width: " + d.gutterWidth[c] + "px"))
        }
    }
    function Ag(a, b, c, d) {
        var e = we(a, b);
        b.text = b.node = e.pre;
        e.bgClass &&
        (b.bgClass = e.bgClass);
        e.textClass && (b.textClass = e.textClass);
        id(a, b);
        xe(a, b, c, d);
        ye(a, b, d);
        return b.node
    }
    function ye(a, b, c) {
        ze(a, b.line, b, c, !0);
        if (b.rest)
            for (var d = 0; d < b.rest.length; d++)
                ze(a, b.rest[d], b, c, !1)
    }
    function ze(a, b, c, d, e) {
        if (b.widgets) {
            var f = Bb(c),
                g = 0;
            for (b = b.widgets; g < b.length; ++g) {
                var h = b[g],
                    k = u("div", [h.node], "CodeMirror-linewidget");
                h.handleMouseEvents || k.setAttribute("cm-ignore-events", "true");
                var l = h,
                    m = k,
                    p = d;
                if (l.noHScroll) {
                    (c.alignable || (c.alignable = [])).push(m);
                    var n = p.wrapperWidth;
                    m.style.left = p.fixedPos + "px";
                    l.coverGutter || (n -= p.gutterTotalWidth, m.style.paddingLeft = p.gutterTotalWidth + "px");
                    m.style.width = n + "px"
                }
                l.coverGutter && (m.style.zIndex = 5, m.style.position = "relative", l.noHScroll || (m.style.marginLeft = -p.gutterTotalWidth + "px"));
                a.display.input.setUneditable(k);
                e && h.above ? f.insertBefore(k, c.gutter || c.text) : f.appendChild(k);
                S(h, "redraw")
            }
        }
    }
    function Cb(a) {
        if (null != a.height)
            return a.height;
        var b = a.doc.cm;
        if (!b)
            return 0;
        if (!ka(document.body, a.node)) {
            var c = "position: relative;";
            a.coverGutter && (c += "margin-left: -" + b.display.gutters.offsetWidth + "px;");
            a.noHScroll && (c += "width: " + b.display.wrapper.clientWidth + "px;");
            E(b.display.measure, u("div", [a.node], null, c))
        }
        return a.height = a.node.parentNode.offsetHeight
    }
    function ya(a, b) {
        for (b = b.target || b.srcElement; b != a.wrapper; b = b.parentNode)
            if (!b || 1 == b.nodeType && "true" == b.getAttribute("cm-ignore-events") || b.parentNode == a.sizer && b != a.mover)
                return !0
    }
    function jd(a) {
        return a.mover.offsetHeight - a.lineSpace.offsetHeight
    }
    function Ae(a) {
        if (a.cachedPaddingH)
            return a.cachedPaddingH;
        var b = E(a.measure, u("pre", "x"));
        b = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle;
        b = {
            left: parseInt(b.paddingLeft),
            right: parseInt(b.paddingRight)
        };
        isNaN(b.left) || isNaN(b.right) || (a.cachedPaddingH = b);
        return b
    }
    function ua(a) {
        return 30 - a.display.nativeBarWidth
    }
    function Oa(a) {
        return a.display.scroller.clientWidth - ua(a) - a.display.barWidth
    }
    function kd(a) {
        return a.display.scroller.clientHeight - ua(a) - a.display.barHeight
    }
    function Be(a, b, c) {
        if (a.line == b)
            return {
                map: a.measure.map,
                cache: a.measure.cache
            };
        for (var d = 0; d < a.rest.length; d++)
            if (a.rest[d] == b)
                return {
                    map: a.measure.maps[d],
                    cache: a.measure.caches[d]
                };
        for (b = 0; b < a.rest.length; b++)
            if (C(a.rest[b]) > c)
                return {
                    map: a.measure.maps[b],
                    cache: a.measure.caches[b],
                    before: !0
                }
    }
    function ld(a, b) {
        if (b >= a.display.viewFrom && b < a.display.viewTo)
            return a.display.view[Pa(a, b)];
        if ((a = a.display.externalMeasured) && b >= a.lineN && b < a.lineN + a.size)
            return a
    }
    function Qa(a, b) {
        var c = C(b),
            d = ld(a, c);
        d && !d.text ? d = null : d && d.changes && (ve(a, d, c, md(a)), a.curOp.forceUpdate = !0);
        if (!d) {
            var e =
                ra(b);
            d = C(e);
            e = a.display.externalMeasured = new ue(a.doc, e, d);
            e.lineN = d;
            d = e.built = se(a, e);
            e.text = d.pre;
            E(a.display.lineMeasure, d.pre);
            d = e
        }
        a = Be(d, b, c);
        return {
            line: b,
            view: d,
            rect: null,
            map: a.map,
            cache: a.cache,
            before: a.before,
            hasHeights: !1
        }
    }
    function ma(a, b, c, d, e) {
        b.before && (c = -1);
        var f = c + (d || "");
        if (b.cache.hasOwnProperty(f))
            a = b.cache[f];
        else {
            b.rect || (b.rect = b.view.text.getBoundingClientRect());
            if (!b.hasHeights) {
                var g = b.view,
                    h = b.rect,
                    k = a.options.lineWrapping,
                    l = k && Oa(a);
                if (!g.measure.heights || k && g.measure.width !=
                    l) {
                    var m = g.measure.heights = [];
                    if (k)
                        for (g.measure.width = l, g = g.text.firstChild.getClientRects(), k = 0; k < g.length - 1; k++) {
                            l = g[k];
                            var p = g[k + 1];
                            2 < Math.abs(l.bottom - p.bottom) && m.push((l.bottom + p.top) / 2 - h.top)
                        }
                    m.push(h.bottom - h.top)
                }
                b.hasHeights = !0
            }
            m = d;
            g = Ce(b.map, c, m);
            d = g.node;
            h = g.start;
            k = g.end;
            c = g.collapse;
            if (3 == d.nodeType) {
                for (var n = 0; 4 > n; n++) {
                    for (; h && Sc(b.line.text.charAt(g.coverStart + h)); )
                        --h;
                    for (; g.coverStart + k < g.coverEnd && Sc(b.line.text.charAt(g.coverStart + k)); )
                        ++k;
                    if (B && 9 > F && 0 == h && k == g.coverEnd - g.coverStart)
                        var r =
                            d.parentNode.getBoundingClientRect();
                    else {
                        r = zb(d, h, k).getClientRects();
                        k = De;
                        if ("left" == m)
                            for (l = 0; l < r.length && (k = r[l]).left == k.right; l++);
                        else
                            for (l = r.length - 1; 0 <= l && (k = r[l]).left == k.right; l--);
                        r = k
                    }
                    if (r.left || r.right || 0 == h)
                        break;
                    k = h;
                    --h;
                    c = "right"
                }
                B && 11 > F && ((n = !window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI) || (null != nd ? n = nd : (m = E(a.display.measure, u("span", "x")), n = m.getBoundingClientRect(), m = zb(m, 0, 1).getBoundingClientRect(), n = nd = 1 < Math.abs(n.left - m.left)), n = !n), n || (n =
                    screen.logicalXDPI / screen.deviceXDPI, m = screen.logicalYDPI / screen.deviceYDPI, r = {
                    left: r.left * n,
                    right: r.right * n,
                    top: r.top * m,
                    bottom: r.bottom * m
                }))
            } else
                0 < h && (c = m = "right"), r = a.options.lineWrapping && 1 < (n = d.getClientRects()).length ? n["right" == m ? n.length - 1 : 0] : d.getBoundingClientRect();
            !(B && 9 > F) || h || r && (r.left || r.right) || (r = (r = d.parentNode.getClientRects()[0]) ? {
                    left: r.left,
                    right: r.left + Db(a.display),
                    top: r.top,
                    bottom: r.bottom
                }
                : De);
            d = r.top - b.rect.top;
            h = r.bottom - b.rect.top;
            n = (d + h) / 2;
            m = b.view.measure.heights;
            for (g =
                     0; g < m.length - 1 && !(n < m[g]); g++);
            c = {
                left: ("right" == c ? r.right : r.left) - b.rect.left,
                right: ("left" == c ? r.left : r.right) - b.rect.left,
                top: g ? m[g - 1] : 0,
                bottom: m[g]
            };
            r.left || r.right || (c.bogus = !0);
            a.options.singleCursorHeightPerLine || (c.rtop = d, c.rbottom = h);
            a = c;
            a.bogus || (b.cache[f] = a)
        }
        return {
            left: a.left,
            right: a.right,
            top: e ? a.rtop : a.top,
            bottom: e ? a.rbottom : a.bottom
        }
    }
    function Ce(a, b, c) {
        for (var d, e, f, g, h, k, l = 0; l < a.length; l += 3) {
            h = a[l];
            k = a[l + 1];
            if (b < h)
                e = 0, f = 1, g = "left";
            else if (b < k)
                e = b - h, f = e + 1;
            else if (l == a.length - 3 || b ==
                k && a[l + 3] > b)
                f = k - h, e = f - 1, b >= k && (g = "right");
            if (null != e) {
                d = a[l + 2];
                h == k && c == (d.insertLeft ? "left" : "right") && (g = c);
                if ("left" == c && 0 == e)
                    for (; l && a[l - 2] == a[l - 3] && a[l - 1].insertLeft; )
                        d = a[(l -= 3) + 2], g = "left";
                if ("right" == c && e == k - h)
                    for (; l < a.length - 3 && a[l + 3] == a[l + 4] && !a[l + 5].insertLeft; )
                        d = a[(l += 3) + 2], g = "right";
                break
            }
        }
        return {
            node: d,
            start: e,
            end: f,
            collapse: g,
            coverStart: h,
            coverEnd: k
        }
    }
    function Ee(a) {
        if (a.measure && (a.measure.cache = {}, a.measure.heights = null, a.rest))
            for (var b = 0; b < a.rest.length; b++)
                a.measure.caches[b] = {}
    }
    function Fe(a) {
        a.display.externalMeasure = null;
        I(a.display.lineMeasure);
        for (var b = 0; b < a.display.view.length; b++)
            Ee(a.display.view[b])
    }
    function Eb(a) {
        Fe(a);
        a.display.cachedCharWidth = a.display.cachedTextHeight = a.display.cachedPaddingH = null;
        a.options.lineWrapping || (a.display.maxLineChanged = !0);
        a.display.lineNumChars = null
    }
    function Ge() {
        return rc && sc ?  - (document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }
    function He() {
        return rc && sc ?  - (document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
    }
    function od(a) {
        var b = 0;
        if (a.widgets)
            for (var c = 0; c < a.widgets.length; ++c)
                a.widgets[c].above && (b += Cb(a.widgets[c]));
        return b
    }
    function tc(a, b, c, d, e) {
        e || (e = od(b), c.top += e, c.bottom += e);
        if ("line" == d)
            return c;
        d || (d = "local");
        b = sa(b);
        b = "local" == d ? b + a.display.lineSpace.offsetTop : b - a.display.viewOffset;
        if ("page" == d ||
            "window" == d)
            a = a.display.lineSpace.getBoundingClientRect(), b += a.top + ("window" == d ? 0 : He()), d = a.left + ("window" == d ? 0 : Ge()), c.left += d, c.right += d;
        c.top += b;
        c.bottom += b;
        return c
    }
    function Ie(a, b, c) {
        if ("div" == c)
            return b;
        var d = b.left;
        b = b.top;
        "page" == c ? (d -= Ge(), b -= He()) : "local" != c && c || (c = a.display.sizer.getBoundingClientRect(), d += c.left, b += c.top);
        a = a.display.lineSpace.getBoundingClientRect();
        return {
            left: d - a.left,
            top: b - a.top
        }
    }
    function pd(a, b, c, d, e) {
        d || (d = t(a.doc, b.line));
        var f = d;
        b = b.ch;
        d = ma(a, Qa(a, d), b, e);
        return tc(a,
            f, d, c)
    }
    function na(a, b, c, d, e, f) {
        function g(b, g) {
            b = ma(a, e, b, g ? "right" : "left", f);
            g ? b.left = b.right : b.right = b.left;
            return tc(a, d, b, c)
        }
        function h(a, b, d) {
            return g(d ? a - 1 : a, 1 == k[b].level != d)
        }
        d = d || t(a.doc, b.line);
        e || (e = Qa(a, d));
        var k = xa(d, a.doc.direction),
            l = b.ch;
        b = b.sticky;
        l >= d.text.length ? (l = d.text.length, b = "before") : 0 >= l && (l = 0, b = "after");
        if (!k)
            return g("before" == b ? l - 1 : l, "before" == b);
        var m = vb(k, l, b),
            p = wb;
        m = h(l, m, "before" == b);
        null != p && (m.other = h(l, p, "before" != b));
        return m
    }
    function Je(a, b) {
        var c = 0;
        b = v(a.doc,
            b);
        a.options.lineWrapping || (c = Db(a.display) * b.ch);
        b = t(a.doc, b.line);
        a = sa(b) + a.display.lineSpace.offsetTop;
        return {
            left: c,
            right: c,
            top: a,
            bottom: a + b.height
        }
    }
    function qd(a, b, c, d, e) {
        a = q(a, b, c);
        a.xRel = e;
        d && (a.outside = !0);
        return a
    }
    function rd(a, b, c) {
        var d = a.doc;
        c += a.display.viewOffset;
        if (0 > c)
            return qd(d.first, 0, null, !0, -1);
        var e = Ka(d, c),
            f = d.first + d.size - 1;
        if (e > f)
            return qd(d.first + d.size - 1, t(d, f).text.length, null, !0, 1);
        0 > b && (b = 0);
        for (d = t(d, e); ; )
            if (e = Bg(a, d, e, b, c), f = (d = La(d, !1)) && d.find(0, !0), d && (e.ch > f.from.ch ||
                e.ch == f.from.ch && 0 < e.xRel))
                e = C(d = f.to.line);
            else
                return e
    }
    function Ke(a, b, c, d) {
        d -= od(b);
        b = b.text.length;
        var e = rb(function (b) {
            return ma(a, c, b - 1).bottom <= d
        }, b, 0);
        b = rb(function (b) {
            return ma(a, c, b).top > d
        }, e, b);
        return {
            begin: e,
            end: b
        }
    }
    function Le(a, b, c, d) {
        c || (c = Qa(a, b));
        d = tc(a, b, ma(a, c, d), "line").top;
        return Ke(a, b, c, d)
    }
    function sd(a, b, c, d) {
        return a.bottom <= c ? !1 : a.top > c ? !0 : (d ? a.left : a.right) > b
    }
    function Bg(a, b, c, d, e) {
        e -= sa(b);
        var f = Qa(a, b),
            g = od(b),
            h = 0,
            k = b.text.length,
            l = !0,
            m = xa(b, a.doc.direction);
        m && (m = (a.options.lineWrapping ?
            Cg : Dg)(a, b, c, f, m, d, e), h = (l = 1 != m.level) ? m.from : m.to - 1, k = l ? m.to : m.from - 1);
        var p = null,
            n = null;
        m = rb(function (b) {
            var c = ma(a, f, b);
            c.top += g;
            c.bottom += g;
            if (!sd(c, d, e, !1))
                return !1;
            c.top <= e && c.left <= d && (p = b, n = c);
            return !0
        }, h, k);
        var r = !1;
        n ? (h = d - n.left < n.right - d, l = h == l, m = p + (l ? 0 : 1), l = l ? "after" : "before", h = h ? n.left : n.right) : (l || m != k && m != h || m++, l = 0 == m ? "after" : m == b.text.length ? "before" : ma(a, f, m - (l ? 1 : 0)).bottom + g <= e == l ? "after" : "before", r = na(a, q(c, m, l), "line", b, f), h = r.left, r = e < r.top || e >= r.bottom);
        m = Zd(b.text, m, 1);
        return qd(c,
            m, l, r, d - h)
    }
    function Dg(a, b, c, d, e, f, g) {
        var h = rb(function (h) {
                h = e[h];
                var k = 1 != h.level;
                return sd(na(a, q(c, k ? h.to : h.from, k ? "before" : "after"), "line", b, d), f, g, !0)
            }, 0, e.length - 1),
            k = e[h];
        if (0 < h) {
            var l = 1 != k.level;
            l = na(a, q(c, l ? k.from : k.to, l ? "after" : "before"), "line", b, d);
            sd(l, f, g, !0) && l.top > g && (k = e[h - 1])
        }
        return k
    }
    function Cg(a, b, c, d, e, f, g) {
        g = Ke(a, b, d, g);
        c = g.begin;
        g = g.end;
        /\s/.test(b.text.charAt(g - 1)) && g--;
        for (var h = b = null, k = 0; k < e.length; k++) {
            var l = e[k];
            if (!(l.from >= g || l.to <= c)) {
                var m = ma(a, d, 1 != l.level ? Math.min(g,
                    l.to) - 1 : Math.max(c, l.from)).right;
                m = m < f ? f - m + 1E9 : m - f;
                if (!b || h > m)
                    b = l, h = m
            }
        }
        b || (b = e[e.length - 1]);
        b.from < c && (b = {
            from: c,
            to: b.to,
            level: b.level
        });
        b.to > g && (b = {
            from: b.from,
            to: g,
            level: b.level
        });
        return b
    }
    function Ra(a) {
        if (null != a.cachedTextHeight)
            return a.cachedTextHeight;
        if (null == Sa) {
            Sa = u("pre");
            for (var b = 0; 49 > b; ++b)
                Sa.appendChild(document.createTextNode("x")), Sa.appendChild(u("br"));
            Sa.appendChild(document.createTextNode("x"))
        }
        E(a.measure, Sa);
        b = Sa.offsetHeight / 50;
        3 < b && (a.cachedTextHeight = b);
        I(a.measure);
        return b ||
            1
    }
    function Db(a) {
        if (null != a.cachedCharWidth)
            return a.cachedCharWidth;
        var b = u("span", "xxxxxxxxxx"),
            c = u("pre", [b]);
        E(a.measure, c);
        b = b.getBoundingClientRect();
        b = (b.right - b.left) / 10;
        2 < b && (a.cachedCharWidth = b);
        return b || 10
    }
    function md(a) {
        for (var b = a.display, c = {}, d = {}, e = b.gutters.clientLeft, f = b.gutters.firstChild, g = 0; f; f = f.nextSibling, ++g)
            c[a.options.gutters[g]] = f.offsetLeft + f.clientLeft + e, d[a.options.gutters[g]] = f.clientWidth;
        return {
            fixedPos: td(b),
            gutterTotalWidth: b.gutters.offsetWidth,
            gutterLeft: c,
            gutterWidth: d,
            wrapperWidth: b.wrapper.clientWidth
        }
    }
    function td(a) {
        return a.scroller.getBoundingClientRect().left - a.sizer.getBoundingClientRect().left
    }
    function Me(a) {
        var b = Ra(a.display),
            c = a.options.lineWrapping,
            d = c && Math.max(5, a.display.scroller.clientWidth / Db(a.display) - 3);
        return function (e) {
            if (Ma(a.doc, e))
                return 0;
            var f = 0;
            if (e.widgets)
                for (var g = 0; g < e.widgets.length; g++)
                    e.widgets[g].height && (f += e.widgets[g].height);
            return c ? f + (Math.ceil(e.text.length / d) || 1) * b : f + b
        }
    }
    function ud(a) {
        var b = a.doc,
            c = Me(a);
        b.iter(function (a) {
            var b =
                c(a);
            b != a.height && qa(a, b)
        })
    }
    function Ta(a, b, c, d) {
        var e = a.display;
        if (!c && "true" == (b.target || b.srcElement).getAttribute("cm-not-content"))
            return null;
        c = e.lineSpace.getBoundingClientRect();
        try {
            var f = b.clientX - c.left;
            var g = b.clientY - c.top
        } catch (k) {
            return null
        }
        b = rd(a, f, g);
        var h;
        d && 1 == b.xRel && (h = t(a.doc, b.line).text).length == b.ch && (d = ia(h, h.length, a.options.tabSize) - h.length, b = q(b.line, Math.max(0, Math.round((f - Ae(a.display).left) / Db(a.display)) - d)));
        return b
    }
    function Pa(a, b) {
        if (b >= a.display.viewTo)
            return null;
        b -= a.display.viewFrom;
        if (0 > b)
            return null;
        a = a.display.view;
        for (var c = 0; c < a.length; c++)
            if (b -= a[c].size, 0 > b)
                return c
    }
    function Fb(a) {
        a.display.input.showSelection(a.display.input.prepareSelection())
    }
    function Ne(a, b) {
        void 0 === b && (b = !0);
        for (var c = a.doc, d = {}, e = d.cursors = document.createDocumentFragment(), f = d.selection = document.createDocumentFragment(), g = 0; g < c.sel.ranges.length; g++)
            if (b || g != c.sel.primIndex) {
                var h = c.sel.ranges[g];
                if (!(h.from().line >= a.display.viewTo || h.to().line < a.display.viewFrom)) {
                    var k =
                        h.empty();
                    (k || a.options.showCursorWhenSelecting) && Oe(a, h.head, e);
                    k || Eg(a, h, f)
                }
            }
        return d
    }
    function Oe(a, b, c) {
        b = na(a, b, "div", null, null, !a.options.singleCursorHeightPerLine);
        var d = c.appendChild(u("div", "\u00a0", "CodeMirror-cursor"));
        d.style.left = b.left + "px";
        d.style.top = b.top + "px";
        d.style.height = Math.max(0, b.bottom - b.top) * a.options.cursorHeight + "px";
        b.other && (a = c.appendChild(u("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor")), a.style.display = "", a.style.left = b.other.left + "px", a.style.top =
            b.other.top + "px", a.style.height = .85 * (b.other.bottom - b.other.top) + "px")
    }
    function uc(a, b) {
        return a.top - b.top || a.left - b.left
    }
    function Eg(a, b, c) {
        function d(a, b, d, c) {
            0 > b && (b = 0);
            b = Math.round(b);
            c = Math.round(c);
            h.appendChild(u("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px;\n                             top: " + b + "px; width: " + (null == d ? m - a : d) + "px;\n                             height: " + (c - b) + "px"))
        }
        function e(b, c, e) {
            function f(d, c) {
                return pd(a, q(b, d), "div", k, c)
            }
            function h(b, d, c) {
                b = Le(a,
                    k, null, b);
                d = "ltr" == d == ("after" == c) ? "left" : "right";
                c = "after" == c ? b.begin : b.end - (/\s/.test(k.text.charAt(b.end - 1)) ? 2 : 1);
                return f(c, d)[d]
            }
            var k = t(g, b),
                n = k.text.length,
                r,
                L,
                u = xa(k, g.direction);
            mg(u, c || 0, null == e ? n : e, function (a, b, g, k) {
                var q = "ltr" == g,
                    t = f(a, q ? "left" : "right"),
                    v = f(b - 1, q ? "right" : "left"),
                    x = null == c && 0 == a,
                    w = null == e && b == n,
                    H = 0 == k;
                k = !u || k == u.length - 1;
                3 >= v.top - t.top ? (b = (p ? x : w) && H ? l : (q ? t : v).left, d(b, t.top, ((p ? w : x) && k ? m : (q ? v : t).right) - b, t.bottom)) : (q ? (q = p && x && H ? l : t.left, x = p ? m : h(a, g, "before"), a = p ? l : h(b,
                    g, "after"), w = p && w && k ? m : v.right) : (q = p ? h(a, g, "before") : l, x = !p && x && H ? m : t.right, a = !p && w && k ? l : v.left, w = p ? h(b, g, "after") : m), d(q, t.top, x - q, t.bottom), t.bottom < v.top && d(l, t.bottom, null, v.top), d(a, v.top, w - a, v.bottom));
                if (!r || 0 > uc(t, r))
                    r = t;
                0 > uc(v, r) && (r = v);
                if (!L || 0 > uc(t, L))
                    L = t;
                0 > uc(v, L) && (L = v)
            });
            return {
                start: r,
                end: L
            }
        }
        var f = a.display,
            g = a.doc,
            h = document.createDocumentFragment(),
            k = Ae(a.display),
            l = k.left,
            m = Math.max(f.sizerWidth, Oa(a) - f.sizer.offsetLeft) - k.right,
            p = "ltr" == g.direction;
        f = b.from();
        b = b.to();
        if (f.line ==
            b.line)
            e(f.line, f.ch, b.ch);
        else {
            var n = t(g, f.line);
            k = t(g, b.line);
            k = ra(n) == ra(k);
            f = e(f.line, f.ch, k ? n.text.length + 1 : null).end;
            b = e(b.line, k ? 0 : null, b.ch).start;
            k && (f.top < b.top - 2 ? (d(f.right, f.top, null, f.bottom), d(l, b.top, b.left, b.bottom)) : d(f.right, f.top, b.left - f.right, f.bottom));
            f.bottom < b.top && d(l, f.bottom, null, b.top)
        }
        c.appendChild(h)
    }
    function vd(a) {
        if (a.state.focused) {
            var b = a.display;
            clearInterval(b.blinker);
            var c = !0;
            b.cursorDiv.style.visibility = "";
            0 < a.options.cursorBlinkRate ? b.blinker = setInterval(function () {
                return b.cursorDiv.style.visibility =
                    (c = !c) ? "" : "hidden"
            }, a.options.cursorBlinkRate) : 0 > a.options.cursorBlinkRate && (b.cursorDiv.style.visibility = "hidden")
        }
    }
    function Pe(a) {
        a.state.focused || (a.display.input.focus(), wd(a))
    }
    function Qe(a) {
        a.state.delayingBlurEvent = !0;
        setTimeout(function () {
            a.state.delayingBlurEvent && (a.state.delayingBlurEvent = !1, Gb(a))
        }, 100)
    }
    function wd(a, b) {
        a.state.delayingBlurEvent && (a.state.delayingBlurEvent = !1);
        "nocursor" != a.options.readOnly && (a.state.focused || (J(a, "focus", a, b), a.state.focused = !0, Ha(a.display.wrapper, "CodeMirror-focused"),
        a.curOp || a.display.selForContextMenu == a.doc.sel || (a.display.input.reset(), U && setTimeout(function () {
            return a.display.input.reset(!0)
        }, 20)), a.display.input.receivedFocus()), vd(a))
    }
    function Gb(a, b) {
        a.state.delayingBlurEvent || (a.state.focused && (J(a, "blur", a, b), a.state.focused = !1, Ua(a.display.wrapper, "CodeMirror-focused")), clearInterval(a.display.blinker), setTimeout(function () {
            a.state.focused || (a.display.shift = !1)
        }, 150))
    }
    function vc(a) {
        a = a.display;
        for (var b = a.lineDiv.offsetTop, c = 0; c < a.view.length; c++) {
            var d =
                a.view[c];
            if (!d.hidden) {
                if (B && 8 > F) {
                    var e = d.node.offsetTop + d.node.offsetHeight;
                    var f = e - b;
                    b = e
                } else
                    f = d.node.getBoundingClientRect(), f = f.bottom - f.top;
                e = d.line.height - f;
                2 > f && (f = Ra(a));
                if (.005 < e ||  - .005 > e)
                    if (qa(d.line, f), Re(d.line), d.rest)
                        for (f = 0; f < d.rest.length; f++)
                            Re(d.rest[f])
            }
        }
    }
    function Re(a) {
        if (a.widgets)
            for (var b = 0; b < a.widgets.length; ++b) {
                var c = a.widgets[b],
                    d = c.node.parentNode;
                d && (c.height = d.offsetHeight)
            }
    }
    function xd(a, b, c) {
        var d = c && null != c.top ? Math.max(0, c.top) : a.scroller.scrollTop;
        d = Math.floor(d -
            a.lineSpace.offsetTop);
        var e = c && null != c.bottom ? c.bottom : d + a.wrapper.clientHeight;
        d = Ka(b, d);
        e = Ka(b, e);
        if (c && c.ensure) {
            var f = c.ensure.from.line;
            c = c.ensure.to.line;
            f < d ? (d = f, e = Ka(b, sa(t(b, f)) + a.wrapper.clientHeight)) : Math.min(c, b.lastLine()) >= e && (d = Ka(b, sa(t(b, c)) - a.wrapper.clientHeight), e = c)
        }
        return {
            from: d,
            to: Math.max(e, d + 1)
        }
    }
    function Se(a) {
        var b = a.display,
            c = b.view;
        if (b.alignWidgets || b.gutters.firstChild && a.options.fixedGutter) {
            for (var d = td(b) - b.scroller.scrollLeft + a.doc.scrollLeft, e = b.gutters.offsetWidth,
                     f = d + "px", g = 0; g < c.length; g++)
                if (!c[g].hidden) {
                    a.options.fixedGutter && (c[g].gutter && (c[g].gutter.style.left = f), c[g].gutterBackground && (c[g].gutterBackground.style.left = f));
                    var h = c[g].alignable;
                    if (h)
                        for (var k = 0; k < h.length; k++)
                            h[k].style.left = f
                }
            a.options.fixedGutter && (b.gutters.style.left = d + e + "px")
        }
    }
    function Te(a) {
        if (!a.options.lineNumbers)
            return !1;
        var b = a.doc;
        b = Uc(a.options, b.first + b.size - 1);
        var c = a.display;
        if (b.length != c.lineNumChars) {
            var d = c.measure.appendChild(u("div", [u("div", b)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                e = d.firstChild.offsetWidth;
            d = d.offsetWidth - e;
            c.lineGutter.style.width = "";
            c.lineNumInnerWidth = Math.max(e, c.lineGutter.offsetWidth - d) + 1;
            c.lineNumWidth = c.lineNumInnerWidth + d;
            c.lineNumChars = c.lineNumInnerWidth ? b.length : -1;
            c.lineGutter.style.width = c.lineNumWidth + "px";
            yd(a);
            return !0
        }
        return !1
    }
    function zd(a, b) {
        var c = a.display,
            d = Ra(a.display);
        0 > b.top && (b.top = 0);
        var e = a.curOp && null != a.curOp.scrollTop ? a.curOp.scrollTop : c.scroller.scrollTop,
            f = kd(a),
            g = {};
        b.bottom - b.top > f && (b.bottom = b.top + f);
        var h = a.doc.height +
            jd(c),
            k = b.top < d;
        d = b.bottom > h - d;
        b.top < e ? g.scrollTop = k ? 0 : b.top : b.bottom > e + f && (f = Math.min(b.top, (d ? h : b.bottom) - f), f != e && (g.scrollTop = f));
        e = a.curOp && null != a.curOp.scrollLeft ? a.curOp.scrollLeft : c.scroller.scrollLeft;
        a = Oa(a) - (a.options.fixedGutter ? c.gutters.offsetWidth : 0);
        if (c = b.right - b.left > a)
            b.right = b.left + a;
        10 > b.left ? g.scrollLeft = 0 : b.left < e ? g.scrollLeft = Math.max(0, b.left - (c ? 0 : 10)) : b.right > a + e - 3 && (g.scrollLeft = b.right + (c ? 0 : 10) - a);
        return g
    }
    function wc(a, b) {
        null != b && (xc(a), a.curOp.scrollTop = (null == a.curOp.scrollTop ?
            a.doc.scrollTop : a.curOp.scrollTop) + b)
    }
    function fb(a) {
        xc(a);
        var b = a.getCursor();
        a.curOp.scrollToPos = {
            from: b,
            to: b,
            margin: a.options.cursorScrollMargin
        }
    }
    function Hb(a, b, c) {
        null == b && null == c || xc(a);
        null != b && (a.curOp.scrollLeft = b);
        null != c && (a.curOp.scrollTop = c)
    }
    function xc(a) {
        var b = a.curOp.scrollToPos;
        if (b) {
            a.curOp.scrollToPos = null;
            var c = Je(a, b.from),
                d = Je(a, b.to);
            Ue(a, c, d, b.margin)
        }
    }
    function Ue(a, b, c, d) {
        b = zd(a, {
            left: Math.min(b.left, c.left),
            top: Math.min(b.top, c.top) - d,
            right: Math.max(b.right, c.right),
            bottom: Math.max(b.bottom,
                c.bottom) + d
        });
        Hb(a, b.scrollLeft, b.scrollTop)
    }
    function Ib(a, b) {
        2 > Math.abs(a.doc.scrollTop - b) || (Aa || Ad(a, {
            top: b
        }), Ve(a, b, !0), Aa && Ad(a), Jb(a, 100))
    }
    function Ve(a, b, c) {
        b = Math.min(a.display.scroller.scrollHeight - a.display.scroller.clientHeight, b);
        if (a.display.scroller.scrollTop != b || c)
            a.doc.scrollTop = b, a.display.scrollbars.setScrollTop(b), a.display.scroller.scrollTop != b && (a.display.scroller.scrollTop = b)
    }
    function Va(a, b, c, d) {
        b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth);
        (c ? b ==
            a.doc.scrollLeft : 2 > Math.abs(a.doc.scrollLeft - b)) && !d || (a.doc.scrollLeft = b, Se(a), a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b), a.display.scrollbars.setScrollLeft(b))
    }
    function Kb(a) {
        var b = a.display,
            c = b.gutters.offsetWidth,
            d = Math.round(a.doc.height + jd(a.display));
        return {
            clientHeight: b.scroller.clientHeight,
            viewHeight: b.wrapper.clientHeight,
            scrollWidth: b.scroller.scrollWidth,
            clientWidth: b.scroller.clientWidth,
            viewWidth: b.wrapper.clientWidth,
            barLeft: a.options.fixedGutter ? c : 0,
            docHeight: d,
            scrollHeight: d + ua(a) + b.barHeight,
            nativeBarWidth: b.nativeBarWidth,
            gutterWidth: c
        }
    }
    function gb(a, b) {
        b || (b = Kb(a));
        var c = a.display.barWidth,
            d = a.display.barHeight;
        We(a, b);
        for (b = 0; 4 > b && c != a.display.barWidth || d != a.display.barHeight; b++)
            c != a.display.barWidth && a.options.lineWrapping && vc(a), We(a, Kb(a)), c = a.display.barWidth, d = a.display.barHeight
    }
    function We(a, b) {
        var c = a.display,
            d = c.scrollbars.update(b);
        c.sizer.style.paddingRight = (c.barWidth = d.right) + "px";
        c.sizer.style.paddingBottom = (c.barHeight = d.bottom) + "px";
        c.heightForcer.style.borderBottom = d.bottom + "px solid transparent";
        d.right && d.bottom ? (c.scrollbarFiller.style.display = "block", c.scrollbarFiller.style.height = d.bottom + "px", c.scrollbarFiller.style.width = d.right + "px") : c.scrollbarFiller.style.display = "";
        d.bottom && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (c.gutterFiller.style.display = "block", c.gutterFiller.style.height = d.bottom + "px", c.gutterFiller.style.width = b.gutterWidth + "px") : c.gutterFiller.style.display = ""
    }
    function Xe(a) {
        a.display.scrollbars &&
        (a.display.scrollbars.clear(), a.display.scrollbars.addClass && Ua(a.display.wrapper, a.display.scrollbars.addClass));
        a.display.scrollbars = new Ye[a.options.scrollbarStyle](function (b) {
            a.display.wrapper.insertBefore(b, a.display.scrollbarFiller);
            w(b, "mousedown", function () {
                a.state.focused && setTimeout(function () {
                    return a.display.input.focus()
                }, 0)
            });
            b.setAttribute("cm-not-content", "true")
        }, function (b, c) {
            "horizontal" == c ? Va(a, b) : Ib(a, b)
        }, a);
        a.display.scrollbars.addClass && Ha(a.display.wrapper, a.display.scrollbars.addClass)
    }
    function Wa(a) {
        a.curOp = {
            cm: a,
            viewChanged: !1,
            startHeight: a.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Fg
        };
        a = a.curOp;
        eb ? eb.ops.push(a) : a.ownsGroup = eb = {
            ops: [a],
            delayedCallbacks: []
        }
    }
    function Xa(a) {
        yg(a.curOp, function (a) {
            for (var b = 0; b < a.ops.length; b++)
                a.ops[b].cm.curOp = null;
            a = a.ops;
            for (b = 0; b < a.length; b++) {
                var d = a[b],
                    e = d.cm,
                    f = e.display,
                    g = e.display;
                !g.scrollbarsClipped && g.scroller.offsetWidth && (g.nativeBarWidth = g.scroller.offsetWidth - g.scroller.clientWidth, g.heightForcer.style.height = ua(e) + "px", g.sizer.style.marginBottom = -g.nativeBarWidth + "px", g.sizer.style.borderRightWidth = ua(e) + "px", g.scrollbarsClipped = !0);
                d.updateMaxLine && $c(e);
                d.mustUpdate = d.viewChanged || d.forceUpdate || null != d.scrollTop || d.scrollToPos && (d.scrollToPos.from.line < f.viewFrom || d.scrollToPos.to.line >= f.viewTo) || f.maxLineChanged && e.options.lineWrapping;
                d.update = d.mustUpdate &&
                    new yc(e, d.mustUpdate && {
                        top: d.scrollTop,
                        ensure: d.scrollToPos
                    }, d.forceUpdate)
            }
            for (b = 0; b < a.length; b++)
                d = a[b], d.updatedDisplay = d.mustUpdate && Bd(d.cm, d.update);
            for (b = 0; b < a.length; b++)
                if (d = a[b], e = d.cm, f = e.display, d.updatedDisplay && vc(e), d.barMeasure = Kb(e), f.maxLineChanged && !e.options.lineWrapping && (g = f.maxLine.text.length, g = ma(e, Qa(e, f.maxLine), g, void 0), d.adjustWidthTo = g.left + 3, e.display.sizerWidth = d.adjustWidthTo, d.barMeasure.scrollWidth = Math.max(f.scroller.clientWidth, f.sizer.offsetLeft + d.adjustWidthTo +
                    ua(e) + e.display.barWidth), d.maxScrollLeft = Math.max(0, f.sizer.offsetLeft + d.adjustWidthTo - Oa(e))), d.updatedDisplay || d.selectionChanged)
                    d.preparedSelection = f.input.prepareSelection();
            for (b = 0; b < a.length; b++)
                d = a[b], e = d.cm, null != d.adjustWidthTo && (e.display.sizer.style.minWidth = d.adjustWidthTo + "px", d.maxScrollLeft < e.doc.scrollLeft && Va(e, Math.min(e.display.scroller.scrollLeft, d.maxScrollLeft), !0), e.display.maxLineChanged = !1), f = d.focus && d.focus == wa(), d.preparedSelection && e.display.input.showSelection(d.preparedSelection,
                    f), (d.updatedDisplay || d.startHeight != e.doc.height) && gb(e, d.barMeasure), d.updatedDisplay && Cd(e, d.barMeasure), d.selectionChanged && vd(e), e.state.focused && d.updateInput && e.display.input.reset(d.typing), f && Pe(d.cm);
            for (b = 0; b < a.length; b++) {
                var h = void 0;
                d = a[b];
                e = d.cm;
                f = e.display;
                g = e.doc;
                d.updatedDisplay && Ze(e, d.update);
                null == f.wheelStartX || null == d.scrollTop && null == d.scrollLeft && !d.scrollToPos || (f.wheelStartX = f.wheelStartY = null);
                null != d.scrollTop && Ve(e, d.scrollTop, d.forceScroll);
                null != d.scrollLeft && Va(e,
                    d.scrollLeft, !0, !0);
                if (d.scrollToPos) {
                    var k = v(g, d.scrollToPos.from);
                    var l = v(g, d.scrollToPos.to);
                    var m = d.scrollToPos.margin;
                    null == m && (m = 0);
                    e.options.lineWrapping || k != l || (k = k.ch ? q(k.line, "before" == k.sticky ? k.ch - 1 : k.ch, "after") : k, l = "before" == k.sticky ? q(k.line, k.ch + 1, "before") : k);
                    for (var p = 0; 5 > p; p++) {
                        var n = !1;
                        h = na(e, k);
                        var r = l && l != k ? na(e, l) : h;
                        h = {
                            left: Math.min(h.left, r.left),
                            top: Math.min(h.top, r.top) - m,
                            right: Math.max(h.left, r.left),
                            bottom: Math.max(h.bottom, r.bottom) + m
                        };
                        r = zd(e, h);
                        var L = e.doc.scrollTop,
                            t = e.doc.scrollLeft;
                        null != r.scrollTop && (Ib(e, r.scrollTop), 1 < Math.abs(e.doc.scrollTop - L) && (n = !0));
                        null != r.scrollLeft && (Va(e, r.scrollLeft), 1 < Math.abs(e.doc.scrollLeft - t) && (n = !0));
                        if (!n)
                            break
                    }
                    l = h;
                    N(e, "scrollCursorIntoView") || (m = e.display, p = m.sizer.getBoundingClientRect(), k = null, 0 > l.top + p.top ? k = !0 : l.bottom + p.top > (window.innerHeight || document.documentElement.clientHeight) && (k = !1), null == k || Gg || (l = u("div", "\u200b", null, "position: absolute;\n                         top: " + (l.top - m.viewOffset - e.display.lineSpace.offsetTop) +
                        "px;\n                         height: " + (l.bottom - l.top + ua(e) + m.barHeight) + "px;\n                         left: " + l.left + "px; width: " + Math.max(2, l.right - l.left) + "px;"), e.display.lineSpace.appendChild(l), l.scrollIntoView(k), e.display.lineSpace.removeChild(l)))
                }
                l = d.maybeHiddenMarkers;
                k = d.maybeUnhiddenMarkers;
                if (l)
                    for (m = 0; m < l.length; ++m)
                        l[m].lines.length || J(l[m], "hide");
                if (k)
                    for (l = 0; l < k.length; ++l)
                        k[l].lines.length && J(k[l], "unhide");
                f.wrapper.offsetHeight && (g.scrollTop = e.display.scroller.scrollTop);
                d.changeObjs && J(e, "changes", e, d.changeObjs);
                d.update && d.update.finish()
            }
        })
    }
    function ca(a, b) {
        if (a.curOp)
            return b();
        Wa(a);
        try {
            return b()
        }
        finally {
            Xa(a)
        }
    }
    function O(a, b) {
        return function () {
            if (a.curOp)
                return b.apply(a, arguments);
            Wa(a);
            try {
                return b.apply(a, arguments)
            }
            finally {
                Xa(a)
            }
        }
    }
    function W(a) {
        return function () {
            if (this.curOp)
                return a.apply(this, arguments);
            Wa(this);
            try {
                return a.apply(this, arguments)
            }
            finally {
                Xa(this)
            }
        }
    }
    function P(a) {
        return function () {
            var b = this.cm;
            if (!b || b.curOp)
                return a.apply(this, arguments);
            Wa(b);
            try {
                return a.apply(this, arguments)
            }
            finally {
                Xa(b)
            }
        }
    }
    function Z(a, b, c, d) {
        null == b && (b = a.doc.first);
        null == c && (c = a.doc.first + a.doc.size);
        d || (d = 0);
        var e = a.display;
        d && c < e.viewTo && (null == e.updateLineNumbers || e.updateLineNumbers > b) && (e.updateLineNumbers = b);
        a.curOp.viewChanged = !0;
        if (b >= e.viewTo)
            Ba && Yc(a.doc, b) < e.viewTo && Ca(a);
        else if (c <= e.viewFrom)
            Ba && fe(a.doc, c + d) > e.viewFrom ? Ca(a) : (e.viewFrom += d, e.viewTo += d);
        else if (b <= e.viewFrom && c >= e.viewTo)
            Ca(a);
        else if (b <= e.viewFrom) {
            var f = zc(a, c, c + d, 1);
            f ? (e.view =
                e.view.slice(f.index), e.viewFrom = f.lineN, e.viewTo += d) : Ca(a)
        } else if (c >= e.viewTo)
            (f = zc(a, b, b, -1)) ? (e.view = e.view.slice(0, f.index), e.viewTo = f.lineN) : Ca(a);
        else {
            f = zc(a, b, b, -1);
            var g = zc(a, c, c + d, 1);
            f && g ? (e.view = e.view.slice(0, f.index).concat(qc(a, f.lineN, g.lineN)).concat(e.view.slice(g.index)), e.viewTo += d) : Ca(a)
        }
        if (a = e.externalMeasured)
            c < a.lineN ? a.lineN += d : b < a.lineN + a.size && (e.externalMeasured = null)
    }
    function Da(a, b, c) {
        a.curOp.viewChanged = !0;
        var d = a.display,
            e = a.display.externalMeasured;
        e && b >= e.lineN && b <
        e.lineN + e.size && (d.externalMeasured = null);
        b < d.viewFrom || b >= d.viewTo || (a = d.view[Pa(a, b)], null != a.node && (a = a.changes || (a.changes = []), -1 == Q(a, c) && a.push(c)))
    }
    function Ca(a) {
        a.display.viewFrom = a.display.viewTo = a.doc.first;
        a.display.view = [];
        a.display.viewOffset = 0
    }
    function zc(a, b, c, d) {
        var e = Pa(a, b),
            f = a.display.view;
        if (!Ba || c == a.doc.first + a.doc.size)
            return {
                index: e,
                lineN: c
            };
        for (var g = a.display.viewFrom, h = 0; h < e; h++)
            g += f[h].size;
        if (g != b) {
            if (0 < d) {
                if (e == f.length - 1)
                    return null;
                b = g + f[e].size - b;
                e++
            } else
                b = g - b;
            c +=
                b
        }
        for (; Yc(a.doc, c) != c; ) {
            if (e == (0 > d ? 0 : f.length - 1))
                return null;
            c += d * f[e - (0 > d ? 1 : 0)].size;
            e += d
        }
        return {
            index: e,
            lineN: c
        }
    }
    function $e(a) {
        a = a.display.view;
        for (var b = 0, c = 0; c < a.length; c++) {
            var d = a[c];
            d.hidden || d.node && !d.changes || ++b
        }
        return b
    }
    function Jb(a, b) {
        a.doc.highlightFrontier < a.display.viewTo && a.state.highlight.set(b, Oc(Hg, a))
    }
    function Hg(a) {
        var b = a.doc;
        if (!(b.highlightFrontier >= a.display.viewTo)) {
            var c = +new Date + a.options.workTime,
                d = yb(a, b.highlightFrontier),
                e = [];
            b.iter(d.line, Math.min(b.first + b.size,
                a.display.viewTo + 500), function (f) {
                if (d.line >= a.display.viewFrom) {
                    var g = f.styles,
                        h = f.text.length > a.options.maxHighlightLength ? Na(b.mode, d.state) : null,
                        k = ke(a, f, d, !0);
                    h && (d.state = h);
                    f.styles = k.styles;
                    h = f.styleClasses;
                    (k = k.classes) ? f.styleClasses = k : h && (f.styleClasses = null);
                    k = !g || g.length != f.styles.length || h != k && (!h || !k || h.bgClass != k.bgClass || h.textClass != k.textClass);
                    for (h = 0; !k && h < g.length; ++h)
                        k = g[h] != f.styles[h];
                    k && e.push(d.line);
                    f.stateAfter = d.save()
                } else
                    f.text.length <= a.options.maxHighlightLength &&
                    fd(a, f.text, d), f.stateAfter = 0 == d.line % 5 ? d.save() : null;
                d.nextLine();
                if (+new Date > c)
                    return Jb(a, a.options.workDelay), !0
            });
            b.highlightFrontier = d.line;
            b.modeFrontier = Math.max(b.modeFrontier, d.line);
            e.length && ca(a, function () {
                for (var b = 0; b < e.length; b++)
                    Da(a, e[b], "text")
            })
        }
    }
    function Bd(a, b) {
        var c = a.display,
            d = a.doc;
        if (b.editorIsHidden)
            return Ca(a), !1;
        if (!b.force && b.visible.from >= c.viewFrom && b.visible.to <= c.viewTo && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo) && c.renderedView == c.view && 0 == $e(a))
            return !1;
        Te(a) && (Ca(a), b.dims = md(a));
        var e = d.first + d.size,
            f = Math.max(b.visible.from - a.options.viewportMargin, d.first),
            g = Math.min(e, b.visible.to + a.options.viewportMargin);
        c.viewFrom < f && 20 > f - c.viewFrom && (f = Math.max(d.first, c.viewFrom));
        c.viewTo > g && 20 > c.viewTo - g && (g = Math.min(e, c.viewTo));
        Ba && (f = Yc(a.doc, f), g = fe(a.doc, g));
        d = f != c.viewFrom || g != c.viewTo || c.lastWrapHeight != b.wrapperHeight || c.lastWrapWidth != b.wrapperWidth;
        e = a.display;
        0 == e.view.length || f >= e.viewTo || g <= e.viewFrom ? (e.view = qc(a, f, g), e.viewFrom = f) : (e.viewFrom >
        f ? e.view = qc(a, f, e.viewFrom).concat(e.view) : e.viewFrom < f && (e.view = e.view.slice(Pa(a, f))), e.viewFrom = f, e.viewTo < g ? e.view = e.view.concat(qc(a, e.viewTo, g)) : e.viewTo > g && (e.view = e.view.slice(0, Pa(a, g))));
        e.viewTo = g;
        c.viewOffset = sa(t(a.doc, c.viewFrom));
        a.display.mover.style.top = c.viewOffset + "px";
        g = $e(a);
        if (!d && 0 == g && !b.force && c.renderedView == c.view && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo))
            return !1;
        a.hasFocus() ? f = null : (f = wa()) && ka(a.display.lineDiv, f) ? (f = {
            activeElt: f
        }, window.getSelection &&
        (e = window.getSelection(), e.anchorNode && e.extend && ka(a.display.lineDiv, e.anchorNode) && (f.anchorNode = e.anchorNode, f.anchorOffset = e.anchorOffset, f.focusNode = e.focusNode, f.focusOffset = e.focusOffset))) : f = null;
        4 < g && (c.lineDiv.style.display = "none");
        Ig(a, c.updateLineNumbers, b.dims);
        4 < g && (c.lineDiv.style.display = "");
        c.renderedView = c.view;
        (g = f) && g.activeElt && g.activeElt != wa() && (g.activeElt.focus(), g.anchorNode && ka(document.body, g.anchorNode) && ka(document.body, g.focusNode) && (f = window.getSelection(), e = document.createRange(),
            e.setEnd(g.anchorNode, g.anchorOffset), e.collapse(!1), f.removeAllRanges(), f.addRange(e), f.extend(g.focusNode, g.focusOffset)));
        I(c.cursorDiv);
        I(c.selectionDiv);
        c.gutters.style.height = c.sizer.style.minHeight = 0;
        d && (c.lastWrapHeight = b.wrapperHeight, c.lastWrapWidth = b.wrapperWidth, Jb(a, 400));
        c.updateLineNumbers = null;
        return !0
    }
    function Ze(a, b) {
        for (var c = b.viewport, d = !0; ; d = !1) {
            if (!d || !a.options.lineWrapping || b.oldDisplayWidth == Oa(a))
                if (c && null != c.top && (c = {
                    top: Math.min(a.doc.height + jd(a.display) - kd(a), c.top)
                }),
                    b.visible = xd(a.display, a.doc, c), b.visible.from >= a.display.viewFrom && b.visible.to <= a.display.viewTo)
                    break;
            if (!Bd(a, b))
                break;
            vc(a);
            d = Kb(a);
            Fb(a);
            gb(a, d);
            Cd(a, d);
            b.force = !1
        }
        b.signal(a, "update", a);
        if (a.display.viewFrom != a.display.reportedViewFrom || a.display.viewTo != a.display.reportedViewTo)
            b.signal(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo), a.display.reportedViewFrom = a.display.viewFrom, a.display.reportedViewTo = a.display.viewTo
    }
    function Ad(a, b) {
        b = new yc(a, b);
        if (Bd(a, b)) {
            vc(a);
            Ze(a, b);
            var c =
                Kb(a);
            Fb(a);
            gb(a, c);
            Cd(a, c);
            b.finish()
        }
    }
    function Ig(a, b, c) {
        function d(b) {
            var d = b.nextSibling;
            U && la && a.display.currentWheelTarget == b ? b.style.display = "none" : b.parentNode.removeChild(b);
            return d
        }
        var e = a.display,
            f = a.options.lineNumbers,
            g = e.lineDiv,
            h = g.firstChild,
            k = e.view;
        e = e.viewFrom;
        for (var l = 0; l < k.length; l++) {
            var m = k[l];
            if (!m.hidden)
                if (m.node && m.node.parentNode == g) {
                    for (; h != m.node; )
                        h = d(h);
                    h = f && null != b && b <= e && m.lineNumber;
                    m.changes && (-1 < Q(m.changes, "gutter") && (h = !1), ve(a, m, e, c));
                    h && (I(m.lineNumber), m.lineNumber.appendChild(document.createTextNode(Uc(a.options,
                        e))));
                    h = m.node.nextSibling
                } else {
                    var p = Ag(a, m, e, c);
                    g.insertBefore(p, h)
                }
            e += m.size
        }
        for (; h; )
            h = d(h)
    }
    function yd(a) {
        a.display.sizer.style.marginLeft = a.display.gutters.offsetWidth + "px"
    }
    function Cd(a, b) {
        a.display.sizer.style.minHeight = b.docHeight + "px";
        a.display.heightForcer.style.top = b.docHeight + "px";
        a.display.gutters.style.height = b.docHeight + a.display.barHeight + ua(a) + "px"
    }
    function af(a) {
        var b = a.display.gutters,
            c = a.options.gutters;
        I(b);
        for (var d = 0; d < c.length; ++d) {
            var e = c[d],
                f = b.appendChild(u("div", null, "CodeMirror-gutter " +
                    e));
            "CodeMirror-linenumbers" == e && (a.display.lineGutter = f, f.style.width = (a.display.lineNumWidth || 1) + "px")
        }
        b.style.display = d ? "" : "none";
        yd(a)
    }
    function Dd(a) {
        var b = Q(a.gutters, "CodeMirror-linenumbers");
        -1 == b && a.lineNumbers ? a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]) : -1 < b && !a.lineNumbers && (a.gutters = a.gutters.slice(0), a.gutters.splice(b, 1))
    }
    function bf(a) {
        var b = a.wheelDeltaX,
            c = a.wheelDeltaY;
        null == b && a.detail && a.axis == a.HORIZONTAL_AXIS && (b = a.detail);
        null == c && a.detail && a.axis == a.VERTICAL_AXIS ?
            c = a.detail : null == c && (c = a.wheelDelta);
        return {
            x: b,
            y: c
        }
    }
    function Jg(a) {
        a = bf(a);
        a.x *= fa;
        a.y *= fa;
        return a
    }
    function cf(a, b) {
        var c = bf(b),
            d = c.x;
        c = c.y;
        var e = a.display,
            f = e.scroller,
            g = f.scrollWidth > f.clientWidth,
            h = f.scrollHeight > f.clientHeight;
        if (d && g || c && h) {
            if (c && la && U) {
                g = b.target;
                var k = e.view;
                a: for (; g != f; g = g.parentNode)
                    for (var l = 0; l < k.length; l++)
                        if (k[l].node == g) {
                            a.display.currentWheelTarget = g;
                            break a
                        }
            }
            !d || Aa || oa || null == fa ? (c && null != fa && (b = c * fa, h = a.doc.scrollTop, g = h + e.wrapper.clientHeight, 0 > b ? h = Math.max(0,
                h + b - 50) : g = Math.min(a.doc.height, g + b + 50), Ad(a, {
                top: h,
                bottom: g
            })), 20 > Ac && (null == e.wheelStartX ? (e.wheelStartX = f.scrollLeft, e.wheelStartY = f.scrollTop, e.wheelDX = d, e.wheelDY = c, setTimeout(function () {
                if (null != e.wheelStartX) {
                    var a = f.scrollLeft - e.wheelStartX,
                        b = f.scrollTop - e.wheelStartY;
                    a = b && e.wheelDY && b / e.wheelDY || a && e.wheelDX && a / e.wheelDX;
                    e.wheelStartX = e.wheelStartY = null;
                    a && (fa = (fa * Ac + a) / (Ac + 1), ++Ac)
                }
            }, 200)) : (e.wheelDX += d, e.wheelDY += c))) : (c && h && Ib(a, Math.max(0, f.scrollTop + c * fa)), Va(a, Math.max(0, f.scrollLeft +
                d * fa)), (!c || c && h) && Y(b), e.wheelStartX = null)
        }
    }
    function pa(a, b) {
        b = a[b];
        a.sort(function (a, b) {
            return x(a.from(), b.from())
        });
        b = Q(a, b);
        for (var c = 1; c < a.length; c++) {
            var d = a[c],
                e = a[c - 1];
            if (0 <= x(e.to(), d.from())) {
                var f = kc(e.from(), d.from()),
                    g = jc(e.to(), d.to());
                d = e.empty() ? d.from() == d.head : e.from() == e.head;
                c <= b && --b;
                a.splice(--c, 2, new A(d ? g : f, d ? f : g))
            }
        }
        return new ha(a, b)
    }
    function za(a, b) {
        return new ha([new A(a, b || a)], 0)
    }
    function Ea(a) {
        return a.text ? q(a.from.line + a.text.length - 1, y(a.text).length + (1 == a.text.length ?
            a.from.ch : 0)) : a.to
    }
    function df(a, b) {
        if (0 > x(a, b.from))
            return a;
        if (0 >= x(a, b.to))
            return Ea(b);
        var c = a.line + b.text.length - (b.to.line - b.from.line) - 1,
            d = a.ch;
        a.line == b.to.line && (d += Ea(b).ch - b.to.ch);
        return q(c, d)
    }
    function Ed(a, b) {
        for (var c = [], d = 0; d < a.sel.ranges.length; d++) {
            var e = a.sel.ranges[d];
            c.push(new A(df(e.anchor, b), df(e.head, b)))
        }
        return pa(c, a.sel.primIndex)
    }
    function ef(a, b, c) {
        return a.line == b.line ? q(c.line, a.ch - b.ch + c.ch) : q(c.line + (a.line - b.line), a.ch)
    }
    function Fd(a) {
        a.doc.mode = dd(a.options, a.doc.modeOption);
        Lb(a)
    }
    function Lb(a) {
        a.doc.iter(function (a) {
            a.stateAfter && (a.stateAfter = null);
            a.styles && (a.styles = null)
        });
        a.doc.modeFrontier = a.doc.highlightFrontier = a.doc.first;
        Jb(a, 100);
        a.state.modeGen++;
        a.curOp && Z(a)
    }
    function ff(a, b) {
        return 0 == b.from.ch && 0 == b.to.ch && "" == y(b.text) && (!a.cm || a.cm.options.wholeLineUpdateBefore)
    }
    function Gd(a, b, c, d) {
        function e(a, c, e) {
            a.text = c;
            a.stateAfter && (a.stateAfter = null);
            a.styles && (a.styles = null);
            null != a.order && (a.order = null);
            be(a);
            ce(a, e);
            c = d ? d(a) : 1;
            c != a.height && qa(a, c);
            S(a, "change",
                a, b)
        }
        function f(a, b) {
            for (var e = []; a < b; ++a)
                e.push(new hb(k[a], c ? c[a] : null, d));
            return e
        }
        var g = b.from,
            h = b.to,
            k = b.text,
            l = t(a, g.line),
            m = t(a, h.line),
            p = y(k),
            n = c ? c[k.length - 1] : null,
            r = h.line - g.line;
        b.full ? (a.insert(0, f(0, k.length)), a.remove(k.length, a.size - k.length)) : ff(a, b) ? (h = f(0, k.length - 1), e(m, m.text, n), r && a.remove(g.line, r), h.length && a.insert(g.line, h)) : l == m ? 1 == k.length ? e(l, l.text.slice(0, g.ch) + p + l.text.slice(h.ch), n) : (r = f(1, k.length - 1), r.push(new hb(p + l.text.slice(h.ch), n, d)), e(l, l.text.slice(0, g.ch) +
            k[0], c ? c[0] : null), a.insert(g.line + 1, r)) : 1 == k.length ? (e(l, l.text.slice(0, g.ch) + k[0] + m.text.slice(h.ch), c ? c[0] : null), a.remove(g.line + 1, r)) : (e(l, l.text.slice(0, g.ch) + k[0], c ? c[0] : null), e(m, p + m.text.slice(h.ch), n), n = f(1, k.length - 1), 1 < r && a.remove(g.line + 1, r - 1), a.insert(g.line + 1, n));
        S(a, "change", a, b)
    }
    function Ya(a, b, c) {
        function d(a, f, g) {
            if (a.linked)
                for (var e = 0; e < a.linked.length; ++e) {
                    var k = a.linked[e];
                    if (k.doc != f) {
                        var l = g && k.sharedHist;
                        if (!c || l)
                            b(k.doc, l), d(k.doc, a, l)
                    }
                }
        }
        d(a, null, !0)
    }
    function gf(a, b) {
        if (b.cm)
            throw Error("This document is already in use.");
        a.doc = b;
        b.cm = a;
        ud(a);
        Fd(a);
        hf(a);
        a.options.lineWrapping || $c(a);
        a.options.mode = b.modeOption;
        Z(a)
    }
    function hf(a) {
        ("rtl" == a.doc.direction ? Ha : Ua)(a.display.lineDiv, "CodeMirror-rtl")
    }
    function Kg(a) {
        ca(a, function () {
            hf(a);
            Z(a)
        })
    }
    function Bc(a) {
        this.done = [];
        this.undone = [];
        this.undoDepth = Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOrigin = this.lastSelOrigin = this.lastOp = this.lastSelOp = null;
        this.generation = this.maxGeneration = a || 1
    }
    function Hd(a, b) {
        var c = {
            from: Wc(b.from),
            to: Ea(b),
            text: Ja(a, b.from, b.to)
        };
        jf(a, c, b.from.line, b.to.line + 1);
        Ya(a, function (a) {
            return jf(a, c, b.from.line, b.to.line + 1)
        }, !0);
        return c
    }
    function kf(a) {
        for (; a.length; )
            if (y(a).ranges)
                a.pop();
            else
                break
    }
    function lf(a, b, c, d) {
        var e = a.history;
        e.undone.length = 0;
        var f = +new Date,
            g;
        if (g = e.lastOp == d || e.lastOrigin == b.origin && b.origin && ("+" == b.origin.charAt(0) && a.cm && e.lastModTime > f - a.cm.options.historyEventDelay || "*" == b.origin.charAt(0))) {
            if (e.lastOp == d) {
                kf(e.done);
                var h = y(e.done)
            } else
                e.done.length && !y(e.done).ranges ? h = y(e.done) : 1 < e.done.length &&
                !e.done[e.done.length - 2].ranges ? (e.done.pop(), h = y(e.done)) : h = void 0;
            g = h
        }
        if (g) {
            var k = y(h.changes);
            0 == x(b.from, b.to) && 0 == x(b.from, k.to) ? k.to = Ea(b) : h.changes.push(Hd(a, b))
        } else
            for ((h = y(e.done)) && h.ranges || Cc(a.sel, e.done), h = {
                changes: [Hd(a, b)],
                generation: e.generation
            }, e.done.push(h); e.done.length > e.undoDepth; )
                e.done.shift(), e.done[0].ranges || e.done.shift();
        e.done.push(c);
        e.generation = ++e.maxGeneration;
        e.lastModTime = e.lastSelTime = f;
        e.lastOp = e.lastSelOp = d;
        e.lastOrigin = e.lastSelOrigin = b.origin;
        k || J(a, "historyAdded")
    }
    function Cc(a, b) {
        var c = y(b);
        c && c.ranges && c.equals(a) || b.push(a)
    }
    function jf(a, b, c, d) {
        var e = b["spans_" + a.id],
            f = 0;
        a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function (d) {
            d.markedSpans && ((e || (e = b["spans_" + a.id] = {}))[f] = d.markedSpans);
            ++f
        })
    }
    function Lg(a) {
        if (!a)
            return null;
        for (var b, c = 0; c < a.length; ++c)
            a[c].marker.explicitlyCleared ? b || (b = a.slice(0, c)) : b && b.push(a[c]);
        return b ? b.length ? b : null : a
    }
    function mf(a, b) {
        var c;
        if (c = b["spans_" + a.id]) {
            for (var d = [], e = 0; e < b.text.length; ++e)
                d.push(Lg(c[e]));
            c = d
        } else
            c = null;
        a = Xc(a, b);
        if (!c)
            return a;
        if (!a)
            return c;
        for (b = 0; b < c.length; ++b)
            if (d = c[b], e = a[b], d && e) {
                var f = 0;
                a: for (; f < e.length; ++f) {
                    for (var g = e[f], h = 0; h < d.length; ++h)
                        if (d[h].marker == g.marker)
                            continue a;
                    d.push(g)
                }
            } else
                e && (c[b] = e);
        return c
    }
    function ib(a, b, c) {
        for (var d = [], e = 0; e < a.length; ++e) {
            var f = a[e];
            if (f.ranges)
                d.push(c ? ha.prototype.deepCopy.call(f) : f);
            else {
                f = f.changes;
                var g = [];
                d.push({
                    changes: g
                });
                for (var h = 0; h < f.length; ++h) {
                    var k = f[h],
                        l;
                    g.push({
                        from: k.from,
                        to: k.to,
                        text: k.text
                    });
                    if (b)
                        for (var m in k)
                            (l =
                                m.match(/^spans_(\d+)$/)) && -1 < Q(b, Number(l[1])) && (y(g)[m] = k[m], delete k[m])
                }
            }
        }
        return d
    }
    function Id(a, b, c, d) {
        return d ? (a = a.anchor, c && (d = 0 > x(b, a), d != 0 > x(c, a) ? (a = b, b = c) : d != 0 > x(b, c) && (b = c)), new A(a, b)) : new A(c || b, b)
    }
    function Dc(a, b, c, d, e) {
        null == e && (e = a.cm && (a.cm.display.shift || a.extend));
        T(a, new ha([Id(a.sel.primary(), b, c, e)], 0), d)
    }
    function nf(a, b, c) {
        for (var d = [], e = a.cm && (a.cm.display.shift || a.extend), f = 0; f < a.sel.ranges.length; f++)
            d[f] = Id(a.sel.ranges[f], b[f], null, e);
        b = pa(d, a.sel.primIndex);
        T(a, b, c)
    }
    function Jd(a, b, c, d) {
        var e = a.sel.ranges.slice(0);
        e[b] = c;
        T(a, pa(e, a.sel.primIndex), d)
    }
    function Mg(a, b, c) {
        c = {
            ranges: b.ranges,
            update: function (b) {
                this.ranges = [];
                for (var d = 0; d < b.length; d++)
                    this.ranges[d] = new A(v(a, b[d].anchor), v(a, b[d].head))
            },
            origin: c && c.origin
        };
        J(a, "beforeSelectionChange", a, c);
        a.cm && J(a.cm, "beforeSelectionChange", a.cm, c);
        return c.ranges != b.ranges ? pa(c.ranges, c.ranges.length - 1) : b
    }
    function of(a, b, c) {
        var d = a.history.done,
            e = y(d);
        e && e.ranges ? (d[d.length - 1] = b, Ec(a, b, c)) : T(a, b, c)
    }
    function T(a,
               b, c) {
        Ec(a, b, c);
        b = a.sel;
        var d = a.cm ? a.cm.curOp.id : NaN,
            e = a.history,
            f = c && c.origin,
            g;
        if (!(g = d == e.lastSelOp) && (g = f && e.lastSelOrigin == f) && !(g = e.lastModTime == e.lastSelTime && e.lastOrigin == f)) {
            g = y(e.done);
            var h = f.charAt(0);
            g = "*" == h || "+" == h && g.ranges.length == b.ranges.length && g.somethingSelected() == b.somethingSelected() && new Date - a.history.lastSelTime <= (a.cm ? a.cm.options.historyEventDelay : 500)
        }
        g ? e.done[e.done.length - 1] = b : Cc(b, e.done);
        e.lastSelTime = +new Date;
        e.lastSelOrigin = f;
        e.lastSelOp = d;
        c && !1 !== c.clearRedo &&
        kf(e.undone)
    }
    function Ec(a, b, c) {
        if (ja(a, "beforeSelectionChange") || a.cm && ja(a.cm, "beforeSelectionChange"))
            b = Mg(a, b, c);
        var d = c && c.bias || (0 > x(b.primary().head, a.sel.primary().head) ? -1 : 1);
        pf(a, qf(a, b, d, !0));
        c && !1 === c.scroll || !a.cm || fb(a.cm)
    }
    function pf(a, b) {
        b.equals(a.sel) || (a.sel = b, a.cm && (a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = !0, ge(a.cm)), S(a, "cursorActivity", a))
    }
    function rf(a) {
        pf(a, qf(a, a.sel, null, !1))
    }
    function qf(a, b, c, d) {
        for (var e, f = 0; f < b.ranges.length; f++) {
            var g = b.ranges[f],
                h = b.ranges.length ==
                    a.sel.ranges.length && a.sel.ranges[f],
                k = Kd(a, g.anchor, h && h.anchor, c, d);
            h = Kd(a, g.head, h && h.head, c, d);
            if (e || k != g.anchor || h != g.head)
                e || (e = b.ranges.slice(0, f)), e[f] = new A(k, h)
        }
        return e ? pa(e, b.primIndex) : b
    }
    function jb(a, b, c, d, e) {
        var f = t(a, b.line);
        if (f.markedSpans)
            for (var g = 0; g < f.markedSpans.length; ++g) {
                var h = f.markedSpans[g],
                    k = h.marker;
                if ((null == h.from || (k.inclusiveLeft ? h.from <= b.ch : h.from < b.ch)) && (null == h.to || (k.inclusiveRight ? h.to >= b.ch : h.to > b.ch))) {
                    if (e && (J(k, "beforeCursorEnter"), k.explicitlyCleared))
                        if (f.markedSpans) {
                            --g;
                            continue
                        } else
                            break;
                    if (k.atomic) {
                        if (c) {
                            g = k.find(0 > d ? 1 : -1);
                            h = void 0;
                            if (0 > d ? k.inclusiveRight : k.inclusiveLeft)
                                g = sf(a, g, -d, g && g.line == b.line ? f : null);
                            if (g && g.line == b.line && (h = x(g, c)) && (0 > d ? 0 > h : 0 < h))
                                return jb(a, g, b, d, e)
                        }
                        c = k.find(0 > d ? -1 : 1);
                        if (0 > d ? k.inclusiveLeft : k.inclusiveRight)
                            c = sf(a, c, d, c.line == b.line ? f : null);
                        return c ? jb(a, c, b, d, e) : null
                    }
                }
            }
        return b
    }
    function Kd(a, b, c, d, e) {
        d = d || 1;
        b = jb(a, b, c, d, e) || !e && jb(a, b, c, d, !0) || jb(a, b, c, -d, e) || !e && jb(a, b, c, -d, !0);
        return b ? b : (a.cantEdit = !0, q(a.first, 0))
    }
    function sf(a,
                b, c, d) {
        return 0 > c && 0 == b.ch ? b.line > a.first ? v(a, q(b.line - 1)) : null : 0 < c && b.ch == (d || t(a, b.line)).text.length ? b.line < a.first + a.size - 1 ? q(b.line + 1, 0) : null : new q(b.line, b.ch + c)
    }
    function tf(a) {
        a.setSelection(q(a.firstLine(), 0), q(a.lastLine()), va)
    }
    function uf(a, b, c) {
        var d = {
            canceled: !1,
            from: b.from,
            to: b.to,
            text: b.text,
            origin: b.origin,
            cancel: function () {
                return d.canceled = !0
            }
        };
        c && (d.update = function (b, c, g, h) {
            b && (d.from = v(a, b));
            c && (d.to = v(a, c));
            g && (d.text = g);
            void 0 !== h && (d.origin = h)
        });
        J(a, "beforeChange", a, d);
        a.cm &&
        J(a.cm, "beforeChange", a.cm, d);
        return d.canceled ? null : {
            from: d.from,
            to: d.to,
            text: d.text,
            origin: d.origin
        }
    }
    function kb(a, b, c) {
        if (a.cm) {
            if (!a.cm.curOp)
                return O(a.cm, kb)(a, b, c);
            if (a.cm.state.suppressEdits)
                return
        }
        if (ja(a, "beforeChange") || a.cm && ja(a.cm, "beforeChange"))
            if (b = uf(a, b, !0), !b)
                return;
        if (c = vf && !c && lg(a, b.from, b.to))
            for (var d = c.length - 1; 0 <= d; --d)
                wf(a, {
                    from: c[d].from,
                    to: c[d].to,
                    text: d ? [""] : b.text,
                    origin: b.origin
                });
        else
            wf(a, b)
    }
    function wf(a, b) {
        if (1 != b.text.length || "" != b.text[0] || 0 != x(b.from, b.to)) {
            var c =
                Ed(a, b);
            lf(a, b, c, a.cm ? a.cm.curOp.id : NaN);
            Mb(a, b, c, Xc(a, b));
            var d = [];
            Ya(a, function (a, c) {
                c || -1 != Q(d, a.history) || (xf(a.history, b), d.push(a.history));
                Mb(a, b, null, Xc(a, b))
            })
        }
    }
    function Fc(a, b, c) {
        if (!a.cm || !a.cm.state.suppressEdits || c) {
            for (var d = a.history, e, f = a.sel, g = "undo" == b ? d.done : d.undone, h = "undo" == b ? d.undone : d.done, k = 0; k < g.length && (e = g[k], c ? !e.ranges || e.equals(a.sel) : e.ranges); k++);
            if (k != g.length) {
                for (d.lastOrigin = d.lastSelOrigin = null; ; )
                    if (e = g.pop(), e.ranges) {
                        Cc(e, h);
                        if (c && !e.equals(a.sel)) {
                            T(a, e, {
                                clearRedo: !1
                            });
                            return
                        }
                        f = e
                    } else
                        break;
                var l = [];
                Cc(f, h);
                h.push({
                    changes: l,
                    generation: d.generation
                });
                d.generation = e.generation || ++d.maxGeneration;
                var m = ja(a, "beforeChange") || a.cm && ja(a.cm, "beforeChange");
                c = function (d) {
                    var c = e.changes[d];
                    c.origin = b;
                    if (m && !uf(a, c, !1))
                        return g.length = 0, {};
                    l.push(Hd(a, c));
                    var f = d ? Ed(a, c) : y(g);
                    Mb(a, c, f, mf(a, c));
                    !d && a.cm && a.cm.scrollIntoView({
                        from: c.from,
                        to: Ea(c)
                    });
                    var h = [];
                    Ya(a, function (a, b) {
                        b || -1 != Q(h, a.history) || (xf(a.history, c), h.push(a.history));
                        Mb(a, c, null, mf(a, c))
                    })
                };
                for (d = e.changes.length -
                    1; 0 <= d; --d)
                    if (f = c(d))
                        return f.v
            }
        }
    }
    function yf(a, b) {
        if (0 != b && (a.first += b, a.sel = new ha(hc(a.sel.ranges, function (a) {
            return new A(q(a.anchor.line + b, a.anchor.ch), q(a.head.line + b, a.head.ch))
        }), a.sel.primIndex), a.cm)) {
            Z(a.cm, a.first, a.first - b, b);
            for (var c = a.cm.display, d = c.viewFrom; d < c.viewTo; d++)
                Da(a.cm, d, "gutter")
        }
    }
    function Mb(a, b, c, d) {
        if (a.cm && !a.cm.curOp)
            return O(a.cm, Mb)(a, b, c, d);
        if (b.to.line < a.first)
            yf(a, b.text.length - 1 - (b.to.line - b.from.line));
        else if (!(b.from.line > a.lastLine())) {
            if (b.from.line < a.first) {
                var e =
                    b.text.length - 1 - (a.first - b.from.line);
                yf(a, e);
                b = {
                    from: q(a.first, 0),
                    to: q(b.to.line + e, b.to.ch),
                    text: [y(b.text)],
                    origin: b.origin
                }
            }
            e = a.lastLine();
            b.to.line > e && (b = {
                from: b.from,
                to: q(e, t(a, e).text.length),
                text: [b.text[0]],
                origin: b.origin
            });
            b.removed = Ja(a, b.from, b.to);
            c || (c = Ed(a, b));
            a.cm ? Ng(a.cm, b, d) : Gd(a, b, d);
            Ec(a, c, va)
        }
    }
    function Ng(a, b, c) {
        var d = a.doc,
            e = a.display,
            f = b.from,
            g = b.to,
            h = !1,
            k = f.line;
        a.options.lineWrapping || (k = C(ra(t(d, f.line))), d.iter(k, g.line + 1, function (a) {
            if (a == e.maxLine)
                return h = !0
        }));
        -1 < d.sel.contains(b.from,
            b.to) && ge(a);
        Gd(d, b, c, Me(a));
        a.options.lineWrapping || (d.iter(k, f.line + b.text.length, function (a) {
            var b = mc(a);
            b > e.maxLineLength && (e.maxLine = a, e.maxLineLength = b, e.maxLineChanged = !0, h = !1)
        }), h && (a.curOp.updateMaxLine = !0));
        sg(d, f.line);
        Jb(a, 400);
        c = b.text.length - (g.line - f.line) - 1;
        b.full ? Z(a) : f.line != g.line || 1 != b.text.length || ff(a.doc, b) ? Z(a, f.line, g.line + 1, c) : Da(a, f.line, "text");
        c = ja(a, "changes");
        if ((d = ja(a, "change")) || c)
            b = {
                from: f,
                to: g,
                text: b.text,
                removed: b.removed,
                origin: b.origin
            },
            d && S(a, "change", a, b),
            c && (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push(b);
        a.display.selForContextMenu = null
    }
    function lb(a, b, c, d, e) {
        d || (d = c);
        if (0 > x(d, c)) {
            var f = [d, c];
            c = f[0];
            d = f[1];
            f
        }
        "string" == typeof b && (b = a.splitLines(b));
        kb(a, {
            from: c,
            to: d,
            text: b,
            origin: e
        })
    }
    function zf(a, b, c, d) {
        c < a.line ? a.line += d : b < a.line && (a.line = b, a.ch = 0)
    }
    function Af(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e],
                g = !0;
            if (f.ranges)
                for (f.copied || (f = a[e] = f.deepCopy(), f.copied = !0), g = 0; g < f.ranges.length; g++)
                    zf(f.ranges[g].anchor, b, c, d), zf(f.ranges[g].head,
                        b, c, d);
            else {
                for (var h = 0; h < f.changes.length; ++h) {
                    var k = f.changes[h];
                    if (c < k.from.line)
                        k.from = q(k.from.line + d, k.from.ch), k.to = q(k.to.line + d, k.to.ch);
                    else if (b <= k.to.line) {
                        g = !1;
                        break
                    }
                }
                g || (a.splice(0, e + 1), e = 0)
            }
        }
    }
    function xf(a, b) {
        var c = b.from.line,
            d = b.to.line;
        b = b.text.length - (d - c) - 1;
        Af(a.done, c, d, b);
        Af(a.undone, c, d, b)
    }
    function Nb(a, b, c, d) {
        var e = b,
            f = b;
        "number" == typeof b ? f = t(a, Math.max(a.first, Math.min(b, a.first + a.size - 1))) : e = C(b);
        if (null == e)
            return null;
        d(f, e) && a.cm && Da(a.cm, e, c);
        return f
    }
    function Ob(a) {
        this.lines =
            a;
        this.parent = null;
        for (var b = 0, c = 0; c < a.length; ++c)
            a[c].parent = this, b += a[c].height;
        this.height = b
    }
    function Pb(a) {
        this.children = a;
        for (var b = 0, c = 0, d = 0; d < a.length; ++d) {
            var e = a[d];
            b += e.chunkSize();
            c += e.height;
            e.parent = this
        }
        this.size = b;
        this.height = c;
        this.parent = null
    }
    function Og(a, b, c, d) {
        var e = new Qb(a, c, d),
            f = a.cm;
        f && e.noHScroll && (f.display.alignWidgets = !0);
        Nb(a, b, "widget", function (b) {
            var d = b.widgets || (b.widgets = []);
            null == e.insertAt ? d.push(e) : d.splice(Math.min(d.length - 1, Math.max(0, e.insertAt)), 0, e);
            e.line =
                b;
            f && !Ma(a, b) && (d = sa(b) < a.scrollTop, qa(b, b.height + Cb(e)), d && wc(f, e.height), f.curOp.forceUpdate = !0);
            return !0
        });
        S(f, "lineWidgetAdded", f, e, "number" == typeof b ? b : C(b));
        return e
    }
    function mb(a, b, c, d, e) {
        if (d && d.shared)
            return Pg(a, b, c, d, e);
        if (a.cm && !a.cm.curOp)
            return O(a.cm, mb)(a, b, c, d, e);
        var f = new Fa(a, e);
        e = x(b, c);
        d && Ia(d, f, !1);
        if (0 < e || 0 == e && !1 !== f.clearWhenEmpty)
            return f;
        f.replacedWith && (f.collapsed = !0, f.widgetNode = V("span", [f.replacedWith], "CodeMirror-widget"), d.handleMouseEvents || f.widgetNode.setAttribute("cm-ignore-events",
            "true"), d.insertLeft && (f.widgetNode.insertLeft = !0));
        if (f.collapsed) {
            if (ee(a, b.line, b, c, f) || b.line != c.line && ee(a, c.line, b, c, f))
                throw Error("Inserting collapsed marker partially overlapping an existing one");
            Ba = !0
        }
        f.addToHistory && lf(a, {
            from: b,
            to: c,
            origin: "markText"
        }, a.sel, NaN);
        var g = b.line,
            h = a.cm,
            k;
        a.iter(g, c.line + 1, function (a) {
            h && f.collapsed && !h.options.lineWrapping && ra(a) == h.display.maxLine && (k = !0);
            f.collapsed && g != b.line && qa(a, 0);
            var d = new lc(f, g == b.line ? b.ch : null, g == c.line ? c.ch : null);
            a.markedSpans =
                a.markedSpans ? a.markedSpans.concat([d]) : [d];
            d.marker.attachLine(a);
            ++g
        });
        f.collapsed && a.iter(b.line, c.line + 1, function (b) {
            Ma(a, b) && qa(b, 0)
        });
        f.clearOnEnter && w(f, "beforeCursorEnter", function () {
            return f.clear()
        });
        f.readOnly && (vf = !0, (a.history.done.length || a.history.undone.length) && a.clearHistory());
        f.collapsed && (f.id = ++Bf, f.atomic = !0);
        if (h) {
            k && (h.curOp.updateMaxLine = !0);
            if (f.collapsed)
                Z(h, b.line, c.line + 1);
            else if (f.className || f.title || f.startStyle || f.endStyle || f.css)
                for (d = b.line; d <= c.line; d++)
                    Da(h, d,
                        "text");
            f.atomic && rf(h.doc);
            S(h, "markerAdded", h, f)
        }
        return f
    }
    function Pg(a, b, c, d, e) {
        d = Ia(d);
        d.shared = !1;
        var f = [mb(a, b, c, d, e)],
            g = f[0],
            h = d.widgetNode;
        Ya(a, function (a) {
            h && (d.widgetNode = h.cloneNode(!0));
            f.push(mb(a, v(a, b), v(a, c), d, e));
            for (var k = 0; k < a.linked.length; ++k)
                if (a.linked[k].isParent)
                    return;
            g = y(f)
        });
        return new Rb(f, g)
    }
    function Cf(a) {
        return a.findMarks(q(a.first, 0), a.clipPos(q(a.lastLine())), function (a) {
            return a.parent
        })
    }
    function Qg(a) {
        for (var b = function (b) {
            b = a[b];
            var d = [b.primary.doc];
            Ya(b.primary.doc,
                function (a) {
                    return d.push(a)
                });
            for (var c = 0; c < b.markers.length; c++) {
                var g = b.markers[c];
                -1 == Q(d, g.doc) && (g.parent = null, b.markers.splice(c--, 1))
            }
        }, c = 0; c < a.length; c++)
            b(c)
    }
    function Rg(a) {
        var b = this;
        Df(b);
        if (!N(b, a) && !ya(b.display, a)) {
            Y(a);
            B && (Ef = +new Date);
            var c = Ta(b, a, !0),
                d = a.dataTransfer.files;
            if (c && !b.isReadOnly())
                if (d && d.length && window.FileReader && window.File)
                    for (var e = d.length, f = Array(e), g = 0, h = function (a, d) {
                        if (!b.options.allowDropFileTypes || -1 != Q(b.options.allowDropFileTypes, a.type)) {
                            var h = new FileReader;
                            h.onload = O(b, function () {
                                var a = h.result;
                                /[\x00-\x08\x0e-\x1f]{2}/.test(a) && (a = "");
                                f[d] = a;
                                ++g == e && (c = v(b.doc, c), a = {
                                    from: c,
                                    to: c,
                                    text: b.doc.splitLines(f.join(b.doc.lineSeparator())),
                                    origin: "paste"
                                }, kb(b.doc, a), of(b.doc, za(c, Ea(a))))
                            });
                            h.readAsText(a)
                        }
                    }, k = 0; k < e; ++k)
                        h(d[k], k);
                else if (b.state.draggingText && -1 < b.doc.sel.contains(c))
                    b.state.draggingText(a), setTimeout(function () {
                        return b.display.input.focus()
                    }, 20);
                else
                    try {
                        if (h = a.dataTransfer.getData("Text")) {
                            b.state.draggingText && !b.state.draggingText.copy &&
                            (k = b.listSelections());
                            Ec(b.doc, za(c, c));
                            if (k)
                                for (d = 0; d < k.length; ++d)
                                    lb(b.doc, "", k[d].anchor, k[d].head, "drag");
                            b.replaceSelection(h, "around", "paste");
                            b.display.input.focus()
                        }
                    } catch (l) {}
        }
    }
    function Df(a) {
        a.display.dragCursor && (a.display.lineSpace.removeChild(a.display.dragCursor), a.display.dragCursor = null)
    }
    function Ff(a) {
        if (document.getElementsByClassName)
            for (var b = document.getElementsByClassName("CodeMirror"), c = 0; c < b.length; c++) {
                var d = b[c].CodeMirror;
                d && a(d)
            }
    }
    function Sg() {
        var a;
        w(window, "resize",
            function () {
                null == a && (a = setTimeout(function () {
                    a = null;
                    Ff(Tg)
                }, 100))
            });
        w(window, "blur", function () {
            return Ff(Gb)
        })
    }
    function Tg(a) {
        var b = a.display;
        if (b.lastWrapHeight != b.wrapper.clientHeight || b.lastWrapWidth != b.wrapper.clientWidth)
            b.cachedCharWidth = b.cachedTextHeight = b.cachedPaddingH = null, b.scrollbarsClipped = !1, a.setSize()
    }
    function Ug(a) {
        var b = a.split(/-(?!$)/);
        a = b[b.length - 1];
        for (var c, d, e, f, g = 0; g < b.length - 1; g++) {
            var h = b[g];
            if (/^(cmd|meta|m)$/i.test(h))
                f = !0;
            else if (/^a(lt)?$/i.test(h))
                c = !0;
            else if (/^(c|ctrl|control)$/i.test(h))
                d =
                    !0;
            else if (/^s(hift)?$/i.test(h))
                e = !0;
            else
                throw Error("Unrecognized modifier name: " + h);
        }
        c && (a = "Alt-" + a);
        d && (a = "Ctrl-" + a);
        f && (a = "Cmd-" + a);
        e && (a = "Shift-" + a);
        return a
    }
    function Vg(a) {
        var b = {},
            c;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var d = a[c];
                if (!/^(name|fallthrough|(de|at)tach)$/.test(c)) {
                    if ("..." != d)
                        for (var e = hc(c.split(" "), Ug), f = 0; f < e.length; f++) {
                            if (f == e.length - 1) {
                                var g = e.join(" ");
                                var h = d
                            } else
                                g = e.slice(0, f + 1).join(" "), h = "...";
                            var k = b[g];
                            if (!k)
                                b[g] = h;
                            else if (k != h)
                                throw Error("Inconsistent bindings for " +
                                    g);
                        }
                    delete a[c]
                }
            }
        for (var l in b)
            a[l] = b[l];
        return a
    }
    function nb(a, b, c, d) {
        b = Gc(b);
        var e = b.call ? b.call(a, d) : b[a];
        if (!1 === e)
            return "nothing";
        if ("..." === e)
            return "multi";
        if (null != e && c(e))
            return "handled";
        if (b.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(b.fallthrough))
                return nb(a, b.fallthrough, c, d);
            for (e = 0; e < b.fallthrough.length; e++) {
                var f = nb(a, b.fallthrough[e], c, d);
                if (f)
                    return f
            }
        }
    }
    function Gf(a) {
        a = "string" == typeof a ? a : Ga[a.keyCode];
        return "Ctrl" == a || "Alt" == a || "Shift" == a || "Mod" == a
    }
    function Hf(a,
                b, c) {
        var d = a;
        b.altKey && "Alt" != d && (a = "Alt-" + a);
        (If ? b.metaKey : b.ctrlKey) && "Ctrl" != d && (a = "Ctrl-" + a);
        (If ? b.ctrlKey : b.metaKey) && "Cmd" != d && (a = "Cmd-" + a);
        !c && b.shiftKey && "Shift" != d && (a = "Shift-" + a);
        return a
    }
    function Jf(a, b) {
        if (oa && 34 == a.keyCode && a["char"])
            return !1;
        var c = Ga[a.keyCode];
        return null == c || a.altGraphKey ? !1 : Hf(c, a, b)
    }
    function Gc(a) {
        return "string" == typeof a ? Sb[a] : a
    }
    function ob(a, b) {
        for (var c = a.doc.sel.ranges, d = [], e = 0; e < c.length; e++) {
            for (var f = b(c[e]); d.length && 0 >= x(f.from, y(d).to); ) {
                var g = d.pop();
                if (0 > x(g.from, f.from)) {
                    f.from = g.from;
                    break
                }
            }
            d.push(f)
        }
        ca(a, function () {
            for (var b = d.length - 1; 0 <= b; b--)
                lb(a.doc, "", d[b].from, d[b].to, "+delete");
            fb(a)
        })
    }
    function Ld(a, b, c) {
        b = Zd(a.text, b + c, c);
        return 0 > b || b > a.text.length ? null : b
    }
    function Md(a, b, c) {
        a = Ld(a, b.ch, c);
        return null == a ? null : new q(b.line, a, 0 > c ? "after" : "before")
    }
    function Nd(a, b, c, d, e) {
        if (a && (a = xa(c, b.doc.direction))) {
            a = 0 > e ? y(a) : a[0];
            var f = 0 > e == (1 == a.level) ? "after" : "before";
            if (0 < a.level || "rtl" == b.doc.direction) {
                var g = Qa(b, c);
                var h = 0 > e ? c.text.length -
                    1 : 0;
                var k = ma(b, g, h).top;
                h = rb(function (a) {
                    return ma(b, g, a).top == k
                }, 0 > e == (1 == a.level) ? a.from : a.to - 1, h);
                "before" == f && (h = Ld(c, h, 1))
            } else
                h = 0 > e ? a.to : a.from;
            return new q(d, h, f)
        }
        return new q(d, 0 > e ? c.text.length : 0, 0 > e ? "before" : "after")
    }
    function Wg(a, b, c, d) {
        var e = xa(b, a.doc.direction);
        if (!e)
            return Md(b, c, d);
        c.ch >= b.text.length ? (c.ch = b.text.length, c.sticky = "before") : 0 >= c.ch && (c.ch = 0, c.sticky = "after");
        var f = vb(e, c.ch, c.sticky),
            g = e[f];
        if ("ltr" == a.doc.direction && 0 == g.level % 2 && (0 < d ? g.to > c.ch : g.from < c.ch))
            return Md(b,
                c, d);
        var h = function (a, d) {
                return Ld(b, a instanceof q ? a.ch : a, d)
            },
            k,
            l = function (d) {
                if (!a.options.lineWrapping)
                    return {
                        begin: 0,
                        end: b.text.length
                    };
                k = k || Qa(a, b);
                return Le(a, b, k, d)
            },
            m = l("before" == c.sticky ? h(c, -1) : c.ch);
        if ("rtl" == a.doc.direction || 1 == g.level) {
            var p = 1 == g.level == 0 > d,
                n = h(c, p ? 1 : -1);
            if (null != n && (p ? n <= g.to && n <= m.end : n >= g.from && n >= m.begin))
                return new q(c.line, n, p ? "before" : "after")
        }
        g = function (a, b, d) {
            for (var f = function (a, b) {
                return b ? new q(c.line, h(a, 1), "before") : new q(c.line, a, "after")
            }; 0 <= a && a < e.length; a +=
                     b) {
                var g = e[a],
                    k = 0 < b == (1 != g.level),
                    l = k ? d.begin : h(d.end, -1);
                if (g.from <= l && l < g.to)
                    return f(l, k);
                l = k ? g.from : h(g.to, -1);
                if (d.begin <= l && l < d.end)
                    return f(l, k)
            }
        };
        if (f = g(f + d, d, m))
            return f;
        m = 0 < d ? m.end : h(m.begin, -1);
        return null == m || 0 < d && m == b.text.length || !(f = g(0 < d ? 0 : e.length - 1, d, l(m))) ? null : f
    }
    function Kf(a, b) {
        var c = t(a.doc, b),
            d = ra(c);
        d != c && (b = C(d));
        return Nd(!0, a, d, b, 1)
    }
    function Lf(a, b) {
        var c = Kf(a, b.line),
            d = t(a.doc, c.line);
        a = xa(d, a.doc.direction);
        return a && 0 != a[0].level ? c : (d = Math.max(0, d.text.search(/\S/)),
            q(c.line, b.line == c.line && b.ch <= d && b.ch ? 0 : d, c.sticky))
    }
    function Hc(a, b, c) {
        if ("string" == typeof b && (b = Tb[b], !b))
            return !1;
        a.display.input.ensurePolled();
        var d = a.display.shift,
            e = !1;
        try {
            a.isReadOnly() && (a.state.suppressEdits = !0),
            c && (a.display.shift = !1),
                e = b(a) != Ic
        }
        finally {
            a.display.shift = d,
                a.state.suppressEdits = !1
        }
        return e
    }
    function Ub(a, b, c, d) {
        var e = a.state.keySeq;
        if (e) {
            if (Gf(b))
                return "handled";
            /'$/.test(b) ? a.state.keySeq = null : Xg.set(50, function () {
                a.state.keySeq == e && (a.state.keySeq = null, a.display.input.reset())
            });
            if (Mf(a, e + " " + b, c, d))
                return !0
        }
        return Mf(a, b, c, d)
    }
    function Mf(a, b, c, d) {
        a: {
            for (var e = 0; e < a.state.keyMaps.length; e++) {
                var f = nb(b, a.state.keyMaps[e], d, a);
                if (f) {
                    d = f;
                    break a
                }
            }
            d = a.options.extraKeys && nb(b, a.options.extraKeys, d, a) || nb(b, a.options.keyMap, d, a)
        }
        "multi" == d && (a.state.keySeq = b);
        "handled" == d && S(a, "keyHandled", a, b, c);
        if ("handled" == d || "multi" == d)
            Y(c), vd(a);
        return !!d
    }
    function Nf(a, b) {
        var c = Jf(b, !0);
        return c ? b.shiftKey && !a.state.keySeq ? Ub(a, "Shift-" + c, b, function (b) {
            return Hc(a, b, !0)
        }) || Ub(a, c, b, function (b) {
            if ("string" ==
            typeof b ? /^go[A-Z]/.test(b) : b.motion)
                return Hc(a, b)
        }) : Ub(a, c, b, function (b) {
            return Hc(a, b)
        }) : !1
    }
    function Yg(a, b, c) {
        return Ub(a, "'" + c + "'", b, function (b) {
            return Hc(a, b, !0)
        })
    }
    function Of(a) {
        this.curOp.focus = wa();
        if (!N(this, a)) {
            B && 11 > F && 27 == a.keyCode && (a.returnValue = !1);
            var b = a.keyCode;
            this.display.shift = 16 == b || a.shiftKey;
            var c = Nf(this, a);
            oa && (Od = c ? b : null, !c && 88 == b && !Zg && (la ? a.metaKey : a.ctrlKey) && this.replaceSelection("", null, "cut"));
            18 != b || /\bCodeMirror-crosshair\b/.test(this.display.lineDiv.className) ||
            $g(this)
        }
    }
    function $g(a) {
        function b(a) {
            18 != a.keyCode && a.altKey || (Ua(c, "CodeMirror-crosshair"), ea(document, "keyup", b), ea(document, "mouseover", b))
        }
        var c = a.display.lineDiv;
        Ha(c, "CodeMirror-crosshair");
        w(document, "keyup", b);
        w(document, "mouseover", b)
    }
    function Pf(a) {
        16 == a.keyCode && (this.doc.sel.shift = !1);
        N(this, a)
    }
    function Qf(a) {
        if (!(ya(this.display, a) || N(this, a) || a.ctrlKey && !a.altKey || la && a.metaKey)) {
            var b = a.keyCode,
                c = a.charCode;
            if (oa && b == Od)
                Od = null, Y(a);
            else if (!oa || a.which && !(10 > a.which) || !Nf(this, a))
                if (b =
                    String.fromCharCode(null == c ? b : c), "\b" != b && !Yg(this, a, b))
                    this.display.input.onKeyPress(a)
        }
    }
    function ah(a, b) {
        var c = +new Date;
        if (Vb && Vb.compare(c, a, b))
            return Wb = Vb = null, "triple";
        if (Wb && Wb.compare(c, a, b))
            return Vb = new Pd(c, a, b), Wb = null, "double";
        Wb = new Pd(c, a, b);
        Vb = null;
        return "single"
    }
    function Rf(a) {
        var b = this.display;
        if (!(N(this, a) || b.activeTouch && b.input.supportsTouch()))
            if (b.input.ensurePolled(), b.shift = a.shiftKey, ya(b, a))
                U || (b.scroller.draggable = !1, setTimeout(function () {
                    return b.scroller.draggable =
                        !0
                }, 100));
            else if (!Jc(this, a, "gutterClick", !0)) {
                var c = Ta(this, a),
                    d = ie(a),
                    e = c ? ah(c, d) : "single";
                window.focus();
                1 == d && this.state.selectingText && this.state.selectingText(a);
                c && bh(this, d, c, e, a) || (1 == d ? c ? ch(this, c, e, a) : (a.target || a.srcElement) == b.scroller && Y(a) : 2 == d ? (c && Dc(this.doc, c), setTimeout(function () {
                    return b.input.focus()
                }, 20)) : 3 == d && (Qd ? Sf(this, a) : Qe(this)))
            }
    }
    function bh(a, b, c, d, e) {
        var f = "Click";
        "double" == d ? f = "Double" + f : "triple" == d && (f = "Triple" + f);
        return Ub(a, Hf((1 == b ? "Left" : 2 == b ? "Middle" : "Right") +
            f, e), e, function (b) {
            "string" == typeof b && (b = Tb[b]);
            if (!b)
                return !1;
            var d = !1;
            try {
                a.isReadOnly() && (a.state.suppressEdits = !0),
                    d = b(a, c) != Ic
            }
            finally {
                a.state.suppressEdits = !1
            }
            return d
        })
    }
    function ch(a, b, c, d) {
        B ? setTimeout(Oc(Pe, a), 0) : a.curOp.focus = wa();
        var e = a.getOption("configureMouse");
        e = e ? e(a, c, d) : {};
        null == e.unit && (e.unit = (dh ? d.shiftKey && d.metaKey : d.altKey) ? "rectangle" : "single" == c ? "char" : "double" == c ? "word" : "line");
        if (null == e.extend || a.doc.extend)
            e.extend = a.doc.extend || d.shiftKey;
        null == e.addNew && (e.addNew =
            la ? d.metaKey : d.ctrlKey);
        null == e.moveOnDrag && (e.moveOnDrag = !(la ? d.altKey : d.ctrlKey));
        var f = a.doc.sel,
            g;
        a.options.dragDrop && eh && !a.isReadOnly() && "single" == c && -1 < (g = f.contains(b)) && (0 > x((g = f.ranges[g]).from(), b) || 0 < b.xRel) && (0 < x(g.to(), b) || 0 > b.xRel) ? fh(a, d, b, e) : gh(a, d, b, e)
    }
    function fh(a, b, c, d) {
        var e = a.display,
            f = !1,
            g = O(a, function (b) {
                U && (e.scroller.draggable = !1);
                a.state.draggingText = !1;
                ea(document, "mouseup", g);
                ea(document, "mousemove", h);
                ea(e.scroller, "dragstart", k);
                ea(e.scroller, "drop", g);
                f || (Y(b), d.addNew ||
                Dc(a.doc, c, null, null, d.extend), U || B && 9 == F ? setTimeout(function () {
                    document.body.focus();
                    e.input.focus()
                }, 20) : e.input.focus())
            }),
            h = function (a) {
                f = f || 10 <= Math.abs(b.clientX - a.clientX) + Math.abs(b.clientY - a.clientY)
            },
            k = function () {
                return f = !0
            };
        U && (e.scroller.draggable = !0);
        a.state.draggingText = g;
        g.copy = !d.moveOnDrag;
        e.scroller.dragDrop && e.scroller.dragDrop();
        w(document, "mouseup", g);
        w(document, "mousemove", h);
        w(e.scroller, "dragstart", k);
        w(e.scroller, "drop", g);
        Qe(a);
        setTimeout(function () {
                return e.input.focus()
            },
            20)
    }
    function Tf(a, b, c) {
        if ("char" == c)
            return new A(b, b);
        if ("word" == c)
            return a.findWordAt(b);
        if ("line" == c)
            return new A(q(b.line, 0), v(a.doc, q(b.line + 1, 0)));
        a = c(a, b);
        return new A(a.from, a.to)
    }
    function gh(a, b, c, d) {
        function e(b) {
            if (0 != x(r, b))
                if (r = b, "rectangle" == d.unit) {
                    var e = [],
                        f = a.options.tabSize,
                        g = ia(t(k, c.line).text, c.ch, f),
                        h = ia(t(k, b.line).text, b.ch, f),
                        m = Math.min(g, h);
                    g = Math.max(g, h);
                    h = Math.min(c.line, b.line);
                    for (var u = Math.min(a.lastLine(), Math.max(c.line, b.line)); h <= u; h++) {
                        var L = t(k, h).text,
                            w = Pc(L,
                                m, f);
                        m == g ? e.push(new A(q(h, w), q(h, w))) : L.length > w && e.push(new A(q(h, w), q(h, Pc(L, g, f))))
                    }
                    e.length || e.push(new A(c, c));
                    T(k, pa(l.ranges.slice(0, p).concat(e), p), {
                        origin: "*mouse",
                        scroll: !1
                    });
                    a.scrollIntoView(b)
                } else
                    e = n, m = Tf(a, b, d.unit), b = e.anchor, 0 < x(m.anchor, b) ? (f = m.head, b = kc(e.from(), m.anchor)) : (f = m.anchor, b = jc(e.to(), m.head)), e = l.ranges.slice(0), e[p] = hh(a, new A(v(k, b), f)), T(k, pa(e, p), Rd)
        }
        function f(b) {
            var c = ++y,
                g = Ta(a, b, !0, "rectangle" == d.unit);
            if (g)
                if (0 != x(g, r)) {
                    a.curOp.focus = wa();
                    e(g);
                    var l = xd(h,
                        k);
                    (g.line >= l.to || g.line < l.from) && setTimeout(O(a, function () {
                        y == c && f(b)
                    }), 150)
                } else {
                    var m = b.clientY < u.top ? -20 : b.clientY > u.bottom ? 20 : 0;
                    m && setTimeout(O(a, function () {
                        y == c && (h.scroller.scrollTop += m, f(b))
                    }), 50)
                }
        }
        function g(b) {
            a.state.selectingText = !1;
            y = Infinity;
            Y(b);
            h.input.focus();
            ea(document, "mousemove", z);
            ea(document, "mouseup", B);
            k.history.lastSelOrigin = null
        }
        var h = a.display,
            k = a.doc;
        Y(b);
        var l = k.sel,
            m = l.ranges;
        if (d.addNew && !d.extend) {
            var p = k.sel.contains(c);
            var n = -1 < p ? m[p] : new A(c, c)
        } else
            n = k.sel.primary(),
                p = k.sel.primIndex;
        "rectangle" == d.unit ? (d.addNew || (n = new A(c, c)), c = Ta(a, b, !0, !0), p = -1) : (b = Tf(a, c, d.unit), n = d.extend ? Id(n, b.anchor, b.head, d.extend) : b);
        d.addNew ? -1 == p ? (p = m.length, T(k, pa(m.concat([n]), p), {
            scroll: !1,
            origin: "*mouse"
        })) : 1 < m.length && m[p].empty() && "char" == d.unit && !d.extend ? (T(k, pa(m.slice(0, p).concat(m.slice(p + 1)), 0), {
            scroll: !1,
            origin: "*mouse"
        }), l = k.sel) : Jd(k, p, n, Rd) : (p = 0, T(k, new ha([n], 0), Rd), l = k.sel);
        var r = c,
            u = h.wrapper.getBoundingClientRect(),
            y = 0,
            z = O(a, function (a) {
                ie(a) ? f(a) : g(a)
            }),
            B = O(a,
                g);
        a.state.selectingText = B;
        w(document, "mousemove", z);
        w(document, "mouseup", B)
    }
    function hh(a, b) {
        var c = b.anchor,
            d = b.head,
            e = t(a.doc, c.line);
        if (0 == x(c, d) && c.sticky == d.sticky)
            return b;
        e = xa(e);
        if (!e)
            return b;
        var f = vb(e, c.ch, c.sticky),
            g = e[f];
        if (g.from != c.ch && g.to != c.ch)
            return b;
        var h = f + (g.from == c.ch == (1 != g.level) ? 0 : 1);
        if (0 == h || h == e.length)
            return b;
        d.line != c.line ? a = 0 < (d.line - c.line) * ("ltr" == a.doc.direction ? 1 : -1) : (a = vb(e, d.ch, d.sticky), f = a - f || (d.ch - c.ch) * (1 == g.level ? -1 : 1), a = a == h - 1 || a == h ? 0 > f : 0 < f);
        e = e[h + (a ? -1 :
            0)];
        e = (h = a == (1 == e.level)) ? e.from : e.to;
        h = h ? "after" : "before";
        return c.ch == e && c.sticky == h ? b : new A(new q(c.line, e, h), d)
    }
    function Jc(a, b, c, d) {
        if (b.touches) {
            var e = b.touches[0].clientX;
            var f = b.touches[0].clientY
        } else
            try {
                e = b.clientX,
                    f = b.clientY
            } catch (k) {
                return !1
            }
        if (e >= Math.floor(a.display.gutters.getBoundingClientRect().right))
            return !1;
        d && Y(b);
        d = a.display;
        var g = d.lineDiv.getBoundingClientRect();
        if (f > g.bottom || !ja(a, c))
            return ad(b);
        f -= g.top - d.viewOffset;
        for (g = 0; g < a.options.gutters.length; ++g) {
            var h = d.gutters.childNodes[g];
            if (h && h.getBoundingClientRect().right >= e)
                return e = Ka(a.doc, f), J(a, c, a, e, a.options.gutters[g], b), ad(b)
        }
    }
    function Sf(a, b) {
        var c;
        (c = ya(a.display, b)) || (c = ja(a, "gutterContextMenu") ? Jc(a, b, "gutterContextMenu", !1) : !1);
        if (!c && !N(a, b, "contextmenu"))
            a.display.input.onContextMenu(b)
    }
    function Uf(a) {
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        Eb(a)
    }
    function Xb(a) {
        af(a);
        Z(a);
        Se(a)
    }
    function ih(a, b, c) {
        !b != !(c && c != pb) && (c = a.display.dragFunctions,
            b = b ? w : ea, b(a.display.scroller, "dragstart", c.start), b(a.display.scroller, "dragenter", c.enter), b(a.display.scroller, "dragover", c.over), b(a.display.scroller, "dragleave", c.leave), b(a.display.scroller, "drop", c.drop))
    }
    function jh(a) {
        a.options.lineWrapping ? (Ha(a.display.wrapper, "CodeMirror-wrap"), a.display.sizer.style.minWidth = "", a.display.sizerWidth = null) : (Ua(a.display.wrapper, "CodeMirror-wrap"), $c(a));
        ud(a);
        Z(a);
        Eb(a);
        setTimeout(function () {
            return gb(a)
        }, 100)
    }
    function G(a, b) {
        var c = this;
        if (!(this instanceof
            G))
            return new G(a, b);
        this.options = b = b ? Ia(b) : {};
        Ia(Vf, b, !1);
        Dd(b);
        var d = b.value;
        "string" == typeof d && (d = new aa(d, b.mode, null, b.lineSeparator, b.direction));
        this.doc = d;
        var e = new G.inputStyles[b.inputStyle](this);
        a = this.display = new kg(a, d, e);
        a.wrapper.CodeMirror = this;
        af(this);
        Uf(this);
        b.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
        Xe(this);
        this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            delayingBlurEvent: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            cutIncoming: !1,
            selectingText: !1,
            draggingText: !1,
            highlight: new Za,
            keySeq: null,
            specialChars: null
        };
        b.autofocus && !sb && a.input.focus();
        B && 11 > F && setTimeout(function () {
            return c.display.input.reset(!0)
        }, 20);
        kh(this);
        Wf || (Sg(), Wf = !0);
        Wa(this);
        this.curOp.forceUpdate = !0;
        gf(this, d);
        b.autofocus && !sb || this.hasFocus() ? setTimeout(Oc(wd, this), 20) : Gb(this);
        for (var f in Kc)
            if (Kc.hasOwnProperty(f))
                Kc[f](c, b[f], pb);
        Te(this);
        b.finishInit && b.finishInit(this);
        for (d = 0; d < Sd.length; ++d)
            Sd[d](c);
        Xa(this);
        U && b.lineWrapping && "optimizelegibility" == getComputedStyle(a.lineDiv).textRendering &&
        (a.lineDiv.style.textRendering = "auto")
    }
    function kh(a) {
        function b() {
            d.activeTouch && (e = setTimeout(function () {
                return d.activeTouch = null
            }, 1E3), f = d.activeTouch, f.end = +new Date)
        }
        function c(a, b) {
            if (null == b.left)
                return !0;
            var d = b.left - a.left;
            a = b.top - a.top;
            return 400 < d * d + a * a
        }
        var d = a.display;
        w(d.scroller, "mousedown", O(a, Rf));
        B && 11 > F ? w(d.scroller, "dblclick", O(a, function (b) {
            if (!N(a, b)) {
                var d = Ta(a, b);
                !d || Jc(a, b, "gutterClick", !0) || ya(a.display, b) || (Y(b), b = a.findWordAt(d), Dc(a.doc, b.anchor, b.head))
            }
        })) : w(d.scroller,
            "dblclick", function (b) {
                return N(a, b) || Y(b)
            });
        Qd || w(d.scroller, "contextmenu", function (b) {
            return Sf(a, b)
        });
        var e,
            f = {
                end: 0
            };
        w(d.scroller, "touchstart", function (b) {
            var c;
            if (c = !N(a, b))
                1 != b.touches.length ? c = !1 : (c = b.touches[0], c = 1 >= c.radiusX && 1 >= c.radiusY), c = !c;
            c && !Jc(a, b, "gutterClick", !0) && (d.input.ensurePolled(), clearTimeout(e), c = +new Date, d.activeTouch = {
                start: c,
                moved: !1,
                prev: 300 >= c - f.end ? f : null
            }, 1 == b.touches.length && (d.activeTouch.left = b.touches[0].pageX, d.activeTouch.top = b.touches[0].pageY))
        });
        w(d.scroller,
            "touchmove", function () {
                d.activeTouch && (d.activeTouch.moved = !0)
            });
        w(d.scroller, "touchend", function (e) {
            var f = d.activeTouch;
            if (f && !ya(d, e) && null != f.left && !f.moved && 300 > new Date - f.start) {
                var g = a.coordsChar(d.activeTouch, "page");
                f = !f.prev || c(f, f.prev) ? new A(g, g) : !f.prev.prev || c(f, f.prev.prev) ? a.findWordAt(g) : new A(q(g.line, 0), v(a.doc, q(g.line + 1, 0)));
                a.setSelection(f.anchor, f.head);
                a.focus();
                Y(e)
            }
            b()
        });
        w(d.scroller, "touchcancel", b);
        w(d.scroller, "scroll", function () {
            d.scroller.clientHeight && (Ib(a, d.scroller.scrollTop),
                Va(a, d.scroller.scrollLeft, !0), J(a, "scroll", a))
        });
        w(d.scroller, "mousewheel", function (b) {
            return cf(a, b)
        });
        w(d.scroller, "DOMMouseScroll", function (b) {
            return cf(a, b)
        });
        w(d.wrapper, "scroll", function () {
            return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0
        });
        d.dragFunctions = {
            enter: function (b) {
                N(a, b) || xb(b)
            },
            over: function (b) {
                if (!N(a, b)) {
                    var d = Ta(a, b);
                    if (d) {
                        var c = document.createDocumentFragment();
                        Oe(a, d, c);
                        a.display.dragCursor || (a.display.dragCursor = u("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), a.display.lineSpace.insertBefore(a.display.dragCursor,
                            a.display.cursorDiv));
                        E(a.display.dragCursor, c)
                    }
                    xb(b)
                }
            },
            start: function (b) {
                if (B && (!a.state.draggingText || 100 > +new Date - Ef))
                    xb(b);
                else if (!N(a, b) && !ya(a.display, b) && (b.dataTransfer.setData("Text", a.getSelection()), b.dataTransfer.effectAllowed = "copyMove", b.dataTransfer.setDragImage && !Xf)) {
                    var d = u("img", null, null, "position: fixed; left: 0; top: 0;");
                    d.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                    oa && (d.width = d.height = 1, a.display.wrapper.appendChild(d), d._top = d.offsetTop);
                    b.dataTransfer.setDragImage(d, 0, 0);
                    oa && d.parentNode.removeChild(d)
                }
            },
            drop: O(a, Rg),
            leave: function (b) {
                N(a, b) || Df(a)
            }
        };
        var g = d.input.getField();
        w(g, "keyup", function (b) {
            return Pf.call(a, b)
        });
        w(g, "keydown", O(a, Of));
        w(g, "keypress", O(a, Qf));
        w(g, "focus", function (b) {
            return wd(a, b)
        });
        w(g, "blur", function (b) {
            return Gb(a, b)
        })
    }
    function Yb(a, b, c, d) {
        var e = a.doc,
            f;
        null == c && (c = "add");
        "smart" == c && (e.mode.indent ? f = yb(a, b).state : c = "prev");
        var g = a.options.tabSize,
            h = t(e, b),
            k = ia(h.text, null, g);
        h.stateAfter && (h.stateAfter =
            null);
        var l = h.text.match(/^\s*/)[0];
        if (!d && !/\S/.test(h.text)) {
            var m = 0;
            c = "not"
        } else if ("smart" == c && (m = e.mode.indent(f, h.text.slice(l.length), h.text), m == Ic || 150 < m)) {
            if (!d)
                return;
            c = "prev"
        }
        "prev" == c ? m = b > e.first ? ia(t(e, b - 1).text, null, g) : 0 : "add" == c ? m = k + a.options.indentUnit : "subtract" == c ? m = k - a.options.indentUnit : "number" == typeof c && (m = k + c);
        m = Math.max(0, m);
        c = "";
        d = 0;
        if (a.options.indentWithTabs)
            for (a = Math.floor(m / g); a; --a)
                d += g, c += "\t";
        d < m && (c += Qc(m - d));
        if (c != l)
            return lb(e, c, q(b, 0), q(b, l.length), "+input"),
                h.stateAfter = null, !0;
        for (g = 0; g < e.sel.ranges.length; g++)
            if (h = e.sel.ranges[g], h.head.line == b && h.head.ch < l.length) {
                b = q(b, l.length);
                Jd(e, g, new A(b, b));
                break
            }
    }
    function Td(a, b, c, d, e) {
        var f = a.doc;
        a.display.shift = !1;
        d || (d = f.sel);
        var g = a.state.pasteIncoming || "paste" == e,
            h = Ud(b),
            k = null;
        if (g && 1 < d.ranges.length)
            if (da && da.text.join("\n") == b) {
                if (0 == d.ranges.length % da.text.length) {
                    k = [];
                    for (var l = 0; l < da.text.length; l++)
                        k.push(f.splitLines(da.text[l]))
                }
            } else
                h.length == d.ranges.length && a.options.pasteLinesPerSelection &&
                (k = hc(h, function (a) {
                    return [a]
                }));
        for (l = d.ranges.length - 1; 0 <= l; l--) {
            var m = d.ranges[l];
            var p = m.from(),
                n = m.to();
            m.empty() && (c && 0 < c ? p = q(p.line, p.ch - c) : a.state.overwrite && !g ? n = q(n.line, Math.min(t(f, n.line).text.length, n.ch + y(h).length)) : da && da.lineWise && da.text.join("\n") == b && (p = n = q(p.line, 0)));
            m = a.curOp.updateInput;
            p = {
                from: p,
                to: n,
                text: k ? k[l % k.length] : h,
                origin: e || (g ? "paste" : a.state.cutIncoming ? "cut" : "+input")
            };
            kb(a.doc, p);
            S(a, "inputRead", a, p)
        }
        b && !g && Yf(a, b);
        fb(a);
        a.curOp.updateInput = m;
        a.curOp.typing = !0;
        a.state.pasteIncoming = a.state.cutIncoming = !1
    }
    function Zf(a, b) {
        var c = a.clipboardData && a.clipboardData.getData("Text");
        if (c)
            return a.preventDefault(), b.isReadOnly() || b.options.disableInput || ca(b, function () {
                return Td(b, c, 0, null, "paste")
            }), !0
    }
    function Yf(a, b) {
        if (a.options.electricChars && a.options.smartIndent)
            for (var c = a.doc.sel, d = c.ranges.length - 1; 0 <= d; d--) {
                var e = c.ranges[d];
                if (!(100 < e.head.ch || d && c.ranges[d - 1].head.line == e.head.line)) {
                    var f = a.getModeAt(e.head),
                        g = !1;
                    if (f.electricChars)
                        for (var h = 0; h < f.electricChars.length; h++) {
                            if (-1 <
                                b.indexOf(f.electricChars.charAt(h))) {
                                g = Yb(a, e.head.line, "smart");
                                break
                            }
                        }
                    else
                        f.electricInput && f.electricInput.test(t(a.doc, e.head.line).text.slice(0, e.head.ch)) && (g = Yb(a, e.head.line, "smart"));
                    g && S(a, "electricInput", a, e.head.line)
                }
            }
    }
    function $f(a) {
        for (var b = [], c = [], d = 0; d < a.doc.sel.ranges.length; d++) {
            var e = a.doc.sel.ranges[d].head.line;
            e = {
                anchor: q(e, 0),
                head: q(e + 1, 0)
            };
            c.push(e);
            b.push(a.getRange(e.anchor, e.head))
        }
        return {
            text: b,
            ranges: c
        }
    }
    function ag(a, b) {
        a.setAttribute("autocorrect", "off");
        a.setAttribute("autocapitalize",
            "off");
        a.setAttribute("spellcheck", !!b)
    }
    function bg() {
        var a = u("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            b = u("div", [a], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        U ? a.style.width = "1000px" : a.setAttribute("wrap", "off");
        Zb && (a.style.border = "1px solid black");
        ag(a);
        return b
    }
    function Vd(a, b, c, d, e) {
        function f(d) {
            var f = e ? Wg(a.cm, k, b, c) : Md(k, b, c);
            if (null == f) {
                if (d = !d)
                    d = b.line + c, d < a.first || d >= a.first + a.size ? d = !1 : (b =
                        new q(d, b.ch, b.sticky), d = k = t(a, d));
                if (d)
                    b = Nd(e, a.cm, k, b.line, c);
                else
                    return !1
            } else
                b = f;
            return !0
        }
        var g = b,
            h = c,
            k = t(a, b.line);
        if ("char" == d)
            f();
        else if ("column" == d)
            f(!0);
        else if ("word" == d || "group" == d) {
            var l = null;
            d = "group" == d;
            for (var m = a.cm && a.cm.getHelper(b, "wordChars"), p = !0; !(0 > c) || f(!p); p = !1) {
                var n = k.text.charAt(b.ch) || "\n";
                n = ic(n, m) ? "w" : d && "\n" == n ? "n" : !d || /\s/.test(n) ? null : "p";
                !d || p || n || (n = "s");
                if (l && l != n) {
                    0 > c && (c = 1, f(), b.sticky = "after");
                    break
                }
                n && (l = n);
                if (0 < c && !f(!p))
                    break
            }
        }
        h = Kd(a, b, g, h, !0);
        Vc(g, h) &&
        (h.hitSide = !0);
        return h
    }
    function cg(a, b, c, d) {
        var e = a.doc,
            f = b.left;
        if ("page" == d) {
            var g = Math.max(Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight) - .5 * Ra(a.display), 3);
            g = (0 < c ? b.bottom : b.top) + c * g
        } else
            "line" == d && (g = 0 < c ? b.bottom + 3 : b.top - 3);
        for (; ; ) {
            b = rd(a, f, g);
            if (!b.outside)
                break;
            if (0 > c ? 0 >= g : g >= e.height) {
                b.hitSide = !0;
                break
            }
            g += 5 * c
        }
        return b
    }
    function dg(a, b) {
        var c = ld(a, b.line);
        if (!c || c.hidden)
            return null;
        var d = t(a.doc, b.line);
        c = Be(c, d, b.line);
        a = xa(d, a.doc.direction);
        d = "left";
        a && (d = vb(a, b.ch) % 2 ? "right" : "left");
        b = Ce(c.map, b.ch, d);
        b.offset = "right" == b.collapse ? b.end : b.start;
        return b
    }
    function lh(a) {
        for (; a; a = a.parentNode)
            if (/CodeMirror-gutter-wrapper/.test(a.className))
                return !0;
        return !1
    }
    function qb(a, b) {
        b && (a.bad = !0);
        return a
    }
    function mh(a, b, c, d, e) {
        function f(a) {
            return function (b) {
                return b.id == a
            }
        }
        function g(a) {
            a && (l && (k += m, l = !1), k += a)
        }
        function h(b) {
            if (1 == b.nodeType) {
                var c = b.getAttribute("cm-text");
                if (null != c)
                    g(c || b.textContent.replace(/\u200b/g, ""));
                else {
                    c = b.getAttribute("cm-marker");
                    var p;
                    if (c)
                        b = a.findMarks(q(d, 0), q(e + 1, 0), f(+c)), b.length && (p = b[0].find(0)) && g(Ja(a.doc, p.from, p.to).join(m));
                    else if ("false" != b.getAttribute("contenteditable")) {
                        (p = /^(pre|div|p)$/i.test(b.nodeName)) && l && (k += m, l = !1);
                        for (c = 0; c < b.childNodes.length; c++)
                            h(b.childNodes[c]);
                        p && (l = !0)
                    }
                }
            } else
                3 == b.nodeType && g(b.nodeValue)
        }
        for (var k = "", l = !1, m = a.doc.lineSeparator(); ; ) {
            h(b);
            if (b == c)
                break;
            b = b.nextSibling
        }
        return k
    }
    function Lc(a, b, c) {
        if (b == a.display.lineDiv) {
            var d = a.display.lineDiv.childNodes[c];
            if (!d)
                return qb(a.clipPos(q(a.display.viewTo -
                    1)), !0);
            b = null;
            c = 0
        } else
            for (d = b; ; d = d.parentNode) {
                if (!d || d == a.display.lineDiv)
                    return null;
                if (d.parentNode && d.parentNode == a.display.lineDiv)
                    break
            }
        for (var e = 0; e < a.display.view.length; e++) {
            var f = a.display.view[e];
            if (f.node == d)
                return nh(f, b, c)
        }
    }
    function nh(a, b, c) {
        function d(b, d, c) {
            for (var e = -1; e < (l ? l.length : 0); e++)
                for (var f = 0 > e ? k.map : l[e], g = 0; g < f.length; g += 3) {
                    var h = f[g + 2];
                    if (h == b || h == d) {
                        d = C(0 > e ? a.line : a.rest[e]);
                        e = f[g] + c;
                        if (0 > c || h != b)
                            e = f[g + (c ? 1 : 0)];
                        return q(d, e)
                    }
                }
        }
        var e = a.text.firstChild,
            f = !1;
        if (!b || !ka(e,
            b))
            return qb(q(C(a.line), 0), !0);
        if (b == e && (f = !0, b = e.childNodes[c], c = 0, !b))
            return c = a.rest ? y(a.rest) : a.line, qb(q(C(c), c.text.length), f);
        var g = 3 == b.nodeType ? b : null,
            h = b;
        g || 1 != b.childNodes.length || 3 != b.firstChild.nodeType || (g = b.firstChild, c && (c = g.nodeValue.length));
        for (; h.parentNode != e; )
            h = h.parentNode;
        var k = a.measure,
            l = k.maps;
        if (b = d(g, h, c))
            return qb(b, f);
        e = h.nextSibling;
        for (g = g ? g.nodeValue.length - c : 0; e; e = e.nextSibling) {
            if (b = d(e, e.firstChild, 0))
                return qb(q(b.line, b.ch - g), f);
            g += e.textContent.length
        }
        for (h =
                 h.previousSibling; h; h = h.previousSibling) {
            if (b = d(h, h.firstChild, -1))
                return qb(q(b.line, b.ch + c), f);
            c += h.textContent.length
        }
    }
    var X = navigator.userAgent,
        eg = navigator.platform,
        Aa = /gecko\/\d/i.test(X),
        fg = /MSIE \d/.test(X),
        gg = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(X),
        $b = /Edge\/(\d+)/.exec(X),
        B = fg || gg || $b,
        F = B && (fg ? document.documentMode || 6 :  + ($b || gg)[1]),
        U = !$b && /WebKit\//.test(X),
        oh = U && /Qt\/\d+\.\d+/.test(X),
        rc = !$b && /Chrome\//.test(X),
        oa = /Opera\//.test(X),
        Xf = /Apple Computer/.test(navigator.vendor),
        ph =
            /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(X),
        Gg = /PhantomJS/.test(X),
        Zb = !$b && /AppleWebKit/.test(X) && /Mobile\/\w+/.test(X),
        sc = /Android/.test(X),
        sb = Zb || sc || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(X),
        la = Zb || /Mac/.test(eg),
        dh = /\bCrOS\b/.test(X),
        qh = /win/i.test(eg),
        $a = oa && X.match(/Version\/(\d*\.\d*)/);
    $a && ($a = Number($a[1]));
    $a && 15 <= $a && (oa = !1, U = !0);
    var If = la && (oh || oa && (null == $a || 12.11 > $a)),
        Qd = Aa || B && 9 <= F,
        Ua = function (a, b) {
            var c = a.className;
            if (b = z(b).exec(c)) {
                var d = c.slice(b.index + b[0].length);
                a.className = c.slice(0, b.index) + (d ? b[1] + d : "")
            }
        };
    var zb = document.createRange ? function (a, b, c, d) {
            var e = document.createRange();
            e.setEnd(d || a, c);
            e.setStart(a, b);
            return e
        }
        : function (a, b, c) {
            var d = document.body.createTextRange();
            try {
                d.moveToElementText(a.parentNode)
            } catch (e) {
                return d
            }
            d.collapse(!0);
            d.moveEnd("character", c);
            d.moveStart("character", b);
            return d
        };
    var ac = function (a) {
        a.select()
    };
    Zb ? ac = function (a) {
            a.selectionStart = 0;
            a.selectionEnd = a.value.length
        }
        : B && (ac = function (a) {
        try {
            a.select()
        } catch (b) {}
    });
    var Za =
        function () {
            this.id = null
        };
    Za.prototype.set = function (a, b) {
        clearTimeout(this.id);
        this.id = setTimeout(b, a)
    };
    var Ic = {
            toString: function () {
                return "CodeMirror.Pass"
            }
        },
        va = {
            scroll: !1
        },
        Rd = {
            origin: "*mouse"
        },
        bc = {
            origin: "+move"
        },
        gc = [""],
        ig = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        jg = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
        vf = !1,
        Ba = !1,
        wb = null,
        ng = function () {
            function a(a) {
                return 247 >= a ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(a) : 1424 <= a && 1524 >= a ? "R" : 1536 <= a && 1785 >= a ? "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(a -
                    1536) : 1774 <= a && 2220 >= a ? "r" : 8192 <= a && 8203 >= a ? "w" : 8204 == a ? "b" : "L"
            }
            function b(a, b, d) {
                this.level = a;
                this.from = b;
                this.to = d
            }
            var c = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                d = /[stwN]/,
                e = /[LRr]/,
                f = /[Lb1n]/,
                g = /[1n]/;
            return function (h, k) {
                var l = "ltr" == k ? "L" : "R";
                if (0 == h.length || "ltr" == k && !c.test(h))
                    return !1;
                for (var m = h.length, p = [], n = 0; n < m; ++n)
                    p.push(a(h.charCodeAt(n)));
                n = 0;
                for (var r = l; n < m; ++n) {
                    var q = p[n];
                    "m" == q ? p[n] = r : r = q
                }
                n = 0;
                for (r = l; n < m; ++n)
                    q = p[n], "1" == q && "r" == r ? p[n] = "n" : e.test(q) && (r = q, "r" == q && (p[n] = "R"));
                n = 1;
                for (r = p[0]; n < m - 1; ++n)
                    q = p[n], "+" == q && "1" == r && "1" == p[n + 1] ? p[n] = "1" : "," != q || r != p[n + 1] || "1" != r && "n" != r || (p[n] = r), r = q;
                for (n = 0; n < m; ++n)
                    if (r = p[n], "," == r)
                        p[n] = "N";
                    else if ("%" == r) {
                        for (r = n + 1; r < m && "%" == p[r]; ++r);
                        for (q = n && "!" == p[n - 1] || r < m && "1" == p[r] ? "1" : "N"; n < r; ++n)
                            p[n] = q;
                        n = r - 1
                    }
                n = 0;
                for (r = l; n < m; ++n)
                    q = p[n], "L" == r && "1" == q ? p[n] = "L" : e.test(q) && (r = q);
                for (r = 0; r < m; ++r)
                    if (d.test(p[r])) {
                        for (n = r + 1; n < m && d.test(p[n]); ++n);
                        q = "L" == (r ? p[r - 1] : l);
                        for (q = q == ("L" == (n < m ? p[n] : l)) ? q ? "L" : "R" : l; r < n; ++r)
                            p[r] = q;
                        r = n - 1
                    }
                l = [];
                var t;
                for (n =
                         0; n < m; )
                    if (f.test(p[n])) {
                        r = n;
                        for (++n; n < m && f.test(p[n]); ++n);
                        l.push(new b(0, r, n))
                    } else {
                        var u = n;
                        r = l.length;
                        for (++n; n < m && "L" != p[n]; ++n);
                        for (q = u; q < n; )
                            if (g.test(p[q])) {
                                u < q && l.splice(r, 0, new b(1, u, q));
                                u = q;
                                for (++q; q < n && g.test(p[q]); ++q);
                                l.splice(r, 0, new b(2, u, q));
                                u = q
                            } else ++q;
                        u < n && l.splice(r, 0, new b(1, u, n))
                    }
                "ltr" == k && (1 == l[0].level && (t = h.match(/^\s+/)) && (l[0].from = t[0].length, l.unshift(new b(0, 0, t[0].length))), 1 == y(l).level && (t = h.match(/\s+$/)) && (y(l).to -= t[0].length, l.push(new b(0, m - t[0].length, m))));
                return "rtl" ==
                k ? l.reverse() : l
            }
        }
        (),
        nc = [],
        w = function (a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : (a = a._handlers || (a._handlers = {}), a[b] = (a[b] || nc).concat(c))
        },
        eh = function () {
            if (B && 9 > F)
                return !1;
            var a = u("div");
            return "draggable" in a || "dragDrop" in a
        }
        (),
        bd,
        hd,
        Ud = 3 != "\n\nb".split(/\n/).length ? function (a) {
                for (var b = 0, c = [], d = a.length; b <= d; ) {
                    var e = a.indexOf("\n", b);
                    -1 == e && (e = a.length);
                    var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e),
                        g = f.indexOf("\r");
                    -1 != g ? (c.push(f.slice(0, g)), b += g +
                        1) : (c.push(f), b = e + 1)
                }
                return c
            }
            : function (a) {
                return a.split(/\r\n?|\n/)
            },
        rh = window.getSelection ? function (a) {
                try {
                    return a.selectionStart != a.selectionEnd
                } catch (b) {
                    return !1
                }
            }
            : function (a) {
                try {
                    var b = a.ownerDocument.selection.createRange()
                } catch (c) {}
                return b && b.parentElement() == a ? 0 != b.compareEndPoints("StartToEnd", b) : !1
            },
        Zg = function () {
            var a = u("div");
            if ("oncopy" in a)
                return !0;
            a.setAttribute("oncopy", "return;");
            return "function" == typeof a.oncopy
        }
        (),
        nd = null,
        cd = {},
        cb = {},
        db = {},
        K = function (a, b, c) {
            this.pos = this.start =
                0;
            this.string = a;
            this.tabSize = b || 8;
            this.lineStart = this.lastColumnPos = this.lastColumnValue = 0;
            this.lineOracle = c
        };
    K.prototype.eol = function () {
        return this.pos >= this.string.length
    };
    K.prototype.sol = function () {
        return this.pos == this.lineStart
    };
    K.prototype.peek = function () {
        return this.string.charAt(this.pos) || void 0
    };
    K.prototype.next = function () {
        if (this.pos < this.string.length)
            return this.string.charAt(this.pos++)
    };
    K.prototype.eat = function (a) {
        var b = this.string.charAt(this.pos);
        if ("string" == typeof a ? b == a : b && (a.test ?
            a.test(b) : a(b)))
            return ++this.pos, b
    };
    K.prototype.eatWhile = function (a) {
        for (var b = this.pos; this.eat(a); );
        return this.pos > b
    };
    K.prototype.eatSpace = function () {
        for (var a = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
            ++this.pos;
        return this.pos > a
    };
    K.prototype.skipToEnd = function () {
        this.pos = this.string.length
    };
    K.prototype.skipTo = function (a) {
        a = this.string.indexOf(a, this.pos);
        if (-1 < a)
            return this.pos = a, !0
    };
    K.prototype.backUp = function (a) {
        this.pos -= a
    };
    K.prototype.column = function () {
        this.lastColumnPos <
        this.start && (this.lastColumnValue = ia(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start);
        return this.lastColumnValue - (this.lineStart ? ia(this.string, this.lineStart, this.tabSize) : 0)
    };
    K.prototype.indentation = function () {
        return ia(this.string, null, this.tabSize) - (this.lineStart ? ia(this.string, this.lineStart, this.tabSize) : 0)
    };
    K.prototype.match = function (a, b, c) {
        if ("string" == typeof a) {
            var d = function (a) {
                    return c ? a.toLowerCase() : a
                },
                e = this.string.substr(this.pos,
                    a.length);
            if (d(e) == d(a))
                return !1 !== b && (this.pos += a.length), !0
        } else {
            if ((a = this.string.slice(this.pos).match(a)) && 0 < a.index)
                return null;
            a && !1 !== b && (this.pos += a[0].length);
            return a
        }
    };
    K.prototype.current = function () {
        return this.string.slice(this.start, this.pos)
    };
    K.prototype.hideFirstChars = function (a, b) {
        this.lineStart += a;
        try {
            return b()
        }
        finally {
            this.lineStart -= a
        }
    };
    K.prototype.lookAhead = function (a) {
        var b = this.lineOracle;
        return b && b.lookAhead(a)
    };
    K.prototype.baseToken = function () {
        var a = this.lineOracle;
        return a &&
            a.baseToken(this.pos)
    };
    var pc = function (a, b) {
            this.state = a;
            this.lookAhead = b
        },
        ta = function (a, b, c, d) {
            this.state = b;
            this.doc = a;
            this.line = c;
            this.maxLookAhead = d || 0;
            this.baseTokens = null;
            this.baseTokenPos = 1
        };
    ta.prototype.lookAhead = function (a) {
        var b = this.doc.getLine(this.line + a);
        null != b && a > this.maxLookAhead && (this.maxLookAhead = a);
        return b
    };
    ta.prototype.baseToken = function (a) {
        if (!this.baseTokens)
            return null;
        for (; this.baseTokens[this.baseTokenPos] <= a; )
            this.baseTokenPos += 2;
        var b = this.baseTokens[this.baseTokenPos +
        1];
        return {
            type: b && b.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - a
        }
    };
    ta.prototype.nextLine = function () {
        this.line++;
        0 < this.maxLookAhead && this.maxLookAhead--
    };
    ta.fromSaved = function (a, b, c) {
        return b instanceof pc ? new ta(a, Na(a.mode, b.state), c, b.lookAhead) : new ta(a, Na(a.mode, b), c)
    };
    ta.prototype.save = function (a) {
        a = !1 !== a ? Na(this.doc.mode, this.state) : this.state;
        return 0 < this.maxLookAhead ? new pc(a, this.maxLookAhead) : a
    };
    var pe = function (a, b, c) {
            this.start = a.start;
            this.end = a.pos;
            this.string =
                a.current();
            this.type = b || null;
            this.state = c
        },
        hb = function (a, b, c) {
            this.text = a;
            ce(this, b);
            this.height = c ? c(this) : 1
        };
    hb.prototype.lineNo = function () {
        return C(this)
    };
    bb(hb);
    var ug = {},
        tg = {},
        eb = null,
        Ab = null,
        De = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        Sa,
        ab = function (a, b, c) {
            this.cm = c;
            var d = this.vert = u("div", [u("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                e = this.horiz = u("div", [u("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
            a(d);
            a(e);
            w(d, "scroll", function () {
                d.clientHeight && b(d.scrollTop,
                    "vertical")
            });
            w(e, "scroll", function () {
                e.clientWidth && b(e.scrollLeft, "horizontal")
            });
            this.checkedZeroWidth = !1;
            B && 8 > F && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
        };
    ab.prototype.update = function (a) {
        var b = a.scrollWidth > a.clientWidth + 1,
            c = a.scrollHeight > a.clientHeight + 1,
            d = a.nativeBarWidth;
        c ? (this.vert.style.display = "block", this.vert.style.bottom = b ? d + "px" : "0", this.vert.firstChild.style.height = Math.max(0, a.scrollHeight - a.clientHeight + (a.viewHeight - (b ? d : 0))) + "px") : (this.vert.style.display =
            "", this.vert.firstChild.style.height = "0");
        b ? (this.horiz.style.display = "block", this.horiz.style.right = c ? d + "px" : "0", this.horiz.style.left = a.barLeft + "px", this.horiz.firstChild.style.width = Math.max(0, a.scrollWidth - a.clientWidth + (a.viewWidth - a.barLeft - (c ? d : 0))) + "px") : (this.horiz.style.display = "", this.horiz.firstChild.style.width = "0");
        !this.checkedZeroWidth && 0 < a.clientHeight && (0 == d && this.zeroWidthHack(), this.checkedZeroWidth = !0);
        return {
            right: c ? d : 0,
            bottom: b ? d : 0
        }
    };
    ab.prototype.setScrollLeft = function (a) {
        this.horiz.scrollLeft !=
        a && (this.horiz.scrollLeft = a);
        this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
    };
    ab.prototype.setScrollTop = function (a) {
        this.vert.scrollTop != a && (this.vert.scrollTop = a);
        this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
    };
    ab.prototype.zeroWidthHack = function () {
        this.horiz.style.height = this.vert.style.width = la && !ph ? "12px" : "18px";
        this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
        this.disableHoriz = new Za;
        this.disableVert = new Za
    };
    ab.prototype.enableZeroWidthBar =
        function (a, b, c) {
            function d() {
                var e = a.getBoundingClientRect();
                ("vert" == c ? document.elementFromPoint(e.right - 1, (e.top + e.bottom) / 2) : document.elementFromPoint((e.right + e.left) / 2, e.bottom - 1)) != a ? a.style.pointerEvents = "none" : b.set(1E3, d)
            }
            a.style.pointerEvents = "auto";
            b.set(1E3, d)
        };
    ab.prototype.clear = function () {
        var a = this.horiz.parentNode;
        a.removeChild(this.horiz);
        a.removeChild(this.vert)
    };
    var cc = function () {};
    cc.prototype.update = function () {
        return {
            bottom: 0,
            right: 0
        }
    };
    cc.prototype.setScrollLeft = function () {};
    cc.prototype.setScrollTop = function () {};
    cc.prototype.clear = function () {};
    var Ye = {
            "native": ab,
            "null": cc
        },
        Fg = 0,
        yc = function (a, b, c) {
            var d = a.display;
            this.viewport = b;
            this.visible = xd(d, a.doc, b);
            this.editorIsHidden = !d.wrapper.offsetWidth;
            this.wrapperHeight = d.wrapper.clientHeight;
            this.wrapperWidth = d.wrapper.clientWidth;
            this.oldDisplayWidth = Oa(a);
            this.force = c;
            this.dims = md(a);
            this.events = []
        };
    yc.prototype.signal = function (a, b) {
        ja(a, b) && this.events.push(arguments)
    };
    yc.prototype.finish = function () {
        for (var a = 0; a < this.events.length; a++)
            J.apply(null,
                this.events[a])
    };
    var Ac = 0,
        fa = null;
    B ? fa =  - .53 : Aa ? fa = 15 : rc ? fa =  - .7 : Xf && (fa = -1 / 3);
    var ha = function (a, b) {
        this.ranges = a;
        this.primIndex = b
    };
    ha.prototype.primary = function () {
        return this.ranges[this.primIndex]
    };
    ha.prototype.equals = function (a) {
        if (a == this)
            return !0;
        if (a.primIndex != this.primIndex || a.ranges.length != this.ranges.length)
            return !1;
        for (var b = 0; b < this.ranges.length; b++) {
            var c = this.ranges[b],
                d = a.ranges[b];
            if (!Vc(c.anchor, d.anchor) || !Vc(c.head, d.head))
                return !1
        }
        return !0
    };
    ha.prototype.deepCopy = function () {
        for (var a =
            [], b = 0; b < this.ranges.length; b++)
            a[b] = new A(Wc(this.ranges[b].anchor), Wc(this.ranges[b].head));
        return new ha(a, this.primIndex)
    };
    ha.prototype.somethingSelected = function () {
        for (var a = 0; a < this.ranges.length; a++)
            if (!this.ranges[a].empty())
                return !0;
        return !1
    };
    ha.prototype.contains = function (a, b) {
        b || (b = a);
        for (var c = 0; c < this.ranges.length; c++) {
            var d = this.ranges[c];
            if (0 <= x(b, d.from()) && 0 >= x(a, d.to()))
                return c
        }
        return -1
    };
    var A = function (a, b) {
        this.anchor = a;
        this.head = b
    };
    A.prototype.from = function () {
        return kc(this.anchor,
            this.head)
    };
    A.prototype.to = function () {
        return jc(this.anchor, this.head)
    };
    A.prototype.empty = function () {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
    };
    Ob.prototype = {
        chunkSize: function () {
            return this.lines.length
        },
        removeInner: function (a, b) {
            for (var c = a, d = a + b; c < d; ++c) {
                var e = this.lines[c];
                this.height -= e.height;
                var f = e;
                f.parent = null;
                be(f);
                S(e, "delete")
            }
            this.lines.splice(a, b)
        },
        collapse: function (a) {
            a.push.apply(a, this.lines)
        },
        insertInner: function (a, b, c) {
            this.height += c;
            this.lines = this.lines.slice(0,
                a).concat(b).concat(this.lines.slice(a));
            for (a = 0; a < b.length; ++a)
                b[a].parent = this
        },
        iterN: function (a, b, c) {
            for (b = a + b; a < b; ++a)
                if (c(this.lines[a]))
                    return !0
        }
    };
    Pb.prototype = {
        chunkSize: function () {
            return this.size
        },
        removeInner: function (a, b) {
            this.size -= b;
            for (var c = 0; c < this.children.length; ++c) {
                var d = this.children[c],
                    e = d.chunkSize();
                if (a < e) {
                    var f = Math.min(b, e - a),
                        g = d.height;
                    d.removeInner(a, f);
                    this.height -= g - d.height;
                    e == f && (this.children.splice(c--, 1), d.parent = null);
                    if (0 == (b -= f))
                        break;
                    a = 0
                } else
                    a -= e
            }
            25 > this.size -
            b && (1 < this.children.length || !(this.children[0]instanceof Ob)) && (a = [], this.collapse(a), this.children = [new Ob(a)], this.children[0].parent = this)
        },
        collapse: function (a) {
            for (var b = 0; b < this.children.length; ++b)
                this.children[b].collapse(a)
        },
        insertInner: function (a, b, c) {
            this.size += b.length;
            this.height += c;
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d],
                    f = e.chunkSize();
                if (a <= f) {
                    e.insertInner(a, b, c);
                    if (e.lines && 50 < e.lines.length) {
                        for (b = a = e.lines.length % 25 + 25; b < e.lines.length; )
                            c = new Ob(e.lines.slice(b,
                                b += 25)), e.height -= c.height, this.children.splice(++d, 0, c), c.parent = this;
                        e.lines = e.lines.slice(0, a);
                        this.maybeSpill()
                    }
                    break
                }
                a -= f
            }
        },
        maybeSpill: function () {
            if (!(10 >= this.children.length)) {
                var a = this;
                do {
                    var b = a.children.splice(a.children.length - 5, 5);
                    b = new Pb(b);
                    if (a.parent) {
                        a.size -= b.size;
                        a.height -= b.height;
                        var c = Q(a.parent.children, a);
                        a.parent.children.splice(c + 1, 0, b)
                    } else
                        c = new Pb(a.children), c.parent = a, a.children = [c, b], a = c;
                    b.parent = a.parent
                } while (10 < a.children.length);
                a.parent.maybeSpill()
            }
        },
        iterN: function (a,
                         b, c) {
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d],
                    f = e.chunkSize();
                if (a < f) {
                    f = Math.min(b, f - a);
                    if (e.iterN(a, f, c))
                        return !0;
                    if (0 == (b -= f))
                        break;
                    a = 0
                } else
                    a -= f
            }
        }
    };
    var Qb = function (a, b, c) {
        if (c)
            for (var d in c)
                c.hasOwnProperty(d) && (this[d] = c[d]);
        this.doc = a;
        this.node = b
    };
    Qb.prototype.clear = function () {
        var a = this.doc.cm,
            b = this.line.widgets,
            c = this.line,
            d = C(c);
        if (null != d && b) {
            for (var e = 0; e < b.length; ++e)
                b[e] == this && b.splice(e--, 1);
            b.length || (c.widgets = null);
            var f = Cb(this);
            qa(c, Math.max(0, c.height - f));
            a && (ca(a, function () {
                var b = -f;
                sa(c) < (a.curOp && a.curOp.scrollTop || a.doc.scrollTop) && wc(a, b);
                Da(a, d, "widget")
            }), S(a, "lineWidgetCleared", a, this, d))
        }
    };
    Qb.prototype.changed = function () {
        var a = this,
            b = this.height,
            c = this.doc.cm,
            d = this.line;
        this.height = null;
        var e = Cb(this) - b;
        e && (qa(d, d.height + e), c && ca(c, function () {
            c.curOp.forceUpdate = !0;
            sa(d) < (c.curOp && c.curOp.scrollTop || c.doc.scrollTop) && wc(c, e);
            S(c, "lineWidgetChanged", c, a, C(d))
        }))
    };
    bb(Qb);
    var Bf = 0,
        Fa = function (a, b) {
            this.lines = [];
            this.type = b;
            this.doc = a;
            this.id =
                ++Bf
        };
    Fa.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            var a = this.doc.cm,
                b = a && !a.curOp;
            b && Wa(a);
            if (ja(this, "clear")) {
                var c = this.find();
                c && S(this, "clear", c.from, c.to)
            }
            for (var d = c = null, e = 0; e < this.lines.length; ++e) {
                var f = this.lines[e],
                    g = ub(f.markedSpans, this);
                a && !this.collapsed ? Da(a, C(f), "text") : a && (null != g.to && (d = C(f)), null != g.from && (c = C(f)));
                for (var h = f, k = void 0, l = f.markedSpans, m = g, p = 0; p < l.length; ++p)
                    l[p] != m && (k || (k = [])).push(l[p]);
                h.markedSpans = k;
                null == g.from && this.collapsed && !Ma(this.doc,
                    f) && a && qa(f, Ra(a.display))
            }
            if (a && this.collapsed && !a.options.lineWrapping)
                for (e = 0; e < this.lines.length; ++e)
                    f = ra(this.lines[e]), g = mc(f), g > a.display.maxLineLength && (a.display.maxLine = f, a.display.maxLineLength = g, a.display.maxLineChanged = !0);
            null != c && a && this.collapsed && Z(a, c, d + 1);
            this.lines.length = 0;
            this.explicitlyCleared = !0;
            this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, a && rf(a.doc));
            a && S(a, "markerCleared", a, this, c, d);
            b && Xa(a);
            this.parent && this.parent.clear()
        }
    };
    Fa.prototype.find = function (a, b) {
        null ==
        a && "bookmark" == this.type && (a = 1);
        for (var c, d, e = 0; e < this.lines.length; ++e) {
            var f = this.lines[e],
                g = ub(f.markedSpans, this);
            if (null != g.from && (c = q(b ? f : C(f), g.from), -1 == a))
                return c;
            if (null != g.to && (d = q(b ? f : C(f), g.to), 1 == a))
                return d
        }
        return c && {
            from: c,
            to: d
        }
    };
    Fa.prototype.changed = function () {
        var a = this,
            b = this.find(-1, !0),
            c = this,
            d = this.doc.cm;
        b && d && ca(d, function () {
            var e = b.line,
                f = C(b.line);
            if (f = ld(d, f))
                Ee(f), d.curOp.selectionChanged = d.curOp.forceUpdate = !0;
            d.curOp.updateMaxLine = !0;
            Ma(c.doc, e) || null == c.height || (f =
                c.height, c.height = null, (f = Cb(c) - f) && qa(e, e.height + f));
            S(d, "markerChanged", d, a)
        })
    };
    Fa.prototype.attachLine = function (a) {
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            b.maybeHiddenMarkers && -1 != Q(b.maybeHiddenMarkers, this) || (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(a)
    };
    Fa.prototype.detachLine = function (a) {
        this.lines.splice(Q(this.lines, a), 1);
        !this.lines.length && this.doc.cm && (a = this.doc.cm.curOp, (a.maybeHiddenMarkers || (a.maybeHiddenMarkers = [])).push(this))
    };
    bb(Fa);
    var Rb = function (a, b) {
        this.markers = a;
        this.primary = b;
        for (b = 0; b < a.length; ++b)
            a[b].parent = this
    };
    Rb.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var a = 0; a < this.markers.length; ++a)
                this.markers[a].clear();
            S(this, "clear")
        }
    };
    Rb.prototype.find = function (a, b) {
        return this.primary.find(a, b)
    };
    bb(Rb);
    var sh = 0,
        aa = function (a, b, c, d, e) {
            if (!(this instanceof aa))
                return new aa(a, b, c, d, e);
            null == c && (c = 0);
            Pb.call(this, [new Ob([new hb("", null)])]);
            this.first = c;
            this.scrollTop = this.scrollLeft =
                0;
            this.cantEdit = !1;
            this.cleanGeneration = 1;
            this.modeFrontier = this.highlightFrontier = c;
            c = q(c, 0);
            this.sel = za(c);
            this.history = new Bc(null);
            this.id = ++sh;
            this.modeOption = b;
            this.lineSep = d;
            this.direction = "rtl" == e ? "rtl" : "ltr";
            this.extend = !1;
            "string" == typeof a && (a = this.splitLines(a));
            Gd(this, {
                from: c,
                to: c,
                text: a
            });
            T(this, za(c), va)
        };
    aa.prototype = Xd(Pb.prototype, {
        constructor: aa,
        iter: function (a, b, c) {
            c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a)
        },
        insert: function (a, b) {
            for (var c = 0,
                     d = 0; d < b.length; ++d)
                c += b[d].height;
            this.insertInner(a - this.first, b, c)
        },
        remove: function (a, b) {
            this.removeInner(a - this.first, b)
        },
        getValue: function (a) {
            var b = Tc(this, this.first, this.first + this.size);
            return !1 === a ? b : b.join(a || this.lineSeparator())
        },
        setValue: P(function (a) {
            var b = q(this.first, 0),
                c = this.first + this.size - 1;
            kb(this, {
                from: b,
                to: q(c, t(this, c).text.length),
                text: this.splitLines(a),
                origin: "setValue",
                full: !0
            }, !0);
            this.cm && Hb(this.cm, 0, 0);
            T(this, za(b), va)
        }),
        replaceRange: function (a, b, c, d) {
            b = v(this, b);
            c =
                c ? v(this, c) : b;
            lb(this, a, b, c, d)
        },
        getRange: function (a, b, c) {
            a = Ja(this, v(this, a), v(this, b));
            return !1 === c ? a : a.join(c || this.lineSeparator())
        },
        getLine: function (a) {
            return (a = this.getLineHandle(a)) && a.text
        },
        getLineHandle: function (a) {
            if (tb(this, a))
                return t(this, a)
        },
        getLineNumber: function (a) {
            return C(a)
        },
        getLineHandleVisualStart: function (a) {
            "number" == typeof a && (a = t(this, a));
            return ra(a)
        },
        lineCount: function () {
            return this.size
        },
        firstLine: function () {
            return this.first
        },
        lastLine: function () {
            return this.first + this.size -
                1
        },
        clipPos: function (a) {
            return v(this, a)
        },
        getCursor: function (a) {
            var b = this.sel.primary();
            return null == a || "head" == a ? b.head : "anchor" == a ? b.anchor : "end" == a || "to" == a || !1 === a ? b.to() : b.from()
        },
        listSelections: function () {
            return this.sel.ranges
        },
        somethingSelected: function () {
            return this.sel.somethingSelected()
        },
        setCursor: P(function (a, b, c) {
            a = v(this, "number" == typeof a ? q(a, b || 0) : a);
            T(this, za(a, null), c)
        }),
        setSelection: P(function (a, b, c) {
            var d = v(this, a);
            a = v(this, b || a);
            T(this, za(d, a), c)
        }),
        extendSelection: P(function (a,
                                     b, c) {
            Dc(this, v(this, a), b && v(this, b), c)
        }),
        extendSelections: P(function (a, b) {
            nf(this, $d(this, a), b)
        }),
        extendSelectionsBy: P(function (a, b) {
            a = hc(this.sel.ranges, a);
            nf(this, $d(this, a), b)
        }),
        setSelections: P(function (a, b, c) {
            if (a.length) {
                for (var d = [], e = 0; e < a.length; e++)
                    d[e] = new A(v(this, a[e].anchor), v(this, a[e].head));
                null == b && (b = Math.min(a.length - 1, this.sel.primIndex));
                T(this, pa(d, b), c)
            }
        }),
        addSelection: P(function (a, b, c) {
            var d = this.sel.ranges.slice(0);
            d.push(new A(v(this, a), v(this, b || a)));
            T(this, pa(d, d.length -
                1), c)
        }),
        getSelection: function (a) {
            for (var b = this.sel.ranges, c, d = 0; d < b.length; d++) {
                var e = Ja(this, b[d].from(), b[d].to());
                c = c ? c.concat(e) : e
            }
            return !1 === a ? c : c.join(a || this.lineSeparator())
        },
        getSelections: function (a) {
            for (var b = [], c = this.sel.ranges, d = 0; d < c.length; d++) {
                var e = Ja(this, c[d].from(), c[d].to());
                !1 !== a && (e = e.join(a || this.lineSeparator()));
                b[d] = e
            }
            return b
        },
        replaceSelection: function (a, b, c) {
            for (var d = [], e = 0; e < this.sel.ranges.length; e++)
                d[e] = a;
            this.replaceSelections(d, b, c || "+input")
        },
        replaceSelections: P(function (a,
                                       b, c) {
            for (var d = [], e = this.sel, f = 0; f < e.ranges.length; f++) {
                var g = e.ranges[f];
                d[f] = {
                    from: g.from(),
                    to: g.to(),
                    text: this.splitLines(a[f]),
                    origin: c
                }
            }
            if (a = b && "end" != b) {
                a = [];
                e = c = q(this.first, 0);
                for (f = 0; f < d.length; f++) {
                    var h = d[f];
                    g = ef(h.from, c, e);
                    var k = ef(Ea(h), c, e);
                    c = h.to;
                    e = k;
                    "around" == b ? (h = this.sel.ranges[f], h = 0 > x(h.head, h.anchor), a[f] = new A(h ? k : g, h ? g : k)) : a[f] = new A(g, g)
                }
                a = new ha(a, this.sel.primIndex)
            }
            b = a;
            for (a = d.length - 1; 0 <= a; a--)
                kb(this, d[a]);
            b ? of(this, b) : this.cm && fb(this.cm)
        }),
        undo: P(function () {
            Fc(this,
                "undo")
        }),
        redo: P(function () {
            Fc(this, "redo")
        }),
        undoSelection: P(function () {
            Fc(this, "undo", !0)
        }),
        redoSelection: P(function () {
            Fc(this, "redo", !0)
        }),
        setExtending: function (a) {
            this.extend = a
        },
        getExtending: function () {
            return this.extend
        },
        historySize: function () {
            for (var a = this.history, b = 0, c = 0, d = 0; d < a.done.length; d++)
                a.done[d].ranges || ++b;
            for (d = 0; d < a.undone.length; d++)
                a.undone[d].ranges || ++c;
            return {
                undo: b,
                redo: c
            }
        },
        clearHistory: function () {
            this.history = new Bc(this.history.maxGeneration)
        },
        markClean: function () {
            this.cleanGeneration =
                this.changeGeneration(!0)
        },
        changeGeneration: function (a) {
            a && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null);
            return this.history.generation
        },
        isClean: function (a) {
            return this.history.generation == (a || this.cleanGeneration)
        },
        getHistory: function () {
            return {
                done: ib(this.history.done),
                undone: ib(this.history.undone)
            }
        },
        setHistory: function (a) {
            var b = this.history = new Bc(this.history.maxGeneration);
            b.done = ib(a.done.slice(0), null, !0);
            b.undone = ib(a.undone.slice(0), null, !0)
        },
        setGutterMarker: P(function (a,
                                     b, c) {
            return Nb(this, a, "gutter", function (a) {
                var d = a.gutterMarkers || (a.gutterMarkers = {});
                d[b] = c;
                !c && Yd(d) && (a.gutterMarkers = null);
                return !0
            })
        }),
        clearGutter: P(function (a) {
            var b = this;
            this.iter(function (c) {
                c.gutterMarkers && c.gutterMarkers[a] && Nb(b, c, "gutter", function () {
                    c.gutterMarkers[a] = null;
                    Yd(c.gutterMarkers) && (c.gutterMarkers = null);
                    return !0
                })
            })
        }),
        lineInfo: function (a) {
            if ("number" == typeof a) {
                if (!tb(this, a))
                    return null;
                var b = a;
                a = t(this, a);
                if (!a)
                    return null
            } else if (b = C(a), null == b)
                return null;
            return {
                line: b,
                handle: a,
                text: a.text,
                gutterMarkers: a.gutterMarkers,
                textClass: a.textClass,
                bgClass: a.bgClass,
                wrapClass: a.wrapClass,
                widgets: a.widgets
            }
        },
        addLineClass: P(function (a, b, c) {
            return Nb(this, a, "gutter" == b ? "gutter" : "class", function (a) {
                var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass";
                if (a[d]) {
                    if (z(c).test(a[d]))
                        return !1;
                    a[d] += " " + c
                } else
                    a[d] = c;
                return !0
            })
        }),
        removeLineClass: P(function (a, b, c) {
            return Nb(this, a, "gutter" == b ? "gutter" : "class", function (a) {
                var d = "text" == b ? "textClass" :
                    "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass",
                    f = a[d];
                if (f)
                    if (null == c)
                        a[d] = null;
                    else {
                        var g = f.match(z(c));
                        if (!g)
                            return !1;
                        var h = g.index + g[0].length;
                        a[d] = f.slice(0, g.index) + (g.index && h != f.length ? " " : "") + f.slice(h) || null
                    }
                else
                    return !1;
                return !0
            })
        }),
        addLineWidget: P(function (a, b, c) {
            return Og(this, a, b, c)
        }),
        removeLineWidget: function (a) {
            a.clear()
        },
        markText: function (a, b, c) {
            return mb(this, v(this, a), v(this, b), c, c && c.type || "range")
        },
        setBookmark: function (a, b) {
            b = {
                replacedWith: b && (null == b.nodeType ?
                    b.widget : b),
                insertLeft: b && b.insertLeft,
                clearWhenEmpty: !1,
                shared: b && b.shared,
                handleMouseEvents: b && b.handleMouseEvents
            };
            a = v(this, a);
            return mb(this, a, a, b, "bookmark")
        },
        findMarksAt: function (a) {
            a = v(this, a);
            var b = [],
                c = t(this, a.line).markedSpans;
            if (c)
                for (var d = 0; d < c.length; ++d) {
                    var e = c[d];
                    (null == e.from || e.from <= a.ch) && (null == e.to || e.to >= a.ch) && b.push(e.marker.parent || e.marker)
                }
            return b
        },
        findMarks: function (a, b, c) {
            a = v(this, a);
            b = v(this, b);
            var d = [],
                e = a.line;
            this.iter(a.line, b.line + 1, function (f) {
                if (f = f.markedSpans)
                    for (var g =
                        0; g < f.length; g++) {
                        var h = f[g];
                        null != h.to && e == a.line && a.ch >= h.to || null == h.from && e != a.line || null != h.from && e == b.line && h.from >= b.ch || c && !c(h.marker) || d.push(h.marker.parent || h.marker)
                    }
                ++e
            });
            return d
        },
        getAllMarks: function () {
            var a = [];
            this.iter(function (b) {
                if (b = b.markedSpans)
                    for (var c = 0; c < b.length; ++c)
                        null != b[c].from && a.push(b[c].marker)
            });
            return a
        },
        posFromIndex: function (a) {
            var b,
                c = this.first,
                d = this.lineSeparator().length;
            this.iter(function (e) {
                e = e.text.length + d;
                if (e > a)
                    return b = a, !0;
                a -= e;
                ++c
            });
            return v(this,
                q(c, b))
        },
        indexFromPos: function (a) {
            a = v(this, a);
            var b = a.ch;
            if (a.line < this.first || 0 > a.ch)
                return 0;
            var c = this.lineSeparator().length;
            this.iter(this.first, a.line, function (a) {
                b += a.text.length + c
            });
            return b
        },
        copy: function (a) {
            var b = new aa(Tc(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
            b.scrollTop = this.scrollTop;
            b.scrollLeft = this.scrollLeft;
            b.sel = this.sel;
            b.extend = !1;
            a && (b.history.undoDepth = this.history.undoDepth, b.setHistory(this.getHistory()));
            return b
        },
        linkedDoc: function (a) {
            a ||
            (a = {});
            var b = this.first,
                c = this.first + this.size;
            null != a.from && a.from > b && (b = a.from);
            null != a.to && a.to < c && (c = a.to);
            b = new aa(Tc(this, b, c), a.mode || this.modeOption, b, this.lineSep, this.direction);
            a.sharedHist && (b.history = this.history);
            (this.linked || (this.linked = [])).push({
                doc: b,
                sharedHist: a.sharedHist
            });
            b.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: a.sharedHist
            }
            ];
            a = Cf(this);
            for (c = 0; c < a.length; c++) {
                var d = a[c],
                    e = d.find(),
                    f = b.clipPos(e.from);
                e = b.clipPos(e.to);
                x(f, e) && (f = mb(b, f, e, d.primary, d.primary.type), d.markers.push(f),
                    f.parent = d)
            }
            return b
        },
        unlinkDoc: function (a) {
            a instanceof G && (a = a.doc);
            if (this.linked)
                for (var b = 0; b < this.linked.length; ++b)
                    if (this.linked[b].doc == a) {
                        this.linked.splice(b, 1);
                        a.unlinkDoc(this);
                        Qg(Cf(this));
                        break
                    }
            if (a.history == this.history) {
                var c = [a.id];
                Ya(a, function (a) {
                    return c.push(a.id)
                }, !0);
                a.history = new Bc(null);
                a.history.done = ib(this.history.done, c);
                a.history.undone = ib(this.history.undone, c)
            }
        },
        iterLinkedDocs: function (a) {
            Ya(this, a)
        },
        getMode: function () {
            return this.mode
        },
        getEditor: function () {
            return this.cm
        },
        splitLines: function (a) {
            return this.lineSep ? a.split(this.lineSep) : Ud(a)
        },
        lineSeparator: function () {
            return this.lineSep || "\n"
        },
        setDirection: P(function (a) {
            "rtl" != a && (a = "ltr");
            a != this.direction && (this.direction = a, this.iter(function (a) {
                return a.order = null
            }), this.cm && Kg(this.cm))
        })
    });
    aa.prototype.eachLine = aa.prototype.iter;
    for (var Ef = 0, Wf = !1, Ga = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        106: "*",
        107: "=",
        109: "-",
        110: ".",
        111: "/",
        127: "Delete",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
    }, dc = 0; 10 > dc; dc++)
        Ga[dc + 48] = Ga[dc + 96] = String(dc);
    for (var Mc = 65; 90 >= Mc; Mc++)
        Ga[Mc] = String.fromCharCode(Mc);
    for (var ec = 1; 12 >= ec; ec++)
        Ga[ec + 111] = Ga[ec + 63235] = "F" + ec;
    var Sb = {
        basic: {
            Left: "goCharLeft",
            Right: "goCharRight",
            Up: "goLineUp",
            Down: "goLineDown",
            End: "goLineEnd",
            Home: "goLineStartSmart",
            PageUp: "goPageUp",
            PageDown: "goPageDown",
            Delete: "delCharAfter",
            Backspace: "delCharBefore",
            "Shift-Backspace": "delCharBefore",
            Tab: "defaultTab",
            "Shift-Tab": "indentAuto",
            Enter: "newlineAndIndent",
            Insert: "toggleOverwrite",
            Esc: "singleSelection"
        },
        pcDefault: {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Up": "goLineUp",
            "Ctrl-Down": "goLineDown",
            "Ctrl-Left": "goGroupLeft",
            "Ctrl-Right": "goGroupRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete": "delGroupAfter",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            "Ctrl-U": "undoSelection",
            "Shift-Ctrl-U": "redoSelection",
            "Alt-U": "redoSelection",
            fallthrough: "basic"
        },
        emacsy: {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Alt-F": "goWordRight",
            "Alt-B": "goWordLeft",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageDown",
            "Shift-Ctrl-V": "goPageUp",
            "Ctrl-D": "delCharAfter",
            "Ctrl-H": "delCharBefore",
            "Alt-D": "delWordAfter",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars",
            "Ctrl-O": "openLine"
        },
        macDefault: {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Home": "goDocStart",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goGroupLeft",
            "Alt-Right": "goGroupRight",
            "Cmd-Left": "goLineLeft",
            "Cmd-Right": "goLineRight",
            "Alt-Backspace": "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete": "delGroupAfter",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            "Cmd-Backspace": "delWrappedLineLeft",
            "Cmd-Delete": "delWrappedLineRight",
            "Cmd-U": "undoSelection",
            "Shift-Cmd-U": "redoSelection",
            "Ctrl-Up": "goDocStart",
            "Ctrl-Down": "goDocEnd",
            fallthrough: ["basic", "emacsy"]
        }
    };
    Sb["default"] = la ? Sb.macDefault : Sb.pcDefault;
    var Tb = {
            selectAll: tf,
            singleSelection: function (a) {
                return a.setSelection(a.getCursor("anchor"), a.getCursor("head"), va)
            },
            killLine: function (a) {
                return ob(a, function (b) {
                    if (b.empty()) {
                        var c = t(a.doc, b.head.line).text.length;
                        return b.head.ch == c && b.head.line < a.lastLine() ? {
                                from: b.head,
                                to: q(b.head.line +
                                    1, 0)
                            }
                            : {
                                from: b.head,
                                to: q(b.head.line, c)
                            }
                    }
                    return {
                        from: b.from(),
                        to: b.to()
                    }
                })
            },
            deleteLine: function (a) {
                return ob(a, function (b) {
                    return {
                        from: q(b.from().line, 0),
                        to: v(a.doc, q(b.to().line + 1, 0))
                    }
                })
            },
            delLineLeft: function (a) {
                return ob(a, function (a) {
                    return {
                        from: q(a.from().line, 0),
                        to: a.from()
                    }
                })
            },
            delWrappedLineLeft: function (a) {
                return ob(a, function (b) {
                    var c = a.charCoords(b.head, "div").top + 5;
                    return {
                        from: a.coordsChar({
                            left: 0,
                            top: c
                        }, "div"),
                        to: b.from()
                    }
                })
            },
            delWrappedLineRight: function (a) {
                return ob(a, function (b) {
                    var c =
                        a.charCoords(b.head, "div").top + 5;
                    c = a.coordsChar({
                        left: a.display.lineDiv.offsetWidth + 100,
                        top: c
                    }, "div");
                    return {
                        from: b.from(),
                        to: c
                    }
                })
            },
            undo: function (a) {
                return a.undo()
            },
            redo: function (a) {
                return a.redo()
            },
            undoSelection: function (a) {
                return a.undoSelection()
            },
            redoSelection: function (a) {
                return a.redoSelection()
            },
            goDocStart: function (a) {
                return a.extendSelection(q(a.firstLine(), 0))
            },
            goDocEnd: function (a) {
                return a.extendSelection(q(a.lastLine()))
            },
            goLineStart: function (a) {
                return a.extendSelectionsBy(function (b) {
                    return Kf(a,
                        b.head.line)
                }, {
                    origin: "+move",
                    bias: 1
                })
            },
            goLineStartSmart: function (a) {
                return a.extendSelectionsBy(function (b) {
                    return Lf(a, b.head)
                }, {
                    origin: "+move",
                    bias: 1
                })
            },
            goLineEnd: function (a) {
                return a.extendSelectionsBy(function (b) {
                    b = b.head.line;
                    var c = t(a.doc, b);
                    var d = c;
                    for (var e; e = La(d, !1); )
                        d = e.find(1, !0).line;
                    d != c && (b = C(d));
                    return Nd(!0, a, c, b, -1)
                }, {
                    origin: "+move",
                    bias: -1
                })
            },
            goLineRight: function (a) {
                return a.extendSelectionsBy(function (b) {
                    b = a.cursorCoords(b.head, "div").top + 5;
                    return a.coordsChar({
                        left: a.display.lineDiv.offsetWidth +
                            100,
                        top: b
                    }, "div")
                }, bc)
            },
            goLineLeft: function (a) {
                return a.extendSelectionsBy(function (b) {
                    b = a.cursorCoords(b.head, "div").top + 5;
                    return a.coordsChar({
                        left: 0,
                        top: b
                    }, "div")
                }, bc)
            },
            goLineLeftSmart: function (a) {
                return a.extendSelectionsBy(function (b) {
                    var c = a.cursorCoords(b.head, "div").top + 5;
                    c = a.coordsChar({
                        left: 0,
                        top: c
                    }, "div");
                    return c.ch < a.getLine(c.line).search(/\S/) ? Lf(a, b.head) : c
                }, bc)
            },
            goLineUp: function (a) {
                return a.moveV(-1, "line")
            },
            goLineDown: function (a) {
                return a.moveV(1, "line")
            },
            goPageUp: function (a) {
                return a.moveV(-1,
                    "page")
            },
            goPageDown: function (a) {
                return a.moveV(1, "page")
            },
            goCharLeft: function (a) {
                return a.moveH(-1, "char")
            },
            goCharRight: function (a) {
                return a.moveH(1, "char")
            },
            goColumnLeft: function (a) {
                return a.moveH(-1, "column")
            },
            goColumnRight: function (a) {
                return a.moveH(1, "column")
            },
            goWordLeft: function (a) {
                return a.moveH(-1, "word")
            },
            goGroupRight: function (a) {
                return a.moveH(1, "group")
            },
            goGroupLeft: function (a) {
                return a.moveH(-1, "group")
            },
            goWordRight: function (a) {
                return a.moveH(1, "word")
            },
            delCharBefore: function (a) {
                return a.deleteH(-1,
                    "char")
            },
            delCharAfter: function (a) {
                return a.deleteH(1, "char")
            },
            delWordBefore: function (a) {
                return a.deleteH(-1, "word")
            },
            delWordAfter: function (a) {
                return a.deleteH(1, "word")
            },
            delGroupBefore: function (a) {
                return a.deleteH(-1, "group")
            },
            delGroupAfter: function (a) {
                return a.deleteH(1, "group")
            },
            indentAuto: function (a) {
                return a.indentSelection("smart")
            },
            indentMore: function (a) {
                return a.indentSelection("add")
            },
            indentLess: function (a) {
                return a.indentSelection("subtract")
            },
            insertTab: function (a) {
                return a.replaceSelection("\t")
            },
            insertSoftTab: function (a) {
                for (var b = [], c = a.listSelections(), d = a.options.tabSize, e = 0; e < c.length; e++) {
                    var f = c[e].from();
                    f = ia(a.getLine(f.line), f.ch, d);
                    b.push(Qc(d - f % d))
                }
                a.replaceSelections(b)
            },
            defaultTab: function (a) {
                a.somethingSelected() ? a.indentSelection("add") : a.execCommand("insertTab")
            },
            transposeChars: function (a) {
                return ca(a, function () {
                    for (var b = a.listSelections(), c = [], d = 0; d < b.length; d++)
                        if (b[d].empty()) {
                            var e = b[d].head,
                                f = t(a.doc, e.line).text;
                            if (f)
                                if (e.ch == f.length && (e = new q(e.line, e.ch - 1)), 0 < e.ch)
                                    e =
                                        new q(e.line, e.ch + 1), a.replaceRange(f.charAt(e.ch - 1) + f.charAt(e.ch - 2), q(e.line, e.ch - 2), e, "+transpose");
                                else if (e.line > a.doc.first) {
                                    var g = t(a.doc, e.line - 1).text;
                                    g && (e = new q(e.line, 1), a.replaceRange(f.charAt(0) + a.doc.lineSeparator() + g.charAt(g.length - 1), q(e.line - 1, g.length - 1), e, "+transpose"))
                                }
                            c.push(new A(e, e))
                        }
                    a.setSelections(c)
                })
            },
            newlineAndIndent: function (a) {
                return ca(a, function () {
                    for (var b = a.listSelections(), c = b.length - 1; 0 <= c; c--)
                        a.replaceRange(a.doc.lineSeparator(), b[c].anchor, b[c].head, "+input");
                    b = a.listSelections();
                    for (c = 0; c < b.length; c++)
                        a.indentLine(b[c].from().line, null, !0);
                    fb(a)
                })
            },
            openLine: function (a) {
                return a.replaceSelection("\n", "start")
            },
            toggleOverwrite: function (a) {
                return a.toggleOverwrite()
            }
        },
        Xg = new Za,
        Od = null,
        Pd = function (a, b, c) {
            this.time = a;
            this.pos = b;
            this.button = c
        };
    Pd.prototype.compare = function (a, b, c) {
        return this.time + 400 > a && 0 == x(b, this.pos) && c == this.button
    };
    var Wb,
        Vb,
        pb = {
            toString: function () {
                return "CodeMirror.Init"
            }
        },
        Vf = {},
        Kc = {};
    G.defaults = Vf;
    G.optionHandlers = Kc;
    var Sd = [];
    G.defineInitHook =
        function (a) {
            return Sd.push(a)
        };
    var da = null,
        D = function (a) {
            this.cm = a;
            this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
            this.polling = new Za;
            this.composing = null;
            this.gracePeriod = !1;
            this.readDOMTimeout = null
        };
    D.prototype.init = function (a) {
        function b(a) {
            if (!N(e, a)) {
                if (e.somethingSelected())
                    da = {
                        lineWise: !1,
                        text: e.getSelections()
                    },
                    "cut" == a.type && e.replaceSelection("", null, "cut");
                else if (e.options.lineWiseCopyCut) {
                    var b = $f(e);
                    da = {
                        lineWise: !0,
                        text: b.text
                    };
                    "cut" == a.type && e.operation(function () {
                        e.setSelections(b.ranges,
                            0, va);
                        e.replaceSelection("", null, "cut")
                    })
                } else
                    return;
                if (a.clipboardData) {
                    a.clipboardData.clearData();
                    var c = da.text.join("\n");
                    a.clipboardData.setData("Text", c);
                    if (a.clipboardData.getData("Text") == c) {
                        a.preventDefault();
                        return
                    }
                }
                var g = bg();
                a = g.firstChild;
                e.display.lineSpace.insertBefore(g, e.display.lineSpace.firstChild);
                a.value = da.text.join("\n");
                var m = document.activeElement;
                ac(a);
                setTimeout(function () {
                    e.display.lineSpace.removeChild(g);
                    m.focus();
                    m == f && d.showPrimarySelection()
                }, 50)
            }
        }
        var c = this,
            d = this,
            e = d.cm,
            f = d.div = a.lineDiv;
        ag(f, e.options.spellcheck);
        w(f, "paste", function (a) {
            N(e, a) || Zf(a, e) || 11 >= F && setTimeout(O(e, function () {
                return c.updateFromDOM()
            }), 20)
        });
        w(f, "compositionstart", function (a) {
            c.composing = {
                data: a.data,
                done: !1
            }
        });
        w(f, "compositionupdate", function (a) {
            c.composing || (c.composing = {
                data: a.data,
                done: !1
            })
        });
        w(f, "compositionend", function (a) {
            c.composing && (a.data != c.composing.data && c.readFromDOMSoon(), c.composing.done = !0)
        });
        w(f, "touchstart", function () {
            return d.forceCompositionEnd()
        });
        w(f, "input",
            function () {
                c.composing || c.readFromDOMSoon()
            });
        w(f, "copy", b);
        w(f, "cut", b)
    };
    D.prototype.prepareSelection = function () {
        var a = Ne(this.cm, !1);
        a.focus = this.cm.state.focused;
        return a
    };
    D.prototype.showSelection = function (a, b) {
        a && this.cm.display.view.length && ((a.focus || b) && this.showPrimarySelection(), this.showMultipleSelections(a))
    };
    D.prototype.showPrimarySelection = function () {
        var a = window.getSelection(),
            b = this.cm,
            c = b.doc.sel.primary(),
            d = c.from();
        c = c.to();
        if (b.display.viewTo == b.display.viewFrom || d.line >= b.display.viewTo ||
            c.line < b.display.viewFrom)
            a.removeAllRanges();
        else {
            var e = Lc(b, a.anchorNode, a.anchorOffset),
                f = Lc(b, a.focusNode, a.focusOffset);
            if (!e || e.bad || !f || f.bad || 0 != x(kc(e, f), d) || 0 != x(jc(e, f), c))
                if (e = b.display.view, d = d.line >= b.display.viewFrom && dg(b, d) || {
                    node: e[0].measure.map[2],
                    offset: 0
                }, c = c.line < b.display.viewTo && dg(b, c), c || (c = e[e.length - 1].measure, c = c.maps ? c.maps[c.maps.length - 1] : c.map, c = {
                    node: c[c.length - 1],
                    offset: c[c.length - 2] - c[c.length - 3]
                }), d && c) {
                    e = a.rangeCount && a.getRangeAt(0);
                    try {
                        var g = zb(d.node, d.offset,
                            c.offset, c.node)
                    } catch (h) {}
                    g && (!Aa && b.state.focused ? (a.collapse(d.node, d.offset), g.collapsed || (a.removeAllRanges(), a.addRange(g))) : (a.removeAllRanges(), a.addRange(g)), e && null == a.anchorNode ? a.addRange(e) : Aa && this.startGracePeriod());
                    this.rememberSelection()
                } else
                    a.removeAllRanges()
        }
    };
    D.prototype.startGracePeriod = function () {
        var a = this;
        clearTimeout(this.gracePeriod);
        this.gracePeriod = setTimeout(function () {
            a.gracePeriod = !1;
            a.selectionChanged() && a.cm.operation(function () {
                return a.cm.curOp.selectionChanged =
                    !0
            })
        }, 20)
    };
    D.prototype.showMultipleSelections = function (a) {
        E(this.cm.display.cursorDiv, a.cursors);
        E(this.cm.display.selectionDiv, a.selection)
    };
    D.prototype.rememberSelection = function () {
        var a = window.getSelection();
        this.lastAnchorNode = a.anchorNode;
        this.lastAnchorOffset = a.anchorOffset;
        this.lastFocusNode = a.focusNode;
        this.lastFocusOffset = a.focusOffset
    };
    D.prototype.selectionInEditor = function () {
        var a = window.getSelection();
        if (!a.rangeCount)
            return !1;
        a = a.getRangeAt(0).commonAncestorContainer;
        return ka(this.div,
            a)
    };
    D.prototype.focus = function () {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0), this.div.focus())
    };
    D.prototype.blur = function () {
        this.div.blur()
    };
    D.prototype.getField = function () {
        return this.div
    };
    D.prototype.supportsTouch = function () {
        return !0
    };
    D.prototype.receivedFocus = function () {
        function a() {
            b.cm.state.focused && (b.pollSelection(), b.polling.set(b.cm.options.pollInterval, a))
        }
        var b = this;
        this.selectionInEditor() ? this.pollSelection() : ca(this.cm,
            function () {
                return b.cm.curOp.selectionChanged = !0
            });
        this.polling.set(this.cm.options.pollInterval, a)
    };
    D.prototype.selectionChanged = function () {
        var a = window.getSelection();
        return a.anchorNode != this.lastAnchorNode || a.anchorOffset != this.lastAnchorOffset || a.focusNode != this.lastFocusNode || a.focusOffset != this.lastFocusOffset
    };
    D.prototype.pollSelection = function () {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
            var a = window.getSelection(),
                b = this.cm;
            if (sc && rc && this.cm.options.gutters.length &&
                lh(a.anchorNode))
                this.cm.triggerOnKeyDown({
                    type: "keydown",
                    keyCode: 8,
                    preventDefault: Math.abs
                }), this.blur(), this.focus();
            else if (!this.composing) {
                this.rememberSelection();
                var c = Lc(b, a.anchorNode, a.anchorOffset),
                    d = Lc(b, a.focusNode, a.focusOffset);
                c && d && ca(b, function () {
                    T(b.doc, za(c, d), va);
                    if (c.bad || d.bad)
                        b.curOp.selectionChanged = !0
                })
            }
        }
    };
    D.prototype.pollContent = function () {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var a = this.cm,
            b = a.display,
            c = a.doc.sel.primary(),
            d = c.from(),
            e = c.to();
        0 == d.ch && d.line > a.firstLine() && (d = q(d.line - 1, t(a.doc, d.line - 1).length));
        e.ch == t(a.doc, e.line).text.length && e.line < a.lastLine() && (e = q(e.line + 1, 0));
        if (d.line < b.viewFrom || e.line > b.viewTo - 1)
            return !1;
        var f;
        d.line == b.viewFrom || 0 == (f = Pa(a, d.line)) ? (c = C(b.view[0].line), f = b.view[0].node) : (c = C(b.view[f].line), f = b.view[f - 1].node.nextSibling);
        var g = Pa(a, e.line);
        g == b.view.length - 1 ? (e = b.viewTo - 1, b = b.lineDiv.lastChild) : (e = C(b.view[g + 1].line) - 1, b = b.view[g + 1].node.previousSibling);
        if (!f)
            return !1;
        b = a.doc.splitLines(mh(a, f, b, c, e));
        for (f = Ja(a.doc, q(c, 0), q(e, t(a.doc, e).text.length)); 1 < b.length && 1 < f.length; )
            if (y(b) == y(f))
                b.pop(), f.pop(), e--;
            else if (b[0] == f[0])
                b.shift(), f.shift(), c++;
            else
                break;
        var h = 0;
        g = 0;
        for (var k = b[0], l = f[0], m = Math.min(k.length, l.length); h < m && k.charCodeAt(h) == l.charCodeAt(h); )
            ++h;
        k = y(b);
        l = y(f);
        for (m = Math.min(k.length - (1 == b.length ? h : 0), l.length - (1 == f.length ? h : 0)); g < m && k.charCodeAt(k.length - g - 1) == l.charCodeAt(l.length - g - 1); )
            ++g;
        if (1 == b.length && 1 == f.length && c == d.line)
            for (; h && h >
                   d.ch && k.charCodeAt(k.length - g - 1) == l.charCodeAt(l.length - g - 1); )
                h--, g++;
        b[b.length - 1] = k.slice(0, k.length - g).replace(/^\u200b+/, "");
        b[0] = b[0].slice(h).replace(/\u200b+$/, "");
        d = q(c, h);
        c = q(e, f.length ? y(f).length - g : 0);
        if (1 < b.length || b[0] || x(d, c))
            return lb(a.doc, b, d, c, "+input"), !0
    };
    D.prototype.ensurePolled = function () {
        this.forceCompositionEnd()
    };
    D.prototype.reset = function () {
        this.forceCompositionEnd()
    };
    D.prototype.forceCompositionEnd = function () {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing =
            null, this.updateFromDOM(), this.div.blur(), this.div.focus())
    };
    D.prototype.readFromDOMSoon = function () {
        var a = this;
        null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function () {
            a.readDOMTimeout = null;
            if (a.composing)
                if (a.composing.done)
                    a.composing = null;
                else
                    return;
            a.updateFromDOM()
        }, 80))
    };
    D.prototype.updateFromDOM = function () {
        var a = this;
        !this.cm.isReadOnly() && this.pollContent() || ca(this.cm, function () {
            return Z(a.cm)
        })
    };
    D.prototype.setUneditable = function (a) {
        a.contentEditable = "false"
    };
    D.prototype.onKeyPress =
        function (a) {
            0 != a.charCode && (a.preventDefault(), this.cm.isReadOnly() || O(this.cm, Td)(this.cm, String.fromCharCode(null == a.charCode ? a.keyCode : a.charCode), 0))
        };
    D.prototype.readOnlyChanged = function (a) {
        this.div.contentEditable = String("nocursor" != a)
    };
    D.prototype.onContextMenu = function () {};
    D.prototype.resetPosition = function () {};
    D.prototype.needsContentAttribute = !0;
    var M = function (a) {
        this.cm = a;
        this.prevInput = "";
        this.pollingFast = !1;
        this.polling = new Za;
        this.hasSelection = !1;
        this.composing = null
    };
    M.prototype.init =
        function (a) {
            function b(a) {
                if (!N(e, a)) {
                    if (e.somethingSelected())
                        da = {
                            lineWise: !1,
                            text: e.getSelections()
                        };
                    else if (e.options.lineWiseCopyCut) {
                        var b = $f(e);
                        da = {
                            lineWise: !0,
                            text: b.text
                        };
                        "cut" == a.type ? e.setSelections(b.ranges, null, va) : (d.prevInput = "", g.value = b.text.join("\n"), ac(g))
                    } else
                        return;
                    "cut" == a.type && (e.state.cutIncoming = !0)
                }
            }
            var c = this,
                d = this,
                e = this.cm,
                f = this.wrapper = bg(),
                g = this.textarea = f.firstChild;
            a.wrapper.insertBefore(f, a.wrapper.firstChild);
            Zb && (g.style.width = "0px");
            w(g, "input", function () {
                B &&
                9 <= F && c.hasSelection && (c.hasSelection = null);
                d.poll()
            });
            w(g, "paste", function (a) {
                N(e, a) || Zf(a, e) || (e.state.pasteIncoming = !0, d.fastPoll())
            });
            w(g, "cut", b);
            w(g, "copy", b);
            w(a.scroller, "paste", function (b) {
                ya(a, b) || N(e, b) || (e.state.pasteIncoming = !0, d.focus())
            });
            w(a.lineSpace, "selectstart", function (b) {
                ya(a, b) || Y(b)
            });
            w(g, "compositionstart", function () {
                var a = e.getCursor("from");
                d.composing && d.composing.range.clear();
                d.composing = {
                    start: a,
                    range: e.markText(a, e.getCursor("to"), {
                        className: "CodeMirror-composing"
                    })
                }
            });
            w(g, "compositionend", function () {
                d.composing && (d.poll(), d.composing.range.clear(), d.composing = null)
            })
        };
    M.prototype.prepareSelection = function () {
        var a = this.cm,
            b = a.display,
            c = a.doc,
            d = Ne(a);
        if (a.options.moveInputWithCursor) {
            a = na(a, c.sel.primary().head, "div");
            c = b.wrapper.getBoundingClientRect();
            var e = b.lineDiv.getBoundingClientRect();
            d.teTop = Math.max(0, Math.min(b.wrapper.clientHeight - 10, a.top + e.top - c.top));
            d.teLeft = Math.max(0, Math.min(b.wrapper.clientWidth - 10, a.left + e.left - c.left))
        }
        return d
    };
    M.prototype.showSelection =
        function (a) {
            var b = this.cm.display;
            E(b.cursorDiv, a.cursors);
            E(b.selectionDiv, a.selection);
            null != a.teTop && (this.wrapper.style.top = a.teTop + "px", this.wrapper.style.left = a.teLeft + "px")
        };
    M.prototype.reset = function (a) {
        if (!this.contextMenuPending && !this.composing) {
            var b = this.cm;
            b.somethingSelected() ? (this.prevInput = "", a = b.getSelection(), this.textarea.value = a, b.state.focused && ac(this.textarea), B && 9 <= F && (this.hasSelection = a)) : a || (this.prevInput = this.textarea.value = "", B && 9 <= F && (this.hasSelection = null))
        }
    };
    M.prototype.getField =
        function () {
            return this.textarea
        };
    M.prototype.supportsTouch = function () {
        return !1
    };
    M.prototype.focus = function () {
        if ("nocursor" != this.cm.options.readOnly && (!sb || wa() != this.textarea))
            try {
                this.textarea.focus()
            } catch (a) {}
    };
    M.prototype.blur = function () {
        this.textarea.blur()
    };
    M.prototype.resetPosition = function () {
        this.wrapper.style.top = this.wrapper.style.left = 0
    };
    M.prototype.receivedFocus = function () {
        this.slowPoll()
    };
    M.prototype.slowPoll = function () {
        var a = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval,
            function () {
                a.poll();
                a.cm.state.focused && a.slowPoll()
            })
    };
    M.prototype.fastPoll = function () {
        function a() {
            c.poll() || b ? (c.pollingFast = !1, c.slowPoll()) : (b = !0, c.polling.set(60, a))
        }
        var b = !1,
            c = this;
        c.pollingFast = !0;
        c.polling.set(20, a)
    };
    M.prototype.poll = function () {
        var a = this,
            b = this.cm,
            c = this.textarea,
            d = this.prevInput;
        if (this.contextMenuPending || !b.state.focused || rh(c) && !d && !this.composing || b.isReadOnly() || b.options.disableInput || b.state.keySeq)
            return !1;
        var e = c.value;
        if (e == d && !b.somethingSelected())
            return !1;
        if (B && 9 <= F && this.hasSelection === e || la && /[\uf700-\uf7ff]/.test(e))
            return b.display.input.reset(), !1;
        if (b.doc.sel == b.display.selForContextMenu) {
            var f = e.charCodeAt(0);
            8203 != f || d || (d = "\u200b");
            if (8666 == f)
                return this.reset(), this.cm.execCommand("undo")
        }
        var g = 0;
        for (f = Math.min(d.length, e.length); g < f && d.charCodeAt(g) == e.charCodeAt(g); )
            ++g;
        ca(b, function () {
            Td(b, e.slice(g), d.length - g, null, a.composing ? "*compose" : null);
            1E3 < e.length || -1 < e.indexOf("\n") ? c.value = a.prevInput = "" : a.prevInput = e;
            a.composing && (a.composing.range.clear(),
                a.composing.range = b.markText(a.composing.start, b.getCursor("to"), {
                    className: "CodeMirror-composing"
                }))
        });
        return !0
    };
    M.prototype.ensurePolled = function () {
        this.pollingFast && this.poll() && (this.pollingFast = !1)
    };
    M.prototype.onKeyPress = function () {
        B && 9 <= F && (this.hasSelection = null);
        this.fastPoll()
    };
    M.prototype.onContextMenu = function (a) {
        function b() {
            if (null != g.selectionStart) {
                var a = e.somethingSelected(),
                    b = "\u200b" + (a ? g.value : "");
                g.value = "\u21da";
                g.value = b;
                d.prevInput = a ? "" : "\u200b";
                g.selectionStart = 1;
                g.selectionEnd =
                    b.length;
                f.selForContextMenu = e.doc.sel
            }
        }
        function c() {
            d.contextMenuPending = !1;
            d.wrapper.style.cssText = m;
            g.style.cssText = l;
            B && 9 > F && f.scrollbars.setScrollTop(f.scroller.scrollTop = k);
            if (null != g.selectionStart) {
                (!B || B && 9 > F) && b();
                var a = 0,
                    c = function () {
                        f.selForContextMenu == e.doc.sel && 0 == g.selectionStart && 0 < g.selectionEnd && "\u200b" == d.prevInput ? O(e, tf)(e) : 10 > a++ ? f.detectingSelectAll = setTimeout(c, 500) : (f.selForContextMenu = null, f.input.reset())
                    };
                f.detectingSelectAll = setTimeout(c, 200)
            }
        }
        var d = this,
            e = d.cm,
            f = e.display,
            g = d.textarea,
            h = Ta(e, a),
            k = f.scroller.scrollTop;
        if (h && !oa) {
            e.options.resetSelectionOnContextMenu && -1 == e.doc.sel.contains(h) && O(e, T)(e.doc, za(h), va);
            var l = g.style.cssText,
                m = d.wrapper.style.cssText;
            d.wrapper.style.cssText = "position: absolute";
            h = d.wrapper.getBoundingClientRect();
            g.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (a.clientY - h.top - 5) + "px; left: " + (a.clientX - h.left - 5) + "px;\n      z-index: 1000; background: " + (B ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
            if (U)
                var p = window.scrollY;
            f.input.focus();
            U && window.scrollTo(null, p);
            f.input.reset();
            e.somethingSelected() || (g.value = d.prevInput = " ");
            d.contextMenuPending = !0;
            f.selForContextMenu = e.doc.sel;
            clearTimeout(f.detectingSelectAll);
            B && 9 <= F && b();
            if (Qd) {
                xb(a);
                var n = function () {
                    ea(window, "mouseup", n);
                    setTimeout(c, 20)
                };
                w(window, "mouseup", n)
            } else
                setTimeout(c, 50)
        }
    };
    M.prototype.readOnlyChanged = function (a) {
        a || this.reset();
        this.textarea.disabled = "nocursor" == a
    };
    M.prototype.setUneditable = function () {};
    M.prototype.needsContentAttribute =
        !1;
    (function (a) {
        function b(b, e, f, g) {
            a.defaults[b] = e;
            f && (c[b] = g ? function (a, b, d) {
                    d != pb && f(a, b, d)
                }
                : f)
        }
        var c = a.optionHandlers;
        a.defineOption = b;
        a.Init = pb;
        b("value", "", function (a, b) {
            return a.setValue(b)
        }, !0);
        b("mode", null, function (a, b) {
            a.doc.modeOption = b;
            Fd(a)
        }, !0);
        b("indentUnit", 2, Fd, !0);
        b("indentWithTabs", !1);
        b("smartIndent", !0);
        b("tabSize", 4, function (a) {
            Lb(a);
            Eb(a);
            Z(a)
        }, !0);
        b("lineSeparator", null, function (a, b) {
            if (a.doc.lineSep = b) {
                var d = [],
                    c = a.doc.first;
                a.doc.iter(function (a) {
                    for (var e = 0; ; ) {
                        var f = a.text.indexOf(b,
                            e);
                        if (-1 == f)
                            break;
                        e = f + b.length;
                        d.push(q(c, f))
                    }
                    c++
                });
                for (var e = d.length - 1; 0 <= e; e--)
                    lb(a.doc, b, d[e], q(d[e].line, d[e].ch + b.length))
            }
        });
        b("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function (a, b, c) {
            a.state.specialChars = new RegExp(b.source + (b.test("\t") ? "" : "|\t"), "g");
            c != pb && a.refresh()
        });
        b("specialCharPlaceholder", xg, function (a) {
            return a.refresh()
        }, !0);
        b("electricChars", !0);
        b("inputStyle", sb ? "contenteditable" : "textarea", function () {
            throw Error("inputStyle can not (yet) be changed in a running editor");
        }, !0);
        b("spellcheck", !1, function (a, b) {
            return a.getInputField().spellcheck = b
        }, !0);
        b("rtlMoveVisually", !qh);
        b("wholeLineUpdateBefore", !0);
        b("theme", "default", function (a) {
            Uf(a);
            Xb(a)
        }, !0);
        b("keyMap", "default", function (a, b, c) {
            b = Gc(b);
            (c = c != pb && Gc(c)) && c.detach && c.detach(a, b);
            b.attach && b.attach(a, c || null)
        });
        b("extraKeys", null);
        b("configureMouse", null);
        b("lineWrapping", !1, jh, !0);
        b("gutters", [], function (a) {
            Dd(a.options);
            Xb(a)
        }, !0);
        b("fixedGutter", !0, function (a, b) {
            a.display.gutters.style.left = b ? td(a.display) +
                "px" : "0";
            a.refresh()
        }, !0);
        b("coverGutterNextToScrollbar", !1, function (a) {
            return gb(a)
        }, !0);
        b("scrollbarStyle", "native", function (a) {
            Xe(a);
            gb(a);
            a.display.scrollbars.setScrollTop(a.doc.scrollTop);
            a.display.scrollbars.setScrollLeft(a.doc.scrollLeft)
        }, !0);
        b("lineNumbers", !1, function (a) {
            Dd(a.options);
            Xb(a)
        }, !0);
        b("firstLineNumber", 1, Xb, !0);
        b("lineNumberFormatter", function (a) {
            return a
        }, Xb, !0);
        b("showCursorWhenSelecting", !1, Fb, !0);
        b("resetSelectionOnContextMenu", !0);
        b("lineWiseCopyCut", !0);
        b("pasteLinesPerSelection",
            !0);
        b("readOnly", !1, function (a, b) {
            "nocursor" == b && (Gb(a), a.display.input.blur());
            a.display.input.readOnlyChanged(b)
        });
        b("disableInput", !1, function (a, b) {
            b || a.display.input.reset()
        }, !0);
        b("dragDrop", !0, ih);
        b("allowDropFileTypes", null);
        b("cursorBlinkRate", 530);
        b("cursorScrollMargin", 0);
        b("cursorHeight", 1, Fb, !0);
        b("singleCursorHeightPerLine", !0, Fb, !0);
        b("workTime", 100);
        b("workDelay", 100);
        b("flattenSpans", !0, Lb, !0);
        b("addModeClass", !1, Lb, !0);
        b("pollInterval", 100);
        b("undoDepth", 200, function (a, b) {
            return a.doc.history.undoDepth =
                b
        });
        b("historyEventDelay", 1250);
        b("viewportMargin", 10, function (a) {
            return a.refresh()
        }, !0);
        b("maxHighlightLength", 1E4, Lb, !0);
        b("moveInputWithCursor", !0, function (a, b) {
            b || a.display.input.resetPosition()
        });
        b("tabindex", null, function (a, b) {
            return a.display.input.getField().tabIndex = b || ""
        });
        b("autofocus", null);
        b("direction", "ltr", function (a, b) {
            return a.doc.setDirection(b)
        }, !0)
    })(G);
    (function (a) {
        var b = a.optionHandlers,
            c = a.helpers = {};
        a.prototype = {
            constructor: a,
            focus: function () {
                window.focus();
                this.display.input.focus()
            },
            setOption: function (a, c) {
                var d = this.options,
                    e = d[a];
                if (d[a] != c || "mode" == a)
                    d[a] = c, b.hasOwnProperty(a) && O(this, b[a])(this, c, e), J(this, "optionChange", this, a)
            },
            getOption: function (a) {
                return this.options[a]
            },
            getDoc: function () {
                return this.doc
            },
            addKeyMap: function (a, b) {
                this.state.keyMaps[b ? "push" : "unshift"](Gc(a))
            },
            removeKeyMap: function (a) {
                for (var b = this.state.keyMaps, c = 0; c < b.length; ++c)
                    if (b[c] == a || b[c].name == a)
                        return b.splice(c, 1), !0
            },
            addOverlay: W(function (b, c) {
                var d = b.token ? b : a.getMode(this.options, b);
                if (d.startState)
                    throw Error("Overlays may not be stateful.");
                hg(this.state.overlays, {
                    mode: d,
                    modeSpec: b,
                    opaque: c && c.opaque,
                    priority: c && c.priority || 0
                }, function (a) {
                    return a.priority
                });
                this.state.modeGen++;
                Z(this)
            }),
            removeOverlay: W(function (a) {
                for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
                    var d = b[c].modeSpec;
                    if (d == a || "string" == typeof a && d.name == a) {
                        b.splice(c, 1);
                        this.state.modeGen++;
                        Z(this);
                        break
                    }
                }
            }),
            indentLine: W(function (a, b, c) {
                "string" != typeof b && "number" != typeof b && (b = null == b ? this.options.smartIndent ? "smart" : "prev" : b ? "add" : "subtract");
                tb(this.doc, a) && Yb(this,
                    a, b, c)
            }),
            indentSelection: W(function (a) {
                for (var b = this.doc.sel.ranges, c = -1, d = 0; d < b.length; d++) {
                    var h = b[d];
                    if (h.empty())
                        h.head.line > c && (Yb(this, h.head.line, a, !0), c = h.head.line, d == this.doc.sel.primIndex && fb(this));
                    else {
                        var k = h.from();
                        h = h.to();
                        var l = Math.max(c, k.line);
                        c = Math.min(this.lastLine(), h.line - (h.ch ? 0 : 1)) + 1;
                        for (h = l; h < c; ++h)
                            Yb(this, h, a);
                        h = this.doc.sel.ranges;
                        0 == k.ch && b.length == h.length && 0 < h[d].from().ch && Jd(this.doc, d, new A(k, h[d].to()), va)
                    }
                }
            }),
            getTokenAt: function (a, b) {
                return oe(this, a, b)
            },
            getLineTokens: function (a,
                                     b) {
                return oe(this, q(a), b, !0)
            },
            getTokenTypeAt: function (a) {
                a = v(this.doc, a);
                var b = me(this, t(this.doc, a.line)),
                    c = 0,
                    d = (b.length - 1) / 2;
                a = a.ch;
                if (0 == a)
                    b = b[2];
                else
                    for (; ; ) {
                        var h = c + d >> 1;
                        if ((h ? b[2 * h - 1] : 0) >= a)
                            d = h;
                        else if (b[2 * h + 1] < a)
                            c = h + 1;
                        else {
                            b = b[2 * h + 2];
                            break
                        }
                    }
                c = b ? b.indexOf("overlay ") : -1;
                return 0 > c ? b : 0 == c ? null : b.slice(0, c - 1)
            },
            getModeAt: function (b) {
                var c = this.doc.mode;
                return c.innerMode ? a.innerMode(c, this.getTokenAt(b).state).mode : c
            },
            getHelper: function (a, b) {
                return this.getHelpers(a, b)[0]
            },
            getHelpers: function (a,
                                  b) {
                var d = [];
                if (!c.hasOwnProperty(b))
                    return d;
                var e = c[b];
                a = this.getModeAt(a);
                if ("string" == typeof a[b])
                    e[a[b]] && d.push(e[a[b]]);
                else if (a[b])
                    for (var h = 0; h < a[b].length; h++) {
                        var k = e[a[b][h]];
                        k && d.push(k)
                    }
                else
                    a.helperType && e[a.helperType] ? d.push(e[a.helperType]) : e[a.name] && d.push(e[a.name]);
                for (b = 0; b < e._global.length; b++)
                    h = e._global[b], h.pred(a, this) && -1 == Q(d, h.val) && d.push(h.val);
                return d
            },
            getStateAfter: function (a, b) {
                var c = this.doc;
                a = Math.max(c.first, Math.min(null == a ? c.first + c.size - 1 : a, c.first + c.size -
                    1));
                return yb(this, a + 1, b).state
            },
            cursorCoords: function (a, b) {
                var c = this.doc.sel.primary();
                a = null == a ? c.head : "object" == typeof a ? v(this.doc, a) : a ? c.from() : c.to();
                return na(this, a, b || "page")
            },
            charCoords: function (a, b) {
                return pd(this, v(this.doc, a), b || "page")
            },
            coordsChar: function (a, b) {
                a = Ie(this, a, b || "page");
                return rd(this, a.left, a.top)
            },
            lineAtHeight: function (a, b) {
                a = Ie(this, {
                    top: a,
                    left: 0
                }, b || "page").top;
                return Ka(this.doc, a + this.display.viewOffset)
            },
            heightAtLine: function (a, b, c) {
                var d = !1;
                if ("number" == typeof a) {
                    var e =
                        this.doc.first + this.doc.size - 1;
                    a < this.doc.first ? a = this.doc.first : a > e && (a = e, d = !0);
                    a = t(this.doc, a)
                }
                return tc(this, a, {
                    top: 0,
                    left: 0
                }, b || "page", c || d).top + (d ? this.doc.height - sa(a) : 0)
            },
            defaultTextHeight: function () {
                return Ra(this.display)
            },
            defaultCharWidth: function () {
                return Db(this.display)
            },
            getViewport: function () {
                return {
                    from: this.display.viewFrom,
                    to: this.display.viewTo
                }
            },
            addWidget: function (a, b, c, g, h) {
                var d = this.display;
                a = na(this, v(this.doc, a));
                var e = a.bottom,
                    f = a.left;
                b.style.position = "absolute";
                b.setAttribute("cm-ignore-events",
                    "true");
                this.display.input.setUneditable(b);
                d.sizer.appendChild(b);
                if ("over" == g)
                    e = a.top;
                else if ("above" == g || "near" == g) {
                    var p = Math.max(d.wrapper.clientHeight, this.doc.height),
                        n = Math.max(d.sizer.clientWidth, d.lineSpace.clientWidth);
                    ("above" == g || a.bottom + b.offsetHeight > p) && a.top > b.offsetHeight ? e = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= p && (e = a.bottom);
                    f + b.offsetWidth > n && (f = n - b.offsetWidth)
                }
                b.style.top = e + "px";
                b.style.left = b.style.right = "";
                "right" == h ? (f = d.sizer.clientWidth - b.offsetWidth, b.style.right =
                    "0px") : ("left" == h ? f = 0 : "middle" == h && (f = (d.sizer.clientWidth - b.offsetWidth) / 2), b.style.left = f + "px");
                c && (a = zd(this, {
                    left: f,
                    top: e,
                    right: f + b.offsetWidth,
                    bottom: e + b.offsetHeight
                }), null != a.scrollTop && Ib(this, a.scrollTop), null != a.scrollLeft && Va(this, a.scrollLeft))
            },
            triggerOnKeyDown: W(Of),
            triggerOnKeyPress: W(Qf),
            triggerOnKeyUp: Pf,
            triggerOnMouseDown: W(Rf),
            execCommand: function (a) {
                if (Tb.hasOwnProperty(a))
                    return Tb[a].call(null, this)
            },
            triggerElectric: W(function (a) {
                Yf(this, a)
            }),
            findPosH: function (a, b, c, g) {
                var d =
                    1;
                0 > b && (d = -1, b = -b);
                a = v(this.doc, a);
                for (var e = 0; e < b && (a = Vd(this.doc, a, d, c, g), !a.hitSide); ++e);
                return a
            },
            moveH: W(function (a, b) {
                var c = this;
                this.extendSelectionsBy(function (d) {
                    return c.display.shift || c.doc.extend || d.empty() ? Vd(c.doc, d.head, a, b, c.options.rtlMoveVisually) : 0 > a ? d.from() : d.to()
                }, bc)
            }),
            deleteH: W(function (a, b) {
                var c = this.doc;
                this.doc.sel.somethingSelected() ? c.replaceSelection("", null, "+delete") : ob(this, function (d) {
                    var e = Vd(c, d.head, a, b, !1);
                    return 0 > a ? {
                            from: e,
                            to: d.head
                        }
                        : {
                            from: d.head,
                            to: e
                        }
                })
            }),
            findPosV: function (a, b, c, g) {
                var d = 1;
                0 > b && (d = -1, b = -b);
                var e = v(this.doc, a);
                for (a = 0; a < b && (e = na(this, e, "div"), null == g ? g = e.left : e.left = g, e = cg(this, e, d, c), !e.hitSide); ++a);
                return e
            },
            moveV: W(function (a, b) {
                var c = this,
                    d = this.doc,
                    e = [],
                    k = !this.display.shift && !d.extend && d.sel.somethingSelected();
                d.extendSelectionsBy(function (f) {
                    if (k)
                        return 0 > a ? f.from() : f.to();
                    var g = na(c, f.head, "div");
                    null != f.goalColumn && (g.left = f.goalColumn);
                    e.push(g.left);
                    var h = cg(c, g, a, b);
                    "page" == b && f == d.sel.primary() && wc(c, pd(c, h, "div").top -
                        g.top);
                    return h
                }, bc);
                if (e.length)
                    for (var l = 0; l < d.sel.ranges.length; l++)
                        d.sel.ranges[l].goalColumn = e[l]
            }),
            findWordAt: function (a) {
                var b = t(this.doc, a.line).text,
                    c = a.ch,
                    d = a.ch;
                if (b) {
                    var h = this.getHelper(a, "wordChars");
                    "before" != a.sticky && d != b.length || !c ? ++d : --c;
                    var k = b.charAt(c);
                    for (k = ic(k, h) ? function (a) {
                            return ic(a, h)
                        }
                        : /\s/.test(k) ? function (a) {
                                return /\s/.test(a)
                            }
                            : function (a) {
                                return !/\s/.test(a) && !ic(a)
                            }; 0 < c && k(b.charAt(c - 1)); )
                        --c;
                    for (; d < b.length && k(b.charAt(d)); )
                        ++d
                }
                return new A(q(a.line, c), q(a.line,
                    d))
            },
            toggleOverwrite: function (a) {
                if (null == a || a != this.state.overwrite)
                    (this.state.overwrite = !this.state.overwrite) ? Ha(this.display.cursorDiv, "CodeMirror-overwrite") : Ua(this.display.cursorDiv, "CodeMirror-overwrite"), J(this, "overwriteToggle", this, this.state.overwrite)
            },
            hasFocus: function () {
                return this.display.input.getField() == wa()
            },
            isReadOnly: function () {
                return !(!this.options.readOnly && !this.doc.cantEdit)
            },
            scrollTo: W(function (a, b) {
                Hb(this, a, b)
            }),
            getScrollInfo: function () {
                var a = this.display.scroller;
                return {
                    left: a.scrollLeft,
                    top: a.scrollTop,
                    height: a.scrollHeight - ua(this) - this.display.barHeight,
                    width: a.scrollWidth - ua(this) - this.display.barWidth,
                    clientHeight: kd(this),
                    clientWidth: Oa(this)
                }
            },
            scrollIntoView: W(function (a, b) {
                null == a ? (a = {
                    from: this.doc.sel.primary().head,
                    to: null
                }, null == b && (b = this.options.cursorScrollMargin)) : "number" == typeof a ? a = {
                        from: q(a, 0),
                        to: null
                    }
                    : null == a.from && (a = {
                    from: a,
                    to: null
                });
                a.to || (a.to = a.from);
                a.margin = b || 0;
                null != a.from.line ? (xc(this), this.curOp.scrollToPos = a) : Ue(this, a.from, a.to, a.margin)
            }),
            setSize: W(function (a,
                                 b) {
                var c = this,
                    d = function (a) {
                        return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a
                    };
                null != a && (this.display.wrapper.style.width = d(a));
                null != b && (this.display.wrapper.style.height = d(b));
                this.options.lineWrapping && Fe(this);
                var e = this.display.viewFrom;
                this.doc.iter(e, this.display.viewTo, function (a) {
                    if (a.widgets)
                        for (var b = 0; b < a.widgets.length; b++)
                            if (a.widgets[b].noHScroll) {
                                Da(c, e, "widget");
                                break
                            }
                    ++e
                });
                this.curOp.forceUpdate = !0;
                J(this, "refresh", this)
            }),
            operation: function (a) {
                return ca(this, a)
            },
            startOperation: function () {
                return Wa(this)
            },
            endOperation: function () {
                return Xa(this)
            },
            refresh: W(function () {
                var a = this.display.cachedTextHeight;
                Z(this);
                this.curOp.forceUpdate = !0;
                Eb(this);
                Hb(this, this.doc.scrollLeft, this.doc.scrollTop);
                yd(this);
                (null == a || .5 < Math.abs(a - Ra(this.display))) && ud(this);
                J(this, "refresh", this)
            }),
            swapDoc: W(function (a) {
                var b = this.doc;
                b.cm = null;
                gf(this, a);
                Eb(this);
                this.display.input.reset();
                Hb(this, a.scrollLeft, a.scrollTop);
                this.curOp.forceScroll = !0;
                S(this, "swapDoc", this, b);
                return b
            }),
            getInputField: function () {
                return this.display.input.getField()
            },
            getWrapperElement: function () {
                return this.display.wrapper
            },
            getScrollerElement: function () {
                return this.display.scroller
            },
            getGutterElement: function () {
                return this.display.gutters
            }
        };
        bb(a);
        a.registerHelper = function (b, e, f) {
            c.hasOwnProperty(b) || (c[b] = a[b] = {
                _global: []
            });
            c[b][e] = f
        };
        a.registerGlobalHelper = function (b, e, f, g) {
            a.registerHelper(b, e, g);
            c[b]._global.push({
                pred: f,
                val: g
            })
        }
    })(G);
    var th = "iter insert remove copy getEditor constructor".split(" "),
        fc;
    for (fc in aa.prototype)
        aa.prototype.hasOwnProperty(fc) &&
        0 > Q(th, fc) && (G.prototype[fc] = function (a) {
            return function () {
                return a.apply(this.doc, arguments)
            }
        }
        (aa.prototype[fc]));
    bb(aa);
    G.inputStyles = {
        textarea: M,
        contenteditable: D
    };
    G.defineMode = function (a) {
        G.defaults.mode || "null" == a || (G.defaults.mode = a);
        pg.apply(this, arguments)
    };
    G.defineMIME = function (a, b) {
        cb[a] = b
    };
    G.defineMode("null", function () {
        return {
            token: function (a) {
                return a.skipToEnd()
            }
        }
    });
    G.defineMIME("text/plain", "null");
    G.defineExtension = function (a, b) {
        G.prototype[a] = b
    };
    G.defineDocExtension = function (a, b) {
        aa.prototype[a] =
            b
    };
    G.fromTextArea = function (a, b) {
        function c() {
            a.value = h.getValue()
        }
        b = b ? Ia(b) : {};
        b.value = a.value;
        !b.tabindex && a.tabIndex && (b.tabindex = a.tabIndex);
        !b.placeholder && a.placeholder && (b.placeholder = a.placeholder);
        if (null == b.autofocus) {
            var d = wa();
            b.autofocus = d == a || null != a.getAttribute("autofocus") && d == document.body
        }
        if (a.form && (w(a.form, "submit", c), !b.leaveSubmitMethodAlone)) {
            var e = a.form;
            var f = e.submit;
            try {
                var g = e.submit = function () {
                    c();
                    e.submit = f;
                    e.submit();
                    e.submit = g
                }
            } catch (k) {}
        }
        b.finishInit = function (b) {
            b.save =
                c;
            b.getTextArea = function () {
                return a
            };
            b.toTextArea = function () {
                b.toTextArea = isNaN;
                c();
                a.parentNode.removeChild(b.getWrapperElement());
                a.style.display = "";
                a.form && (ea(a.form, "submit", c), "function" == typeof a.form.submit && (a.form.submit = f))
            }
        };
        a.style.display = "none";
        var h = G(function (b) {
            return a.parentNode.insertBefore(b, a.nextSibling)
        }, b);
        return h
    };
    (function (a) {
        a.off = ea;
        a.on = w;
        a.wheelEventPixels = Jg;
        a.Doc = aa;
        a.splitLines = Ud;
        a.countColumn = ia;
        a.findColumn = Pc;
        a.isWordChar = Rc;
        a.Pass = Ic;
        a.signal = J;
        a.Line = hb;
        a.changeEnd =
            Ea;
        a.scrollbarModel = Ye;
        a.Pos = q;
        a.cmpPos = x;
        a.modes = cd;
        a.mimeModes = cb;
        a.resolveMode = oc;
        a.getMode = dd;
        a.modeExtensions = db;
        a.extendMode = qg;
        a.copyState = Na;
        a.startState = je;
        a.innerMode = ed;
        a.commands = Tb;
        a.keyMap = Sb;
        a.keyName = Jf;
        a.isModifierKey = Gf;
        a.lookupKey = nb;
        a.normalizeKeyMap = Vg;
        a.StringStream = K;
        a.SharedTextMarker = Rb;
        a.TextMarker = Fa;
        a.LineWidget = Qb;
        a.e_preventDefault = Y;
        a.e_stopPropagation = he;
        a.e_stop = xb;
        a.addClass = Ha;
        a.contains = ka;
        a.rmClass = Ua;
        a.keyNames = Ga
    })(G);
    G.version = "5.32.0";
    return G
});
