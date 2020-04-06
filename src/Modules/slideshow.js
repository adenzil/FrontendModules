import $ from 'jQuery';
import _ from 'lodash';
import '../Styles/style.scss';


var slideshow = {
	selector: "#slideshow",
	$selector: $("#slideshow"),
	interval: 3000,
	fadeTime: 1000,
	currentSlide: 0,
	autoChange: true,
	infiniteLoop: true,
	intervalTimer: null,
	toggleButtons: true,
	dots: true,
	content: [
		{
			"image": "http://farm6.static.flickr.com/5224/5658667829_2bb7d42a9c_m.jpg",
			"text": "Flowers"
		},
		{
			"image": "http://farm6.static.flickr.com/5230/5638093881_a791e4f819_m.jpg",
			"text": "Dog"
		},
		{
			"text": "Default text"
		}
	]
}

slideshow.updateContent = (content) => {
	slideshow.content = content;
	return slideshow;
}

slideshow.generate = () => {

	$.each(slideshow.content, (index, obj) => {
		if(!$.isEmptyObject(obj)) {
			var $div = $("<div>", { class:"slide", attr: {index} });
			slideshow.$selector.append($div);
		}
		if(obj.image) {
			$div.append($("<img>", {src: obj.image}));
		}
		if(obj.text) {
			var $text = $("<div>", {text: obj.text}).css("text-align", "center");
			$div.append($text);
			if(obj.textPosition) {
				$text.css("text-align", obj.textPosition);
			}
		}
	});

	if(slideshow.toggleButtons) {
		slideshow.$selector.append($("<a>", {class: "prev", html: "&#10094;"}).bind('click', slideshow.prevSlide));
		slideshow.$selector.append($("<a>", {class: "next", html: "&#10095;"}).bind('click', slideshow.nextSlide));
	}

	if(slideshow.dots) {
		var $dots = $("<div>", {class: "dots"});
		$("body").append($dots);
		$.each(slideshow.content, (index, obj) => {
			$dots.append($("<span>", {class: "dot", attr: {index}}).bind('click', index, slideshow.goToSlide));
		})
	}

	console.log(slideshow);

	return slideshow;
};

slideshow.start = () => {

	slideshow.$selector.find(".slide").hide();

	if(slideshow.autoChange) {
		slideshow.intervalTimer = setInterval(function() {
			var $activeSlide = slideshow.getSlide();
			$activeSlide.fadeOut(slideshow.fadeTime);
			slideshow.currentSlide = (slideshow.currentSlide + 1 < slideshow.content.length  ? slideshow.currentSlide+1 : 0);
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
	slideshow.currentSlide = slideshow.currentSlide+1 < slideshow.content.length  ? slideshow.currentSlide+1 : 0;
	slideshow.goToSlide(null, slideshow.currentSlide);
}

slideshow.prevSlide = () => {
	slideshow.currentSlide = slideshow.currentSlide == 0  ? slideshow.content.length-1 : slideshow.currentSlide-1;
	slideshow.goToSlide(null, slideshow.currentSlide);
}

export default slideshow;