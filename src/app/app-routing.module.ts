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
import {AnnouncementItemComponent } from './components/announcement-item/announcement-item.component';
import {AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import {AnnouncementsManagementComponent } from './components/announcements-management/announcements-management.component';
import {BooksManagementComponent } from './components/books-management/books-management.component';
import {ReviewsManagementComponent } from './components/reviews-management/reviews-management.component';
import {AdminComponent } from './components/admin/admin.component';
import {SuperAdminComponent } from './components/super-admin/super-admin.component';
import {CreateAdminComponent } from './components/create-admin/create-admin.component';
import {CreateModeratorComponent } from './components/create-moderator/create-moderator.component';
import {CreateBookComponent} from './components/create-book/create-book.component';
import {CreateAnnouncementComponent} from './components/create-announcement/create-announcement.component';

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
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/edit',
    component: EditComponent
  },
  {
    path: 'profile/change-password',
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
    path: '404',
    component: NotFoundComponent
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
     component: AdminComponent
  },
  {
     path: 'super-admin',
     component: SuperAdminComponent
  }
  ,
  {
     path: 'create-moderator',
     component: CreateModeratorComponent
  }
  ,
  {
     path: 'create-admin',
     component: CreateAdminComponent
  }
  ,
  {
     path: 'create-book',
     component: CreateBookComponent
  }
  ,
  {
     path: 'create-announcement',
     component: CreateAnnouncementComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
