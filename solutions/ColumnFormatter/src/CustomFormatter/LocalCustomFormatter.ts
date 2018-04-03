import styles from './LocalCustomFormatter.module.scss';

/* tslint:disable */
export const LocalCustomFormatter = (e, t, r, n, i, a, o) => {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = (b = {},
    b["toLocaleString()"] = !0,
    b["toLocaleDateString()"] = !0,
    b["toLocaleTimeString()"] = !0,
    b)
      , l = r.__assign((_ = {},
    _["toString()"] = !0,
    _.cos = !0,
    _.sin = !0,
    _["Date()"] = !0,
    _["Number()"] = !0,
    _), s)
      , u = r.__assign({}, l, (S = {},
    S["=="] = !0,
    S["!="] = !0,
    S[">="] = !0,
    S["<="] = !0,
    S[">"] = !0,
    S["<"] = !0,
    S["+"] = !0,
    S["-"] = !0,
    S["*"] = !0,
    S["/"] = !0,
    S[":"] = !0,
    S["?"] = !0,
    S["||"] = !0,
    S["&&"] = !0,
    S))
      , c = {
        div: !0,
        span: !0,
        a: !0,
        img: !0,
        svg: !0,
        button: !0,
        path: !0
    }
      , f = (w = {
        href: !0,
        rel: !0,
        src: !0,
        class: !0,
        target: !0,
        title: !0,
        role: !0
    },
    w.iconName = !0,
    w.d = !0,
    w.alt = !0,
    w)
      , d = {
        defaultClick: !0,
        executeFlow: !0
    }
      , g = {
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
    }
      , p = ["http://", "https://", "mailto:"]
      , m = "DateTime"
      , h = "Boolean"
      , y = (x = {},
    x.Number = !0,
    x.Text = !0,
    x.Title = !0,
    x[m] = !0,
    x.User = !0,
    x.Choice = !0,
    x[h] = !0,
    x.Note = !0,
    x.Image = !0,
    x.Hyperlink = !0,
    x.Lookup = !0,
    x._IsRecord = !0,
    x)
      , v = function() {
        function e(e) {
            this._params = e;
            this._errorStrings = e.errorStrings || n.default
        }
        e.prototype.evaluate = function() {
            var e, t = [];
            try {
                this._cfr = JSON.parse(this._params.fieldRendererFormat);
                e = this._cfr;
                this._createElementHtml(e, t, 0);
                if (!this._fAria) {
                    var r = this._errorStrings.ariaError || "ariaError";
                    console.error(r)
                }
            } catch (r) {
                var n = "Failure: " + ("string" == typeof r ? r : r.message);
                console.error(n);
                t = [];
                e && e.debugMode && t.push(a.default.encodeText(n));
                this._error = n
            }
            return t.join("")
        }
        ;
        e.prototype.errors = function() {
            return this._error || ""
        }
        ;
        e.prototype._createElementHtml = function(e, t, r) {
            e.elmType || this._err("elmTypeMissing");
            var n = e.elmType.toLowerCase()
              , i = "a" === n;
            if (!c[n]) {
                var a = "";
                for (var s in c)
                    a += s + " ";
                this._err("elmTypeInvalid", n, a)
            }
            t.push("<" + n + " ");
            if (e.style) {
                t.push('style="');
                for (var l in e.style)
                    this._createStyleAttr(l, e.style[l], t);
                t.push('" ')
            }
            var u = e.attributes;
            if (0 === r) {
                u || (u = {});
                if (u.class) {
                    var f = u.class;
                    f === String(f) ? u.class = "sp-field-customFormatter " + f : u.class = {
                        operator: "+",
                        operands: ["sp-field-customFormatter ", f]
                    }
                } else
                    u.class = "sp-field-customFormatter"
            }
            if (u) {
                if (i) {
                    var g = u.rel;
                    u.rel = "noopener noreferrer " + (g || "")
                }
                u.iconName && !u.class && (u.class = "");
                for (var p in u)
                    if (this._isValidAttr(p)) {
                        t.push(" " + p + '="');
                        var m = u[p];
                        this._createValue(m, t, "href" === p || "src" === p);
                        if ("class" === p.toLowerCase()) {
                            var h = u.iconName;
                            if (h) {
                                t.push(" ");
                                var y = [];
                                this._createValue(h, y, !1);
                                y[0] && t.push(o.getIconClassName(y[0]))
                            }
                        }
                        t.push('" ')
                    } else
                        console.log("ignoring non-approved attribute " + p)
            }
            if ("button" === n && e.customRowAction && d[e.customRowAction.action]) {
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
                for (var v = 0; v < e.children.length; v++)
                    this._createElementHtml(e.children[v], t, r + 1);
            t.push("</" + n + ">")
        }
        ;
        e.prototype._isValidAttr = function(e) {
            var t = Boolean(f[e])
              , r = Boolean(new RegExp("^aria-[a-z]+$","g").exec(e));
            r && (this._fAria = !0);
            return t || r
        }
        ;
        e.prototype._createStyleAttr = function(e, t, r) {
            if (g[e]) {
                r.push(e + ":");
                this._createValue(t, r, !1, !0);
                r.push(";")
            } else
                console.log("Unsupported style attribute: " + e)
        }
        ;
        e.prototype._createValue = function(e, t, r, n, i) {
            var o = this._eval(e, i);
            null !== o && void 0 !== o || (o = "");
            var s = "<br/>"
              , l = o instanceof Date ? o.toLocaleString() : o.toString()
              , u = a.default.encodeText(l);
            if (r) {
                this._validateUrl(u) || this._err("invalidProtocol");
                s = "%0D%0A"
            }
            n && !this._validateStyleValue(u) && this._err("invalidStyleValue", u);
            u = u.replace(/\r\n|\r|\n/g, s);
            t.push(u)
        }
        ;
        e.prototype._validateStyleValue = function(e) {
            for (var t = ["(", ":", "&", ";", "!"], r = "rgba(" === (e = e.toLowerCase()).substr(0, 5) ? 5 : 0, n = 0; n < t.length; n++)
                if (e.indexOf(t[n], r) >= 0)
                    return !1;
            return !0
        }
        ;
        e.prototype._validateUrl = function(e) {
            if (!e)
                return !0;
            e = e.trim().toLowerCase();
            for (var t = 0; t < p.length; t++) {
                var r = p[t];
                if (e.substr(0, r.length) === r)
                    return !0
            }
            return !(e.indexOf(":") >= 0 || e.indexOf("\\") >= 0 || e.indexOf("&#92") >= 0)
        }
        ;
        e.prototype._eval = function(e, t) {
            if (void 0 !== e) {
                if (null === e)
                    return null;
                if ("string" == typeof e) {
                    if (0 === e.indexOf("@currentField")) {
                        var r = this._params.currentFieldName;
                        if ("@currentField" === e)
                            return !t || this._params.rowSchema[r] !== m && "_IsRecord" !== this._params.rowSchema[r] ? this._evalJsonPath(this._params.row, r) : this._params.row[r];
                        if (e.indexOf(".") !== "@currentField".length)
                            return e;
                        var n = r + e.substr("@currentField".length);
                        return this._evalJsonPath(this._params.row, n)
                    }
                    if ("@me" === e && this._params.pageContextInfo)
                        return this._params.pageContextInfo.userLoginName;
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
                var a = e
                  , o = a.operator
                  , c = a.operands;
                o || this._err("operatorMissing", JSON.stringify(a));
                if (!u[o]) {
                    var f = "";
                    for (var d in u)
                        f += d + " ";
                    this._err("operatorInvalid", o, f, JSON.stringify(a))
                }
                void 0 !== c && void 0 !== c[0] || this._err("operandMissing", JSON.stringify(a));
                if (!l[o])
                    return ":" === o || "?" === o ? this._ternaryEval(a, this._eval(c[1]), this._eval(c[2]), this._eval(c[0])) : "+" === o || "*" === o || "||" === o || "&&" === o ? this._multiOpEval(a) : this._twoOpEval(a, this._eval(c[0]), o, this._eval(c[1]));
                1 !== c.length && this._err("operandNOnly", 1..toString(), JSON.stringify(e));
                if ("toString()" === o)
                    return this._toString(this._eval(c[0]));
                if ("Number()" === o) {
                    g = this._eval(c[0]);
                    return Number(g)
                }
                if ("Date()" === o) {
                    g = this._eval(c[0]);
                    return new Date(g)
                }
                if ("cos" === o)
                    return Math.cos(this._eval(c[0]));
                if ("sin" === o)
                    return Math.sin(this._eval(c[0]));
                if (s[o]) {
                    var g = this._eval(c[0]);
                    if (!Boolean(g))
                        return "";
                    var p = new Date(g);
                    if ("toLocaleString()" === o)
                        return p.toLocaleString();
                    if ("toLocaleDateString()" === o)
                        return p.toLocaleDateString();
                    if ("toLocaleTimeString()" === o)
                        return p.toLocaleTimeString()
                }
            }
        }
        ;
        e.prototype._toString = function(e) {
            return null === e || void 0 === e ? "" : e.toString()
        }
        ;
        e.prototype._ternaryEval = function(e, t, r, n) {
            void 0 !== t && void 0 !== r && void 0 !== n || this._err("operandNOnly", 3..toString(), JSON.stringify(e));
            return n ? t : r
        }
        ;
        e.prototype._multiOpEval = function(e) {
            var t = e.operator
              , r = e.operands;
            (void 0 === r || r.length < 2) && this._err("operandNOnly", 2..toString(), JSON.stringify(e));
            for (var n = this._eval(r[0]), i = 1; i < r.length; i++) {
                var a = this._eval(r[i]);
                n = this._twoOpEval(e, n, t, a)
            }
            return n
        }
        ;
        e.prototype._twoOpEval = function(e, t, r, n) {
            void 0 !== t && void 0 !== n || this._err("operandNOnly", 2..toString(), JSON.stringify(e));
            if ("==" === r)
                return t === n;
            if ("!=" === r)
                return t !== n;
            if (">=" === r)
                return t >= n;
            if ("<=" === r)
                return t <= n;
            if (">" === r)
                return t > n;
            if ("<" === r)
                return t < n;
            if ("||" === r)
                return t || n;
            if ("&&" === r)
                return t && n;
            if ("+" === r)
                return this._doAddOrSubstract(e, t, n, !0);
            if ("-" === r)
                return this._doAddOrSubstract(e, t, n, !1);
            if ("*" === r) {
                this._validateIsNum(e, t);
                this._validateIsNum(e, n);
                return t * n
            }
            if ("/" === r) {
                this._validateIsNum(e, t);
                this._validateIsNum(e, n);
                return t / n
            }
            throw ""
        }
        ;
        e.prototype._doAddOrSubstract = function(e, t, r, n) {
            var i, a = t instanceof Date || r instanceof Date;
            if (n)
                i = t.valueOf() + r.valueOf();
            else {
                if (!a) {
                    this._validateIsNum(e, t);
                    this._validateIsNum(e, r)
                }
                i = t.valueOf() - r.valueOf()
            }
            return a ? new Date(i) : i
        }
        ;
        e.prototype._validateIsNum = function(e, t) {
            "number" != typeof t && this._err("nan", t.toString(), JSON.stringify(e))
        }
        ;
        e.prototype._evalJsonPath = function(e, t) {
            var r, n = e;
            try {
                var i = t.split(".")
                  , a = this._params.rowSchema
                  , o = a[i[0]];
                r = i.length;
                if ("Number" === o || o === m || o === h || "_IsRecord" === o) {
                    var s = o === h ? ".value" : "."
                      , l = i[0] + s;
                    null != n[l] && void 0 !== n[l] && (i[0] = l)
                }
                if (("Hyperlink" === o || "Image" === o) && 2 === r && "desc" === i[1])
                    return n[t];
                a && o && (y[o] || this._err("unsupportedType", t));
                for (var u = "User" === o, c = "Lookup" === o, f = 0; f < r; f++) {
                    n = n[i[f]];
                    (u || c) && 0 === f && this.isArray(n) && (n = n[0])
                }
            } catch (e) {
                console.log("could not evaluate " + t);
                return null
            }
            if (void 0 === n) {
                var d = t + " was not found on the data object.";
                console.log(d);
                if (this._cfr.debugMode)
                    throw d
            }
            return 1 === r ? this._convertValue(n, t) : n
        }
        ;
        e.prototype._convertValue = function(e, t) {
            var r = this._params.rowSchema;
            if (!r || !r[t])
                return e;
            switch (r[t]) {
            case "Text":
            case "Title":
            case "Note":
            case "Choice":
            case "Image":
            case "Hyperlink":
            case "Lookup":
            case "_IsRecord":
                return e;
            case h:
                return "1" === e || "0" !== e && e;
            case "Number":
                var n = void 0;
                n = "string" == typeof e ? parseFloat(e.replace(/,/g, "")) : Number(e);
                return isNaN(n) ? "" : n;
            case m:
                return "string" == typeof e ? Boolean(e) ? new Date(e) : null : e;
            case "User":
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
            var n = "";
            if (this._errorStrings && e && this._errorStrings[e]) {
                var a = this._errorStrings[e];
                n = i.format.apply(i, [a].concat(t))
            } else
                e && (n = "FieldRenderer Error: " + e);
            throw n
        }
        ;
        return e
    }();
    t.CustomFormatter = v;
    var b, _, S, w, x
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
    function r(e) {
        return i[e]
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = /[<>&'"\\]/g
      , i = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#39;",
        "\\": "&#92;"
    }
      , a = function() {
		var e: { (): any; encodeText: any; };
		e =(() => {
			var _e: any = function() {};
			_e.encodeText = function(e) {
				return e ? e.replace(n, r) : ""
			};
			return _e;
		})();
        return e
    }();
    t.default = a
};