/* global describe, it, beforeEach */
'use strict';
var assert = require('assert');


describe('typescript project', function () {
	/**
	 * Test 1: Project is successfully compiled, and can be imported.
	 */
	it('can be imported without blowing up', function () {
	  var app = require('../<%= tsDest %>');
	  assert(app !== undefined);
	});
});