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
 nut.js - Fornuts
 2017/12/03 (yyyy/mm/dd)
*/

let NUT;

NUT = function (readonly) {
    let rio = (readonly) ? "readonly" : "";
    $("#menu").after(`
	<textarea class="fullscreen nut" id="nut-${NUT.num}" wrap="off" ${rio}>This is test.

	Multilines.</textarea>
`);
    NUT.nuts.push(this);
    
    this.flags = {
	readonly: readonly
    };
    this.nut_id = NUT.num;
    this.cursor = new CURSOR(this.nut_id, 0);

    this.words = [];

    NUT.activate(this.nut_id);

    let self = this;
    $("#nut-"+this.nut_id).keydown((e) => {
	self.updateWords();
	e = e || window.event; // Get event
	if (e.ctrlKey) {
	    let c = e.which || e.keyCode; // Get key code
	    switch (c) {
	    case 8:
	    case 37:
	    case 38:
	    case 39:
	    case 40:
		return;
	    case 188:
		// move left
		self.cursor.word_move(-1);
		break;
	    case 190:
		// move right
		self.cursor.word_move(1);
		break;
	    }
	    switch (String.fromCharCode(c)) {
	    case 'A':
	    case 'C':
	    case 'V':
	    case 'X':
		return;
	    case 'S':
		DIALOG.getDialog('save').show();
		break;
	    case 'H':
		self.cursor.move(-1);
		break;
	    case 'L':
		self.cursor.move(1);
		break;
	    case 'K':
		// move up
		self.cursor.chmove(0, -1);
		break;
	    case 'J':
		// move down
		self.cursor.chmove(0, 1);
		break;
	    }
	    e.preventDefault();
	    e.stopPropagation();
	} else {
	    let c = e.which || e.keyCode; // Get key code
	    switch (c) {
	    case 9:
		if (e.preventDefault) e.preventDefault();

		let elem = e.target;
		let start = elem.selectionStart;
		let end = elem.selectionEnd;
		let value = elem.value;
		elem.value = "" + (value.substring(0, start)) + "\t" + (value.substring(end));
		elem.selectionStart = elem.selectionEnd = start + 1;
	    }
	}
    });

    NUT.num ++;
};

NUT.prototype.updateWords = function () {
      $.get('http://cgp.php.xdomain.jp/lab/morph/index.php',
	    { s: $("#nut-"+this.nut_id).val() },
	    (data) => {
		let pos = 0;
		let content = $("#nut-"+this.nut_id).val();
		this.words = [];
		data.result.some((v, i) => {
		    pos = content.indexOf(v, pos);
		    this.words.push(pos);
		    pos += v.length;
		});
		this.words.push(content.length+1);
	    });
};

NUT.getNut = (id) => {
    let res = null;
    NUT.nuts.forEach((v, i, a) => {
	if (v.nut_id == id) res = v;
    });
    // 見つからなかった場合はnullを返すので注意
    return res;
};

NUT.getActiveNut = () => {
    let res = null;
    NUT.nuts.forEach((v, i, a) => {
	if ($("#nut-"+v.nut_id).css("z-index") == "1")
	    res = v;
    });
    return res;
};

NUT.getActiveNutId = () => {
    let focused = $('.nut').is(':focus');
    if (focused.length > 0) return Number(focused.replace("nut-", ""));
    return -1;
};

NUT.isActive = () => {
    return (NUT.getActiveNutId() == this.nut_id);
}

NUT.activate = (id) => {
    NUT.nuts.forEach((v, i, a) => {
	if (v.nut_id == id)
	    $("#nut-"+v.nut_id).css("z-index", "1");
	else
	    $("#nut-"+v.nut_id).css("z-index", "0");
    });
};

NUT.num = 0;
NUT.nuts = [];
