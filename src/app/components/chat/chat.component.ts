import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {AccountService} from '../../service/account.service';
import {FriendService} from '../../service/friend.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ChatService} from '../../service/chat.service';
import {Router} from '@angular/router';
import {Chat} from '../../models/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  fullName: string;
  email: string;
  isLoaded = false;
  userCurrentId: number;
  userFriendId: number;
  users: User[] = [];
  chats: Chat[] = [];
  isErrorChooseGroup = false;
  isErrorCreate = false;
  chatName: string;
  chatGroupName: string;
  usersId: number[];

  constructor(private accountService: AccountService,
              private friendsService: FriendService,
              private chatService: ChatService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.findUsersById();
    this.getGroupsChat();
    this.isLoaded = true;
  }

  getCurrentUser() {
    const currentUser = this.accountService.getCurrentUser();
    this.fullName = currentUser.fullName;
    this.email = currentUser.email;
    this.userCurrentId = currentUser.userId;
  }

  findUsersById() {
    this.friendsService.getFriendsById(this.userCurrentId).subscribe(res => this.users = res);
  }

  chooseGroupChat(chatName: string) {
    this.isErrorChooseGroup = false;
    this.isErrorCreate = false;
    if (typeof chatName !== 'undefined') {
      this.router.navigate(['/message/groupChat', chatName]);
    } else {
      this.isErrorChooseGroup = true;
    }
  }

  getGroupsChat() {
    this.chatService.getGroupChats(this.userCurrentId).subscribe(res => {this.chats = res; });
  }

  createChat(friendId: number) {
    this.isErrorCreate = false;
    this.isErrorChooseGroup = false;
    if (typeof friendId === 'undefined') {
      this.isErrorCreate = true;
    } else {
      this.chatService.createChat(friendId, this.userCurrentId).subscribe(
        () => {
          this.router.navigate(['/message', friendId]);
        }, (error: HttpErrorResponse) => {
          this.isErrorCreate = false;
        }
      );
    }
  }

  createGroupChat(usersId: number[]) {
    this.isErrorChooseGroup = false;
    this.isErrorCreate = false;
    if (typeof usersId === 'undefined') {
      this.isErrorCreate = true;
    } else if (typeof this.chatName === 'undefined') {
      this.isErrorCreate = true;
    } else {
      usersId.push(this.userCurrentId);
      this.chatService.createGroupChat(usersId, this.chatName).subscribe(
        () => {
          this.router.navigate(['/message/groupChat', this.chatName]);
        }, (error: HttpErrorResponse) => {
        }
      );
    }
  }
}
