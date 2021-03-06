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
 dialog.js - Fornuts
 2017/12/03 (yyyy/mm/dd)
*/

let DIALOG;

DIALOG = function (title, content, id) {
    this.title = title;
    this.content = content;
    if (id) this.id = id;
    else this.id = getRandomString(10);
    $('#dialog-layer').before(`
<form id="fornuts-dialog-${this.id}" class="fornuts-dialog" style="background-color: #dbeaf9">
<div style="background-color: gray">
<p class="text-center">${title}</p>
</div>
${content}
</form>
`);
    $('#fornuts-dialog-'+this.id).draggable();
    $('#fornuts-dialog-'+this.id).resizable();
    $('#fornuts-dialog-'+this.id).css('mrgin', '0');
    $('#fornuts-dialog-'+this.id).css('display', 'none');
    $('#fornuts-dialog-'+this.id).css('z-index', '10');

    let self = this;
    $(document).keydown((e) => {
	if (e.keyCode == 27) // Esc
	    self.hide();
    });
    DIALOG.dialogs.push(this);
}

DIALOG.dialogs = [];

DIALOG.loadDirectly = function (jq) {
    return new DIALOG(jq.find('title').text(), jq.html(), jq.attr("id"));
}

DIALOG.getDialog = function (id) {
    let res = null;
    DIALOG.dialogs.forEach((v, i, a) => {
	if (v.id == id) res = v;
    });
    // 見つからなかった場合はnullを返すので注意
    return res;
}
DIALOG.prototype.show = function () {
    $('#fornuts-dialog-'+this.id).css('display', 'block');
}
DIALOG.prototype.hide = function () {
    $('#fornuts-dialog-'+this.id).css('display', 'none');
}
DIALOG.prototype.bind = function (selector, event, func) {
    $('#fornuts-dialog-'+this.id+" "+selector).on(event, func);
};
DIALOG.prototype.getJquery = function () {
    return $('#fornuts-dialog-'+this.id);
};
