import {BookReviewComponent} from './components/book-review/book-review.component';
import {BookReviewCommentComponent} from './components/book-review-comment/book-review-comment.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TooltipModule } from 'ng2-tooltip-directive';
import {
  MatBadgeModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
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
import {SearchBooksComponent} from './components/search-books/search-books.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {SuggestBookComponent} from './components/suggest-book/suggest-book.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/account/profile/profile.component';
import {MatDividerModule} from '@angular/material/divider';
import {EditComponent} from './components/account/edit/edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {OverviewsManagementComponent} from './components/overviews-management/overviews-management.component';
import {AnnouncementsManagementComponent} from './components/announcements-management/announcements-management.component';
import {CreateBookComponent} from './components/create-book/create-book.component';
import {CreateAnnouncementComponent} from './components/create-announcement/create-announcement.component';
import {AchievementsComponent} from './components/account/achievements/achievements.component';
import {AnnouncementItemComponent} from './components/announcement-item/announcement-item.component';
import {AnnouncementListComponent} from './components/announcement-list/announcement-list.component';
import {AdminComponent} from './components/admin/admin.component';
import {ReviewsManagementComponent} from './components/reviews-management/reviews-management.component';
import {ChangePasswordComponent} from './components/account/change-password/change-password.component';
import {ActivateAccountComponent} from './components/activate-account/activate-account.component';
import {TokenInterceptorService} from './service/token-interceptor.service';
import {ListItemComponent} from './components/presentational/list-item/list-item.component';
import {LogoutComponent} from './components/logout/logout.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {RecoverPasswordComponent} from './components/recover-password/recover-password.component';
import {RecoverComponent} from './components/recover-password/recover/recover.component';
import {OverviewListComponent} from './components/overview-list/overview-list.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state/app.state';
import {CreateAdminModeratorComponent} from './components/admin/create-admin-moderator/create-admin-moderator.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {EditAdminModeratorComponent} from './components/admin/edit-admin-moderator/edit-admin-moderator.component';
import {DeleteAdminModeratorComponent} from './components/admin/delete-admin-moderator/delete-admin-moderator.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {NotificationListComponent} from './components/notification/notification-list/notification-list.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {MatMenuModule} from '@angular/material/menu';
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {HttpErrorComponent} from './components/presentational/http-error/http-error.component';
import {MatSnackBarComponent} from './components/presentational/mat-snack-bar/mat-snack-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AddAnnouncementComponent} from './components/add-announcement/add-announcement.component';
import {AddBookReviewComponent} from './components/add-book-review/add-book-review.component';
import {RatingModule} from 'ng-starrating';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgOptionHighlightModule} from '@ng-select/ng-option-highlight';
import {CommonModule} from '@angular/common';
import {BookProfileComponent} from './components/book-profile/book-profile.component';
import {ChatComponent} from './components/chat/chat.component';
import {ActivityItemComponent} from './components/activity-item/activity-item.component';
import {ActivityListComponent} from './components/activity-list/activity-list.component';
import {SearchUsersComponent} from './components/search-users/search-users.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UserItemComponent} from './components/user-item/user-item.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RecommendationsComponent} from './components/recommendations/recommendations.component';
import {NotificationMenuComponent} from './components/notification/notification-menu/notification-menu.component';
import {ListItemPublishComponent} from './components/presentational/list-item-publish/list-item-publish.component';
import {MessageComponent} from './components/message/message.component';
import {MessageGroupComponent} from './components/message-group/message-group.component';
import {CreateAchievementComponent} from './components/create-achievement/create-achievement.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTreeModule} from '@angular/material/tree';
import {ShowHideComponent} from './components/shared/show-hide/show-hide.component';
import {OptionsScrollDirective} from './directives/options-scroll.directive';
import { MomentPipe } from './service/moment.pipe';
import { SelectorComponent } from './components/calendar/selector/selector.component';
import {RecaptchaModule} from 'ng-recaptcha';
import {UiSwitchModule} from 'ngx-ui-switch';
import {SettingsComponent} from './components/account/settings/settings.component';
import {DateAgoPipe} from './pipes/date-ago.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmDeleteFromFriendsDialog} from './components/user-item/confirm-delete-from-friends-dialog/confirm-delete-from-friends-dialog.component';
import {FriendRequestNotificationItemComponent} from './components/notification/notification-list/friend-request-notification-item/friend-request-notification-item.component';
import { SearchUserBooksComponent } from './components/search-user-books/search-user-books.component';
import {ValidationErrorMessageComponent} from './components/suggest-book/validation-error-message/validation-error-message.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {SettingsDialogComponent} from './components/account/profile/settigns-dialog/settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BookListComponent,
    SearchBooksComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SettingsComponent,
    EditComponent,
    ChangePasswordComponent,
    AchievementsComponent,
    AnnouncementItemComponent,
    AnnouncementListComponent,
    ActivateAccountComponent,
    ListItemComponent,
    LogoutComponent,
    BookOverviewComponent,
    RecoverPasswordComponent,
    RecoverComponent,
    AdminComponent,
    ReviewsManagementComponent,
    AnnouncementsManagementComponent,
    CreateBookComponent,
    CreateAnnouncementComponent,
    ActivateAccountComponent,
    OverviewListComponent,
    ActivateAccountComponent,
    ListItemComponent,
    AddAnnouncementComponent,
    LogoutComponent,
    BookOverviewComponent,
    RecoverPasswordComponent,
    RecoverComponent,
    BookReviewComponent,
    AddBookReviewComponent,
    SuggestBookComponent,
    AdminComponent,
    ReviewsManagementComponent,
    OverviewsManagementComponent,
    AnnouncementsManagementComponent,
    ActivateAccountComponent,
    OverviewListComponent,
    CreateAdminModeratorComponent,
    TabsComponent,
    EditAdminModeratorComponent,
    DeleteAdminModeratorComponent,
    CalendarComponent,
    BookReviewCommentComponent,
    NotificationListComponent,
    HttpErrorComponent,
    MatSnackBarComponent,
    CreateBookComponent,
    CreateAnnouncementComponent,
    BookProfileComponent,
    ChatComponent,
    ActivityItemComponent,
    ActivityListComponent,
    SearchUsersComponent,
    UsersListComponent,
    UserItemComponent,
    NotificationMenuComponent,
    RecommendationsComponent,
    ListItemPublishComponent,
    MessageComponent,
    MessageGroupComponent,
    ShowHideComponent,
    OptionsScrollDirective,
    CreateAchievementComponent,
    ShowHideComponent,
    MomentPipe,
    SelectorComponent,
    DateAgoPipe,
    ConfirmDeleteFromFriendsDialog,
    FriendRequestNotificationItemComponent,
    ValidationErrorMessageComponent,
    SettingsDialogComponent,
    SearchUserBooksComponent
  ],
  imports: [
    TooltipModule,
    MatGridListModule,
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
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule,
    StoreModule.forRoot(reducers),
    MatSnackBarModule,
    AngularSvgIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RatingModule,
    MatInputModule,
    NgSelectModule,
    NgOptionHighlightModule,
    CommonModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatRadioModule,
    RecaptchaModule.forRoot(),
    UiSwitchModule,
    MatDialogModule,
    ScrollingModule,
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
    MatTabsModule,
    ReactiveFormsModule,
    AnnouncementListComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ConfirmDeleteFromFriendsDialog,
    SettingsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
