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
import { AnnouncementItemComponent } from './components/announcement-item/announcement-item.component';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import {ActivateAccountComponent} from './components/activate-account/activate-account.component';
import {LogoutComponent} from './components/logout/logout.component';
import {BookItemComponent} from "./components/book-item/book-item.component";

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
    path: '**',
    component: NotFoundComponent
  },
  {
    path: 'book/:id',
    component: BookItemComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
