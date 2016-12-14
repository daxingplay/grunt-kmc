// index.js
KISSY.add(function (S,require,exports,module) {
	"use strict";
	var A = require('../../mods/a');
	var $ = S.all;
	module.exports = {
		init:function(){
			$('<p>' + A.ok + '</p>').appendTo(document.body);
		}
	};
});
