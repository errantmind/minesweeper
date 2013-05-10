var allsync = require("allsync");
var exec = require('child_process').exec;

task ('default', ['report']);

task ('clean', [], function() {
  jake.exec('/bin/rm -rf src-instrumented', function() {  });
  jake.exec('/bin/rm -rf covershot', function() { complete(); }, {printStdout: true});
}, true);

task ('instrument', ['clean'], function() {
  jake.exec('jscoverage src src-instrumented', function() { complete(); }, {printStdout: true});
}, true);

task ('test', ['instrument'], function() {
  jake.exec("buster test", function(data) { complete(); }, {printStdout: true});
}, true);

task ('report', ['test'], function() {
  jake.exec('~/node_modules/covershot/bin/covershot covershot/data -f html', function() { complete(); }, {printStdout: true});
},true);

