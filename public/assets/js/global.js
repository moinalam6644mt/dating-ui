

/* ------------------------------------------------------------- 
	
	Author : Venkatesh bishu
	Date : 22.11.18
	Version : 1.2.8

 ------------------------------------------------------------- */
 
function mark_fav(object_id, type, callBack, cmd){
	var URL = '';
	if(cmd == 'remove'){
		URL = VPATH + 'favourite/remove_fav';
	}else{
		URL = VPATH + 'favourite/add_fav';
	} 
	
	$.ajax({
		url : URL,
		data: {type: type, object_id: object_id},
		type: 'POST',
		dataType: 'json',
		success: function(res){
			if(typeof callBack == 'function'){
				callBack(res);
			}
		}
	});
}

function addToFav(object_id, type, callBack){
	var fav_type = ['JOB', 'FREELANCER', 'AGENCY', 'PROJECT'];
	var default_type = 'JOB';
	
	if(type && fav_type.indexOf(type) == -1){
		return false;
	}else if(typeof type == 'undefined'){
		type = default_type;
	}
	
	mark_fav(object_id, type, callBack, 'add');
	
}



function removeFav(object_id, type, callBack){
	var fav_type = ['JOB', 'FREELANCER', 'AGENCY', 'PROJECT'];
	var default_type = 'JOB';
	
	if(type && fav_type.indexOf(type) == -1){
		return false;
	}else if(typeof type == 'undefined'){
		type = default_type;
	}
	
	mark_fav(object_id, type, callBack, 'remove');
}

/* -------------------------------------------------------------------- */

function mark_shortlist(object_id, type, callBack, cmd){
	var URL = '';
	if(cmd == 'remove'){
		URL = VPATH + 'job/remove_shortlist';
	}else{
		URL = VPATH + 'job/add_shortlist';
	} 
	
	$.ajax({
		url : URL,
		data: {type: type, object_id: object_id},
		type: 'POST',
		dataType: 'json',
		success: function(res){
			if(typeof callBack == 'function'){
				callBack(res);
			}
		}
	});
}

function shortlist(object_id, type, callBack){
	var fav_type = ['APPLICATION', 'FREELANCER', 'AGENCY_APPLICATION'];
	var default_type = 'APPLICATION';
	
	if(type && fav_type.indexOf(type) == -1){
		return false;
	}else if(typeof type == 'undefined'){
		type = default_type;
	}
	
	mark_shortlist(object_id, type, callBack, 'add');
	
}



function unShortlist(object_id, type, callBack){
	var fav_type = ['APPLICATION', 'FREELANCER', 'AGENCY_APPLICATION'];
	var default_type = 'APPLICATION';
	
	if(type && fav_type.indexOf(type) == -1){
		return false;
	}else if(typeof type == 'undefined'){
		type = default_type;
	}
	
	mark_shortlist(object_id, type, callBack, 'remove');
}

/* ---------------------------------------------------------------------- */

function c_alert(title, content, type, button){
	console.log('ok');
	//$('#alertModal').modal({show:true});
	var modal_alert=$('#alertModal');
	modal_alert.find('.modal-title').html(title || 'Alert!');
	modal_alert.find('.alert-body').html(content || 'Simple alert!');
	if(button){
		modal_alert.find('.extra-btn').html('<button type="button" class="btn btn-primary">Save changes</button>').show();
	}else{
		modal_alert.find('.extra-btn').hide();
	}
	const myModal = new bootstrap.Modal(modal_alert);
	myModal.show();
	/* if(button){
		$.alert({
		theme: 'bootstrap',
		closeIcon: true,
		animation: 'scale',
		type: type || 'green',
		title: title || 'Alert!',
		content: content || 'Simple alert!',
		buttons : button
	});
	}else{
		$.alert({
			theme: 'bootstrap',
			closeIcon: true,
			animation: 'scale',
			type: type || 'green',
			title: title || 'Alert!',
			content: content || 'Simple alert!',
		});
	} */
	
};


/* ------------------------------------------------------------- 
	ADD AND REMOVE FAVOURITE
 ------------------------------------------------------------- */
$(document).on('click', '.mark-fav-button', function(e){
	e.preventDefault();
	var action = $(this).data('action');
	var object_id = $(this).data('objectId');
	var object_type = $(this).data('objectType');
	var ele = $(this);
	
	if(action && object_id && object_type){
		if(action == 'add'){
			addToFav(object_id, object_type, function(res){
				if(res.status == 1){
					ele.addClass('bookmarked');
					ele.data('action', 'remove');
				}
			});
		}else if(action == 'remove'){
			removeFav(object_id, object_type, function(res){
				if(res.status == 1){
					ele.removeClass('bookmarked');
					ele.data('action', 'add');
				}
			});
		}
	}
	
});
 
 /* ------------------------------------------------------------- 
	SHORTLIST AND UNSHORTLIST
 ------------------------------------------------------------- */
 
$(document).on('click', '.shortlist-button', function(e){
	e.preventDefault();
	var action = $(this).data('action');
	var object_id = $(this).data('objectId');
	var object_type = $(this).data('objectType');
	var ele = $(this);
	
	if(action && object_id && object_type){
		if(action == 'add'){
			shortlist(object_id, object_type, function(res){
				if(res.status == 1){
					ele.addClass('bookmarked');
					ele.data('action', 'remove');
				}
			});
		}else if(action == 'remove'){
			unShortlist(object_id, object_type, function(res){
				if(res.status == 1){
					ele.removeClass('bookmarked');
					ele.data('action', 'add');
				}
			});
		}
	}
	
});
 

/* ------------------------------------------------------------- 
	LOADER
 ------------------------------------------------------------- */
 
function generateLoader(size, speed){
	var default_size = 100;
	var default_speed = 1.5;
	size = size || default_size;
	speed = speed || default_speed;
	var html = '<svg width="'+size+'px"  height="'+size+'px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-double-ring" style="background: none;"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="40" stroke-width="4" stroke="#ec407a" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(238.536 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="'+default_speed+'s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-dasharray="{{config.dasharray2}}" ng-attr-stroke-dashoffset="{{config.dashoffset2}}" fill="none" stroke-linecap="round" r="35" stroke-width="4" stroke="#000" stroke-dasharray="54.97787143782138 54.97787143782138" stroke-dashoffset="54.97787143782138" transform="rotate(-238.536 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>';

	return html;
}
 
function showLoader(container, type, container_h){
	var loader = generateLoader();
	container_h = container_h || 100;
	if(type == 'sm'){
		loader = generateLoader(25);
	}else if(type == 'lg'){
		loader = generateLoader(100);
	}else if(type == 'md'){
		loader = generateLoader(80);
	}else{
		loader = generateLoader(50);
	}
	
	$(container).html('<div class="loader" style="height:'+container_h+'px">'+loader+'</div>');
	
}
 
 
 /* ------------------------------------------------------------- 
	NEW WINDOW 
 ------------------------------------------------------------- */
function newWindow(url) {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=700,height=400");
}
 
 
 /* ------------------------------------------------------------- 
	AJAX MODAL
 ------------------------------------------------------------- */
function load_ajax_modal(url){
	showLoader($('#ajaxModal').find('.modal-content'), '', 100);
	$('#ajaxModal').modal('show');
	setTimeout(function(){
		$.get(url, function(res){
			$('#ajaxModal').find('.modal-content').html(res);
		});
	}, 700);
};


 /* ------------------------------------------------------------- 
	AJAX URL
 ------------------------------------------------------------- */
function load_ajax_url(url, container){
	showLoader($(container), '', 100);
	setTimeout(function(){
	$.get(url, function(res){
		$(container).html(res);
	});
}, 700);
	
}

 /* ------------------------------------------------------------- 
	LOADING ALL AJAX URL
 ------------------------------------------------------------- */

function init_ajax_loading(){
	$('[data-ajaxify]').each(function(index, item){
		var url = $(item).data('ajaxify');
		var container = $(item);
		load_ajax_url(url, container);
	});
} 

$(document).ready(function(){
	init_ajax_loading();
});

 /* ------------------------------------------------------------- 
	STAR RATING
 ------------------------------------------------------------- */

function starRating(ratingElem) {
		

$(ratingElem).each(function() {
$(this).empty();
var dataRating = $(this).attr('data-rating');

// Rating Stars Output
function starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar) {
return(''+
'<span class="'+firstStar+'"></span>'+
'<span class="'+secondStar+'"></span>'+
'<span class="'+thirdStar+'"></span>'+
'<span class="'+fourthStar+'"></span>'+
'<span class="'+fifthStar+'"></span>');
}

var fiveStars = starsOutput('star','star','star','star','star');

var fourHalfStars = starsOutput('star','star','star','star','star half');
var fourStars = starsOutput('star','star','star','star','star empty');

var threeHalfStars = starsOutput('star','star','star','star half','star empty');
var threeStars = starsOutput('star','star','star','star empty','star empty');

var twoHalfStars = starsOutput('star','star','star half','star empty','star empty');
var twoStars = starsOutput('star','star','star empty','star empty','star empty');

var oneHalfStar = starsOutput('star','star half','star empty','star empty','star empty');
var oneStar = starsOutput('star','star empty','star empty','star empty','star empty');
var HalfStar = starsOutput('star half','star empty','star empty','star empty','star empty');
var zeroStar = starsOutput('star empty','star empty','star empty','star empty','star empty');

// Rules
        if (dataRating >= 4.75) {
            $(this).append(fiveStars);
        } else if (dataRating >= 4.25) {
            $(this).append(fourHalfStars);
        } else if (dataRating >= 3.75) {
            $(this).append(fourStars);
        } else if (dataRating >= 3.25) {
            $(this).append(threeHalfStars);
        } else if (dataRating >= 2.75) {
            $(this).append(threeStars);
        } else if (dataRating >= 2.25) {
            $(this).append(twoHalfStars);
        } else if (dataRating >= 1.75) {
            $(this).append(twoStars);
        } else if (dataRating >= 1.25) {
            $(this).append(oneHalfStar);
        } else if (dataRating > .75) {
            $(this).append(oneStar);
        } else if (dataRating > .25) {
            $(this).append(HalfStar);
        }else{
$(this).append(zeroStar);
}

});
}

function init_rating(){
	starRating('.star-rating');
}

function init_plugin(){
	
	init_rating();
	
	tippy('[data-tippy-placement]', {
		delay: 100,
		arrow: true,
		arrowType: 'sharp',
		size: 'regular',
		duration: 200,

		/* 'shift-toward', 'fade', 'scale', 'perspective' */
		animation: 'shift-away',

		animateFill: true,
		theme: 'dark',

		distance: 10,

	});
	
	$('.ajax-default-slick-carousel').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		adaptiveHeight: true,
		responsive: [
		    {
		      breakpoint: 1292,
		      settings: {
		        dots: true,
		    	arrows: false
		      }
		    },
		    {
		      breakpoint: 993,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        dots: true,
		    	arrows: false
		      }
		    },
		    {
		      breakpoint: 769,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        dots: true,
		   		arrows: false
		      }
		    }
	  ]
	});
	
}
