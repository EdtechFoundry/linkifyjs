define('linkify', ['exports', './linkify/utils/options', './linkify/core/scanner', './linkify/core/parser'], function (exports, _linkifyUtilsOptions, _linkifyCoreScanner, _linkifyCoreParser) {
	'use strict';

	exports.__esModule = true;

	if (!Array.isArray) {
		Array.isArray = function (arg) {
			return Object.prototype.toString.call(arg) === '[object Array]';
		};
	}

	/**
 	Converts a string into tokens that represent linkable and non-linkable bits
 	@method tokenize
 	@param {String} str
 	@return {Array} tokens
 */
	var tokenize = function tokenize(str) {
		return _linkifyCoreParser.run(_linkifyCoreScanner.run(str));
	};

	/**
 	Returns a list of linkable items in the given string.
 */
	var find = function find(str) {
		var type = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		var tokens = tokenize(str),
		    filtered = [];

		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].isLink && (!type || tokens[i].type === type)) {
				filtered.push(tokens[i].toObject());
			}
		}

		return filtered;
	};

	/**
 	Is the given string valid linkable text of some sort
 	Note that this does not trim the text for you.
 
 	Optionally pass in a second `type` param, which is the type of link to test
 	for.
 
 	For example,
 
 		test(str, 'email');
 
 	Will return `true` if str is a valid email.
 */
	var test = function test(str) {
		var type = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		var tokens = tokenize(str);
		return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].type === type);
	};

	// Scanner and parser provide states and tokens for the lexicographic stage
	// (will be used to add additional link types)
	exports.find = find;
	exports.options = _linkifyUtilsOptions;
	exports.parser = _linkifyCoreParser;
	exports.scanner = _linkifyCoreScanner;
	exports.test = test;
	exports.tokenize = tokenize;
});