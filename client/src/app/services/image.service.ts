import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { ApiResponse, Image, LoadParams } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private page = 1;
  private totalPages = 0;
  private searchString = '';
  private isLoading = true;

  private changes$ = new Subject();
  private images$$ = new BehaviorSubject<Image[]>([]);

  constructor(private api: ApiService) {

    this.changes$.pipe(
      this.mapToLoadParams(),
      tap(() => this.isLoading = true),
      switchMap(params => this.loadImages$(params)),
      tap((response) => this.updateState(response)),
      tap(() => this.isLoading = false)
    )
      .subscribe();


    this.endedDocument$(400).pipe(
      filter(() => !this.isLoading)
    )
      .subscribe(() => this.nextPage(this.page + 1));

    this.changes$.next();
  }

  get images$(): Observable<Image[]> {
    return this.images$$.asObservable();
  }

  search(search: string) {
    this.images$$.next([]);
    this.page = 1;
    this.searchString = search;
    this.changes$.next();
  }

  nextPage(page: number) {
    if (this.totalPages >= page) {
      this.page = page;
      this.changes$.next();
    }
  }

  private updateState(response: ApiResponse) {
    this.totalPages = response.totalPages;
    const oldImages = this.images$$.getValue();
    this.images$$.next([...oldImages, ...response.images]);
  }

  private mapToLoadParams() {
    return map(() => ({search: this.searchString, page: this.page}));
  }

  private loadImages$(params: LoadParams): Observable<ApiResponse> {
    const { search, page } = params;

    if (params.search) {
      return this.api.search(search, page);
    }

    return this.api.fetchByPage(page);
  }

  private endedDocument$(offset: number) {
    return  fromEvent(window, 'scroll').pipe(
      map(() => {
        const bottom = document.documentElement.getBoundingClientRect().bottom;
        return document.documentElement.clientHeight + offset > bottom;
      }),
      distinctUntilChanged(),
      filter(value => value)
    );
  }
}
