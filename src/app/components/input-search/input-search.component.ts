import { Component, EventEmitter, Output } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent {

  @Output() inputChange = new EventEmitter<string>();

  constructor(private movieService: MovieService) {}

  onPressKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.movieService.searchMovie((event.target as HTMLInputElement).value)?.subscribe((data) => data);
    }

  }

  onChange(event: Event) {
    this.inputChange.emit((event.target as HTMLInputElement).value || '');
  }

}
