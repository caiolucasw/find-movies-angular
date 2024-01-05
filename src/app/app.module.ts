import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { FormatMovieTimePipe } from './pipes/format-movie-time.pipe';


const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    pathMatch: 'full'

  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainContentComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    InputSearchComponent,
    FormatMovieTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
