import {Component, OnInit} from '@angular/core';
import {GenreService} from '../../service/genre.service';
import {PageEvent} from '@angular/material/paginator';
import {Parameter} from '../../models/constants/parameter';
import {AchievementService} from '../../service/achievement.service';
import {AchievementReq} from '../../models/achievement-req';
import {Verb} from '../../models/constants/verb';
import {TableName} from '../../models/constants/table-name';

interface Range<T> {
  from: T;
  to: T;
}

interface ConstantPair<T, C> {
  name: T;
  type: C;
}

class AchievementValue {

}

class AchievementBuilder {
  achievementReq: AchievementReq;
  achievementVal: AchievementValue;

  constructor() {
    this.achievementReq = new AchievementReq();
  }

  chooseSubject = (subject: ConstantPair<string, TableName>) => this.achievementReq.subject = subject.type;

  chooseVerb = (verb: ConstantPair<string, Verb>) => this.achievementReq.verb = verb.type;

  addGenre(selectedGenre: string): void {
    let selectedGenres = this.achievementReq.extraParams.get(Parameter.BOOK_GENRE);
    if (selectedGenres === undefined) {
      this.achievementReq.extraParams.set(Parameter.BOOK_GENRE, [] as string[]);
      selectedGenres = this.achievementReq.extraParams.get(Parameter.BOOK_GENRE);
    } else {
      const idx = selectedGenres.indexOf(selectedGenre);
      if (idx !== -1) {
        selectedGenres.splice(idx, 1);
        return;
      }
    }
    selectedGenres.push(selectedGenre);
  }

  changePageCount(from: number, to: number) {
    console.log('changePageCount', 'from', from, 'to', to);
    let selectedPages = this.achievementReq.extraParams.get(Parameter.BOOK_PAGES);
    if (selectedPages === undefined) {
      this.achievementReq.extraParams.set(Parameter.BOOK_PAGES, [] as string[]);
      selectedPages = this.achievementReq.extraParams.get(Parameter.BOOK_PAGES);
    }
    selectedPages.push(`${from}`, `${to}`);
  }

  changeVotersCount(from: number, to: number) {
    console.log('changeVotersCount', 'from', from, 'to', to);
    let selectedPages = this.achievementReq.extraParams.get(Parameter.BOOK_VOTERS_COUNT);
    if (selectedPages === undefined) {
      this.achievementReq.extraParams.set(Parameter.BOOK_VOTERS_COUNT, [] as string[]);
      selectedPages = this.achievementReq.extraParams.get(Parameter.BOOK_VOTERS_COUNT);
    }
    selectedPages.push(`${from}`, `${to}`);
  }

  changeReleaseDate(from: any, to: any) {
    console.log('changeReleaseDate', 'from', from, 'to', to);
    let selectedPages = this.achievementReq.extraParams.get(Parameter.BOOK_RELEASE);
    if (selectedPages === undefined) {
      this.achievementReq.extraParams.set(Parameter.BOOK_RELEASE, [] as string[]);
      selectedPages = this.achievementReq.extraParams.get(Parameter.BOOK_RELEASE);
    }
    selectedPages.push(`${from}`, `${to}`);
  }

  addReservedParam(el: ConstantPair<string, Parameter>, topSize: number | string) {
    console.log('addReservedParam', el, topSize);
    let selectedReservedParam = this.achievementReq.extraParams.get(el.type);
    if (selectedReservedParam === undefined) {
      this.achievementReq.extraParams.set(el.type, [] as string[]);
      selectedReservedParam = this.achievementReq.extraParams.get(Parameter.BOOK_RELEASE);
    }
    selectedReservedParam.push(`${topSize === 'all' ? Number.MAX_VALUE : topSize}`);
  }
}


@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  achievementBuilder: AchievementBuilder;

  // Values
  verbNameArray: ConstantPair<string, Verb>[];
  subjectNameArray: ConstantPair<string, TableName>[];
  reservedBookParams: ConstantPair<string, Parameter>[];
  pageRange: Range<number>;
  dateRange: Range<any>;
  releaseDateRange: Range<any>;
  votersCountRange: Range<number>;
  genreNameArray: string[];

  // for genre paginator, TODO create class/interface Paginator
  startIndex = 0;
  pageSize = 10;
  endIndex = this.pageSize;
  pageIndex = 0;

  constructor(private genreService: GenreService,
              private achievementService: AchievementService) {
    this.verbNameArray = [];
    this.subjectNameArray = [];
    this.genreNameArray = [];
    this.reservedBookParams = [];
    this.pageRange = {} as Range<number>;
    this.dateRange = {} as Range<any>;
    this.releaseDateRange = {} as Range<any>;
    this.votersCountRange = {} as Range<number>;
    this.achievementBuilder = new AchievementBuilder();
  }

  ngOnInit() {
    this.verbNameArray.push(
      {name: 'has', type: Verb.HAS},
      {name: 'read', type: Verb.READ},
      {name: 'publish', type: Verb.PUBLISH});

    this.subjectNameArray.push(
      {name: 'books', type: TableName.BOOKS},
      {name: 'friends', type: TableName.FRIENDS},
      {name: 'comments', type: TableName.REVIEW_COMMENTS},
      {name: 'announcement', type: TableName.ANNOUNCEMENTS},
      {name: 'book reviews', type: TableName.BOOK_REVIEWS},
      {name: 'messages', type: TableName.MESSAGES},
      {name: 'achievements', type: TableName.ACHIEVEMENTS},
      {name: 'book overviews', type: TableName.BOOK_OVERVIEWS}
    );

    this.reservedBookParams.push(
      {name: 'the most rated', type: Parameter.RESERVED_BOOK_RATED},
      {name: 'the most largest', type: Parameter.RESERVED_BOOK_LARGEST},
      {name: 'the most newest', type: Parameter.RESERVED_BOOK_NEWEST},
      {name: 'the most older', type: Parameter.RESERVED_BOOK_OLDER},
    );

    this.genreService.getGenres()
      .subscribe(
        genres => {
          const genreNames = genres.map(g => g.name);
          genreNames.sort((n1, n2) => n1.localeCompare(n2, 'en'))
            .forEach(n => this.genreNameArray.push(n));
        }
      );
  }

  getPaginatorData(event: PageEvent) {
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


  isSubjectAvailable(subject: string): boolean {
    const verb = this.achievementBuilder.achievementReq.verb;
    if (verb === Verb.HAS) {
      switch (subject.toLowerCase()) {
        case 'comments':
        case 'friends':
        case 'spent time':
          return true;
        default:
          return false;
      }
    } else if (verb === Verb.PUBLISH) {
      switch (subject.toLowerCase()) {
        case 'announcement':
        case 'book reviews':
        case 'book overviews':
          return true;
        default:
          return false;
      }
    } else if (verb === Verb.READ) {
      return subject.toLowerCase() === 'books';
    }
    return false;
  }

  //
  // createAchievement() {
  //   if (this.votersCount.from && this.votersCount.to) {
  //     this.achievementReq.extraParams.set(Parameter.BOOK_VOTERS_COUNT, ['' + this.votersCount.from, '' + this.votersCount.to]);
  //   }
  //   if (this.chosenDate.to && this.chosenDate.from) {
  //     this.achievementReq.extraParams.set(Parameter.BOOK_RELEASE, ['' + this.chosenDate.from, '' + this.chosenDate.to]);
  //   }
  //   if (this.chosenVerb) {
  //     switch (this.chosenVerb.toUpperCase()) {
  //       case Verb.HAS:
  //         this.achievementReq.verb = Verb.HAS;
  //         break;
  //       case Verb.PUBLISH:
  //         this.achievementReq.verb = Verb.PUBLISH;
  //         break;
  //       case Verb.READ:
  //         this.achievementReq.verb = Verb.READ;
  //     }
  //   }
  //   this.achievementService.createAchievement(this.achievementReq)
  //     .pipe(
  //       tap(achievement => console.log('Created : ', achievement))
  //     )
  //     .subscribe();
  // }
}
