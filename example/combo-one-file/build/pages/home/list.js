/*
combined files : 

xcake/mods/c
xcake/mods/d
xcake/mods/b
xcake/pages/home/list

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

// list.js
KISSY.add('xcake/pages/home/list',function (S) {
	var List = {};
	return List;
}, {
	requires: ['base','node','../../mods/b']
});

