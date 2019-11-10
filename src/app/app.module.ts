import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule, MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';


import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookItemComponent} from './components/book-item/book-item.component';
import {SearchBooksComponent} from './components/search-books/search-books.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/account/profile/profile.component';
import {MatDividerModule} from '@angular/material/divider';
import {EditComponent} from './components/account/edit/edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AchievementsComponent } from './components/account/achievements/achievements.component';
import { AnnouncementItemComponent } from './components/announcement-item/announcement-item.component';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { ReviewsManagementComponent } from './components/reviews-management/reviews-management.component';
import { BooksManagementComponent } from './components/books-management/books-management.component';
import { AnnouncementsManagementComponent } from './components/announcements-management/announcements-management.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { CreateModeratorComponent } from './components/create-moderator/create-moderator.component';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { CreateAnnouncementComponent } from './components/create-announcement/create-announcement.component';
import {ChangePasswordComponent} from './components/account/change-password/change-password.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ActivateAccountComponent} from './components/activate-account/activate-account.component';
import {TokenInterceptorService} from './service/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BookListComponent,
    BookItemComponent,
    SearchBooksComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditComponent,
    ChangePasswordComponent,
    AchievementsComponent,
    AnnouncementItemComponent,
    AnnouncementListComponent,
    AdminComponent,
    SuperAdminComponent,
    ReviewsManagementComponent,
    BooksManagementComponent,
    AnnouncementsManagementComponent,
    CreateBookComponent,
    CreateModeratorComponent,
    CreateAdminComponent,
    CreateAnnouncementComponent,
    ActivateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
