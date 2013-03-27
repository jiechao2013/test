$j=jQuery.noConflict();

var adapter=null;
var viewer=null;
var initialStage=true;
var userMoved=false;


$j(function(){
	//item is set in the page template
	AtlasProduct.getInstance().asset = item;
	AtlasProduct.getInstance().init();		
});

function AtlasProduct() {
	this.asset = [];
}

AtlasProduct.instance = null;
AtlasProduct.getInstance = function() {
	if(AtlasProduct.instance==null)
		AtlasProduct.instance = new AtlasProduct();
	return AtlasProduct.instance;
}

AtlasProduct.prototype.initialMove=function() {
	if (!userMoved) {
		$j('#initialProgress').hide();
		userMoved=true;
	}
	return true;
}

AtlasProduct.prototype.init = function() {
    
	adapter=new AtlasAPIImageAdapter();
	//firstView is defined in the page template
	viewer=new AtlasPlayer('HDContainer', 'viewerCanvas', 'HDContainer', firstView, adapter, '#status', Constants.LOGGING_ALL);
	viewer.init();
	
	$j('#progressBar').progressbar({
		value: 0
	});	
	
	if (!adapter.loadFromJSON(this.asset)) {
		console.log('Error loading product from JSON, most likely a product version mismatch');
		return;
	}
	
	viewer.setOnBeforeMouseMove(function(event) {
		return AtlasProduct.getInstance().initialMove();
	});

	viewer.setOnBeforeTouchMove(function(event) {
		return AtlasProduct.getInstance().initialMove();
	});
	
	viewer.setOnProgress(function(progress) {
		if ((progress.stagePercentage==1.0)&&(initialStage)) {
			initialStage=false;
			$j('#initialProgress').html('<br>Initial interativity available...Drag mouse to rotate');
			$j('#signatureImage').hide();

			$j('#dial').knob({
				thickness: .4,
				fgColor: '#DDDDDD',
				bgColor: '#FAFAFA',
				readOnly: true,
				width: 64,
				height: 64
			});			
		}
		
		if ((progress.imagePercentage==1.0)&&(!initialStage)) {
			$j('#dialContainer').hide();
			AtlasProduct.getInstance().setAtlasThumbnailsEvent();
		}
		
		if (initialStage) {
			$j('#progressBar').progressbar({
				value: (progress.stagePercentage*100.0)
			});	
			$j('#progressBar').addClass('customProgressBar');
		}
		else {
			$j('#dial').val(Math.round(progress.imagePercentage*100.0)).trigger('change');
		}
	});
	
	viewer.load();

}

AtlasProduct.prototype.setAtlasThumbnailsEvent = function(){
	var ThumbBox = $j("#atlasProductThumb").find(".ThumbBox");
	ThumbBox.unbind();
	ThumbBox.bind({
		mouseover : function(){
			if( !$j(this).hasClass("ThumbCurr") )
				$j(this).css("border", "1px solid #818181");			
		},
		mouseout : function(){
			if( !$j(this).hasClass("ThumbCurr") )
				$j(this).css("border", "1px solid #EBEBED");	
		},
		click : function(){
			ThumbBox.css("border", "1px solid #EBEBED");	
			ThumbBox.removeClass("ThumbCurr");			
			AtlasProduct.getInstance().rotateToView(this);	
		}
	});  
    
}


AtlasProduct.prototype.rotateToView = function(obj){
	$j(obj).css("border", "1px solid #A3A3A3");	
	$j(obj).addClass("ThumbCurr");
	
	var view=$j(obj).attr("view");
	viewer.rotateTo(view);
}
            

