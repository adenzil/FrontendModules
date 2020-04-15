import $ from 'jQuery';
import _ from 'lodash';
import slideshow from './Modules/slideshow';
import header from './Modules/header';

console.log('This is index JS')

header.updateContent({
	title: "Header new",
	blocks: [
		{
			text: "Home",
			href: "#home",
		},
		{
			text: "About us",
			href: "https://www.google.com",
			target: "_blank"
		},
		{
			text: "Contact us",
			href: "#contact-us"
		}
	]
}).generate();

slideshow.updateContent([
		{
			"image": "http://farm6.static.flickr.com/5224/5658667829_2bb7d42a9c_m.jpg",
			"text": "Flowers",
			"textPosition": "right"
		},
		{
			"image": "http://farm6.static.flickr.com/5230/5638093881_a791e4f819_m.jpg",
			"text": "Dog",
			"textPosition": "right"
		},
		{
			"text": "A helpful text"
		}
]).generate().start();