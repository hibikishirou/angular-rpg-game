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
    return this.dbService.add(storeName, data).pipe(take(1));
  }

  updateDb(storeName: string, data: any) {
    return this.dbService.update(storeName, data).pipe(take(1));
  }

  deleteDb(storeName: string, id: number) {
    return this.dbService.delete(storeName, id).pipe(take(1));
  }

  getDb(storeName: string) {
    return this.dbService.getAll(storeName).pipe(take(1));
  }

  getByIndex(storeName: string, indexName: string, key: any) {
    return this.dbService.getByIndex(storeName, indexName, key).pipe(take(1));
  }
}
