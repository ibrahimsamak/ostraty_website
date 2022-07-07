import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { OtherMenuComponent } from './shared/other-menu/other-menu.component';
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';
import { MobileLoaderComponent } from './shared/mobile-loader/mobile-loader.component';
import { StaticPageComponent } from './pages/static-page/static-page.component';
import { ServiceService } from './services/service.service';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { NewsComponent } from './pages/news/news.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterDonatorComponent } from './pages/register-donator/register-donator.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ToastrModule } from "ngx-toastr";
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { UpdateDonatorComponent } from './pages/update-donator/update-donator.component';
import { DonatesListComponent } from './pages/donates-list/donates-list.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { NotificationsListComponent } from './pages/notifications-list/notifications-list.component';
import { ServicComponent } from './pages/servic/servic.component';
import { NewServiceComponent } from './pages/new-service/new-service.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    OtherMenuComponent,
    MobileLoaderComponent,
    StaticPageComponent,
    ContactusComponent,
    NewsDetailsComponent,
    NewsComponent,
    RegisterUserComponent,
    RegisterDonatorComponent,
    LoginComponent,
    ForgetPasswordComponent,
    UpdateUserComponent,
    UpdateDonatorComponent,
    DonatesListComponent,
    RequestListComponent,
    NotificationsListComponent,
    ServicComponent,
    NewServiceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-left",
      preventDuplicates: true
    }),
    RouterModule.forRoot(
      [
        {
          path: "home",
          component: HomeComponent
        },
        {
          path: "page/:type",
          component: StaticPageComponent
        },
        {
          path: "contact-us",
          component: ContactusComponent
        },
        {
          path: "news/:type",
          component: NewsComponent
        },
        {
          path: "news-details/:id",
          component: NewsDetailsComponent
        },
        {
          path: "register-user",
          component: RegisterUserComponent
        },
        {
          path: "register-donator",
          component: RegisterDonatorComponent
        },
        {
          path: "login",
          component: LoginComponent
        },
        {
          path: "forgot-password",
          component: ForgetPasswordComponent
        },
        {
          path: "profile-user",
          component: UpdateUserComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: "profile-donator",
          component: UpdateDonatorComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: "request",
          component: RequestListComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: "donate",
          component: DonatesListComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: "notification",
          component: NotificationsListComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: "service",
          component: ServicComponent
        },
        {
          path: "new-service",
          component: NewServiceComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: "",
          redirectTo: "/home",
          pathMatch: "full"
        }
      ],
      { scrollPositionRestoration: "enabled", onSameUrlNavigation: "reload" }
    )
  ],
  providers: [ServiceService,{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
