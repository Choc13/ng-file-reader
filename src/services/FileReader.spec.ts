import {FileReaderService} from './FileReader';
import {ngFileReaderModule} from '../Main';

describe('services', () => {
    describe(FileReaderService.ngName, () => {

        let fileReaderService: FileReaderService;
        let fileReaderMock: FileReader;
        let $logMock: ng.ILogService;
        let $q: ng.IQService;
        let $rootScope: ng.IRootScopeService;
        let $windowMock: ng.IWindowService;

        beforeEach(() => {
            angular.mock.module(ngFileReaderModule.name);
            angular.mock.inject((_$q_: ng.IQService, _$rootScope_: ng.IRootScopeService) => {
                $q = $q;
                $rootScope = _$rootScope_;
            });
            fileReaderMock = jasmine.createSpyObj('FileReader', ['readAsArrayBuffer', 'readAsDataUrl', 'readAsText']);
            $logMock = jasmine.createSpyObj('$log', ['warn']);
            $windowMock = jasmine.createSpyObj('$window', ['']);
            ($windowMock as any).FileReader = fileReaderMock;
            fileReaderService = new FileReaderService($q, $windowMock, $logMock);
        });

        it('Should have an ngName', () => {
            expect(FileReaderService.ngName).toBeDefined();
        });

        it('Should be registered with angular', () => {
            angular.mock.inject((ngFileReader: FileReaderService) => {
                expect(ngFileReader).toBeDefined();
            });
        });

        it('Should throw an error if the FileReader API is not available', () => {
            ($windowMock as any).FileReader = undefined;
            expect(() => new FileReaderService($q, $windowMock, $logMock)).toThrowError();
        });
    });
});
