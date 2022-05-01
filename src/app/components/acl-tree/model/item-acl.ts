import { Functionality } from "./functionality";
import { ItemTree } from "./item-tree";

export class ItemACL extends ItemTree {
  functionalities: Functionality[];
  roles: ItemACL[];
}
