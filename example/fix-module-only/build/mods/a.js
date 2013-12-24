// a.js
KISSY.add('xcake/mods/a',function (S) {
	S.log('a');
	return {};
}, {
	requires: ['base','node','./b']
});
