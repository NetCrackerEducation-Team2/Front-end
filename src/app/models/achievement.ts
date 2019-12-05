import {TableName} from './constants/table-name';

export interface Achievement {
  achievementId: number;
  name: string;
  sqlQuery: string;
  tableName: TableName;
  description: string;
}
