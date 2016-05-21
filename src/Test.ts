import '../dist/ng-file-reader.min.js';
import 'angular-mocks';

// Require all .ts files in the test directory
const testsContext: __WebpackModuleApi.RequireContext = require.context('.', true, /.ts$/);
testsContext.keys().forEach(testsContext);
