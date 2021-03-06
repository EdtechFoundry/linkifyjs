define('linkify/utils/options', ['exports'], function (exports) {
	'use strict';

	exports.__esModule = true;
	function noop(val) {
		return val;
	}

	function typeToTarget(href, type) {
		return type === 'url' ? '_blank' : null;
	}

	function normalize(opts) {
		opts = opts || {};
		var newLine = opts.newLine || false; // deprecated
		return {
			attributes: opts.linkAttributes || null,
			defaultProtocol: opts.defaultProtocol || 'http',
			events: opts.events || null,
			format: opts.format || noop,
			formatHref: opts.formatHref || noop,
			newLine: opts.newLine || false, // deprecated
			nl2br: !!newLine || opts.nl2br || false,
			tagName: opts.tagName || 'a',
			target: opts.target || typeToTarget,
			linkClass: opts.linkClass || 'linkified'
		};
	}

	function resolve(value) {
		for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			params[_key - 1] = arguments[_key];
		}

		return typeof value === 'function' ? value.apply(undefined, params) : value;
	}

	exports.normalize = normalize;
	exports.resolve = resolve;
});