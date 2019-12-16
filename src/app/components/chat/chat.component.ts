import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../service/socket.service';
import {User} from '../../models/user';
import {AccountService} from '../../service/account.service';
import {FriendService} from '../../service/friend.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ChatService} from '../../service/chat.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  isError = false;
  chatName: string;
  usersId: number[];

  constructor(private socketService: SocketService,
              private accountService: AccountService,
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
    this.router.navigate(['/message/groupChat', chatName]);
  }

  getGroupsChat() {
    this.chatService.getGroupChats(this.userCurrentId).subscribe(res => {this.chats = res; });
  }

  createChat(friendId: number) {
    this.isError = false;
    if (friendId === 0) {
      this.isError = true;
    } else {
      this.chatService.createChat(friendId, this.userCurrentId).subscribe(
        () => {
          this.router.navigate(['/message', friendId]);
        }, (error: HttpErrorResponse) => {
          this.isError = true;
        }
      );
    }
  }
  createGroupChat(usersId: number[]) {
    this.isError = false;
    usersId.push(this.userCurrentId);
    if (this.chatName == null) {
      this.isError = true;
    } else {
      this.chatService.createGroupChat(usersId, this.chatName).subscribe(
        () => {
          this.router.navigate(['/message/groupChat', this.chatName]);
        }, (error: HttpErrorResponse) => {
          this.isError = true;
        }
      );
    }
  }
}
