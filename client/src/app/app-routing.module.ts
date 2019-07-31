import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TermsComponent } from './terms/terms.component';
import {FaqsComponent} from './faqs/faqs.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {ContacusComponent} from './contacus/contacus.component';
import {WhoComponent} from './who/who.component';
import { HomeComponent } from './home/home.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { BasketComponent } from './basket/basket.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { CheckoutpurchaseComponent } from './checkoutpurchase/checkoutpurchase.component';
import { StatusComponent } from './status/status.component';
import { ProfileComponent } from './profile/profile.component';
import { NotiComponent } from './noti/noti.component';
import { ChildComponent } from './child/child.component';
const routes: Routes = [
  {path: '' ,component:IndexComponent , pathMatch:'full' },
  {path: 'Index' ,component:IndexComponent },
  {path: 'signin' ,component:SigninComponent },
  {path: 'signup' ,component:SignupComponent },
  {path: 'terms' , component:TermsComponent},
  {path: 'privacy' , component:PrivacyComponent},
  {path: 'faqs' , component:FaqsComponent},
  {path: 'contacus' , component:ContacusComponent},
  {path: 'who' , component:WhoComponent},




  {path: 'user' , component:ChildComponent,
children:[
  {path: 'home' , component:HomeComponent},
  {path: 'bookdetail' , component:BookdetailComponent},
  {path: 'basket' , component:BasketComponent},
  {path: 'exchange' , component:ExchangeComponent},
  {path: 'checkoutpurchase' , component:CheckoutpurchaseComponent},
  {path: 'status', component:StatusComponent},
  {path: 'profile' , component:ProfileComponent},
  {path: 'noti' , component:NotiComponent},

]




},




  
 








 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[ChildComponent,NotiComponent,ProfileComponent,StatusComponent,CheckoutpurchaseComponent,ExchangeComponent,BasketComponent,BookdetailComponent,SignupComponent,HomeComponent,SigninComponent,IndexComponent,TermsComponent,PrivacyComponent,FaqsComponent,ContacusComponent,WhoComponent];
