import {SafeUrl} from '@angular/platform-browser';
import {ContentInfo} from './content-info';
import {ButtonInfo} from './button-info';

export interface ListItemInfo {
  title: string;
  subtitle: string;
  photo: SafeUrl;
  itemId: number;
  publish: boolean;
  contentElements: ContentInfo[];
  actionElements: ButtonInfo[];
  listItemCallback: Function[];
  additionalParams: Map<string, any>;
}
