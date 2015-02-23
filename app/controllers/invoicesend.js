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
		//var url = '../Documents/invoice.pdf';
		var url = '../Documents/Expose.pdf';
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
	    // var url = '../Documents/invoice.pdf';
	     var url = '../Documents/Expose.pdf';
	     var newurl = Ti.Filesystem.getFile(url);
	     emailDialog.addAttachment(newurl);
	     emailDialog.open();  
 	});  
   
 	//var html = '<html><body><p>dBayCo Inc. limited </p></body></html>'; 
 	
 	//var html="";
	//html += "<html><body><div id=\"top-bar\"><div id=\"doc-title\"><span class=\"name\">sample invoice : Sheet1<\/span><\/div><\/div><div id=\"sheets-viewport\"><div id=\"0\" style=\"display:none;position:relative;\" dir=\"ltr\"><div class=\"ritz grid-container\" dir=\"ltr\"><table class=\"waffle\" cellspacing=\"0\" cellpadding=\"0\"><thead><tr><th class=\"row-header freezebar-origin-ltr header-shim row-header-shim\"><\/th><th id=\"0C0\" style=\"width:195px\" class=\"header-shim\"><\/th><th id=\"0C1\" style=\"width:286px\" class=\"header-shim\"><\/th><th id=\"0C2\" style=\"width:100px\" class=\"header-shim\"><\/th><th id=\"0C3\" style=\"width:100px\" class=\"header-shim\"><\/th><th id=\"0C4\" style=\"width:100px\" class=\"header-shim\"><\/th><\/tr><\/thead><tbody><tr style='height:20px;'><th id=\"0R0\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">1<\/div><\/th><td><\/td><td><\/td><td><\/td><td><\/td><td><\/td><\/tr><tr style='height:20px;'><th id=\"0R1\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">2<\/div><\/th><td class=\"s0\" dir=\"ltr\" colspan=\"5\">DbayCo Inc. 130 Moreland Rd., Brookfield, WI 53222<\/td><\/tr><tr style='height:20px;'><th id=\"0R2\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">3<\/div><\/th><td class=\"s1\" dir=\"ltr\" colspan=\"5\">Phone: 262-501-2948, Fax: 262-290-3141. Email: deen@idevice.net<\/td><\/tr><tr style='height:20px;'><th id=\"0R3\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">4<\/div><\/th><td class=\"s2\" colspan=\"5\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R4\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">5<\/div><\/th><td class=\"s3\" dir=\"ltr\" colspan=\"3\">INVOICE<\/td><td class=\"s0\" dir=\"ltr\" colspan=\"2\">WAN-20150225-1<\/td><\/tr><tr style='height:20px;'><th id=\"0R5\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">6<\/div><\/th><td class=\"s2\" colspan=\"2\" rowspan=\"2\"><\/td><td class=\"s2\" colspan=\"3\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R6\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">7<\/div><\/th><td class=\"s4\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R7\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">8<\/div><\/th><td class=\"s2\" dir=\"ltr\">Wannoorbaya WChik<\/td><td class=\"s2\" rowspan=\"4\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\">230<\/td><td class=\"s5\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R8\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">9<\/div><\/th><td class=\"s2\" dir=\"ltr\">2258 S Sanctuary Dr<\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s6\" dir=\"ltr\">due 4\/1\/2015<\/td><\/tr><tr style='height:20px;'><th id=\"0R9\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">10<\/div><\/th><td class=\"s2\" dir=\"ltr\">New Berlin, WI 53151<\/td><td class=\"s2\" colspan=\"3\" rowspan=\"2\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R10\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">11<\/div><\/th><td class=\"s2\" dir=\"ltr\">Date: 2\/28\/2014<\/td><\/tr><tr style='height:20px;'><th id=\"0R11\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">12<\/div><\/th><td class=\"s2\" colspan=\"5\" rowspan=\"2\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R12\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">13<\/div><\/th><\/tr><tr style='height:20px;'><th id=\"0R13\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">14<\/div><\/th><td class=\"s7\" dir=\"ltr\">Item no.<\/td><td class=\"s7\" dir=\"ltr\">Description<\/td><td class=\"s7\" dir=\"ltr\">Qty<\/td><td class=\"s7\" dir=\"ltr\">Unit\/Price<\/td><td class=\"s8\" dir=\"ltr\">Price<\/td><\/tr><tr style='height:20px;'><th id=\"0R14\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">15<\/div><\/th><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R15\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">16<\/div><\/th><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s2\" dir=\"ltr\">Mow Lawn<\/td><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s9\" dir=\"ltr\">100<\/td><td class=\"s10\" dir=\"ltr\">100<\/td><\/tr><tr style='height:20px;'><th id=\"0R16\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">17<\/div><\/th><td class=\"s9\" dir=\"ltr\">2<\/td><td class=\"s2\" dir=\"ltr\">Cut Trees<\/td><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s9\" dir=\"ltr\">120<\/td><td class=\"s10\" dir=\"ltr\">120<\/td><\/tr><tr style='height:20px;'><th id=\"0R17\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">18<\/div><\/th><td class=\"s11\"><\/td><td class=\"s11\"><\/td><td class=\"s11\"><\/td><td class=\"s11\" dir=\"ltr\"><\/td><td class=\"s12\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R18\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">19<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">SubTotal<\/td><td class=\"s10\" dir=\"ltr\">220<\/td><\/tr><tr style='height:20px;'><th id=\"0R19\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">20<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Tax<\/td><td class=\"s10\" dir=\"ltr\">10<\/td><\/tr><tr style='height:20px;'><th id=\"0R20\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">21<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Other<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R21\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">22<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Discount<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R22\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">23<\/div><\/th><td><\/td><td><\/td><td class=\"s13\" dir=\"ltr\"><\/td><td class=\"s13\" dir=\"ltr\">Paid<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R23\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">24<\/div><\/th><td><\/td><td><\/td><td class=\"s14\" dir=\"ltr\">Total due by<\/td><td class=\"s15\" dir=\"ltr\">4\/1\/2015<\/td><td class=\"s15\" dir=\"ltr\">230<\/td><\/tr><\/tbody><\/table><\/div><\/div><\/div><\/body><\/html>";
  
  var strVar="";
strVar += "<html lang=\"en\">";
strVar += "  <head>";
strVar += "    <meta charset=\"UTF-8\">";
strVar += "    <title>Sample Invoice<\/title>";
strVar += "    <link rel=\"stylesheet\" href=\"css\/bootstrap.css\">";
strVar += "    <style>";
strVar += "      @import url(http:\/\/fonts.googleapis.com\/css?family=Bree+Serif);";
strVar += "      body, h1, h2, h3, h4, h5, h6{";
strVar += "      font-family: 'Bree Serif', serif;";
strVar += "      }";
strVar += "    <\/style>";
strVar += "  <\/head>";
strVar += "  ";
strVar += "  <body>";
strVar += "    <div class=\"container\">";
strVar += "      <div class=\"row\">";
strVar += "        <div class=\"col-xs-6\">";
strVar += "          <h1>";
strVar += "            <a href=\"https:\/\/twitter.com\/tahirtaous\">";
strVar += "            <img src=\"logo.png\">";
strVar += "            Logo here";
strVar += "            <\/a>";
strVar += "          <\/h1>";
strVar += "        <\/div>";
strVar += "        <div class=\"col-xs-6 text-right\">";
strVar += "          <h1>INVOICE<\/h1>";
strVar += "          <h1><small>Invoice #001<\/small><\/h1>";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "      <div class=\"row\">";
strVar += "        <div class=\"col-xs-5\">";
strVar += "          <div class=\"panel panel-default\">";
strVar += "            <div class=\"panel-heading\">";
strVar += "              <h4>From: <a href=\"#\">Your Name<\/a><\/h4>";
strVar += "            <\/div>";
strVar += "            <div class=\"panel-body\">";
strVar += "              <p>";
strVar += "                Address <br>";
strVar += "                details <br>";
strVar += "                more <br>";
strVar += "              <\/p>";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "        <\/div>";
strVar += "        <div class=\"col-xs-5 col-xs-offset-2 text-right\">";
strVar += "          <div class=\"panel panel-default\">";
strVar += "            <div class=\"panel-heading\">";
strVar += "              <h4>To : <a href=\"#\">Client Name<\/a><\/h4>";
strVar += "            <\/div>";
strVar += "            <div class=\"panel-body\">";
strVar += "              <p>";
strVar += "                Address <br>";
strVar += "                details <br>";
strVar += "                more <br>";
strVar += "              <\/p>";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "      <!-- \/ end client details section -->";
strVar += "      <table class=\"table table-bordered\">";
strVar += "        <thead>";
strVar += "          <tr>";
strVar += "            <th>";
strVar += "              <h4>Service<\/h4>";
strVar += "            <\/th>";
strVar += "            <th>";
strVar += "              <h4>Description<\/h4>";
strVar += "            <\/th>";
strVar += "            <th>";
strVar += "              <h4>Hrs\/Qty<\/h4>";
strVar += "            <\/th>";
strVar += "            <th>";
strVar += "              <h4>Rate\/Price<\/h4>";
strVar += "            <\/th>";
strVar += "            <th>";
strVar += "              <h4>Sub Total<\/h4>";
strVar += "            <\/th>";
strVar += "          <\/tr>";
strVar += "        <\/thead>";
strVar += "        <tbody>";
strVar += "          <tr>";
strVar += "            <td>Article<\/td>";
strVar += "            <td><a href=\"#\">Title of your article here<\/a><\/td>";
strVar += "            <td class=\"text-right\">-<\/td>";
strVar += "            <td class=\"text-right\">$200.00<\/td>";
strVar += "            <td class=\"text-right\">$200.00<\/td>";
strVar += "          <\/tr>";
strVar += "          <tr>";
strVar += "            <td>Template Design<\/td>";
strVar += "            <td><a href=\"#\">Details of project here<\/a><\/td>";
strVar += "            <td class=\"text-right\">10<\/td>";
strVar += "            <td class=\"text-right\">75.00<\/td>";
strVar += "            <td class=\"text-right\">$750.00<\/td>";
strVar += "          <\/tr>";
strVar += "          <tr>";
strVar += "            <td>Development<\/td>";
strVar += "            <td><a href=\"#\">WordPress Blogging theme<\/a><\/td>";
strVar += "            <td class=\"text-right\">5<\/td>";
strVar += "            <td class=\"text-right\">50.00<\/td>";
strVar += "            <td class=\"text-right\">$250.00<\/td>";
strVar += "          <\/tr>";
strVar += "        <\/tbody>";
strVar += "      <\/table>";
strVar += "      <div class=\"row text-right\">";
strVar += "        <div class=\"col-xs-2 col-xs-offset-8\">";
strVar += "          <p>";
strVar += "            <strong>";
strVar += "            Sub Total : <br>";
strVar += "            TAX : <br>";
strVar += "            Total : <br>";
strVar += "            <\/strong>";
strVar += "          <\/p>";
strVar += "        <\/div>";
strVar += "        <div class=\"col-xs-2\">";
strVar += "          <strong>";
strVar += "          $1200.00 <br>";
strVar += "          N\/A <br>";
strVar += "          $1200.00 <br>";
strVar += "          <\/strong>";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "      <div class=\"row\">";
strVar += "        <div class=\"col-xs-5\">";
strVar += "          <div class=\"panel panel-info\">";
strVar += "            <div class=\"panel-heading\">";
strVar += "              <h4>Bank details<\/h4>";
strVar += "            <\/div>";
strVar += "            <div class=\"panel-body\">";
strVar += "              <p>Your Name<\/p>";
strVar += "              <p>Bank Name<\/p>";
strVar += "              <p>SWIFT : --------<\/p>";
strVar += "              <p>Account Number : --------<\/p>";
strVar += "              <p>IBAN : --------<\/p>";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "        <\/div>";
strVar += "        <div class=\"col-xs-7\">";
strVar += "          <div class=\"span7\">";
strVar += "            <div class=\"panel panel-info\">";
strVar += "              <div class=\"panel-heading\">";
strVar += "                <h4>Contact Details<\/h4>";
strVar += "              <\/div>";
strVar += "              <div class=\"panel-body\">";
strVar += "                <p>";
strVar += "                  Email : sales@laborngig.com <br><br>";
strVar += "                  Mobile : -------- <br> <br>";
strVar += "                  Twitter : <a href=\"https:\/\/twitter.com\/idevice.net\">@iDevice.net<\/a>";
strVar += "                <\/p>";
strVar += "                <h4>Payment should be made by Bank Transfer<\/h4>";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "    <\/div>";
strVar += "  <\/body>";
strVar += "<\/html>";

   
 	html2pdf.setHtmlString(strVar); 
 
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
 
