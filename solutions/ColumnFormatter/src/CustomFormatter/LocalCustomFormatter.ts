/* tslint:disable */
export const LocalCustomFormatter = (e, t, r, o, n, c, i, m) => {
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
};
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

export const LocalHtmlEncoding = (e, t) => {
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
};