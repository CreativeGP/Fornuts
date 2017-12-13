function getRandomString(myStrong){
 strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
	color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isNumeric(num){
    return !isNaN(num)
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function removeParameterFromURL(url) {
    if (url.indexOf("?") != -1) {
	url = url.slice(0, url.indexOf("?"));
    }
    return url;
}

$.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            let range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

/**
 文字列チェック
 @param  input    String  チェック対象文字列
 @param  charType String  チェック種別
                          　・"zenkaku"               : 全角文字（ひらがな・カタカナ・漢字 etc.）
                          　・"hiragana"              : 全角ひらがな
                          　・"katakana"              : 全角カタカナ
                          　・"alphanumeric"          : 半角英数字（大文字・小文字）
                          　・"numeric"               : 半角数字
                          　・"alphabetic"            : 半角英字（大文字・小文字）
                          　・"upper-alphabetic"      : 半角英字（大文字のみ）
                          　・"lower-alphabetic"      : 半角英字（小文字のみ）
 @return Boolean チェック結果OKかどうか 
                 true  : チェックOK（引数に指定した種別の文字列のみで構成されている)
                 false : チェックNG（引数に指定した種別以外の文字列が含まれている）
 */
function checkCharType(input, charType) {
    switch (charType) {
        // 全角文字（ひらがな・カタカナ・漢字 etc.）
        case "zenkaku":
            return (input.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) ? true : false;
        // 全角ひらがな
        case "hiragana":
            return (input.match(/^[\u3041-\u3096]+$/)) ? true : false;
        // 全角カタカナ
        case "katakana":
            return (input.match(/^[\u30a1-\u30f6]+$/)) ? true : false;
        // 半角英数字（大文字・小文字）
        case "alphanumeric":
            return (input.match(/^[0-9a-zA-Z]+$/)) ? true : false;
        // 半角数字
        case "numeric":
            return (input.match(/^[0-9]+$/)) ? true : false;
        // 半角英字（大文字・小文字）
        case "alphabetic":
            return (input.match(/^[a-zA-Z]+$/)) ? true : false;
        // 半角英字（大文字のみ）
        case "upper-alphabetic":
            return (input.match(/^[A-Z]+$/)) ? true : false;
        // 半角英字（小文字のみ）
        case "lower-alphabetic":
            return (input.match(/^[a-z]+$/)) ? true : false;
    }
    return false;
}

/** スクロールバー位置更新
 chromeやIEではjsで値を変更してキャレットが画面の外に出ても
 スクロールバーが追従しないのを何とかする関数
*/
var updateScrollPos = function(editor) {
    // 初期状態を保存
    let text = $(editor).val();
    let selectionStart = editor.selectionStart;
    let selectionEnd   = editor.selectionEnd;

    // insertTextコマンドで適当な文字(X)の追加を試みる
    let isInsertEnabled;
    try {
        isInsertEnabled = document.execCommand("insertText", false, "X");
    } catch(e) {
        // IE10では何故かfalseを返さずに例外が発生するのでcatchで対応する
        isInsertEnabled = false;
    }

    if (isInsertEnabled) {
        // insertTextに成功したらChrome
        // chromeはどう頑張ってもまっとうな手段が通用しない。
        // 苦肉の策としてselectionStart,endを揃えてから
        // 一旦フォーカスを外してすぐに戻す。そうするとスクロールバーが追従する
        // これにより、chromeではblurやfocusイベントはまともに使えなくなる黒魔術
        $(editor).val(text);
        editor.selectionStart = selectionStart;
        editor.selectionEnd = selectionStart;
        $(editor).trigger("blur", ["kantanEditorDummy"]);
        $(editor).trigger("focus", ["kantanEditorDummy"]);

        // valは戻してあるのでキャレット位置のみ元に戻す
        editor.selectionStart = selectionStart;
        editor.selectionEnd = selectionEnd;
    } else {
        // IE,FirefoxはinsertTextに失敗するのでval関数で適当な文字(X)を挿入する。
        // IEではその後にその文字を選択してdeleteコマンドで削除するとスクロールバーが追従する
        let part1 = text.substring(0, selectionStart);
        let part2 = text.substr(selectionEnd);
        $(editor).val(part1 + "X" + part2);
        editor.selectionStart = part1.length;
        editor.selectionEnd = part1.length + 1;
        let isDeleteEnabled = document.execCommand("delete", false, null);

        // 追従した後はvalとキャレットを元に戻す
        $(editor).val(text);
        editor.selectionStart = selectionStart;
        editor.selectionEnd = selectionEnd;
    }
}


var getTextHeight = function(font) {
    var text = $('<span>Hg</span>').css({ fontFamily: font });
    var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

    var div = $('<div></div>');
    div.append(text, block);

    var body = $('body');
    body.append(div);

    try {

	var result = {};

	block.css({ verticalAlign: 'baseline' });
	result.ascent = block.offset().top - text.offset().top;

	block.css({ verticalAlign: 'bottom' });
	result.height = block.offset().top - text.offset().top;

	result.descent = result.height - result.ascent;

    } finally {
	div.remove();
    }

    return result;
};

function getSelectionDimensions() {
    var sel = document.selection, range;
    var width = 0, height = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            width = range.boundingWidth;
            height = range.boundingHeight;
        }
    } else if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getBoundingClientRect) {
                var rect = range.getBoundingClientRect();
                width = rect.right - rect.left;
                height = rect.bottom - rect.top;
            }
        }
    }
    return { width: width , height: height };
}

String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

String.prototype.regexLastIndexOf = function(regex, startpos) {
    regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
    if(typeof (startpos) == "undefined") {
        startpos = this.length;
    } else if(startpos < 0) {
        startpos = 0;
    }
    var stringToWorkWith = this.substring(0, startpos + 1);
    var lastIndexOf = -1;
    var nextStop = 0;
    while((result = regex.exec(stringToWorkWith)) != null) {
        lastIndexOf = result.index;
        regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
}
