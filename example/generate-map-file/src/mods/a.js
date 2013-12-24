// a.js
KISSY.add(function (S) {
	S.log('a');
	return {};
}, {
	requires: ['base','node','./b']
});
