define("a", ["require", "exports", "am", "al", "ah", "d", "b"], function(e, t, r, o, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    n.initializeIcons(void 0, {
        disableWarnings: !0
    });
    var a = function(e) {
        r.__extends(t, e);
        function t(t) {
            var i = t.pageContextInfo
              , n = r.__rest(t, ["pageContextInfo"])
              , a = t.errorStrings
              , l = void 0 === a ? o.default : a
              , s = t.userEmail
              , c = void 0 === s ? i && i.userEmail : s;
            return e.call(this, r.__assign({}, n, {
                errorStrings: l,
                userEmail: c
            })) || this
        }
        return t
    }(i.CustomFormatter);
    t.CustomFormatter = a
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
    var t = "object" == typeof global ? global : "object" == typeof self ? self : "object" == typeof this ? this : {};
    "function" == typeof define && define.amd ? define("am", ["exports"], function(o) {
        e(r(t, r(o)))
    }) : "object" == typeof module && "object" == typeof module.exports ? e(r(t, r(module.exports))) : e(r(t));
    function r(e, t) {
        return function(r, o) {
            return e[r] = t ? t(r, o) : o
        }
    }
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
        t(e, r);
        function o() {
            this.constructor = e
        }
        e.prototype = null === r ? Object.create(r) : (o.prototype = r.prototype,
        new o)
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
            for (var l = e.length - 1; l >= 0; l--)
                (i = e[l]) && (a = (n < 3 ? i(a) : n > 3 ? i(t, r, a) : i(t, r)) || a);
        return n > 3 && a && Object.defineProperty(t, r, a),
        a
    }
    ;
    __param = function(e, t) {
        return function(r, o) {
            t(r, o, e)
        }
    }
    ;
    __metadata = function(e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(e, t)
    }
    ;
    __awaiter = function(e, t, r, o) {
        return new (r || (r = Promise))(function(i, n) {
            function a(e) {
                try {
                    s(o.next(e))
                } catch (e) {
                    n(e)
                }
            }
            function l(e) {
                try {
                    s(o.throw(e))
                } catch (e) {
                    n(e)
                }
            }
            function s(e) {
                e.done ? i(e.value) : new r(function(t) {
                    t(e.value)
                }
                ).then(a, l)
            }
            s((o = o.apply(e, t || [])).next())
        }
        )
    }
    ;
    __generator = function(e, t) {
        var r, o, i, n, a = {
            label: 0,
            sent: function() {
                if (1 & i[0])
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        };
        return n = {
            next: l(0),
            throw: l(1),
            return: l(2)
        },
        "function" == typeof Symbol && (n[Symbol.iterator] = function() {
            return this
        }
        ),
        n;
        function l(n) {
            return function(l) {
                return function(n) {
                    if (r)
                        throw new TypeError("Generator is already executing.");
                    for (; a; )
                        try {
                            if (r = 1,
                            o && (i = o[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(i = i.call(o, n[1])).done)
                                return i;
                            (o = 0,
                            i) && (n = [0, i.value]);
                            switch (n[0]) {
                            case 0:
                            case 1:
                                i = n;
                                break;
                            case 4:
                                a.label++;
                                return {
                                    value: n[1],
                                    done: !1
                                };
                            case 5:
                                a.label++;
                                o = n[1];
                                n = [0];
                                continue;
                            case 7:
                                n = a.ops.pop();
                                a.trys.pop();
                                continue;
                            default:
                                if (!(i = (i = a.trys).length > 0 && i[i.length - 1]) && (6 === n[0] || 2 === n[0])) {
                                    a = 0;
                                    continue
                                }
                                if (3 === n[0] && (!i || n[1] > i[0] && n[1] < i[3])) {
                                    a.label = n[1];
                                    break
                                }
                                if (6 === n[0] && a.label < i[1]) {
                                    a.label = i[1];
                                    i = n;
                                    break
                                }
                                if (i && a.label < i[2]) {
                                    a.label = i[2];
                                    a.ops.push(n);
                                    break
                                }
                                i[2] && a.ops.pop();
                                a.trys.pop();
                                continue
                            }
                            n = t.call(e, a)
                        } catch (e) {
                            n = [6, e];
                            o = 0
                        } finally {
                            r = i = 0
                        }
                    if (5 & n[0])
                        throw n[1];
                    return {
                        value: n[0] ? n[1] : void 0,
                        done: !0
                    }
                }([n, l])
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
            for (; (void 0 === t || t-- > 0) && !(o = n.next()).done; )
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
        var o, i = r.apply(e, t || []), n = [];
        return o = {},
        a("next"),
        a("throw"),
        a("return"),
        o[Symbol.asyncIterator] = function() {
            return this
        }
        ,
        o;
        function a(e) {
            i[e] && (o[e] = function(t) {
                return new Promise(function(r, o) {
                    n.push([e, t, r, o]) > 1 || l(e, t)
                }
                )
            }
            )
        }
        function l(e, t) {
            try {
                (r = i[e](t)).value instanceof __await ? Promise.resolve(r.value.v).then(s, c) : u(n[0][2], r)
            } catch (e) {
                u(n[0][3], e)
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
            n.shift(),
            n.length) && l(n[0][0], n[0][1])
        }
    }
    ;
    __asyncDelegator = function(e) {
        var t, r;
        return t = {},
        o("next"),
        o("throw", function(e) {
            throw e
        }),
        o("return"),
        t[Symbol.iterator] = function() {
            return this
        }
        ,
        t;
        function o(o, i) {
            e[o] && (t[o] = function(t) {
                return (r = !r) ? {
                    value: __await(e[o](t)),
                    done: "return" === o
                } : i ? i(t) : t
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
define("ah", ["require", "exports", "am", "ak", "aj", "ai"], function(e, t, r, o, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, l, s, c, u, d = "toString()", f = "Number()", g = "toLocaleString()", p = "toLocaleDateString()", m = "toLocaleTimeString()", h = ((a = {})[g] = !0,
    a[p] = !0,
    a[m] = !0,
    a), v = r.__assign(((l = {})[d] = !0,
    l.cos = !0,
    l.sin = !0,
    l["Date()"] = !0,
    l[f] = !0,
    l), h), y = r.__assign({}, v, ((s = {})["=="] = !0,
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
    s["||"] = !0,
    s["&&"] = !0,
    s)), S = {
        div: !0,
        span: !0,
        a: !0,
        img: !0,
        svg: !0,
        button: !0,
        path: !0
    }, b = "iconName", _ = ((c = {
        href: !0,
        rel: !0,
        src: !0,
        class: !0,
        target: !0,
        title: !0,
        role: !0
    })[b] = !0,
    c.d = !0,
    c.alt = !0,
    c), C = {
        defaultClick: !0,
        executeFlow: !0
    }, w = {
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
    }, L = ["http://", "https://", "mailto:"], F = "Number", k = "DateTime", x = "User", M = "Boolean", P = "Lookup", I = "Image", O = "Hyperlink", T = "_IsRecord", D = ((u = {})[F] = !0,
    u.Text = !0,
    u.Title = !0,
    u[k] = !0,
    u[x] = !0,
    u.Choice = !0,
    u[M] = !0,
    u.Note = !0,
    u[I] = !0,
    u[O] = !0,
    u[P] = !0,
    u[T] = !0,
    u), A = "@currentField", R = function() {
        function e(e) {
            this._params = e;
            this._errorStrings = e.errorStrings || {}
        }
        e.prototype.evaluate = function() {
            var e, t = [];
            try {
                this._cfr = JSON.parse(this._params.fieldRendererFormat);
                e = this._cfr;
                this._createElementHtml(e, t, 0);
                if (!this._fAria) {
                    this._errorStrings.ariaError;
                    0
                }
            } catch (e) {
                var r = "Failure: " + ("string" == typeof e ? e : e.message);
                0;
                t = [];
                this._cfr && this._cfr.debugMode && t.push(i.encodeText(r));
                this._error = r
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
            var o = e.elmType.toLowerCase()
              , i = "a" === o;
            if (!S[o]) {
                var a = "";
                for (var l in S)
                    a += l + " ";
                this._err("elmTypeInvalid", o, a)
            }
            t.push("<" + o + " ");
            if (e.style) {
                t.push('style="');
                for (var s in e.style)
                    this._createStyleAttr(s, e.style[s], t);
                t.push('" ')
            }
            var c = e.attributes;
            if (0 === r) {
                c || (c = {});
                if (c.class) {
                    var u = c.class;
                    u === String(u) ? c.class = "sp-field-customFormatter " + u : c.class = {
                        operator: "+",
                        operands: ["sp-field-customFormatter ", u]
                    }
                } else
                    c.class = "sp-field-customFormatter"
            }
            if (c) {
                if (i) {
                    var d = c.rel;
                    c.rel = "noopener noreferrer " + (d || "")
                }
                c[b] && !c.class && (c.class = "");
                for (var f in c)
                    if (this._isValidAttr(f)) {
                        t.push(" " + f + '="');
                        var g = c[f];
                        this._createValue(g, t, "href" === f || "src" === f);
                        if ("class" === f.toLowerCase()) {
                            var p = c[b];
                            if (p) {
                                t.push(" ");
                                var m = [];
                                this._createValue(p, m, !1);
                                m[0] && t.push(n.getIconClassName(m[0]))
                            }
                        }
                        t.push('" ')
                    } else
                        0
            }
            if ("button" === o && e.customRowAction && C[e.customRowAction.action]) {
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
            var t = Boolean(_[e])
              , r = Boolean(new RegExp("^aria-[a-z]+$","g").exec(e));
            r && (this._fAria = !0);
            return t || r
        }
        ;
        e.prototype._createStyleAttr = function(e, t, r) {
            if (w[e]) {
                r.push(e + ":");
                this._createValue(t, r, !1, !0);
                r.push(";")
            } else
                0
        }
        ;
        e.prototype._createValue = function(e, t, r, o, n) {
            var a = this._eval(e, n);
            null == a && (a = "");
            var l = "<br/>"
              , s = a instanceof Date ? a.toLocaleString() : a.toString()
              , c = i.encodeText(s);
            if (r) {
                this._validateUrl(c) || this._err("invalidProtocol");
                l = "%0D%0A"
            }
            o && !this._validateStyleValue(c) && this._err("invalidStyleValue", c);
            c = c.replace(/\r\n|\r|\n/g, l);
            t.push(c)
        }
        ;
        e.prototype._validateStyleValue = function(e) {
            for (var t = ["(", ":", "&", ";", "!"], r = "rgba(" === (e = e.toLowerCase()).substr(0, 5) ? 5 : 0, o = 0; o < t.length; o++)
                if (e.indexOf(t[o], r) >= 0)
                    return !1;
            return !0
        }
        ;
        e.prototype._validateUrl = function(e) {
            if (!e)
                return !0;
            e = e.trim().toLowerCase();
            for (var t = 0; t < L.length; t++) {
                var r = L[t];
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
                    if (0 === e.indexOf(A)) {
                        var r = this._params.currentFieldName;
                        if (e === A)
                            return t && this._params.rowSchema && r && (this._params.rowSchema[r] === k || this._params.rowSchema[r] === T) ? this._params.row[r] : this._evalJsonPath(this._params.row, r || "");
                        if (e.indexOf(".") !== A.length)
                            return e;
                        var o = r + e.substr(A.length);
                        return this._evalJsonPath(this._params.row, o)
                    }
                    if ("@me" === e && this._params.userEmail)
                        return this._params.userEmail;
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
                if (!y[a]) {
                    var s = "";
                    for (var c in y)
                        s += c + " ";
                    this._err("operatorInvalid", a, s, JSON.stringify(n))
                }
                void 0 !== l && void 0 !== l[0] || this._err("operandMissing", JSON.stringify(n));
                if (!v[a])
                    return ":" === a || "?" === a ? this._ternaryEval(n, this._eval(l[1]), this._eval(l[2]), this._eval(l[0])) : "+" === a || "*" === a || "||" === a || "&&" === a ? this._multiOpEval(n) : this._twoOpEval(n, this._eval(l[0]), a, this._eval(l[1]));
                1 !== l.length && this._err("operandNOnly", 1..toString(), JSON.stringify(e));
                if (a === d)
                    return this._toString(this._eval(l[0]));
                if (a === f) {
                    var u = this._eval(l[0]);
                    return Number(u)
                }
                if ("Date()" === a) {
                    u = this._eval(l[0]);
                    return new Date(u)
                }
                if ("cos" === a)
                    return Math.cos(this._eval(l[0]));
                if ("sin" === a)
                    return Math.sin(this._eval(l[0]));
                if (h[a]) {
                    u = this._eval(l[0]);
                    if (!Boolean(u))
                        return "";
                    var S = new Date(u);
                    if (a === g)
                        return S.toLocaleString();
                    if (a === p)
                        return S.toLocaleDateString();
                    if (a === m)
                        return S.toLocaleTimeString()
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
                return t >= o;
            if ("<=" === r)
                return t <= o;
            if (">" === r)
                return t > o;
            if ("<" === r)
                return t < o;
            if ("||" === r)
                return t || o;
            if ("&&" === r)
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
                if (a === F || a === k || a === M || a === T) {
                    var l = a === M ? ".value" : "."
                      , s = i[0] + l;
                    null != o[s] && void 0 !== o[s] && (i[0] = s)
                }
                if ((a === O || a === I) && 2 === r && "desc" === i[1])
                    return o[t];
                n && a && (D[a] || this._err("unsupportedType", t));
                for (var c = a === x, u = a === P, d = 0; d < r; d++) {
                    o = o[i[d]];
                    (c || u) && 0 === d && this.isArray(o) && (o = o[0])
                }
            } catch (e) {
                0;
                return null
            }
            if (void 0 === o) {
                var f = t + " was not found on the data object.";
                0;
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
            case "Text":
            case "Title":
            case "Note":
            case "Choice":
            case I:
            case O:
            case P:
            case T:
                return e;
            case M:
                return "1" === e || "0" !== e && e;
            case F:
                var o = void 0;
                o = "string" == typeof e ? parseFloat(e.replace(/,/g, "")) : Number(e);
                return isNaN(o) ? "" : o;
            case k:
                return "string" == typeof e ? Boolean(e) ? new Date(e) : null : e;
            case x:
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
            var i = "";
            if (this._errorStrings && e && this._errorStrings[e]) {
                var n = this._errorStrings[e];
                i = o.format.apply(o, [n].concat(t))
            } else
                e && (i = "FieldRenderer Error: " + e);
            throw i
        }
        ;
        return e
    }();
    t.CustomFormatter = R
});
define("ak", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = /\{(\d+)\}/g;
    t.format = function(e) {
        for (var t = [], o = 1; o < arguments.length; o++)
            t[o - 1] = arguments[o];
        return e.replace(r, function(e, r) {
            var o = t[r];
            return null === o ? "" : o
        })
    }
    ;
    t.equalsCaseInsensitive = function(e, t) {
        return e && t ? e.toUpperCase() === t.toUpperCase() : e === t
    }
});
define("aj", ["require", "exports"], function(e, t) {
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
define("ai", ["require", "exports", "am", "f"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.__exportStar(o, t)
});
define("f", ["require", "exports", "am", "Q", "B", "v", "g"], function(e, t, r, o, i, n, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.__exportStar(o, t);
    r.__exportStar(i, t);
    r.__exportStar(n, t);
    r.__exportStar(a, t)
});
define("Q", ["require", "exports", "T", "S", "R"], function(e, t, r, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.AnimationClassNames = r.AnimationClassNames;
    t.FontClassNames = o.FontClassNames;
    t.ColorClassNames = i.ColorClassNames
});
define("T", ["require", "exports", "v", "B"], function(e, t, r, o) {
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
define("A", ["require", "exports", "g"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.buildClassMap = function(e) {
        var t = {}
          , o = function(o) {
            if (e.hasOwnProperty(o)) {
                var i;
                Object.defineProperty(t, o, {
                    get: function() {
                        void 0 === i && (i = r.mergeStyles(e[o]).toString());
                        return i
                    },
                    enumerable: !0,
                    configurable: !0
                })
            }
        };
        for (var i in e)
            o(i);
        return t
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
define("u", ["require", "exports", "k", "t"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.mergeStyles = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var i = o.extractStyleParts(e)
          , n = i.classes
          , a = i.objects;
        a.length && n.push(r.styleToClassName(a));
        return n.join(" ")
    }
});
define("k", ["require", "exports", "i", "p", "n", "m", "l"], function(e, t, r, o, i, n, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = "displayName";
    function s(e, t, r) {
        var o = "string" == typeof r ? r.split(" ") : [r];
        e[t + "Top"] = o[0];
        e[t + "Right"] = o[1] || o[0];
        e[t + "Bottom"] = o[2] || o[0];
        e[t + "Left"] = o[3] || o[1] || o[0]
    }
    function c(e) {
        if (!e)
            return "";
        var t = [];
        for (var r in e)
            e.hasOwnProperty(r) && r !== l && void 0 !== e[r] && t.push(r, e[r]);
        for (var s = 0; s < t.length; s += 2) {
            o.kebabRules(t, s);
            n.provideUnits(t, s);
            a.rtlifyRules(t, s);
            i.prefixRules(t, s)
        }
        for (s = 1; s < t.length; s += 4)
            t.splice(s, 1, ":", t[s], ";");
        return t.join("")
    }
    t.serializeRuleEntries = c;
    function u() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var o, i, n = function e(t, o, i) {
            void 0 === o && (o = {
                __order: []
            });
            void 0 === i && (i = "&");
            var n = r.Stylesheet.getInstance()
              , a = o[i];
            if (!a) {
                a = {};
                o[i] = a;
                o.__order.push(i)
            }
            for (var l = 0, c = t; l < c.length; l++) {
                var u = c[l];
                if ("string" == typeof u) {
                    var d = n.argsFromClassName(u);
                    d && e(d, o, i)
                } else if (Array.isArray(u))
                    e(u, o, i);
                else
                    for (var f in u)
                        if ("selectors" === f) {
                            var g = u.selectors;
                            for (var p in g)
                                if (g.hasOwnProperty(p)) {
                                    var m = g[p];
                                    0 === p.indexOf(":global(") ? p = p.replace(/:global\(|\)$/g, "") : 0 === p.indexOf("@media") ? p = p + "{" + i : 0 === p.indexOf(":") ? p = i + p : p.indexOf("&") < 0 && (p = i + " " + p);
                                    e([m], o, p)
                                }
                        } else
                            "margin" === f || "padding" === f ? s(a, f, u[f]) : a[f] = u[f]
            }
            return o
        }(e), a = function(e) {
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
        }(n);
        if (a) {
            var l = r.Stylesheet.getInstance()
              , u = {
                className: l.classNameFromKey(a),
                key: a,
                args: e
            };
            if (!u.className) {
                u.className = l.getClassName((i = (o = n) && o["&"]) ? i.displayName : void 0);
                for (var d = [], f = 0, g = n.__order; f < g.length; f++) {
                    var p = g[f];
                    d.push(p, c(n[p]))
                }
                u.rulesToInsert = d
            }
            return u
        }
    }
    t.styleToRegistration = u;
    function d(e, t) {
        var o = r.Stylesheet.getInstance()
          , i = e.className
          , n = e.key
          , a = e.args
          , l = e.rulesToInsert;
        if (l) {
            for (var s = 0; s < l.length; s += 2) {
                var c = l[s + 1];
                if (c) {
                    var u = l[s]
                      , d = (u = u.replace(/(&)|\$([\w-]+)\b/g, function(r, o, i) {
                        return o ? "." + e.className : i ? "." + (t && t[i] || i) : ""
                    })) + "{" + c + "}" + (0 === u.indexOf("@media") ? "}" : "");
                    o.insertRule(d)
                }
            }
            o.cacheClassName(i, n, a, l)
        }
    }
    t.applyRegistration = d;
    t.styleToClassName = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = u.apply(void 0, e);
        if (r) {
            d(r);
            return r.className
        }
        return ""
    }
});
define("i", ["require", "exports", "am"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    !function(e) {
        e[e.none = 0] = "none";
        e[e.insertNode = 1] = "insertNode";
        e[e.appendChild = 2] = "appendChild"
    }(t.InjectionMode || (t.InjectionMode = {}));
    var o, i = "__stylesheet__", n = function() {
        function e(e) {
            this._config = r.__assign({
                injectionMode: 1,
                defaultPrefix: "css"
            }, e);
            this.reset()
        }
        e.getInstance = function() {
            var t = "undefined" != typeof window ? window : {};
            if (!(o = t[i])) {
                var r = t && t.FabricConfig || {};
                o = t[i] = new e(r.mergeStyles)
            }
            return o
        }
        ;
        e.prototype.setConfig = function(e) {
            this._config = r.__assign({}, this._config, e)
        }
        ;
        e.prototype.getClassName = function(e) {
            return (e || this._config.defaultPrefix) + "-" + this._counter++
        }
        ;
        e.prototype.cacheClassName = function(e, t, r, o) {
            this._keyToClassName[t] = e;
            this._classNameToArgs[e] = {
                args: r,
                rules: o
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
                a(e);
                break;
            default:
                this._rules.push(e)
            }
            this._config.onInsertRule && this._config.onInsertRule(e)
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
            this._styleElement || "undefined" == typeof document || (this._styleElement = a());
            return this._styleElement
        }
        ;
        return e
    }();
    t.Stylesheet = n;
    function a(e) {
        var t = document.createElement("style");
        t.setAttribute("data-merge-styles", "true");
        t.type = "text/css";
        e && t.appendChild(document.createTextNode(e));
        document.head.appendChild(t);
        return t
    }
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
define("n", ["require", "exports", "o"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = {
        "user-select": 1
    };
    t.prefixRules = function(e, t) {
        var i = r.getVendorSettings()
          , n = e[t];
        if (o[n]) {
            var a = e[t + 1];
            if (o[n]) {
                i.isWebkit && e.push("-webkit-" + n, a);
                i.isMoz && e.push("-moz-" + n, a);
                i.isMs && e.push("-ms-" + n, a);
                i.isOpera && e.push("-o-" + n, a)
            }
        }
    }
});
define("o", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r;
    t.getVendorSettings = function() {
        if (!r) {
            var e = "undefined" != typeof document ? document : void 0
              , t = "undefined" != typeof navigator ? navigator : void 0
              , o = t ? t.userAgent.toLowerCase() : void 0;
            r = e ? {
                isWebkit: !!(e && "WebkitAppearance"in e.documentElement.style),
                isMoz: !!(o && o.indexOf("firefox") > -1),
                isOpera: !!(o && o.indexOf("opera") > -1),
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
define("m", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = ["column-count", "font-weight", "flex-basis", "flex", "flex-grow", "flex-shrink", "fill-opacity", "opacity", "order", "z-index", "zoom"];
    t.provideUnits = function(e, t) {
        var o = e[t]
          , i = e[t + 1];
        if ("number" == typeof i) {
            var n = -1 === r.indexOf(o) ? "px" : "";
            e[t + 1] = "" + i + n
        }
    }
});
define("l", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, o = "left", i = "right", n = "@noflip", a = ((r = {})[o] = i,
    r[i] = o,
    r), l = {
        "w-resize": "e-resize",
        "sw-resize": "se-resize",
        "nw-resize": "ne-resize"
    }, s = c();
    t.setRTL = function(e) {
        s = e
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
            var s = e[t + 1];
            if ("string" == typeof s && s.indexOf(n) >= 0)
                e[t + 1] = s.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, "");
            else if (r.indexOf(o) >= 0)
                e[t] = r.replace(o, i);
            else if (r.indexOf(i) >= 0)
                e[t] = r.replace(i, o);
            else if (String(s).indexOf(o) >= 0)
                e[t + 1] = s.replace(o, i);
            else if (String(s).indexOf(i) >= 0)
                e[t + 1] = s.replace(i, o);
            else if (a[r])
                e[t] = a[r];
            else if (l[s])
                e[t + 1] = l[s];
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
                    }(s);
                    break;
                case "box-shadow":
                    e[t + 1] = function(e, t) {
                        var r = e.split(" ")
                          , o = parseInt(r[t], 10);
                        r[0] = r[0].replace(String(o), String(-1 * o));
                        return r.join(" ")
                    }(s, 0)
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
        var o = []
          , i = []
          , n = r.Stylesheet.getInstance();
        !function e(t) {
            for (var r = 0, a = t; r < a.length; r++) {
                var l = a[r];
                if (l)
                    if ("string" == typeof l)
                        if (l.indexOf(" ") >= 0)
                            e(l.split(" "));
                        else {
                            var s = n.argsFromClassName(l);
                            s ? e(s) : -1 === o.indexOf(l) && o.push(l)
                        }
                    else
                        Array.isArray(l) ? e(l) : "object" == typeof l && i.push(l)
            }
        }(e);
        return {
            classes: o,
            objects: i
        }
    }
});
define("s", ["require", "exports", "t", "r", "k"], function(e, t, r, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.mergeStyleSets = function() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var n = {}
          , a = {}
          , l = e[0];
        if (l) {
            e.length > 1 && (l = o.concatStyleSets.apply(void 0, e));
            var s = [];
            for (var c in l)
                if (l.hasOwnProperty(c)) {
                    var u = l[c]
                      , d = r.extractStyleParts(u)
                      , f = d.classes
                      , g = d.objects
                      , p = i.styleToRegistration({
                        displayName: c
                    }, g);
                    s.push(p);
                    if (p) {
                        a[c] = p.className;
                        n[c] = f.concat([p.className]).join(" ")
                    }
                }
            for (var m = 0, h = s; m < h.length; m++)
                (p = h[m]) && i.applyRegistration(p, a)
        }
        return n
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
define("j", ["require", "exports", "i", "k"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.keyframes = function(e) {
        var t = r.Stylesheet.getInstance()
          , i = t.getClassName()
          , n = [];
        for (var a in e)
            e.hasOwnProperty(a) && n.push(a, "{", o.serializeRuleEntries(e[a]), "}");
        var l = n.join("");
        t.insertRule("@keyframes " + i + "{" + l + "}");
        return i
    }
});
define("x", ["require", "exports", "am", "z", "y", "h"], function(e, t, r, o, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = i.GlobalSettings.getValue("icons", {
        __options: {
            disableWarnings: !1,
            warnOnMissingIcons: !0
        },
        __remapped: {}
    });
    t.registerIcons = function(e, t) {
        var i = r.__assign({}, e, {
            isRegistered: !1,
            className: void 0
        })
          , n = e.icons;
        t = t ? r.__assign({}, a.__options, t) : a.__options;
        for (var l in n)
            if (n.hasOwnProperty(l)) {
                var s = n[l]
                  , c = l.toLowerCase();
                a[c] ? t.disableWarnings || o.warn("Icon '" + l + " being re-registered. Ignoring duplicate registration.") : a[c] = {
                    code: s,
                    subset: i
                }
            }
    }
    ;
    t.registerIconAlias = function(e, t) {
        a.__remapped[e.toLowerCase()] = t.toLowerCase()
    }
    ;
    t.getIcon = function(e) {
        var t = void 0
          , r = a.__options;
        e = e ? e.toLowerCase() : "";
        if (e = a.__remapped[e] || e)
            if (t = a[e]) {
                var i = t.subset;
                if (i.fontFace && !i.isRegistered) {
                    n.fontFace(i.fontFace);
                    i.className = n.mergeStyles(i.style, {
                        fontFamily: i.fontFace.fontFamily,
                        fontWeight: i.fontFace.fontWeight || "normal",
                        fontStyle: i.fontFace.fontStyle || "normal"
                    }).toString();
                    i.isRegistered = !0
                }
            } else
                !r.disableWarnings && r.warnOnMissingIcons && o.warn('The icon "' + e + '" was used but not registered. See http://aka.ms/fabric-icon-usage for more information.');
        return t
    }
    ;
    t.setIconOptions = function(e) {
        a.__options = r.__assign({}, a.__options, e)
    }
});
define("z", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = void 0;
    t.warnDeprecations = function(e, t, r) {
        for (var i in r)
            if (t && i in t) {
                var n = e + " property '" + i + "' was used but has been deprecated."
                  , a = r[i];
                a && (n += " Use '" + a + "' instead.");
                o(n)
            }
    }
    ;
    t.warnMutuallyExclusive = function(e, t, r) {
        for (var i in r)
            if (t && i in t) {
                var n = r[i];
                n && n in t && o(e + " property '" + i + "' is mutually exclusive with '" + r[i] + "'. Use one or the other.")
            }
    }
    ;
    t.warnConditionallyRequiredProps = function(e, t, r, i, n) {
        if (!0 === n)
            for (var a = 0, l = r; a < l.length; a++) {
                var s = l[a];
                s in t || o(e + " property '" + s + "' is required when '" + i + "' is used.'")
            }
    }
    ;
    function o(e) {
        r ? r(e) : console && console.warn && console.warn(e)
    }
    t.warn = o;
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
      , i = {}
      , n = 0;
    if ("undefined" != typeof window) {
        var a = window;
        i = a[r] = a[r] || ((l = {})[o] = {},
        l)
    }
    var l, s = i[o], c = function() {
        function e() {}
        e.getValue = function(e, t) {
            void 0 === i[e] && (i[e] = "function" == typeof t ? t() : t);
            return i[e]
        }
        ;
        e.setValue = function(e, t) {
            var r = i[e];
            if (t !== r) {
                i[e] = t;
                var o = {
                    oldValue: r,
                    value: t,
                    key: e
                };
                for (var n in s)
                    s.hasOwnProperty(n) && s[n](o)
            }
            return t
        }
        ;
        e.addChangeListener = function(e) {
            var t = e.__id__;
            t || (t = e.__id__ = String(n++));
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
define("w", ["require", "exports", "h", "x"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = {
        display: "inline-block"
    };
    t.getIconClassName = function(e) {
        var t = ""
          , n = o.getIcon(e);
        n && (t = r.mergeStyles(n.subset.className, i, {
            selectors: {
                "::before": {
                    content: '"' + n.code + '"'
                }
            }
        }));
        return t
    }
});
define("B", ["require", "exports", "am", "P", "O", "K", "J", "I", "H", "E", "D", "C"], function(e, t, r, o, i, n, a, l, s, c, u, d) {
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
    t.ThemeSettingName = c.ThemeSettingName;
    t.getTheme = c.getTheme;
    t.loadTheme = c.loadTheme;
    t.createTheme = c.createTheme;
    t.registerOnThemeChangeCallback = c.registerOnThemeChangeCallback;
    t.removeOnThemeChangeCallback = c.removeOnThemeChangeCallback;
    r.__exportStar(u, t);
    t.normalize = d.normalize
});
define("P", ["require", "exports", "h"], function(e, t, r) {
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
      , m = V(10)
      , h = V(20)
      , v = V(40)
      , y = V(400)
      , S = U(10)
      , b = U(20)
      , _ = U(-10)
      , C = U(-20)
      , w = q(10)
      , L = q(20)
      , F = q(40)
      , k = q(400)
      , x = q(-10)
      , M = q(-20)
      , P = q(-40)
      , I = q(-400)
      , O = H(-10)
      , T = H(-20)
      , D = H(10)
      , A = H(20)
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
      , j = r.keyframes({
        from: {
            transform: "rotateZ(0deg)"
        },
        to: {
            transform: "rotateZ(90deg)"
        }
    })
      , W = r.keyframes({
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
        slideLeftIn10: z(c + "," + m, l, o),
        slideLeftIn20: z(c + "," + h, l, o),
        slideLeftIn40: z(c + "," + v, l, o),
        slideLeftIn400: z(c + "," + y, l, o),
        slideUpIn10: z(c + "," + S, l, o),
        slideUpIn20: z(c + "," + b, l, o),
        slideDownIn10: z(c + "," + _, l, o),
        slideDownIn20: z(c + "," + C, l, o),
        slideRightOut10: z(u + "," + w, l, o),
        slideRightOut20: z(u + "," + L, l, o),
        slideRightOut40: z(u + "," + F, l, o),
        slideRightOut400: z(u + "," + k, l, o),
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
        rotate90deg: z(j, "0.1s", i),
        rotateN90deg: z(W, "0.1s", i)
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
    function q(e) {
        return r.keyframes({
            from: {
                transform: "translate3d(0,0,0)"
            },
            to: {
                transform: "translate3d(" + e + "px,0,0)"
            }
        })
    }
    function H(e) {
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
define("O", ["require", "exports"], function(e, t) {
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
define("K", ["require", "exports", "h", "J", "L"], function(e, t, r, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n, a, l = "https://static2.sharepointonline.com/files/fabric/assets";
    t.DefaultFontStyles = o.createFontStyles(i.getLanguage());
    function s(e, t, o) {
        e = "'" + e + "'";
        r.fontFace({
            fontFamily: e,
            src: "url('" + t + ".woff2') format('woff2'),url('" + t + ".woff') format('woff')",
            fontWeight: o,
            fontStyle: "normal"
        })
    }
    function c(e, t, r, i) {
        void 0 === i && (i = "segoeui");
        var n = e + "/" + r + "/" + i;
        s(t, n + "-light", o.FontWeights.light);
        s(t, n + "-semilight", o.FontWeights.semilight);
        s(t, n + "-regular", o.FontWeights.regular);
        s(t, n + "-semibold", o.FontWeights.semibold)
    }
    function u(e) {
        if (e) {
            var t = e + "/fonts";
            c(t, o.LocalizedFontNames.Thai, "leelawadeeui-thai", "leelawadeeui");
            c(t, o.LocalizedFontNames.Arabic, "segoeui-arabic");
            c(t, o.LocalizedFontNames.Cyrillic, "segoeui-cyrillic");
            c(t, o.LocalizedFontNames.EastEuropean, "segoeui-easteuropean");
            c(t, o.LocalizedFontNames.Greek, "segoeui-greek");
            c(t, o.LocalizedFontNames.Hebrew, "segoeui-hebrew");
            c(t, o.LocalizedFontNames.Vietnamese, "segoeui-vietnamese");
            c(t, o.LocalizedFontNames.WestEuropean, "segoeui-westeuropean");
            c(t, o.LocalizedFontFamilies.Selawik, "selawik", "selawik");
            s("Leelawadee UI Web", t + "/leelawadeeui-thai/leelawadeeui-semilight", o.FontWeights.light);
            s("Leelawadee UI Web", t + "/leelawadeeui-thai/leelawadeeui-bold", o.FontWeights.semibold)
        }
    }
    t.registerDefaultFontFaces = u;
    u((n = "undefined" != typeof window ? window : void 0,
    (a = n ? n.FabricConfig : void 0) && void 0 !== a.fontBaseUrl ? a.fontBaseUrl : l))
});
define("J", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, o, i = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif";
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
    }(o = t.LocalizedFontFamilies || (t.LocalizedFontFamilies = {}));
    var n, a, l = {
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
    t.createFontStyles = function(e) {
        return {
            tiny: s(n.mini, a.semibold, e),
            xSmall: s(n.xSmall, a.regular, e),
            small: s(n.small, a.regular, e),
            smallPlus: s(n.smallPlus, a.regular, e),
            medium: s(n.medium, a.regular, e),
            mediumPlus: s(n.mediumPlus, a.regular, e),
            large: s(n.large, a.semilight, e),
            xLarge: s(n.xLarge, a.light, e),
            xxLarge: s(n.xxLarge, a.light, e),
            superLarge: s(n.superLarge, a.light, e),
            mega: s(n.mega, a.light, e)
        }
    }
    ;
    function s(e, t, r) {
        return {
            fontFamily: function(e) {
                var t = o.WestEuropean;
                for (var r in l)
                    if (l.hasOwnProperty(r) && e && 0 === r.indexOf(e)) {
                        t = l[r];
                        break
                    }
                return t + ", " + i
            }(r),
            MozOsxFontSmoothing: "grayscale",
            WebkitFontSmoothing: "antialiased",
            fontSize: e,
            fontWeight: t
        }
    }
});
define("L", ["require", "exports", "N", "M"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i;
    t.getLanguage = function() {
        if (void 0 === i) {
            var e = r.getDocument()
              , t = o.getItem("language");
            null !== t && (i = t);
            void 0 === i && e && (i = e.documentElement.getAttribute("lang"));
            void 0 === i && (i = "en")
        }
        return i
    }
    ;
    t.setLanguage = function(e, t) {
        void 0 === t && (t = !1);
        var n = r.getDocument();
        n && n.documentElement.setAttribute("lang", e);
        t || o.setItem("language", e);
        i = e
    }
});
define("N", ["require", "exports"], function(e, t) {
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
            n > -1 && i._virtual.children.splice(n, 1)
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
        e && n(e) && (t = e._virtual.parent);
        return t
    }
    t.getVirtualParent = r;
    function o(e, t) {
        void 0 === t && (t = !0);
        return e && (t && r(e) || e.parentNode && e.parentNode)
    }
    t.getParent = o;
    t.getChildren = function(e, t) {
        void 0 === t && (t = !0);
        var r = [];
        if (e) {
            for (var o = 0; o < e.children.length; o++)
                r.push(e.children.item(o));
            t && n(e) && r.push.apply(r, e._virtual.children)
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
                    var n = o(t);
                    if (n === e) {
                        i = !0;
                        break
                    }
                    t = n
                }
            } else
                e.contains && (i = e.contains(t));
        return i
    }
    ;
    var i = !1;
    t.setSSR = function(e) {
        i = e
    }
    ;
    t.getWindow = function(e) {
        return i || "undefined" == typeof window ? void 0 : e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window
    }
    ;
    t.getDocument = function(e) {
        return i || "undefined" == typeof document ? void 0 : e && e.ownerDocument ? e.ownerDocument : document
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
    function n(e) {
        return e && !!e._virtual
    }
});
define("M", ["require", "exports"], function(e, t) {
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
define("I", ["require", "exports"], function(e, t) {
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
define("H", ["require", "exports"], function(e, t) {
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
define("E", ["require", "exports", "am", "F", "K", "O", "c"], function(e, t, r, o, i, n, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l, s = {
        palette: n.DefaultPalette,
        semanticColors: f(n.DefaultPalette, !1),
        fonts: i.DefaultFontStyles,
        isInverted: !1
    }, c = [];
    t.ThemeSettingName = "theme";
    if (!o.Customizations.getSettings([t.ThemeSettingName]).theme) {
        var u = "undefined" != typeof window ? window : void 0;
        u && u.FabricConfig && u.FabricConfig.theme && (s = d(u.FabricConfig.theme));
        o.Customizations.applySettings(((l = {})[t.ThemeSettingName] = s,
        l))
    }
    t.getTheme = function() {
        return s
    }
    ;
    t.registerOnThemeChangeCallback = function(e) {
        -1 === c.indexOf(e) && c.push(e)
    }
    ;
    t.removeOnThemeChangeCallback = function(e) {
        var t = c.indexOf(e);
        -1 !== t && c.splice(t, 1)
    }
    ;
    t.loadTheme = function(e) {
        s = d(e);
        a.loadTheme(r.__assign({}, s.palette, s.semanticColors));
        o.Customizations.applySettings(((i = {})[t.ThemeSettingName] = s,
        i));
        c.forEach(function(e) {
            try {
                e(s)
            } catch (e) {}
        });
        return s;
        var i
    }
    ;
    function d(e) {
        var t = r.__assign({}, n.DefaultPalette, e.palette);
        e.palette && e.palette.accent || (t.accent = t.themePrimary);
        var o = r.__assign({}, f(t, !!e.isInverted), e.semanticColors);
        o = r.__assign({}, function(e) {
            e.listTextColor = e.listText;
            return e
        }(o), e.semanticColors);
        return {
            palette: t,
            fonts: r.__assign({}, i.DefaultFontStyles, e.fonts),
            semanticColors: o,
            isInverted: !!e.isInverted
        }
    }
    t.createTheme = d;
    function f(e, t) {
        return {
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
            listTextColor: ""
        }
    }
});
define("F", ["require", "exports", "am", "y", "G"], function(e, t, r, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        settings: {},
        scopedSettings: {}
    }
      , a = o.GlobalSettings.getValue("customizations", {
        settings: {},
        scopedSettings: {}
    })
      , l = new i.EventGroup(a)
      , s = function() {
        function e() {}
        e.reset = function() {
            a.settings = {};
            a.scopedSettings = {}
        }
        ;
        e.applySettings = function(t) {
            a.settings = r.__assign({}, a.settings, t);
            e._raiseChange()
        }
        ;
        e.applyScopedSettings = function(t, o) {
            a.scopedSettings[t] = r.__assign({}, a.scopedSettings[t], o);
            e._raiseChange()
        }
        ;
        e.getSettings = function(e, t, r) {
            void 0 === r && (r = n);
            for (var o = {}, i = t && r.scopedSettings[t] || {}, l = t && a.scopedSettings[t] || {}, s = 0, c = e; s < c.length; s++) {
                var u = c[s];
                o[u] = i[u] || r.settings[u] || l[u] || a.settings[u]
            }
            return o
        }
        ;
        e.observe = function(e) {
            l.on(a, "change", e)
        }
        ;
        e.unobserve = function(e) {
            l.off(a, "change", e)
        }
        ;
        e._raiseChange = function() {
            l.raise("change")
        }
        ;
        return e
    }();
    t.Customizations = s
});
define("G", ["require", "exports"], function(e, t) {
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
        e.raise = function(t, r, o, i) {
            var n;
            if (e._isElement(t)) {
                if (document.createEvent) {
                    var a = document.createEvent("HTMLEvents");
                    a.initEvent(r, i || !1, !0);
                    a.args = o;
                    n = t.dispatchEvent(a)
                } else if (document.createEventObject) {
                    var l = document.createEventObject(o);
                    t.fireEvent("on" + r, l)
                }
            } else
                for (; t && !1 !== n; ) {
                    var s = t.__events__
                      , c = s ? s[r] : null;
                    if (c)
                        for (var u in c)
                            if (c.hasOwnProperty(u))
                                for (var d = c[u], f = 0; !1 !== n && f < d.length; f++) {
                                    var g = d[f];
                                    g.objectCallback && (n = g.objectCallback.call(g.parent, o))
                                }
                    t = i ? t.parent : null
                }
            return n
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
            for (var o in t)
                t.hasOwnProperty(o) && this.on(e, o, t[o], r)
        }
        ;
        e.prototype.on = function(t, r, o, i) {
            var n = this;
            if (r.indexOf(",") > -1)
                for (var a = r.split(/[ ,]+/), l = 0; l < a.length; l++)
                    this.on(t, a[l], o, i);
            else {
                var s = this._parent
                  , c = {
                    target: t,
                    eventName: r,
                    parent: s,
                    callback: o,
                    useCapture: i || !1
                };
                (a = t.__events__ = t.__events__ || {})[r] = a[r] || {
                    count: 0
                };
                a[r][this._id] = a[r][this._id] || [];
                a[r][this._id].push(c);
                a[r].count++;
                if (e._isElement(t)) {
                    var u = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        if (!n._isDisposed) {
                            var r;
                            try {
                                if (!1 === (r = o.apply(s, e)) && e[0]) {
                                    var i = e[0];
                                    i.preventDefault && i.preventDefault();
                                    i.stopPropagation && i.stopPropagation();
                                    i.cancelBubble = !0
                                }
                            } catch (i) {}
                            return r
                        }
                    };
                    c.elementCallback = u;
                    t.addEventListener ? t.addEventListener(r, u, i) : t.attachEvent && t.attachEvent("on" + r, u)
                } else {
                    c.objectCallback = function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        if (!n._isDisposed)
                            return o.apply(s, e)
                    }
                }
                this._eventRecords.push(c)
            }
        }
        ;
        e.prototype.off = function(e, t, r, o) {
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
        e.prototype.raise = function(t, r, o) {
            return e.raise(this._parent, t, r, o)
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
    for (var t, r = 1, o = arguments.length; r < o; r++) {
        t = arguments[r];
        for (var i in t)
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
    }
    return e
}
;
define("c", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, o = "undefined" == typeof window ? global : window, i = function() {
        var e = o.__themeState__ || {
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
        o.__themeState__ = e;
        return e
    }(), n = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g, a = 1e4, l = function() {
        return "undefined" != typeof performance && performance.now ? performance.now() : Date.now()
    };
    function s(e) {
        var t = l();
        e();
        var r = l();
        i.perf.duration += r - t
    }
    t.loadStyles = function(e, t) {
        void 0 === t && (t = !1);
        s(function() {
            var o = Array.isArray(e) ? e : m(e);
            void 0 === r && (r = function() {
                var e = !1;
                if ("undefined" != typeof document) {
                    var t = document.createElement("style");
                    t.type = "text/css";
                    e = !!t.styleSheet
                }
                return e
            }());
            var n = i.runState
              , a = n.mode
              , l = n.buffer
              , s = n.flushTimer;
            if (t || 1 === a) {
                l.push(o);
                s || (i.runState.flushTimer = setTimeout(function() {
                    i.runState.flushTimer = 0;
                    c()
                }, 0))
            } else
                u(o)
        })
    }
    ;
    t.configureLoadStyles = function(e) {
        i.loadStyles = e
    }
    ;
    t.configureRunMode = function(e) {
        i.runState.mode = e
    }
    ;
    function c() {
        s(function() {
            var e = i.runState.buffer.slice();
            i.runState.buffer = [];
            var t = [].concat.apply([], e);
            t.length > 0 && u(t)
        })
    }
    t.flush = c;
    function u(e, t) {
        i.loadStyles ? i.loadStyles(p(e).styleString, e) : r ? function(e, t) {
            var r = document.getElementsByTagName("head")[0]
              , o = i.registeredStyles
              , n = i.lastStyleElement
              , l = n ? n.styleSheet : void 0
              , s = l ? l.cssText : ""
              , c = o[o.length - 1]
              , u = p(e).styleString;
            if (!n || s.length + u.length > a) {
                (n = document.createElement("style")).type = "text/css";
                if (t) {
                    r.replaceChild(n, t.styleElement);
                    t.styleElement = n
                } else
                    r.appendChild(n);
                if (!t) {
                    c = {
                        styleElement: n,
                        themableStyle: e
                    };
                    o.push(c)
                }
            }
            n.styleSheet.cssText += g(u);
            Array.prototype.push.apply(c.themableStyle, e);
            i.lastStyleElement = n
        }(e, t) : function(e) {
            var t = document.getElementsByTagName("head")[0]
              , r = document.createElement("style")
              , o = p(e)
              , n = o.styleString
              , a = o.themable;
            r.type = "text/css";
            r.appendChild(document.createTextNode(n));
            i.perf.count++;
            t.appendChild(r);
            var l = {
                styleElement: r,
                themableStyle: e
            };
            a ? i.registeredThemableStyles.push(l) : i.registeredStyles.push(l)
        }(e)
    }
    t.loadTheme = function(e) {
        i.theme = e;
        !function() {
            if (i.theme) {
                for (var e = [], t = 0, r = i.registeredThemableStyles; t < r.length; t++) {
                    var o = r[t];
                    e.push(o.themableStyle)
                }
                if (e.length > 0) {
                    d(1);
                    u([].concat.apply([], e))
                }
            }
        }()
    }
    ;
    function d(e) {
        void 0 === e && (e = 3);
        if (3 === e || 2 === e) {
            f(i.registeredStyles);
            i.registeredStyles = []
        }
        if (3 === e || 1 === e) {
            f(i.registeredThemableStyles);
            i.registeredThemableStyles = []
        }
    }
    t.clearStyles = d;
    function f(e) {
        e.forEach(function(e) {
            var t = e && e.styleElement;
            t && t.parentElement && t.parentElement.removeChild(t)
        })
    }
    function g(e) {
        e && (e = p(m(e)).styleString);
        return e
    }
    t.detokenize = g;
    function p(e) {
        var t = i.theme
          , r = !1;
        return {
            styleString: (e || []).map(function(e) {
                var o = e.theme;
                if (o) {
                    r = !0;
                    var i = t ? t[o] : void 0
                      , n = e.defaultValue || "inherit";
                    t && !i && console,
                    0;
                    return i || n
                }
                return e.rawString
            }).join(""),
            themable: r
        }
    }
    function m(e) {
        var t = [];
        if (e) {
            for (var r = 0, o = void 0; o = n.exec(e); ) {
                var i = o.index;
                i > r && t.push({
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
    t.splitStyles = m
});
define("D", ["require", "exports"], function(e, t) {
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
define("C", ["require", "exports"], function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.normalize = {
        boxShadow: "none",
        margin: 0,
        padding: 0,
        boxSizing: "border-box"
    }
});
define("S", ["require", "exports", "v", "B"], function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.FontClassNames = r.buildClassMap(o.DefaultFontStyles)
});
define("R", ["require", "exports", "h", "O", "B"], function(e, t, r, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.ColorClassNames = {};
    for (var n in o.DefaultPalette)
        if (o.DefaultPalette.hasOwnProperty(n)) {
            a(t.ColorClassNames, n, "", !1, "color");
            a(t.ColorClassNames, n, "Hover", !0, "color");
            a(t.ColorClassNames, n, "Background", !1, "background");
            a(t.ColorClassNames, n, "BackgroundHover", !0, "background");
            a(t.ColorClassNames, n, "Border", !1, "borderColor");
            a(t.ColorClassNames, n, "BorderHover", !0, "borderColor")
        }
    function a(e, t, o, n, a) {
        Object.defineProperty(e, t + o, {
            get: function() {
                var e, o = ((e = {})[a] = i.getTheme().palette[t],
                e);
                return r.mergeStyles(n ? {
                    selectors: {
                        ":hover": o
                    }
                } : o).toString()
            },
            enumerable: !0,
            configurable: !0
        })
    }
});
define("d", ["require", "exports", "ag", "af", "ae", "ad", "ac", "ab", "aa", "Z", "Y", "X", "W", "V", "U", "e"], function(e, t, r, o, i, n, a, l, s, c, u, d, f, g, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var m = "https://static2.sharepointonline.com/files/fabric/assets/icons/";
    t.initializeIcons = function(e) {
        void 0 === e && (e = m);
        [r.initializeIcons, o.initializeIcons, i.initializeIcons, n.initializeIcons, a.initializeIcons, l.initializeIcons, s.initializeIcons, c.initializeIcons, u.initializeIcons, d.initializeIcons, f.initializeIcons, g.initializeIcons, p.initializeIcons].forEach(function(t) {
            return t(e)
        })
    }
});
define("ag", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons"',
                src: "url('" + e + "fabric-icons-4ac62dd2.woff') format('woff')"
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
                FavoriteStar: "",
                FavoriteStarFill: "",
                CheckMark: "",
                Delete: "",
                ChevronLeft: "",
                ChevronRight: "",
                Calendar: "",
                Undo: "",
                Flag: "",
                Page: "",
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
                Pinned: "",
                SortLines: "",
                List: "",
                CircleRing: "",
                Heart: "",
                HeartFill: "",
                Tiles: "",
                Embed: "",
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
        })
    }
});
define("af", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-0"',
                src: "url('" + e + "fabric-icons-0-8a1666a2.woff') format('woff')"
            },
            icons: {
                DecreaseIndentLegacy: "",
                IncreaseIndentLegacy: "",
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
                Megaphone: "",
                AutoEnhanceOn: "",
                AutoEnhanceOff: "",
                Color: "",
                SaveAs: "",
                Light: "",
                Filters: "",
                AspectRatio: "",
                Contrast: "",
                Redo: "",
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
                Merge: "",
                TurnRight: "",
                Ferry: "",
                Highlight: "",
                Tab: "",
                Admin: ""
            }
        })
    }
});
define("ae", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-1"',
                src: "url('" + e + "fabric-icons-1-a961c249.woff') format('woff')"
            },
            icons: {
                TVMonitor: "",
                Speakers: "",
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
                History: "",
                Location: "",
                Work: "",
                Recent: "",
                Hotel: "",
                LocationDot: "",
                News: "",
                Chat: "",
                Group: "",
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
                Import: "",
                Picture: "",
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
                Library: "",
                PostUpdate: "",
                NewFolder: "",
                CalendarReply: "",
                UnsyncFolder: "",
                SyncFolder: "",
                BlockContact: "",
                BulletedList: "",
                Preview: "",
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
                Hospital: "",
                Timer: "",
                FullCircleMask: "",
                LocationFill: "",
                ChromeMinimize: "",
                Annotation: "",
                ChromeClose: "",
                Accept: ""
            }
        })
    }
});
define("ad", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-2"',
                src: "url('" + e + "fabric-icons-2-2be8dca9.woff') format('woff')"
            },
            icons: {
                Fingerprint: "",
                Handwriting: "",
                StackIndicator: "",
                Completed: "",
                Label: "",
                FlickDown: "",
                FlickUp: "",
                FlickLeft: "",
                FlickRight: "",
                Streaming: "",
                MusicInCollection: "",
                OneDrive: "",
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
                Dictionary: "",
                ChromeBack: "",
                PC1: "",
                PresenceChickletVideo: "",
                Reply: "",
                HalfAlpha: "",
                LockSolid: "",
                ConstructionCone: "",
                DoubleChevronLeftMed: "",
                Volume0: "",
                Volume1: "",
                Volume2: "",
                Volume3: "",
                CaretHollow: "",
                CaretSolid: "",
                FolderOpen: "",
                PinnedFill: "",
                Chart: "",
                Robot: "",
                BidiLtr: "",
                BidiRtl: "",
                RevToggleKey: "",
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
                Ringer: "",
                PDF: "",
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
                HailDay: "",
                WorkFlow: "",
                StoreLogoMed: "",
                TriangleSolid: "",
                RainShowersNight: "",
                SnowShowerNight: "",
                HailNight: "",
                Info2: "",
                StoreLogo: "",
                MultiSelectMirrored: "",
                Broom: "",
                MusicInCollectionFill: "",
                Asterisk: ""
            }
        })
    }
});
define("ac", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-3"',
                src: "url('" + e + "fabric-icons-3-80b6008d.woff') format('woff')"
            },
            icons: {
                ErrorBadge: "",
                CircleFill: "",
                Record2: "",
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
                Cocktails: "",
                Wines: "",
                Articles: "",
                Cycling: "",
                DietPlanNotebook: "",
                Pill: "",
                ExerciseTracker: "",
                Medical: "",
                Running: "",
                Weights: "",
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
                StockDown: "",
                StockUp: "",
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
                CloudDownload: "",
                WindDirection: "",
                Family: "",
                CSS: "",
                JS: "",
                DeliveryTruck: "",
                ReminderPerson: ""
            }
        })
    }
});
define("ab", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-4"',
                src: "url('" + e + "fabric-icons-4-03329fef.woff') format('woff')"
            },
            icons: {
                ReminderGroup: "",
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
                FacebookLogo: "",
                AddTo: "",
                RadioBtnOff: "",
                RadioBtnOn: "",
                ExploreContent: "",
                VideoSolid: "",
                Teamwork: "",
                PeopleAdd: "",
                Glasses: "",
                DateTime2: "",
                Shield: "",
                Header1: "",
                PageAdd: "",
                NumberedList: "",
                PowerBILogo: "",
                Product: "",
                ProgressLoopInner: "",
                ProgressLoopOuter: "",
                Blocked2: "",
                FangBody: "",
                Glimmer: "",
                ChatInviteFriend: "",
                Crown: "",
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
                BoxLogo: "",
                DelveLogoInverse: "",
                DropboxLogo: "",
                ExchangeLogoInverse: "",
                LyncLogo: "",
                OfficeVideoLogoInverse: "",
                ParatureLogo: ""
            }
        })
    }
});
define("aa", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-5"',
                src: "url('" + e + "fabric-icons-5-82c8b87c.woff') format('woff')"
            },
            icons: {
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
                CaretDown8: "",
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
                DoubleChevronDown: "",
                ReplyAll: "",
                GoogleDriveLogo: "",
                Questionnaire: "",
                ReplyMirrored: "",
                ReplyAllMirrored: "",
                AddGroup: "",
                QuestionnaireMirrored: "",
                TemporaryUser: "",
                CaretSolid16: "",
                GroupedDescending: "",
                GroupedAscending: "",
                AwayStatus: "",
                MyMoviesTV: "",
                AustralianRules: "",
                WifiEthernet: "",
                DateTimeMirrored: "",
                StopSolid: "",
                DoubleChevronUp12: "",
                DoubleChevronDown12: "",
                DoubleChevronLeft12: "",
                DoubleChevronRight12: ""
            }
        })
    }
});
define("Z", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-6"',
                src: "url('" + e + "fabric-icons-6-2ab76fc9.woff') format('woff')"
            },
            icons: {
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
                OneDriveAdd: "",
                Header2: "",
                Header3: "",
                Header4: "",
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
                LifesaverLock: "",
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
                iOSAppStoreLogo: "",
                AndroidLogo: "",
                Breadcrumb: "",
                PageEdit: "",
                Database: "",
                DocumentManagement: "",
                CRMReport: "",
                ZipFolder: "",
                TextDocument: ""
            }
        })
    }
});
define("Y", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-7"',
                src: "url('" + e + "fabric-icons-7-1bae3315.woff') format('woff')"
            },
            icons: {
                PageCheckedOut: "",
                SaveAndClose: "",
                Script: "",
                Archive: "",
                ActivityFeed: "",
                EventDate: "",
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
                CaretBottomLeftSolid8: "",
                CaretBottomRightSolid8: "",
                FolderHorizontal: "",
                MicrosoftStaffhubLogo: "",
                GiftboxOpen: "",
                StatusCircleOuter: "",
                StatusCircleInner: "",
                ExploreContentSingle: "",
                CollapseContent: "",
                CollapseContentSingle: "",
                InfoSolid: "",
                ProgressRingDots: "",
                CaloriesAdd: "",
                BranchFork: "",
                HardDriveGroup: "",
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
                SidePanelMirrored: "",
                ProtectRestrict: "",
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
                ViewListGroup: ""
            }
        })
    }
});
define("X", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-8"',
                src: "url('" + e + "fabric-icons-8-bf5c8e0c.woff') format('woff')"
            },
            icons: {
                ViewListTree: "",
                TriggerAuto: "",
                TriggerUser: "",
                PivotChart: "",
                StackedBarChart: "",
                StackedLineChart: "",
                BuildQueue: "",
                BuildQueueNew: "",
                UserFollowed: "",
                VennDiagram: "",
                FiveTileGrid: "",
                FocalPoint: "",
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
                DocumentApproval: "",
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
                BusinessHoursSign: "",
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
                ArrowTallUpLeft: ""
            }
        })
    }
});
define("W", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-9"',
                src: "url('" + e + "fabric-icons-9-a362212c.woff') format('woff')"
            },
            icons: {
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
                CPlusPlusLanguage: "",
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
                SingleColumnEdit: "",
                DoubleColumnEdit: "",
                TripleColumnEdit: "",
                ColumnLeftTwoThirdsEdit: "",
                ColumnRightTwoThirdsEdit: "",
                StreamLogo: "",
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
                OfflineStorageSolid: ""
            }
        })
    }
});
define("V", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-10"',
                src: "url('" + e + "fabric-icons-10-795d6e25.woff') format('woff')"
            },
            icons: {
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
                CaretTopRightCenter8: "",
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
                EgnyteLogo: "",
                GoogleDriveLogoLeftGreen: "",
                GoogleDriveLogoBottomBlue: "",
                GoogleDriveLogoRightYellow: "",
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
                LikeSolid: "",
                DislikeSolid: "",
                DeclineCall: "",
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
                IRMReply: ""
            }
        })
    }
});
define("U", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.initializeIcons = function(e) {
        void 0 === e && (e = "");
        r.registerIcons({
            style: {
                MozOsxFontSmoothing: "grayscale",
                WebkitFontSmoothing: "antialiased",
                fontStyle: "normal",
                fontWeight: "normal",
                speak: "none"
            },
            fontFace: {
                fontFamily: '"FabricMDL2Icons-11"',
                src: "url('" + e + "fabric-icons-11-c0dbf638.woff') format('woff')"
            },
            icons: {
                IRMReplyMirrored: "",
                IRMForward: "",
                IRMForwardMirrored: "",
                VoicemailIRM: "",
                EventAccepted: "",
                EventTentative: "",
                EventTentativeMirrored: "",
                EventDeclined: "",
                IDBadge: "",
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
                FieldReadOnly: "",
                FieldRequired: "",
                BacklogBoard: "",
                ExternalBuild: "",
                ExternalTFVC: "",
                ExternalXAML: "",
                IssueSolid: "",
                DefectSolid: "",
                LadybugSolid: "",
                MTMLogo: "",
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
                NonprofitLogo32: "",
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
                Snooze: ""
            }
        })
    }
});
define("e", ["require", "exports", "f"], function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    r.registerIconAlias("trash", "delete")
});
define("b", ["require", "exports", "c", "aw"], function(e, t, r, o) {
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
