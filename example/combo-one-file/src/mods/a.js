// a.js
KISSY.add(function (S,require,exports,module) {
	S.log('a');

	var B = require('./b');

	module.exports = {
		ok:B
	};
});
