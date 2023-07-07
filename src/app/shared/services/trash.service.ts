import { Injectable } from "@angular/core";
import { Identifiable } from "../types/identifiable";
import { wait } from "../utils/wait";
import { Generic } from "../types/generic";

export interface Deletable<T, M extends Generic = Generic> {
  item: T;
  deletedAt?: Date;
  metadata?: M;
}

@Injectable({
  providedIn: "root",
})
export class TrashService {
  trash: Record<string, Record<number, Deletable<unknown>>> = {};

  moveToTrash<T extends Identifiable, M extends Generic = Generic>(key: string, deletable: Deletable<T, M>, minutesToDelete = 2){
    if(!this.trash[key]) this.trash[key]= {};

    this.trash[key][deletable.item.id] = {
      ...deletable,
      deletedAt: new Date()
    };

    this.scheduleDeletion(key, minutesToDelete);
  }

  recover<T, M extends Generic = Generic>(key: string, id: number){
    if(!this.trash[key]) return;
    if(!this.trash[key][id]) return;

    const toRecover = {
      ...this.trash[key][id]
    };

    delete this.trash[key][id];

    return toRecover as Deletable<T, M>;
  }

  recoverLast<T extends Identifiable, M extends Generic = Generic>(key: string){
    const trash = this.trash[key];
    if(!trash) return;
    const items = Object.values(trash) as Deletable<T, M>[];

    if(!items.length) return;

    const last = items.reduce((prev, current) => {
      if(current.deletedAt!.getTime() > prev.deletedAt!.getTime())
        return current;
      else return prev;
    })

    return this.recover<T, M>(key, last.item.id);
  }

  private deleteForever(key: string){
    delete this.trash[key];
  }

  private async scheduleDeletion(key: string, minutes: number){
    await wait(minutes * 60 * 1000);
    this.deleteForever(key);
  }
}
































