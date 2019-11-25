import {Observable} from 'rxjs';

export interface ButtonInfo {
  buttonInfoId: number;
  name: string;
  url: string;
  disabled: boolean;
  // color: string;
  clickFunction: () => void;
}
