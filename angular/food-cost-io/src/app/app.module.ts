import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
// TODO find out why excluding this make the app noit load any content
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { DishesModule } from './dishes/dishes.module';

// const appRoutes: Routes = [
//   { path : 'home' , component: HomepageComponent },
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent },
// ];


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    // TODO to be removed
    BrowserAnimationsModule,
    MatSidenavModule,
    DishesModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
