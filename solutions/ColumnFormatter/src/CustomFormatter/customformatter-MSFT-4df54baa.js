define("@ms/odsp-shared-react/lib/components/CustomFormatter/CustomFormatter", ["require", "exports", "tslib", "./CustomFormatter.resx", "@ms/odsp-utilities/lib/string/StringHelper", "@ms/odsp-utilities/lib/encoding/HtmlEncoding", "office-ui-fabric-react/lib/Styling", "./CustomFormatter.scss"], function(e, t, r, n, i, a, o) {
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
!function(e) {
    function t(e, t) {
        return function(r, n) {
            return e[r] = t ? t(r, n) : n
        }
    }
    var r = "object" == typeof global ? global : "object" == typeof self ? self : "object" == typeof this ? this : {};
    "function" == typeof define && define.amd ? define("tslib", ["exports"], function(n) {
        e(t(r, t(n)))
    }) : e("object" == typeof module && "object" == typeof module.exports ? t(r, t(module.exports)) : t(r))
}(function(e) {
    var t = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(e, t) {
        e.__proto__ = t
    }
    || function(e, t) {
        for (var r in t)
            t.hasOwnProperty(r) && (e[r] = t[r])
    }
    ;
    __extends = function(e, r) {
        function n() {
            this.constructor = e
        }
        t(e, r);
        e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype,
        new n)
    }
    ;
    __assign = Object.assign || function(e) {
        for (var t, r = 1, n = arguments.length; r < n; r++) {
            t = arguments[r];
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        return e
    }
    ;
    __rest = function(e, t) {
        var r = {};
        for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
            for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
                t.indexOf(n[i]) < 0 && (r[n[i]] = e[n[i]]);
        return r
    }
    ;
    __decorate = function(e, t, r, n) {
        var i, a = arguments.length, o = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            o = Reflect.decorate(e, t, r, n);
        else
            for (var s = e.length - 1; s >= 0; s--)
                (i = e[s]) && (o = (a < 3 ? i(o) : a > 3 ? i(t, r, o) : i(t, r)) || o);
        return a > 3 && o && Object.defineProperty(t, r, o),
        o
    }
    ;
    __param = function(e, t) {
        return function(r, n) {
            t(r, n, e)
        }
    }
    ;
    __metadata = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    }
    ;
    __awaiter = function(e, t, r, n) {
        return new (r || (r = Promise))(function(i, a) {
            function o(e) {
                try {
                    l(n.next(e))
                } catch (e) {
                    a(e)
                }
            }
            function s(e) {
                try {
                    l(n.throw(e))
                } catch (e) {
                    a(e)
                }
            }
            function l(e) {
                e.done ? i(e.value) : new r(function(t) {
                    t(e.value)
                }
                ).then(o, s)
            }
            l((n = n.apply(e, t || [])).next())
        }
        )
    }
    ;
    __generator = function(e, t) {
        function r(e) {
            return function(t) {
                return n([e, t])
            }
        }
        function n(r) {
            if (i)
                throw new TypeError("Generator is already executing.");
            for (; l; )
                try {
                    if (i = 1,
                    a && (o = a[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(o = o.call(a, r[1])).done)
                        return o;
                    (a = 0,
                    o) && (r = [0, o.value]);
                    switch (r[0]) {
                    case 0:
                    case 1:
                        o = r;
                        break;
                    case 4:
                        l.label++;
                        return {
                            value: r[1],
                            done: !1
                        };
                    case 5:
                        l.label++;
                        a = r[1];
                        r = [0];
                        continue;
                    case 7:
                        r = l.ops.pop();
                        l.trys.pop();
                        continue;
                    default:
                        if (!(o = l.trys,
                        o = o.length > 0 && o[o.length - 1]) && (6 === r[0] || 2 === r[0])) {
                            l = 0;
                            continue
                        }
                        if (3 === r[0] && (!o || r[1] > o[0] && r[1] < o[3])) {
                            l.label = r[1];
                            break
                        }
                        if (6 === r[0] && l.label < o[1]) {
                            l.label = o[1];
                            o = r;
                            break
                        }
                        if (o && l.label < o[2]) {
                            l.label = o[2];
                            l.ops.push(r);
                            break
                        }
                        o[2] && l.ops.pop();
                        l.trys.pop();
                        continue
                    }
                    r = t.call(e, l)
                } catch (e) {
                    r = [6, e];
                    a = 0
                } finally {
                    i = o = 0
                }
            if (5 & r[0])
                throw r[1];
            return {
                value: r[0] ? r[1] : void 0,
                done: !0
            }
        }
        var i, a, o, s, l = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return s = {
            next: r(0),
            throw: r(1),
            return: r(2)
        },
        "function" == typeof Symbol && (s[Symbol.iterator] = function() {
            return this
        }
        ),
        s
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
        var n, i, a = r.call(e), o = [];
        try {
            for (; (void 0 === t || t-- > 0) && !(n = a.next()).done; )
                o.push(n.value)
        } catch (e) {
            i = {
                error: e
            }
        } finally {
            try {
                n && !n.done && (r = a.return) && r.call(a)
            } finally {
                if (i)
                    throw i.error
            }
        }
        return o
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
        function n(e) {
            c[e] && (u[e] = function(t) {
                return new Promise(function(r, n) {
                    f.push([e, t, r, n]) > 1 || i(e, t)
                }
                )
            }
            )
        }
        function i(e, t) {
            try {
                a(c[e](t))
            } catch (e) {
                l(f[0][3], e)
            }
        }
        function a(e) {
            e.value instanceof __await ? Promise.resolve(e.value.v).then(o, s) : l(f[0][2], e)
        }
        function o(e) {
            i("next", e)
        }
        function s(e) {
            i("throw", e)
        }
        function l(e, t) {
            (e(t),
            f.shift(),
            f.length) && i(f[0][0], f[0][1])
        }
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var u, c = r.apply(e, t || []), f = [];
        return u = {},
        n("next"),
        n("throw"),
        n("return"),
        u[Symbol.asyncIterator] = function() {
            return this
        }
        ,
        u
    }
    ;
    __asyncDelegator = function(e) {
        function t(t, i) {
            e[t] && (r[t] = function(r) {
                return (n = !n) ? {
                    value: __await(e[t](r)),
                    done: "return" === t
                } : i ? i(r) : r
            }
            )
        }
        var r, n;
        return r = {},
        t("next"),
        t("throw", function(e) {
            throw e
        }),
        t("return"),
        r[Symbol.iterator] = function() {
            return this
        }
        ,
        r
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
define("@ms/odsp-utilities/lib/string/StringHelper", ["require", "exports"], function(e, t) {
    "use strict";
    function r(e) {
        for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
        return e.replace(i, function(e, r) {
            var n = t[r];
            return null === n ? "" : n
        })
    }
    function n(e, t, r) {
        r = Number(r);
        if (void 0 === e || void 0 === t || void 0 === r)
            return null;
        for (var n = "", i = -1, a = t.split("||"), o = 0, s = a.length; o < s; o++) {
            var l = a[o];
            if (l) {
                for (var u = 0, c = l.split(","); u < c.length; u++) {
                    var f = c[u];
                    if (f)
                        if (isNaN(Number(f))) {
                            if (-1 !== f.indexOf("-")) {
                                var d = f.split("-");
                                if (2 !== d.length)
                                    continue;
                                var g = void 0;
                                if ("" === d[0])
                                    g = 0;
                                else {
                                    if (isNaN(Number(d[0])))
                                        continue;
                                    g = parseInt(d[0], 10)
                                }
                                if (r >= g) {
                                    if ("" === d[1]) {
                                        i = o;
                                        break
                                    }
                                    if (isNaN(Number(d[1])))
                                        continue;
                                    if (r <= parseInt(d[1], 10)) {
                                        i = o;
                                        break
                                    }
                                }
                            } else if (-1 !== f.indexOf("*")) {
                                var p = f.trim().replace(/\*/g, "[0-9]*");
                                if (new RegExp("^" + p + "$").test(r.toString())) {
                                    i = o;
                                    break
                                }
                            }
                        } else if (r === parseInt(f, 10)) {
                            i = o;
                            break
                        }
                }
                if (-1 !== i)
                    break
            }
        }
        if (-1 !== i) {
            var m = e.split("||");
            m[i] && (n = m[i])
        }
        return n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = /\{(\d+)\}/g;
    t.format = r;
    t.formatToArray = function(e) {
        for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
        for (var n, a = [], o = 0; n = i.exec(e); ) {
            var s = n[0]
              , l = t[parseInt(s.replace(/\{|\}+/g, ""), 10)];
            n.index > o && a.push(e.substring(o, n.index));
            o = i.lastIndex;
            a.push(l)
        }
        o !== e.length && a.push(e.substring(o, e.length));
        return a
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
    t.findOneOf = function(e, t) {
        for (var r = 0; r < e.length; r++)
            if (t.indexOf(e[r]) >= 0)
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
    t.getLocalizedCountValue = n;
    t.formatWithLocalizedCountValue = function(e, t, i) {
        return r(n(e, t, i), i.toString())
    }
});
define("@ms/odsp-utilities/lib/encoding/HtmlEncoding", ["require", "exports"], function(e, t) {
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
        function e() {}
        e.encodeText = function(e) {
            return e ? e.replace(n, r) : ""
        }
        ;
        return e
    }();
    t.default = a
});
define("office-ui-fabric-react/lib/Styling", ["require", "exports", "tslib", "@uifabric/styling/lib/index"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.__exportStar(n, t)
});
define("@uifabric/styling/lib/index", ["require", "exports", "tslib", "./classNames/index", "./styles/index", "./utilities/index", "./MergeStyles"], function(e, t, r, n, i, a, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.__exportStar(n, t);
    r.__exportStar(i, t);
    r.__exportStar(a, t);
    r.__exportStar(o, t)
});
define("@uifabric/styling/lib/classNames/index", ["require", "exports", "./AnimationClassNames", "./FontClassNames", "./ColorClassNames"], function(e, t, r, n, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.AnimationClassNames = r.AnimationClassNames;
    t.FontClassNames = n.FontClassNames;
    t.ColorClassNames = i.ColorClassNames
});
define("@uifabric/styling/lib/classNames/AnimationClassNames", ["require", "exports", "../utilities/index", "../styles/index"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.AnimationClassNames = r.buildClassMap(n.AnimationStyles)
});
define("@uifabric/styling/lib/utilities/index", ["require", "exports", "./buildClassMap", "./icons", "./getIconClassName"], function(e, t, r, n, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.buildClassMap = r.buildClassMap;
    t.getIcon = n.getIcon;
    t.registerIcons = n.registerIcons;
    t.registerIconAlias = n.registerIconAlias;
    t.setIconOptions = n.setIconOptions;
    t.getIconClassName = i.getIconClassName
});
define("@uifabric/styling/lib/utilities/buildClassMap", ["require", "exports", "../MergeStyles"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.buildClassMap = function(e) {
        var t = {};
        for (var n in e)
            !function(n) {
                if (e.hasOwnProperty(n)) {
                    var i;
                    Object.defineProperty(t, n, {
                        get: function() {
                            void 0 === i && (i = r.mergeStyles(e[n]).toString());
                            return i
                        },
                        enumerable: !0,
                        configurable: !0
                    })
                }
            }(n);
        return t
    }
});
define("@uifabric/styling/lib/MergeStyles", ["require", "exports", "@uifabric/merge-styles/lib/index"], function(e, t, r) {
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
define("@uifabric/merge-styles/lib/index", ["require", "exports", "./mergeStyles", "./mergeStyleSets", "./concatStyleSets", "./fontFace", "./keyframes", "./Stylesheet"], function(e, t, r, n, i, a, o, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.mergeStyles = r.mergeStyles;
    t.mergeStyleSets = n.mergeStyleSets;
    t.concatStyleSets = i.concatStyleSets;
    t.fontFace = a.fontFace;
    t.keyframes = o.keyframes;
    t.InjectionMode = s.InjectionMode;
    t.Stylesheet = s.Stylesheet
});
define("@uifabric/merge-styles/lib/mergeStyles", ["require", "exports", "./styleToClassName", "./extractStyleParts"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.mergeStyles = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var i = n.extractStyleParts(e)
          , a = i.classes
          , o = i.objects;
        o.length && a.push(r.styleToClassName(o));
        return a.join(" ")
    }
});
define("@uifabric/merge-styles/lib/styleToClassName", ["require", "exports", "./Stylesheet", "./transforms/kebabRules", "./transforms/prefixRules", "./transforms/provideUnits", "./transforms/rtlifyRules"], function(e, t, r, n, i, a, o) {
    "use strict";
    function s(e) {
        var t = e && e["&"];
        return t ? t.displayName : void 0
    }
    function l(e, t, n) {
        void 0 === t && (t = {
            __order: []
        });
        void 0 === n && (n = "&");
        var i = r.Stylesheet.getInstance()
          , a = t[n];
        if (!a) {
            a = {};
            t[n] = a;
            t.__order.push(n)
        }
        for (var o = 0, s = e; o < s.length; o++) {
            var c = s[o];
            if ("string" == typeof c) {
                var f = i.argsFromClassName(c);
                f && l(f, t, n)
            } else if (Array.isArray(c))
                l(c, t, n);
            else
                for (var d in c)
                    if ("selectors" === d) {
                        var g = c.selectors;
                        for (var p in g)
                            if (g.hasOwnProperty(p)) {
                                var m = g[p];
                                0 === p.indexOf("@media") ? p = p + "{" + n : 0 === p.indexOf(":") ? p = n + p : p.indexOf("&") < 0 && (p = n + " " + p);
                                l([m], t, p)
                            }
                    } else
                        "margin" === d || "padding" === d ? u(a, d, c[d]) : a[d] = c[d]
        }
        return t
    }
    function u(e, t, r) {
        var n = "string" == typeof r ? r.split(" ") : [r];
        e[t + "Top"] = n[0];
        e[t + "Right"] = n[1] || n[0];
        e[t + "Bottom"] = n[2] || n[0];
        e[t + "Left"] = n[3] || n[1] || n[0]
    }
    function c(e) {
        for (var t = [], r = !1, n = 0, i = e.__order; n < i.length; n++) {
            var a = i[n];
            t.push(a);
            var o = e[a];
            for (var s in o)
                if (o.hasOwnProperty(s)) {
                    r = !0;
                    t.push(s, o[s])
                }
        }
        return r ? t.join("") : void 0
    }
    function f(e) {
        if (!e)
            return "";
        var t = [];
        for (var r in e)
            e.hasOwnProperty(r) && r !== p && t.push(r, e[r]);
        for (s = 0; s < t.length; s += 2) {
            n.kebabRules(t, s);
            a.provideUnits(t, s);
            o.rtlifyRules(t, s);
            i.prefixRules(t, s)
        }
        for (var s = 1; s < t.length; s += 4)
            t.splice(s, 1, ":", t[s], ";");
        return t.join("")
    }
    function d() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var n = l(e)
          , i = c(n);
        if (i) {
            var a = r.Stylesheet.getInstance()
              , o = {
                className: a.classNameFromKey(i),
                key: i,
                args: e
            };
            if (!o.className) {
                o.className = a.getClassName(s(n));
                for (var u = [], d = 0, g = n.__order; d < g.length; d++) {
                    var p = g[d];
                    u.push(p, f(n[p]))
                }
                o.rulesToInsert = u
            }
            return o
        }
    }
    function g(e, t) {
        var n = r.Stylesheet.getInstance()
          , i = e.className
          , a = e.key
          , o = e.args
          , s = e.rulesToInsert;
        if (s) {
            for (var l = 0; l < s.length; l += 2) {
                var u = s[l + 1];
                if (u) {
                    var c = s[l]
                      , f = (c = c.replace(/(&)|\$([\w-]+)\b/g, function(r, n, i) {
                        return n ? "." + e.className : i ? "." + (t && t[i] || i) : ""
                    })) + "{" + u + "}" + (0 === c.indexOf("@media") ? "}" : "");
                    n.insertRule(f)
                }
            }
            n.cacheClassName(i, a, o, s)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var p = "displayName";
    t.serializeRuleEntries = f;
    t.styleToRegistration = d;
    t.applyRegistration = g;
    t.styleToClassName = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = d.apply(void 0, e);
        if (r) {
            g(r);
            return r.className
        }
        return ""
    }
});
define("@uifabric/merge-styles/lib/Stylesheet", ["require", "exports", "tslib"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    !function(e) {
        e[e.none = 0] = "none";
        e[e.insertNode = 1] = "insertNode";
        e[e.appendChild = 2] = "appendChild"
    }(t.InjectionMode || (t.InjectionMode = {}));
    var n, i = function() {
        function e(e) {
            this._config = r.__assign({
                async: !1,
                injectionMode: 1
            }, e);
            this.reset()
        }
        e.getInstance = function() {
            var t = "undefined" != typeof window ? window : {};
            if (!(n = t.__stylesheet__)) {
                var r = t && t.FabricConfig || {};
                n = t.__stylesheet__ = new e(r.mergeStyles)
            }
            return n
        }
        ;
        e.prototype.setConfig = function(e) {
            this._config = r.__assign({}, this._config, e)
        }
        ;
        e.prototype.getClassName = function(e) {
            return (e || "css") + "-" + this._counter++
        }
        ;
        e.prototype.cacheClassName = function(e, t, r, n) {
            this._keyToClassName[t] = e;
            this._classNameToArgs[e] = {
                args: r,
                rules: n
            }
        }
        ;
        e.prototype.classNameFromKey = function(e) {
            return this._keyToClassName[e]
        }
        ;
        e.prototype.argsFromClassName = function(e) {
            var t = this._classNameToArgs[e];
            return t && t.args
        }
        ;
        e.prototype.insertedRulesFromClassName = function(e) {
            var t = this._classNameToArgs[e];
            return t && t.rules
        }
        ;
        e.prototype.insertRule = function(e) {
            var t = this._getElement();
            switch (t ? this._config.injectionMode : 0) {
            case 1:
                var r = t.sheet;
                try {
                    r.insertRule(e, r.cssRules.length)
                } catch (e) {}
                break;
            case 2:
                t.appendChild(document.createTextNode(e));
                break;
            default:
                this._rules.push(e)
            }
        }
        ;
        e.prototype.getRules = function() {
            return (this._rules.join("") || "") + (this._rulesToInsert.join("") || "")
        }
        ;
        e.prototype.reset = function() {
            this._rules = [];
            this._rulesToInsert = [];
            this._counter = 0;
            this._classNameToArgs = {};
            this._keyToClassName = {};
            if (this._timerId) {
                clearTimeout(this._timerId);
                this._timerId = 0
            }
        }
        ;
        e.prototype._getElement = function() {
            if (!this._styleElement && "undefined" != typeof document) {
                this._styleElement = document.createElement("style");
                this._styleElement.setAttribute("data-merge-styles", "true");
                document.head.appendChild(this._styleElement)
            }
            return this._styleElement
        }
        ;
        return e
    }();
    t.Stylesheet = i
});
define("@uifabric/merge-styles/lib/transforms/kebabRules", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.kebabRules = function(e, t) {
        e[t] = e[t].replace(/([A-Z])/g, "-$1").toLowerCase()
    }
});
define("@uifabric/merge-styles/lib/transforms/prefixRules", ["require", "exports", "../getVendorSettings"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        "user-select": 1
    };
    t.prefixRules = function(e, t) {
        var i = r.getVendorSettings()
          , a = e[t];
        if (n[a]) {
            var o = e[t + 1];
            if (n[a]) {
                i.isWebkit && e.push("-webkit-" + a, o);
                i.isMoz && e.push("-moz-" + a, o);
                i.isMs && e.push("-ms-" + a, o);
                i.isOpera && e.push("-o-" + a, o)
            }
        }
    }
});
define("@uifabric/merge-styles/lib/getVendorSettings", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r;
    t.getVendorSettings = function() {
        if (!r) {
            var e = "undefined" != typeof document ? document : void 0
              , t = "undefined" != typeof navigator ? navigator : void 0
              , n = t ? t.userAgent.toLowerCase() : void 0;
            r = e ? {
                isWebkit: !!(e && "WebkitAppearance"in e.documentElement.style),
                isMoz: !!(n && n.indexOf("firefox") > -1),
                isOpera: !!(n && n.indexOf("opera") > -1),
                isMs: !(!t || !/rv:11.0/i.test(t.userAgent) && !/Edge\/\d./i.test(navigator.userAgent))
            } : {
                isWebkit: !0,
                isMoz: !0,
                isOpera: !0,
                isMs: !0
            }
        }
        return r
    }
    ;
    t.setVendorSettings = function(e) {
        r = e
    }
});
define("@uifabric/merge-styles/lib/transforms/provideUnits", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = ["column-count", "font-weight", "flex-basis", "flex", "flex-grow", "flex-shrink", "opacity", "order", "z-index", "zoom"];
    t.provideUnits = function(e, t) {
        var n = e[t]
          , i = e[t + 1];
        if ("number" == typeof i) {
            var a = -1 === r.indexOf(n) ? "px" : "";
            e[t + 1] = "" + i + a
        }
    }
});
define("@uifabric/merge-styles/lib/transforms/rtlifyRules", ["require", "exports"], function(e, t) {
    "use strict";
    function r() {
        void 0 === l && (l = "undefined" != typeof document && !!document.documentElement && "rtl" === document.documentElement.getAttribute("dir"));
        return l
    }
    function n(e, t) {
        var r = e.split(" ")
          , n = parseInt(r[t], 10);
        r[0] = r[0].replace(String(n), String(-1 * n));
        return r.join(" ")
    }
    function i(e) {
        if ("string" == typeof e) {
            var t = e.split(" ");
            if (4 === t.length)
                return t[0] + " " + t[3] + " " + t[2] + " " + t[1]
        }
        return e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = {
        left: "right",
        right: "left"
    }
      , o = {
        "w-resize": "e-resize",
        "sw-resize": "se-resize",
        "nw-resize": "ne-resize"
    }
      , s = "@noflip"
      , l = r();
    t.setRTL = function(e) {
        l = e
    }
    ;
    t.getRTL = r;
    t.rtlifyRules = function(e, t) {
        if (r()) {
            var l = e[t]
              , u = e[t + 1];
            if (u.indexOf(s) >= 0)
                e[t + 1] = u.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, "");
            else if (l.indexOf("left") >= 0)
                e[t] = l.replace("left", "right");
            else if (l.indexOf("right") >= 0)
                e[t] = l.replace("right", "left");
            else if (String(u).indexOf("left") >= 0)
                e[t + 1] = u.replace("left", "right");
            else if (String(u).indexOf("right") >= 0)
                e[t + 1] = u.replace("right", "left");
            else if (a[l])
                e[t] = a[l];
            else if (o[u])
                e[t + 1] = o[u];
            else
                switch (l) {
                case "margin":
                case "padding":
                    e[t + 1] = i(u);
                    break;
                case "box-shadow":
                    e[t + 1] = n(u, 0)
                }
        }
    }
});
define("@uifabric/merge-styles/lib/extractStyleParts", ["require", "exports", "./Stylesheet"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.extractStyleParts = function() {
        function e(t) {
            for (var r = 0, n = t; r < n.length; r++) {
                var s = n[r];
                if (s)
                    if ("string" == typeof s)
                        if (s.indexOf(" ") >= 0)
                            e(s.split(" "));
                        else {
                            var l = o.argsFromClassName(s);
                            l ? e(l) : i.push(s)
                        }
                    else
                        Array.isArray(s) ? e(s) : "object" == typeof s && a.push(s)
            }
        }
        for (var t = [], n = 0; n < arguments.length; n++)
            t[n] = arguments[n];
        var i = []
          , a = []
          , o = r.Stylesheet.getInstance();
        e(t);
        return {
            classes: i,
            objects: a
        }
    }
});
define("@uifabric/merge-styles/lib/mergeStyleSets", ["require", "exports", "./extractStyleParts", "./concatStyleSets", "./styleToClassName"], function(e, t, r, n, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.mergeStyleSets = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var a = {}
          , o = e[0];
        if (o) {
            e.length > 1 && (o = n.concatStyleSets.apply(void 0, e));
            var s = [];
            for (var l in o)
                if (o.hasOwnProperty(l)) {
                    var u = o[l]
                      , c = r.extractStyleParts(u)
                      , f = c.classes
                      , d = c.objects
                      , g = i.styleToRegistration({
                        displayName: l
                    }, d);
                    s.push(g);
                    g && (a[l] = f.concat([g.className]).join(" "))
                }
            for (var p = 0, m = s; p < m.length; p++)
                (g = m[p]) && i.applyRegistration(g, a)
        }
        return a
    }
});
define("@uifabric/merge-styles/lib/concatStyleSets", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.concatStyleSets = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        for (var r = {}, n = 0, i = e; n < i.length; n++) {
            var a = i[n];
            if (a)
                for (var o in a)
                    if (a.hasOwnProperty(o)) {
                        var s = r[o]
                          , l = a[o];
                        r[o] = void 0 === s ? l : (Array.isArray(s) ? s : [s]).concat(Array.isArray(l) ? l : [l])
                    }
        }
        return r
    }
});
define("@uifabric/merge-styles/lib/fontFace", ["require", "exports", "./Stylesheet", "./styleToClassName"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.fontFace = function(e) {
        r.Stylesheet.getInstance().insertRule("@font-face{" + n.serializeRuleEntries(e) + "}")
    }
});
define("@uifabric/merge-styles/lib/keyframes", ["require", "exports", "./Stylesheet", "./styleToClassName"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.keyframes = function(e) {
        var t = r.Stylesheet.getInstance()
          , i = t.getClassName()
          , a = [];
        for (var o in e)
            e.hasOwnProperty(o) && a.push(o, "{", n.serializeRuleEntries(e[o]), "}");
        var s = a.join("");
        t.insertRule("@keyframes " + i + "{" + s + "}");
        return i
    }
});
define("@uifabric/styling/lib/utilities/icons", ["require", "exports", "tslib", "@uifabric/utilities/lib/warn", "@uifabric/utilities/lib/GlobalSettings", "@uifabric/merge-styles/lib/index"], function(e, t, r, n, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = i.GlobalSettings.getValue("icons", {
        __options: {
            disableWarnings: !1,
            warnOnMissingIcons: !0
        },
        __remapped: {}
    });
    t.registerIcons = function(e) {
        var t = r.__assign({}, e, {
            isRegistered: !1,
            className: void 0
        })
          , i = e.icons;
        for (var a in i)
            if (i.hasOwnProperty(a)) {
                var s = i[a]
                  , l = a.toLowerCase();
                o[l] && !o.__options.disableWarnings && n.warn("Icon '" + a + " being re-registered");
                o[l] = {
                    code: s,
                    subset: t
                }
            }
    }
    ;
    t.registerIconAlias = function(e, t) {
        o.__remapped[e.toLowerCase()] = t.toLowerCase()
    }
    ;
    t.getIcon = function(e) {
        var t = void 0;
        e = e ? e.toLowerCase() : "";
        if (e = o.__remapped[e] || e)
            if (t = o[e]) {
                var r = t.subset;
                if (r.fontFace && !r.isRegistered) {
                    a.fontFace(r.fontFace);
                    r.className = a.mergeStyles(r.style, {
                        fontFamily: r.fontFace.fontFamily,
                        fontWeight: r.fontFace.fontWeight || "normal",
                        fontStyle: r.fontFace.fontStyle || "normal"
                    }).toString();
                    r.isRegistered = !0
                }
            } else
                o.__options.warnOnMissingIcons && !o.__options.disableWarnings && n.warn('The icon "' + e + '" was used but not registered. See http://aka.ms/fabric-icon-usage for more information.');
        return t
    }
    ;
    t.setIconOptions = function(e) {
        o.__options = r.__assign({}, o.__options, e)
    }
});
define("@uifabric/utilities/lib/warn", ["require", "exports"], function(e, t) {
    "use strict";
    function r(e) {
        n ? n(e) : console && console.warn && console.warn(e)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = void 0;
    t.warnDeprecations = function(e, t, n) {
        for (var i in n)
            if (t && i in t) {
                var a = e + " property '" + i + "' was used but has been deprecated."
                  , o = n[i];
                o && (a += " Use '" + o + "' instead.");
                r(a)
            }
    }
    ;
    t.warnMutuallyExclusive = function(e, t, n) {
        for (var i in n)
            if (t && i in t) {
                var a = n[i];
                a && a in t && r(e + " property '" + i + "' is mutually exclusive with '" + n[i] + "'. Use one or the other.")
            }
    }
    ;
    t.warnConditionallyRequiredProps = function(e, t, n, i, a) {
        if (!0 === a)
            for (var o = 0, s = n; o < s.length; o++) {
                var l = s[o];
                l in t || r(e + " property '" + l + "' is required when '" + i + "' is used.'")
            }
    }
    ;
    t.warn = r;
    t.setWarningCallback = function(e) {
        n = e
    }
});
define("@uifabric/utilities/lib/GlobalSettings", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = {}
      , n = 0;
    if ("undefined" != typeof window) {
        var i = window;
        r = i.__globalSettings__ = i.__globalSettings__ || (s = {},
        s.__callbacks__ = {},
        s)
    }
    var a = r.__callbacks__
      , o = function() {
        function e() {}
        e.getValue = function(e, t) {
            void 0 === r[e] && (r[e] = "function" == typeof t ? t() : t);
            return r[e]
        }
        ;
        e.setValue = function(e, t) {
            var n = r[e];
            if (t !== n) {
                r[e] = t;
                var i = {
                    oldValue: n,
                    value: t,
                    key: e
                };
                for (var o in a)
                    a.hasOwnProperty(o) && a[o](i)
            }
            return t
        }
        ;
        e.addChangeListener = function(e) {
            var t = e.__id__;
            t || (t = e.__id__ = String(n++));
            a[t] = e
        }
        ;
        e.removeChangeListener = function(e) {
            delete a[e.__id__]
        }
        ;
        return e
    }();
    t.GlobalSettings = o;
    var s
});
define("@uifabric/styling/lib/utilities/getIconClassName", ["require", "exports", "@uifabric/merge-styles/lib/index", "./icons"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = {
        display: "inline-block"
    };
    t.getIconClassName = function(e) {
        var t = ""
          , a = n.getIcon(e);
        a && (t = r.mergeStyles(a.subset.className, i, {
            selectors: {
                "::before": {
                    content: '"' + a.code + '"'
                }
            }
        }));
        return t
    }
});
define("@uifabric/styling/lib/styles/index", ["require", "exports", "tslib", "./AnimationStyles", "./DefaultPalette", "./DefaultFontStyles", "./fonts", "./getFocusStyle", "./hiddenContentStyle", "./theme", "./CommonStyles"], function(e, t, r, n, i, a, o, s, l, u, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.AnimationStyles = n.AnimationStyles;
    t.DefaultPalette = i.DefaultPalette;
    t.DefaultFontStyles = a.DefaultFontStyles;
    t.registerDefaultFontFaces = a.registerDefaultFontFaces;
    t.FontSizes = o.FontSizes;
    t.FontWeights = o.FontWeights;
    t.IconFontSizes = o.IconFontSizes;
    t.createFontStyles = o.createFontStyles;
    t.getFocusStyle = s.getFocusStyle;
    t.hiddenContentStyle = l.hiddenContentStyle;
    t.ThemeSettingName = u.ThemeSettingName;
    t.getTheme = u.getTheme;
    t.loadTheme = u.loadTheme;
    t.createTheme = u.createTheme;
    r.__exportStar(c, t)
});
define("@uifabric/styling/lib/styles/AnimationStyles", ["require", "exports", "@uifabric/merge-styles/lib/index"], function(e, t, r) {
    "use strict";
    function n(e, t, r) {
        return {
            animationName: e,
            animationDuration: t,
            animationTimingFunction: r,
            animationFillMode: "both"
        }
    }
    function i(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(" + e + "px,0,0)"
            },
            to: {
                transform: "translate3d(0,0,0)"
            }
        })
    }
    function a(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(0," + e + "px,0)"
            },
            to: {
                transform: "translate3d(0,0,0)"
            }
        })
    }
    function o(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(0,0,0)"
            },
            to: {
                transform: "translate3d(" + e + "px,0,0)"
            }
        })
    }
    function s(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(0,0,0)"
            },
            to: {
                transform: "translate3d(0," + e + "px,0)"
            }
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = "cubic-bezier(.1,.9,.2,1)"
      , u = "cubic-bezier(.1,.25,.75,.9)"
      , c = r.keyframes({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    })
      , f = r.keyframes({
        from: {
            opacity: 1
        },
        to: {
            opacity: 0
        }
    })
      , d = i(-10)
      , g = i(-20)
      , p = i(-40)
      , m = i(-400)
      , h = i(10)
      , y = i(20)
      , v = i(40)
      , b = i(400)
      , _ = a(10)
      , S = a(20)
      , w = a(-10)
      , x = a(-20)
      , C = o(10)
      , k = o(20)
      , O = o(40)
      , N = o(400)
      , I = o(-10)
      , P = o(-20)
      , F = o(-40)
      , E = o(-400)
      , M = s(-10)
      , T = s(-20)
      , L = s(10)
      , j = s(20)
      , D = r.keyframes({
        from: {
            transform: "scale3d(.98,.98,1)"
        },
        to: {
            transform: "scale3d(1,1,1)"
        }
    })
      , A = r.keyframes({
        from: {
            transform: "scale3d(1,1,1)"
        },
        to: {
            transform: "scale3d(.98,.98,1)"
        }
    })
      , R = r.keyframes({
        from: {
            transform: "scale3d(1.03,1.03,1)"
        },
        to: {
            transform: "scale3d(1,1,1)"
        }
    })
      , W = r.keyframes({
        from: {
            transform: "scale3d(1,1,1)"
        },
        to: {
            transform: "scale3d(1.03,1.03,1)"
        }
    })
      , z = r.keyframes({
        from: {
            transform: "rotateZ(0deg)"
        },
        to: {
            transform: "rotateZ(90deg)"
        }
    })
      , q = r.keyframes({
        from: {
            transform: "rotateZ(0deg)"
        },
        to: {
            transform: "rotateZ(-90deg)"
        }
    });
    t.AnimationStyles = {
        slideRightIn10: n(c + "," + d, "0.367s", l),
        slideRightIn20: n(c + "," + g, "0.367s", l),
        slideRightIn40: n(c + "," + p, "0.367s", l),
        slideRightIn400: n(c + "," + m, "0.367s", l),
        slideLeftIn10: n(c + "," + h, "0.367s", l),
        slideLeftIn20: n(c + "," + y, "0.367s", l),
        slideLeftIn40: n(c + "," + v, "0.367s", l),
        slideLeftIn400: n(c + "," + b, "0.367s", l),
        slideUpIn10: n(c + "," + _, "0.367s", l),
        slideUpIn20: n(c + "," + S, "0.367s", l),
        slideDownIn10: n(c + "," + w, "0.367s", l),
        slideDownIn20: n(c + "," + x, "0.367s", l),
        slideRightOut10: n(f + "," + C, "0.367s", l),
        slideRightOut20: n(f + "," + k, "0.367s", l),
        slideRightOut40: n(f + "," + O, "0.367s", l),
        slideRightOut400: n(f + "," + N, "0.367s", l),
        slideLeftOut10: n(f + "," + I, "0.367s", l),
        slideLeftOut20: n(f + "," + P, "0.367s", l),
        slideLeftOut40: n(f + "," + F, "0.367s", l),
        slideLeftOut400: n(f + "," + E, "0.367s", l),
        slideUpOut10: n(f + "," + M, "0.367s", l),
        slideUpOut20: n(f + "," + T, "0.367s", l),
        slideDownOut10: n(f + "," + L, "0.367s", l),
        slideDownOut20: n(f + "," + j, "0.367s", l),
        scaleUpIn100: n(c + "," + D, "0.367s", l),
        scaleDownIn100: n(c + "," + R, "0.367s", l),
        scaleUpOut103: n(f + "," + W, "0.167s", u),
        scaleDownOut98: n(f + "," + A, "0.167s", u),
        fadeIn100: n(c, "0.167s", u),
        fadeIn200: n(c, "0.267s", u),
        fadeIn400: n(c, "0.367s", u),
        fadeIn500: n(c, "0.467s", u),
        fadeOut100: n(f, "0.167s", u),
        fadeOut200: n(f, "0.267s", u),
        fadeOut400: n(f, "0.367s", u),
        fadeOut500: n(f, "0.467s", u),
        rotate90deg: n(z, "0.1s", u),
        rotateN90deg: n(q, "0.1s", u)
    }
});
define("@uifabric/styling/lib/styles/DefaultPalette", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.DefaultPalette = {
        themeDarker: "#004578",
        themeDark: "#005a9e",
        themeDarkAlt: "#106ebe",
        themePrimary: "#0078d7",
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
        accent: "#0078d7",
        white: "#ffffff",
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
        blue: "#0078d7",
        blueLight: "#00bcf2",
        tealDark: "#004b50",
        teal: "#008272",
        tealLight: "#00b294",
        greenDark: "#004b1c",
        green: "#107c10",
        greenLight: "#bad80a"
    }
});
define("@uifabric/styling/lib/styles/DefaultFontStyles", ["require", "exports", "@uifabric/merge-styles/lib/index", "./fonts", "@uifabric/utilities/lib/language"], function(e, t, r, n, i) {
    "use strict";
    function a(e, t, n) {
        e = "'" + e + "'";
        r.fontFace({
            fontFamily: e,
            src: "url('" + t + ".woff2') format('woff2'),url('" + t + ".woff') format('woff')",
            fontWeight: n,
            fontStyle: "normal"
        })
    }
    function o(e, t, r, i) {
        void 0 === i && (i = "segoeui");
        var o = e + "/" + r + "/" + i;
        a(t, o + "-light", n.FontWeights.light);
        a(t, o + "-semilight", n.FontWeights.semilight);
        a(t, o + "-regular", n.FontWeights.regular);
        a(t, o + "-semibold", n.FontWeights.semibold)
    }
    function s(e) {
        if (e) {
            var t = e + "/fonts";
            o(t, n.LocalizedFontNames.Thai, "leelawadeeui-thai", "leelawadeeui");
            o(t, n.LocalizedFontNames.Arabic, "segoeui-arabic");
            o(t, n.LocalizedFontNames.Cyrillic, "segoeui-cyrillic");
            o(t, n.LocalizedFontNames.EastEuropean, "segoeui-easteuropean");
            o(t, n.LocalizedFontNames.Greek, "segoeui-greek");
            o(t, n.LocalizedFontNames.Hebrew, "segoeui-hebrew");
            o(t, n.LocalizedFontNames.Vietnamese, "segoeui-vietnamese");
            o(t, n.LocalizedFontNames.WestEuropean, "segoeui-westeuropean");
            o(t, n.LocalizedFontFamilies.Selawik, "selawik", "selawik");
            a("Leelawadee UI Web", t + "/leelawadeeui-thai/leelawadeeui-semilight", n.FontWeights.light);
            a("Leelawadee UI Web", t + "/leelawadeeui-thai/leelawadeeui-bold", n.FontWeights.semibold)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = "https://static2.sharepointonline.com/files/fabric/assets";
    t.DefaultFontStyles = n.createFontStyles(i.getLanguage());
    t.registerDefaultFontFaces = s;
    s(function() {
        var e = "undefined" != typeof window ? window : void 0
          , t = e ? e.FabricConfig : void 0;
        return t && void 0 !== t.fontBaseUrl ? t.fontBaseUrl : l
    }())
});
define("@uifabric/styling/lib/styles/fonts", ["require", "exports"], function(e, t) {
    "use strict";
    function r(e) {
        var t = o.WestEuropean;
        for (var r in l)
            if (l.hasOwnProperty(r) && e && 0 === r.indexOf(e)) {
                t = l[r];
                break
            }
        return t + ", " + a
    }
    function n(e, t, n) {
        return {
            fontFamily: r(n),
            MozOsxFontSmoothing: "grayscale",
            WebkitFontSmoothing: "antialiased",
            fontSize: e,
            fontWeight: t
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i, a = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif";
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
    }(i = t.LocalizedFontNames || (t.LocalizedFontNames = {}));
    var o;
    !function(e) {
        e.Arabic = "'" + i.Arabic + "'";
        e.ChineseSimplified = "'Microsoft Yahei', Verdana, Simsun";
        e.ChineseTraditional = "'Microsoft Jhenghei', Pmingliu";
        e.Cyrillic = "'" + i.Cyrillic + "'";
        e.EastEuropean = "'" + i.EastEuropean + "'";
        e.Greek = "'" + i.Greek + "'";
        e.Hebrew = "'" + i.Hebrew + "'";
        e.Hindi = "'Nirmala UI'";
        e.Japanese = "'Yu Gothic', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka";
        e.Korean = "'Malgun Gothic', Gulim";
        e.Selawik = "'" + i.Selawik + "'";
        e.Thai = "'Leelawadee UI Web', 'Kmer UI'";
        e.Vietnamese = "'" + i.Vietnamese + "'";
        e.WestEuropean = "'" + i.WestEuropean + "'"
    }(o = t.LocalizedFontFamilies || (t.LocalizedFontFamilies = {}));
    var s, l = {
        ar: o.Arabic,
        bg: o.Cyrillic,
        cs: o.EastEuropean,
        el: o.Greek,
        et: o.EastEuropean,
        he: o.Hebrew,
        hi: o.Hindi,
        hr: o.EastEuropean,
        hu: o.EastEuropean,
        ja: o.Japanese,
        kk: o.EastEuropean,
        ko: o.Korean,
        lt: o.EastEuropean,
        lv: o.EastEuropean,
        pl: o.EastEuropean,
        ru: o.Cyrillic,
        sk: o.EastEuropean,
        "sr-latn": o.EastEuropean,
        th: o.Thai,
        tr: o.EastEuropean,
        uk: o.Cyrillic,
        vi: o.Vietnamese,
        "zh-hans": o.ChineseSimplified,
        "zh-hant": o.ChineseTraditional
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
    }(s = t.FontSizes || (t.FontSizes = {}));
    var u;
    !function(e) {
        e.light = 100;
        e.semilight = 300;
        e.regular = 400;
        e.semibold = 600;
        e.bold = 700
    }(u = t.FontWeights || (t.FontWeights = {}));
    !function(e) {
        e.xSmall = "10px";
        e.small = "12px";
        e.medium = "16px";
        e.large = "20px"
    }(t.IconFontSizes || (t.IconFontSizes = {}));
    t.createFontStyles = function(e) {
        return {
            tiny: n(s.mini, u.semibold, e),
            xSmall: n(s.xSmall, u.regular, e),
            small: n(s.small, u.regular, e),
            smallPlus: n(s.smallPlus, u.regular, e),
            medium: n(s.medium, u.regular, e),
            mediumPlus: n(s.mediumPlus, u.regular, e),
            large: n(s.large, u.semilight, e),
            xLarge: n(s.xLarge, u.light, e),
            xxLarge: n(s.xxLarge, u.light, e),
            superLarge: n(s.superLarge, u.light, e),
            mega: n(s.mega, u.light, e)
        }
    }
});
define("@uifabric/utilities/lib/language", ["require", "exports", "./dom", "./localStorage"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i;
    t.getLanguage = function() {
        if (void 0 === i) {
            var e = r.getDocument()
              , t = n.getItem("language");
            null !== t && (i = t);
            void 0 === i && e && (i = e.documentElement.getAttribute("lang"));
            void 0 === i && (i = "en")
        }
        return i
    }
    ;
    t.setLanguage = function(e, t) {
        void 0 === t && (t = !1);
        var a = r.getDocument();
        a && a.documentElement.setAttribute("lang", e);
        t || n.setItem("language", e);
        i = e
    }
});
define("@uifabric/utilities/lib/dom", ["require", "exports"], function(e, t) {
    "use strict";
    function r(e) {
        var t;
        e && i(e) && (t = e._virtual.parent);
        return t
    }
    function n(e, t) {
        void 0 === t && (t = !0);
        return e && (t && r(e) || e.parentNode && e.parentNode)
    }
    function i(e) {
        return e && !!e._virtual
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.setVirtualParent = function(e, t) {
        var r = e
          , n = t;
        r._virtual || (r._virtual = {
            children: []
        });
        var i = r._virtual.parent;
        if (i && i !== t) {
            var a = i._virtual.children.indexOf(r);
            a > -1 && i._virtual.children.splice(a, 1)
        }
        r._virtual.parent = n || void 0;
        if (n) {
            n._virtual || (n._virtual = {
                children: []
            });
            n._virtual.children.push(r)
        }
    }
    ;
    t.getVirtualParent = r;
    t.getParent = n;
    t.getChildren = function(e, t) {
        void 0 === t && (t = !0);
        var r = [];
        if (e) {
            for (var n = 0; n < e.children.length; n++)
                r.push(e.children.item(n));
            t && i(e) && r.push.apply(r, e._virtual.children)
        }
        return r
    }
    ;
    t.elementContains = function(e, t, r) {
        void 0 === r && (r = !0);
        var i = !1;
        if (e && t)
            if (r) {
                i = !1;
                for (; t; ) {
                    var a = n(t);
                    if (a === e) {
                        i = !0;
                        break
                    }
                    t = a
                }
            } else
                e.contains && (i = e.contains(t));
        return i
    }
    ;
    var a = !1;
    t.setSSR = function(e) {
        a = e
    }
    ;
    t.getWindow = function(e) {
        return a || "undefined" == typeof window ? void 0 : e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window
    }
    ;
    t.getDocument = function(e) {
        return a || "undefined" == typeof document ? void 0 : e && e.ownerDocument ? e.ownerDocument : document
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
});
define("@uifabric/utilities/lib/localStorage", ["require", "exports"], function(e, t) {
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
define("@uifabric/styling/lib/styles/getFocusStyle", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.getFocusStyle = function(e, t, r) {
        void 0 === t && (t = 0);
        void 0 === r && (r = "relative");
        return {
            outline: "transparent",
            position: r,
            selectors: {
                "::-moz-focus-inner": {
                    border: "0"
                },
                ".ms-Fabric.is-focusVisible &:focus:after": {
                    content: '""',
                    position: "absolute",
                    left: t + 1,
                    top: t + 1,
                    bottom: t + 1,
                    right: t + 1,
                    border: "1px solid " + e.palette.white,
                    outline: "1px solid " + e.palette.neutralSecondary,
                    zIndex: 1
                }
            }
        }
    }
});
define("@uifabric/styling/lib/styles/hiddenContentStyle", ["require", "exports"], function(e, t) {
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
define("@uifabric/styling/lib/styles/theme", ["require", "exports", "tslib", "@uifabric/utilities/lib/Customizations", "./DefaultFontStyles", "./DefaultPalette", "@microsoft/load-themed-styles"], function(e, t, r, n, i, a, o) {
    "use strict";
    function s(e) {
        var t = r.__assign({}, a.DefaultPalette, e.palette);
        e.palette && e.palette.accent || (t.accent = t.themePrimary);
        return {
            palette: t,
            fonts: r.__assign({}, i.DefaultFontStyles, e.fonts),
            semanticColors: r.__assign({}, l(t, !!e.isInverted), e.semanticColors),
            isInverted: !!e.isInverted
        }
    }
    function l(e, t) {
        return {
            bodyBackground: e.white,
            bodyText: e.neutralPrimary,
            bodyTextChecked: e.black,
            bodySubtext: e.neutralSecondary,
            bodyDivider: e.neutralLight,
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
            inputBorderHovered: e.neutralPrimary,
            inputBackgroundChecked: e.themePrimary,
            inputBackgroundCheckedHovered: e.themeDarkAlt,
            inputForegroundChecked: e.white,
            inputFocusBorderAlt: e.themePrimary,
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
            listTextColor: e.neutralPrimary,
            listItemBackgroundHovered: e.neutralLighter,
            listItemBackgroundChecked: e.neutralLight,
            listItemBackgroundCheckedHovered: e.neutralQuaternaryAlt
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = {
        palette: a.DefaultPalette,
        semanticColors: l(a.DefaultPalette, !1),
        fonts: i.DefaultFontStyles,
        isInverted: !1
    };
    t.ThemeSettingName = "theme";
    if (!n.Customizations.getSettings([t.ThemeSettingName]).theme) {
        var c = "undefined" != typeof window ? window : void 0;
        c && c.FabricConfig && c.FabricConfig.theme && (u = s(c.FabricConfig.theme));
        n.Customizations.applySettings((f = {},
        f[t.ThemeSettingName] = u,
        f))
    }
    t.getTheme = function() {
        return u
    }
    ;
    t.loadTheme = function(e) {
        u = s(e);
        o.loadTheme(r.__assign({}, u.palette, u.semanticColors));
        n.Customizations.applySettings((i = {},
        i[t.ThemeSettingName] = u,
        i));
        return u;
        var i
    }
    ;
    t.createTheme = s;
    var f
});
define("@uifabric/utilities/lib/Customizations", ["require", "exports", "tslib", "./GlobalSettings", "./EventGroup"], function(e, t, r, n, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = {
        settings: {},
        scopedSettings: {}
    }
      , o = n.GlobalSettings.getValue("customizations", {
        settings: {},
        scopedSettings: {}
    })
      , s = new i.EventGroup(o)
      , l = function() {
        function e() {}
        e.reset = function() {
            o.settings = {};
            o.scopedSettings = {}
        }
        ;
        e.applySettings = function(t) {
            o.settings = r.__assign({}, o.settings, t);
            e._raiseChange()
        }
        ;
        e.applyScopedSettings = function(t, n) {
            o.scopedSettings[t] = r.__assign({}, o.scopedSettings[t], n);
            e._raiseChange()
        }
        ;
        e.getSettings = function(e, t, r) {
            void 0 === r && (r = a);
            for (var n = {}, i = t && r.scopedSettings[t] || {}, s = t && o.scopedSettings[t] || {}, l = 0, u = e; l < u.length; l++) {
                var c = u[l];
                n[c] = i[c] || r.settings[c] || s[c] || o.settings[c]
            }
            return n
        }
        ;
        e.observe = function(e) {
            s.on(o, "change", e)
        }
        ;
        e.unobserve = function(e) {
            s.off(o, "change", e)
        }
        ;
        e._raiseChange = function() {
            s.raise("change")
        }
        ;
        return e
    }();
    t.Customizations = l
});
define("@uifabric/utilities/lib/EventGroup", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
        function e(t) {
            this._id = e._uniqueId++;
            this._parent = t;
            this._eventRecords = []
        }
        e.raise = function(t, r, n, i) {
            var a;
            if (e._isElement(t)) {
                if (document.createEvent) {
                    var o = document.createEvent("HTMLEvents");
                    o.initEvent(r, i || !1, !0);
                    o.args = n;
                    a = t.dispatchEvent(o)
                } else if (document.createEventObject) {
                    var s = document.createEventObject(n);
                    t.fireEvent("on" + r, s)
                }
            } else
                for (; t && !1 !== a; ) {
                    var l = t.__events__
                      , u = l ? l[r] : null;
                    if (u)
                        for (var c in u)
                            if (u.hasOwnProperty(c))
                                for (var f = u[c], d = 0; !1 !== a && d < f.length; d++) {
                                    var g = f[d];
                                    g.objectCallback && (a = g.objectCallback.call(g.parent, n))
                                }
                    t = i ? t.parent : null
                }
            return a
        }
        ;
        e.isObserved = function(e, t) {
            var r = e && e.__events__;
            return !!r && !!r[t]
        }
        ;
        e.isDeclared = function(e, t) {
            var r = e && e.__declaredEvents;
            return !!r && !!r[t]
        }
        ;
        e.stopPropagation = function(e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        }
        ;
        e._isElement = function(e) {
            return !!e && (!!e.addEventListener || "undefined" != typeof HTMLElement && e instanceof HTMLElement)
        }
        ;
        e.prototype.dispose = function() {
            if (!this._isDisposed) {
                this._isDisposed = !0;
                this.off();
                this._parent = null
            }
        }
        ;
        e.prototype.onAll = function(e, t, r) {
            for (var n in t)
                t.hasOwnProperty(n) && this.on(e, n, t[n], r)
        }
        ;
        e.prototype.on = function(t, r, n, i) {
            var a = this;
            if (r.indexOf(",") > -1)
                for (var o = r.split(/[ ,]+/), s = 0; s < o.length; s++)
                    this.on(t, o[s], n, i);
            else {
                var l = this._parent
                  , u = {
                    target: t,
                    eventName: r,
                    parent: l,
                    callback: n,
                    useCapture: i || !1
                };
                (o = t.__events__ = t.__events__ || {})[r] = o[r] || {
                    count: 0
                };
                o[r][this._id] = o[r][this._id] || [];
                o[r][this._id].push(u);
                o[r].count++;
                if (e._isElement(t)) {
                    var c = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        if (!a._isDisposed) {
                            var r;
                            try {
                                if (!1 === (r = n.apply(l, e)) && e[0]) {
                                    var i = e[0];
                                    i.preventDefault && i.preventDefault();
                                    i.stopPropagation && i.stopPropagation();
                                    i.cancelBubble = !0
                                }
                            } catch (i) {}
                            return r
                        }
                    };
                    u.elementCallback = c;
                    t.addEventListener ? t.addEventListener(r, c, i) : t.attachEvent && t.attachEvent("on" + r, c)
                } else {
                    u.objectCallback = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        if (!a._isDisposed)
                            return n.apply(l, e)
                    }
                }
                this._eventRecords.push(u)
            }
        }
        ;
        e.prototype.off = function(e, t, r, n) {
            for (var i = 0; i < this._eventRecords.length; i++) {
                var a = this._eventRecords[i];
                if (!(e && e !== a.target || t && t !== a.eventName || r && r !== a.callback || "boolean" == typeof n && n !== a.useCapture)) {
                    var o = a.target.__events__
                      , s = o[a.eventName]
                      , l = s ? s[this._id] : null;
                    if (l) {
                        if (1 !== l.length && r) {
                            s.count--;
                            l.splice(l.indexOf(a), 1)
                        } else {
                            s.count -= l.length;
                            delete o[a.eventName][this._id]
                        }
                        s.count || delete o[a.eventName]
                    }
                    a.elementCallback && (a.target.removeEventListener ? a.target.removeEventListener(a.eventName, a.elementCallback, a.useCapture) : a.target.detachEvent && a.target.detachEvent("on" + a.eventName, a.elementCallback));
                    this._eventRecords.splice(i--, 1)
                }
            }
        }
        ;
        e.prototype.raise = function(t, r, n) {
            return e.raise(this._parent, t, r, n)
        }
        ;
        e.prototype.declare = function(e) {
            var t = this._parent.__declaredEvents = this._parent.__declaredEvents || {};
            if ("string" == typeof e)
                t[e] = !0;
            else
                for (var r = 0; r < e.length; r++)
                    t[e[r]] = !0
        }
        ;
        e._uniqueId = 0;
        return e
    }();
    t.EventGroup = r
});
var __assign = this && this.__assign || Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
        t = arguments[r];
        for (var i in t)
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
    }
    return e
}
;
define("@microsoft/load-themed-styles", ["require", "exports"], function(e, t) {
    "use strict";
    function r(e) {
        var t = _();
        e();
        var r = _();
        y.perf.duration += r - t
    }
    function n() {
        r(function() {
            var e = y.runState.buffer.slice();
            y.runState.buffer = [];
            var t = [].concat.apply([], e);
            t.length > 0 && a(t)
        })
    }
    function i() {
        return setTimeout(function() {
            y.runState.flushTimer = 0;
            n()
        }, 0)
    }
    function a(e, t) {
        y.loadStyles ? y.loadStyles(c(e).styleString, e) : m ? g(e, t) : d(e)
    }
    function o(e) {
        void 0 === e && (e = 3);
        if (3 === e || 2 === e) {
            s(y.registeredStyles);
            y.registeredStyles = []
        }
        if (3 === e || 1 === e) {
            s(y.registeredThemableStyles);
            y.registeredThemableStyles = []
        }
    }
    function s(e) {
        e.forEach(function(e) {
            var t = e && e.styleElement;
            t && t.parentElement && t.parentElement.removeChild(t)
        })
    }
    function l() {
        if (y.theme) {
            for (var e = [], t = 0, r = y.registeredThemableStyles; t < r.length; t++) {
                var n = r[t];
                e.push(n.themableStyle)
            }
            if (e.length > 0) {
                o(1);
                a([].concat.apply([], e))
            }
        }
    }
    function u(e) {
        e && (e = c(f(e)).styleString);
        return e
    }
    function c(e) {
        var t = y.theme
          , r = !1;
        return {
            styleString: (e || []).map(function(e) {
                var n = e.theme;
                if (n) {
                    r = !0;
                    var i = t ? t[n] : void 0
                      , a = e.defaultValue || "inherit";
                    (t && !i && console,
                    1) || console.warn('Theming value not provided for "' + n + '". Falling back to "' + a + '".');
                    return i || a
                }
                return e.rawString
            }).join(""),
            themable: r
        }
    }
    function f(e) {
        var t = [];
        if (e) {
            for (var r = 0, n = void 0; n = v.exec(e); ) {
                var i = n.index;
                i > r && t.push({
                    rawString: e.substring(r, i)
                });
                t.push({
                    theme: n[1],
                    defaultValue: n[2]
                });
                r = v.lastIndex
            }
            t.push({
                rawString: e.substring(r)
            })
        }
        return t
    }
    function d(e) {
        var t = document.getElementsByTagName("head")[0]
          , r = document.createElement("style")
          , n = c(e)
          , i = n.styleString
          , a = n.themable;
        r.type = "text/css";
        r.appendChild(document.createTextNode(i));
        y.perf.count++;
        t.appendChild(r);
        var o = {
            styleElement: r,
            themableStyle: e
        };
        a ? y.registeredThemableStyles.push(o) : y.registeredStyles.push(o)
    }
    function g(e, t) {
        var r = document.getElementsByTagName("head")[0]
          , n = y.registeredStyles
          , i = y.lastStyleElement
          , a = i ? i.styleSheet : void 0
          , o = a ? a.cssText : ""
          , s = n[n.length - 1]
          , l = c(e).styleString;
        if (!i || o.length + l.length > b) {
            (i = document.createElement("style")).type = "text/css";
            if (t) {
                r.replaceChild(i, t.styleElement);
                t.styleElement = i
            } else
                r.appendChild(i);
            if (!t) {
                s = {
                    styleElement: i,
                    themableStyle: e
                };
                n.push(s)
            }
        }
        i.styleSheet.cssText += u(l);
        Array.prototype.push.apply(s.themableStyle, e);
        y.lastStyleElement = i
    }
    function p() {
        var e = !1;
        if ("undefined" != typeof document) {
            var t = document.createElement("style");
            t.type = "text/css";
            e = !!t.styleSheet
        }
        return e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var m, h = "undefined" == typeof window ? global : window, y = function() {
        var e = h.__themeState__ || {
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
        h.__themeState__ = e;
        return e
    }(), v = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g, b = 1e4, _ = function() {
        return "undefined" != typeof performance && performance.now ? performance.now() : Date.now()
    };
    t.loadStyles = function(e, t) {
        void 0 === t && (t = !1);
        r(function() {
            var r = Array.isArray(e) ? e : f(e);
            void 0 === m && (m = p());
            var n = y.runState
              , o = n.mode
              , s = n.buffer
              , l = n.flushTimer;
            if (t || 1 === o) {
                s.push(r);
                l || (y.runState.flushTimer = i())
            } else
                a(r)
        })
    }
    ;
    t.configureLoadStyles = function(e) {
        y.loadStyles = e
    }
    ;
    t.configureRunMode = function(e) {
        y.runState.mode = e
    }
    ;
    t.flush = n;
    t.loadTheme = function(e) {
        y.theme = e;
        l()
    }
    ;
    t.clearStyles = o;
    t.detokenize = u;
    t.splitStyles = f
});
define("@uifabric/styling/lib/styles/CommonStyles", ["require", "exports"], function(e, t) {
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
    t.ScreenWidthMaxXXLarge = t.ScreenWidthMinXXXLarge - 1
});
define("@uifabric/styling/lib/classNames/FontClassNames", ["require", "exports", "../utilities/index", "../styles/index"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.FontClassNames = r.buildClassMap(n.DefaultFontStyles)
});
define("@uifabric/styling/lib/classNames/ColorClassNames", ["require", "exports", "@uifabric/merge-styles/lib/index", "../styles/DefaultPalette", "../styles/index"], function(e, t, r, n, i) {
    "use strict";
    function a(e, t, n, a, o) {
        Object.defineProperty(e, t + n, {
            get: function() {
                var e = (n = {},
                n[o] = i.getTheme().palette[t],
                n);
                return r.mergeStyles(a ? {
                    selectors: {
                        ":hover": e
                    }
                } : e).toString();
                var n
            },
            enumerable: !0,
            configurable: !0
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.ColorClassNames = {};
    for (var o in n.DefaultPalette)
        if (n.DefaultPalette.hasOwnProperty(o)) {
            a(t.ColorClassNames, o, "", !1, "color");
            a(t.ColorClassNames, o, "Hover", !0, "color");
            a(t.ColorClassNames, o, "Background", !1, "background");
            a(t.ColorClassNames, o, "BackgroundHover", !0, "background");
            a(t.ColorClassNames, o, "Border", !1, "borderColor");
            a(t.ColorClassNames, o, "BorderHover", !0, "borderColor")
        }
});
define("@ms/odsp-shared-react/lib/components/CustomFormatter/CustomFormatter.scss", ["require", "exports", "@microsoft/load-themed-styles", "odsp-next/providers/theming/ThemeInitializer"], function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.loadStyles([{
        rawString: ".sp-field-customFormatter{min-height:inherit;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.sp-field-customFormatBackground-margin{margin:-10px 0}.sp-field-severity--good{background-color:"
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
        defaultValue: "#0078d7"
    }, {
        rawString: ";color:"
    }, {
        theme: "neutralPrimary",
        defaultValue: "#333333"
    }, {
        rawString: ";padding:0 8px}.sp-field-trending--up{color:"
    }, {
        theme: "green",
        defaultValue: "#107c10"
    }, {
        rawString: "}.sp-field-trending--down{color:"
    }, {
        theme: "error",
        defaultValue: "#a80000"
    }, {
        rawString: "}.sp-field-quickAction{font-size:14px;font-weight:400;padding:0}[dir=ltr] .sp-field-quickAction{padding-left:8px}[dir=rtl] .sp-field-quickAction{padding-right:8px}"
    }])
});
