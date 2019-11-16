import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map, debounceTime, takeUntil } from 'rxjs/operators';
import { Component, Input, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss']
})
export class ImageSearchComponent implements OnInit, OnDestroy {
  @Input() public timeout = 500;
  @Input('value') public set setValue(value: string) {
    if (typeof value === 'string') {
      this.formControl.setValue(value);
    }
  }

  @Output() onSearch = new EventEmitter();

  formControl = new FormControl('');
  private destroy$ = new Subject();

  ngOnInit() {
    this.formControl.valueChanges
      .pipe(
        map(value => value.trim()),
        debounceTime(this.timeout),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.onSearch.emit(value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
