(function (r) {
    "object" == typeof exports && "object" == typeof module ? r(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], r) : r(CodeMirror)
})(function (r) {
    r.defineMode("javascript", function (Ga, w) {
        function q(a, c, b) {
            L = a;
            S = b;
            return c
        }
        function A(a, c) {
            var b = a.next();
            if ('"' == b || "'" == b)
                return c.tokenize = Ha(b), c.tokenize(a, c);
            if ("." == b && a.match(/^\d+(?:[eE][+\-]?\d+)?/))
                return q("number", "number");
            if ("." == b && a.match(".."))
                return q("spread", "meta");
            if (/[\[\]{}\(\),;:\.]/.test(b))
                return q(b);
            if ("=" == b && a.eat(">"))
                return q("=>", "operator");
            if ("0" == b && a.match(/^(?:x[\da-f]+|o[0-7]+|b[01]+)n?/i))
                return q("number", "number");
            if (/\d/.test(b))
                return a.match(/^\d*(?:n|(?:\.\d*)?(?:[eE][+\-]?\d+)?)?/), q("number", "number");
            if ("/" == b) {
                if (a.eat("*"))
                    return c.tokenize = T, T(a, c);
                if (a.eat("/"))
                    return a.skipToEnd(), q("comment", "comment");
                if (na(a, c, 1)) {
                    a: for (var d = c = !1; null != (b = a.next()); ) {
                        if (!c) {
                            if ("/" == b && !d)
                                break a;
                            "[" == b ? d = !0 : d && "]" == b && (d = !1)
                        }
                        c = !c && "\\" == b
                    }
                    a.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
                    return q("regexp", "string-2")
                }
                a.eat("=");
                return q("operator", "operator", a.current())
            }
            if ("`" == b)
                return c.tokenize = ca, ca(a, c);
            if ("#" == b)
                return a.skipToEnd(), q("error", "error");
            if (oa.test(b))
                return ">" == b && c.lexical && ">" == c.lexical.type || (a.eat("=") ? "!" != b && "=" != b || a.eat("=") : /[<>*+\-]/.test(b) && (a.eat(b), ">" == b && a.eat(b))), q("operator", "operator", a.current());
            if (da.test(b)) {
                a.eatWhile(da);
                b = a.current();
                if ("." != c.lastType) {
                    if (pa.propertyIsEnumerable(b))
                        return a = pa[b], q(a.type, a.style, b);
                    if ("async" == b &&
                        a.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/, !1))
                        return q("async", "keyword", b)
                }
                return q("variable", "variable", b)
            }
        }
        function Ha(a) {
            return function (c, b) {
                var d = !1,
                    l;
                if (U && "@" == c.peek() && c.match(Ia))
                    return b.tokenize = A, q("jsonld-keyword", "meta");
                for (; null != (l = c.next()) && (l != a || d); )
                    d = !d && "\\" == l;
                d || (b.tokenize = A);
                return q("string", "string")
            }
        }
        function T(a, c) {
            for (var b = !1, d; d = a.next(); ) {
                if ("/" == d && b) {
                    c.tokenize = A;
                    break
                }
                b = "*" == d
            }
            return q("comment", "comment")
        }
        function ca(a, c) {
            for (var b = !1, d; null != (d = a.next()); ) {
                if (!b &&
                    ("`" == d || "$" == d && a.eat("{"))) {
                    c.tokenize = A;
                    break
                }
                b = !b && "\\" == d
            }
            return q("quasi", "string-2", a.current())
        }
        function fa(a, c) {
            c.fatArrowAt && (c.fatArrowAt = null);
            var b = a.string.indexOf("=>", a.start);
            if (!(0 > b)) {
                if (n) {
                    var d = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(a.string.slice(a.start, b));
                    d && (b = d.index)
                }
                d = 0;
                var f = !1;
                for (--b; 0 <= b; --b) {
                    var e = a.string.charAt(b),
                        g = "([{}])".indexOf(e);
                    if (0 <= g && 3 > g) {
                        if (!d) {
                            ++b;
                            break
                        }
                        if (0 == --d) {
                            "(" == e && (f = !0);
                            break
                        }
                    } else if (3 <= g && 6 > g)
                        ++d;
                    else if (da.test(e))
                        f = !0;
                    else {
                        if (/["'\/]/.test(e))
                            return;
                        if (f && !d) {
                            ++b;
                            break
                        }
                    }
                }
                f && !d && (c.fatArrowAt = b)
            }
        }
        function qa(a, c, b, d, f, e) {
            this.indented = a;
            this.column = c;
            this.type = b;
            this.prev = f;
            this.info = e;
            null != d && (this.align = d)
        }
        function g() {
            for (var a = arguments.length - 1; 0 <= a; a--)
                d.cc.push(arguments[a])
        }
        function b() {
            g.apply(null, arguments);
            return !0
        }
        function ha(a, c) {
            for (; c; c = c.next)
                if (c.name == a)
                    return !0;
            return !1
        }
        function M(a) {
            var c = d.state;
            d.marked = "def";
            if (c.context)
                if ("var" == c.lexical.info && c.context && c.context.block) {
                    var b = ra(a, c.context);
                    if (null != b) {
                        c.context =
                            b;
                        return
                    }
                } else if (!ha(a, c.localVars)) {
                    c.localVars = new N(a, c.localVars);
                    return
                }
            w.globalVars && !ha(a, c.globalVars) && (c.globalVars = new N(a, c.globalVars))
        }
        function ra(a, c) {
            return c ? c.block ? (a = ra(a, c.prev)) ? a == c.prev ? c : new O(a, c.vars, !0) : null : ha(a, c.vars) ? c : new O(c.prev, new N(a, c.vars), !1) : null
        }
        function V(a) {
            return "public" == a || "private" == a || "protected" == a || "abstract" == a || "readonly" == a
        }
        function O(a, c, b) {
            this.prev = a;
            this.vars = c;
            this.block = b
        }
        function N(a, c) {
            this.name = a;
            this.next = c
        }
        function P() {
            d.state.context =
                new O(d.state.context, d.state.localVars, !1);
            d.state.localVars = Ja
        }
        function sa() {
            d.state.context = new O(d.state.context, d.state.localVars, !0);
            d.state.localVars = null
        }
        function z() {
            d.state.localVars = d.state.context.vars;
            d.state.context = d.state.context.prev
        }
        function e(a, c) {
            var b = function () {
                var b = d.state,
                    f = b.indented;
                if ("stat" == b.lexical.type)
                    f = b.lexical.indented;
                else
                    for (var l = b.lexical; l && ")" == l.type && l.align; l = l.prev)
                        f = l.indented;
                b.lexical = new qa(f, d.stream.column(), a, null, b.lexical, c)
            };
            b.lex = !0;
            return b
        }
        function f() {
            var a = d.state;
            a.lexical.prev && (")" == a.lexical.type && (a.indented = a.lexical.indented), a.lexical = a.lexical.prev)
        }
        function h(a) {
            function c(d) {
                return d == a ? b() : ";" == a || "}" == d || ")" == d || "]" == d ? g() : b(c)
            }
            return c
        }
        function t(a, c) {
            return "var" == a ? b(e("vardef", c), ia, h(";"), f) : "keyword a" == a ? b(e("form"), ja, t, f) : "keyword b" == a ? b(e("form"), t, f) : "keyword d" == a ? d.stream.match(/^\s*$/, !1) ? b() : b(e("stat"), ka, h(";"), f) : "debugger" == a ? b(h(";")) : "{" == a ? b(e("}"), sa, Q, f, z) : ";" == a ? b() : "if" == a ? ("else" == d.state.lexical.info &&
            d.state.cc[d.state.cc.length - 1] == f && d.state.cc.pop()(), b(e("form"), ja, t, f, ta)) : "function" == a ? b(y) : "for" == a ? b(e("form"), ua, t, f) : "class" == a || n && "interface" == c ? (d.marked = "keyword", b(e("form"), va, f)) : "variable" == a ? n && "declare" == c ? (d.marked = "keyword", b(t)) : n && ("module" == c || "enum" == c || "type" == c) && d.stream.match(/^\s*\w/, !1) ? (d.marked = "keyword", "enum" == c ? b(wa) : "type" == c ? b(p, h("operator"), p, h(";")) : b(e("form"), x, h("{"), e("}"), Q, f, f)) : n && "namespace" == c ? (d.marked = "keyword", b(e("form"), k, Q, f)) : n && "abstract" ==
            c ? (d.marked = "keyword", b(t)) : b(e("stat"), Ka) : "switch" == a ? b(e("form"), ja, h("{"), e("}", "switch"), sa, Q, f, f, z) : "case" == a ? b(k, h(":")) : "default" == a ? b(h(":")) : "catch" == a ? b(e("form"), P, La, t, f, z) : "export" == a ? b(e("stat"), Ma, f) : "import" == a ? b(e("stat"), Na, f) : "async" == a ? b(t) : "@" == c ? b(k, t) : g(e("stat"), k, h(";"), f)
        }
        function La(a) {
            if ("(" == a)
                return b(G, h(")"))
        }
        function k(a, c) {
            return xa(a, c, !1)
        }
        function v(a, c) {
            return xa(a, c, !0)
        }
        function ja(a) {
            return "(" != a ? g() : b(e(")"), k, h(")"), f)
        }
        function xa(a, c, l) {
            if (d.state.fatArrowAt ==
                d.stream.start) {
                var m = l ? ya : za;
                if ("(" == a)
                    return b(P, e(")"), u(G, ")"), f, h("=>"), m, z);
                if ("variable" == a)
                    return g(P, x, h("=>"), m, z)
            }
            m = l ? H : B;
            return Oa.hasOwnProperty(a) ? b(m) : "function" == a ? b(y, m) : "class" == a || n && "interface" == c ? (d.marked = "keyword", b(e("form"), Pa, f)) : "keyword c" == a || "async" == a ? b(l ? v : k) : "(" == a ? b(e(")"), ka, h(")"), f, m) : "operator" == a || "spread" == a ? b(l ? v : k) : "[" == a ? b(e("]"), Qa, f, m) : "{" == a ? R(W, "}", null, m) : "quasi" == a ? g(X, m) : "new" == a ? b(Ra(l)) : "import" == a ? b(k) : b()
        }
        function ka(a) {
            return a.match(/[;\}\)\],]/) ?
                g() : g(k)
        }
        function B(a, c) {
            return "," == a ? b(k) : H(a, c, !1)
        }
        function H(a, c, l) {
            var m = 0 == l ? B : H,
                ea = 0 == l ? k : v;
            if ("=>" == a)
                return b(P, l ? ya : za, z);
            if ("operator" == a)
                return /\+\+|--/.test(c) || n && "!" == c ? b(m) : n && "<" == c && d.stream.match(/^([^>]|<.*?>)*>\s*\(/, !1) ? b(e(">"), u(p, ">"), f, m) : "?" == c ? b(k, h(":"), ea) : b(ea);
            if ("quasi" == a)
                return g(X, m);
            if (";" != a) {
                if ("(" == a)
                    return R(v, ")", "call", m);
                if ("." == a)
                    return b(Sa, m);
                if ("[" == a)
                    return b(e("]"), ka, h("]"), f, m);
                if (n && "as" == c)
                    return d.marked = "keyword", b(p, m);
                if ("regexp" == a)
                    return d.state.lastType =
                        d.marked = "operator", d.stream.backUp(d.stream.pos - d.stream.start - 1), b(ea)
            }
        }
        function X(a, c) {
            return "quasi" != a ? g() : "${" != c.slice(c.length - 2) ? b(X) : b(k, Ta)
        }
        function Ta(a) {
            if ("}" == a)
                return d.marked = "string-2", d.state.tokenize = ca, b(X)
        }
        function za(a) {
            fa(d.stream, d.state);
            return g("{" == a ? t : k)
        }
        function ya(a) {
            fa(d.stream, d.state);
            return g("{" == a ? t : v)
        }
        function Ra(a) {
            return function (c) {
                return "." == c ? b(a ? Ua : Va) : "variable" == c && n ? b(Wa, a ? H : B) : g(a ? v : k)
            }
        }
        function Va(a, c) {
            if ("target" == c)
                return d.marked = "keyword", b(B)
        }
        function Ua(a, c) {
            if ("target" == c)
                return d.marked = "keyword", b(H)
        }
        function Ka(a) {
            return ":" == a ? b(f, t) : g(B, h(";"), f)
        }
        function Sa(a) {
            if ("variable" == a)
                return d.marked = "property", b()
        }
        function W(a, c) {
            if ("async" == a)
                return d.marked = "property", b(W);
            if ("variable" == a || "keyword" == d.style) {
                d.marked = "property";
                if ("get" == c || "set" == c)
                    return b(Xa);
                var f;
                n && d.state.fatArrowAt == d.stream.start && (f = d.stream.match(/^\s*:\s*/, !1)) && (d.state.fatArrowAt = d.stream.pos + f[0].length);
                return b(C)
            }
            if ("number" == a || "string" == a)
                return d.marked =
                    U ? "property" : d.style + " property", b(C);
            if ("jsonld-keyword" == a)
                return b(C);
            if (n && V(c))
                return d.marked = "keyword", b(W);
            if ("[" == a)
                return b(k, I, h("]"), C);
            if ("spread" == a)
                return b(v, C);
            if ("*" == c)
                return d.marked = "keyword", b(W);
            if (":" == a)
                return g(C)
        }
        function Xa(a) {
            if ("variable" != a)
                return g(C);
            d.marked = "property";
            return b(y)
        }
        function C(a) {
            if (":" == a)
                return b(v);
            if ("(" == a)
                return g(y)
        }
        function u(a, c, f) {
            function m(e, l) {
                return (f ? -1 < f.indexOf(e) : "," == e) ? (e = d.state.lexical, "call" == e.info && (e.pos = (e.pos || 0) + 1), b(function (b,
                                                                                                                                              d) {
                    return b == c || d == c ? g() : g(a)
                }, m)) : e == c || l == c ? b() : b(h(c))
            }
            return function (d, f) {
                return d == c || f == c ? b() : g(a, m)
            }
        }
        function R(a, c, l) {
            for (var m = 3; m < arguments.length; m++)
                d.cc.push(arguments[m]);
            return b(e(c, l), u(a, c), f)
        }
        function Q(a) {
            return "}" == a ? b() : g(t, Q)
        }
        function I(a, c) {
            if (n) {
                if (":" == a)
                    return b(p);
                if ("?" == c)
                    return b(I)
            }
        }
        function Ya(a) {
            if (n && ":" == a)
                return d.stream.match(/^\s*\w+\s+is\b/, !1) ? b(k, Za, p) : b(p)
        }
        function Za(a, c) {
            if ("is" == c)
                return d.marked = "keyword", b()
        }
        function p(a, c) {
            if ("keyof" == c || "typeof" ==
                c)
                return d.marked = "keyword", b("keyof" == c ? p : v);
            if ("variable" == a || "void" == c)
                return d.marked = "type", b(D);
            if ("string" == a || "number" == a || "atom" == a)
                return b(D);
            if ("[" == a)
                return b(e("]"), u(p, "]", ","), f, D);
            if ("{" == a)
                return b(e("}"), u(Y, "}", ",;"), f, D);
            if ("(" == a)
                return b(u(Aa, ")"), $a);
            if ("<" == a)
                return b(u(p, ">"), p)
        }
        function $a(a) {
            if ("=>" == a)
                return b(p)
        }
        function Y(a, c) {
            if ("variable" == a || "keyword" == d.style)
                return d.marked = "property", b(Y);
            if ("?" == c)
                return b(Y);
            if (":" == a)
                return b(p);
            if ("[" == a)
                return b(k, I, h("]"),
                    Y)
        }
        function Aa(a, c) {
            return "variable" == a && d.stream.match(/^\s*[?:]/, !1) || "?" == c ? b(Aa) : ":" == a ? b(p) : g(p)
        }
        function D(a, c) {
            if ("<" == c)
                return b(e(">"), u(p, ">"), f, D);
            if ("|" == c || "." == a || "&" == c)
                return b(p);
            if ("[" == a)
                return b(h("]"), D);
            if ("extends" == c || "implements" == c)
                return d.marked = "keyword", b(p)
        }
        function Wa(a, c) {
            if ("<" == c)
                return b(e(">"), u(p, ">"), f, D)
        }
        function Ba() {
            return g(p, ab)
        }
        function ab(a, c) {
            if ("=" == c)
                return b(p)
        }
        function ia(a, c) {
            return "enum" == c ? (d.marked = "keyword", b(wa)) : g(x, I, J, bb)
        }
        function x(a, c) {
            if (n &&
                V(c))
                return d.marked = "keyword", b(x);
            if ("variable" == a)
                return M(c), b();
            if ("spread" == a)
                return b(x);
            if ("[" == a)
                return R(x, "]");
            if ("{" == a)
                return R(cb, "}")
        }
        function cb(a, c) {
            if ("variable" == a && !d.stream.match(/^\s*:/, !1))
                return M(c), b(J);
            "variable" == a && (d.marked = "property");
            return "spread" == a ? b(x) : "}" == a ? g() : b(h(":"), x, J)
        }
        function J(a, c) {
            if ("=" == c)
                return b(v)
        }
        function bb(a) {
            if ("," == a)
                return b(ia)
        }
        function ta(a, c) {
            if ("keyword b" == a && "else" == c)
                return b(e("form", "else"), t, f)
        }
        function ua(a, c) {
            if ("await" == c)
                return b(ua);
            if ("(" == a)
                return b(e(")"), db, h(")"), f)
        }
        function db(a) {
            return "var" == a ? b(ia, h(";"), Z) : ";" == a ? b(Z) : "variable" == a ? b(eb) : g(k, h(";"), Z)
        }
        function eb(a, c) {
            return "in" == c || "of" == c ? (d.marked = "keyword", b(k)) : b(B, Z)
        }
        function Z(a, c) {
            return ";" == a ? b(Ca) : "in" == c || "of" == c ? (d.marked = "keyword", b(k)) : g(k, h(";"), Ca)
        }
        function Ca(a) {
            ")" != a && b(k)
        }
        function y(a, c) {
            if ("*" == c)
                return d.marked = "keyword", b(y);
            if ("variable" == a)
                return M(c), b(y);
            if ("(" == a)
                return b(P, e(")"), u(G, ")"), f, Ya, t, z);
            if (n && "<" == c)
                return b(e(">"), u(Ba, ">"),
                    f, y)
        }
        function G(a, c) {
            "@" == c && b(k, G);
            return "spread" == a ? b(G) : n && V(c) ? (d.marked = "keyword", b(G)) : g(x, I, J)
        }
        function Pa(a, c) {
            return "variable" == a ? va(a, c) : aa(a, c)
        }
        function va(a, c) {
            if ("variable" == a)
                return M(c), b(aa)
        }
        function aa(a, c) {
            if ("<" == c)
                return b(e(">"), u(Ba, ">"), f, aa);
            if ("extends" == c || "implements" == c || n && "," == a)
                return "implements" == c && (d.marked = "keyword"), b(n ? p : k, aa);
            if ("{" == a)
                return b(e("}"), E, f)
        }
        function E(a, c) {
            if ("async" == a || "variable" == a && ("static" == c || "get" == c || "set" == c || n && V(c)) && d.stream.match(/^\s+[\w$\xa1-\uffff]/,
                !1))
                return d.marked = "keyword", b(E);
            if ("variable" == a || "keyword" == d.style)
                return d.marked = "property", b(n ? la : y, E);
            if ("[" == a)
                return b(k, I, h("]"), n ? la : y, E);
            if ("*" == c)
                return d.marked = "keyword", b(E);
            if (";" == a)
                return b(E);
            if ("}" == a)
                return b();
            if ("@" == c)
                return b(k, E)
        }
        function la(a, c) {
            return "?" == c ? b(la) : ":" == a ? b(p, J) : "=" == c ? b(v) : g(y)
        }
        function Ma(a, c) {
            return "*" == c ? (d.marked = "keyword", b(ma, h(";"))) : "default" == c ? (d.marked = "keyword", b(k, h(";"))) : "{" == a ? b(u(Da, "}"), ma, h(";")) : g(t)
        }
        function Da(a, c) {
            if ("as" == c)
                return d.marked =
                    "keyword", b(h("variable"));
            if ("variable" == a)
                return g(v, Da)
        }
        function Na(a) {
            return "string" == a ? b() : "(" == a ? g(k) : g(ba, Ea, ma)
        }
        function ba(a, c) {
            if ("{" == a)
                return R(ba, "}");
            "variable" == a && M(c);
            "*" == c && (d.marked = "keyword");
            return b(fb)
        }
        function Ea(a) {
            if ("," == a)
                return b(ba, Ea)
        }
        function fb(a, c) {
            if ("as" == c)
                return d.marked = "keyword", b(ba)
        }
        function ma(a, c) {
            if ("from" == c)
                return d.marked = "keyword", b(k)
        }
        function Qa(a) {
            return "]" == a ? b() : g(u(v, "]"))
        }
        function wa() {
            return g(e("form"), x, h("{"), e("}"), u(gb, "}"), f, f)
        }
        function gb() {
            return g(x,
                J)
        }
        function na(a, c, b) {
            return c.tokenize == A && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(c.lastType) || "quasi" == c.lastType && /\{\s*$/.test(a.string.slice(0, a.pos - (b || 0)))
        }
        var K = Ga.indentUnit,
            Fa = w.statementIndent,
            U = w.jsonld,
            F = w.json || U,
            n = w.typescript,
            da = w.wordCharacters || /[\w$\xa1-\uffff]/,
            pa = function () {
                function a(a) {
                    return {
                        type: a,
                        style: "keyword"
                    }
                }
                var c = a("keyword a"),
                    b = a("keyword b"),
                    d = a("keyword c"),
                    f = a("keyword d"),
                    e = a("operator"),
                    g = {
                        type: "atom",
                        style: "atom"
                    };
                return {
                    "if": a("if"),
                    "while": c,
                    "with": c,
                    "else": b,
                    "do": b,
                    "try": b,
                    "finally": b,
                    "return": f,
                    "break": f,
                    "continue": f,
                    "new": a("new"),
                    "delete": d,
                    "void": d,
                    "throw": d,
                    "debugger": a("debugger"),
                    "var": a("var"),
                    "const": a("var"),
                    let: a("var"),
                    "function": a("function"),
                    "catch": a("catch"),
                    "for": a("for"),
                    "switch": a("switch"),
                    "case": a("case"),
                    "default": a("default"),
                    "in": e,
                    "typeof": e,
                    "instanceof": e,
                    "true": g,
                    "false": g,
                    "null": g,
                    undefined: g,
                    NaN: g,
                    Infinity: g,
                    "this": a("this"),
                    "class": a("class"),
                    "super": a("atom"),
                    yield: d,
                    "export": a("export"),
                    "import": a("import"),
                    "extends": d,
                    await: d
                }
            }
            (),
            oa = /[+\-*&%=<>!?|~^@]/,
            Ia = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,
            L,
            S,
            Oa = {
                atom: !0,
                number: !0,
                variable: !0,
                string: !0,
                regexp: !0,
                "this": !0,
                "jsonld-keyword": !0
            },
            d = {
                state: null,
                column: null,
                marked: null,
                cc: null
            },
            Ja = new N("this", new N("arguments", null));
        z.lex = !0;
        f.lex = !0;
        return {
            startState: function (a) {
                a = {
                    tokenize: A,
                    lastType: "sof",
                    cc: [],
                    lexical: new qa((a || 0) - K, 0, "block", !1),
                    localVars: w.localVars,
                    context: w.localVars && new O(null,
                        null, !1),
                    indented: a || 0
                };
                w.globalVars && "object" == typeof w.globalVars && (a.globalVars = w.globalVars);
                return a
            },
            token: function (a, c) {
                a.sol() && (c.lexical.hasOwnProperty("align") || (c.lexical.align = !1), c.indented = a.indentation(), fa(a, c));
                if (c.tokenize != T && a.eatSpace())
                    return null;
                var b = c.tokenize(a, c);
                if ("comment" == L)
                    return b;
                c.lastType = "operator" != L || "++" != S && "--" != S ? L : "incdec";
                a: {
                    var f = L,
                        e = S,
                        g = c.cc;
                    d.state = c;
                    d.stream = a;
                    d.marked = null;
                    d.cc = g;
                    d.style = b;
                    c.lexical.hasOwnProperty("align") || (c.lexical.align = !0);
                    for (; ; )
                        if ((g.length ? g.pop() : F ? k : t)(f, e)) {
                            for (; g.length && g[g.length - 1].lex; )
                                g.pop()();
                            if (d.marked) {
                                b = d.marked;
                                break a
                            }
                            if (a = "variable" == f)
                                b: {
                                    for (a = c.localVars; a; a = a.next)
                                        if (a.name == e) {
                                            a = !0;
                                            break b
                                        }
                                    for (c = c.context; c; c = c.prev)
                                        for (a = c.vars; a; a = a.next)
                                            if (a.name == e) {
                                                a = !0;
                                                break b
                                            }
                                    a = void 0
                                }
                            if (a) {
                                b = "variable-2";
                                break a
                            }
                            break a
                        }
                }
                return b
            },
            indent: function (a, b) {
                if (a.tokenize == T)
                    return r.Pass;
                if (a.tokenize != A)
                    return 0;
                var c = b && b.charAt(0),
                    d = a.lexical,
                    e;
                if (!/^\s*else\b/.test(b))
                    for (var g = a.cc.length - 1; 0 <= g; --g) {
                        var h =
                            a.cc[g];
                        if (h == f)
                            d = d.prev;
                        else if (h != ta)
                            break
                    }
                for (; !("stat" != d.type && "form" != d.type || "}" != c && (!(e = a.cc[a.cc.length - 1]) || e != B && e != H || /^[,\.=+\-*:?[\(]/.test(b))); )
                    d = d.prev;
                Fa && ")" == d.type && "stat" == d.prev.type && (d = d.prev);
                e = d.type;
                g = c == e;
                return "vardef" == e ? d.indented + ("operator" == a.lastType || "," == a.lastType ? d.info.length + 1 : 0) : "form" == e && "{" == c ? d.indented : "form" == e ? d.indented + K : "stat" == e ? (c = d.indented, a = "operator" == a.lastType || "," == a.lastType || oa.test(b.charAt(0)) || /[,.]/.test(b.charAt(0)), c + (a ? Fa || K :
                    0)) : "switch" != d.info || g || 0 == w.doubleIndentSwitch ? d.align ? d.column + (g ? 0 : 1) : d.indented + (g ? 0 : K) : d.indented + (/^(?:case|default)\b/.test(b) ? K : 2 * K)
            },
            electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
            blockCommentStart: F ? null : "/*",
            blockCommentEnd: F ? null : "*/",
            blockCommentContinue: F ? null : " * ",
            lineComment: F ? null : "//",
            fold: "brace",
            closeBrackets: "()[]{}''\"\"``",
            helperType: F ? "json" : "javascript",
            jsonldMode: U,
            jsonMode: F,
            expressionAllowed: na,
            skipExpression: function (a) {
                var b = a.cc[a.cc.length - 1];
                b != k && b != v || a.cc.pop()
            }
        }
    });
    r.registerHelper("wordChars", "javascript", /[\w$]/);
    r.defineMIME("text/javascript", "javascript");
    r.defineMIME("text/ecmascript", "javascript");
    r.defineMIME("application/javascript", "javascript");
    r.defineMIME("application/x-javascript", "javascript");
    r.defineMIME("application/ecmascript", "javascript");
    r.defineMIME("application/json", {
        name: "javascript",
        json: !0
    });
    r.defineMIME("application/x-json", {
        name: "javascript",
        json: !0
    });
    r.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: !0
    });
    r.defineMIME("text/typescript", {
        name: "javascript",
        typescript: !0
    });
    r.defineMIME("application/typescript", {
        name: "javascript",
        typescript: !0
    })
});
