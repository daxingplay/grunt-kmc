// b.js
KISSY.add('xcake/mods/b',function (S) {
	S.log('b');
	return {};
}, {
	requires: ['base','node','./c','./d']
});
