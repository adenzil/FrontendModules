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

slideshow.generate().start();