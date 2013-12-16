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
KISSY.add('xcake/mods/b',function (S) {
	S.log('b');
	return {};
}, {
	requires: ['base','node','./c','./d']
});

// list.js
KISSY.add('xcake/pages/home/list',function (S) {
	var List = {};
	return List;
}, {
	requires: ['base','node','../../mods/b']
});

