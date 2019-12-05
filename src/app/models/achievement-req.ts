import {TableName} from './constants/table-name';
import {Verb} from './constants/verb';
import {Parameter} from './constants/parameter';

export class AchievementReq {
  name: string;
  verb: Verb;
  subject: TableName;
  count: number;
  description?: string;
  extraParams?: Map<Parameter, string[]> = new Map<Parameter, string[]>();
}
