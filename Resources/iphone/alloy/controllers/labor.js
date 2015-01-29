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
    this.__controllerPath = "labor";
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
    $.__views.labor_window = Ti.UI.createWindow({
        id: "labor_window",
        title: "Field Tech/Labor List"
    });
    $.__views.labor_window && $.addTopLevelView($.__views.labor_window);
    var __alloyId7 = [];
    $.__views.labor_row = Ti.UI.createTableViewRow({
        id: "labor_row",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "labor"
    });
    __alloyId7.push($.__views.labor_row);
    $.__views.labor_table = Ti.UI.createTableView({
        data: __alloyId7,
        id: "labor_table",
        backgroundImage: "page3_750x1334-emboss.png"
    });
    $.__views.labor_window.add($.__views.labor_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.labor_window);
        Ti.API.info("This is child widow checking _tab : " + JSON.stringify(_tab));
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;