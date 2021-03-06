﻿/*!
 * lhgcore Dialog Plugin v4.2.0
 * Date: 2012-04-19 10:55:11 
 * http://code.google.com/p/lhgdialog/
 * Copyright 2009-2012 LiHuiGang
 */
(function (a, b, c) {
    var d = b.ActiveXObject && !b.XMLHttpRequest,
    e = function () { },
    f = 0,
    g = /^url:/,
    h,
    i,
    j = b.document,
    k = "JDG" + +(new Date),
    l = '<table class="ui_border"><tbody><tr><td class="ui_lt"></td><td class="ui_t"></td><td class="ui_rt"></td></tr><tr><td class="ui_l"></td><td class="ui_c"><div class="ui_inner"><table class="ui_dialog"><tbody><tr><td colspan="2"><div class="ui_title_bar"><div class="ui_title" unselectable="on"></div><div class="ui_title_buttons"><a class="ui_min" href="javascript:void(0);" title="\u6700\u5c0f\u5316"><b class="ui_min_b"></b></a><a class="ui_max" href="javascript:void(0);" title="\u6700\u5927\u5316"><b class="ui_max_b"></b></a><a class="ui_res" href="javascript:void(0);" title="\u8fd8\u539f"><b class="ui_res_b"></b><b class="ui_res_t"></b></a><a class="ui_close" href="javascript:void(0);" title="\u5173\u95ed(esc\u952e)">\u00d7</a></div></div></td></tr><tr><td class="ui_icon"></td><td class="ui_main"><div class="ui_content"></div></td></tr><tr><td colspan="2"><div class="ui_buttons"></div></td></tr></tbody></table></div></td><td class="ui_r"></td></tr><tr><td class="ui_lb"></td><td class="ui_b"></td><td class="ui_rb"></td></tr></tbody></table>',
    m,
    n = function (a, b, c) {
        var d = a.length;
        for (; b < d; b++) {
            c = j.querySelector ? a[b].src : a[b].getAttribute("src", 4);
            if (c.substr(c.lastIndexOf("/")).indexOf("lhgdialog") !== -1) break
        }
        return c = c.split("?"),
        m = c[1],
        c[0].substr(0, c[0].lastIndexOf("/") + 1)
    }(j.getElementsByTagName("script"), 0),
    o = function (a) {
        if (m) {
            var b = m.split("&"),
            c = 0,
            d = b.length,
            e;
            for (; c < d; c++) {
                e = b[c].split("=");
                if (a === e[0]) return e[1]
            }
        }
        return null
    },
    p = o("skin") || "default",
    q,
    r = function (a) {
        try {
            q = a.top.document,
            q.getElementsByTagName
        } catch (b) {
            return q = a.document,
            a
        }
        return o("self") === "true" || q.getElementsByTagName("frameset").length > 0 ? (q = a.document, a) : a.top
    }(b),
    s = q.documentElement,
    t = q.compatMode === "BackCompat";
    _$doc = a(q),
    _$top = a(r),
    _$html = a(q.getElementsByTagName("html")[0]);
    try {
        q.execCommand("BackgroundImageCache", !1, !0)
    } catch (u) { } (function (a) {
        if (!a) {
            var b = q.getElementsByTagName("head")[0],
            c = q.createElement("link");
            c.href = n + "" + p + ".css",
            c.rel = "stylesheet",
            c.id = "lhgdialoglink",
            b.insertBefore(c, b.firstChild)
        }
    })(q.getElementById("lhgdialoglink")),
    d &&
    function (a) {
        _$html.css(a) !== "fixed" && _$html.css({
            zoom: 1,
            backgroundImage: "url(about:blank)",
            backgroundAttachment: "fixed"
        })
    }("backgroundAttachment");
    var v = function (a) {
        a = a || {};
        var b, d = v.setting;
        for (var e in d) a[e] === c && (a[e] = d[e]);
        return a.id = a.id || k + f,
        b = v.list[a.id],
        b ? b.zindex().focus() : (a.button = a.button || [], a.ok && a.button.push({
            id: "ok",
            name: a.okVal,
            callback: a.ok,
            focus: a.focus
        }), a.cancel && a.button.push({
            id: "cancel",
            name: a.cancelVal,
            callback: a.cancel
        }), v.setting.zIndex = a.zIndex, f++, v.list[a.id] = h ? h._init(a) : new v.fn._init(a))
    };
    v.fn = v.prototype = {
        constructor: v,
        _init: function (a) {
            var c = this,
            d, e = a.content,
            f = g.test(e);
            return c.opener = b,
            c.config = a,
            c.DOM = d = c.DOM || c._getDOM(),
            c.closed = !1,
            c.data = a.data,
            a.icon && !f ? (a.min = !1, a.max = !1, d.icon[0].style.display = "", d.icon[0].innerHTML = '<img src="' + a.path + "icons/" + a.icon + '" class="ui_icon_bg"/>') : d.icon[0].style.display = "none",
            d.wrap.addClass(a.skin),
            d.rb[0].style.cursor = a.resize ? "se-resize" : "auto",
            d.title[0].style.cursor = a.drag ? "move" : "auto",
            d.max[0].style.display = a.max ? "inline-block" : "none",
            d.min[0].style.display = a.min ? "inline-block" : "none",
            d.close[0].style.display = a.cancel === !1 ? "none" : "inline-block",
            d.content[0].style.padding = a.padding,
            c.button.apply(c, a.button),
            c.title(a.title).content(e, !0, f).size(a.width, a.height).position(a.left, a.top).time(a.time)[a.show ? "show" : "hide"](!0).zindex(),
            a.focus && c.focus(),
            a.lock && c.lock(),
            c._ie6PngFix()._addEvent(),
            h = null,
            !f && a.init && a.init.call(c, b),
            c
        },
        button: function () {
            var b = this,
            c = b.DOM,
            d = c.buttons[0],
            e = "ui_state_highlight",
            f = b._listeners = b._listeners || {},
            g = [].slice.call(arguments),
            h = 0,
            i,
            j,
            l,
            m,
            n;
            for (; h < g.length; h++) i = g[h],
            j = i.name,
            l = i.id || j,
            m = !f[l],
            n = m ? q.createElement("input") : f[l].elem,
            n.type = "button",
            i.className && (n.className = i.className),
            f[l] || (f[l] = {}),
            j && (n.value = j),
            i.callback && (f[l].callback = i.callback),
            i.focus && (b._focus && b._focus.removeClass(e), b._focus = a(n).addClass(e), b.focus()),
            n[k + "callback"] = l,
            n.disabled = !!i.disabled,
            m && (f[l].elem = n, d.appendChild(n));
            return d.style.display = g.length ? "" : "none",
            b._ie6SelectFix(),
            b
        },
        title: function (a) {
            if (a === c) return this;
            var b = this.DOM,
            d = b.border,
            e = b.title[0];
            return a === !1 ? (e.style.display = "none", e.innerHTML = "", d.addClass("ui_state_tips")) : (e.style.display = "", e.innerHTML = a, d.removeClass("ui_state_tips")),
            this
        },
        content: function (a, b, d) {
            if (a === c) return this;
            var e = this,
            f = e.DOM,
            g = f.wrap[0],
            h = g.offsetWidth,
            i = g.offsetHeight,
            j = parseInt(g.style.left),
            k = parseInt(g.style.top),
            l = g.style.width,
            m = f.content,
            n = v.setting.content;
            return d ? (m[0].innerHTML = n, e._iframe(a.split("url:")[1])) : m.html(a),
            b || (h = g.offsetWidth - h, i = g.offsetHeight - i, j -= h / 2, k -= i / 2, g.style.left = Math.max(j, 0) + "px", g.style.top = Math.max(k, 0) + "px", l && l !== "auto" && (g.style.width = g.offsetWidth + "px"), e._autoPositionType()),
            e._ie6SelectFix(),
            e
        },
        size: function (a, b) {
            var c = this,
            d = c.DOM,
            e = d.wrap[0],
            f = d.main[0].style;
            return e.style.width = "auto",
            typeof a == "number" && (a += "px"),
            typeof b == "number" && (b += "px"),
            f.width = a,
            f.height = b,
            a !== "auto" && (e.style.width = e.offsetWidth + "px"),
            c._ie6SelectFix(),
            c
        },
        position: function (a, b) {
            var e = this,
            f = e.config,
            g = e.DOM.wrap[0],
            h = g.style,
            i = d ? !1 : f.fixed,
            j = d && f.fixed,
            k = _$top.scrollLeft(),
            l = _$top.scrollTop(),
            m = i ? 0 : k,
            n = i ? 0 : l,
            o = _$top.width(),
            p = _$top.height(),
            q = g.offsetWidth,
            r = g.offsetHeight;
            if (a || a === 0) e._left = a.toString().indexOf("%") !== -1 ? a : null,
            a = e._toNumber(a, o - q),
            typeof a == "number" && (a = j ? a += k : a + m, a = Math.max(a, m) + "px"),
            h.left = a;
            if (b || b === 0) e._top = b.toString().indexOf("%") !== -1 ? b : null,
            b = e._toNumber(b, p - r),
            typeof b == "number" && (b = j ? b += l : b + n, b = Math.max(b, n) + "px"),
            h.top = b;
            return a !== c && b !== c && e._autoPositionType(),
            e
        },
        time: function (a, b) {
            var c = this,
            d = c._timer;
            return d && clearTimeout(d),
            b && b.call(c),
            a && (c._timer = setTimeout(function () {
                c._click("cancel")
            },
            1e3 * a)),
            c
        },
        show: function (b) {
            return this.DOM.wrap[0].style.visibility = "visible",
            this.DOM.border.addClass("ui_state_visible"),
            !b && this._lock && (a("#ldg_lockmask", q)[0].style.display = ""),
            this
        },
        hide: function (b) {
            return this.DOM.wrap[0].style.visibility = "hidden",
            this.DOM.border.removeClass("ui_state_visible"),
            !b && this._lock && (a("#ldg_lockmask", q)[0].style.display = "none"),
            this
        },
        zindex: function () {
            var a = this,
            b = a.DOM,
            c = a._load,
            d = v.focus,
            e = v.setting.zIndex++;
            return b.wrap[0].style.zIndex = e,
            d && d.DOM.border.removeClass("ui_state_focus"),
            v.focus = a,
            b.border.addClass("ui_state_focus"),
            c && c.style.zIndex && (c.style.display = "none"),
            d && d !== a && d.iframe && (d._load.style.display = ""),
            a
        },
        focus: function () {
            try {
                elemFocus = this._focus && this._focus[0] || this.DOM.close[0],
                elemFocus && elemFocus.focus()
            } catch (a) { }
            return this
        },
        lock: function () {
            var b = this,
            c, e = v.setting.zIndex - 1,
            f = b.config,
            g = a("#ldg_lockmask", q)[0],
            h = g ? g.style : "",
            i = d ? "absolute" : "fixed";
            return g || (c = '<iframe src="javascript:\'\'" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>', g = q.createElement("div"), g.id = "ldg_lockmask", g.style.cssText = "position:" + i + ";left:0;top:0;width:100%;height:100%;overflow:hidden;", h = g.style, d && (g.innerHTML = c), q.body.appendChild(g)),
            i === "absolute" && (h.width = _$top.width(), h.height = _$top.height(), h.top = _$top.scrollTop(), h.left = _$top.scrollLeft(), b._setFixed(g)),
            h.zIndex = e,
            h.display = "",
            b.zindex(),
            b.DOM.border.addClass("ui_state_lock"),
            b._lock = !0,
            b
        },
        unlock: function () {
            var b = this,
            c = b.config,
            d = a("#ldg_lockmask", q)[0];
            if (d && b._lock) {
                if (c.parent && c.parent._lock) {
                    var e = c.parent.DOM.wrap[0].style.zIndex;
                    d.style.zIndex = parseInt(e, 10) - 1
                } else d.style.display = "none";
                b.DOM.border.removeClass("ui_state_lock")
            }
            return b._lock = !1,
            b
        },
        close: function () {
            var c = this,
            d = c.DOM,
            e = d.wrap,
            f = v.list,
            g = c.config.close;
            c.time();
            if (c.iframe) {
                if (typeof g == "function" && g.call(c, c.iframe.contentWindow, b) === !1) return c;
                a(c.iframe).unbind("load", c._fmLoad).attr("src", "javascript:''").remove(),
                d.content.removeClass("ui_state_full"),
                c._frmTimer && clearTimeout(c._frmTimer)
            } else if (typeof g == "function" && g.call(c, b) === !1) return c;
            c.unlock(),
            c._maxState && (_$html.removeClass("ui_lock_scroll"), d.res[0].style.display = "none"),
            v.focus === c && (v.focus = null),
            c._removeEvent(),
            delete f[c.config.id];
            if (h) e.remove();
            else {
                h = c,
                c._minState && (d.main[0].style.display = "", d.buttons[0].style.display = "", d.dialog[0].style.width = ""),
                d.wrap[0].style.cssText = "left:0;top:0;",
                d.wrap[0].className = "",
                d.border.removeClass("ui_state_focus"),
                d.title[0].innerHTML = "",
                d.content.html(""),
                d.icon[0].innerHTML = "",
                d.buttons[0].innerHTML = "",
                c.hide(!0)._setAbsolute();
                for (var i in c) c.hasOwnProperty(i) && i !== "DOM" && delete c[i]
            }
            return c.closed = !0,
            c
        },
        max: function () {
            var a = this,
            b, c = a.DOM,
            e = c.wrap[0].style,
            f = c.main[0].style,
            g = c.rb[0].style,
            h = c.title[0].style,
            i = a.config,
            j = _$top.scrollTop(),
            k = _$top.scrollLeft();
            return a._maxState ? (_$html.removeClass("ui_lock_scroll"), e.top = a._or.t, e.left = a._or.l, a.size(a._or.w, a._or.h)._autoPositionType(), i.drag = a._or.d, i.resize = a._or.r, g.cursor = a._or.rc, h.cursor = a._or.tc, c.res[0].style.display = "none", c.max[0].style.display = "inline-block", delete a._or, a._maxState = !1) : (_$html.addClass("ui_lock_scroll"), a._minState && a.min(), a._or = {
                t: e.top,
                l: e.left,
                w: f.width,
                h: f.height,
                d: i.drag,
                r: i.resize,
                rc: g.cursor,
                tc: h.cursor
            },
            e.top = j + "px", e.left = k + "px", b = a._maxSize(), a.size(b.w, b.h)._setAbsolute(), d && t && (e.width = _$top.width() + "px"), i.drag = !1, i.resize = !1, g.cursor = "auto", h.cursor = "auto", c.max[0].style.display = "none", c.res[0].style.display = "inline-block", a._maxState = !0),
            a
        },
        min: function () {
            var a = this,
            b = a.DOM,
            c = b.main[0].style,
            d = b.buttons[0].style,
            e = b.dialog[0].style,
            f = b.rb[0].style.cursor,
            g = a.config.resize;
            return a._minState ? (c.display = "", d.display = a._minRz.btn, e.width = "", g = a._minRz, f.cursor = a._minRz.rzs ? "se-resize" : "auto", delete a._minRz, a._minState = !1) : (a._maxState && a.max(), a._minRz = {
                rzs: g,
                btn: d.display
            },
            c.display = "none", d.display = "none", e.width = c.width, f.cursor = "auto", g = !1, a._minState = !0),
            a._ie6SelectFix(),
            a
        },
        get: function (a, b) {
            return v.list[a] ? b === 1 ? v.list[a] : v.list[a].content || null : null
        },
        reload: function (c, d, e) {
            c = c || b;
            try {
                c.location.href = d ? d : c.location.href
            } catch (f) {
                d = this.iframe.src,
                a(this.iframe).attr("src", d)
            }
            return e && e.call(this),
            this
        },
        _iframe: function (b) {
            var c = this,
            e, f, g, h, i, j, k, l = c.DOM.content,
            m = c.config,
            n = c._load = a(".ui_loading", l[0])[0],
            o = "position:absolute;left:-9999em;border:none 0;background:transparent",
            p = "width:100%;height:100%;border:none 0;";
            if (m.cache === !1) {
                var s = (new Date).getTime(),
                t = b.replace(/([?&])_=[^&]*/, "$1_=" + s);
                b = t + (t === b ? (/\?/.test(b) ? "&" : "?") + "_=" + s : "")
            }
            e = c.iframe = q.createElement("iframe"),
            e.name = m.id,
            e.id = m.id,
            e.style.cssText = o,
            e.setAttribute("frameborder", 0, 0),
            f = a(e),
            l[0].appendChild(e),
            c._frmTimer = setTimeout(function () {
                top.$('iframe#' + m.id).load(function () {
                    Loading(false);
                });
            },
            1);
            var u = c._fmLoad = function () {
                l.addClass("ui_state_full");
                var b = c.DOM,
                f, o = b.lt[0].offsetHeight,
                q = b.main[0].style;
                n.style.cssText = "display:none;position:absolute;background:#FFF;opacity:0;filter:alpha(opacity=0);z-index:1;width:" + q.width + ";height:" + q.height + ";";
                try {
                    g = c.content = e.contentWindow,
                    h = a(g.document),
                    i = a(g.document.body)
                } catch (s) {
                    e.style.cssText = p;
                    return
                }
                j = m.width === "auto" ? h.width() + (d ? 0 : parseInt(i.css("marginLeft"))) : m.width,
                k = m.height === "auto" ? h.height() : m.height,
                setTimeout(function () {
                    e.style.cssText = p
                },
                0),
                c._maxState || c.size(j, k).position(m.left, m.top),
                n.style.width = q.width,
                n.style.height = q.height,
                m.init && m.init.call(c, g, r)
            };
            c.iframe.api = c,
            f.bind("load", u);
            f.attr("src", b);
        },
        _getDOM: function () {
            var b = q.createElement("div"),
            c = q.body;
            b.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;",
            b.innerHTML = l;
            var d, e = 0,
            f = {
                wrap: a(b)
            },
            g = b.getElementsByTagName("*"),
            h = g.length;
            for (; e < h; e++) d = g[e].className.split("ui_")[1],
            d && (f[d] = a(g[e]));
            return c.insertBefore(b, c.firstChild),
            f
        },
        _toNumber: function (a, b) {
            return typeof a == "number" ? a : (a.indexOf("%") !== -1 && (a = parseInt(b * a.split("%")[0] / 100)), a)
        },
        _maxSize: function () {
            var a = this,
            b = a.DOM,
            c = b.wrap[0],
            d = b.main[0],
            e,
            f;
            return e = _$top.width() - c.offsetWidth + d.offsetWidth,
            f = _$top.height() - c.offsetHeight + d.offsetHeight,
            {
                w: e,
                h: f
            }
        },
        _ie6PngFix: function () {
            if (d) {
                var a = 0,
                b, c, e, f, g = v.setting.path + "/skins/",
                h = this.DOM.wrap[0].getElementsByTagName("*");
                for (; a < h.length; a++) b = h[a],
                c = b.currentStyle.png,
                c && (e = g + c, f = b.runtimeStyle, f.backgroundImage = "none", f.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + e + "',sizingMethod='scale')")
            }
            return this
        },
        _ie6SelectFix: d ?
        function () {
            var a = this.DOM.wrap,
            b = a[0],
            c = c + "iframeMask",
            d = a[c],
            e = b.offsetWidth,
            f = b.offsetHeight;
            e += "px",
            f += "px",
            d ? (d.style.width = e, d.style.height = f) : (d = b.appendChild(q.createElement("iframe")), a[c] = d, d.src = "javascript:''", d.style.cssText = "position:absolute;z-index:-1;left:0;top:0;filter:alpha(opacity=0);width:" + e + ";height:" + f)
        } : e,
        _autoPositionType: function () {
            this[this.config.fixed ? "_setFixed" : "_setAbsolute"]()
        },
        _setFixed: function (a) {
            var b = a ? a.style : this.DOM.wrap[0].style;
            if (d) {
                var c = _$top.scrollLeft(),
                e = _$top.scrollTop(),
                f = parseInt(b.left) - c,
                g = parseInt(b.top) - e,
                h = t ? "this.ownerDocument.body" : "this.ownerDocument.documentElement";
                this._setAbsolute(),
                b.setExpression("left", h + ".scrollLeft +" + f),
                b.setExpression("top", h + ".scrollTop +" + g)
            } else b.position = "fixed"
        },
        _setAbsolute: function () {
            var a = this.DOM.wrap[0].style;
            d && (a.removeExpression("left"), a.removeExpression("top")),
            a.position = "absolute"
        },
        _click: function (a) {
            var c = this,
            d = c._listeners[a] && c._listeners[a].callback;
            return typeof d != "function" || d.call(c, b) !== !1 ? c.close() : c
        },
        _reset: function () {
            var c = !!b.ActiveXObject,
            e, f = this,
            g = _$top.width(),
            h = _$top.height(),
            i = f._winSize || g * h,
            j = f._lockDocW || g,
            k = f._left,
            l = f._top;
            if (c) {
                f._lock && d && a("#ldg_lockmask", q).css({
                    width: g + "px",
                    height: h + 17 + "px"
                }),
                newWidth = f._lockDocW = g,
                e = f._winSize = g * h;
                if (i === e) return
            }
            if (f._maxState) {
                var m = f._maxSize();
                f.size(m.w, m.h)
            }
            if (c && Math.abs(j - newWidth) === 17) return; (k || l) && f.position(k, l)
        },
        _addEvent: function () {
            var a, b = this,
            c = b.config,
            d = b.DOM;
            b._winResize = function () {
                a && clearTimeout(a),
                a = setTimeout(function () {
                    b._reset()
                },
                140)
            },
            _$top.bind("resize", b._winResize),
            d.wrap.bind("click",
            function (a) {
                var c = a.target,
                e;
                if (c.disabled) return !1;
                if (c === d.close[0]) return b._click("cancel"),
                !1;
                if (c === d.max[0] || c === d.res[0] || c === d.max_b[0] || c === d.res_b[0] || c === d.res_t[0]) return b.max(),
                !1;
                if (c === d.min[0] || c === d.min_b[0]) return b.min(),
                !1;
                e = c[k + "callback"],
                e && b._click(e)
            }).bind("mousedown",
            function (a) {
                b.zindex();
                var e = a.target;
                if (c.drag !== !1 && e === d.title[0] || c.resize !== !1 && e === d.rb[0]) return w(a),
                !1
            }),
            c.max && d.title.bind("dblclick",
            function () {
                return b.max(),
                !1
            })
        },
        _removeEvent: function () {
            var a = this,
            b = a.DOM;
            b.wrap.unbind(),
            b.title.unbind(),
            _$top.unbind("resize", a._winResize)
        }
    },
    v.fn._init.prototype = v.fn,
    v.focus = null,
    v.list = {},
    i = function (a) {
        var b = a.target,
        c = v.focus,
        d = a.keyCode;
        if (!c || !c.config.esc || c.config.cancel === !1) return;
        d === 27 && c._click(c.config.cancelVal)
    },
    _$doc.bind("keydown", i),
    r != b && a(b).bind("unload",
    function () {
        var b = v.list;
        for (var c in b) b[c] && b[c].close();
        h && h.DOM.wrap.remove(),
        _$doc.unbind("keydown", i),
        a("#ldg_lockmask", q)[0] && a("#ldg_lockmask", q).remove(),
        a("#ldg_dragmask", q)[0] && a("#ldg_dragmask", q).remove()
    }),
    v.setting = {
        content: '<div class="ui_loading"><span></span></div>',
        title: "\u89c6\u7a97 ",
        button: null,
        ok: null,
        cancel: null,
        init: null,
        close: null,
        okVal: "\u786e\u5b9a",
        cancelVal: "\u53d6\u6d88",
        skin: "",
        esc: !0,
        show: !0,
        width: "auto",
        height: "auto",
        icon: null,
        path: n,
        lock: !1,
        focus: !0,
        parent: null,
        padding: "0px",
        fixed: !1,
        left: "50%",
        top: "38.2%",
        max: !0,
        min: !0,
        zIndex: 1976,
        resize: !0,
        drag: !0,
        cache: !0,
        data: null,
        extendDrag: !1
    };
    var w, x = "setCapture" in s,
    y = "onlosecapture" in s;
    v.dragEvent = {
        onstart: e,
        start: function (a) {
            var b = v.dragEvent;
            return _$doc.bind("mousemove", b.move).bind("mouseup", b.end),
            b._sClientX = a.clientX,
            b._sClientY = a.clientY,
            b.onstart(a.clientX, a.clientY),
            !1
        },
        onmove: e,
        move: function (a) {
            var b = v.dragEvent;
            return b.onmove(a.clientX - b._sClientX, a.clientY - b._sClientY),
            !1
        },
        onend: e,
        end: function (a) {
            var b = v.dragEvent;
            return _$doc.unbind("mousemove", b.move).unbind("mouseup", b.end),
            b.onend(a.clientX, a.clientY),
            !1
        }
    },
    w = function (b) {
        var c, e, f, g, h, i, j = v.focus,
        k = j.config,
        l = j.DOM,
        m = l.wrap[0],
        n = l.title,
        o = l.main[0],
        p = v.dragEvent,
        s = "getSelection" in r ?
        function () {
            r.getSelection().removeAllRanges()
        } : function () {
            try {
                q.selection.empty()
            } catch (a) { }
        };
        p.onstart = function (a, b) {
            i ? (e = o.offsetWidth, f = o.offsetHeight) : (g = m.offsetLeft, h = m.offsetTop),
            _$doc.bind("dblclick", p.end),
            !d && y ? n.bind("losecapture", p.end) : _$top.bind("blur", p.end),
            x && n[0].setCapture(),
            l.border.addClass("ui_state_drag"),
            j.focus()
        },
        p.onmove = function (b, d) {
            if (i) {
                var l = m.style,
                n = o.style,
                p = b + e,
                q = d + f;
                l.width = "auto",
                k.width = n.width = Math.max(0, p) + "px",
                l.width = m.offsetWidth + "px",
                k.height = n.height = Math.max(0, q) + "px",
                j._load && a(j._load).css({
                    width: n.width,
                    height: n.height
                })
            } else {
                var n = m.style,
                r = b + g,
                t = d + h;
                k.left = Math.max(c.minX, Math.min(c.maxX, r)),
                k.top = Math.max(c.minY, Math.min(c.maxY, t)),
                n.left = k.left + "px",
                n.top = k.top + "px"
            }
            s()
        },
        p.onend = function (a, b) {
            _$doc.unbind("dblclick", p.end),
            !d && y ? n.unbind("losecapture", p.end) : _$top.unbind("blur", p.end),
            x && n[0].releaseCapture(),
            d && j._autoPositionType(),
            l.border.removeClass("ui_state_drag")
        },
        i = b.target === l.rb[0] ? !0 : !1,
        c = function (a) {
            var b = m.offsetWidth,
            c = n[0].offsetHeight || 20,
            d = _$top.width(),
            e = _$top.height(),
            f = a ? 0 : _$top.scrollLeft(),
            g = a ? 0 : _$top.scrollTop();
            return maxX = d - b + f,
            maxY = e - c + g,
            {
                minX: f,
                minY: g,
                maxX: maxX,
                maxY: maxY
            }
        }(m.style.position === "fixed"),
        p.start(b)
    },
    a(function () {
        setTimeout(function () {
            if (f) return;
            v({
                left: "-9999em",
                time: 9,
                fixed: !1,
                lock: !1,
                focus: !1
            })
        },
        150),
        v.setting.extendDrag &&
        function (a) {
            var b = q.createElement("div"),
            c = b.style,
            e = d ? "absolute" : "fixed";
            b.id = "ldg_dragmask",
            c.cssText = "display:none;position:" + e + ";left:0;top:0;width:100%;height:100%;" + "cursor:move;filter:alpha(opacity=0);opacity:0;background:#FFF;pointer-events:none;",
            q.body.appendChild(b),
            a._start = a.start,
            a._end = a.end,
            a.start = function () {
                var b = v.focus,
                d = b.DOM.main[0],
                f = b.iframe;
                a._start.apply(this, arguments),
                c.display = "block",
                c.zIndex = v.setting.zIndex + 3,
                e === "absolute" && (c.width = _$top.width() + "px", c.height = _$top.height() + "px", c.left = _$doc.scrollLeft() + "px", c.top = _$doc.scrollTop() + "px"),
                f && d.offsetWidth * d.offsetHeight > 307200 && (d.style.visibility = "hidden")
            },
            a.end = function () {
                var b = v.focus;
                a._end.apply(this, arguments),
                c.display = "none",
                b && (b.DOM.main[0].style.visibility = "visible")
            }
        }(v.dragEvent)
    }),
    a.fn.dialog = function () {
        var a = arguments;
        return this.bind("click",
        function () {
            return v.apply(this, a),
            !1
        }),
        this
    },
    b.lhgdialog = a.dialog = v
})(this.jQuery || this.lhgcore, this),
function (a, b, c) {
    var d = function () {
        return b.setting.zIndex
    };
    b.alert = function (a, c, e) {
        return b({
            title: "\u8b66\u544a",
            id: "Alert",
            zIndex: d(),
            icon: "alert.gif",
            fixed: !0,
            lock: !0,
            content: a,
            ok: !0,
            resize: !1,
            close: c,
            parent: e || null
        })
    },
    b.confirm = function (a, c, e, f) {
        return b({
            title: "\u786e\u8ba4",
            id: "confirm.gif",
            zIndex: d(),
            icon: "confirm.gif",
            fixed: !0,
            lock: !0,
            content: a,
            resize: !1,
            parent: f || null,
            ok: function (a) {
                return c.call(this, a)
            },
            cancel: function (a) {
                return e && e.call(this, a)
            }
        })
    },
    b.prompt = function (a, c, e, f) {
        e = e || "";
        var g;
        return b({
            title: "\u63d0\u95ee",
            id: "Prompt",
            zIndex: d(),
            icon: "prompt.gif",
            fixed: !0,
            lock: !0,
            parent: f || null,
            content: ['<div style="margin-bottom:5px;font-size:12px">', a, "</div>", "<div>", '<input value="', e, '" style="width:18em;padding:6px 4px" />', "</div>"].join(""),
            init: function () {
                g = this.DOM.content[0].getElementsByTagName("input")[0],
                g.select(),
                g.focus()
            },
            ok: function (a) {
                return c && c.call(this, g.value, a)
            },
            cancel: !0
        })
    },
    b.tips = function (a, c, e, f) {
        var g = e ?
        function () {
            this.DOM.icon[0].innerHTML = '<img src="' + this.config.path + "icons/" + e + '" class="ui_icon_bg"/>',
            this.DOM.icon[0].style.display = "",
            f && (this.config.close = f)
        } : function () {
            this.DOM.icon[0].style.display = "none",
            f && (this.config.close = f)
        };
        return b({
            id: "Tips",
            zIndex: d(),
            title: !1,
            cancel: !1,
            fixed: !0,
            lock: !1,
            resize: !1
        }).content(a).time(c || 1.5, g)
    }
}(this.jQuery || this.lhgcore, this.lhgdialog)