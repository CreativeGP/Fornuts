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
    if ($("#nut-"+this.nut_id)[0].selectionStart > 0)
	$("#nut-"+this.nut_id).selectRange(pos);
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
}
CURSOR.prototype.chmove = function (x, y) {
    let cho = this.get_choordinate();
    this.chmoveto(cho.x + x, cho.y + y);
};
