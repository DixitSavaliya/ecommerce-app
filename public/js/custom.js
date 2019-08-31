$(document).ready(function(){
	$('.language > a').click(function () {
		$(this).next().slideToggle();
	});
	$('.languages li > a').click(function () {
		var value = $(this).html();
		$('.language > a').html(value);
		$('.languages').hide();
	});
	$('.currency > a').click(function () {
		$(this).next().slideToggle();
	});
	$('.currencies li > a').click(function () {
		var value = $(this).html();
		$('.currency > a').html(value);
		$('.currencies').hide();
	});
	$('.search_toggle_btn').click(function(){
		$(this).next('.search_box').slideToggle();
	});
	$('.testimonial_slider').slick({
		infinite: true,
		arrows: false,
		draggable: false,
		dots: true
	});
	$('.banner_slider').slick({
		infinite: true,
		arrows: true,
		infinite: false,
		draggable: false,
		dots: false,
		nextArrow: '<button class="slick-next slick-arrow" type="button"><span class="icon"></span></button>',
        prevArrow: '<button class="slick-prev slick-arrow" type="button"><span class="icon"></span></button>'
	});
	$('.blog_slider,.product_slider_two').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		draggable: false,
		slidesToScroll: 1,
		nextArrow: '<button class="slick-next slick-arrow" type="button">></button>',
		prevArrow: '<button class="slick-prev slick-arrow" type="button"><</button>',
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 1
			}
		}
		]
	});
	$('.product_slider').slick({
		dots: false,
		infinite: false,
		speed: 300,
		slidesToShow: 4,
		draggable: false,
		slidesToScroll: 1,
		nextArrow: '<button class="slick-next slick-arrow" type="button"><span class="icon"></span></button>',
		prevArrow: '<button class="slick-prev slick-arrow" type="button"><span class="icon"></span></button>',
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 1
			}
		}
		]
	});
});