function getRandomString(myStrong){
    var strong = 1000;
    if (myStrong) strong = myStrong;
    return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
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
            var range = this.createTextRange();
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
