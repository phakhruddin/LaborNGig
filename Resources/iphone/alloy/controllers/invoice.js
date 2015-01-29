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
    this.__controllerPath = "invoice";
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
    $.__views.invoice_window = Ti.UI.createWindow({
        id: "invoice_window",
        title: "Invoice List"
    });
    $.__views.invoice_window && $.addTopLevelView($.__views.invoice_window);
    var __alloyId6 = [];
    $.__views.invoice_row = Ti.UI.createTableViewRow({
        id: "invoice_row",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "invoice"
    });
    __alloyId6.push($.__views.invoice_row);
    $.__views.invoice_table = Ti.UI.createTableView({
        data: __alloyId6,
        id: "invoice_table",
        backgroundImage: "page3_750x1334-emboss.png"
    });
    $.__views.invoice_window.add($.__views.invoice_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function(_tab) {
        _tab.open($.invoice_window);
        Ti.API.info("This is child widow schedule.js" + JSON.stringify(_tab));
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;