function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openDetail(e) {
        Ti.API.info("index = " + JSON.stringify(e.index));
        Ti.API.info("in open_button click event title :" + e.row.Title);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabViewOne";
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
    $.__views.__alloyId12 = Ti.UI.createWindow({
        backgroundColor: "black",
        title: "Labor&Gig",
        id: "__alloyId12"
    });
    var __alloyId13 = [];
    $.__views.schedule = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        id: "schedule",
        backgroundColor: "transparent",
        opacity: "0",
        Title: "location"
    });
    __alloyId13.push($.__views.schedule);
    $.__views.label_schedule = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        id: "label_schedule",
        top: "5",
        left: "50",
        text: "Schedule >"
    });
    $.__views.schedule.add($.__views.label_schedule);
    $.__views.location = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        id: "location",
        backgroundColor: "transparent",
        Title: "location"
    });
    __alloyId13.push($.__views.location);
    $.__views.label_location = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        id: "label_location",
        top: "5",
        left: "50",
        text: "Where is the labor today? >"
    });
    $.__views.location.add($.__views.label_location);
    $.__views.project = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        id: "project",
        backgroundColor: "transparent",
        Title: "project"
    });
    __alloyId13.push($.__views.project);
    $.__views.label_project = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "yellow",
        id: "label_project",
        top: "5",
        left: "50",
        text: "Projects >"
    });
    $.__views.project.add($.__views.label_project);
    $.__views.client = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        id: "client",
        backgroundColor: "transparent",
        Title: "clients"
    });
    __alloyId13.push($.__views.client);
    $.__views.label_clients = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "blue",
        id: "label_clients",
        top: "5",
        left: "50",
        text: "Clients >"
    });
    $.__views.client.add($.__views.label_clients);
    $.__views.invoice = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        id: "invoice",
        backgroundColor: "transparent",
        Title: "invoice"
    });
    __alloyId13.push($.__views.invoice);
    $.__views.label_invoice = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "green",
        id: "label_invoice",
        top: "5",
        left: "50",
        text: "Invoice >"
    });
    $.__views.invoice.add($.__views.label_invoice);
    $.__views.supplier = Ti.UI.createTableViewRow({
        width: Ti.UI.SIZE,
        height: "36",
        id: "supplier",
        backgroundColor: "transparent",
        Title: "supplier"
    });
    __alloyId13.push($.__views.supplier);
    $.__views.label_supplier = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "orange",
        id: "label_supplier",
        top: "5",
        left: "50",
        text: "Supplier >"
    });
    $.__views.supplier.add($.__views.label_supplier);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId13,
        id: "table",
        backgroundImage: "page3_750x1334-emboss.png"
    });
    $.__views.__alloyId12.add($.__views.table);
    $.__views.tab_one = Ti.UI.createTab({
        font: {
            fontSize: "50dp",
            fontWeight: "bold",
            textStyle: Ti.UI.TEXT_STYLE_HEADLINE
        },
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        window: $.__views.__alloyId12,
        id: "tab_one",
        title: "MAIN"
    });
    $.__views.tab_one && $.addTopLevelView($.__views.tab_one);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.location.addEventListener("click", function(e) {
        openDetail(e);
        var tabViewOneChildController = Alloy.createController("location");
        tabViewOneChildController.openMainWindow($.tab_one);
    });
    $.project.addEventListener("click", function(e) {
        openDetail(e);
        var tabViewOneChildController = Alloy.createController("project");
        tabViewOneChildController.openMainWindow($.tab_one);
    });
    $.schedule.addEventListener("click", function(e) {
        openDetail(e);
        var scheduleController = Alloy.createController("schedule");
        scheduleController.openMainWindow($.tab_one);
    });
    $.client.addEventListener("click", function(e) {
        openDetail(e);
        var scheduleController = Alloy.createController("client");
        scheduleController.openMainWindow($.tab_one);
    });
    $.invoice.addEventListener("click", function(e) {
        openDetail(e);
        var scheduleController = Alloy.createController("invoice");
        scheduleController.openMainWindow($.tab_one);
    });
    $.supplier.addEventListener("click", function(e) {
        Alloy.Globals.openDetail(e);
        var scheduleController = Alloy.createController("supplier");
        scheduleController.openMainWindow($.tab_one);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;