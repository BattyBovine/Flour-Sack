function getSelection() {
	var fla = fl.getDocumentDOM();
	if(fla.selection==null){fl.trace('Error: No document open');return null;};
	if(fla.selection.length<=0){/*fl.trace('Error: No selection');*/return null;};
	if(fla.selection.length>1){fl.trace('Error: Select one item');return null;};
	return fla.selection[0];
}

function setScale(w,h) {
	// Get the first currently selected object on the stage
	var selecteditem = getSelection();
	if(selecteditem==null) return;
	
	// Set the scale we are currently set to, in case we need it some other time
	selecteditem.setPersistentData("ssScaleX", "double", w);
	selecteditem.setPersistentData("ssScaleY", "double", h);
	
	// Get the currently selected object's transformation matrix
	var m = selecteditem.matrix;
	
	// Store the object's current scale, so we can scale proportionately
	if(!selecteditem.hasPersistentData("objScaleX"))
		selecteditem.setPersistentData("objScaleX", "double", m.a);
	if(!selecteditem.hasPersistentData("objScaleY"))
		selecteditem.setPersistentData("objScaleY", "double", m.d);
	
	// Apply the transformation, taking into account the current scale
	m.a = (w/100)*selecteditem.getPersistentData("objScaleX");
	m.d = (h/100)*selecteditem.getPersistentData("objScaleY");
	
	// Set the new matrix
	selecteditem.matrix = m;
	
	// fl.trace('Persistent Data: { objScaleX:'+selecteditem.getPersistentData("objScaleX")+' objScaleY:'+selecteditem.getPersistentData("objScaleY")+' ssScaleX:'+selecteditem.getPersistentData("ssScaleX")+' ssScaleY:'+selecteditem.getPersistentData("ssScaleY")+' }');
	
	return selecteditem;
}

function resetScale() {
	// Rescale to the original dimensions
	var selecteditem = setScale(100,100);
	if(selecteditem==null) return;
	
	// Delete all persistent data
	if(selecteditem.hasPersistentData("ssScaleX"))
		selecteditem.removePersistentData("ssScaleX");
	if(selecteditem.hasPersistentData("ssScaleY"))
		selecteditem.removePersistentData("ssScaleY");
	if(selecteditem.hasPersistentData("objScaleX"))
		selecteditem.removePersistentData("objScaleX");
	if(selecteditem.hasPersistentData("objScaleY"))
		selecteditem.removePersistentData("objScaleY");
	
	// if(!selecteditem.getPersistentData("ssScaleX") &&
		 // !selecteditem.getPersistentData("ssScaleY") &&
		 // !selecteditem.getPersistentData("objScaleX") &&
		 // !selecteditem.getPersistentData("objScaleY")) {
		// fl.trace('Persistent data cleared');
	// }
}

function markUnsaved() {
	// Force marking the document as unsaved
	//fl.getDocumentDOM().moveSelectionBy({x:0,y:0});
}
