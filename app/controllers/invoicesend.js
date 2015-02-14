exports.openMainWindow = function(_tab) {
  _tab.open($.invoicesend_window);
  Ti.API.info("This is child widow invoice.js" +JSON.stringify(_tab));
  	$.invoicesend_table.search = $.search_history;
	Alloy.Collections.invoice.fetch();	

};


$.invoicesend_window.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		console.log("title is: "+title);
		var clientController = Alloy.createController('invoicesendchild',{
			title: title
		});
		clientController.openMainWindow($.tab_invoicesend);
});


function transformFunction(model) {
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = "Invoice#: "+transform.col1+" - "+transform.col2;
	return transform;
}
