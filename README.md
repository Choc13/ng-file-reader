# ng-file-reader
An angular wrapper around the JavaScript [FileReader API](https://developer.mozilla.org/en/docs/Web/API/FileReader)

[![Build Status](https://travis-ci.org/Choc13/ng-file-reader.svg?branch=master)](https://travis-ci.org/Choc13/ng-file-reader)
[![npm Version](https://badge.fury.io/js/ng-file-reader.svg)](https://badge.fury.io/js/ng-file-reader)
[![npm Downloads](https://img.shields.io/npm/dm/badges.svg)](https://npmjs.org/package/badges)
[![npm Dependencies](https://img.shields.io/david/bevry/badges.svg)](https://david-dm.org/bevry/badges)
[![npm Dev Dependencies](https://img.shields.io/david/dev/bevry/badges.svg)](https://david-dm.org/bevry/badges#info=devDependencies)

## Installation

### NPM
`npm install ng-file-reader`

## Usage
1. Include the script in your project using whatever method your project uses. For example:

    * Require it
    ```js
    require('ng-file-reader');
    ```

    * Import it
    ```ts
    import 'ng-file-reader';
    ```

    * Or go old school and load it in your `index.html`
    ```html
    <script type="text/javascript" src="node_modules/ng-file-reader/ng-file-reader.min.js"></script>
    ```

2. Add it as an angular dependency

    ```js
    angular.module('myapp', ['ngFileReader']);
    ```

3. Inject `ngFileReader` into your controllers or services and use it like so:

    ```js
    MyController.$inject = ['ngFileReader'];
    function MyController(ngFileReader) {
        
        let vm = this;
        
        ngFileReader.readAsArrayBuffer(file, (progress) => console.log(`${progress}% complete`)
            .then((buffer) => {vm.buffer = buffer});
    }
    ```

## API
### FileReaderService

### Methods

```js
readAsArrayBuffer(file: File | Blob, progressCallback?: (progress: numer) => void): ng.IPromise<ArrayBuffer>
```

```js
readAsDataUrl(file: File | Blob, progressCallback?: (progress: number) => void): ng.IPromise<string>
```

```js
readAsText(file: File | Blob, encoding?: string, progressCallback?: (progress: number) => void): ng.IPromise<string>
```
