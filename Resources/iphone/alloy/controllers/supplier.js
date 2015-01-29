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
    this.__controllerPath = "supplier";
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
    $.__views.supplier_window = Ti.UI.createWindow({
        id: "supplier_window",
        title: "Supplier List"
    });
    $.__views.supplier_window && $.addTopLevelView($.__views.supplier_window);
    var __alloyId11 = [];
    $.__views.supplier_row = Ti.UI.createTableViewRow({
        id: "supplier_row",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "supplier"
    });
    __alloyId11.push($.__views.supplier_row);
    $.__views.supplier_table = Ti.UI.createTableView({
        data: __alloyId11,
        id: "supplier_table",
        backgroundImage: "page3_750x1334-emboss.png"
    });
    $.__views.supplier_window.add($.__views.supplier_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.supplier_window);
        Ti.API.info("This is child widow schedule.js" + JSON.stringify(_tab));
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;