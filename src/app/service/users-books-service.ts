import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogService} from './logging/log.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersBooksService {

  constructor(private http: HttpClient,
              private logger: LogService) {
  }

}
