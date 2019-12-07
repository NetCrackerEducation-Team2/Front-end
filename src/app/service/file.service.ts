import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from './error-handler.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {apiUrls} from '../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly fileDownloadUrl;
  private readonly fileImageUrl;

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,
              private errorHandlerService: ErrorHandlerService) {
    this.fileImageUrl = apiUrls.API_FILE_IMAGE;
    this.fileDownloadUrl = apiUrls.API_FILE_DOWNLOAD;
  }

  getImage(filePath: string) : Observable<SafeUrl>{
    if(!filePath) return of(null);
    return this.http.get(this.fileImageUrl + filePath, {responseType: 'text'})
      .pipe(map(photo => photo ? this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + photo) : null),
        catchError(this.errorHandlerService.handleError<any>('getImage', [])));
  }

  downloadFile(filePath: string) : Observable<any>{
    if(!filePath) return of(null);
    return this.http.get(this.fileDownloadUrl + filePath)
      .pipe(catchError(this.errorHandlerService.handleError<any>('downloadFile', [])));
  }
}
