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
KISSY.add('xcake/mods/b',function (S) {
	S.log('b');
	return {};
}, {
	requires: ['base','node','./c','./d']
});

// a.js
KISSY.add('xcake/mods/a',function (S) {
	S.log('a');
	return {};
}, {
	requires: ['base','node','./b']
});

// index.js
KISSY.add('xcake/pages/home/index',function (S) {
	"use strict";
	function X(id,cfg) {
		if (this instanceof X) {
			this.con = S.one(id);
			X.superclass.constructor.call(this, cfg);
			this.init();

		} else {
			return new X(id,cfg);
		}
	}

	// ATTR Example
	X.ATTRS = {
		a: {
			setter: function(){},
			getter: function(){},
			value: 1
		}
	};

	S.extend(X, S.Base, {
		init: function() {
			// your code here
		},
		destory: function(){
		}
	});

	return X;
}, {
	requires: ['base','node','../../mods/a']
});

