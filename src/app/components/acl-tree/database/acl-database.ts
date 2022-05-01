import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemTree } from '../model/item-tree';
import { ItemTreeACL } from '../model/item-tree-acl';
import { AclService } from '../service/acl.service';

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class AclDatabase {
  private listaACLnova: any | {};
  public dataChange = new BehaviorSubject<ItemTree[]>([]);

  get data(): ItemTree[] {
    return this.dataChange.value;
  }

  constructor(private productService: AclService) {
    this.initialize();
  }

  async initialize() {
    // Build the tree nodes from Json object. The result is a list of `ItemTree` with nested
    //     file node as children.

    this.listaACLnova = await this.productService.getACLlist();
    console.log('this.listaACLnova>>>> ', this.listaACLnova);

    const data: ItemTree = this.mountItemACLNovo(this.listaACLnova, 0);

    // Notifico a alteração, passando uma lista de ItemTree.
    this.dataChange.next([data]);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */

  private mountItemACLNovo(obj: any, pLevel: number): ItemTree {
    // Instancio um objeto só pra poder usá-lo na concatenação abaixo.
    const node = new ItemTreeACL();
    // Concateno os dois objetos para ter um novo objeto com as propriedades de ambos
    const objACL: ItemTree = { ...node, ...obj };
    console.log(objACL);

    this.mountTreeAcl(objACL, 0); // Monto a lista ACL.
    return objACL;
  }

  mountTreeAcl(object: any, level: number) {
    // Método utilitário pra remover uma propriedade
    const removeProperty =
      (prop: any) =>
      ({ [prop]: _, ...rest }) =>
        rest;

    const removeRoles = removeProperty('roles'); // Método utilitário pra remover a propriedade 'roles' especificamente

    object.level = level; //Defino a propriedade 'level' do objeto (role) atual;

    //Percorro todos os itens da propriedade 'children'
    object.children?.forEach((item: any, index: any, children: any) => {
      //Copio o conteúdo da propriedade 'roles' para 'cildren' pq o CDK do componente MaterialTree precisa do 'children';
      item.children = item.roles;
      item = removeRoles(item); // Removo a propriedade 'roles'
      this.mountTreeAcl(item, level + 1); // Chamo o próprio método recursivamente.
      children[index] = item; // Atualizo o item atual na matriz 'children' que vai receber o novo obj que agora tem o atributo 'children'
    });
  }

  /** Add an item to ACL list */
  insertItem(parent: ItemTreeACL, item: ItemTreeACL) {
    console.log('>>>>> ', parent);

    if (parent.children) {
      parent.type = 'role';

      //item.name = item.constructor.name.toUpperCase();

      item.expandable = true;
      console.log('parent:: ', parent.constructor.name, parent);

      parent.children.push(item);

      this.dataChange.next(this.data);
    }
  }

  updateItem(node: ItemTree, name: string) {
    node.name = name.toUpperCase();
    this.dataChange.next(this.data);
  }

  removeItems(parent: any, node: ItemTree) {
    console.log('parent ', parent);

    if (parent) {
      for (let i = 0; i < parent.length; i++) {
        if (parent[i].name == node.name) {
          parent.splice(i, 1);
          continue;
        }
        this.removeItems(parent[i].children, node);
      }
    }

    this.dataChange.next(this.data);
  }

  getItem(parent: any, node: ItemTree) {
    if (parent) {
      for (let i = 0; i < parent.length; i++) {
        if (parent[i].name == node.name) {
          return parent[i];
        }
        const found = this.getItem(parent[i].children, node);
        if (found) return found;
      }
    }
  }
}
