import {ContentInfo} from './content-info';
import {ButtonInfo} from './button-info';

export interface ListItemInfo {
  title: string;
  subtitle: string;
  photoPath: string;
  publish: boolean;
  contentElements: ContentInfo[];
  actionElements: ButtonInfo[];
  listItemCallback: Function[];
  additionalParams: Map<string, any>;
}
