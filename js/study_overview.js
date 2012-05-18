var width = 320;
var height = 180;
var label_unit = "";
var data_unit = "小时";
var grid_color = "gray";
var plan_chart = {
	info:[
			{ "label":"周一", "data":5	},
			{ "label":"周二", "data":3	},
			{ "label":"周三", "data":8	},
			{ "label":"周四", "data":12 },
			{ "label":"周五", "data":6	},
			{ "label":"周六", "data":3	},
			{ "label":"周日", "data":1	}
	],
	line_color: "chocolate",
   dot_color: "lightpink"
};

var done_chart = {
	info: [
			{ "label":"周一", "data":8 },
			{ "label":"周二", "data":5 },
			{ "label":"周三", "data":4 },
			{ "label":"周四", "data":9 },
			{ "label":"周五", "data":3 },
			{ "label":"周六", "data":7 },
			{ "label":"周日", "data":1 }
	],
	line_color: "green",
   dot_color: "lightgreen"
};

var before_show_main_content = function() {
	initLineChart();
}

var after_show_main_content = function() {
	drawLineChart("plan_holder", width, height, label_unit, data_unit, grid_color, [plan_chart]);
	
	drawLineChart("done_holder", width, height, label_unit, data_unit, grid_color, [done_chart]);
}

$("#compare_charts_button").click(function() {
	if ($(this).attr("compare") == "true") {
		$(this).html("取消比较");
		$("#plan_holder").html("");
		drawLineChart("plan_holder", width, height, label_unit, data_unit, grid_color, [done_chart, plan_chart]);
		$(this).attr("compare", false);
	} else {			
		$(this).html("比较");
		$("#plan_holder").html("");
		drawLineChart("plan_holder", width, height, label_unit, data_unit, grid_color, [plan_chart]);
		$(this).attr("compare", true);
	}
});