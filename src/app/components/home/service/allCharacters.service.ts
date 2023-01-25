import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Characters } from '../interface/characters.interface';

@Injectable({
  providedIn: 'root',
})
export class AllCharactersService {
  private apiURL = 'https://rickandmortyapi.com/api';
  constructor(private http: HttpClient) {}

  getAllCharacters() {
    return this.http.get(this.apiURL + '/character');
  }

  getCharactersPage(urlPage: string) {
    return this.http.get(urlPage);
  }

  getCharactersSelectPage(page: number) {
    return this.http.get(this.apiURL + `/character/?page=${page}`);
  }
}
