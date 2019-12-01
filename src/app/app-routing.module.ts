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
import {ActivateAccountComponent} from './components/activate-account/activate-account.component';
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
import {ReviewsManagementComponent} from './components/reviews-management/reviews-management.component';
import {AdminComponent} from './components/admin/admin.component';
import {OverviewsManagementComponent} from './components/overviews-management/overviews-management.component';
import {CreateBookComponent} from './components/create-book/create-book.component';
import {CreateAnnouncementComponent} from './components/create-announcement/create-announcement.component';
import {OverviewListComponent} from './components/overview-list/overview-list.component';
import {CreateAdminModeratorComponent} from './components/create-admin-moderator/create-admin-moderator.component';
import {BookProfileComponent} from './components/book-profile/book-profile.component';
import {ActivityListComponent} from './components/activity-list/activity-list.component';
import {SearchUsersComponent} from './components/search-users/search-users.component';
import {NotificationListComponent} from './components/notification/notification-list/notification-list.component';
import {PersonalBooklistComponent} from './components/personal-booklist/personal-booklist.component';
import {RecommendationsComponent} from './components/recommendations/recommendations.component';

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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'book-search',
    component: SearchBooksComponent
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent
  },
  {
    path: 'profile/:userId/edit',
    component: EditComponent
  },
  {
    path: 'profile/:userId/change-password',
    component: ChangePasswordComponent
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
    component: SuggestBookComponent
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
    component: AnnouncementsManagementComponent
  },
  {
    path: 'overviews-management',
    component: OverviewsManagementComponent
  },
  {
    path: 'reviews-management',
    component: ReviewsManagementComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'create-admin-moderator', component: CreateAdminModeratorComponent},
      // {path: 'edit-moderator', component: EditModeratorComponent},

    ]
  },
  {
    path: 'create-book',
    component: CreateBookComponent
  }
  ,
  {
    path: 'create-announcement',
    component: CreateAnnouncementComponent
  },  // routing to NotFoundComponent must be in the end
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
    component: SearchUsersComponent
  },
  {
    path: 'personal-list',
    component: PersonalBooklistComponent
  },
  // routing to NotFoundComponent must be in the end
  {
    path: '**',
    component: NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes), BarRatingModule],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
