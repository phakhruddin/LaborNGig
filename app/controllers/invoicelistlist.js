exports.openMainWindow = function(_tab) {
  _tab.open($.invoicelist_window);
  Ti.API.info("This is child widow invoice.js" +JSON.stringify(_tab));
  //	$.invoicelist_table.search = $.search_history;
	Alloy.Collections.invoice.fetch();	

};
/*
$.invoicelist_window.addEventListener("click", function(e){
		//Alloy.Globals.openDetail(e);
		console.log("JSON stringify(e)  : " +JSON.stringify(e));
});*/

/*$.invoicelist_list.addEventListener("click", function(e){
		//Alloy.Globals.openDetail(e);
		console.log("JSON stringify(e)  : " +JSON.stringify(e));
});
*/
function transformFunction(model) {
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = "Invoice#: "+transform.col1+" - "+transform.col2;
	transform.total ='TOTAL: '+transform.col4;
	transform.bal ='BALANCE: '+transform.col5;
	transform.paid ='PAID: '+transform.col6;
	return transform;
}

function filterFunction(collection) { 
		var sorttype = Titanium.App.Properties.getString('sorttype'); 
	    console.log("thetype in filter : "+sorttype);   
		return collection.where({col5: sorttype });
}


function doClick(e) {
	console.log("JSON.stringify e : " +JSON.stringify(e));
	alert("click this");
};

$.sortview.addEventListener("click", function(e){
	console.log("JSON stringify e : " +JSON.stringify(e));
	console.log("JSON stringify e.source : " +JSON.stringify(e.source));
	var thesort = e.source.text;
	if (thesort == "ALL") { var thetype = "none"; };
	if (thesort == "NearSorted") { var thetype = "sortboth"; };
	if (thesort == "SortbyLAT") { var thetype = "sortlat"; };
	if (thesort == "SortbyLON") { var thetype = "sortlon"; };
	Ti.App.Properties.setString("thetype",thetype);
	Alloy.Collections.invoice.fetch();
});