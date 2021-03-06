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
 config.js - Fornuts
 2017/12/12 (yyyy/mm/dd)
*/

CONFIG = function (filename) {
    this.data = {
	word_wise_movement_method: 'space'
    };
};

CONFIG.prototype.get = function (attr) {
    return this.data[attr];
};

CONFIG.prototype.set = function (attr, value) {
    
};
