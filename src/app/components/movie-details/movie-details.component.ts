import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  id: number | null = null;
  movie: any | null = null;


  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        const id = params['id'] || null;
        if (id) {
          this.id = +id;
          this.movieService.findMovieById(+id).subscribe((data) => {
            this.movie = data
          });
        }
      })
  }
}
