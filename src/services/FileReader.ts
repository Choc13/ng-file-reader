import {IFileReader} from './IFileReader';

export class FileReaderService implements IFileReader {

    public static ngName: string = 'ngFileReader';
    public static $inject: Array<string> = ['$q', '$window'];

    private $log: ng.ILogService;
    private $q: ng.IQService;
    private $window: ng.IWindowService;

    public constructor($q: ng.IQService, $window: ng.IWindowService, $log: ng.ILogService) {
        this.$q = $q;
        this.$window = $window;
        this.$log = $log;

        if (!($window as any).FileReader) {
            throw new Error('Browser does not support FileReader API');
        }
    }

    public readAsArrayBuffer(file: File | Blob, progressCallback?: (progress: number) => void): ng.IPromise<ArrayBuffer> {
        const deferred: ng.IDeferred<ArrayBuffer> = this.$q.defer<ArrayBuffer>();
        const fileReader: FileReader = this.createFileReader<ArrayBuffer>(deferred, progressCallback);
        fileReader.readAsArrayBuffer(file);
        return deferred.promise;
    }

    public readAsDataUrl(file: File | Blob, progressCallback?: (progress: number) => void): ng.IPromise<string> {
        const deferred: ng.IDeferred<string> = this.$q.defer<string>();
        const fileReader: FileReader = this.createFileReader<string>(deferred, progressCallback);
        fileReader.readAsDataURL(file);
        return deferred.promise;
    }

    public readAsText(file: File | Blob, encoding?: string, progressCallback?: (progress: number) => void): ng.IPromise<string> {
        const deferred: ng.IDeferred<string> = this.$q.defer<string>();
        const fileReader: FileReader = this.createFileReader<string>(deferred, progressCallback);
        fileReader.readAsText(file, encoding);
        return deferred.promise;
    }

    private createFileReader<T>(deferred: ng.IDeferred<T>, progressCallback?: (progress: number) => void): FileReader {
        const fileReader: FileReader = new (this.$window as any).FileReader();
        fileReader.onload = () => {
            deferred.resolve(fileReader.result);
        };
        fileReader.onerror = () => {
            deferred.reject(fileReader.error);
        };
        fileReader.onprogress = (event: ProgressEvent) => {
            if (progressCallback) {
                progressCallback(this.calculateProgress(event));
            }
        };
        return fileReader;
    }

    private calculateProgress(event: ProgressEvent): number {
        if (event.lengthComputable) {
            return (event.loaded / event.total) * 100;
        }
        return undefined;
    }
}
