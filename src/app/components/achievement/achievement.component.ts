import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {GenreService} from '../../service/genre.service';
import {PageEvent} from '@angular/material/paginator';

interface MyNode {
  name: string;
  children?: MyNode[];
}

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  chosenVerb: string;
  chosenSubject: string;
  chosenGenres: string[] = [];
  chosenDate: any;

  treeControl = new NestedTreeControl<MyNode>(node => node.children);

  dataSource = new MatTreeNestedDataSource<MyNode>();
  subjectDataSource = new MatTreeNestedDataSource<MyNode>();
  extraDataSource = new MatTreeNestedDataSource<MyNode>();
  genreDataSource = new MatTreeNestedDataSource<MyNode>();
  reservedDataSource = new MatTreeNestedDataSource<MyNode>();

  topSize: number;
  genre: string;
  genres: string[] = [];

  // for genre paginator
  startIndex = 0;
  pageSize = 10;
  endIndex = this.pageSize;
  pageIndex = 0;

  constructor(private genreService: GenreService) {
  }

  ngOnInit() {
    this.genreService.getGenres()
      .subscribe(
        genres => {
          const genreNames = genres.map(g => g.name);
          this.genreDataSource.data = [
            {
              name: 'genres',
              children: []
            }
          ];
          genreNames.sort((n1, n2) => n1.localeCompare(n2, 'en'))
            .forEach(n => this.genreDataSource.data[0].children.push({name: n}));
        }
      );
    this.dataSource.data = [
      {
        name: 'verb',
        children: [
          {name: 'read'},
          {name: 'publish'},
          {name: 'has'}
        ]
      },
    ];
    this.subjectDataSource.data = [
      {
        name: 'subject',
        children: [
          {name: 'books'},
          {name: 'friends'},
          {name: 'comments'},
          {name: 'announcement'},
          {name: 'spent time'},
          {name: 'book reviews'},
          {name: 'book overviews'}
        ]
      },
    ];
    // this.genreDataSource.data = [
    //   {
    //     name: 'genre',
    //     children: [
    //       {name: 'Fiction'},
    //       {name: 'Mystic'},
    //       {name: 'History'},
    //     ]
    //   }
    // ];
    this.reservedDataSource.data = [
      {
        name: 'additional options',
        children: [
          {name: 'the most rated'},
          {name: 'the most largest'},
          {name: 'the most newest'},
          {name: 'the most older'},
        ]
      }
    ];
  }

  getPaginatorData(event: PageEvent) {
    console.log('date:' + this.chosenDate);
    // next page is wanted to be shown
    if (event.pageIndex === this.pageIndex + 1) {
      this.startIndex = this.startIndex + this.pageSize;
      this.endIndex = this.endIndex + this.pageSize;
    } else {
      this.startIndex = this.startIndex - this.pageSize;
      this.endIndex = this.endIndex - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  addGenre(genre) {
    console.log(genre);
    const idx = this.chosenGenres.indexOf(genre);
    if (idx === -1) {
      this.chosenGenres.push(genre);
    } else {
      this.chosenGenres.splice(idx, 1);
    }
  }

  click(verb: string): void {
    if (verb !== this.chosenVerb) {
      this.chosenVerb = verb;
      this.chosenSubject = null;
      this.chosenGenres = [];
    }
  }

  addReservedParam(option: string) {
    console.log(option);
  }

  chooseSubject(subject) {
    this.chosenSubject = subject;
  }

  isSubjectAvailable(subject: string): boolean {
    if (this.chosenVerb === 'has') {
      switch (subject) {
        case 'comments':
        case 'friends':
        case 'spent time':
          return true;
        default:
          return false;
      }
    } else if (this.chosenVerb === 'publish') {
      switch (subject) {
        case 'announcement':
        case 'book reviews':
        case 'book overviews':
          return true;
        default:
          return false;
      }
    } else if (this.chosenVerb === 'read') {
      return subject === 'books';
    }
    return false;
  }

  hasChild(i, node: MyNode): boolean {
    return !!node.children && node.children.length > 0;
  }

}
