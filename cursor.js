/*
  _____                      _       
 |  ___|__  _ __ _ __  _   _| |_ ___ 
 | |_ / _ \| '__| '_ \| | | | __/ __|
 |  _| (_) | |  | | | | |_| | |_\__ \
 |_|  \___/|_|  |_| |_|\__,_|\__|___/

The online hackable text editor.
Copyright (C) CGP 2017.
*/

/*
 cursor.js - Fornuts
 2017/12/03 (yyyy/mm/dd)
*/


const CURSOR = function (nut_id) {
    this.nut_id = nut_id;
    this.distance_back_word = 0;
    this.distance_forward_word = 0;
};
CURSOR.prototype.get_position = function () {
    return $("#nut-"+this.nut_id)[0].selectionStart;
};
CURSOR.prototype.get_choordinate = function () {
    let content = $("#nut-"+this.nut_id).val();
    let x = 0;
    let y = 0;
    for (let i = 0, len = content.length; i <= len; i++) {
	if (i == this.get_position())
	    return { x: x, y: y };
	if (content.charAt(i) == '\n')
	{
	    y ++;
	    x = 0;
	    continue;
	}
	x ++;
	if (checkCharType(content.charAt(i), "zenkaku"))
	    x ++;
    }
};
CURSOR.prototype.moveto = function (pos) {
    let jq = $("#nut-"+this.nut_id);
    if (pos >= 0)
    {
	jq.selectRange(pos);
	let cho = this.get_choordinate();
	let char_height = 14; /*getTextHeight("'Ubuntu Mono', monospace").height;*/
	let char_per_page = jq.height() / char_height;
	let page_top_y = jq.scrollTop();
	let page_bottom_y = jq.scrollTop() + jq.height();
	let cursor_y = cho.y * char_height;
	console.log([cursor_y, page_top_y, page_bottom_y]);
	if (page_bottom_y < cursor_y)
	{
	    jq[0].scrollTop += char_height;
	}
	else if (cursor_y < page_top_y)
	{
	    jq[0].scrollTop -= char_height;
	}
    }
};
CURSOR.prototype.move = function (offset) {
    this.moveto(this.get_position() + offset);
};
CURSOR.prototype.chmoveto = function (tox, toy) {
    let content = $("#nut-"+this.nut_id).val();
    let x = 0;
    let y = 0;
    for (let i = 0, len = content.length; i <= len; i++) {
	if (false
	    || (x == tox && y == toy)
	    || (true
		&& checkCharType(content.charAt(i), "zenkaku")
		&& (x == tox || x == tox+1 || x == tox-1) && y == toy))
	{
	    this.moveto(i);
	    break;
	}
	if (content.charAt(i) == '\n')
	{
	    y ++;
	    x = 0;
	    continue;
	}
	x ++;
	if (checkCharType(content.charAt(i), "zenkaku"))
	    x ++;
    }
};
CURSOR.prototype.chmove = function (x, y) {
    let cho = this.get_choordinate();
    this.chmoveto(cho.x + x, cho.y + y);
};
CURSOR.prototype.word_move = function (offset) {
    let nut = NUT.getNut(this.nut_id);
    let wwmm = config.get('word-wise-movement-method');
    if (wwmm == 'segment') {
	nut.checkWordBySegmentation();
	this.move(offset < 0 ?
		  -this.distance_back_word : this.distance_forward_word);
    } else if (wwmm == 'space') {
	nut.checkWordBySpace();
	this.move(offset < 0 ?
		  -this.distance_back_word : this.distance_forward_word);
    }
};
