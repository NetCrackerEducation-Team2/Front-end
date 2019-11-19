import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookListComponent} from './components/book-list/book-list.component';
import {SearchBooksComponent} from './components/search-books/search-books.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/account/profile/profile.component';
import {EditComponent} from './components/account/edit/edit.component';
import {ChangePasswordComponent} from './components/account/change-password/change-password.component';
import {LogoutComponent} from './components/logout/logout.component';
import {BookItemComponent} from './components/book-item/book-item.component';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {RecoverComponent} from './components/recover-password/recover/recover.component';
import {AnnouncementItemComponent } from './components/announcement-item/announcement-item.component';
import {AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import {AnnouncementsManagementComponent } from './components/announcements-management/announcements-management.component';
import {BooksManagementComponent } from './components/books-management/books-management.component';
import {ReviewsManagementComponent } from './components/reviews-management/reviews-management.component';
import {AdminComponent } from './components/admin/admin.component';
import {CreateBookComponent} from './components/create-book/create-book.component';
import {CreateAnnouncementComponent} from './components/create-announcement/create-announcement.component';
import {ActivateAccountComponent} from './components/activate-account/activate-account.component';
import {OverviewListComponent} from './components/overview-list/overview-list.component';
import {CreateAdminModeratorComponent} from './components/create-admin-moderator/create-admin-moderator.component';

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
    path: 'book/:id',
    component: BookItemComponent
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
    path: 'announcements-management',
    component: AnnouncementsManagementComponent
  },
  {
    path: 'books-management',
    component: BooksManagementComponent
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
  // routing to NotFoundComponent must be in the end
  {
    path: '**',
    component: NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
