function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "project";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.project_window = Ti.UI.createWindow({
        id: "project_window",
        title: "Project List"
    });
    $.__views.project_window && $.addTopLevelView($.__views.project_window);
    var __alloyId9 = [];
    $.__views.project_row = Ti.UI.createTableViewRow({
        id: "project_row",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "project"
    });
    __alloyId9.push($.__views.project_row);
    $.__views.project_table = Ti.UI.createTableView({
        data: __alloyId9,
        id: "project_table",
        backgroundImage: "page3_750x1334-emboss.png"
    });
    $.__views.project_window.add($.__views.project_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.project_window);
        Ti.API.info("This is child widow schedule.js" + JSON.stringify(_tab));
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;