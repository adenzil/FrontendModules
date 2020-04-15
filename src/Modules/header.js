import $ from 'jQuery';
import _ from 'lodash';
import '../Styles/header.scss';

const selector = "#header";

var header = {
	$selector: $(selector),
	$title: $(`${selector} .title`),
	$menu: $(`${selector} .menu`),
	title: "Header",
};

header.updateContent = (content) => {
	if(content.title) {
		header.$title.text(content.title);
	}
	if(content.blocks) {
		header.$menu.empty();
		$.each(content.blocks, (index, obj) => {
			let $block = $("<li>");
			let $link = $("<a>", {href: obj.href, text: obj.text});
			if(obj.target) {
				$link.attr("target", obj.target);
			}
			$block.append($link);
			header.$menu.append($block);
		})
	}

	return header;
}

header.generate = () => {
	console.log(header.$selector);
	header.$selector.removeClass("hidden");

	return header;
}

export default header;