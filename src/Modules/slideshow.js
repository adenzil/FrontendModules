import $ from 'jQuery';
import _ from 'lodash';
import '../Styles/style.scss';


var slideshow = {
	selector: "#slideshow",
	$selector: $("#slideshow"),
	$slides: $("#slideshow .slide"),
	interval: 3000,
	fadeTime: 1000,
	currentSlide: 0,
	autoChange: true,
	infiniteLoop: true,
	intervalTimer: null,
	toggleButtons: true,
	dots: true,
}

slideshow.generate = () => {

	slideshow.$slides.each((index, slide) => {
		$(slide).attr('index', index).addClass("hide");
	});

	if(slideshow.toggleButtons) {
		slideshow.$selector.append($("<a>", {class: "prev", html: "&#10094;"}).bind('click', slideshow.prevSlide));
		slideshow.$selector.append($("<a>", {class: "next", html: "&#10095;"}).bind('click', slideshow.nextSlide));
	}

	if(slideshow.dots) {
		var $dots = $("<div>", {class: "dots"});
		$("body").append($dots);
		slideshow.$slides.each((index, obj) => {
			$dots.append($("<span>", {class: "dot", attr: {index}}).bind('click', index, slideshow.goToSlide));
		})
	}

	console.log(slideshow);

	return slideshow;
};

slideshow.start = () => {

	slideshow.$slides.hide();

	if(slideshow.autoChange) {
		slideshow.intervalTimer = setInterval(function() {
			var $activeSlide = slideshow.getSlide();
			$activeSlide.fadeOut(slideshow.fadeTime);
			slideshow.currentSlide = (slideshow.currentSlide + 1 < slideshow.$slides.length  ? slideshow.currentSlide+1 : 0);
			slideshow.getSlide().fadeIn(slideshow.fadeTime);
			slideshow.$selector.find(".dot").removeClass(".dot").find(`[index="${slideshow.currentSlide}"]`).addClass("active");
		},  slideshow.interval);
	}

	return slideshow;
}

slideshow.stop = () => {
	clearInterval(slideshow.intervalTimer);
	return slideshow;
}

slideshow.getSlide = () => {
	return slideshow.$selector.find(`.slide[index="${slideshow.currentSlide}"]`);
}

slideshow.hideSlides = () => {
	slideshow.$selector.find(".slide").hide();
}

slideshow.goToSlide = (event, slide) => {
	var slideIndex = (slide !== undefined ? slide : event.data);
	slideshow.stop();
	slideshow.currentSlide = slideIndex;
	slideshow.hideSlides();
	slideshow.getSlide().fadeIn(slideshow.fadeTime);
}

slideshow.nextSlide = () => {
	slideshow.currentSlide = slideshow.currentSlide+1 < slideshow.$slides.length  ? slideshow.currentSlide+1 : 0;
	slideshow.goToSlide(null, slideshow.currentSlide);
}

slideshow.prevSlide = () => {
	slideshow.currentSlide = slideshow.currentSlide == 0  ? slideshow.$slides.length-1 : slideshow.currentSlide-1;
	slideshow.goToSlide(null, slideshow.currentSlide);
}

export default slideshow;