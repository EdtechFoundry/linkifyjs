var
linkify = require('../../lib/linkify');
// MultiToken = linkify.parser.TOKENS.Base;

var tokensTest = [
	'The string is the URL https://github.com/ but www.gihub.com/search?utf8=✓ works too with the email test@example.com the end.',
	['text', 'url', 'text', 'url', 'text', 'email', 'text'],
	[{
		type: 'url',
		value: 'https://github.com/',
		href: 'https://github.com/'
	}, {
		type: 'url',
		value: 'www.gihub.com/search?utf8=✓',
		href: 'http://www.gihub.com/search?utf8=✓'
	}, {
		type: 'email',
		value: 'test@example.com',
		href: 'mailto:test@example.com'
	}],
];

describe('linkify', function () {

	describe('tokenize', function () {
		it('is a function', function () {
			expect(linkify.tokenize).to.be.a('function');
		});
		it('takes a single argument', function () {
			expect(linkify.tokenize.length).to.be.eql(1);
		});
	});

	describe('find', function () {
		it('is a function', function () {
			expect(linkify.find).to.be.a('function');
		});
		it('takes a single argument', function () {
			expect(linkify.find.length).to.be.eql(1); // type is optional
		});
	});

	describe('test', function () {
		/*
			For each element,

			* [0] is the input string
			* [1] is the expected return value
			* [2] (optional) the type of link to look for
		*/
		var tests = [
			['Herp derp', false],
			['Herp derp', false, 'email'],
			['Herp derp', false, 'asdf'],
			['https://google.com/?q=yey', true],
			['https://google.com/?q=yey', true, 'url'],
			['https://google.com/?q=yey', false, 'email'],
			['test+4@uwaterloo.ca', true],
			['test+4@uwaterloo.ca', false, 'url'],
			['test+4@uwaterloo.ca', true, 'email'],
			['t.co', true],
			['t.co g.co', false], // can only be one
			['test@g.co t.co', false] // can only be one
		];

		it('is a function', function () {
			expect(linkify.test).to.be.a('function');
		});
		it('takes a single argument', function () {
			expect(linkify.test.length).to.be.eql(1); // type is optional
		});

		var test, testName;
		/* jshint loopfunc: true */
		for (var i = 0; i < tests.length; i++) {
			test = tests[i];
			testName = 'Correctly tests the string "' + test[0] + '"';
			testName += ' as `' + (test[1] ? 'true' : 'false') + '`';
			if (test[2]) {
				testName += ' (' + test[2] + ')';
			}
			testName += '.';

			it(testName, function () {
				expect(linkify.test(test[0], test[2])).to.be.eql(test[1]);
			});
		}
	});

	describe('options', function () {
		it('is an object', function () {
			expect(linkify.options).to.be.a('object');
		});
	});

	describe('parser', function () {
		it('is an object', function () {
			expect(linkify.parser).to.be.a('object');
		});
	});

	describe('scanner', function () {
		it('is an object', function () {
			expect(linkify.scanner).to.be.a('object');
		});
	});
});
