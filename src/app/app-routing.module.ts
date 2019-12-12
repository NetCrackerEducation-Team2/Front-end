import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookListComponent} from './components/book-list/book-list.component';
import {SearchBooksComponent} from './components/search-books/search-books.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/account/profile/profile.component';
import {EditComponent} from './components/account/edit/edit.component';
import {ChangePasswordComponent} from './components/account/change-password/change-password.component';
import {AddAnnouncementComponent} from './components/add-announcement/add-announcement.component';
import {LogoutComponent} from './components/logout/logout.component';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {RecoverComponent} from './components/recover-password/recover/recover.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {AddBookReviewComponent} from './components/add-book-review/add-book-review.component';
import {BarRatingModule} from 'ngx-bar-rating';
import {SuggestBookComponent} from './components/suggest-book/suggest-book.component';
import {AnnouncementItemComponent} from './components/announcement-item/announcement-item.component';
import {AnnouncementListComponent} from './components/announcement-list/announcement-list.component';
import {AnnouncementsManagementComponent} from './components/announcements-management/announcements-management.component';
import {CreateBookComponent} from './components/create-book/create-book.component';
import {CreateAnnouncementComponent} from './components/create-announcement/create-announcement.component';
import {ActivateAccountComponent} from './components/activate-account/activate-account.component';
import {OverviewListComponent} from './components/overview-list/overview-list.component';
import {CreateAdminModeratorComponent} from './components/admin/create-admin-moderator/create-admin-moderator.component';
import {EditAdminModeratorComponent} from './components/admin/edit-admin-moderator/edit-admin-moderator.component';
import {DeleteAdminModeratorComponent} from './components/admin/delete-admin-moderator/delete-admin-moderator.component';
import {BookProfileComponent} from './components/book-profile/book-profile.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {AdminActivateGuardService} from './service/admin-activate-guard.service';
import {UserActivateGuardService} from './service/user-activate-guard.service';
import {ModerAnnouncementsActivateGuardService} from './service/moder-announcements-activate-guard.service';
import {ModerOverviewsActivateGuardService} from './service/moder-overviews-activate-guard.service';
import {ModerReviewsActivateGuardService} from './service/moder-reviews-activate-guard.service';
import {ChatComponent} from './components/chat/chat.component';
import {ActivityListComponent} from './components/activity-list/activity-list.component';
import {SearchUsersComponent} from './components/search-users/search-users.component';
import {NotificationListComponent} from './components/notification/notification-list/notification-list.component';
import {PersonalBooklistComponent} from './components/personal-booklist/personal-booklist.component';
import {RecommendationsComponent} from './components/recommendations/recommendations.component';
import {Message} from './models/message';
import {MessageComponent} from './components/message/message.component';
import {MessageGroupComponent} from './components/message-group/message-group.component';
import {OverviewsManagementComponent} from './components/overviews-management/overviews-management.component';
import {ReviewsManagementComponent} from './components/reviews-management/reviews-management.component';
import {AdminComponent} from './components/admin/admin.component';
import {CreateAchievementComponent} from './components/create-achievement/create-achievement.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'book-list',
    component: BookListComponent
  },
  {
    path: 'recommendations',
    component: RecommendationsComponent
  },
  {
    path: 'recommendations/:slug',
    redirectTo: 'book-overview/:slug'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'book-search',
    component: SearchBooksComponent
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [UserActivateGuardService]

  },
  {
    path: 'profile/:userId/edit',
    component: EditComponent,
    canActivate: [UserActivateGuardService]

  },
  {
    path: 'message/:friendId',
    component: MessageComponent
  },
  {
    path: 'message/groupChat/:chatName',
    component: MessageGroupComponent
  },
  {
    path: 'profile/:userId/change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'profile/:userId/chat',
    component: ChatComponent
  },
  {
    path: 'announcements',
    component: AnnouncementListComponent
  },
  {
    path: 'notifications',
    component: NotificationListComponent
  },
  {
    path: 'announcements/add',
    component: AddAnnouncementComponent
  },
  {
    path: 'announcements/:id',
    component: AnnouncementItemComponent
  },
  {
    path: 'activate/:code',
    component: ActivateAccountComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'book/suggest',
    component: SuggestBookComponent,
    canActivate: [UserActivateGuardService]

  },
  {
    path: 'book/slug/:slug',
    component: BookProfileComponent
  },
  {
    path: 'book/id/:id',
    component: BookProfileComponent
  },
  {
    path: 'recover',
    component: RecoverPasswordComponent
  },
  {
    path: 'recover/:link',
    component: RecoverComponent
  },
  {
    path: 'book-overview/:slug',
    component: BookOverviewComponent
  },
  {
    path: 'review/add/:bookId',
    component: AddBookReviewComponent
  },
  {
    path: 'announcements-management',
    component: AnnouncementsManagementComponent,
    canActivate: [ModerAnnouncementsActivateGuardService]

  },
  {
    path: 'overviews-management',
    component: OverviewsManagementComponent,
    canActivate: [ModerOverviewsActivateGuardService]

  },
  {
    path: 'reviews-management',
    component: ReviewsManagementComponent,
    canActivate: [ModerReviewsActivateGuardService]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'create-admin-moderator', component: CreateAdminModeratorComponent},
      {path: 'edit-admin-moderator', component: EditAdminModeratorComponent},
      {path: 'delete-admin-moderator', component: DeleteAdminModeratorComponent},
      {path: 'create-achievement', component: CreateAchievementComponent},
    ],
    canActivate: [AdminActivateGuardService]
  },
  {
    path: 'create-book',
    component: CreateBookComponent,
    canActivate: [UserActivateGuardService]

  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [UserActivateGuardService]

  },
  {
    path: 'create-announcement',
    component: CreateAnnouncementComponent,
    canActivate: [AdminActivateGuardService]
  },
  {
    path: 'create-book',
    component: CreateBookComponent
  },
  {
    path: 'create-announcement',
    component: CreateAnnouncementComponent
  },
  {
    path: 'book-overviews/:bookId',
    component: OverviewListComponent
  },
  {
    path: 'activities',
    component: ActivityListComponent
  },
  {
    path: 'search-users',
    component: SearchUsersComponent,
    canActivate: [UserActivateGuardService]

  },
  {
    path: 'personal-list',
    component: PersonalBooklistComponent,
    // canActivate: [UserActivateGuardService]

  },
  // routing to NotFoundComponent must be in the end
  {
    path: '**',
    component: NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes), BarRatingModule],
  providers: [AdminActivateGuardService],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
