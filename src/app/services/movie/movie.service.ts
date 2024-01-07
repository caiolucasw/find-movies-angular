import { Injectable } from '@angular/core';
import { Movie, MovieMetadata, ResponseMovie } from '../../types/movie';
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
  metadataSubject: Subject<MovieMetadata> = new Subject();

  constructor(private httpClient: HttpClient) { }

  getMovies(page = 1): Observable<ResponseMovie> {
    return this.httpClient.get<ResponseMovie>(`${environment.apiUrl}/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, {
      headers: {
        'Authorization': `Bearer ${environment.token}`,
        'Accept': 'application/json'
      }
    }).pipe(tap((data : ResponseMovie) => {
      if (data && data.results) {
        this.movies = data.results;
        this.moviesSubject.next(this.movies);
        this.metadataSubject.next({
          page: data.page || 1,
          total_pages: data.total_pages || 1,
          total_results: data.total_results || 0
        })
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

  searchMovie(movie: string, page = 1): Observable<ResponseMovie> | null {
    if (movie.trim().length <= 0) return null;

    return this.httpClient.get<ResponseMovie>(`${environment.apiUrl}/3/search/movie?include_adult=false&langague=en-US&page=${page}&query=${movie}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${environment.token}`
      }
    }).pipe(tap((data: ResponseMovie) => {
      if (data && data.results) {
        this.movies = data.results;
        this.moviesSubject.next(this.movies);
      }
    }));
  }
}
