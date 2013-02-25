function getSelection() {
	var fla = fl.getDocumentDOM();
	if(fla.selection==null){fl.trace('Error: No document open');return null;};
	if(fla.selection.length<=0){/*fl.trace('Error: No selection');*/return null;};
	//if(fla.selection.length>1){fl.trace('Error: Select one item');return null;};
	return fla.selection;
}

function setScale(w,h) {
	// Get the first currently selected object on the stage
	var selecteditems = getSelection();
	if(selecteditems==null) return;
	
	if(selecteditems.length==1) {
		
		var selecteditem = selecteditems[0];
		if(selecteditem==null) return;
		
		// Set the scale we are currently set to, in case we need it some other time
		selecteditem.setPersistentData("ssScaleX", "double", w);
		selecteditem.setPersistentData("ssScaleY", "double", h);
		
		// Get the current object's transformation matrix
		var m = selecteditem.matrix;
		
		// Store the original skew and scale, so we can scale proportionately
		if(!selecteditem.hasPersistentData("objScaleX"))
			selecteditem.setPersistentData("objScaleX", "double", m.a);
		if(!selecteditem.hasPersistentData("objScaleY"))
			selecteditem.setPersistentData("objScaleY", "double", m.d);
		if(!selecteditem.hasPersistentData("objSkewX"))
			selecteditem.setPersistentData("objSkewX", "double", m.b);
		if(!selecteditem.hasPersistentData("objSkewY"))
			selecteditem.setPersistentData("objSkewY", "double", m.c);
		
		// Apply the transformation, taking into account the current scale and skew
		m.a = (w/100)*(selecteditem.getPersistentData("objScaleX"));
		m.d = (h/100)*(selecteditem.getPersistentData("objScaleY"));
		m.b = (w/100)*(selecteditem.getPersistentData("objSkewX"));
		m.c = (h/100)*(selecteditem.getPersistentData("objSkewY"));
		
		// Set the new matrix
		selecteditem.matrix = m;
		
		// fl.trace('Persistent Data: { objScaleX:'+selecteditem.getPersistentData("objScaleX")+' objScaleY:'+selecteditem.getPersistentData("objScaleY")+' objSkewX:'+selecteditem.getPersistentData("objSkewX")+' objSkewY:'+selecteditem.getPersistentData("objSkewY")+' ssScaleX:'+selecteditem.getPersistentData("ssScaleX")+' ssScaleY:'+selecteditem.getPersistentData("ssScaleY")+' }');
		
	} else if(selecteditems.length>1) {
		var fla = fl.getDocumentDOM();
		if(fla.allItemsScaleX==null ||
		   fla.allItemsScaleY==null) {
			fla.scaleSelection(w/100,h/100,"bottom center");
		} else {
			fla.scaleSelection(w/fla.allItemsScaleX,h/fla.allItemsScaleY,"bottom center");
		}
		fla.allItemsScaleX = w;
		fla.allItemsScaleY = h;
	}
	
	return selecteditems;
}

function resetScale() {
	var selecteditems = setScale(100,100);
	if(selecteditems==null) return;
	
	// Rescale to the original dimensions
	for(var i=0; i<selecteditems.length; i++) {
		var selecteditem = selecteditems[i];
		if(selecteditem==null) continue;
	
		// Delete all persistent data
		if(selecteditem.hasPersistentData("ssScaleX"))
			selecteditem.removePersistentData("ssScaleX");
		if(selecteditem.hasPersistentData("ssScaleY"))
			selecteditem.removePersistentData("ssScaleY");
		if(selecteditem.hasPersistentData("objScaleX"))
			selecteditem.removePersistentData("objScaleX");
		if(selecteditem.hasPersistentData("objScaleY"))
			selecteditem.removePersistentData("objScaleY");
		if(selecteditem.hasPersistentData("objSkewX"))
			selecteditem.removePersistentData("objSkewX");
		if(selecteditem.hasPersistentData("objSkewY"))
			selecteditem.removePersistentData("objSkewY");
		
		// if(!selecteditem.getPersistentData("ssScaleX") &&
			 // !selecteditem.getPersistentData("ssScaleY") &&
			 // !selecteditem.getPersistentData("objScaleX") &&
			 // !selecteditem.getPersistentData("objScaleY") &&
			 // !selecteditem.getPersistentData("objSkewX") &&
			 // !selecteditem.getPersistentData("objSkewY")) {
			// fl.trace('Persistent data cleared');
		// }
	}
	
	fl.getDocumentDOM().allItemsScaleX=fl.getDocumentDOM().allItemsScaleY=null;
}

function markUnsaved() {
	// Force marking the document as unsaved
	//fl.getDocumentDOM().scaleSelection(1,1);
}
