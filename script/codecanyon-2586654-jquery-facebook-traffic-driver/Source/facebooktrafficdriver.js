/*
 * JQuery Facebook Traffic Driver
 * Version: 1.0
 *
 * Author: Nick Rivers
 * 
 *
 *
 * Changelog: 
 * Version: 1.0
 *
 */

(function($) {
	var current_date = new Date;
	var cookie_year = current_date.getFullYear () + 1;
	var cookie_month = current_date.getMonth ();
	var cookie_day = current_date.getDate ();
	
	function setCookie(c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

	function getCookie(c_name) {
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++) {
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==c_name) {
		  	return unescape(y);
		  }
		}
	}

	function centerS(cur) {
		var cur = cur;		
	    cur.css("position","absolute");
	    cur.css("top", ( $(window).height() - cur.height() ) / 2+$(window).scrollTop() + "px");
	    cur.css("left", ( $(window).width() - cur.width() ) / 2+$(window).scrollLeft() + "px");
	    return this;
	}

	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

	// Declare our Facebook function.
	function pulldatabuild (url) {
		FB.api({
		    method: 'fql.query',
		    query: "SELECT share_count, like_count FROM link_stat WHERE url='"+url+"'"
		}, function(data) {
		    $("#lglikes").append("<p>"+addCommas(data[0]['like_count'])+"</p>");
		    }
		);
	}

	// Declare our Facebook function.
	function pulldata(url) {
		FB.api({
		    method: 'fql.query',
		    query: "SELECT share_count, like_count FROM link_stat WHERE url='"+url+"'"
		}, function(data) {
		    $("#lglikes p").html(addCommas(data[0]['like_count']));
		    }
		);
	}

	// Create Subscription
	function createSubscription(url, required, stream) {
		FB.Event.subscribe('edge.create', function(href, response) {
			if (required == 1) {
				$('#facebooktrafficdrivermask').fadeOut("slow");
				$('#facebooktrafficdriver').fadeOut("slow");
				$('.modalnav').fadeOut("slow");
			}
			if (stream == 0) {
				pulldata(url);
			}
			setCookie("liked", "yes", cookie_year, cookie_month, cookie_day );
		});
	}

	// Remove Subscription
	function removeSubscription(url, required, stream) {
		FB.Event.subscribe('edge.remove', function(href) {
			if (required == 1) {
				alert("Please like our page to access content!");
			}
			if (stream == 0) {
				pulldata(url);
			}
			setCookie("liked", "no", cookie_year, cookie_month, cookie_day );
		});
	}

	function realtimeCycles(url) {
		setInterval(function() {
		      	FB.api({
				    method: 'fql.query',
				    query: "SELECT share_count, like_count FROM link_stat WHERE url='"+url+"'"
				}, function(data) {
				     $("#lglikes p").html(addCommas(data[0]['like_count']));
				   }
				);
		   }, 1000);
		   $.ajaxSetup({ cache: false });
	}

	function implementBuild(delay, url, content, required, stream) {
		var a=$(document).height();
		var b=$(window).width();
		var popuphtml = '<div id="facebooktrafficdrivermask"></div><div id="facebooktrafficdriver"></div>';
		$('body').append(popuphtml);
		$("#facebooktrafficdrivermask").css({width:b,height:a});
		$("#facebooktrafficdrivermask").fadeTo(600,0.6);

		$('#facebooktrafficdriver').css('width' , 600);
		$('#facebooktrafficdriver').css('height' , 370);
		centerS($("#facebooktrafficdriver"));

		$("#facebooktrafficdriver").html('<div class="modalnav"></div><div id="timer"><p>Click the like button or wait <span>'+delay+'</span> seconds.</p></div><div id="facebooktrafficdrivercontent"><div id="lglikes"></div><div id="clicker"></div><div class="vcontent">'+content+'</div></div>');
		$("#facebooktrafficdriver").show();	
		$("#clicker").append('<div id="fb-root"></div><fb:like id="fbLikeButton" href="'+url+'" show_faces="false" layout="button_count" width="110"></fb:like>');
		$('.modalnav').hide();


		pulldatabuild(url);

		if (required == 0) {
			$('.modalnav').show();
			$('.modalnav').live('click', function(){
				$('#facebooktrafficdrivermask').fadeOut("slow");
				$('#facebooktrafficdriver').fadeOut("slow");
				$('.modalnav').fadeOut("slow");
			});
		}

	   createSubscription(url, required, stream);
	   removeSubscription(url, required, stream);

	   if (stream == 1) {
	       realtimeCycles(url);
	   }
	}

	jQuery.fn.facebooktrafficdriver = function (options) {

		var settings = { // Defaults
			'url' : 'www.facebook.com/mikotubesingles',
			'required' : '1',
			'stream' : '1',
			'headline' : 'Headline goes here',
			'descr' : 'Text goes here.',
			'delay' : 0
	    };

		if (options) { 
	    	$.extend(settings, options);
	    }

		var content = "<h1>"+settings.headline+"</h1><p>"+settings.descr+"</p>";   
		var fbcookie = getCookie("liked");

		if (settings.required == 1) {
			if (fbcookie != "yes") {
				implementBuild(settings.delay, settings.url, content, settings.required, settings.stream);
			} else {
				$("#fbLikeButton").hide();
			}
		} else {
			implementBuild(settings.delay, settings.url, content, settings.required, settings.stream);
		}

		if (settings.delay > 99) {
			settings.delay = 99;
		}

		if (settings.delay > 0) {
			$("#timer").delay(2000).fadeIn(4000);
			// Timer happens here
			var count = settings.delay;
			var intervalID = setInterval(function() {
				if (count <= 0) {
					clearInterval(intervalID, 1000);
					$('#facebooktrafficdrivermask').fadeOut("slow");
					$('#facebooktrafficdriver').fadeOut("slow");
					$('.modalnav').fadeOut("slow");
				} else {  
					count--;  
					$("#timer span").text(count);  
				}
			}, 1000);
		} else {
			$("#timer").hide();
		}

	}
}(jQuery));