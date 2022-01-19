import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs/internal/types';
import { User } from 'src/app/models/common/user.model';
import { ItemType } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];
  
  constructor(readonly store: Store<{ state: State }>,
              readonly itemService: ItemService) { }

  currentUser: User | undefined;

  allItems!: ItemType[];
  filteredItems!: ItemType[];
  shownItems!: ItemType[];
  
  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(async i => {
      this.currentUser = i.user;
      if (i.user) {
        this.readData(i.user.Id)
      }
    });
    this.subscribes.push(sub);
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  async readData(userId: string){
    this.allItems = await this.itemService.getAllTraitsByUserId(userId);
    this.filteredItems = JSON.parse(JSON.stringify(this.allItems));
    this.shownItems = JSON.parse(JSON.stringify(this.filteredItems));
  }

}
