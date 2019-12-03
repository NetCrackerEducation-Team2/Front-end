import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {GenreService} from '../../service/genre.service';
import {PageEvent} from '@angular/material/paginator';
import {Parameter} from '../../models/constants/parameter';
import {TableName} from '../../models/constants/table-name';
import {AchievementService} from '../../service/achievement.service';
import {AchievementReq} from '../../models/achievement-req';
import {tap} from 'rxjs/operators';
import {Verb} from '../../models/constants/verb';

interface GenericNode<T> {
  name: T;
  children?: GenericNode<T>[];
}

interface TreeNode<T> {
  name: string;
  param?: T;
  children?: TreeNode<T>[];
}

interface MyNode {
  name: string;
  children?: MyNode[];
}


interface ReservedBookParamNode {
  name: string;
  param?: Parameter;
  subject?: TableName.BOOKS;
  children?: ReservedBookParamNode[];
}

class Range<T> {
  from: T;
  to: T;

  constructor(from?: T, to?: T) {
    this.from = from;
    this.to = to;
  }
}


@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  chosenVerb = 'read';
  chosenSubject: string = 'books';
  chosenGenres: string[] = [];

  treeControl = new NestedTreeControl<MyNode>(node => node.children);
  customTreeControl = new NestedTreeControl<TreeNode<any>>(node => node.children);


  dataSource = new MatTreeNestedDataSource<TreeNode<Verb>>();
  subjectDataSource = new MatTreeNestedDataSource<MyNode>();
  genreDataSource = new MatTreeNestedDataSource<MyNode>();
  reservedDataSource = new MatTreeNestedDataSource<ReservedBookParamNode>();
  countDataSource = new MatTreeNestedDataSource<TreeNode<number>>();

  topSize: number;
  genre: string;

  genres: string[] = [];
  // for genre paginator
  startIndex = 0;
  pageSize = 10;
  endIndex = this.pageSize;

  pageIndex = 0;
  achievementReq: AchievementReq;
  chosenDate: {
    to: any,
    from: any
  };

  // create 'range' interface {to, from}
  votersCount: {
    to: any,
    from: any
  };
  count: number;

  constructor(private genreService: GenreService,
              private achievementService: AchievementService) {
    this.achievementReq = new AchievementReq();
    this.achievementReq.extraParams = new Map<Parameter, string[]>();
    this.chosenDate = {to: {}, from: {}};
    this.votersCount = {to: {}, from: {}};
  }

  ngOnInit() {
    this.countDataSource.data = [
      {
        name: 'count',
        children: [
          {name: '', param: 0}
        ]
      }
    ];

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
          {name: 'read', param: Verb.READ},
          {name: 'publish', param: Verb.PUBLISH},
          {name: 'has', param: Verb.HAS}
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
    this.reservedDataSource.data = [
      {
        name: 'additional options',
        children: [
          {name: 'the most rated', param: Parameter.RESERVED_BOOK_RATED},
          {name: 'the most largest', param: Parameter.RESERVED_BOOK_LARGEST},
          {name: 'the most newest', param: Parameter.RESERVED_BOOK_NEWEST},
          {name: 'the most older', param: Parameter.RESERVED_BOOK_OLDER},
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

  // click(verb: string): void {
  //   if (verb !== this.chosenVerb) {
  //     this.chosenVerb = verb;
  //     this.chosenSubject = null;
  //     this.chosenGenres = [];
  //   }
  // }
  click(node: any): void {
    console.log('Verb : ', node);
  }

  addReservedParam(option: TreeNode<any>, topSize) {
    // this.params.set(option.param, [String(topSize)]);
    console.log('Option : ', option);
  }

  chooseSubject(subject) {
    if (subject.toUpperCase() === 'BOOKS') {
      this.achievementReq.subject = TableName.BOOKS;
    }

    this.chosenSubject = subject;
  }

  isSubjectAvailable(subject: string): boolean {
    if (this.chosenVerb === 'has') {
      switch (subject.toLowerCase()) {
        case 'comments':
        case 'friends':
        case 'spent time':
          return true;
        default:
          return false;
      }
    } else if (this.chosenVerb === 'publish') {
      switch (subject.toLowerCase()) {
        case 'announcement':
        case 'book reviews':
        case 'book overviews':
          return true;
        default:
          return false;
      }
    } else if (this.chosenVerb === 'read') {
      return subject.toLowerCase() === 'books';
    }
    return false;
  }

  hasChild(i, node: MyNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  createAchievement() {
    if (this.votersCount.from && this.votersCount.to) {
      this.achievementReq.extraParams.set(Parameter.BOOK_VOTERS_COUNT, ['' + this.votersCount.from, '' + this.votersCount.to]);
    }
    if (this.chosenDate.to && this.chosenDate.from) {
      this.achievementReq.extraParams.set(Parameter.BOOK_RELEASE, ['' + this.chosenDate.from, '' + this.chosenDate.to]);
    }
    if (this.chosenVerb) {
      switch (this.chosenVerb.toUpperCase()) {
        case Verb.HAS:
          this.achievementReq.verb = Verb.HAS;
          break;
        case Verb.PUBLISH:
          this.achievementReq.verb = Verb.PUBLISH;
          break;
        case Verb.READ:
          this.achievementReq.verb = Verb.READ;
      }
    }
    this.achievementService.createAchievement(this.achievementReq)
      .pipe(
        tap(achievement => console.log('Created : ', achievement))
      )
      .subscribe();
  }
}
