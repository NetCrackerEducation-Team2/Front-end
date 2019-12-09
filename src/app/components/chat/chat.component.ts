import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../service/socket.service';
import {User} from '../../models/user';
import {AccountService} from '../../service/account.service';
import {FriendService} from '../../service/friend.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ChatService} from '../../service/chat.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  isError = false;
  // form: FormGroup;
  chatName: string;
  usersId: number;

  constructor(private socketService: SocketService,
              private accountService: AccountService,
              private friendsService: FriendService,
              private chatService: ChatService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.findUsersById();
    this.isLoaded = true;
    // this.form = new FormGroup({
    //   nameChat: new FormControl(null, [Validators.required])
    // });
  }

  getCurrentUser() {
    const currentUser = this.accountService.getCurrentUser();
    this.fullName = currentUser.fullName;
    this.email = currentUser.email;
    this.userCurrentId = currentUser.userId;
  }

  findUsersById() {
    this.friendsService.getFriends(this.userCurrentId).subscribe(res => this.users = res);
  }

  createChat(friendId: number) {
    this.isError = false;
    this.chatService.createChat(friendId, this.userCurrentId).subscribe(
      () => {
        this.router.navigate(['/message', friendId]);
      }, (error: HttpErrorResponse) => {
        this.isError = true;
      }
    );
  }
  createGroupChat(usersId: number) {
    console.log(this.chatName);
    // if (this.form.valid) {
    //   console.log(this.form.value.nameChat);
    // }


  }
}
