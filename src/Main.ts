import * as angular from 'angular';

import {FileReaderService} from './services/FileReader';

export const ngFileReaderModule: ng.IModule = angular.module('ngFileReader', [])
    .service(FileReaderService.ngName, FileReaderService);
