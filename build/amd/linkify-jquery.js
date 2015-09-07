define('linkify-jquery', ['exports', 'module', 'jquery', './linkify-element'], function (exports, module, _jquery, _linkifyElement) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jQuery = _interopRequireDefault(_jquery);

	var _linkifyElement2 = _interopRequireDefault(_linkifyElement);

	var doc = undefined;

	try {
		doc = document;
	} catch (e) {
		doc = null;
	}

	// Applies the plugin to jQuery
	function apply($) {
		var doc = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		$.fn = $.fn || {};

		try {
			doc = doc || window && window.document || global && global.document;
		} catch (e) {/* do nothing for now */}

		if (!doc) {
			throw new Error('Cannot find document implementation. ' + 'If you are in a non-browser environment like Node.js, ' + 'pass the document implementation as the third argument to linkifyElement.');
		}

		if (typeof $.fn.linkify === 'function') {
			// Already applied
			return;
		}

		function jqLinkify(opts) {
			opts = _linkifyElement2['default'].normalize(opts);
			return this.each(function () {
				_linkifyElement2['default'].helper(this, opts, doc);
			});
		}

		$.fn.linkify = jqLinkify;

		$(doc).ready(function () {
			$('[data-linkify]').each(function () {

				var $this = $(this),
				    data = $this.data(),
				    target = data.linkify,
				    nl2br = data.linkifyNlbr,
				    options = {
					linkAttributes: data.linkifyAttributes,
					defaultProtocol: data.linkifyDefaultProtocol,
					events: data.linkifyEvents,
					format: data.linkifyFormat,
					formatHref: data.linkifyFormatHref,
					newLine: data.linkifyNewline, // deprecated
					nl2br: !!nl2br && nl2br !== 0 && nl2br !== 'false',
					tagName: data.linkifyTagname,
					target: data.linkifyTarget,
					linkClass: data.linkifyLinkclass
				};
				var $target = target === 'this' ? $this : $this.find(target);
				$target.linkify(options);
			});
		});
	}

	// Apply it right away if possible
	if (typeof _jQuery['default'] !== 'undefined' && doc) {
		apply(_jQuery['default'], doc);
	}

	module.exports = apply;
});