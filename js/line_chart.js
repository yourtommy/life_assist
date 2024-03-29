// popup
function initLineChart() {	
	 var tokenRegex = /\{([^\}]+)\}/g,
    objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
    replacer = function (all, key, obj) {
        var res = obj;
        key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
            name = name || quotedName;
            if (res) {
                if (name in res) {
                    res = res[name];
                }
                typeof res == "function" && isFunc && (res = res());
            }
        });
        res = (res == null || res == obj ? all : res) + "";
        return res;
    },
    fill = function (str, obj) {
        return String(str).replace(tokenRegex, function (all, key) {
            return replacer(all, key, obj);
        });
    };
    Raphael.fn.popup = function (X, Y, set, pos, ret) {
        pos = String(pos || "top-middle").split("-");
        pos[1] = pos[1] || "middle";
        var r = 5,
            bb = set.getBBox(),
            w = Math.round(bb.width),
            h = Math.round(bb.height),
            x = Math.round(bb.x) - r,
            y = Math.round(bb.y) - r,
            gap = Math.min(h / 2, w / 2, 10),
            shapes = {
                top: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}l-{right},0-{gap},{gap}-{gap}-{gap}-{left},0a{r},{r},0,0,1-{r}-{r}v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z",
                bottom: "M{x},{y}l{left},0,{gap}-{gap},{gap},{gap},{right},0a{r},{r},0,0,1,{r},{r}v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z",
                right: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}l0-{bottom}-{gap}-{gap},{gap}-{gap},0-{top}a{r},{r},0,0,1,{r}-{r}z",
                left: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}l0,{top},{gap},{gap}-{gap},{gap},0,{bottom}a{r},{r},0,0,1,-{r},{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z"
            },
            offset = {
                hx0: X - (x + r + w - gap * 2),
                hx1: X - (x + r + w / 2 - gap),
                hx2: X - (x + r + gap),
                vhy: Y - (y + r + h + r + gap),
                "^hy": Y - (y - gap)
                
            },
            mask = [{
                x: x + r,
                y: y,
                w: w,
                w4: w / 4,
                h4: h / 4,
                right: 0,
                left: w - gap * 2,
                bottom: 0,
                top: h - gap * 2,
                r: r,
                h: h,
                gap: gap
            }, {
                x: x + r,
                y: y,
                w: w,
                w4: w / 4,
                h4: h / 4,
                left: w / 2 - gap,
                right: w / 2 - gap,
                top: h / 2 - gap,
                bottom: h / 2 - gap,
                r: r,
                h: h,
                gap: gap
            }, {
                x: x + r,
                y: y,
                w: w,
                w4: w / 4,
                h4: h / 4,
                left: 0,
                right: w - gap * 2,
                top: 0,
                bottom: h - gap * 2,
                r: r,
                h: h,
                gap: gap
            }][pos[1] == "middle" ? 1 : (pos[1] == "top" || pos[1] == "left") * 2];
            var dx = 0,
                dy = 0,
                out = this.path(fill(shapes[pos[0]], mask)).insertBefore(set);
            switch (pos[0]) {
                case "top":
                    dx = X - (x + r + mask.left + gap);
                    dy = Y - (y + r + h + r + gap);
                break;
                case "bottom":
                    dx = X - (x + r + mask.left + gap);
                    dy = Y - (y - gap);
                break;
                case "left":
                    dx = X - (x + r + w + r + gap);
                    dy = Y - (y + r + mask.top + gap);
                break;
                case "right":
                    dx = X - (x - gap);
                    dy = Y - (y + r + mask.top + gap);
                break;
            }
            out.translate(dx, dy);
            if (ret) {
                ret = out.attr("path");
                out.remove();
                return {
                    path: ret,
                    dx: dx,
                    dy: dy
                };
            }
            set.translate(dx, dy);
            return out;
    };
}

//analytics

Raphael.fn.drawGrid = function (x, y, w, h, wv, hv, color) {
    color = color || "#000";
    var path = ["M", Math.round(x) + .5, Math.round(y) + .5, "L", Math.round(x + w) + .5, Math.round(y) + .5, Math.round(x + w) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y) + .5],
        rowHeight = h / hv,
        columnWidth = w / wv;
    for (var i = 1; i < hv; i++) {
        path = path.concat(["M", Math.round(x) + .5, Math.round(y + i * rowHeight) + .5, "H", Math.round(x + w) + .5]);
    }
    for (i = 1; i < wv; i++) {
        path = path.concat(["M", Math.round(x + i * columnWidth) + .5, Math.round(y) + .5, "V", Math.round(y + h) + .5]);
    }
    return this.path(path.join(",")).attr({stroke: color});
};

function drawLineChart (holder, width, height, label_unit, data_unit,
								grid_color, chart_array) {
    function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
        var l1 = (p2x - p1x) / 2,
            l2 = (p3x - p2x) / 2,
            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
        a = p1y < p2y ? Math.PI - a : a;
        b = p3y < p2y ? Math.PI - b : b;
        var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
            dx1 = l1 * Math.sin(alpha + a),
            dy1 = l1 * Math.cos(alpha + a),
            dx2 = l2 * Math.sin(alpha + b),
            dy2 = l2 * Math.cos(alpha + b);
        return {
            x1: p2x - dx1,
            y1: p2y + dy1,
            x2: p2x + dx2,
            y2: p2y + dy2
        };
    }   
    
    var r = Raphael(holder, width, height); 
      
	
	for (var chart_index = 0; chart_index < chart_array.length; chart_index++) {
		var chart = chart_array[chart_index];
		 var line_color = chart.line_color || "chocolate";
	    var dot_color = chart.dot_color || "lightpink";
	    var grid_color = grid_color || "gray";  
	    
	    // Grab the data_array
	    var label_array = [],
	        data_array = [];
		
		for (var i = 0; i < chart.info.length; i++) {
			label_array.push(chart.info[i].label);
			data_array.push(chart.info[i].data);
		}
	    
	    // Draw
	    var leftgutter = 20,
	        bottomgutter = 20,
	        topgutter = 20,
	        dot_style = {fill:dot_color, stroke: line_color, "stroke-width": 2},
	        label_text_style = {font: '12px Helvetica, Arial', fill: "#fff"},
	        popup_text_style = {font: '10px Helvetica, Arial', fill: "#fff"},
	        blanket_style = {stroke: "none", fill: "#fff", opacity: 0};
	
	    var grid_width = label_array.length - 1,
	    	grid_height = 10;
	        
	    var X = (width - leftgutter) / chart.info.length,
	        max = Math.max.apply(Math, data_array),
	        Y = (height - bottomgutter - topgutter) / max;    
	    
	    if (chart_index == 0) // one grid only
	    	r.drawGrid(leftgutter + X * .5 + .5, topgutter + .5, width - leftgutter - X, height - topgutter - bottomgutter, grid_width, grid_height, grid_color);
	    var path = r.path().attr({stroke: line_color, "stroke-width": 4, "stroke-linejoin": "round"}),
	        bgp = r.path().attr({stroke: "none", opacity: .3, fill: line_color}),
	        label = r.set(),
	        lx = 0, ly = 0,
	        is_label_visible = false,
	        leave_timer,
	        blanket = r.set();
	    label.push(r.text(60, 12, "24" + data_unit).attr(label_text_style));
	    label.push(r.text(60, 27, "26" + label_unit).attr(popup_text_style).attr({fill: line_color}));
	    label.hide();
	    var frame = r.popup(100, 100, label, "right").attr({fill: "#000", stroke: "#666", "stroke-width": 2, "fill-opacity": .7}).hide();
	
	    var p, bgpp;
	    for (var i = 0, ii = label_array.length; i < ii; i++) {
	        var y = Math.round(height - bottomgutter - Y * data_array[i]),
	            x = Math.round(leftgutter + X * (i + .5)),
	            t = r.text(x, height - 6, label_array[i]).attr(label_text_style).toBack();
	        if (!i) {
	            p = ["M", x, y, "C", x, y];
	            bgpp = ["M", leftgutter + X * .5, height - bottomgutter, "L", x, y, "C", x, y];
	        }
	        if (i && i < ii - 1) {
	            var Y0 = Math.round(height - bottomgutter - Y * data_array[i - 1]),
	                X0 = Math.round(leftgutter + X * (i - .5)),
	                Y2 = Math.round(height - bottomgutter - Y * data_array[i + 1]),
	                X2 = Math.round(leftgutter + X * (i + 1.5));
	            var a = getAnchors(X0, Y0, x, y, X2, Y2);
	            p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
	            bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
	        }
	
	        var dot = r.circle(x, y, 4).attr(dot_style);
	        blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr(blanket_style));
	        var rect = blanket[blanket.length - 1];
	        (function (x, y, data_array, lbl, dot) {
	            var timer, i = 0;
	            rect.hover(function () {
	                clearTimeout(leave_timer);
	                var side = "right";
	                if (x + frame.getBBox().width > width) {
	                    side = "left";
	                }
	                var ppp = r.popup(x, y, label, side, 1),
	                    anim = Raphael.animation({
	                        path: ppp.path,
	                        transform: ["t", ppp.dx, ppp.dy]
	                    }, 200 * is_label_visible);
	                lx = label[0].transform()[0][1] + ppp.dx;
	                ly = label[0].transform()[0][2] + ppp.dy;
	                frame.show().stop().animate(anim);
	                label[0].attr({text: data_array + data_unit}).show().stop().animateWith(frame, anim, {transform: ["t", lx, ly]}, 200 * is_label_visible);
	                label[1].attr({text: lbl + label_unit}).show().stop().animateWith(frame, anim, {transform: ["t", lx, ly]}, 200 * is_label_visible);
	                dot.attr("r", 6);
	                is_label_visible = true;
	            }, function () {
	                dot.attr("r", 4);
	                leave_timer = setTimeout(function () {
	                    frame.hide();
	                    label[0].hide();
	                    label[1].hide();
	                    is_label_visible = false;
	                }, 1);
	            });
	        })(x, y, data_array[i], label_array[i], dot);
	    }
	    p = p.concat([x, y, x, y]);
	    bgpp = bgpp.concat([x, y, x, y, "L", x, height - bottomgutter, "z"]);
	    path.attr({path: p});
	    bgp.attr({path: bgpp});
	    frame.toFront();
	    label[0].toFront();
	    label[1].toFront();
	    blanket.toFront();
	    
	}
}
