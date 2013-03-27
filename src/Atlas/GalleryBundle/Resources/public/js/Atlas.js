$j=jQuery.noConflict();

function AtlasGallery(){
	this.animationTimeout = null;
}
AtlasGallery.instance=null;
AtlasGallery.getInstance = function(){
	if(AtlasGallery.instance==null){
		AtlasGallery.instance = new AtlasGallery();
	}
	return AtlasGallery.instance;
}
AtlasGallery.prototype.init = function(){
	this.initEvents();
}

AtlasGallery.prototype.initEvents = function(){
	$j("#headerUser").bind("click", function(evt){
			AtlasGallery.getInstance().showUserPopup(true);
		}
	);
	$j("body").bind("click", function(evt){
			var target = null;
			if(evt.target){
				target = evt.target;
			}
			else{
				target = evt.srcElement;
			}
			if(target.id!="headerUser"){
				AtlasGallery.getInstance().showUserPopup(false);
			}
		}
	);
	/*$j("#headerUser").bind("mouseout", function(evt){
			AtlasGallery.getInstance().showUserPopup(false);
		}
	);
	$j("#headerUserPopup").bind("mouseover", function(evt){
			AtlasGallery.getInstance().showUserPopup(true);
		}
	);
	$j("#headerUserPopup").bind("mouseout", function(evt){
		AtlasGallery.getInstance().showUserPopup(false);												 
	});*/
	$j("#headerUserPopup .pItem").bind("click", function(evt){
		AtlasGallery.getInstance().clickPopupItem(evt);												 
	});
	$j("#headerUserPopup .pItem").bind("mouseover", function(evt){
		AtlasGallery.getInstance().mouseOverPopupItem(this,true);												 
	});
	$j("#headerUserPopup .pItem").bind("mouseout", function(evt){
		AtlasGallery.getInstance().mouseOverPopupItem(this,false);												 
	});
}

AtlasGallery.prototype.showUserPopup = function(blShow){
	if(blShow==true){
		$j("#headerUserPopup").show();
		$j("#popUpItems").show();
		$j("#popupTip").hide();
		$j("#headerUserPopup .pItem").removeClass("popupItemSelected itemMouseDown");
	}
	else{
		$j("#headerUserPopup").hide();
	}
}
AtlasGallery.prototype.clickPopupItem = function(evt){
	evt.stopPropagation();
	//$j("#popUpItems").hide();
	//$j("#popupTip").show();
	var item = evt.target ? evt.target : evt.srcElement;
	$j(item).addClass("itemMouseDown");
	if(this.animationTimeout!=null){
		clearTimeout(this.animationTimeout);
		this.animationTimeout = null;
	}
	this.animationTimeout = setTimeout(function () {
		AtlasGallery.getInstance().afterAnimationClick();
	}, 500);
}
AtlasGallery.prototype.afterAnimationClick = function(){
	$j("#popUpItems").hide();
	$j("#popupTip").show();
}
AtlasGallery.prototype.mouseOverPopupItem = function(item,isClick){
	if(isClick==true){
		$j(item).addClass("popupItemSelected");
	}
	else{
		$j(item).removeClass("popupItemSelected");
	}
}
