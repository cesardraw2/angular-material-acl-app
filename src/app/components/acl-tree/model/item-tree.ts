import { Functionality } from './functionality';
import { ItemTreeACL } from './item-tree-acl';
import { ItemTreeBase } from './item-tree-base';

export class ItemTree extends ItemTreeBase {
  children: ItemTreeACL[] | [];
  functionalities: Functionality[] | [];
}
