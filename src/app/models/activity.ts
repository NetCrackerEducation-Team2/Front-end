export class Activity {
  activityId: number;
  name: string;
  description: string;
  userId: number;
  creationTime: string;

  constructor(activityId: number, name: string, description: string, userId: number, creationTime: string) {
    this.activityId = activityId;
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.creationTime = creationTime;
  }
}
