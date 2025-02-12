import { Injectable, OnDestroy } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexDBService implements OnDestroy {
  private readonly destroy$ = new Subject();
  constructor(private readonly dbService: NgxIndexedDBService) {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  addDb(storeName: string, data: any) {
    this.dbService
      .add(storeName, data)
      .pipe(take(1))
      .subscribe({
        next: (key) => {
          console.log('add success key:', key);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getDb(storeName: string): any[] {
    let data: any[] = [];
    this.dbService
      .getAll(storeName)
      .pipe(take(1))
      .subscribe({
        next: (dbData) => {
          console.log(storeName);
          console.log(data);
          data = dbData;
        },
        error: (err) => {
          console.log(err);
        },
      });
    return data;
  }

  getByIndex(storeName: string, indexName: string, key: any) {
    return this.dbService.getByIndex(storeName, indexName, key);
  }
}
