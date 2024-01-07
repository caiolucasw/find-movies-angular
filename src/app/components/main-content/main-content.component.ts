import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie, MovieMetadata } from 'src/app/types/movie';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {


  movies: Movie[] = [];
  movieMetadata!: MovieMetadata;
  movieString: string = '';
  
  constructor(private movieService: MovieService) {}
  
  ngOnInit(): void {
    this.movieService.moviesSubject.subscribe((data: Movie[]) => this.movies = data);
    this.movieService.getMovies().subscribe((data) => console.log(this.movies));
    this.movieService.metadataSubject.subscribe((metadata: MovieMetadata) => this.movieMetadata = metadata);
  }

  getMoviesByPage(page: number) {
    if (this.movieString.trim().length <= 0) {
      this.movieService.getMovies(page).subscribe((data) => console.log(data));
    } else {
      this.movieService.searchMovie(this.movieString, page)?.subscribe((data) => console.log(data));
    }
  }

  onChangeInput(movie: string ) {
    this.movieString = movie;
  }

}
