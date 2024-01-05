import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {


  movies: Movie[] = [];
  
  constructor(private movieService: MovieService) {}
  
  ngOnInit(): void {
    this.movieService.moviesSubject.subscribe((data: any) => this.movies = data);
    this.movieService.getMovies().subscribe((data) => console.log(this.movies));
  }

}
