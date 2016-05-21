export interface IFileReader {

    readAsArrayBuffer(file: File | Blob, progressCallback?: (progress: number) => void): ng.IPromise<ArrayBuffer>;

    readAsDataUrl(file: File | Blob, progressCallback?: (progress: number) => void): ng.IPromise<string>;

    readAsText(file: File | Blob, encoding?: string, progressCallback?: (progress: number) => void): ng.IPromise<string>;
}
