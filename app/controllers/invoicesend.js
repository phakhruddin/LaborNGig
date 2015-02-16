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
		emailpdf();
		var url = '../Documents/invoice.pdf';
		console.log("opening viewpdf(url) on "+url);
     	viewpdf(url);
		/*
		var clientController = Alloy.createController('invoicesendchild',{
			title: title
		});
		clientController.openMainWindow($.tab_invoicesend);*/
});


function transformFunction(model) {
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = "Invoice#: "+transform.col1+" - "+transform.col2;
	return transform;
}

function emailpdf(){
	
	var html2pdf = require('com.factisresearch.html2pdf');  
 	Ti.API.info("module is => " + html2pdf);  
   
 	html2pdf.addEventListener('pdfready', function(e) {  
	   	 var emailDialog = Ti.UI.createEmailDialog();  
	     var file = Ti.Filesystem.getFile(e.pdf);
	     var newfile = file.rename('invoice.pdf');
	     //emailDialog.addAttachment(Ti.Filesystem.getFile(e.pdf));
	     //emailDialog.open();  
	     file.rename('invoice.pdf');
	     var url = '../Documents/invoice.pdf';
	     var newurl = Ti.Filesystem.getFile(url);
	     emailDialog.addAttachment(newurl);
	     emailDialog.open();  
 	});  
   
 	var html = '<html><body><p>Hello World!</p></body></html>';  
   
 	html2pdf.setHtmlString(html); 
 
}

function viewpdf(url){
	var win = Ti.UI.createWindow();
	// Use a NavigationWindow to create a navigation bar for the window
	var navWin = Ti.UI.iOS.createNavigationWindow({
		window: win,
		backgroundImage: "bg-black1.png"
		});
	
	var navButton = Titanium.UI.createButton({title:'Back'});
	win.RightNavButton = navButton;
	//var leftNavButton = Titanium.UI.createButton({title:'Back'});
	//win.LeftNavButton = leftNavButton;
	
	var winButton = Titanium.UI.createButton({
	    title:'View PDF',
	    height:40,
	    width:200,
	    top:270
	});
	
	win.add(winButton);
	
	// Create a document viewer to preview a PDF file
	docViewer = Ti.UI.iOS.createDocumentViewer({url:url});
	// Opens the options menu and when the user clicks on 'Quick Look'
	// the document viewer launches with an animated transition
	navButton.addEventListener('click', function(){
	    //docViewer.show({view:navButton, animated: true});
	    navWin.close();
	});
	// The document viewer immediately launches without an animation
	winButton.addEventListener('click', function(){docViewer.show();});
	
	navWin.open();
}
 
