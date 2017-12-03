function strlen$(str) { return str.length; }
function substr$(str, start, length=-1) { if (length == -1) { length = str.length - start;	} return str.substr(start, length); }

    function strtrim$(str, char) {
	        res = ''
	        for (var i = 0; i < str.length; i++) {
		            if (str[i] != char) { res += str[i]; 		}
		        	}
	        return res;
	    }
    

    function strtriml$(str, char) {
	        res = ''
	        if (str[0] != char) { return str; 	}
	        for (var i = 0; i < str.length; i++) {
		            if (str[i] != char) { res = str.substr(i); break; 		}
		        	}
	        return res;
	    }
    

    function strtrimr$(str, char) {
	        res = ''
	        if (str[str.length-1] != char) { return str; 	}
	        for (var i = str.length-1; i >= 0; i--) {
		            if (str[i] != char) { res = str.substr(0, i+1); break; 		}
		        	}
	        return res;
	    }
    
function stridx$(cmpstr, string, start=0) { return cmpstr.indexOf(string, start); }
function strridx$(cmpstr, string, start=0) { return cmpstr.lastIndexOf(string, start); }
function strrep$(src, pattern, replacement) {
	//    var regExp = new RegExp(pattern, "g");
	        return src.split(pattern).join(replacement); }
function timeout$(func, ms) { setTimeout(func, ms); }
function css$(target, selector, value) {
	        switch (arguments.length) {
		        case 2: return target.css(selector);
		        case 3: target.css(selector, value);
		        	}
}

$(function() {
	function strat(str, i) {
		return substr$(str,i,1);
	}
	function isnum(str) {
		var i = 0;
		var numbers = '';
		numbers = '0123456789';
		while (true) {
			var j = 0;
			while (true) {
				if ((strat(str,i) ==  strat(numbers,j))) {
					break;
				}
				else if (true) {
					if ((j == 9)) {
						return false;
					}
				}
				j = (j + 1);
			}
			i = (i + 1);
			if ((i == strlen$(str))) {
				break;
			}
		}
		return true;
	}
	function strdel(str, idx, len) {
		if ((idx < 0)) {
			idx = (strlen$(str) +  idx);
		}
		var res = '';
		var i = 0;
		while (true) {
			if (((idx <= i) &&  (i < (idx + len)))) {
			}
			else if (true) {
				res = (res + strat(str,i));
			}
			if ((i == strlen$(str))) {
				break;
			}
			i = (i + 1);
		}
		return res;
	}
	function strins(src, idx, dst) {
		if ((idx < 0)) {
			idx = (strlen$(str) +  idx);
		}
		var res = '';
		res = (substr$(src,0,idx) +  dst + substr$(src,idx));
		return res;
	}
	;
	function _li_is_colon(list, i) {
		if ((strlen$(list) >=  1)) {
			if ((strlen$(list) >  i)) {
				return (!(('%' == strat(list,(i - 1)))) &&  (':' == strat(list,i)));
			}
			else if (true) {
				console.log('Error(_li_is_colon): Index error.');;
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		else if (true) {
			return false;
		}
	}
	function _li_is_bar(list, i) {
		if ((strlen$(list) >=  1)) {
			if ((strlen$(list) >  i)) {
				return (!(('%' == strat(list,(i - 1)))) &&  ('|' == strat(list,i)));
			}
			else if (true) {
				console.log('Error(_li_is_bar): Index error.');;
				throw new Error('This is not an error. This is just to abort javascript');
			}
		}
		else if (true) {
			return false;
		}
	}
	function lilen(list) {
		if ((strlen$(list) <=  1)) {
			return 0;
		}
		var res = 0;
		var i = 0;
		i = 1;
		while (true) {
			if (_li_is_colon(list,i)) {
				res = (res + 1);
			}
			i = (i + 1);
			if ((i == strlen$(list))) {
				break;
			}
		}
		return res;
	}
	function liat(list, idx) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(liat): Index error.');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		start_of_element = (1 + stridx$(list,':',start_of_element));
		var end_of_element = 0;
		end_of_element = stridx$(list,'|',start_of_element);
		var res = '';
		res = substr$(list,start_of_element,(end_of_element - start_of_element));
		var i = 0;
		i = 1;
		if ((i > 1)) {
			while (true) {
				i = (i + 1);
				if ((i == strlen$(res))) {
					break;
				}
			}
		}
		return res;
	}
	function licon(list, element) {
		if ((strlen$(element) ==  0)) {
			return ;
		}
		var escaped_str = '';
		var i = 0;
		while (true) {
			var char = '';
			char = strat(element,i);
			if ((char == ':')) {
				char = '%:';
			}
			if ((char == '|')) {
				char = '%|';
			}
			if ((char == '%')) {
				char = '%%';
			}
			escaped_str = (escaped_str + char);
			i = (i + 1);
			if ((i == strlen$(element))) {
				break;
			}
		}
		list = (list + lilen(list) +  ':' + escaped_str + '|');
		return list;
	}
	function lidel(list, idx) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(lidel) Index error');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		var end_of_element = 0;
		end_of_element = (1 + stridx$(list,'|',start_of_element));
		var res = '';
		res = (substr$(list,0,start_of_element) +  substr$(list,end_of_element));
		res = lireindex(res);
		return res;
	}
	function lireindex(list) {
		var count = 0;
		var i = 0;
		i = 1;
		while (true) {
			if (_li_is_colon(list,i)) {
				var bar_pos = 0;
				var j = 0;
				j = i;
				while (true) {
					if (_li_is_bar(list,j)) {
						bar_pos = (j + 1);
						break;
					}
					if ((j == 0)) {
						break;
					}
					j = (j - 1);
				}
				var figure_length = 0;
				figure_length = strlen$(String((count)));
				list = strdel(list,bar_pos,(i - bar_pos));
				list = strins(list,bar_pos,String((count)));
				count = (count + 1);
				i = (i + (figure_length - 1));
			}
			if ((i == (strlen$(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return list;
	}
	function lialt(list, idx, elm) {
		if ((lilen(list) <=  idx)) {
			console.log('Error(lidel) Index error');;
			throw new Error('This is not an error. This is just to abort javascript');
		}
		var start_of_element = 0;
		start_of_element = stridx$(list,(idx + ':'));
		var end_of_element = 0;
		end_of_element = stridx$(list,'|',start_of_element);
		var res = '';
		var figure_length = 0;
		figure_length = strlen$(String((idx)));
		res = (substr$(list,0,((1 + figure_length) +  start_of_element)) +  elm + substr$(list,end_of_element));
		return res;
	}
	function limatchstr(list, str) {
		var i = 0;
		while (true) {
			if ((liat(list,i) ==  str)) {
				return true;
			}
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return false;
	}
	function liidx(list, elm, start) {
		var i = 0;
		i = start;
		while (true) {
			if ((liat(list,i) ==  elm)) {
				return i;
			}
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
		}
		return -1;
	}
	function lisub(list, start, length) {
		if ((length == 0)) {
			return '';
		}
		var res = '';
		var i = 0;
		i = start;
		while (true) {
			res = licon(res,liat(list,i));
			if ((i == ((start + length) -  1))) {
				break;
			}
			i = (i + 1);
		}
		res = lireindex(res);
		return res;
	}
	function liins(list, idx, elm) {
		return lireindex((lisub(list,0,(idx + 1)) +  licon('',elm) +  lisub(list,(idx + 1), (lilen(list) -  (idx + 1)))));
	}
	function li2str(list, sep) {
		var res = '';
		var i = 0;
		while (true) {
			res = (res + liat(list,i));
			if ((i == (lilen(list) -  1))) {
				break;
			}
			i = (i + 1);
			res = (res + sep);
		}
		return res;
	}
	;
	function Web_Object (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.id = me.__name;
	}
	
	function Letter (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.color = '';
		me.backcolor = '';
		me.id = me.__name;
		me.__init = function () {
		};
	}
	
	function Button (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.autofocus = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formenctype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.name = '';
		me.type = '';
		me.value = '';
		me.id = me.__name;
		me.__init = function () {
		};
	}
	
	function Div (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.id = me.__name;
		me.__init = function () {
		};
	}
	
	function Image (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.alt = '';
		me.crossorigin = '';
		me.longdesc = '';
		me.referrerpolicy = '';
		me.sizes = '';
		me.src = '';
		me.srcset = '';
		me.usemap = '';
		me.width = 0;
		me.height = 0;
		me.ismap = false;
		me.id = me.__name;
		me.__init = function () {
		};
	}
	
	function Textbox (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.rows = 0;
		me.cols = 0;
		me.maxlength = 0;
		me.minlength = 0;
		me.text = '';
		me.autocapitalize = false;
		me.autocomplete = false;
		me.autofocus = false;
		me.disabled = false;
		me.spellcheck = false;
		me.readonly = false;
		me.selectionDirection = '';
		me.selectionEnd = 0;
		me.selectionStart = 0;
		me.form = '';
		me.placeholder = '';
		me.wrap = '';
		me.id = me.__name;
		me.__init = function () {
		};
	}
	
	function Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
		};
	}
	
	function Checkbox (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Color_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Date_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Email_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function File_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Month_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Number_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Password (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Radio_Button (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Range_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Reset_Button (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Search_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Submit_Button (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function TEL_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function URL_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Time_Input (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Week_Selector (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.text = '';
		me.type = '';
		me.autocomplete = '';
		me.autofocus = false;
		me.capture = false;
		me.disabled = false;
		me.form = '';
		me.formaction = '';
		me.formactype = '';
		me.formmethod = '';
		me.formnovalidate = false;
		me.formtarget = '';
		me.height = 0;
		me.inputmode = '';
		me.list = '';
		me.max = 0;
		me.maxlength = 0;
		me.min = 0;
		me.minlength = 0;
		me.multiple = false;
		me.name = '';
		me.pattern = '';
		me.placeholder = '';
		me.readonly = false;
		me.required = false;
		me.selectionDirection = '';
		me.selectionStart = 0;
		me.selectionEnd = 0;
		me.size = 0;
		me.spellcheck = '';
		me.src = '';
		me.step = '';
		me.val = '';
		me.width = 0;
		me.id = me.__name;
		me.__init = function () {
			$("#" + this.id).attr('maxlength', this.maxlength);
			$("#" + this.id).get(0).type = this.type;
		};
	}
	
	function Combobox (name) {
		var me = this;
		me.__name = name;
		me._web = '';
		me.__element = $("#"+me.__name);
		me.accesskey = '';
		me.class = '';
		me.contextmenu = '';
		me.dir = '';
		me.dropzone = '';
		me.id = '';
		me.itemid = '';
		me.itemprop = '';
		me.itemref = '';
		me.itemscope = '';
		me.itemtype = '';
		me.lang = '';
		me.style = '';
		me.title = '';
		me.translate = '';
		me.contenteditable = false;
		me.draggable = false;
		me.hidden = false;
		me.spellcheck = false;
		me.tabindex = 0;
		me.autofocus = false;
		me.disabled = false;
		me.form = '';
		me.multiple = false;
		me.name = '';
		me.required = false;
		me.size = 0;
		me.choices = '';
		me.text = '';
		me.val = '';
		me.id = me.__name;
		me.__init = function () {
		};
	}
	Combobox.prototype.add_choice = function (choi) {
		$("#" + this.id).html(this.text);
	};
	Combobox.prototype.selected_choice = function () {
		return $("#" + this.id).val();
	};
	
	;
	;
	var view = new Textbox("view");
	$('body').append("<textarea id='view'></textarea>");
	view._web = 'Textbox';
	css$($('#view'),'width','100%');
	css$($('#view'),'height','100%');
	return;
});
