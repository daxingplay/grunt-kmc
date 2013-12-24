// b.js
KISSY.add(function (S) {
	S.log('b');
	return {};
}, {
	requires: ['base','node','./c','./d']
});
