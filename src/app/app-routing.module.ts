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
import {RecoverPasswordComponent} from "./components/recover-password/recover-password.component";
import {RecoverComponent} from "./components/recover-password/recover/recover.component";
import {BookOverviewComponent} from "./components/book-overview/book-overview.component";

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
    path: 'book-overview/:slag',
    component: BookOverviewComponent
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
