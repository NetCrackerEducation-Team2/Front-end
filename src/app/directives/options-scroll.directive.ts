import {Directive, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatAutocomplete} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

export interface IAutoCompleteScrollEvent {
  autoComplete: MatAutocomplete;
  scrollEvent: Event;
}

@Directive({
  selector: 'mat-autocomplete[optionsScroll]'
})
export class OptionsScrollDirective implements OnDestroy {

  @Input() thresholdPercent = .8;
  @Output('optionsScroll') scroll = new EventEmitter<IAutoCompleteScrollEvent>();
  _onDestroy = new Subject();

  constructor(public autoComplete: MatAutocomplete) {
    this.autoComplete.opened.pipe(
      tap(() => {
        setTimeout(() => {
          this.removeScrollEventListener();
          this.autoComplete.panel.nativeElement
            .addEventListener('scroll', this.onScroll.bind(this));
        });
      }),
      takeUntil(this._onDestroy)).subscribe();

    this.autoComplete.closed.pipe(
      tap(() => this.removeScrollEventListener()),
      takeUntil(this._onDestroy)).subscribe();
  }

  private removeScrollEventListener() {
    if(this.autoComplete.panel) {
      this.autoComplete.panel.nativeElement
        .removeEventListener('scroll', this.onScroll);
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.removeScrollEventListener();
  }

  onScroll(event) {
    if (this.thresholdPercent === undefined) {
      this.scroll.next({autoComplete: this.autoComplete, scrollEvent: event});
    } else {
      const threshold = this.thresholdPercent * event.target.scrollHeight;
      const current = event.target.scrollTop + event.target.clientHeight;

      if (current > threshold) {
        this.scroll.next({autoComplete: this.autoComplete, scrollEvent: event});
      }
    }
  }
}
