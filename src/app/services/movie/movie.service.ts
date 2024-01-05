import { Injectable } from '@angular/core';
import { Movie, ResponseMovie } from '../../types/movie';
import { movies } from '../../data/movies';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  moviesSubject: Subject<Movie[]> = new Subject();
  movies: Movie[] = [];

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<ResponseMovie | any> {
    return this.httpClient.get(`${environment.apiUrl}/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, {
      headers: {
        'Authorization': `Bearer ${environment.token}`,
        'Accept': 'application/json'
      }
    }).pipe(tap((data : any) => {
      if (data && data.results) {
        this.movies = data.results;
        this.moviesSubject.next(this.movies);
      }
    }));
  }

  findMovieById(id: number) : Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/3/movie/${id}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${environment.token}`,
        'Accept': 'application/json'
      }
    });
  }

  searchMovie(movie: string): Observable<any> | null {
    if (movie.trim().length <= 0) return null;

    return this.httpClient.get(`${environment.apiUrl}/3/search/movie?include_adult=false&langague=en-US&page=1&query=${movie}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${environment.token}`
      }
    }).pipe(tap((data: any) => {
      if (data && data.results) {
        this.movies = data.results;
        this.moviesSubject.next(this.movies);
      }
    }));
  }
}
