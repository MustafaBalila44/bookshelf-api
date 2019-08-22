import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IndexComponent } from './index/index.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { WhoComponent } from './who/who.component';
import { ContacusComponent } from './contacus/contacus.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './homeAuth/home/home.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { BasketComponent } from './basket/basket.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { CheckoutpurchaseComponent } from './checkoutpurchase/checkoutpurchase.component';
import { StatusComponent } from './status/status.component';
import { ProfileComponent } from './profile/profile.component';
import { NotiComponent } from './noti/noti.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ChildComponent } from './child/child.component';
import { GlobalService } from './app.globals';
import { AuthService } from './auth/auth.service';
import { CheckoutexchangeComponent } from './checkoutexchange/checkoutexchange.component';
import { CpanelComponent } from './cpanelAuth/cpanel/cpanel.component';
import { MatchValueDirective } from './directives/match-value.directive';
import { SendrequestService } from './homeAuth/sendrequest.service';
/*
import { EnquiryComponent } from './cpanelAuth/enquiry/enquiry.component';
import { OrderpurshasecpanelComponent } from './cpanelAuth/orderpurshasecpanel/orderpurshasecpanel.component';
import { OrderexchangecpanelComponent } from './cpanelAuth/orderexchangecpanel/orderexchangecpanel.component';
import { RecordComponent } from './cpanelAuth/record/record.component';
*/
@NgModule({
  declarations: [
    AppComponent,
    MatchValueDirective,
    IndexComponent,
    SigninComponent,
    SignupComponent,
    PrivacyComponent,
    TermsComponent,
    WhoComponent,
    ContacusComponent,
    FaqsComponent,
    HomeComponent,
    BookdetailComponent,
    BasketComponent,
    ExchangeComponent,
    CheckoutpurchaseComponent,
    StatusComponent,
    ProfileComponent,
    JwPaginationComponent,
    NotiComponent,
    ChildComponent,
    CheckoutexchangeComponent,
    CpanelComponent,
    /*
    EnquiryComponent,
    OrderpurshasecpanelComponent,
    OrderexchangecpanelComponent,
    RecordComponent,
    */
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [
    GlobalService,
    AuthService,
    SendrequestService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
