/*
combined files : 

xcake/mods/c
xcake/mods/d
xcake/mods/b
xcake/mods/a
xcake/pages/home/index

*/
// c.js
KISSY.add('xcake/mods/c',function (S) {
	S.log('c');
	return {};
}, {
	requires: ['base','node']
});

// d.js
KISSY.add('xcake/mods/d',function (S) {
	S.log('d');
	return {};
}, {
	requires: ['base','node']
});

// b.js
KISSY.add('xcake/mods/b',['./c', './d'], function (S,require,exports,module) {
	S.log('b');
	var C = require('./c');
	var D = require('./d');
	return 'b';
});

// a.js
KISSY.add('xcake/mods/a',['./b'], function (S,require,exports,module) {
	S.log('a');

	var B = require('./b');

	module.exports = {
		ok:B
	};
});

// index.js
KISSY.add('xcake/pages/home/index',['../../mods/a'], function (S,require,exports,module) {
	"use strict";
	var A = require('../../mods/a');
	var $ = S.all;
	module.exports = {
		init:function(){
			$('<p>' + A.ok + '</p>').appendTo(document.body);
		}
	};
});

