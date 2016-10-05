var assert = require('assert');
var file = require('vinyl');
var path = require('path');
var soy = require('../');

var input = new file({
  contents: new Buffer([
    '{namespace _}',
    '{template .example}',
    '  Hello {call person.getName/}.',
    '{/template}'
  ].join('\n')),
  path: 'input.soy'
});

var output = [
  'var _ = exports = module.exports = {};;',
  ';;',
  'var soy = function (soy) {',
  '    soy = require(\'soyutils/soy.js\');',
  '    return soy;',
  '}(soy);;',
  'var soydata = function (soydata) {',
  '    soydata = require(\'soyutils/soydata.js\');',
  '    return soydata;',
  '}(soydata);;',
  'var person = function (person) {',
  '    person = require(\'./fake_path_for_test/person.js\');',
  '    return person;',
  '}(person);;',
  '_.example = function (opt_data, opt_ignored) {',
  '    return soydata.VERY_UNSAFE.ordainSanitizedHtml(\'Hello \' + soy.$$escapeHtml(person.getName(null)) + \'.\');',
  '};',
  'if (true) {',
  '    _.example.soyTemplateName = \'_.example\';',
  '}',
].join('\n')

var plugin = soy({
  root: './fake_path_for_test/'
});

plugin.once('data', function(file) {
  assert.equal(path.basename(file.path), 'input.js');
  assert.equal(file.contents.toString().trim(), output);
  console.log('Tests passed!');
});

plugin.write(input);