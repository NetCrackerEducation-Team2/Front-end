import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule, MatInputModule, MatExpansionModule} from '@angular/material';
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
import {SuggestBookComponent} from './components/suggest-book/suggest-book.component';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/account/profile/profile.component';
import {MatDividerModule} from '@angular/material/divider';
import {EditComponent} from './components/account/edit/edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {AchievementsComponent} from './components/account/achievements/achievements.component';
import {AnnouncementItemComponent} from './components/announcement-item/announcement-item.component';
import {AnnouncementListComponent} from './components/announcement-list/announcement-list.component';
import {AdminComponent} from './components/admin/admin.component';
import {ReviewsManagementComponent} from './components/reviews-management/reviews-management.component';
import {BooksManagementComponent} from './components/books-management/books-management.component';
import {AnnouncementsManagementComponent} from './components/announcements-management/announcements-management.component';
import {ChangePasswordComponent} from './components/account/change-password/change-password.component';
import {MatPaginatorModule} from '@angular/material';
import {ActivateAccountComponent} from './components/activate-account/activate-account.component';
import {TokenInterceptorService} from './service/token-interceptor.service';
import {ListItemComponent} from './components/presentational/list-item/list-item.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AddAnnouncementComponent} from './components/add-announcement/add-announcement.component';
import {LogoutComponent} from './components/logout/logout.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {RecoverComponent} from './components/recover-password/recover/recover.component';
import {AddBookReviewComponent} from './components/add-book-review/add-book-review.component';
import {RatingModule} from 'ng-starrating';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgOptionHighlightModule} from '@ng-select/ng-option-highlight';
import {CommonModule} from '@angular/common';
import {OverviewListComponent} from './components/overview-list/overview-list.component';
import {OverviewItemComponent} from './components/overview-item/overview-item.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state/app.state';
import {CreateAdminModeratorComponent} from './components/create-admin-moderator/create-admin-moderator.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {CreateBookComponent} from './components/create-book/create-book.component';
import {CreateAnnouncementComponent} from "./components/create-announcement/create-announcement.component";
import {BookProfileComponent} from "./components/book-profile/book-profile.component";
import { PersonalBooklistComponent } from './components/personal-booklist/personal-booklist.component';
import { PersonalBookItemComponent } from './components/personal-book-item/personal-book-item.component';

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
    ActivateAccountComponent,
    ListItemComponent,
    AddAnnouncementComponent,
    LogoutComponent,
    BookOverviewComponent,
    RecoverPasswordComponent,
    RecoverComponent,
    AddBookReviewComponent,
    SuggestBookComponent,
    AdminComponent,
    ReviewsManagementComponent,
    BooksManagementComponent,
    AnnouncementsManagementComponent,
    ActivateAccountComponent,
    OverviewListComponent,
    OverviewItemComponent,
    CreateAdminModeratorComponent,
    TabsComponent,
    CreateBookComponent,
    CreateAnnouncementComponent,
    BookProfileComponent,
    PersonalBooklistComponent,
    PersonalBookItemComponent
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
    MatTabsModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    RatingModule,
    MatInputModule,
    NgSelectModule,
    NgOptionHighlightModule,
    CommonModule,
    StoreModule.forRoot(reducers)
  ],
  exports: [
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
