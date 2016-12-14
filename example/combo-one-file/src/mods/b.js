// b.js
KISSY.add(function (S,require,exports,module) {
	S.log('b');
	var C = require('./c');
	var D = require('./d');
	return 'b';
});
