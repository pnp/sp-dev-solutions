define("a", ["require", "exports", "b"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.CustomFormatter = r.CustomFormatter
});
define("b", ["require", "exports", "av", "au", "at", "as", "aa", "e", "c"], function(e, t, r, o, n, c, i, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    i.initializeIcons(void 0, {
        disableWarnings: !0
    });
    var a, l, s, u, d, f = "toString()", g = "Number()", p = "Date()", h = "||", v = "&&", y = "toLocaleString()", S = "toLocaleDateString()", b = "toLocaleTimeString()", _ = ((a = {})[y] = !0,
    a[S] = !0,
    a[b] = !0,
    a), C = r.__assign(((l = {})[f] = !0,
    l.cos = !0,
    l.sin = !0,
    l[p] = !0,
    l[g] = !0,
    l), _), w = r.__assign({}, C, ((s = {})["=="] = !0,
    s["!="] = !0,
    s[">="] = !0,
    s["<="] = !0,
    s[">"] = !0,
    s["<"] = !0,
    s["+"] = !0,
    s["-"] = !0,
    s["*"] = !0,
    s["/"] = !0,
    s[":"] = !0,
    s["?"] = !0,
    s[h] = !0,
    s[v] = !0,
    s)), L = {
        div: !0,
        span: !0,
        a: !0,
        img: !0,
        svg: !0,
        button: !0,
        path: !0
    }, k = "iconName", F = ((u = {
        href: !0,
        rel: !0,
        src: !0,
        class: !0,
        target: !0,
        title: !0,
        role: !0
    })[k] = !0,
    u.d = !0,
    u.alt = !0,
    u), x = {
        defaultClick: !0,
        executeFlow: !0,
        delete: !0,
        share: !0,
        editProps: !0
    }, M = {
        "background-color": !0,
        fill: !0,
        "background-image": !0,
        border: !0,
        "border-bottom": !0,
        "border-bottom-color": !0,
        "border-bottom-style": !0,
        "border-bottom-width": !0,
        "border-color": !0,
        "border-left": !0,
        "border-left-color": !0,
        "border-left-style": !0,
        "border-left-width": !0,
        "border-right": !0,
        "border-right-color": !0,
        "border-right-style": !0,
        "border-right-width": !0,
        "border-style": !0,
        "border-top": !0,
        "border-top-color": !0,
        "border-top-style": !0,
        "border-top-width": !0,
        "border-width": !0,
        outline: !0,
        "outline-color": !0,
        "outline-style": !0,
        "outline-width": !0,
        "border-bottom-left-radius": !0,
        "border-bottom-right-radius": !0,
        "border-radius": !0,
        "border-top-left-radius": !0,
        "border-top-right-radius": !0,
        "box-decoration-break": !0,
        "box-shadow": !0,
        "box-sizing": !0,
        "overflow-x": !0,
        "overflow-y": !0,
        "overflow-style": !0,
        rotation: !0,
        "rotation-point": !0,
        opacity: !0,
        cursor: !0,
        height: !0,
        "max-height": !0,
        "max-width": !0,
        "min-height": !0,
        "min-width": !0,
        width: !0,
        "flex-grow": !0,
        "flex-shrink": !0,
        "flex-flow": !0,
        "flex-direction": !0,
        "flex-wrap": !0,
        "flex-basic": !0,
        flex: !0,
        "align-items": !0,
        "box-align": !0,
        "box-direction": !0,
        "box-flex": !0,
        "box-flex-group": !0,
        "box-lines": !0,
        "box-ordinal-group": !0,
        "box-orient": !0,
        "box-pack": !0,
        font: !0,
        "font-family": !0,
        "font-size": !0,
        "font-style": !0,
        "font-variant": !0,
        "font-weight": !0,
        "font-size-adjust": !0,
        "font-stretch": !0,
        "grid-columns": !0,
        "grid-rows": !0,
        margin: !0,
        "margin-bottom": !0,
        "margin-left": !0,
        "margin-right": !0,
        "margin-top": !0,
        "column-count": !0,
        "column-fill": !0,
        "column-gap": !0,
        "column-rule": !0,
        "column-rule-color": !0,
        "column-rule-style": !0,
        "column-rule-width": !0,
        "column-span": !0,
        "column-width": !0,
        columns: !0,
        padding: !0,
        "padding-bottom": !0,
        "padding-left": !0,
        "padding-right": !0,
        "padding-top": !0,
        bottom: !0,
        clear: !0,
        clip: !0,
        display: !0,
        float: !0,
        left: !0,
        overflow: !0,
        position: !0,
        right: !0,
        top: !0,
        visibility: !0,
        "z-index": !0,
        "border-collapse": !0,
        "border-spacing": !0,
        "caption-side": !0,
        "empty-cells": !0,
        "table-layout": !0,
        color: !0,
        direction: !0,
        "letter-spacing": !0,
        "line-height": !0,
        "text-align": !0,
        "text-decoration": !0,
        "text-indent": !0,
        "text-transform": !0,
        "unicode-bidi": !0,
        "vertical-align": !0,
        "white-space": !0,
        "word-spacing": !0,
        "hanging-punctuation": !0,
        "punctuation-trim": !0,
        "text-align-last": !0,
        "text-justify": !0,
        "text-outline": !0,
        "text-shadow": !0,
        "text-wrap": !0,
        "word-break": !0,
        "word-wrap": !0
    }, P = ["http://", "https://", "mailto:"], I = "Number", O = "Text", T = "Counter", D = "Title", A = "DateTime", R = "User", E = "Choice", N = "Boolean", B = "Note", W = "Lookup", j = "Image", z = "Hyperlink", V = "_IsRecord", U = ((d = {})[I] = !0,
    d[T] = !0,
    d[O] = !0,
    d[D] = !0,
    d[A] = !0,
    d[R] = !0,
    d[E] = !0,
    d[N] = !0,
    d[B] = !0,
    d[j] = !0,
    d[z] = !0,
    d.URL = !0,
    d[W] = !0,
    d[V] = !0,
    d.Name = !0,
    d), H = "@currentField", q = function() {
        function e(e) {
            this._params = e;
            this._errorStrings = e.errorStrings || o.default
        }
        e.prototype.evaluate = function() {
            var e, t = [];
            try {
                this._cfr = JSON.parse(this._params.fieldRendererFormat);
                e = this._cfr;
                this._createElementHtml(e, t, 0);
                if (!this._fAria) {
                    var r = this._errorStrings.ariaError || "ariaError";
                    this._cfr.debugMode && console.error(r)
                }
            } catch (e) {
                var o = "Failure: " + ("string" == typeof e ? e : e.message);
                this._cfr.debugMode && console.error(o);
                t = [];
                this._cfr && this._cfr.debugMode && t.push(c.encodeText(o));
                this._error = o
            }
            return t.join("")
        }
        ;
        e.prototype.errors = function() {
            return this._error || ""
        }
        ;
        e.prototype.evalExpression = function(e) {
            var t = [];
            this._createValue(e, t, !1, !1, !1);
            return t.join()
        }
        ;
        e.prototype._createElementHtml = function(e, t, r) {
            e.elmType || this._err("elmTypeMissing");
            var o = e.elmType.toLowerCase()
              , i = "a" === o;
            if (!L[o]) {
                var n = "";
                for (var a in L)
                    n += a + " ";
                this._err("elmTypeInvalid", o, n)
            }
            t.push("<" + o + " ");
            if (e.style) {
                t.push('style="');
                for (var l in e.style)
                    this._createStyleAttr(l, e.style[l], t);
                t.push('" ')
            }
            var s = e.attributes;
            if (0 === r) {
                s || (s = {});
                if (s.class) {
                    var c = s.class;
                    c === String(c) ? s.class = "sp-field-customFormatter " + c : s.class = {
                        operator: "+",
                        operands: ["sp-field-customFormatter ", c]
                    }
                } else
                    s.class = "sp-field-customFormatter"
            }
            if (s) {
                if (i) {
                    var u = s.rel;
                    s.rel = "noopener noreferrer " + (u || "")
                }
                s[k] && !s.class && (s.class = "");
                for (var d in s)
                    if (this._isValidAttr(d)) {
                        t.push(" " + d + '="');
                        var f = s[d];
                        this._createValue(f, t, "href" === d || "src" === d);
                        if ("class" === d.toLowerCase()) {
                            var g = s[k];
                            if (g) {
                                t.push(" ");
                                var p = [];
                                this._createValue(g, p, !1);
                                p[0] && t.push(m.getIconClassName(p[0]))
                            }
                        }
                        t.push('" ')
                    } else
                        this._cfr.debugMode && console.log("ignoring non-approved attribute " + d)
            }
            if ("button" === o && e.customRowAction && x[e.customRowAction.action]) {
                t.push(' data-iscustomformatter="true" ');
                t.push(' data-actionname="' + e.customRowAction.action + '" ');
                t.push(' data-actionparams="');
                this._createValue(e.customRowAction.actionParams, t, !1, !1);
                t.push('" ')
            }
            t.push(">");
            if (e.txtContent)
                this._createValue(e.txtContent, t, !1, !1, !0);
            else if (e.children)
                for (var h = 0; h < e.children.length; h++)
                    this._createElementHtml(e.children[h], t, r + 1);
            t.push("</" + o + ">")
        }
        ;
        e.prototype._isValidAttr = function(e) {
            var t = Boolean(F[e])
              , r = Boolean(new RegExp("^aria-[a-z]+$","g").exec(e));
            r && (this._fAria = !0);
            return t || r
        }
        ;
        e.prototype._createStyleAttr = function(e, t, r) {
            if (M[e]) {
                r.push(e + ":");
                this._createValue(t, r, !1, !0);
                r.push(";")
            } else
                this._cfr.debugMode && console.log("Unsupported style attribute: " + e)
        }
        ;
        e.prototype._createValue = function(e, t, r, o, i) {
            var n = this._eval(e, i);
            null == n && (n = "");
            var a = "<br/>"
              , l = n instanceof Date ? n.toLocaleString() : n.toString()
              , s = c.encodeText(l);
            if (r) {
                this._validateUrl(s) || this._err("invalidProtocol");
                a = "%0D%0A"
            }
            o && !this._validateStyleValue(s) && this._err("invalidStyleValue", s);
            s = s.replace(/\r\n|\r|\n/g, a);
            t.push(s)
        }
        ;
        e.prototype._validateStyleValue = function(e) {
            for (var t = ["(", ":", "&", ";", "!"], r = "rgba(" === (e = e.toLowerCase()).substr(0, 5) ? 5 : 0, o = 0; o < t.length; o++)
                if (0 <= e.indexOf(t[o], r))
                    return !1;
            return !0
        }
        ;
        e.prototype._validateUrl = function(e) {
            if (!e)
                return !0;
            e = e.trim().toLowerCase();
            for (var t = 0; t < P.length; t++) {
                var r = P[t];
                if (e.substr(0, r.length) === r)
                    return !0
            }
            return !(0 <= e.indexOf(":") || 0 <= e.indexOf("\\") || 0 <= e.indexOf("&#92"))
        }
        ;
        e.prototype._eval = function(e, t) {
            if (void 0 !== e) {
                if (null === e)
                    return null;
                if ("string" == typeof e) {
                    if (0 === e.indexOf(H)) {
                        var r = this._params.currentFieldName;
                        if (e === H)
                            return t && this._params.rowSchema && r && (this._params.rowSchema[r] === A || this._params.rowSchema[r] === V) ? this._params.row[r] : this._evalJsonPath(this._params.row, r || "");
                        if (e.indexOf(".") !== H.length)
                            return e;
                        var o = r + e.substr(H.length);
                        return this._evalJsonPath(this._params.row, o)
                    }
                    if ("@me" === e && this._params.pageContextInfo && this._params.pageContextInfo.userEmail)
                        return this._params.pageContextInfo.userEmail;
                    if ("@window.innerWidth" === e)
                        return window.innerWidth;
                    if ("@window.innerHeight" === e)
                        return window.innerHeight;
                    if ("@now" === e)
                        return new Date;
                    if (0 === e.indexOf("[$") && "]" === e[e.length - 1]) {
                        var i = e.substr(2, e.length - 3);
                        return this._evalJsonPath(this._params.row, i)
                    }
                    return e
                }
                if ("number" == typeof e || "boolean" == typeof e)
                    return e;
                var n = e
                  , a = n.operator
                  , l = n.operands;
                a || this._err("operatorMissing", JSON.stringify(n));
                if (!w[a]) {
                    var s = "";
                    for (var c in w)
                        s += c + " ";
                    this._err("operatorInvalid", a, s, JSON.stringify(n))
                }
                void 0 !== l && void 0 !== l[0] || this._err("operandMissing", JSON.stringify(n));
                if (!C[a])
                    return ":" === a || "?" === a ? this._ternaryEval(n, this._eval(l[1]), this._eval(l[2]), this._eval(l[0])) : "+" === a || "*" === a || a === h || a === v ? this._multiOpEval(n) : this._twoOpEval(n, this._eval(l[0]), a, this._eval(l[1]));
                1 !== l.length && this._err("operandNOnly", 1..toString(), JSON.stringify(e));
                if (a === f)
                    return this._toString(this._eval(l[0]));
                if (a === g) {
                    var u = this._eval(l[0]);
                    return Number(u)
                }
                if (a === p) {
                    u = this._eval(l[0]);
                    return new Date(u)
                }
                if ("cos" === a)
                    return Math.cos(this._eval(l[0]));
                if ("sin" === a)
                    return Math.sin(this._eval(l[0]));
                if (_[a]) {
                    u = this._eval(l[0]);
                    if (!Boolean(u))
                        return "";
                    var d = new Date(u);
                    if (a === y)
                        return d.toLocaleString();
                    if (a === S)
                        return d.toLocaleDateString();
                    if (a === b)
                        return d.toLocaleTimeString()
                }
            }
        }
        ;
        e.prototype._toString = function(e) {
            return null == e ? "" : e.toString()
        }
        ;
        e.prototype._ternaryEval = function(e, t, r, o) {
            void 0 !== t && void 0 !== r && void 0 !== o || this._err("operandNOnly", 3..toString(), JSON.stringify(e));
            return o ? t : r
        }
        ;
        e.prototype._multiOpEval = function(e) {
            var t = e.operator
              , r = e.operands;
            (void 0 === r || r.length < 2) && this._err("operandNOnly", 2..toString(), JSON.stringify(e));
            for (var o = this._eval(r[0]), i = 1; i < r.length; i++) {
                var n = this._eval(r[i]);
                o = this._twoOpEval(e, o, t, n)
            }
            return o
        }
        ;
        e.prototype._twoOpEval = function(e, t, r, o) {
            void 0 !== t && void 0 !== o || this._err("operandNOnly", 2..toString(), JSON.stringify(e));
            if ("==" === r)
                return t === o;
            if ("!=" === r)
                return t !== o;
            if (">=" === r)
                return o <= t;
            if ("<=" === r)
                return t <= o;
            if (">" === r)
                return o < t;
            if ("<" === r)
                return t < o;
            if (r === h)
                return t || o;
            if (r === v)
                return t && o;
            if ("+" === r)
                return this._doAddOrSubstract(e, t, o, !0);
            if ("-" === r)
                return this._doAddOrSubstract(e, t, o, !1);
            if ("*" === r) {
                this._validateIsNum(e, t);
                this._validateIsNum(e, o);
                return t * o
            }
            if ("/" === r) {
                this._validateIsNum(e, t);
                this._validateIsNum(e, o);
                return t / o
            }
            throw ""
        }
        ;
        e.prototype._doAddOrSubstract = function(e, t, r, o) {
            var i, n = t instanceof Date || r instanceof Date;
            if (o)
                i = t.valueOf() + r.valueOf();
            else {
                if (!n) {
                    this._validateIsNum(e, t);
                    this._validateIsNum(e, r)
                }
                i = t.valueOf() - r.valueOf()
            }
            return n ? new Date(i) : i
        }
        ;
        e.prototype._validateIsNum = function(e, t) {
            "number" != typeof t && this._err("nan", t.toString(), JSON.stringify(e))
        }
        ;
        e.prototype._evalJsonPath = function(e, t) {
            var r, o = e;
            try {
                var i = t.split(".")
                  , n = this._params.rowSchema || {}
                  , a = n[i[0]];
                r = i.length;
                if (a === I || a === A || a === N || a === V) {
                    var l = a === N ? ".value" : "."
                      , s = i[0] + l;
                    null != o[s] && void 0 !== o[s] && (i[0] = s)
                }
                if ((a === z || a === j || "URL" === a) && 2 === r && "desc" === i[1])
                    return o[t];
                n && a && (U[a] || this._err("unsupportedType", t));
                for (var c = a === R, u = a === W, d = 0; d < r; d++) {
                    o = o[i[d]];
                    (c || u) && 0 === d && this.isArray(o) && (o = o[0])
                }
            } catch (e) {
                this._cfr.debugMode && console.log("could not evaluate " + t);
                return null
            }
            if (void 0 === o) {
                var f = t + " was not found on the data object.";
                this._cfr.debugMode && console.log(f);
                if (this._cfr.debugMode)
                    throw f
            }
            return 1 === r ? this._convertValue(o, t) : o
        }
        ;
        e.prototype._convertValue = function(e, t) {
            var r = this._params.rowSchema;
            if (!r || !r[t])
                return e;
            switch (r[t]) {
            case O:
            case D:
            case B:
            case E:
            case j:
            case z:
            case "URL":
            case W:
            case V:
            case T:
            case "Name":
                return e;
            case N:
                return "1" === e || "0" !== e && e;
            case I:
                var o = void 0;
                o = "string" == typeof e ? parseFloat(e.replace(/,/g, "")) : Number(e);
                return isNaN(o) ? "" : o;
            case A:
                return "string" == typeof e ? Boolean(e) ? new Date(e) : null : e;
            case R:
                this._err("userFieldError", t);
                break;
            default:
                this._err("unsupportedType", t)
            }
        }
        ;
        e.prototype.isArray = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
        ;
        e.prototype._err = function(e) {
            for (var t = [], r = 1; r < arguments.length; r++)
                t[r - 1] = arguments[r];
            var o = "";
            if (this._errorStrings && e && this._errorStrings[e]) {
                var i = this._errorStrings[e];
                o = n.format.apply(n, [i].concat(t))
            } else
                e && (o = "FieldRenderer Error: " + e);
            throw o
        }
        ;
        return e
    }();
    t.CustomFormatter = q
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __extends, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues;
!function(t) {
    var r = "object" == typeof global ? global : "object" == typeof self ? self : "object" == typeof this ? this : {};
    "function" == typeof define && define.amd ? define("av", ["exports"], function(e) {
        t(o(r, o(e)))
    }) : "object" == typeof module && "object" == typeof module.exports ? t(o(r, o(module.exports))) : t(o(r));
    function o(r, o) {
        return function(e, t) {
            return r[e] = o ? o(e, t) : t
        }
    }
}(function(e) {
    var o = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var r in t)
            t.hasOwnProperty(r) && (e[r] = t[r])
    }
    ;
    __extends = function(e, t) {
        o(e, t);
        function r() {
            this.constructor = e
        }
        e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
        new r)
    }
    ;
    __assign = Object.assign || function(e) {
        for (var t, r = 1, o = arguments.length; r < o; r++) {
            t = arguments[r];
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        return e
    }
    ;
    __rest = function(e, t) {
        var r = {};
        for (var o in e)
            Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (o = Object.getOwnPropertySymbols(e); i < o.length; i++)
                t.indexOf(o[i]) < 0 && (r[o[i]] = e[o[i]])
        }
        return r
    }
    ;
    __decorate = function(e, t, r, o) {
        var i, n = arguments.length, a = n < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            a = Reflect.decorate(e, t, r, o);
        else
            for (var l = e.length - 1; 0 <= l; l--)
                (i = e[l]) && (a = (n < 3 ? i(a) : 3 < n ? i(t, r, a) : i(t, r)) || a);
        return 3 < n && a && Object.defineProperty(t, r, a),
        a
    }
    ;
    __param = function(r, o) {
        return function(e, t) {
            o(e, t, r)
        }
    }
    ;
    __metadata = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    }
    ;
    __awaiter = function(n, a, l, s) {
        return new (l || (l = Promise))(function(e, t) {
            function r(e) {
                try {
                    i(s.next(e))
                } catch (e) {
                    t(e)
                }
            }
            function o(e) {
                try {
                    i(s.throw(e))
                } catch (e) {
                    t(e)
                }
            }
            function i(t) {
                t.done ? e(t.value) : new l(function(e) {
                    e(t.value)
                }
                ).then(r, o)
            }
            i((s = s.apply(n, a || [])).next())
        }
        )
    }
    ;
    __generator = function(r, o) {
        var i, n, a, e, l = {
            label: 0,
            sent: function() {
                if (1 & a[0])
                    throw a[1];
                return a[1]
            },
            trys: [],
            ops: []
        };
        return e = {
            next: t(0),
            throw: t(1),
            return: t(2)
        },
        "function" == typeof Symbol && (e[Symbol.iterator] = function() {
            return this
        }
        ),
        e;
        function t(t) {
            return function(e) {
                return function(t) {
                    if (i)
                        throw new TypeError("Generator is already executing.");
                    for (; l; )
                        try {
                            if (i = 1,
                            n && (a = n[2 & t[0] ? "return" : t[0] ? "throw" : "next"]) && !(a = a.call(n, t[1])).done)
                                return a;
                            (n = 0,
                            a) && (t = [0, a.value]);
                            switch (t[0]) {
                            case 0:
                            case 1:
                                a = t;
                                break;
                            case 4:
                                l.label++;
                                return {
                                    value: t[1],
                                    done: !1
                                };
                            case 5:
                                l.label++;
                                n = t[1];
                                t = [0];
                                continue;
                            case 7:
                                t = l.ops.pop();
                                l.trys.pop();
                                continue;
                            default:
                                if (!(a = 0 < (a = l.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                    l = 0;
                                    continue
                                }
                                if (3 === t[0] && (!a || t[1] > a[0] && t[1] < a[3])) {
                                    l.label = t[1];
                                    break
                                }
                                if (6 === t[0] && l.label < a[1]) {
                                    l.label = a[1];
                                    a = t;
                                    break
                                }
                                if (a && l.label < a[2]) {
                                    l.label = a[2];
                                    l.ops.push(t);
                                    break
                                }
                                a[2] && l.ops.pop();
                                l.trys.pop();
                                continue
                            }
                            t = o.call(r, l)
                        } catch (e) {
                            t = [6, e];
                            n = 0
                        } finally {
                            i = a = 0
                        }
                    if (5 & t[0])
                        throw t[1];
                    return {
                        value: t[0] ? t[1] : void 0,
                        done: !0
                    }
                }([t, e])
            }
        }
    }
    ;
    __exportStar = function(e, t) {
        for (var r in e)
            t.hasOwnProperty(r) || (t[r] = e[r])
    }
    ;
    __values = function(e) {
        var t = "function" == typeof Symbol && e[Symbol.iterator]
          , r = 0;
        return t ? t.call(e) : {
            next: function() {
                e && r >= e.length && (e = void 0);
                return {
                    value: e && e[r++],
                    done: !e
                }
            }
        }
    }
    ;
    __read = function(e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r)
            return e;
        var o, i, n = r.call(e), a = [];
        try {
            for (; (void 0 === t || 0 < t--) && !(o = n.next()).done; )
                a.push(o.value)
        } catch (e) {
            i = {
                error: e
            }
        } finally {
            try {
                o && !o.done && (r = n.return) && r.call(n)
            } finally {
                if (i)
                    throw i.error
            }
        }
        return a
    }
    ;
    __spread = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(__read(arguments[t]));
        return e
    }
    ;
    __await = function(e) {
        return this instanceof __await ? (this.v = e,
        this) : new __await(e)
    }
    ;
    __asyncGenerator = function(e, t, r) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var i, n = r.apply(e, t || []), a = [];
        return i = {},
        o("next"),
        o("throw"),
        o("return"),
        i[Symbol.asyncIterator] = function() {
            return this
        }
        ,
        i;
        function o(o) {
            n[o] && (i[o] = function(r) {
                return new Promise(function(e, t) {
                    1 < a.push([o, r, e, t]) || l(o, r)
                }
                )
            }
            )
        }
        function l(e, t) {
            try {
                (r = n[e](t)).value instanceof __await ? Promise.resolve(r.value.v).then(s, c) : u(a[0][2], r)
            } catch (e) {
                u(a[0][3], e)
            }
            var r
        }
        function s(e) {
            l("next", e)
        }
        function c(e) {
            l("throw", e)
        }
        function u(e, t) {
            (e(t),
            a.shift(),
            a.length) && l(a[0][0], a[0][1])
        }
    }
    ;
    __asyncDelegator = function(o) {
        var e, i;
        return e = {},
        t("next"),
        t("throw", function(e) {
            throw e
        }),
        t("return"),
        e[Symbol.iterator] = function() {
            return this
        }
        ,
        e;
        function t(t, r) {
            o[t] && (e[t] = function(e) {
                return (i = !i) ? {
                    value: __await(o[t](e)),
                    done: "return" === t
                } : r ? r(e) : e
            }
            )
        }
    }
    ;
    __asyncValues = function(e) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var t = e[Symbol.asyncIterator];
        return t ? t.call(e) : "function" == typeof __values ? __values(e) : e[Symbol.iterator]()
    }
    ;
    e("__extends", __extends);
    e("__assign", __assign);
    e("__rest", __rest);
    e("__decorate", __decorate);
    e("__param", __param);
    e("__metadata", __metadata);
    e("__awaiter", __awaiter);
    e("__generator", __generator);
    e("__exportStar", __exportStar);
    e("__values", __values);
    e("__read", __read);
    e("__spread", __spread);
    e("__await", __await);
    e("__asyncGenerator", __asyncGenerator);
    e("__asyncDelegator", __asyncDelegator);
    e("__asyncValues", __asyncValues)
});
define("at", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = /\{(\d+)\}/g;
    function o(e) {
        for (var o = [], t = 1; t < arguments.length; t++)
            o[t - 1] = arguments[t];
        return e.replace(s, function(e, t) {
            var r = o[Number(t)];
            return null === r ? "" : "" + r
        })
    }
    t.format = o;
    t.formatToArray = function(e) {
        for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
        for (var o, i = [], n = 0; o = s.exec(e); ) {
            var a = o[0]
              , l = t[parseInt(a.replace(/\{|\}+/g, ""), 10)];
            o.index > n && i.push(e.substring(n, o.index));
            n = s.lastIndex;
            i.push(l)
        }
        n !== e.length && i.push(e.substring(n, e.length));
        return i
    }
    ;
    t.doesStringEndWith = function(e, t) {
        return e.substr(e.length - t.length) === t
    }
    ;
    t.doesStringStartWith = function(e, t) {
        return e.substr(0, t.length) === t
    }
    ;
    t.rightPad = function(e, t) {
        for (var r = e.toString(); r.length < t; )
            r += "0";
        return r
    }
    ;
    t.leftPad = function(e, t) {
        for (var r = e.toString(); r.length < t; )
            r = "0" + r;
        return r
    }
    ;
    t.findOneOf = function(e, t) {
        for (var r = 0; r < e.length; r++)
            if (0 <= t.indexOf(e[r]))
                return r;
        return -1
    }
    ;
    t.equalsCaseInsensitive = function(e, t) {
        return e && t ? e.toUpperCase() === t.toUpperCase() : e === t
    }
    ;
    t.capitalize = function(e) {
        return e ? e[0].toUpperCase() + e.substr(1) : e
    }
    ;
    t.decapitalize = function(e) {
        return e ? e[0].toLowerCase() + e.substr(1) : e
    }
    ;
    t.pluralSelect = function(e, t, r) {
        return 1 === e ? t : r
    }
    ;
    function i(e, t, r) {
        r = Number(r);
        if (void 0 === e || void 0 === t || void 0 === r)
            return "";
        for (var o = "", i = -1, n = t.split("||"), a = 0, l = n.length; a < l; a++) {
            var s = n[a];
            if (s) {
                for (var c = 0, u = s.split(","); c < u.length; c++) {
                    var d = u[c];
                    if (d)
                        if (isNaN(Number(d))) {
                            if (-1 !== d.indexOf("-")) {
                                var f = d.split("-");
                                if (2 !== f.length)
                                    continue;
                                var g = void 0;
                                if ("" === f[0])
                                    g = 0;
                                else {
                                    if (isNaN(Number(f[0])))
                                        continue;
                                    g = parseInt(f[0], 10)
                                }
                                if (g <= r) {
                                    if ("" === f[1]) {
                                        i = a;
                                        break
                                    }
                                    if (isNaN(Number(f[1])))
                                        continue;
                                    if (r <= parseInt(f[1], 10)) {
                                        i = a;
                                        break
                                    }
                                }
                            } else if (-1 !== d.indexOf("*")) {
                                var p = d.trim().replace(/\*/g, "[0-9]*");
                                if (new RegExp("^" + p + "$").test(r.toString())) {
                                    i = a;
                                    break
                                }
                            }
                        } else {
                            if (r === parseInt(d, 10)) {
                                i = a;
                                break
                            }
                        }
                }
                if (-1 !== i)
                    break
            }
        }
        if (-1 !== i) {
            var h = e.split("||");
            h[i] && (o = h[i])
        }
        return o
    }
    t.getLocalizedCountValue = i;
    t.formatWithLocalizedCountValue = function(e, t, r) {
        return o(i(e, t, r) || "", r.toString())
    }
});
define("as", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = /[<>&'"\\]/g
      , o = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#39;",
        "\\": "&#92;"
    };
    function i(e) {
        return o[e]
    }
    t.encodeText = function(e) {
        return e ? e.replace(r, i) : ""
    }
});
define("aa", ["require", "exports", "ar", "aq", "ap", "ao", "an", "am", "al", "ak", "aj", "ai", "ah", "ag", "af", "ae", "ad", "ac", "ab"], function(e, t, o, i, n, a, l, s, c, u, d, f, g, p, h, m, v, y) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(t, r) {
        void 0 === t && (t = "https://spoprod-a.akamaihd.net/files/fabric/assets/icons/");
        [o.initializeIcons, i.initializeIcons, n.initializeIcons, a.initializeIcons, l.initializeIcons, s.initializeIcons, c.initializeIcons, u.initializeIcons, d.initializeIcons, f.initializeIcons, g.initializeIcons, p.initializeIcons, h.initializeIcons, m.initializeIcons, v.initializeIcons, y.initializeIcons].forEach(function(e) {
            return e(t, r)
        })
    }
});
define("ar", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons"',
                src: "url('" + e + "fabric-icons-a13498cf.woff') format('woff')"
            },
            icons: {
                GlobalNavButton: "",
                ChevronDown: "",
                ChevronUp: "",
                Edit: "",
                Add: "",
                Cancel: "",
                More: "",
                Settings: "",
                Mail: "",
                Filter: "",
                Search: "",
                Share: "",
                BlockedSite: "",
                FavoriteStar: "",
                FavoriteStarFill: "",
                CheckMark: "",
                Delete: "",
                ChevronLeft: "",
                ChevronRight: "",
                Calendar: "",
                Megaphone: "",
                Undo: "",
                Flag: "",
                Page: "",
                Pinned: "",
                View: "",
                Clear: "",
                Download: "",
                Upload: "",
                Folder: "",
                Sort: "",
                AlignRight: "",
                AlignLeft: "",
                Tag: "",
                AddFriend: "",
                Info: "",
                SortLines: "",
                List: "",
                CircleRing: "",
                Heart: "",
                HeartFill: "",
                Tiles: "",
                Embed: "",
                Glimmer: "",
                Ascending: "",
                Descending: "",
                SortUp: "",
                SortDown: "",
                SyncToPC: "",
                LargeGrid: "",
                SkypeCheck: "",
                SkypeClock: "",
                SkypeMinus: "",
                ClearFilter: "",
                Flow: "",
                StatusCircleCheckmark: "",
                MoreVertical: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("f", ["require", "exports", "av", "W", "B", "v", "g"], function(e, t, r, o, i, n, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.__exportStar(o, t);
    r.__exportStar(i, t);
    r.__exportStar(n, t);
    r.__exportStar(a, t)
});
define("W", ["require", "exports", "Z", "Y", "X"], function(e, t, r, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.AnimationClassNames = r.AnimationClassNames;
    t.FontClassNames = o.FontClassNames;
    t.ColorClassNames = i.ColorClassNames
});
define("Z", ["require", "exports", "v", "B"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.AnimationClassNames = r.buildClassMap(o.AnimationStyles)
});
define("v", ["require", "exports", "A", "x", "w"], function(e, t, r, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.buildClassMap = r.buildClassMap;
    t.getIcon = o.getIcon;
    t.registerIcons = o.registerIcons;
    t.registerIconAlias = o.registerIconAlias;
    t.setIconOptions = o.setIconOptions;
    t.getIconClassName = i.getIconClassName
});
define("A", ["require", "exports", "g"], function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.buildClassMap = function(r) {
        var o = {}
          , e = function(e) {
            if (r.hasOwnProperty(e)) {
                var t;
                Object.defineProperty(o, e, {
                    get: function() {
                        void 0 === t && (t = i.mergeStyles(r[e]).toString());
                        return t
                    },
                    enumerable: !0,
                    configurable: !0
                })
            }
        };
        for (var t in r)
            e(t);
        return o
    }
});
define("g", ["require", "exports", "h"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.InjectionMode = r.InjectionMode;
    t.Stylesheet = r.Stylesheet;
    t.concatStyleSets = r.concatStyleSets;
    t.fontFace = r.fontFace;
    t.keyframes = r.keyframes;
    t.mergeStyleSets = r.mergeStyleSets;
    t.mergeStyles = r.mergeStyles
});
define("h", ["require", "exports", "u", "s", "r", "q", "j", "i"], function(e, t, r, o, i, n, a, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.mergeStyles = r.mergeStyles;
    t.mergeStyleSets = o.mergeStyleSets;
    t.concatStyleSets = i.concatStyleSets;
    t.fontFace = n.fontFace;
    t.keyframes = a.keyframes;
    t.InjectionMode = l.InjectionMode;
    t.Stylesheet = l.Stylesheet
});
define("u", ["require", "exports", "k", "t"], function(e, t, n, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.mergeStyles = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = a.extractStyleParts(e)
          , o = r.classes
          , i = r.objects;
        i.length && o.push(n.styleToClassName(i));
        return o.join(" ")
    }
});
define("k", ["require", "exports", "i", "p", "n", "m", "l"], function(e, t, p, i, n, a, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = "displayName";
    function h(e, t, r) {
        var o = "string" == typeof r ? r.split(" ") : [r];
        e[t + "Top"] = o[0];
        e[t + "Right"] = o[1] || o[0];
        e[t + "Bottom"] = o[2] || o[0];
        e[t + "Left"] = o[3] || o[1] || o[0]
    }
    function f(e) {
        if (!e)
            return "";
        var t = [];
        for (var r in e)
            e.hasOwnProperty(r) && r !== s && void 0 !== e[r] && t.push(r, e[r]);
        for (var o = 0; o < t.length; o += 2) {
            i.kebabRules(t, o);
            a.provideUnits(t, o);
            l.rtlifyRules(t, o);
            n.prefixRules(t, o)
        }
        for (o = 1; o < t.length; o += 4)
            t.splice(o, 1, ":", t[o], ";");
        return t.join("")
    }
    t.serializeRuleEntries = f;
    function o() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r, o, i = function e(t, r, o) {
            void 0 === r && (r = {
                __order: []
            });
            void 0 === o && (o = "&");
            var i = p.Stylesheet.getInstance()
              , n = r[o];
            if (!n) {
                n = {};
                r[o] = n;
                r.__order.push(o)
            }
            for (var a = 0, l = t; a < l.length; a++) {
                var s = l[a];
                if ("string" == typeof s) {
                    var c = i.argsFromClassName(s);
                    c && e(c, r, o)
                } else if (Array.isArray(s))
                    e(s, r, o);
                else
                    for (var u in s)
                        if ("selectors" === u) {
                            var d = s.selectors;
                            for (var f in d)
                                if (d.hasOwnProperty(f)) {
                                    var g = d[f];
                                    0 === f.indexOf(":global(") ? f = f.replace(/:global\(|\)$/g, "") : 0 === f.indexOf("@media") ? f = f + "{" + o : 0 === f.indexOf(":") ? f = o + f : f.indexOf("&") < 0 && (f = o + " " + f);
                                    e([g], r, f)
                                }
                        } else
                            "margin" === u || "padding" === u ? h(n, u, s[u]) : n[u] = s[u]
            }
            return r
        }(e), n = function(e) {
            for (var t = [], r = !1, o = 0, i = e.__order; o < i.length; o++) {
                var n = i[o];
                t.push(n);
                var a = e[n];
                for (var l in a)
                    if (a.hasOwnProperty(l) && void 0 !== a[l]) {
                        r = !0;
                        t.push(l, a[l])
                    }
            }
            return r ? t.join("") : void 0
        }(i);
        if (n) {
            var a = p.Stylesheet.getInstance()
              , l = {
                className: a.classNameFromKey(n),
                key: n,
                args: e
            };
            if (!l.className) {
                l.className = a.getClassName((o = (r = i) && r["&"]) ? o.displayName : void 0);
                for (var s = [], c = 0, u = i.__order; c < u.length; c++) {
                    var d = u[c];
                    s.push(d, f(i[d]))
                }
                l.rulesToInsert = s
            }
            return l
        }
    }
    t.styleToRegistration = o;
    function c(o, i) {
        var e = p.Stylesheet.getInstance()
          , t = o.className
          , r = o.key
          , n = o.args
          , a = o.rulesToInsert;
        if (a) {
            for (var l = 0; l < a.length; l += 2) {
                var s = a[l + 1];
                if (s) {
                    var c = a[l]
                      , u = (c = c.replace(/(&)|\$([\w-]+)\b/g, function(e, t, r) {
                        return t ? "." + o.className : r ? "." + (i && i[r] || r) : ""
                    })) + "{" + s + "}" + (0 === c.indexOf("@media") ? "}" : "");
                    e.insertRule(u)
                }
            }
            e.cacheClassName(t, r, n, a)
        }
    }
    t.applyRegistration = c;
    t.styleToClassName = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = o.apply(void 0, e);
        if (r) {
            c(r);
            return r.className
        }
        return ""
    }
});
define("i", ["require", "exports", "av"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    !function(e) {
        e[e.none = 0] = "none";
        e[e.insertNode = 1] = "insertNode";
        e[e.appendChild = 2] = "appendChild"
    }(t.InjectionMode || (t.InjectionMode = {}));
    var i, n = "__stylesheet__", r = function() {
        function r(e) {
            this._rules = [];
            this._rulesToInsert = [];
            this._counter = 0;
            this._keyToClassName = {};
            this._classNameToArgs = {};
            this._config = o.__assign({
                injectionMode: 1,
                defaultPrefix: "css"
            }, e)
        }
        r.getInstance = function() {
            var e = "undefined" != typeof window ? window : {};
            if (!(i = e[n])) {
                var t = e && e.FabricConfig || {};
                i = e[n] = new r(t.mergeStyles)
            }
            return i
        }
        ;
        r.prototype.setConfig = function(e) {
            this._config = o.__assign({}, this._config, e)
        }
        ;
        r.prototype.getClassName = function(e) {
            return (e || this._config.defaultPrefix) + "-" + this._counter++
        }
        ;
        r.prototype.cacheClassName = function(e, t, r, o) {
            this._keyToClassName[t] = e;
            this._classNameToArgs[e] = {
                args: r,
                rules: o
            }
        }
        ;
        r.prototype.classNameFromKey = function(e) {
            return this._keyToClassName[e]
        }
        ;
        r.prototype.argsFromClassName = function(e) {
            var t = this._classNameToArgs[e];
            return t && t.args
        }
        ;
        r.prototype.insertedRulesFromClassName = function(e) {
            var t = this._classNameToArgs[e];
            return t && t.rules
        }
        ;
        r.prototype.insertRule = function(e) {
            var t = 0 !== this._config.injectionMode ? this._getStyleElement() : void 0;
            if (t)
                switch (this._config.injectionMode) {
                case 1:
                    var r = t.sheet;
                    try {
                        r.insertRule(e, r.cssRules.length)
                    } catch (e) {}
                    break;
                case 2:
                    t.appendChild(document.createTextNode(e))
                }
            else
                this._rules.push(e);
            this._config.onInsertRule && this._config.onInsertRule(e)
        }
        ;
        r.prototype.getRules = function() {
            return (this._rules.join("") || "") + (this._rulesToInsert.join("") || "")
        }
        ;
        r.prototype.reset = function() {
            this._rules = [];
            this._rulesToInsert = [];
            this._counter = 0;
            this._classNameToArgs = {};
            this._keyToClassName = {}
        }
        ;
        r.prototype.resetKeys = function() {
            this._keyToClassName = {}
        }
        ;
        r.prototype._getStyleElement = function() {
            var e = this;
            if (!this._styleElement && "undefined" != typeof document) {
                this._styleElement = this._createStyleElement();
                window.requestAnimationFrame(function() {
                    e._styleElement = void 0
                })
            }
            return this._styleElement
        }
        ;
        r.prototype._createStyleElement = function() {
            var e = document.createElement("style");
            e.setAttribute("data-merge-styles", "true");
            e.type = "text/css";
            this._lastStyleElement && this._lastStyleElement.nextElementSibling ? document.head.insertBefore(e, this._lastStyleElement.nextElementSibling) : document.head.appendChild(e);
            return this._lastStyleElement = e
        }
        ;
        return r
    }();
    t.Stylesheet = r
});
define("p", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.kebabRules = function(e, t) {
        e[t] = e[t].replace(/([A-Z])/g, "-$1").toLowerCase()
    }
});
define("n", ["require", "exports", "o"], function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = {
        "user-select": 1
    };
    t.prefixRules = function(e, t) {
        var r = n.getVendorSettings()
          , o = e[t];
        if (a[o]) {
            var i = e[t + 1];
            if (a[o]) {
                r.isWebkit && e.push("-webkit-" + o, i);
                r.isMoz && e.push("-moz-" + o, i);
                r.isMs && e.push("-ms-" + o, i);
                r.isOpera && e.push("-o-" + o, i)
            }
        }
    }
});
define("o", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o;
    t.getVendorSettings = function() {
        if (!o) {
            var e = "undefined" != typeof document ? document : void 0
              , t = "undefined" != typeof navigator ? navigator : void 0
              , r = t ? t.userAgent.toLowerCase() : void 0;
            o = e ? {
                isWebkit: !!(e && "WebkitAppearance"in e.documentElement.style),
                isMoz: !!(r && -1 < r.indexOf("firefox")),
                isOpera: !!(r && -1 < r.indexOf("opera")),
                isMs: !(!t || !/rv:11.0/i.test(t.userAgent) && !/Edge\/\d./i.test(navigator.userAgent))
            } : {
                isWebkit: !0,
                isMoz: !0,
                isOpera: !0,
                isMs: !0
            }
        }
        return o
    }
    ;
    t.setVendorSettings = function(e) {
        o = e
    }
});
define("m", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = ["column-count", "font-weight", "flex-basis", "flex", "flex-grow", "flex-shrink", "fill-opacity", "opacity", "order", "z-index", "zoom"];
    t.provideUnits = function(e, t) {
        var r = e[t]
          , o = e[t + 1];
        if ("number" == typeof o) {
            var i = -1 === n.indexOf(r) ? "px" : "";
            e[t + 1] = "" + o + i
        }
    }
});
define("l", ["require", "exports", "i"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o, i = "left", n = "right", a = ((o = {})[i] = n,
    o[n] = i,
    o), l = {
        "w-resize": "e-resize",
        "sw-resize": "se-resize",
        "nw-resize": "ne-resize"
    }, s = c();
    t.setRTL = function(e) {
        if (s !== e) {
            r.Stylesheet.getInstance().resetKeys();
            s = e
        }
    }
    ;
    function c() {
        void 0 === s && (s = "undefined" != typeof document && !!document.documentElement && "rtl" === document.documentElement.getAttribute("dir"));
        return s
    }
    t.getRTL = c;
    t.rtlifyRules = function(e, t) {
        if (c()) {
            var r = e[t];
            if (!r)
                return;
            var o = e[t + 1];
            if ("string" == typeof o && 0 <= o.indexOf("@noflip"))
                e[t + 1] = o.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, "");
            else if (0 <= r.indexOf(i))
                e[t] = r.replace(i, n);
            else if (0 <= r.indexOf(n))
                e[t] = r.replace(n, i);
            else if (0 <= String(o).indexOf(i))
                e[t + 1] = o.replace(i, n);
            else if (0 <= String(o).indexOf(n))
                e[t + 1] = o.replace(n, i);
            else if (a[r])
                e[t] = a[r];
            else if (l[o])
                e[t + 1] = l[o];
            else
                switch (r) {
                case "margin":
                case "padding":
                    e[t + 1] = function(e) {
                        if ("string" == typeof e) {
                            var t = e.split(" ");
                            if (4 === t.length)
                                return t[0] + " " + t[3] + " " + t[2] + " " + t[1]
                        }
                        return e
                    }(o);
                    break;
                case "box-shadow":
                    e[t + 1] = function(e, t) {
                        var r = e.split(" ")
                          , o = parseInt(r[t], 10);
                        r[0] = r[0].replace(String(o), String(-1 * o));
                        return r.join(" ")
                    }(o, 0)
                }
        }
    }
});
define("t", ["require", "exports", "i"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.extractStyleParts = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var a = []
          , l = []
          , s = r.Stylesheet.getInstance();
        !function e(t) {
            for (var r = 0, o = t; r < o.length; r++) {
                var i = o[r];
                if (i)
                    if ("string" == typeof i)
                        if (0 <= i.indexOf(" "))
                            e(i.split(" "));
                        else {
                            var n = s.argsFromClassName(i);
                            n ? e(n) : -1 === a.indexOf(i) && a.push(i)
                        }
                    else
                        Array.isArray(i) ? e(i) : "object" == typeof i && l.push(i)
            }
        }(e);
        return {
            classes: a,
            objects: l
        }
    }
});
define("s", ["require", "exports", "t", "r", "k"], function(e, t, p, h, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.mergeStyleSets = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = {}
          , o = {}
          , i = e[0];
        if (i) {
            1 < e.length && (i = h.concatStyleSets.apply(void 0, e));
            var n = [];
            for (var a in i)
                if (i.hasOwnProperty(a)) {
                    var l = i[a]
                      , s = p.extractStyleParts(l)
                      , c = s.classes
                      , u = s.objects
                      , d = m.styleToRegistration({
                        displayName: a
                    }, u);
                    n.push(d);
                    if (d) {
                        o[a] = d.className;
                        r[a] = c.concat([d.className]).join(" ")
                    }
                }
            for (var f = 0, g = n; f < g.length; f++)
                (d = g[f]) && m.applyRegistration(d, o)
        }
        return r
    }
});
define("r", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.concatStyleSets = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        for (var r = {}, o = 0, i = e; o < i.length; o++) {
            var n = i[o];
            if (n)
                for (var a in n)
                    if (n.hasOwnProperty(a)) {
                        var l = r[a]
                          , s = n[a];
                        r[a] = void 0 === l ? s : (Array.isArray(l) ? l : [l]).concat(Array.isArray(s) ? s : [s])
                    }
        }
        return r
    }
});
define("q", ["require", "exports", "i", "k"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.fontFace = function(e) {
        r.Stylesheet.getInstance().insertRule("@font-face{" + o.serializeRuleEntries(e) + "}")
    }
});
define("j", ["require", "exports", "i", "k"], function(e, t, a, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.keyframes = function(e) {
        var t = a.Stylesheet.getInstance()
          , r = t.getClassName()
          , o = [];
        for (var i in e)
            e.hasOwnProperty(i) && o.push(i, "{", l.serializeRuleEntries(e[i]), "}");
        var n = o.join("");
        t.insertRule("@keyframes " + r + "{" + n + "}");
        t.cacheClassName(r, n, [], ["keyframes", n]);
        return r
    }
});
define("x", ["require", "exports", "av", "z", "y", "h"], function(e, t, l, s, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = r.GlobalSettings.getValue("icons", {
        __options: {
            disableWarnings: !1,
            warnOnMissingIcons: !0
        },
        __remapped: {}
    });
    t.registerIcons = function(e, t) {
        var r = l.__assign({}, e, {
            isRegistered: !1,
            className: void 0
        })
          , o = e.icons;
        t = t ? l.__assign({}, c.__options, t) : c.__options;
        for (var i in o)
            if (o.hasOwnProperty(i)) {
                var n = o[i]
                  , a = i.toLowerCase();
                c[a] ? t.disableWarnings || s.warn("Icon '" + i + " being re-registered. Ignoring duplicate registration.") : c[a] = {
                    code: n,
                    subset: r
                }
            }
    }
    ;
    t.registerIconAlias = function(e, t) {
        c.__remapped[e.toLowerCase()] = t.toLowerCase()
    }
    ;
    t.getIcon = function(e) {
        var t = void 0
          , r = c.__options;
        e = e ? e.toLowerCase() : "";
        if (e = c.__remapped[e] || e)
            if (t = c[e]) {
                var o = t.subset;
                if (o.fontFace && !o.isRegistered) {
                    i.fontFace(o.fontFace);
                    o.className = i.mergeStyles(o.style, {
                        fontFamily: o.fontFace.fontFamily,
                        fontWeight: o.fontFace.fontWeight || "normal",
                        fontStyle: o.fontFace.fontStyle || "normal"
                    }).toString();
                    o.isRegistered = !0
                }
            } else
                !r.disableWarnings && r.warnOnMissingIcons && s.warn('The icon "' + e + '" was used but not registered. See http://aka.ms/fabric-icon-usage for more information.');
        return t
    }
    ;
    t.setIconOptions = function(e) {
        c.__options = l.__assign({}, c.__options, e)
    }
});
define("z", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = void 0;
    t.warnDeprecations = function(e, t, r) {
        for (var o in r)
            if (t && o in t) {
                var i = e + " property '" + o + "' was used but has been deprecated."
                  , n = r[o];
                n && (i += " Use '" + n + "' instead.");
                s(i)
            }
    }
    ;
    t.warnMutuallyExclusive = function(e, t, r) {
        for (var o in r)
            if (t && o in t) {
                var i = r[o];
                i && i in t && s(e + " property '" + o + "' is mutually exclusive with '" + r[o] + "'. Use one or the other.")
            }
    }
    ;
    t.warnConditionallyRequiredProps = function(e, t, r, o, i) {
        if (!0 === i)
            for (var n = 0, a = r; n < a.length; n++) {
                var l = a[n];
                l in t || s(e + " property '" + l + "' is required when '" + o + "' is used.'")
            }
    }
    ;
    function s(e) {
        r ? r(e) : console && console.warn && console.warn(e)
    }
    t.warn = s;
    t.setWarningCallback = function(e) {
        r = e
    }
});
define("y", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "__globalSettings__"
      , o = "__callbacks__"
      , n = {}
      , i = 0;
    if ("undefined" != typeof window) {
        var a = window;
        n = a[r] = a[r] || ((l = {})[o] = {},
        l)
    }
    var l, s = n[o], c = function() {
        function e() {}
        e.getValue = function(e, t) {
            void 0 === n[e] && (n[e] = "function" == typeof t ? t() : t);
            return n[e]
        }
        ;
        e.setValue = function(e, t) {
            var r = n[e];
            if (t !== r) {
                var o = {
                    oldValue: r,
                    value: n[e] = t,
                    key: e
                };
                for (var i in s)
                    s.hasOwnProperty(i) && s[i](o)
            }
            return t
        }
        ;
        e.addChangeListener = function(e) {
            var t = e.__id__;
            t || (t = e.__id__ = String(i++));
            s[t] = e
        }
        ;
        e.removeChangeListener = function(e) {
            delete s[e.__id__]
        }
        ;
        return e
    }();
    t.GlobalSettings = c
});
define("w", ["require", "exports", "h", "x"], function(e, t, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        display: "inline-block"
    };
    t.getIconClassName = function(e) {
        var t = ""
          , r = i.getIcon(e);
        r && (t = o.mergeStyles(r.subset.className, n, {
            selectors: {
                "::before": {
                    content: '"' + r.code + '"'
                }
            }
        }));
        return t
    }
});
define("B", ["require", "exports", "av", "V", "U", "R", "Q", "M", "L", "K", "J", "F", "E", "D", "C"], function(e, t, r, o, i, n, a, l, s, c, u, d, f, g, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.AnimationStyles = o.AnimationStyles;
    t.AnimationVariables = o.AnimationVariables;
    t.DefaultPalette = i.DefaultPalette;
    t.DefaultFontStyles = n.DefaultFontStyles;
    t.registerDefaultFontFaces = n.registerDefaultFontFaces;
    t.FontSizes = a.FontSizes;
    t.FontWeights = a.FontWeights;
    t.IconFontSizes = a.IconFontSizes;
    t.createFontStyles = a.createFontStyles;
    t.getFocusStyle = l.getFocusStyle;
    t.focusClear = l.focusClear;
    t.hiddenContentStyle = s.hiddenContentStyle;
    t.PulsingBeaconAnimationStyles = c.PulsingBeaconAnimationStyles;
    t.getGlobalClassNames = u.getGlobalClassNames;
    t.ThemeSettingName = d.ThemeSettingName;
    t.getTheme = d.getTheme;
    t.loadTheme = d.loadTheme;
    t.createTheme = d.createTheme;
    t.registerOnThemeChangeCallback = d.registerOnThemeChangeCallback;
    t.removeOnThemeChangeCallback = d.removeOnThemeChangeCallback;
    r.__exportStar(f, t);
    r.__exportStar(g, t);
    r.__exportStar(p, t)
});
define("V", ["require", "exports", "h"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = "cubic-bezier(.1,.9,.2,1)"
      , i = "cubic-bezier(.1,.25,.75,.9)"
      , n = "0.167s"
      , a = "0.267s"
      , l = "0.367s"
      , s = "0.467s"
      , c = r.keyframes({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    })
      , u = r.keyframes({
        from: {
            opacity: 1
        },
        to: {
            opacity: 0
        }
    })
      , d = V(-10)
      , f = V(-20)
      , g = V(-40)
      , p = V(-400)
      , h = V(10)
      , m = V(20)
      , v = V(40)
      , y = V(400)
      , S = U(10)
      , b = U(20)
      , _ = U(-10)
      , C = U(-20)
      , w = H(10)
      , L = H(20)
      , k = H(40)
      , F = H(400)
      , x = H(-10)
      , M = H(-20)
      , P = H(-40)
      , I = H(-400)
      , O = q(-10)
      , T = q(-20)
      , D = q(10)
      , A = q(20)
      , R = r.keyframes({
        from: {
            transform: "scale3d(.98,.98,1)"
        },
        to: {
            transform: "scale3d(1,1,1)"
        }
    })
      , E = r.keyframes({
        from: {
            transform: "scale3d(1,1,1)"
        },
        to: {
            transform: "scale3d(.98,.98,1)"
        }
    })
      , N = r.keyframes({
        from: {
            transform: "scale3d(1.03,1.03,1)"
        },
        to: {
            transform: "scale3d(1,1,1)"
        }
    })
      , B = r.keyframes({
        from: {
            transform: "scale3d(1,1,1)"
        },
        to: {
            transform: "scale3d(1.03,1.03,1)"
        }
    })
      , W = r.keyframes({
        from: {
            transform: "rotateZ(0deg)"
        },
        to: {
            transform: "rotateZ(90deg)"
        }
    })
      , j = r.keyframes({
        from: {
            transform: "rotateZ(0deg)"
        },
        to: {
            transform: "rotateZ(-90deg)"
        }
    });
    t.AnimationVariables = {
        easeFunction1: o,
        easeFunction2: i,
        durationValue1: n,
        durationValue2: a,
        durationValue3: l,
        durationValue4: s
    };
    t.AnimationStyles = {
        slideRightIn10: z(c + "," + d, l, o),
        slideRightIn20: z(c + "," + f, l, o),
        slideRightIn40: z(c + "," + g, l, o),
        slideRightIn400: z(c + "," + p, l, o),
        slideLeftIn10: z(c + "," + h, l, o),
        slideLeftIn20: z(c + "," + m, l, o),
        slideLeftIn40: z(c + "," + v, l, o),
        slideLeftIn400: z(c + "," + y, l, o),
        slideUpIn10: z(c + "," + S, l, o),
        slideUpIn20: z(c + "," + b, l, o),
        slideDownIn10: z(c + "," + _, l, o),
        slideDownIn20: z(c + "," + C, l, o),
        slideRightOut10: z(u + "," + w, l, o),
        slideRightOut20: z(u + "," + L, l, o),
        slideRightOut40: z(u + "," + k, l, o),
        slideRightOut400: z(u + "," + F, l, o),
        slideLeftOut10: z(u + "," + x, l, o),
        slideLeftOut20: z(u + "," + M, l, o),
        slideLeftOut40: z(u + "," + P, l, o),
        slideLeftOut400: z(u + "," + I, l, o),
        slideUpOut10: z(u + "," + O, l, o),
        slideUpOut20: z(u + "," + T, l, o),
        slideDownOut10: z(u + "," + D, l, o),
        slideDownOut20: z(u + "," + A, l, o),
        scaleUpIn100: z(c + "," + R, l, o),
        scaleDownIn100: z(c + "," + N, l, o),
        scaleUpOut103: z(u + "," + B, n, i),
        scaleDownOut98: z(u + "," + E, n, i),
        fadeIn100: z(c, n, i),
        fadeIn200: z(c, a, i),
        fadeIn400: z(c, l, i),
        fadeIn500: z(c, s, i),
        fadeOut100: z(u, n, i),
        fadeOut200: z(u, a, i),
        fadeOut400: z(u, l, i),
        fadeOut500: z(u, s, i),
        rotate90deg: z(W, "0.1s", i),
        rotateN90deg: z(j, "0.1s", i)
    };
    function z(e, t, r) {
        return {
            animationName: e,
            animationDuration: t,
            animationTimingFunction: r,
            animationFillMode: "both"
        }
    }
    function V(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(" + e + "px,0,0)"
            },
            to: {
                transform: "translate3d(0,0,0)"
            }
        })
    }
    function U(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(0," + e + "px,0)"
            },
            to: {
                transform: "translate3d(0,0,0)"
            }
        })
    }
    function H(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(0,0,0)"
            },
            to: {
                transform: "translate3d(" + e + "px,0,0)"
            }
        })
    }
    function q(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(0,0,0)"
            },
            to: {
                transform: "translate3d(0," + e + "px,0)"
            }
        })
    }
});
define("U", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.DefaultPalette = {
        themeDarker: "#004578",
        themeDark: "#005a9e",
        themeDarkAlt: "#106ebe",
        themePrimary: "#0078d4",
        themeSecondary: "#2b88d8",
        themeTertiary: "#71afe5",
        themeLight: "#c7e0f4",
        themeLighter: "#deecf9",
        themeLighterAlt: "#eff6fc",
        black: "#000000",
        blackTranslucent40: "rgba(0,0,0,.4)",
        neutralDark: "#212121",
        neutralPrimary: "#333333",
        neutralPrimaryAlt: "#3c3c3c",
        neutralSecondary: "#666666",
        neutralTertiary: "#a6a6a6",
        neutralTertiaryAlt: "#c8c8c8",
        neutralQuaternary: "#d0d0d0",
        neutralQuaternaryAlt: "#dadada",
        neutralLight: "#eaeaea",
        neutralLighter: "#f4f4f4",
        neutralLighterAlt: "#f8f8f8",
        accent: "#0078d4",
        white: "#ffffff",
        whiteTranslucent40: "rgba(255,255,255,.4)",
        yellow: "#ffb900",
        yellowLight: "#fff100",
        orange: "#d83b01",
        orangeLight: "#ea4300",
        orangeLighter: "#ff8c00",
        redDark: "#a80000",
        red: "#e81123",
        magentaDark: "#5c005c",
        magenta: "#b4009e",
        magentaLight: "#e3008c",
        purpleDark: "#32145a",
        purple: "#5c2d91",
        purpleLight: "#b4a0ff",
        blueDark: "#002050",
        blueMid: "#00188f",
        blue: "#0078d4",
        blueLight: "#00bcf2",
        tealDark: "#004b50",
        teal: "#008272",
        tealLight: "#00b294",
        greenDark: "#004b1c",
        green: "#107c10",
        greenLight: "#bad80a"
    }
});
define("R", ["require", "exports", "h", "Q", "S"], function(e, t, n, a, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o, i;
    t.DefaultFontStyles = a.createFontStyles(r.getLanguage());
    function l(e, t, r, o) {
        e = "'" + e + "'";
        var i = void 0 !== o ? "local('" + o + "')," : "";
        n.fontFace({
            fontFamily: e,
            src: i + "url('" + t + ".woff2') format('woff2'),url('" + t + ".woff') format('woff')",
            fontWeight: r,
            fontStyle: "normal"
        })
    }
    function s(e, t, r, o, i) {
        void 0 === o && (o = "segoeui");
        var n = e + "/" + r + "/" + o;
        l(t, n + "-light", a.FontWeights.light, i && i + " Light");
        l(t, n + "-semilight", a.FontWeights.semilight, i && i + " SemiLight");
        l(t, n + "-regular", a.FontWeights.regular, i);
        l(t, n + "-semibold", a.FontWeights.semibold, i && i + " SemiBold")
    }
    function c(e) {
        if (e) {
            var t = e + "/fonts";
            s(t, a.LocalizedFontNames.Thai, "leelawadeeui-thai", "leelawadeeui");
            s(t, a.LocalizedFontNames.Arabic, "segoeui-arabic");
            s(t, a.LocalizedFontNames.Cyrillic, "segoeui-cyrillic");
            s(t, a.LocalizedFontNames.EastEuropean, "segoeui-easteuropean");
            s(t, a.LocalizedFontNames.Greek, "segoeui-greek");
            s(t, a.LocalizedFontNames.Hebrew, "segoeui-hebrew");
            s(t, a.LocalizedFontNames.Vietnamese, "segoeui-vietnamese");
            s(t, a.LocalizedFontNames.WestEuropean, "segoeui-westeuropean", "segoeui", "Segoe UI");
            s(t, a.LocalizedFontFamilies.Selawik, "selawik", "selawik");
            l("Leelawadee UI Web", t + "/leelawadeeui-thai/leelawadeeui-semilight", a.FontWeights.light);
            l("Leelawadee UI Web", t + "/leelawadeeui-thai/leelawadeeui-bold", a.FontWeights.semibold)
        }
    }
    (t.registerDefaultFontFaces = c)((o = "undefined" != typeof window ? window : void 0,
    (i = o ? o.FabricConfig : void 0) && void 0 !== i.fontBaseUrl ? i.fontBaseUrl : "https://static2.sharepointonline.com/files/fabric/assets"))
});
define("Q", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, i, o = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif";
    !function(e) {
        e.Arabic = "Segoe UI Web (Arabic)";
        e.Cyrillic = "Segoe UI Web (Cyrillic)";
        e.EastEuropean = "Segoe UI Web (East European)";
        e.Greek = "Segoe UI Web (Greek)";
        e.Hebrew = "Segoe UI Web (Hebrew)";
        e.Thai = "Leelawadee UI Web";
        e.Vietnamese = "Segoe UI Web (Vietnamese)";
        e.WestEuropean = "Segoe UI Web (West European)";
        e.Selawik = "Selawik Web"
    }(r = t.LocalizedFontNames || (t.LocalizedFontNames = {}));
    !function(e) {
        e.Arabic = "'" + r.Arabic + "'";
        e.ChineseSimplified = "'Microsoft Yahei UI', Verdana, Simsun";
        e.ChineseTraditional = "'Microsoft Jhenghei UI', Pmingliu";
        e.Cyrillic = "'" + r.Cyrillic + "'";
        e.EastEuropean = "'" + r.EastEuropean + "'";
        e.Greek = "'" + r.Greek + "'";
        e.Hebrew = "'" + r.Hebrew + "'";
        e.Hindi = "'Nirmala UI'";
        e.Japanese = "'Yu Gothic UI', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka";
        e.Korean = "'Malgun Gothic', Gulim";
        e.Selawik = "'" + r.Selawik + "'";
        e.Thai = "'Leelawadee UI Web', 'Kmer UI'";
        e.Vietnamese = "'" + r.Vietnamese + "'";
        e.WestEuropean = "'" + r.WestEuropean + "'"
    }(i = t.LocalizedFontFamilies || (t.LocalizedFontFamilies = {}));
    var n, a, l = "'Segoe UI', '" + r.WestEuropean + "'", s = {
        ar: i.Arabic,
        bg: i.Cyrillic,
        cs: i.EastEuropean,
        el: i.Greek,
        et: i.EastEuropean,
        he: i.Hebrew,
        hi: i.Hindi,
        hr: i.EastEuropean,
        hu: i.EastEuropean,
        ja: i.Japanese,
        kk: i.EastEuropean,
        ko: i.Korean,
        lt: i.EastEuropean,
        lv: i.EastEuropean,
        pl: i.EastEuropean,
        ru: i.Cyrillic,
        sk: i.EastEuropean,
        "sr-latn": i.EastEuropean,
        th: i.Thai,
        tr: i.EastEuropean,
        uk: i.Cyrillic,
        vi: i.Vietnamese,
        "zh-hans": i.ChineseSimplified,
        "zh-hant": i.ChineseTraditional
    };
    !function(e) {
        e.mini = "10px";
        e.xSmall = "11px";
        e.small = "12px";
        e.smallPlus = "13px";
        e.medium = "14px";
        e.mediumPlus = "15px";
        e.icon = "16px";
        e.large = "17px";
        e.xLarge = "21px";
        e.xxLarge = "28px";
        e.superLarge = "42px";
        e.mega = "72px"
    }(n = t.FontSizes || (t.FontSizes = {}));
    !function(e) {
        e.light = 100;
        e.semilight = 300;
        e.regular = 400;
        e.semibold = 600;
        e.bold = 700
    }(a = t.FontWeights || (t.FontWeights = {}));
    !function(e) {
        e.xSmall = "10px";
        e.small = "12px";
        e.medium = "16px";
        e.large = "20px"
    }(t.IconFontSizes || (t.IconFontSizes = {}));
    function c(e) {
        return e + ", " + o
    }
    t.createFontStyles = function(e) {
        var t = function(e) {
            for (var t in s)
                if (s.hasOwnProperty(t) && e && 0 === t.indexOf(e))
                    return s[t];
            return l
        }(e)
          , r = c(t)
          , o = r;
        t === l && (o = c(i.WestEuropean));
        return {
            tiny: u(n.mini, a.semibold, r),
            xSmall: u(n.xSmall, a.regular, r),
            small: u(n.small, a.regular, r),
            smallPlus: u(n.smallPlus, a.regular, r),
            medium: u(n.medium, a.regular, r),
            mediumPlus: u(n.mediumPlus, a.regular, r),
            large: u(n.large, a.semilight, o),
            xLarge: u(n.xLarge, a.light, r),
            xxLarge: u(n.xxLarge, a.light, r),
            superLarge: u(n.superLarge, a.light, r),
            mega: u(n.mega, a.light, r)
        }
    }
    ;
    function u(e, t, r) {
        return {
            fontFamily: r,
            MozOsxFontSmoothing: "grayscale",
            WebkitFontSmoothing: "antialiased",
            fontSize: e,
            fontWeight: t
        }
    }
});
define("S", ["require", "exports", "P", "T"], function(e, t, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n;
    t.getLanguage = function() {
        if (void 0 === n) {
            var e = o.getDocument()
              , t = i.getItem("language");
            null !== t && (n = t);
            void 0 === n && e && (n = e.documentElement.getAttribute("lang"));
            void 0 === n && (n = "en")
        }
        return n
    }
    ;
    t.setLanguage = function(e, t) {
        void 0 === t && (t = !1);
        var r = o.getDocument();
        r && r.documentElement.setAttribute("lang", e);
        t || i.setItem("language", e);
        n = e
    }
});
define("P", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.setVirtualParent = function(e, t) {
        var r = e
          , o = t;
        r._virtual || (r._virtual = {
            children: []
        });
        var i = r._virtual.parent;
        if (i && i !== t) {
            var n = i._virtual.children.indexOf(r);
            -1 < n && i._virtual.children.splice(n, 1)
        }
        r._virtual.parent = o || void 0;
        if (o) {
            o._virtual || (o._virtual = {
                children: []
            });
            o._virtual.children.push(r)
        }
    }
    ;
    function r(e) {
        var t;
        e && a(e) && (t = e._virtual.parent);
        return t
    }
    t.getVirtualParent = r;
    function n(e, t) {
        void 0 === t && (t = !0);
        return e && (t && r(e) || e.parentNode && e.parentNode)
    }
    t.getParent = n;
    t.getChildren = function(e, t) {
        void 0 === t && (t = !0);
        var r = [];
        if (e) {
            for (var o = 0; o < e.children.length; o++)
                r.push(e.children.item(o));
            t && a(e) && r.push.apply(r, e._virtual.children)
        }
        return r
    }
    ;
    var o = !(t.elementContains = function(e, t, r) {
        void 0 === r && (r = !0);
        var o = !1;
        if (e && t)
            if (r) {
                o = !1;
                for (; t; ) {
                    var i = n(t);
                    if (i === e) {
                        o = !0;
                        break
                    }
                    t = i
                }
            } else
                e.contains && (o = e.contains(t));
        return o
    }
    );
    t.setSSR = function(e) {
        o = e
    }
    ;
    t.getWindow = function(e) {
        return o || "undefined" == typeof window ? void 0 : e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window
    }
    ;
    t.getDocument = function(e) {
        return o || "undefined" == typeof document ? void 0 : e && e.ownerDocument ? e.ownerDocument : document
    }
    ;
    t.getRect = function(e) {
        var t;
        e && (e === window ? t = {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            right: window.innerWidth,
            bottom: window.innerHeight
        } : e.getBoundingClientRect && (t = e.getBoundingClientRect()));
        return t
    }
    ;
    function i(e, t) {
        return e && e !== document.body ? t(e) ? e : i(n(e), t) : null
    }
    t.findElementRecursive = i;
    t.elementContainsAttribute = function(e, t) {
        var r = i(e, function(e) {
            return e.hasAttribute(t)
        });
        return r && r.getAttribute(t)
    }
    ;
    function a(e) {
        return e && !!e._virtual
    }
});
define("T", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.getItem = function(e) {
        var t = null;
        try {
            t = window.localStorage.getItem(e)
        } catch (e) {}
        return t
    }
    ;
    t.setItem = function(e, t) {
        try {
            window.localStorage.setItem(e, t)
        } catch (e) {}
    }
});
define("M", ["require", "exports", "E", "N", "C"], function(e, t, a, l, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.getFocusStyle = function(e, t, r, o) {
        void 0 === t && (t = 0);
        void 0 === r && (r = "relative");
        void 0 === o && (o = void 0);
        return {
            outline: "transparent",
            position: r,
            selectors: (i = {
                "::-moz-focus-inner": {
                    border: "0"
                }
            },
            i["." + l.IsFocusVisibleClassName + " &:focus:after"] = {
                content: '""',
                position: "absolute",
                left: t + 1,
                top: t + 1,
                bottom: t + 1,
                right: t + 1,
                border: "1px solid " + e.palette.white,
                outline: "1px solid " + e.palette.neutralSecondary,
                zIndex: s.ZIndexes.FocusStyle,
                selectors: (n = {},
                n[a.HighContrastSelector] = o,
                n)
            },
            i)
        };
        var i, n
    }
    ;
    t.focusClear = function() {
        return {
            selectors: {
                "&::-moz-focus-inner": {
                    border: 0
                },
                "&": {
                    outline: "transparent"
                }
            }
        }
    }
});
define("E", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.HighContrastSelector = "@media screen and (-ms-high-contrast: active)";
    t.ScreenWidthMinSmall = 320;
    t.ScreenWidthMinMedium = 480;
    t.ScreenWidthMinLarge = 640;
    t.ScreenWidthMinXLarge = 1024;
    t.ScreenWidthMinXXLarge = 1366;
    t.ScreenWidthMinXXXLarge = 1920;
    t.ScreenWidthMaxSmall = t.ScreenWidthMinMedium - 1;
    t.ScreenWidthMaxMedium = t.ScreenWidthMinLarge - 1;
    t.ScreenWidthMaxLarge = t.ScreenWidthMinXLarge - 1;
    t.ScreenWidthMaxXLarge = t.ScreenWidthMinXXLarge - 1;
    t.ScreenWidthMaxXXLarge = t.ScreenWidthMinXXXLarge - 1;
    t.getScreenSelector = function(e, t) {
        return "@media only screen and (min-width: " + e + "px) and (max-width: " + t + "px)"
    }
});
define("N", ["require", "exports", "P", "O"], function(e, o, i, n) {
    "use strict";
    Object.defineProperty(o, "__esModule", {
        value: !0
    });
    o.IsFocusVisibleClassName = "ms-Fabric--isFocusVisible";
    o.initializeFocusRects = function(e) {
        var t = e || i.getWindow();
        if (t && !t.__hasInitializeFocusRects__) {
            t.__hasInitializeFocusRects__ = !0;
            t.addEventListener("mousedown", r, !0);
            t.addEventListener("keydown", a, !0)
        }
    }
    ;
    function r(e) {
        var t = i.getWindow(e.target);
        if (t) {
            var r = t.document.body.classList;
            r.contains(o.IsFocusVisibleClassName) && r.remove(o.IsFocusVisibleClassName)
        }
    }
    function a(e) {
        var t = i.getWindow(e.target);
        if (t) {
            var r = t.document.body.classList;
            n.isDirectionalKeyCode(e.which) && !r.contains(o.IsFocusVisibleClassName) && r.add(o.IsFocusVisibleClassName)
        }
    }
});
define("O", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, o = ((r = {})[38] = 1,
    r[40] = 1,
    r[37] = 1,
    r[39] = 1,
    r[36] = 1,
    r[35] = 1,
    r[9] = 1,
    r[33] = 1,
    r[34] = 1,
    r);
    t.isDirectionalKeyCode = function(e) {
        return !!o[e]
    }
});
define("C", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    !function(e) {
        e.Nav = 1;
        e.ScrollablePane = 1;
        e.FocusStyle = 1;
        e.Coachmark = 1e3;
        e.Layer = 1e6;
        e.KeytipLayer = 1000001
    }(t.ZIndexes || (t.ZIndexes = {}))
});
define("L", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.hiddenContentStyle = {
        position: "absolute",
        width: 1,
        height: 1,
        margin: -1,
        padding: 0,
        border: 0,
        overflow: "hidden"
    }
});
define("K", ["require", "exports", "av", "h"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    function a(e, t) {
        return {
            borderColor: e,
            borderWidth: "0px",
            width: t,
            height: t
        }
    }
    function l(e) {
        return {
            opacity: 1,
            borderWidth: e
        }
    }
    function s(e, t) {
        return {
            borderWidth: "0",
            width: t,
            height: t,
            opacity: 0,
            borderColor: e
        }
    }
    function c(e, t) {
        return r.__assign({}, a(e, t), {
            opacity: 0
        })
    }
    t.PulsingBeaconAnimationStyles = {
        continuousPulseAnimationDouble: function(e, t, r, o, i) {
            return n.keyframes({
                "0%": a(e, r),
                "1.42%": l(i),
                "3.57%": {
                    opacity: 1
                },
                "7.14%": s(t, o),
                "8%": c(e, r),
                "29.99%": c(e, r),
                "30%": a(e, r),
                "31.42%": l(i),
                "33.57%": {
                    opacity: 1
                },
                "37.14%": s(t, o),
                "38%": c(e, r),
                "79.42%": c(e, r),
                79.43: a(e, r),
                81.85: l(i),
                83.42: {
                    opacity: 1
                },
                "87%": s(t, o),
                "100%": {}
            })
        },
        continuousPulseAnimationSingle: function(e, t, r, o, i) {
            return n.keyframes({
                "0%": a(e, r),
                "14.2%": l(i),
                "35.7%": {
                    opacity: 1
                },
                "71.4%": s(t, o),
                "100%": {}
            })
        },
        createDefaultAnimation: function(e) {
            return {
                animationName: e,
                animationIterationCount: "1",
                animationDuration: "14s",
                animationDelay: "2s"
            }
        }
    }
});
define("J", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.getGlobalClassNames = function(e, t) {
        return t.disableGlobalClassNames ? {} : e
    }
});
define("F", ["require", "exports", "av", "G", "R", "U", "d"], function(e, o, i, n, a, l, s) {
    "use strict";
    Object.defineProperty(o, "__esModule", {
        value: !0
    });
    var t, c = {
        palette: l.DefaultPalette,
        semanticColors: f(l.DefaultPalette, !1, !1),
        fonts: a.DefaultFontStyles,
        isInverted: !1,
        disableGlobalClassNames: !1
    }, u = [];
    o.ThemeSettingName = "theme";
    if (!n.Customizations.getSettings([o.ThemeSettingName]).theme) {
        var r = "undefined" != typeof window ? window : void 0;
        r && r.FabricConfig && r.FabricConfig.theme && (c = d(r.FabricConfig.theme));
        n.Customizations.applySettings(((t = {})[o.ThemeSettingName] = c,
        t))
    }
    o.getTheme = function(e) {
        void 0 === e && (e = !1);
        !0 === e && (c = d({}, e));
        return c
    }
    ;
    o.registerOnThemeChangeCallback = function(e) {
        -1 === u.indexOf(e) && u.push(e)
    }
    ;
    o.removeOnThemeChangeCallback = function(e) {
        var t = u.indexOf(e);
        -1 !== t && u.splice(t, 1)
    }
    ;
    o.loadTheme = function(e, t) {
        void 0 === t && (t = !1);
        c = d(e, t);
        s.loadTheme(i.__assign({}, c.palette, c.semanticColors));
        n.Customizations.applySettings(((r = {})[o.ThemeSettingName] = c,
        r));
        u.forEach(function(e) {
            try {
                e(c)
            } catch (e) {}
        });
        return c;
        var r
    }
    ;
    function d(e, t) {
        void 0 === t && (t = !1);
        var r = i.__assign({}, l.DefaultPalette, e.palette);
        e.palette && e.palette.accent || (r.accent = r.themePrimary);
        var o = i.__assign({}, f(r, !!e.isInverted, t), e.semanticColors);
        return {
            palette: r,
            fonts: i.__assign({}, a.DefaultFontStyles, e.fonts),
            semanticColors: o,
            isInverted: !!e.isInverted,
            disableGlobalClassNames: !!e.disableGlobalClassNames
        }
    }
    o.createTheme = d;
    function f(e, t, r) {
        return function(e, t) {
            var r = "";
            !0 === t && (r = " /* @deprecated */");
            e.listTextColor = e.listText + r;
            return e
        }({
            bodyBackground: e.white,
            bodyText: e.neutralPrimary,
            bodyTextChecked: e.black,
            bodySubtext: e.neutralSecondary,
            bodyDivider: e.neutralTertiaryAlt,
            disabledBackground: e.neutralLighter,
            disabledText: e.neutralTertiary,
            disabledBodyText: e.neutralTertiaryAlt,
            disabledSubtext: e.neutralQuaternary,
            focusBorder: e.black,
            errorText: t ? "#ff5f5f" : e.redDark,
            warningText: t ? "#ffffff" : "#333333",
            errorBackground: t ? "rgba(232, 17, 35, .5)" : "rgba(232, 17, 35, .2)",
            blockingBackground: t ? "rgba(234, 67, 0, .5)" : "rgba(234, 67, 0, .2)",
            warningBackground: t ? "rgba(255, 251, 0, .6)" : "rgba(255, 185, 0, .2)",
            warningHighlight: t ? "#fff100" : "#ffb900",
            successBackground: t ? "rgba(186, 216, 10, .4)" : "rgba(186, 216, 10, .2)",
            inputBorder: e.neutralTertiary,
            inputBorderHovered: e.neutralDark,
            inputBackground: e.white,
            inputBackgroundChecked: e.themePrimary,
            inputBackgroundCheckedHovered: e.themeDarkAlt,
            inputForegroundChecked: e.white,
            inputFocusBorderAlt: e.themePrimary,
            smallInputBorder: e.neutralSecondary,
            inputPlaceholderText: e.neutralSecondary,
            buttonBackground: e.neutralLighter,
            buttonBackgroundChecked: e.neutralTertiaryAlt,
            buttonBackgroundHovered: e.neutralLight,
            buttonBackgroundCheckedHovered: e.neutralLight,
            buttonBorder: "transparent",
            buttonText: e.neutralPrimary,
            buttonTextHovered: e.black,
            buttonTextChecked: e.neutralDark,
            buttonTextCheckedHovered: e.black,
            menuItemBackgroundHovered: e.neutralLighter,
            menuItemBackgroundChecked: e.neutralLight,
            menuIcon: e.themePrimary,
            menuHeader: e.themePrimary,
            listBackground: e.white,
            listText: e.neutralPrimary,
            listItemBackgroundHovered: e.neutralLighter,
            listItemBackgroundChecked: e.neutralLight,
            listItemBackgroundCheckedHovered: e.neutralQuaternaryAlt,
            listHeaderBackgroundHovered: e.neutralLighter,
            listHeaderBackgroundPressed: e.neutralLight,
            link: e.themePrimary,
            linkHovered: e.themeDarker,
            listTextColor: ""
        }, r)
    }
});
define("G", ["require", "exports", "av", "y", "H"], function(e, t, o, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = {
        settings: {},
        scopedSettings: {}
    }
      , u = r.GlobalSettings.getValue("customizations", {
        settings: {},
        scopedSettings: {}
    })
      , n = new i.EventGroup(u)
      , a = function() {
        function r() {}
        r.reset = function() {
            u.settings = {};
            u.scopedSettings = {}
        }
        ;
        r.applySettings = function(e) {
            u.settings = o.__assign({}, u.settings, e);
            r._raiseChange()
        }
        ;
        r.applyScopedSettings = function(e, t) {
            u.scopedSettings[e] = o.__assign({}, u.scopedSettings[e], t);
            r._raiseChange()
        }
        ;
        r.getSettings = function(e, t, r) {
            void 0 === r && (r = c);
            for (var o = {}, i = t && r.scopedSettings[t] || {}, n = t && u.scopedSettings[t] || {}, a = 0, l = e; a < l.length; a++) {
                var s = l[a];
                o[s] = i[s] || r.settings[s] || n[s] || u.settings[s]
            }
            return o
        }
        ;
        r.observe = function(e) {
            n.on(u, "change", e)
        }
        ;
        r.unobserve = function(e) {
            n.off(u, "change", e)
        }
        ;
        r._raiseChange = function() {
            n.raise("change")
        }
        ;
        return r
    }();
    t.Customizations = a
});
define("H", ["require", "exports", "I"], function(e, t, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function g(e) {
            this._id = g._uniqueId++;
            this._parent = e;
            this._eventRecords = []
        }
        g.raise = function(e, t, r, o) {
            var i;
            if (g._isElement(e)) {
                if (document.createEvent) {
                    var n = document.createEvent("HTMLEvents");
                    n.initEvent(t, o || !1, !0);
                    p.assign(n, r);
                    i = e.dispatchEvent(n)
                } else if (document.createEventObject) {
                    var a = document.createEventObject(r);
                    e.fireEvent("on" + t, a)
                }
            } else
                for (; e && !1 !== i; ) {
                    var l = e.__events__
                      , s = l ? l[t] : null;
                    if (s)
                        for (var c in s)
                            if (s.hasOwnProperty(c))
                                for (var u = s[c], d = 0; !1 !== i && d < u.length; d++) {
                                    var f = u[d];
                                    f.objectCallback && (i = f.objectCallback.call(f.parent, r))
                                }
                    e = o ? e.parent : null
                }
            return i
        }
        ;
        g.isObserved = function(e, t) {
            var r = e && e.__events__;
            return !!r && !!r[t]
        }
        ;
        g.isDeclared = function(e, t) {
            var r = e && e.__declaredEvents;
            return !!r && !!r[t]
        }
        ;
        g.stopPropagation = function(e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        }
        ;
        g._isElement = function(e) {
            return !!e && (!!e.addEventListener || "undefined" != typeof HTMLElement && e instanceof HTMLElement)
        }
        ;
        g.prototype.dispose = function() {
            if (!this._isDisposed) {
                this._isDisposed = !0;
                this.off();
                this._parent = null
            }
        }
        ;
        g.prototype.onAll = function(e, t, r) {
            for (var o in t)
                t.hasOwnProperty(o) && this.on(e, o, t[o], r)
        }
        ;
        g.prototype.on = function(e, t, i, r) {
            var n = this;
            if (-1 < t.indexOf(","))
                for (var o = t.split(/[ ,]+/), a = 0; a < o.length; a++)
                    this.on(e, o[a], i, r);
            else {
                var l = this._parent
                  , s = {
                    target: e,
                    eventName: t,
                    parent: l,
                    callback: i,
                    useCapture: r || !1
                };
                (o = e.__events__ = e.__events__ || {})[t] = o[t] || {
                    count: 0
                };
                o[t][this._id] = o[t][this._id] || [];
                o[t][this._id].push(s);
                o[t].count++;
                if (g._isElement(e)) {
                    var c = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        if (!n._isDisposed) {
                            var r;
                            try {
                                if (!1 === (r = i.apply(l, e)) && e[0]) {
                                    var o = e[0];
                                    o.preventDefault && o.preventDefault();
                                    o.stopPropagation && o.stopPropagation();
                                    o.cancelBubble = !0
                                }
                            } catch (o) {}
                            return r
                        }
                    };
                    s.elementCallback = c;
                    e.addEventListener ? e.addEventListener(t, c, r) : e.attachEvent && e.attachEvent("on" + t, c)
                } else {
                    s.objectCallback = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        if (!n._isDisposed)
                            return i.apply(l, e)
                    }
                }
                this._eventRecords.push(s)
            }
        }
        ;
        g.prototype.off = function(e, t, r, o) {
            for (var i = 0; i < this._eventRecords.length; i++) {
                var n = this._eventRecords[i];
                if (!(e && e !== n.target || t && t !== n.eventName || r && r !== n.callback || "boolean" == typeof o && o !== n.useCapture)) {
                    var a = n.target.__events__
                      , l = a[n.eventName]
                      , s = l ? l[this._id] : null;
                    if (s) {
                        if (1 !== s.length && r) {
                            l.count--;
                            s.splice(s.indexOf(n), 1)
                        } else {
                            l.count -= s.length;
                            delete a[n.eventName][this._id]
                        }
                        l.count || delete a[n.eventName]
                    }
                    n.elementCallback && (n.target.removeEventListener ? n.target.removeEventListener(n.eventName, n.elementCallback, n.useCapture) : n.target.detachEvent && n.target.detachEvent("on" + n.eventName, n.elementCallback));
                    this._eventRecords.splice(i--, 1)
                }
            }
        }
        ;
        g.prototype.raise = function(e, t, r) {
            return g.raise(this._parent, e, t, r)
        }
        ;
        g.prototype.declare = function(e) {
            var t = this._parent.__declaredEvents = this._parent.__declaredEvents || {};
            if ("string" == typeof e)
                t[e] = !0;
            else
                for (var r = 0; r < e.length; r++)
                    t[e[r]] = !0
        }
        ;
        g._uniqueId = 0;
        return g
    }();
    t.EventGroup = r
});
define("I", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "__currentId__"
      , o = "undefined" != typeof window && window || process;
    void 0 === o[r] && (o[r] = 0);
    function i(e, t) {
        for (var r in e)
            if (e.hasOwnProperty(r) && (!t.hasOwnProperty(r) || t[r] !== e[r]))
                return !1;
        return !0
    }
    t.shallowCompare = function(e, t) {
        return i(e, t) && i(t, e)
    }
    ;
    t.assign = function(e) {
        for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
        return n.apply(this, [null, e].concat(t))
    }
    ;
    function n(e, t) {
        for (var r = [], o = 2; o < arguments.length; o++)
            r[o - 2] = arguments[o];
        t = t || {};
        for (var i = 0, n = r; i < n.length; i++) {
            var a = n[i];
            if (a)
                for (var l in a)
                    !a.hasOwnProperty(l) || e && !e(l) || (t[l] = a[l])
        }
        return t
    }
    t.filteredAssign = n;
    t.getId = function(e) {
        return (e || "id__") + o[r]++
    }
    ;
    t.mapEnumByName = function(t, r) {
        return Object.keys(t).map(function(e) {
            if (String(Number(e)) !== e)
                return r(e, t[e])
        }).filter(function(e) {
            return !!e
        })
    }
    ;
    t.values = function(r) {
        return Object.keys(r).reduce(function(e, t) {
            e.push(r[t]);
            return e
        }, [])
    }
});
var __assign = this && this.__assign || Object.assign || function(e) {
    for (var t, r = 1, o = arguments.length; r < o; r++) {
        t = arguments[r];
        for (var i in t)
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
    }
    return e
}
;
define("d", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l, r = "undefined" == typeof window ? global : window, c = function() {
        var e = r.__themeState__ || {
            theme: void 0,
            lastStyleElement: void 0,
            registeredStyles: []
        };
        e.runState || (e = __assign({}, e, {
            perf: {
                count: 0,
                duration: 0
            },
            runState: {
                flushTimer: 0,
                mode: 0,
                buffer: []
            }
        }));
        e.registeredThemableStyles || (e = __assign({}, e, {
            registeredThemableStyles: []
        }));
        return r.__themeState__ = e
    }(), n = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g, u = 1e4, o = function() {
        return "undefined" != typeof performance && performance.now ? performance.now() : Date.now()
    };
    function i(e) {
        var t = o();
        e();
        var r = o();
        c.perf.duration += r - t
    }
    t.loadStyles = function(n, a) {
        void 0 === a && (a = !1);
        i(function() {
            var e = Array.isArray(n) ? n : h(n);
            void 0 === l && (l = function() {
                var e = !1;
                if ("undefined" != typeof document) {
                    var t = document.createElement("style");
                    t.type = "text/css";
                    e = !!t.styleSheet
                }
                return e
            }());
            var t = c.runState
              , r = t.mode
              , o = t.buffer
              , i = t.flushTimer;
            if (a || 1 === r) {
                o.push(e);
                i || (c.runState.flushTimer = setTimeout(function() {
                    c.runState.flushTimer = 0;
                    s()
                }, 0))
            } else
                d(e)
        })
    }
    ;
    t.configureLoadStyles = function(e) {
        c.loadStyles = e
    }
    ;
    t.configureRunMode = function(e) {
        c.runState.mode = e
    }
    ;
    function s() {
        i(function() {
            var e = c.runState.buffer.slice();
            c.runState.buffer = [];
            var t = [].concat.apply([], e);
            0 < t.length && d(t)
        })
    }
    t.flush = s;
    function d(e, t) {
        c.loadStyles ? c.loadStyles(p(e).styleString, e) : l ? function(e, t) {
            var r = document.getElementsByTagName("head")[0]
              , o = c.registeredStyles
              , i = c.lastStyleElement
              , n = i ? i.styleSheet : void 0
              , a = n ? n.cssText : ""
              , l = o[o.length - 1]
              , s = p(e).styleString;
            if (!i || a.length + s.length > u) {
                (i = document.createElement("style")).type = "text/css";
                if (t) {
                    r.replaceChild(i, t.styleElement);
                    t.styleElement = i
                } else
                    r.appendChild(i);
                if (!t) {
                    l = {
                        styleElement: i,
                        themableStyle: e
                    };
                    o.push(l)
                }
            }
            i.styleSheet.cssText += g(s);
            Array.prototype.push.apply(l.themableStyle, e);
            c.lastStyleElement = i
        }(e, t) : function(e) {
            var t = document.getElementsByTagName("head")[0]
              , r = document.createElement("style")
              , o = p(e)
              , i = o.styleString
              , n = o.themable;
            r.type = "text/css";
            r.appendChild(document.createTextNode(i));
            c.perf.count++;
            t.appendChild(r);
            var a = {
                styleElement: r,
                themableStyle: e
            };
            n ? c.registeredThemableStyles.push(a) : c.registeredStyles.push(a)
        }(e)
    }
    t.loadTheme = function(e) {
        c.theme = e;
        !function() {
            if (c.theme) {
                for (var e = [], t = 0, r = c.registeredThemableStyles; t < r.length; t++) {
                    var o = r[t];
                    e.push(o.themableStyle)
                }
                if (0 < e.length) {
                    a(1);
                    d([].concat.apply([], e))
                }
            }
        }()
    }
    ;
    function a(e) {
        void 0 === e && (e = 3);
        if (3 === e || 2 === e) {
            f(c.registeredStyles);
            c.registeredStyles = []
        }
        if (3 === e || 1 === e) {
            f(c.registeredThemableStyles);
            c.registeredThemableStyles = []
        }
    }
    t.clearStyles = a;
    function f(e) {
        e.forEach(function(e) {
            var t = e && e.styleElement;
            t && t.parentElement && t.parentElement.removeChild(t)
        })
    }
    function g(e) {
        e && (e = p(h(e)).styleString);
        return e
    }
    t.detokenize = g;
    function p(e) {
        var i = c.theme
          , n = !1;
        return {
            styleString: (e || []).map(function(e) {
                var t = e.theme;
                if (t) {
                    n = !0;
                    var r = i ? i[t] : void 0
                      , o = e.defaultValue || "inherit";
                    i && !r && console,
                    0;
                    return r || o
                }
                return e.rawString
            }).join(""),
            themable: n
        }
    }
    function h(e) {
        var t = [];
        if (e) {
            for (var r = 0, o = void 0; o = n.exec(e); ) {
                var i = o.index;
                r < i && t.push({
                    rawString: e.substring(r, i)
                });
                t.push({
                    theme: o[1],
                    defaultValue: o[2]
                });
                r = n.lastIndex
            }
            t.push({
                rawString: e.substring(r)
            })
        }
        return t
    }
    t.splitStyles = h
});
define("D", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.normalize = {
        boxShadow: "none",
        margin: 0,
        padding: 0,
        boxSizing: "border-box"
    };
    t.noWrap = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }
});
define("Y", ["require", "exports", "v", "B"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.FontClassNames = r.buildClassMap(o.DefaultFontStyles)
});
define("X", ["require", "exports", "h", "U", "B"], function(e, t, n, r, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.ColorClassNames = {};
    for (var o in r.DefaultPalette)
        if (r.DefaultPalette.hasOwnProperty(o)) {
            i(t.ColorClassNames, o, "", !1, "color");
            i(t.ColorClassNames, o, "Hover", !0, "color");
            i(t.ColorClassNames, o, "Background", !1, "background");
            i(t.ColorClassNames, o, "BackgroundHover", !0, "background");
            i(t.ColorClassNames, o, "Border", !1, "borderColor");
            i(t.ColorClassNames, o, "BorderHover", !0, "borderColor")
        }
    function i(e, r, t, o, i) {
        Object.defineProperty(e, r + t, {
            get: function() {
                var e, t = ((e = {})[i] = a.getTheme().palette[r],
                e);
                return n.mergeStyles(o ? {
                    selectors: {
                        ":hover": t
                    }
                } : t).toString()
            },
            enumerable: !0,
            configurable: !0
        })
    }
});
define("aq", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-0"',
                src: "url('" + e + "fabric-icons-0-29734c63.woff') format('woff')"
            },
            icons: {
                DecreaseIndentLegacy: "",
                IncreaseIndentLegacy: "",
                SizeLegacy: "",
                InternetSharing: "",
                Brightness: "",
                MapPin: "",
                Airplane: "",
                Tablet: "",
                QuickNote: "",
                Video: "",
                People: "",
                Phone: "",
                Pin: "",
                Shop: "",
                Stop: "",
                Link: "",
                AllApps: "",
                Zoom: "",
                ZoomOut: "",
                Microphone: "",
                Camera: "",
                Attach: "",
                Send: "",
                FavoriteList: "",
                PageSolid: "",
                Forward: "",
                Back: "",
                Refresh: "",
                Lock: "",
                ReportHacked: "",
                EMI: "",
                MiniLink: "",
                Blocked: "",
                ReadingMode: "",
                Favicon: "",
                Remove: "",
                Checkbox: "",
                CheckboxComposite: "",
                CheckboxIndeterminate: "",
                CheckboxCompositeReversed: "",
                BackToWindow: "",
                FullScreen: "",
                Print: "",
                Up: "",
                Down: "",
                OEM: "",
                Save: "",
                Cloud: "",
                CommandPrompt: "",
                Sad: "",
                SIPMove: "",
                EraseTool: "",
                GripperTool: "",
                Dialpad: "",
                PageLeft: "",
                PageRight: "",
                MultiSelect: "",
                KeyboardClassic: "",
                Play: "",
                Pause: "",
                Emoji2: "",
                GripperBarHorizontal: "",
                System: "",
                Personalize: "",
                SearchAndApps: "",
                Globe: "",
                ContactInfo: "",
                Unpin: "",
                Contact: "",
                Memo: "",
                Paste: "",
                WindowsLogo: "",
                Error: "",
                GripperBarVertical: "",
                Unlock: "",
                AutoEnhanceOn: "",
                AutoEnhanceOff: "",
                Color: "",
                SaveAs: "",
                Light: "",
                Filters: "",
                AspectRatio: "",
                Contrast: "",
                Redo: "",
                Crop: "",
                PhotoCollection: "",
                Album: "",
                Rotate: "",
                PanoIndicator: "",
                RedEye: "",
                ThumbnailView: "",
                Package: "",
                Warning: "",
                Financial: "",
                Education: "",
                ShoppingCart: "",
                Train: "",
                Move: "",
                TouchPointer: "",
                Merge: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ap", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-1"',
                src: "url('" + e + "fabric-icons-1-a653c37c.woff') format('woff')"
            },
            icons: {
                TurnRight: "",
                Ferry: "",
                Highlight: "",
                PowerButton: "",
                Tab: "",
                Admin: "",
                TVMonitor: "",
                Speakers: "",
                StackIndicator: "",
                Nav2DMapView: "",
                Car: "",
                Bus: "",
                EatDrink: "",
                LocationCircle: "",
                Home: "",
                SwitcherStartEnd: "",
                ParkingLocation: "",
                IncidentTriangle: "",
                Touch: "",
                MapDirections: "",
                CaretHollow: "",
                CaretSolid: "",
                History: "",
                Location: "",
                Work: "",
                Recent: "",
                Hotel: "",
                LocationDot: "",
                Dictionary: "",
                ChromeBack: "",
                FolderOpen: "",
                PinnedFill: "",
                RevToggleKey: "",
                Previous: "",
                Next: "",
                Sync: "",
                Help: "",
                Emoji: "",
                MailForward: "",
                ClosePane: "",
                OpenPane: "",
                PreviewLink: "",
                ZoomIn: "",
                Bookmarks: "",
                Document: "",
                ProtectedDocument: "",
                OpenInNewWindow: "",
                MailFill: "",
                ViewAll: "",
                Switch: "",
                Rename: "",
                Remote: "",
                SelectAll: "",
                Orientation: "",
                Import: "",
                Picture: "",
                ChromeClose: "",
                ShowResults: "",
                Message: "",
                CalendarDay: "",
                CalendarWeek: "",
                MailReplyAll: "",
                Read: "",
                Cut: "",
                PaymentCard: "",
                Copy: "",
                Important: "",
                MailReply: "",
                GotoToday: "",
                Font: "",
                FontColor: "",
                FolderFill: "",
                Permissions: "",
                DisableUpdates: "",
                Unfavorite: "",
                Italic: "",
                Underline: "",
                Bold: "",
                MoveToFolder: "",
                Dislike: "",
                Like: "",
                AlignCenter: "",
                OpenFile: "",
                FontDecrease: "",
                FontIncrease: "",
                FontSize: "",
                CellPhone: "",
                Calculator: "",
                Library: "",
                PostUpdate: "",
                NewFolder: "",
                CalendarReply: "",
                UnsyncFolder: "",
                SyncFolder: "",
                BlockContact: "",
                Accept: "",
                BulletedList: "",
                Preview: "",
                News: "",
                Chat: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ao", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-2"',
                src: "url('" + e + "fabric-icons-2-b9379dbc.woff') format('woff')"
            },
            icons: {
                Group: "",
                World: "",
                Comment: "",
                DockLeft: "",
                DockRight: "",
                Repair: "",
                Accounts: "",
                RadioBullet: "",
                Stopwatch: "",
                Clock: "",
                WorldClock: "",
                AlarmClock: "",
                Photo: "",
                Hospital: "",
                Timer: "",
                FullCircleMask: "",
                LocationFill: "",
                ChromeMinimize: "",
                Annotation: "",
                Fingerprint: "",
                Handwriting: "",
                Completed: "",
                Label: "",
                FlickDown: "",
                FlickUp: "",
                FlickLeft: "",
                FlickRight: "",
                MiniExpand: "",
                MiniContract: "",
                Streaming: "",
                MusicInCollection: "",
                OneDriveLogo: "",
                CompassNW: "",
                Code: "",
                LightningBolt: "",
                CalculatorMultiply: "",
                CalculatorAddition: "",
                CalculatorSubtract: "",
                CalculatorEqualTo: "",
                PrintfaxPrinterFile: "",
                Communications: "",
                Headset: "",
                Health: "",
                ChevronUpSmall: "",
                ChevronDownSmall: "",
                ChevronLeftSmall: "",
                ChevronRightSmall: "",
                ChevronUpMed: "",
                ChevronDownMed: "",
                ChevronLeftMed: "",
                ChevronRightMed: "",
                PC1: "",
                PresenceChickletVideo: "",
                Reply: "",
                HalfAlpha: "",
                ConstructionCone: "",
                DoubleChevronLeftMed: "",
                Volume0: "",
                Volume1: "",
                Volume2: "",
                Volume3: "",
                Chart: "",
                Robot: "",
                Manufacturing: "",
                LockSolid: "",
                BidiLtr: "",
                BidiRtl: "",
                RightDoubleQuote: "",
                Sunny: "",
                CloudWeather: "",
                Cloudy: "",
                PartlyCloudyDay: "",
                PartlyCloudyNight: "",
                ClearNight: "",
                RainShowersDay: "",
                Rain: "",
                Thunderstorms: "",
                RainSnow: "",
                Snow: "",
                BlowingSnow: "",
                Frigid: "",
                Fog: "",
                Squalls: "",
                Duststorm: "",
                Unknown: "",
                Precipitation: "",
                Ribbon: "",
                AreaChart: "",
                Assign: "",
                CheckList: "",
                Diagnostic: "",
                Generate: "",
                LineChart: "",
                Equalizer: "",
                BarChartHorizontal: "",
                BarChartVertical: "",
                Freezing: "",
                Processing: "",
                SnowShowerDay: "",
                HailDay: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("an", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-3"',
                src: "url('" + e + "fabric-icons-3-ef2110da.woff') format('woff')"
            },
            icons: {
                WorkFlow: "",
                HourGlass: "",
                StoreLogoMed20: "",
                TimeSheet: "",
                TriangleSolid: "",
                VideoSolid: "",
                RainShowersNight: "",
                SnowShowerNight: "",
                Teamwork: "",
                HailNight: "",
                PeopleAdd: "",
                Glasses: "",
                DateTime2: "",
                Shield: "",
                Header1: "",
                PageAdd: "",
                NumberedList: "",
                PowerBILogo: "",
                Info2: "",
                MusicInCollectionFill: "",
                Asterisk: "",
                ErrorBadge: "",
                CircleFill: "",
                Record2: "",
                AllAppsMirrored: "",
                BookmarksMirrored: "",
                BulletedListMirrored: "",
                CaretHollowMirrored: "",
                CaretSolidMirrored: "",
                ChromeBackMirrored: "",
                ClosePaneMirrored: "",
                DockLeftMirrored: "",
                DoubleChevronLeftMedMirrored: "",
                HelpMirrored: "",
                ImportMirrored: "",
                ListMirrored: "",
                MailForwardMirrored: "",
                MailReplyMirrored: "",
                MailReplyAllMirrored: "",
                OpenPaneMirrored: "",
                ParkingLocationMirrored: "",
                SendMirrored: "",
                ShowResultsMirrored: "",
                ThumbnailViewMirrored: "",
                Devices3: "",
                Lightbulb: "",
                StatusTriangle: "",
                VolumeDisabled: "",
                Puzzle: "",
                EmojiNeutral: "",
                EmojiDisappointed: "",
                HomeSolid: "",
                Ringer: "",
                PDF: "",
                HeartBroken: "",
                StoreLogo16: "",
                MultiSelectMirrored: "",
                Broom: "",
                Cocktails: "",
                Wines: "",
                Articles: "",
                Cycling: "",
                DietPlanNotebook: "",
                Pill: "",
                ExerciseTracker: "",
                HandsFree: "",
                Medical: "",
                Running: "",
                Weights: "",
                Trackers: "",
                AddNotes: "",
                AllCurrency: "",
                BarChart4: "",
                CirclePlus: "",
                Coffee: "",
                Cotton: "",
                Market: "",
                Money: "",
                PieDouble: "",
                PieSingle: "",
                RemoveFilter: "",
                Savings: "",
                Sell: "",
                StockDown: "",
                StockUp: "",
                Lamp: "",
                Source: "",
                MSNVideos: "",
                Cricket: "",
                Golf: "",
                Baseball: "",
                Soccer: "",
                MoreSports: "",
                AutoRacing: "",
                CollegeHoops: "",
                CollegeFootball: "",
                ProFootball: "",
                ProHockey: "",
                Rugby: "",
                SubstitutionsIn: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("am", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-4"',
                src: "url('" + e + "fabric-icons-4-aeecd474.woff') format('woff')"
            },
            icons: {
                Tennis: "",
                Arrivals: "",
                Design: "",
                Website: "",
                Drop: "",
                SkiResorts: "",
                Snowflake: "",
                BusSolid: "",
                FerrySolid: "",
                AirplaneSolid: "",
                TrainSolid: "",
                Ticket: "",
                Devices4: "",
                AzureLogo: "",
                BingLogo: "",
                MSNLogo: "",
                OutlookLogoInverse: "",
                OfficeLogo: "",
                SkypeLogo: "",
                Door: "",
                EditMirrored: "",
                GiftCard: "",
                DoubleBookmark: "",
                StatusErrorFull: "",
                Certificate: "",
                FastForward: "",
                Rewind: "",
                Photo2: "",
                OpenSource: "",
                Movers: "",
                CloudDownload: "",
                Family: "",
                WindDirection: "",
                Bug: "",
                SiteScan: "",
                BrowserScreenShot: "",
                F12DevTools: "",
                CSS: "",
                JS: "",
                DeliveryTruck: "",
                ReminderPerson: "",
                ReminderGroup: "",
                TabletMode: "",
                Umbrella: "",
                NetworkTower: "",
                CityNext: "",
                Section: "",
                OneNoteLogoInverse: "",
                ToggleFilled: "",
                ToggleBorder: "",
                SliderThumb: "",
                ToggleThumb: "",
                Documentation: "",
                Badge: "",
                Giftbox: "",
                VisualStudioLogo: "",
                ExcelLogoInverse: "",
                WordLogoInverse: "",
                PowerPointLogoInverse: "",
                Cafe: "",
                SpeedHigh: "",
                Commitments: "",
                ThisPC: "",
                MusicNote: "",
                MicOff: "",
                EdgeLogo: "",
                CompletedSolid: "",
                AlbumRemove: "",
                MessageFill: "",
                TabletSelected: "",
                MobileSelected: "",
                LaptopSelected: "",
                TVMonitorSelected: "",
                DeveloperTools: "",
                InsertTextBox: "",
                LowerBrightness: "",
                DOM: "",
                CloudUpload: "",
                ScrollUpDown: "",
                DateTime: "",
                Event: "",
                Cake: "",
                Org: "",
                PartyLeader: "",
                DRM: "",
                CloudAdd: "",
                AppIconDefault: "",
                Photo2Add: "",
                Photo2Remove: "",
                POI: "",
                AddTo: "",
                RadioBtnOff: "",
                RadioBtnOn: "",
                ExploreContent: "",
                Product: "",
                ProgressLoopInner: "",
                ProgressLoopOuter: "",
                Blocked2: "",
                FangBody: "",
                ChatInviteFriend: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("al", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-5"',
                src: "url('" + e + "fabric-icons-5-f6547654.woff') format('woff')"
            },
            icons: {
                Crown: "",
                Diamond: "",
                ScaleUp: "",
                Feedback: "",
                SharepointLogoInverse: "",
                YammerLogo: "",
                Hide: "",
                Uneditable: "",
                ReturnToSession: "",
                OpenFolderHorizontal: "",
                CalendarMirrored: "",
                SwayLogoInverse: "",
                OutOfOffice: "",
                Trophy: "",
                ReopenPages: "",
                EmojiTabSymbols: "",
                AADLogo: "",
                AccessLogo: "",
                AdminALogoInverse32: "",
                AdminCLogoInverse32: "",
                AdminDLogoInverse32: "",
                AdminELogoInverse32: "",
                AdminLLogoInverse32: "",
                AdminMLogoInverse32: "",
                AdminOLogoInverse32: "",
                AdminPLogoInverse32: "",
                AdminSLogoInverse32: "",
                AdminYLogoInverse32: "",
                DelveLogoInverse: "",
                ExchangeLogoInverse: "",
                LyncLogo: "",
                OfficeVideoLogoInverse: "",
                SocialListeningLogo: "",
                VisioLogoInverse: "",
                Balloons: "",
                Cat: "",
                MailAlert: "",
                MailCheck: "",
                MailLowImportance: "",
                MailPause: "",
                MailRepeat: "",
                SecurityGroup: "",
                Table: "",
                VoicemailForward: "",
                VoicemailReply: "",
                Waffle: "",
                RemoveEvent: "",
                EventInfo: "",
                ForwardEvent: "",
                WipePhone: "",
                AddOnlineMeeting: "",
                JoinOnlineMeeting: "",
                RemoveLink: "",
                PeopleBlock: "",
                PeopleRepeat: "",
                PeopleAlert: "",
                PeoplePause: "",
                TransferCall: "",
                AddPhone: "",
                UnknownCall: "",
                NoteReply: "",
                NoteForward: "",
                NotePinned: "",
                RemoveOccurrence: "",
                Timeline: "",
                EditNote: "",
                CircleHalfFull: "",
                Room: "",
                Unsubscribe: "",
                Subscribe: "",
                HardDrive: "",
                RecurringTask: "",
                TaskManager: "",
                TaskManagerMirrored: "",
                Combine: "",
                Split: "",
                DoubleChevronUp: "",
                DoubleChevronLeft: "",
                DoubleChevronRight: "",
                TextBox: "",
                TextField: "",
                NumberField: "",
                Dropdown: "",
                BookingsLogo: "",
                ClassNotebookLogoInverse: "",
                DelveAnalyticsLogo: "",
                DocsLogoInverse: "",
                Dynamics365Logo: "",
                DynamicSMBLogo: "",
                OfficeAssistantLogo: "",
                OfficeStoreLogo: "",
                OneNoteEduLogoInverse: "",
                PlannerLogo: "",
                PowerApps: "",
                Suitcase: "",
                ProjectLogoInverse: "",
                CaretLeft8: "",
                CaretRight8: "",
                CaretUp8: "",
                CaretDown8: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ak", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-6"',
                src: "url('" + e + "fabric-icons-6-3954c770.woff') format('woff')"
            },
            icons: {
                CaretLeftSolid8: "",
                CaretRightSolid8: "",
                CaretUpSolid8: "",
                CaretDownSolid8: "",
                ClearFormatting: "",
                Superscript: "",
                Subscript: "",
                Strikethrough: "",
                Export: "",
                ExportMirrored: "",
                SingleBookmark: "",
                SingleBookmarkSolid: "",
                DoubleChevronDown: "",
                FollowUser: "",
                ReplyAll: "",
                WorkforceManagement: "",
                RecruitmentManagement: "",
                Questionnaire: "",
                ManagerSelfService: "",
                ReplyMirrored: "",
                ReplyAllMirrored: "",
                Medal: "",
                AddGroup: "",
                QuestionnaireMirrored: "",
                TemporaryUser: "",
                CaretSolid16: "",
                GroupedDescending: "",
                GroupedAscending: "",
                AwayStatus: "",
                MyMoviesTV: "",
                GenericScan: "",
                AustralianRules: "",
                WifiEthernet: "",
                TrackersMirrored: "",
                DateTimeMirrored: "",
                StopSolid: "",
                DoubleChevronUp12: "",
                DoubleChevronDown12: "",
                DoubleChevronLeft12: "",
                DoubleChevronRight12: "",
                CalendarAgenda: "",
                AddEvent: "",
                AssetLibrary: "",
                DataConnectionLibrary: "",
                DocLibrary: "",
                FormLibrary: "",
                FormLibraryMirrored: "",
                ReportLibrary: "",
                ReportLibraryMirrored: "",
                ContactCard: "",
                CustomList: "",
                CustomListMirrored: "",
                IssueTracking: "",
                IssueTrackingMirrored: "",
                PictureLibrary: "",
                OfficeAddinsLogo: "",
                OfflineOneDriveParachute: "",
                OfflineOneDriveParachuteDisabled: "",
                TriangleSolidUp12: "",
                TriangleSolidDown12: "",
                TriangleSolidLeft12: "",
                TriangleSolidRight12: "",
                TriangleUp12: "",
                TriangleDown12: "",
                TriangleLeft12: "",
                TriangleRight12: "",
                ArrowUpRight8: "",
                ArrowDownRight8: "",
                DocumentSet: "",
                DelveAnalytics: "",
                ArrowUpRightMirrored8: "",
                ArrowDownRightMirrored8: "",
                CompanyDirectory: "",
                CompanyDirectoryMirrored: "",
                OneDriveAdd: "",
                ProfileSearch: "",
                Header2: "",
                Header3: "",
                Header4: "",
                Eyedropper: "",
                MarketDown: "",
                CalendarWorkWeek: "",
                SidePanel: "",
                GlobeFavorite: "",
                CaretTopLeftSolid8: "",
                CaretTopRightSolid8: "",
                ViewAll2: "",
                DocumentReply: "",
                PlayerSettings: "",
                ReceiptForward: "",
                ReceiptReply: "",
                ReceiptCheck: "",
                Fax: "",
                RecurringEvent: "",
                ReplyAlt: "",
                ReplyAllAlt: "",
                EditStyle: "",
                EditMail: "",
                Lifesaver: "",
                LifesaverLock: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("aj", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-7"',
                src: "url('" + e + "fabric-icons-7-02107cf8.woff') format('woff')"
            },
            icons: {
                InboxCheck: "",
                FolderSearch: "",
                CollapseMenu: "",
                ExpandMenu: "",
                Boards: "",
                SunAdd: "",
                SunQuestionMark: "",
                LandscapeOrientation: "",
                DocumentSearch: "",
                PublicCalendar: "",
                PublicContactCard: "",
                PublicEmail: "",
                PublicFolder: "",
                WordDocument: "",
                PowerPointDocument: "",
                ExcelDocument: "",
                GroupedList: "",
                ClassroomLogo: "",
                Sections: "",
                EditPhoto: "",
                Starburst: "",
                ShareiOS: "",
                AirTickets: "",
                PencilReply: "",
                Tiles2: "",
                SkypeCircleCheck: "",
                SkypeCircleClock: "",
                SkypeCircleMinus: "",
                SkypeMessage: "",
                ClosedCaption: "",
                ATPLogo: "",
                OfficeFormsLogoInverse: "",
                RecycleBin: "",
                EmptyRecycleBin: "",
                Hide2: "",
                Breadcrumb: "",
                BirthdayCake: "",
                TimeEntry: "",
                PageEdit: "",
                PageRemove: "",
                Database: "",
                EditContact: "",
                ConnectContacts: "",
                ActivateOrders: "",
                DeactivateOrders: "",
                DocumentManagement: "",
                CRMReport: "",
                ZipFolder: "",
                SurveyQuestions: "",
                TextDocument: "",
                TextDocumentShared: "",
                PageCheckedOut: "",
                SaveAndClose: "",
                Script: "",
                Archive: "",
                ActivityFeed: "",
                EventDate: "",
                ArrowUpRight: "",
                CaretRight: "",
                SetAction: "",
                CaretSolidLeft: "",
                CaretSolidDown: "",
                CaretSolidRight: "",
                CaretSolidUp: "",
                PowerAppsLogo: "",
                PowerApps2Logo: "",
                SearchIssue: "",
                SearchIssueMirrored: "",
                FabricAssetLibrary: "",
                FabricDataConnectionLibrary: "",
                FabricDocLibrary: "",
                FabricFormLibrary: "",
                FabricFormLibraryMirrored: "",
                FabricReportLibrary: "",
                FabricReportLibraryMirrored: "",
                FabricPublicFolder: "",
                FabricFolderSearch: "",
                FabricMovetoFolder: "",
                FabricUnsyncFolder: "",
                FabricSyncFolder: "",
                FabricOpenFolderHorizontal: "",
                FabricFolder: "",
                FabricFolderFill: "",
                FabricNewFolder: "",
                FabricPictureLibrary: "",
                AddFavorite: "",
                AddFavoriteFill: "",
                BufferTimeBefore: "",
                BufferTimeAfter: "",
                BufferTimeBoth: "",
                CannedChat: "",
                SkypeForBusinessLogo: "",
                PageCheckedin: "",
                ReadOutLoud: "",
                CaretBottomLeftSolid8: "",
                CaretBottomRightSolid8: "",
                FolderHorizontal: "",
                MicrosoftStaffhubLogo: "",
                GiftboxOpen: "",
                StatusCircleOuter: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ai", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-8"',
                src: "url('" + e + "fabric-icons-8-645fa64e.woff') format('woff')"
            },
            icons: {
                StatusCircleInner: "",
                StatusCircleRing: "",
                StatusTriangleOuter: "",
                StatusTriangleInner: "",
                StatusTriangleExclamation: "",
                StatusCircleExclamation: "",
                StatusCircleErrorX: "",
                StatusCircleInfo: "",
                StatusCircleBlock2: "",
                StatusCircleQuestionMark: "",
                Toll: "",
                ExploreContentSingle: "",
                CollapseContent: "",
                CollapseContentSingle: "",
                InfoSolid: "",
                ProgressRingDots: "",
                CaloriesAdd: "",
                BranchFork: "",
                MobileReport: "",
                HardDriveGroup: "",
                FastMode: "",
                ToggleOn: "",
                ToggleOff: "",
                Trophy2: "",
                BucketColor: "",
                BucketColorFill: "",
                Taskboard: "",
                SingleColumn: "",
                DoubleColumn: "",
                TripleColumn: "",
                ColumnLeftTwoThirds: "",
                ColumnRightTwoThirds: "",
                AccessLogoFill: "",
                AnalyticsLogo: "",
                AnalyticsQuery: "",
                NewAnalyticsQuery: "",
                AnalyticsReport: "",
                WordLogo: "",
                WordLogoFill: "",
                ExcelLogo: "",
                ExcelLogoFill: "",
                OneNoteLogo: "",
                OneNoteLogoFill: "",
                OutlookLogo: "",
                OutlookLogoFill: "",
                PowerPointLogo: "",
                PowerPointLogoFill: "",
                PublisherLogo: "",
                PublisherLogoFill: "",
                ScheduleEventAction: "",
                FlameSolid: "",
                ServerProcesses: "",
                Server: "",
                SaveAll: "",
                LinkedInLogo: "",
                Decimals: "",
                SidePanelMirrored: "",
                ProtectRestrict: "",
                UnknownMirrored: "",
                PublicContactCardMirrored: "",
                GridViewSmall: "",
                GridViewMedium: "",
                GridViewLarge: "",
                Step: "",
                StepInsert: "",
                StepShared: "",
                StepSharedAdd: "",
                StepSharedInsert: "",
                ViewDashboard: "",
                ViewList: "",
                ViewListGroup: "",
                ViewListTree: "",
                TriggerAuto: "",
                TriggerUser: "",
                PivotChart: "",
                StackedBarChart: "",
                StackedLineChart: "",
                BuildQueue: "",
                BuildQueueNew: "",
                UserFollowed: "",
                ContactLink: "",
                Stack: "",
                Bullseye: "",
                VennDiagram: "",
                FiveTileGrid: "",
                FocalPoint: "",
                RingerRemove: "",
                TeamsLogoInverse: "",
                TeamsLogo: "",
                TeamsLogoFill: "",
                SkypeForBusinessLogoFill: "",
                SharepointLogo: "",
                SharepointLogoFill: "",
                DelveLogo: "",
                DelveLogoFill: "",
                OfficeVideoLogo: "",
                OfficeVideoLogoFill: "",
                ExchangeLogo: "",
                ExchangeLogoFill: "",
                DocumentApproval: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ah", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-9"',
                src: "url('" + e + "fabric-icons-9-53746c82.woff') format('woff')"
            },
            icons: {
                CloneToDesktop: "",
                InstallToDrive: "",
                Blur: "",
                Build: "",
                ProcessMetaTask: "",
                BranchFork2: "",
                BranchLocked: "",
                BranchCommit: "",
                BranchCompare: "",
                BranchMerge: "",
                BranchPullRequest: "",
                BranchSearch: "",
                BranchShelveset: "",
                RawSource: "",
                MergeDuplicate: "",
                RowsGroup: "",
                RowsChild: "",
                Deploy: "",
                Redeploy: "",
                ServerEnviroment: "",
                VisioDiagram: "",
                HighlightMappedShapes: "",
                TextCallout: "",
                IconSetsFlag: "",
                VisioLogo: "",
                VisioLogoFill: "",
                VisioDocument: "",
                TimelineProgress: "",
                TimelineDelivery: "",
                Backlog: "",
                TeamFavorite: "",
                TaskGroup: "",
                TaskGroupMirrored: "",
                ScopeTemplate: "",
                AssessmentGroupTemplate: "",
                NewTeamProject: "",
                CommentAdd: "",
                CommentNext: "",
                CommentPrevious: "",
                ShopServer: "",
                LocaleLanguage: "",
                QueryList: "",
                UserSync: "",
                UserPause: "",
                StreamingOff: "",
                ArrowTallUpLeft: "",
                ArrowTallUpRight: "",
                ArrowTallDownLeft: "",
                ArrowTallDownRight: "",
                FieldEmpty: "",
                FieldFilled: "",
                FieldChanged: "",
                FieldNotChanged: "",
                RingerOff: "",
                PlayResume: "",
                BulletedList2: "",
                BulletedList2Mirrored: "",
                ImageCrosshair: "",
                GitGraph: "",
                Repo: "",
                RepoSolid: "",
                FolderQuery: "",
                FolderList: "",
                FolderListMirrored: "",
                LocationOutline: "",
                POISolid: "",
                CalculatorNotEqualTo: "",
                BoxSubtractSolid: "",
                BoxAdditionSolid: "",
                BoxMultiplySolid: "",
                BoxPlaySolid: "",
                BoxCheckmarkSolid: "",
                CirclePauseSolid: "",
                CirclePause: "",
                MSNVideosSolid: "",
                CircleStopSolid: "",
                CircleStop: "",
                NavigateBack: "",
                NavigateBackMirrored: "",
                NavigateForward: "",
                NavigateForwardMirrored: "",
                UnknownSolid: "",
                UnknownMirroredSolid: "",
                CircleAddition: "",
                CircleAdditionSolid: "",
                FilePDB: "",
                FileTemplate: "",
                FileSQL: "",
                FileJAVA: "",
                FileASPX: "",
                FileCSS: "",
                FileSass: "",
                FileLess: "",
                FileHTML: "",
                JavaScriptLanguage: "",
                CSharpLanguage: "",
                CSharp: "",
                VisualBasicLanguage: "",
                VB: "",
                CPlusPlusLanguage: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ag", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-10"',
                src: "url('" + e + "fabric-icons-10-fb519450.woff') format('woff')"
            },
            icons: {
                CPlusPlus: "",
                FSharpLanguage: "",
                FSharp: "",
                TypeScriptLanguage: "",
                PythonLanguage: "",
                PY: "",
                CoffeeScript: "",
                MarkDownLanguage: "",
                FullWidth: "",
                FullWidthEdit: "",
                Plug: "",
                PlugSolid: "",
                PlugConnected: "",
                PlugDisconnected: "",
                UnlockSolid: "",
                Variable: "",
                Parameter: "",
                CommentUrgent: "",
                Storyboard: "",
                DiffInline: "",
                DiffSideBySide: "",
                ImageDiff: "",
                ImagePixel: "",
                FileBug: "",
                FileCode: "",
                FileComment: "",
                BusinessHoursSign: "",
                FileImage: "",
                FileSymlink: "",
                AutoFillTemplate: "",
                WorkItem: "",
                WorkItemBug: "",
                LogRemove: "",
                ColumnOptions: "",
                Packages: "",
                BuildIssue: "",
                AssessmentGroup: "",
                VariableGroup: "",
                FullHistory: "",
                SingleColumnEdit: "",
                DoubleColumnEdit: "",
                TripleColumnEdit: "",
                ColumnLeftTwoThirdsEdit: "",
                ColumnRightTwoThirdsEdit: "",
                StreamLogo: "",
                PassiveAuthentication: "",
                AlertSolid: "",
                MegaphoneSolid: "",
                TaskSolid: "",
                ConfigurationSolid: "",
                BugSolid: "",
                CrownSolid: "",
                Trophy2Solid: "",
                QuickNoteSolid: "",
                ConstructionConeSolid: "",
                PageListSolid: "",
                PageListMirroredSolid: "",
                StarburstSolid: "",
                ReadingModeSolid: "",
                SadSolid: "",
                HealthSolid: "",
                ShieldSolid: "",
                GiftBoxSolid: "",
                ShoppingCartSolid: "",
                MailSolid: "",
                ChatSolid: "",
                RibbonSolid: "",
                FinancialSolid: "",
                FinancialMirroredSolid: "",
                HeadsetSolid: "",
                PermissionsSolid: "",
                ParkingSolid: "",
                ParkingMirroredSolid: "",
                DiamondSolid: "",
                AsteriskSolid: "",
                OfflineStorageSolid: "",
                BankSolid: "",
                DecisionSolid: "",
                Parachute: "",
                ParachuteSolid: "",
                FiltersSolid: "",
                ColorSolid: "",
                ReviewSolid: "",
                ReviewRequestSolid: "",
                ReviewRequestMirroredSolid: "",
                ReviewResponseSolid: "",
                FeedbackRequestSolid: "",
                FeedbackRequestMirroredSolid: "",
                FeedbackResponseSolid: "",
                WorkItemBar: "",
                WorkItemBarSolid: "",
                Separator: "",
                NavigateExternalInline: "",
                PlanView: "",
                TimelineMatrixView: "",
                EngineeringGroup: "",
                ProjectCollection: "",
                CaretBottomRightCenter8: "",
                CaretBottomLeftCenter8: "",
                CaretTopRightCenter8: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("af", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-11"',
                src: "url('" + e + "fabric-icons-11-a4026982.woff') format('woff')"
            },
            icons: {
                CaretTopLeftCenter8: "",
                DonutChart: "",
                ChevronUnfold10: "",
                ChevronFold10: "",
                DoubleChevronDown8: "",
                DoubleChevronUp8: "",
                DoubleChevronLeft8: "",
                DoubleChevronRight8: "",
                ChevronDownEnd6: "",
                ChevronUpEnd6: "",
                ChevronLeftEnd6: "",
                ChevronRightEnd6: "",
                ContextMenu: "",
                AzureAPIManagement: "",
                AzureServiceEndpoint: "",
                VSTSLogo: "",
                VSTSAltLogo1: "",
                VSTSAltLogo2: "",
                FileTypeSolution: "",
                WordLogoInverse16: "",
                WordLogo16: "",
                WordLogoFill16: "",
                PowerPointLogoInverse16: "",
                PowerPointLogo16: "",
                PowerPointLogoFill16: "",
                ExcelLogoInverse16: "",
                ExcelLogo16: "",
                ExcelLogoFill16: "",
                OneNoteLogoInverse16: "",
                OneNoteLogo16: "",
                OneNoteLogoFill16: "",
                OutlookLogoInverse16: "",
                OutlookLogo16: "",
                OutlookLogoFill16: "",
                PublisherLogoInverse16: "",
                PublisherLogo16: "",
                PublisherLogoFill16: "",
                VisioLogoInverse16: "",
                VisioLogo16: "",
                VisioLogoFill16: "",
                TestBeaker: "",
                TestBeakerSolid: "",
                TestExploreSolid: "",
                TestAutoSolid: "",
                TestUserSolid: "",
                TestImpactSolid: "",
                TestPlan: "",
                TestStep: "",
                TestParameter: "",
                TestSuite: "",
                TestCase: "",
                Sprint: "",
                SignOut: "",
                TriggerApproval: "",
                Rocket: "",
                AzureKeyVault: "",
                Transition: "",
                LikeSolid: "",
                DislikeSolid: "",
                UnSetColor: "",
                DeclineCall: "",
                RectangularClipping: "",
                TeamsLogo16: "",
                TeamsLogoFill16: "",
                Spacer: "",
                SkypeLogo16: "",
                SkypeForBusinessLogo16: "",
                SkypeForBusinessLogoFill16: "",
                FilterSolid: "",
                MailUndelivered: "",
                MailTentative: "",
                MailTentativeMirrored: "",
                MailReminder: "",
                ReceiptUndelivered: "",
                ReceiptTentative: "",
                ReceiptTentativeMirrored: "",
                Inbox: "",
                IRMReply: "",
                IRMReplyMirrored: "",
                IRMForward: "",
                IRMForwardMirrored: "",
                VoicemailIRM: "",
                EventAccepted: "",
                EventTentative: "",
                EventTentativeMirrored: "",
                EventDeclined: "",
                IDBadge: "",
                BackgroundColor: "",
                OfficeFormsLogoInverse16: "",
                OfficeFormsLogo: "",
                OfficeFormsLogoFill: "",
                OfficeFormsLogo16: "",
                OfficeFormsLogoFill16: "",
                OfficeFormsLogoInverse24: "",
                OfficeFormsLogo24: "",
                OfficeFormsLogoFill24: "",
                PageLock: "",
                NotExecuted: "",
                NotImpactedSolid: "",
                FieldReadOnly: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ae", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-12"',
                src: "url('" + e + "fabric-icons-12-e6882c74.woff') format('woff')"
            },
            icons: {
                FieldRequired: "",
                BacklogBoard: "",
                ExternalBuild: "",
                ExternalTFVC: "",
                ExternalXAML: "",
                IssueSolid: "",
                DefectSolid: "",
                LadybugSolid: "",
                NugetLogo: "",
                TFVCLogo: "",
                ProjectLogo32: "",
                ProjectLogoFill32: "",
                ProjectLogo16: "",
                ProjectLogoFill16: "",
                SwayLogo32: "",
                SwayLogoFill32: "",
                SwayLogo16: "",
                SwayLogoFill16: "",
                ClassNotebookLogo32: "",
                ClassNotebookLogoFill32: "",
                ClassNotebookLogo16: "",
                ClassNotebookLogoFill16: "",
                ClassNotebookLogoInverse32: "",
                ClassNotebookLogoInverse16: "",
                StaffNotebookLogo32: "",
                StaffNotebookLogoFill32: "",
                StaffNotebookLogo16: "",
                StaffNotebookLogoFill16: "",
                StaffNotebookLogoInverted32: "",
                StaffNotebookLogoInverted16: "",
                KaizalaLogo: "",
                TaskLogo: "",
                ProtectionCenterLogo32: "",
                GallatinLogo: "",
                Globe2: "",
                Guitar: "",
                Breakfast: "",
                Brunch: "",
                BeerMug: "",
                Vacation: "",
                Teeth: "",
                Taxi: "",
                Chopsticks: "",
                SyncOccurence: "",
                UnsyncOccurence: "",
                PrimaryCalendar: "",
                SearchCalendar: "",
                VideoOff: "",
                MicrosoftFlowLogo: "",
                BusinessCenterLogo: "",
                ToDoLogoBottom: "",
                ToDoLogoTop: "",
                EditSolid12: "",
                EditSolidMirrored12: "",
                UneditableSolid12: "",
                UneditableSolidMirrored12: "",
                UneditableMirrored: "",
                AdminALogo32: "",
                AdminALogoFill32: "",
                ToDoLogoInverse: "",
                Snooze: "",
                WaffleOffice365: "",
                ImageSearch: "",
                NewsSearch: "",
                VideoSearch: "",
                R: "",
                FontColorA: "",
                FontColorSwatch: "",
                LightWeight: "",
                NormalWeight: "",
                SemiboldWeight: "",
                GroupObject: "",
                UngroupObject: "",
                AlignHorizontalLeft: "",
                AlignHorizontalCenter: "",
                AlignHorizontalRight: "",
                AlignVerticalTop: "",
                AlignVerticalCenter: "",
                AlignVerticalBottom: "",
                HorizontalDistributeCenter: "",
                VerticalDistributeCenter: "",
                Ellipse: "",
                Line: "",
                Octagon: "",
                Hexagon: "",
                Pentagon: "",
                RightTriangle: "",
                HalfCircle: "",
                QuarterCircle: "",
                ThreeQuarterCircle: "",
                "6PointStar": "",
                "12PointStar": "",
                ArrangeBringToFront: "",
                ArrangeSendToBack: "",
                ArrangeSendBackward: "",
                ArrangeBringForward: "",
                BorderDash: "",
                BorderDot: "",
                LineStyle: "",
                LineThickness: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ad", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-13"',
                src: "url('" + e + "fabric-icons-13-0980cd6d.woff') format('woff')"
            },
            icons: {
                WindowEdit: "",
                HintText: "",
                MediaAdd: "",
                AnchorLock: "",
                AutoHeight: "",
                ChartSeries: "",
                ChartXAngle: "",
                ChartYAngle: "",
                Combobox: "",
                LineSpacing: "",
                Padding: "",
                PaddingTop: "",
                PaddingBottom: "",
                PaddingLeft: "",
                PaddingRight: "",
                NavigationFlipper: "",
                AlignJustify: "",
                TextOverflow: "",
                VisualsFolder: "",
                VisualsStore: "",
                PictureCenter: "",
                PictureFill: "",
                PicturePosition: "",
                PictureStretch: "",
                PictureTile: "",
                Slider: "",
                SliderHandleSize: "",
                DefaultRatio: "",
                NumberSequence: "",
                GUID: "",
                ReportAdd: "",
                DashboardAdd: "",
                MapPinSolid: "",
                WebPublish: "",
                PieSingleSolid: "",
                BlockedSolid: "",
                DrillDown: "",
                DrillDownSolid: "",
                DrillExpand: "",
                DrillShow: "",
                OneDriveFolder16: "",
                FunctionalManagerDashboard: "",
                BIDashboard: "",
                CodeEdit: "",
                RenewalCurrent: "",
                RenewalFuture: "",
                SplitObject: "",
                BulkUpload: "",
                DownloadDocument: "",
                WaitlistConfirm: "",
                WaitlistConfirmMirrored: "",
                LaptopSecure: "",
                DragObject: "",
                EntryView: "",
                EntryDecline: "",
                ContactCardSettings: "",
                ContactCardSettingsMirrored: "",
                CalendarSettings: "",
                CalendarSettingsMirrored: "",
                HardDriveLock: "",
                HardDriveUnlock: "",
                AccountManagement: "",
                TransitionPop: "",
                TransitionPush: "",
                TransitionEffect: "",
                LookupEntities: "",
                ExploreData: "",
                AddBookmark: "",
                SearchBookmark: "",
                DrillThrough: "",
                MasterDatabase: "",
                CertifiedDatabase: "",
                MaximumValue: "",
                MinimumValue: "",
                VisualStudioIDELogo32: "",
                PasteAsText: "",
                PasteAsCode: "",
                BrowserTab: "",
                BrowserTabScreenshot: "",
                DesktopScreenshot: "",
                FileYML: "",
                ClipboardSolid: "",
                AnalyticsView: "",
                Leave: "",
                Trending12: "",
                Blocked12: "",
                Warning12: "",
                CheckedOutByOther12: "",
                CheckedOutByYou12: "",
                CircleShapeSolid: "",
                SquareShapeSolid: "",
                TriangleShapeSolid: "",
                DropShapeSolid: "",
                RectangleShapeSolid: "",
                InsertColumnsLeft: "",
                InsertColumnsRight: "",
                InsertRowsAbove: "",
                InsertRowsBelow: "",
                DeleteColumns: "",
                DeleteRows: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ac", ["require", "exports", "f"], function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e, t) {
        void 0 === e && (e = "");
        var r = {
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-14"',
                src: "url('" + e + "fabric-icons-14-eb4d1150.woff') format('woff')"
            },
            icons: {
                DeleteRowsMirrored: "",
                DeleteTable: "",
                VersionControlPush: "",
                WhiteBoardApp16: "",
                WhiteBoardApp32: "",
                InsertSignatureLine: "",
                ArrangeByFrom: "",
                Phishing: "",
                CreateMailRule: "",
                PublishCourse: "",
                DictionaryRemove: "",
                UserRemove: "",
                UserEvent: "",
                Encryption: "",
                D365TalentLearn: "",
                D365TalentInsight: "",
                D365TalentHRCore: "",
                BacklogList: "",
                ButtonControl: "",
                TableGroup: "",
                MountainClimbing: "",
                TagUnknown: "",
                TagUnknownMirror: "",
                TagUnknown12: "",
                TagUnknown12Mirror: "",
                Link12: "",
                Presentation: "",
                Presentation12: "",
                Lock12: "",
                BuildDefinition: "",
                ReleaseDefinition: "",
                SaveTemplate: "",
                UserGauge: "",
                BlockedSiteSolid12: "",
                TagSolid: "",
                OfficeChat: "",
                OfficeChatSolid: "",
                MailSchedule: ""
            }
        };
        o.registerIcons(r, t)
    }
});
define("ab", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.registerIconAlias("trash", "delete");
    r.registerIconAlias("onedrive", "onedrivelogo")
});
define("e", ["require", "exports", "av", "f"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.__exportStar(o, t)
});
define("c", ["require", "exports", "d", "aU"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.loadStyles([{
        rawString: ".sp-field-customFormatter{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.sp-field-customFormatBackground-margin{margin:-10px 0}.sp-field-severity--good{background-color:"
    }, {
        theme: "successBackground",
        defaultValue: "rgba(186,216,10,.2)"
    }, {
        rawString: "}.sp-field-severity--low{background-color:inherit}.sp-field-severity--warning{background-color:"
    }, {
        theme: "warningBackground",
        defaultValue: "rgba(255,185,0,.2)"
    }, {
        rawString: "}.sp-field-severity--severeWarning{background-color:"
    }, {
        theme: "errorBackground",
        defaultValue: "rgba(232,17,35,.2)"
    }, {
        rawString: "}.sp-field-severity--blocked{background-color:"
    }, {
        theme: "blockingBackground",
        defaultValue: "rgba(234,67,0,.2)"
    }, {
        rawString: "}.sp-field-dataBars{background-color:"
    }, {
        theme: "themeTertiary",
        defaultValue: "#71afe5"
    }, {
        rawString: ";border-top:2px solid "
    }, {
        theme: "themePrimary",
        defaultValue: "#0078d4"
    }, {
        rawString: ";color:"
    }, {
        theme: "neutralPrimary",
        defaultValue: "#333333"
    }, {
        rawString: ";padding:0 8px}.sp-field-trending--up{color:#107c10}.sp-field-trending--down{color:"
    }, {
        theme: "error",
        defaultValue: "#a80000"
    }, {
        rawString: '}.sp-field-quickAction{font-family:"Segoe UI Regular WestEuropean","Segoe UI",Tahoma,Arial,sans-serif;font-size:14px;font-weight:400;padding:0}[dir=ltr] .sp-field-quickAction{padding-left:8px}[dir=rtl] .sp-field-quickAction{padding-right:8px}'
    }])
});
