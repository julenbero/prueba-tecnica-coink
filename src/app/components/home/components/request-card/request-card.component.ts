import { Component, OnInit } from '@angular/core';
import { AllCharactersService } from '../../service/allCharacters.service';
import { Characters } from './../../interface/characters.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  getCharacters!: any;
  getInfo!: any;
  public showTable: boolean = false;
  actualPage: number = 0;
  paginator: number[] = [];
  items: number;
  nameCharacter: string = '';
  typeCharacter: string = '';
  filterCharacters: any = [];

  displayedColumns: string[] = [
    'blackLeft',
    'position',
    'name',
    'status',
    'specie',
    'type',
    'blackRight',
  ];

  constructor(private service: AllCharactersService) {}

  ngOnInit(): void {
    this.showCharactersInit();
  }

  showCharactersInit() {
    this.service.getAllCharacters().subscribe(
      (response) => {
        this.getInfo = Object.values(response)[0];
        this.getCharacters = Object.values(response)[1];
        this.enableShowTable();
        this.numberPages();
        this.idMax();
      },
      (error) => console.log('Ups! we have an error: ', error)
    );
  }

  showCharactersPage(url: string) {
    this.service.getCharactersPage(url).subscribe(
      (response) => {
        this.getInfo = Object.values(response)[0];
        this.getCharacters = Object.values(response)[1];
        this.idMax();
      },
      (error) => console.log('Ups! we have an error: ', error)
    );
  }

  searchFields() {
    console.log(this.filterCharacters);
    let namesCharacters = this.getCharacters
      .filter((obj: any) => obj.name === this.nameCharacter)
      .map((obj: any) => obj.id);
    let typesCharacters = this.getCharacters
      .filter((obj: any) => obj.type === this.typeCharacter)
      .map((obj: any) => obj.id);
    let searchCharacters = [
      ...new Set(namesCharacters.concat(typesCharacters)),
    ];
    this.filterCharacters = searchCharacters;

    this.getCharacters.map((obj: any) => {
      if (this.filterCharacters.includes(obj.id)) {
        obj['checked'] = true;
      }
      return obj;
    });
  }

  cleanFilter() {
    this.nameCharacter = '';
    this.typeCharacter = '';
    this.filterCharacters = [];
    this.getCharacters.map((obj: any) => {
      if (obj.checked) {
        delete obj.checked;
      }
      return obj;
    });
  }

  enableShowTable() {
    if (this.getCharacters !== undefined) {
      this.showTable = true;
      if (this.getInfo.prev === null) this.actualPage = 1;
    }
  }

  numberPages() {
    for (let i = 1; i <= this.getInfo.pages; i++) {
      if (this.getInfo.pages > 10) {
        if (i <= 3) {
          this.paginator.push(i);
        }
        if (
          i == this.getInfo.pages / 2 - 1 ||
          i == this.getInfo.pages / 2 ||
          i == this.getInfo.pages / 2 + 1
        ) {
          this.paginator.push(i);
        }

        if (
          i == this.getInfo.pages - 1 ||
          i == this.getInfo.pages ||
          i == this.getInfo.pages - 2
        ) {
          this.paginator.push(i);
        }
      } else {
        this.paginator.push(i);
      }
    }
  }

  changePage(evt: any) {
    if (
      evt.target.classList.contains('next') ||
      evt.target.classList.contains('fa-chevron-right')
    ) {
      this.actualPage += 1;
      this.showCharactersPage(this.getInfo.next);
    } else {
      this.actualPage -= 1;
      this.showCharactersPage(this.getInfo.prev);
    }
    this.idMax();
  }

  selectPage(evt: any) {
    this.actualPage = parseInt(evt.target.textContent);
    this.service.getCharactersSelectPage(this.actualPage).subscribe(
      (response) => {
        this.getInfo = Object.values(response)[0];
        this.getCharacters = Object.values(response)[1];
        this.idMax();
      },
      (error) => console.log('Ups! we have an error: ', error)
    );
  }

  idMax() {
    this.items = Math.max(
      ...this.getCharacters.map((character: any) => character.id)
    );
  }
}
