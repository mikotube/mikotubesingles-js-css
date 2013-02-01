function getCookie(a)
		{
		var i,x,y,ARRcookies=document.cookie.split(";
				");
		for(i=0;
		i<ARRcookies.length;
		i++)
			{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if(x==a)
				{
				return unescape(y)
			}
		}
	}
	function centerS(a)
		{
		var a=a;
		a.css("position","absolute");
		a.css("top",($(window).height()-a.height())/2+$(window).scrollTop()+"px");
		a.css("left",($(window).width()-a.width())/2+$(window).scrollLeft()+"px");
		return this
	}
	function addCommas(a)
		{
		a+='';
		x=a.split('.');
		x1=x[0];
		x2=x.length>1?'.'+x[1]:'';
		var b=/(\d+)(\d
			{
			3
		}
		)/;
		while(b.test(x1))
			{
			x1=x1.replace(b,'$1'+','+'$2')
		}
		return x1+x2
	}
	function pulldatabuild(b)
		{
		FB.api(
			{
			method:'fql.query',query:"SELECT share_count, like_count FROM link_stat WHERE url='"+b+"'"
		}
		,function(a)
			{
			$("#lglikes").append("<p>"+addCommas(a[0]['like_count'])+"</p>")
		}
		)
	}
	function pulldata(b)
		{
		FB.api(
			{
			method:'fql.query',query:"SELECT share_count, like_count FROM link_stat WHERE url='"+b+"'"
		}
		,function(a)
			{
			$("#lglikes p").html(addCommas(a[0]['like_count']))
		}
		)
	}
	function createSubscription(c,d,e)
		{
		FB.Event.subscribe('edge.create',function(a,b)
			{
			if(d==1)
				{
				$('#facebooktrafficdrivermask').fadeOut("slow");
				$('#facebooktrafficdriver').fadeOut("slow");
				$('.modalnav').fadeOut("slow")
			}
			if(e==0)
				{
				pulldata(c)
			}
			setCookie("liked","yes",k,l,m)
		}
		)
	}
	function removeSubscription(b,c,d)
		{
		FB.Event.subscribe('edge.remove',function(a)
			{
			if(c==1)
				{
				alert("Please like our page to access content!")
			}
			if(d==0)
				{
				pulldata(b)
			}
			setCookie("liked","no",k,l,m)
		}
		)
	}
	function realtimeCycles(b)
		{
		setInterval(function()
			{
			FB.api(
				{
				method:'fql.query',query:"SELECT share_count, like_count FROM link_stat WHERE url='"+b+"'"
			}
			,function(a)
				{
				$("#lglikes p").html(addCommas(a[0]['like_count']))
			}
			)
		}
		,1000);
		$.ajaxSetup(
			{
			cache:false
		}
		)
	}
	function implementBuild(c,d,e,f,g)
		{
		var a=$(document).height();
		var b=$(window).width();
		var h='<div id="facebooktrafficdrivermask"></div><div id="facebooktrafficdriver"></div>';
		$('body').append(h);
		$("#facebooktrafficdrivermask").css(
			{
			width:b,height:a
		}
		);
		$("#facebooktrafficdrivermask").fadeTo(600,0.6);
		$('#facebooktrafficdriver').css('width',600);
		$('#facebooktrafficdriver').css('height',370);
		centerS($("#facebooktrafficdriver"));
		$("#facebooktrafficdriver").html('<div class="modalnav"></div><div id="timer"><p>Click the like button or wait <span>'+c+'</span> seconds.</p></div><div id="facebooktrafficdrivercontent"><div id="lglikes"></div><div id="clicker"></div><div class="vcontent">'+e+'</div></div>');
		$("#facebooktrafficdriver").show();
		$("#clicker").append('<div id="fb-root"></div><fb:like id="fbLikeButton" href="'+d+'" show_faces="false" layout="button_count" width="110"></fb:like>');
		$('.modalnav').hide();
		pulldatabuild(d);
		if(f==0)
			{
			$('.modalnav').show();
			$('.modalnav').live('click',function()
				{
				$('#facebooktrafficdrivermask').fadeOut("slow");
				$('#facebooktrafficdriver').fadeOut("slow");
				$('.modalnav').fadeOut("slow")
			}
			)
		}
		createSubscription(d,f,g);
		removeSubscription(d,f,g);
		if(g==1)
			{
			realtimeCycles(d)
		}
	}
	jQuery.fn.facebooktrafficdriver=function(a)
		{
		var b=
			{
			'url':'www.facebook.com/ladygaga','required':'1','stream':'1','headline':'Headline goes here','descr':'Text goes here.','delay':0
		};
		if(a)
			{
			$.extend(b,a)
		}
		var c="<h1>"+b.headline+"</h1><p>"+b.descr+"</p>";
		var d=getCookie("liked");
		if(b.required==1)
			{
			if(d!="yes")
				{
				implementBuild(b.delay,b.url,c,b.required,b.stream)
			}
			else
				{
				$("#fbLikeButton").hide()
			}
		}
		else
			{
			implementBuild(b.delay,b.url,c,b.required,b.stream)
		}
		if(b.delay>99)
			{
			b.delay=99
		}
		if(b.delay>0)
			{
			$("#timer").delay(2000).fadeIn(4000);
			var e=b.delay;
			var f=setInterval(function()
				{
				if(e<=0)
					{
					clearInterval(f,1000);
					$('#facebooktrafficdrivermask').fadeOut("slow");
					$('#facebooktrafficdriver').fadeOut("slow");
					$('.modalnav').fadeOut("slow")
				}
				else
					{
					e--;
					$("#timer span").text(e)
				}
			}
			,1000)
		}
		else
			{
			$("#timer").hide()
		}
	}
}
(jQuery));
