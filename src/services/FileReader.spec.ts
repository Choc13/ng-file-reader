import {FileReaderService} from './FileReader';
import {ngFileReaderModule} from '../Main';

describe('services', () => {
    describe(FileReaderService.ngName, () => {

        let fileMock: File;
        let fileReaderService: FileReaderService;
        let fileReaderMock: FileReader;
        let $logMock: ng.ILogService;
        let $q: ng.IQService;
        let $rootScope: ng.IRootScopeService;
        let $windowMock: ng.IWindowService;

        beforeEach(() => {
            angular.mock.module(ngFileReaderModule.name);
            angular.mock.inject((_$q_: ng.IQService, _$rootScope_: ng.IRootScopeService) => {
                $q = _$q_;
                $rootScope = _$rootScope_;
            });
            fileMock = {
                lastModifiedDate: new Date(),
                msClose: angular.noop,
                msDetachStream: angular.noop,
                name: 'Test',
                size: 0,
                slice: undefined,
                type: 'txt'
            };
            fileReaderMock = jasmine.createSpyObj('FileReader', ['readAsArrayBuffer', 'readAsDataURL', 'readAsText']);
            $logMock = jasmine.createSpyObj('$log', ['warn']);
            $windowMock = jasmine.createSpyObj('$window', ['FileReader']);
            (($windowMock as any).FileReader as jasmine.Spy).and.returnValue(fileReaderMock);
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

        describe('readAsBufferArray', () => {

            it('Should call FileReader.readAsBufferArray', () => {
                fileReaderService.readAsArrayBuffer(fileMock);
                expect(fileReaderMock.readAsArrayBuffer).toHaveBeenCalledWith(fileMock);
            });
        });

        describe('readAsDataUrl', () => {

            it('Should call FileReader.readAsDataUrl', () => {
                fileReaderService.readAsDataUrl(fileMock);
                expect(fileReaderMock.readAsDataURL).toHaveBeenCalledWith(fileMock);
            });
        });

        describe('readAsText', () => {

            it('Should call FileReader.readAsText', () => {
                const encoding: string = 'UTF-8';
                fileReaderService.readAsText(fileMock, encoding);
                expect(fileReaderMock.readAsText).toHaveBeenCalledWith(fileMock, encoding);
            });
        });
    });
});
