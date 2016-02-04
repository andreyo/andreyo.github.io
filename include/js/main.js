jQuery(function($){

var BRUSHED = window.BRUSHED || {};

/* ==================================================
   Mobile Navigation
================================================== */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

BRUSHED.mobileNav = function(){
	var windowWidth = $(window).width();
	
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('#menu');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
}

BRUSHED.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		if ($('#mobile-nav').hasClass('open')) {
			$('#navigation-mobile').slideDown(500, 'easeOutExpo');
		} else {
			$('#navigation-mobile').slideUp(500, 'easeOutExpo');
		}
		e.preventDefault();
	});
	
	$('#menu-nav-mobile a').on('click', function(){
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').slideUp(350, 'easeOutExpo');
	});
}


/* ==================================================
   Slider Options
================================================== */

BRUSHED.slider = function(){
	$.supersized({
		// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Pauses slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   12000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	300,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   1,			// Keyboard navigation on/off
		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position						   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		vertical_center         :   1,			// Vertically center background
		horizontal_center       :   1,			// Horizontally center background
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait         	:   1,			// Portrait images will not exceed browser height
		fit_landscape			:   0,			// Landscape images will not exceed browser width
												   
		// Components							
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	0,			// Individual thumb links for each slide
		thumbnail_navigation    :   0,			// Thumbnail navigation
		slides 					:  	[			// Slideshow Images
											{image : 'include/img/slider-images/slider_01.jpg', title : '<div class="slide-content"></div>', thumb : '', url : ''},
											{image : 'include/img/slider-images/slider_02.jpg', title : '<div class="slide-content"></div>', thumb : '', url : ''},
											{image : 'include/img/slider-images/slider_03.jpg', title : '<div class="slide-content"></div>', thumb : '', url : ''},
											{image : 'include/img/slider-images/slider_04.jpg', title : '<div class="slide-content"></div>', thumb : '', url : ''}
									],
									
		// Theme Options			   
		progress_bar			:	0,			// Timer for each slide							
		mouse_scrub				:	0
		
	});

}


/* ==================================================
   Navigation Fix
================================================== */

BRUSHED.nav = function(){
	$('.sticky-nav').waypoint('sticky');
}


/* ==================================================
   Filter Works
================================================== */

BRUSHED.filter = function (){
	if($('#projects').length > 0){		
		var $container = $('#projects');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows',
              filter : '.kids'
			});
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#options .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}

			var clsName = value + "lazy";
			//$(clsName).addClass('lazy').removeClass(clsName.split('.').join(""));
			console.log(value + "pessed");
			$("img"+clsName).lazyload();

			return false;
		});
	}
}


/* ==================================================
   FancyBox
================================================== */

BRUSHED.fancyBox = function(){
	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
		
		$(".fancybox").fancybox({				
				padding : 0,
				beforeShow: function () {
					this.title = $(this.element).attr('title');
					this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
				},
				helpers : {
					title : null
				}
			});
			
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
	}
}


/* ==================================================
   Menu Highlight
================================================== */

BRUSHED.menu = function(){
	$('#menu-nav, #menu-nav-mobile').onePageNav({
		currentClass: 'current',
    	changeHash: false,
    	scrollSpeed: 750,
    	scrollOffset: 30,
    	scrollThreshold: 0.5,
		easing: 'easeOutExpo',
		filter: ':not(.external)'
	});
}

/* ==================================================
   Next Section
================================================== */

BRUSHED.goSection = function(){
	$('#nextsection').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}

/* ==================================================
   GoUp
================================================== */

BRUSHED.goUp = function(){
	$('#goUp').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}


/* ==================================================
	Scroll to Top
================================================== */

BRUSHED.scrollToTop = function(){
	var windowWidth = $(window).width(),
		didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	})

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);

    var $homeLink = $('#home-link');

    $homeLink.click(function(e) {
        $('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
        e.preventDefault();
    })

}

/* ==================================================
   Thumbs / Social Effects
================================================== */

BRUSHED.utils = function(){
	
	$('.item-thumbs').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
	$('.image-wrap').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
	$('#social ul li').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
}

/* ==================================================
   Accordion
================================================== */

BRUSHED.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Toggle
================================================== */

BRUSHED.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Tooltip
================================================== */

BRUSHED.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}

/* ==================================================
   Mustache
================================================== */

BRUSHED.mustacheInit = function(){
    	template = $('#photosTemplate').html(),
    	output = Mustache.render(template, photosData);
    	$('#thumbs').append(output);
}


/* ==================================================
	Init
================================================== */

BRUSHED.slider();

$(document).ready(function(){
	Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: 'include/js/placeholder.js',
		complete : function() {
				if (!Modernizr.placeholder) {
						Placeholders.init({
						live: true,
						hideOnFocus: false,
						className: "yourClass",
						textColor: "#999"
						});
				}
		}
	}
	]);
	
	// Preload the page with jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: true,
		autoClose: true,
		splashFunction: function() {
			$('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
		}
	});
	BRUSHED.mustacheInit();
	BRUSHED.nav();
	BRUSHED.mobileNav();
	BRUSHED.listenerMenu();
	BRUSHED.menu();
	BRUSHED.goSection();
	BRUSHED.goUp();
	BRUSHED.filter();
	BRUSHED.fancyBox();
	BRUSHED.scrollToTop();
	BRUSHED.utils();
	BRUSHED.accordion();
	BRUSHED.toggle();
	BRUSHED.toolTip();
	$("img.kidslazy").lazyload();

});

$(window).resize(function(){
	BRUSHED.mobileNav();
});


var photosData = {
    groups: [{
        name: "kids",
        clsName : "lazy",
        photos: [
        	"kids_201602_2029",
            "kids_201602_2051",
            "kids_201602_2192-2",
            "kids_201602_3357",
            "kids_201602_3422",
            "kids_201602_3550",
            "kids_201602_3614",
            "kids_201602_3661-2",
            "kids_201602_4695",
            "kids_201602_4811",
            "kids_201602_5006",
            "kids_201602_5206",
            "kids_201602_5391",
            "kids_201602_5727",
            "kids_201602_5825",
            "kids_201602_5977",
            "kids_201602_8871",
            "kids_201602_9079",
            "kids_201602_9342",
            "kids_201602_9375",
        	"kids_201511_7366",
            "kids_201511_4204",
            "kids_201511_4083bw",
            "kids_201511_2584",
            "kids_201511_2511",
			"kids_201510_9884",
			"kids_201510_8224",
			"kids_201510_8177",
			"kids_201510_7941",
			"kids_201510_7913",
			"kids_201510_5486",
			"kids_201510_5388-1",
			"kids_201510_0510",
			"kids_201510_0455",
			"kids_201508_9613",
			"kids_201508_6353",
			"kids_201508_4143",
			"kids_201508_4125",
			"kids_201508_3082",
			"kids_201508_2953",
			"kids_201508_2947",
			"kids_201508_2848",
			"kids_201508_2723",
			"kids_201508_2670-2",
			"kids_201508_2333",
			"kids_201508_1969",
			"kids_201501_9024",
			"kids_201501_8937",
			"kids_201501_8792",
			"kids_201501_8779",
			"kids_201501_8402",
			"kids_201501_8228",
			"kids_201501_7491",
			"kids_201501_7251",
			"kids_201501_7237",
			"kids_201501_7231",
			"kids_201501_5946",
			"kids_201501_5071",
			"kids_201501_3244",
			"kids_201501_2559",
			"kids_201501_2466",
			"kids_201501_2227",
			"kids_201501_2206",
			"kids_201501_1986",
			"kids_201501_1975",
			"kids_201501_1948",
			"kids_201501_0207",
			"kids_201409_28",
			"kids_201409_26",
			"kids_201409_25",
			"kids_201409_21",
			"kids_201409_20",
			"kids_201409_15",
			"kids_201409_10",
			"kids_201409_08",
			"kids_201409_07",
			"kids_201408_19",
			"kids_201408_18",
			"kids_201408_17",
			"kids_201408_14",
			"kids_201408_09",
			"kids_201408_07",
			"kids_201408_06",
			"kids_201408_01",
            ]
    }, {
        name: "fam",
        clsName : "lazy",
        photos: [
        	"fam_201602_1383",
            "fam_201602_1761",
            "fam_201602_2021",
            "fam_201602_2552",
            "fam_201602_2676",
            "fam_201602_2895",
            "fam_201602_2971",
            "fam_201602_3119",
            "fam_201602_3327",
            "fam_201602_3716",
            "fam_201602_3725",
            "fam_201602_4166",
            "fam_201602_4325",
            "fam_201602_4457",
            "fam_201602_4702",
            "fam_201602_4883",
            "fam_201602_4997",
            "fam_201602_5110",
            "fam_201602_6642",
            "fam_201602_6717",
        	"fam_201511_7291",
            "fam_201511_7168",
            "fam_201511_4008",
            "fam_201511_3957",
            "fam_201511_2573",
        	"fam_201510_9665-2",
            "fam_201510_9563",
            "fam_201510_8528-2",
            "fam_201510_7644-2",
            "fam_201510_5992",
            "fam_201510_5537",
            "fam_201510_5319-2",
            "fam_201510_0387",
            "fam_201508_8347",
            "fam_201508_7824",
            "fam_201508_7162",
            "fam_201508_2183",
            "fam_201508_2110",
            "fam_201501_9310",
            "fam_201501_8971",
            "fam_201501_8938",
            "fam_201501_8836",
            "fam_201501_8721",
            "fam_201501_7110",
            "fam_201501_7061",
            "fam_201501_7013",
            "fam_201501_6978",
            "fam_201501_5347",
            "fam_201501_2100",
            "fam_201501_2087",
            "fam_201501_1827",
            "fam_201501_1249",
            "fam_201409_25",
            "fam_201409_24",
            "fam_201409_22",
            "fam_201409_20",
            "fam_201409_13",
            "fam_201409_11",
            "fam_201409_10",
            "fam_201409_09",
            "fam_201409_08",
            "fam_201409_07",
            "fam_201409_06",
            "fam_201409_05",
            "fam_201409_01",
            "fam_201408_06",
            "fam_201408_05",
        	]
    }, {name : "preg",
    	clsName : "lazy",
    	photos : [
			"preg_201511_2248bw",
            "preg_201511_2206bw",
            "preg_201511_1982",
            "preg_201501_9905",
            "preg_201501_9549",
            "preg_201501_9352",
            "preg_201501_8948",
            "preg_201501_8904",
            "preg_201501_3807",
            "preg_201501_3803",
            "preg_201501_3795",
            "preg_201501_3794",
            "preg_201501_3793",
            "preg_201501_3426",
            "preg_201409_02",
            "preg_201408_25",
            "preg_201408_22",
            "preg_201408_21",
            "preg_201408_08",
            "preg_201408_07",
            "preg_201408_06",
            "preg_201408_05",
            "preg_201408_04",
            "preg_201408_01",
    		]
    }, {name : "newb",
		clsName : "lazy",
		photos : [
			"newb_201602_1309",
            "newb_201602_1340",
            "newb_201602_1365",
            "newb_201602_1383",
            "newb_201602_1624",
            "newb_201602_1680-1",
            "newb_201602_3478",
			]
    }, {name : "pers",
    	clsName : "lazy",
    	photos : [
            "pers_201602_3617",
            "pers_201602_3834",
            "pers_201602_4089",
            "pers_201602_9419",
            "pers_201602_9510-2",
			"pers_201511_3090",
    		"pers_201510_3061",
            "pers_201511_3075",
            "pers_201511_2986",
            "pers_201511_2927",
            "pers_201511_2814",
            "pers_201511_2334",
            "pers_201511_2272-2",
            "pers_201511_2028",
            "pers_201511_1930",
            "pers_201510_0124",
            "pers_201508_6137",
            "pers_201508_4661",
            "pers_201508_4549",
            "pers_201508_4241",
            "pers_201508_1232",
            "pers_201508_1070",
            "pers_201508_0347",
            "pers_201508_0319",
            "pers_201508_0075",
            "pers_201409_04",
            "pers_201408_17",
            "pers_201408_15",
            "pers_201408_14",
            "pers_201408_13",
            "pers_201408_10",
            "pers_201408_09",
            "pers_201408_08",
            "pers_201408_06",
    		]
    },{name : "proj",
    	clsName : "lazy",
     	photos: [
			"proj_201408_09",
			"proj_201408_07",
			"proj_201408_06",
			"proj_201408_05",
			"proj_201408_04",
			"proj_201408_03",
			"proj_201408_02",
			]
    }, {name : "wed",
    	clsName : "lazy",
     	photos :[
			 "wed_201408_08",
			 "wed_201408_07",
			 "wed_201408_06",
			 "wed_201408_05",
			 "wed_201408_04",
			 "wed_201408_03",
			 "wed_201408_02",
			 "wed_201408_01",
			 ]
    }, {name : "eng",
       	clsName : "lazy",
		photos :[
			 "eng_201602_1960",
             "eng_201602_1983",
             "eng_201602_2111",
             "eng_201602_2193",
             "eng_201602_2194-2",
		     "eng_201510_0889-4",
             "eng_201511_0975-2",
			 "eng_201511_1454",
             "eng_201511_1372",
             "eng_201511_1294",
             "eng_201511_1265",
             "eng_201511_1153",
             "eng_201511_1121",
             "eng_201511_0611",
             "eng_201511_0601",
             "eng_201511_0410",
		     ]
	}
    ]
}

});

