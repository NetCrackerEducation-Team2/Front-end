import {User} from './user';

export class FullNotification {
  notificationId: number;
  notificationObject: {
    notificationObjectId: number;
    notificationType: {
      notificationTypeId: number;
      notificationTypeName: string;
    };
    entityId: number;
    notificationMessage: {
      notificationMessageId: number;
      notificationMessageText: string;
    };
    creationTime: string;
    user: User;
    isRead: boolean;
    sendAll: boolean;
  };
  notifierId: number;
  isRead: boolean;
}
