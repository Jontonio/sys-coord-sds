import { Component } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { ClassUnitItemTreeComponent } from '../class-unit-item-tree/class-unit-item-tree.component';


interface FoodNode {
  value: any;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    value: 'Ciencia y tecnología',
    children: [
      {
        value: 'Milagros Gomez Ramires',
        children: [
          {
            value: { link: "test1", data: "http://localhost:4200/unidades-de-clase/home"},
          },
          {
            value: { link: "test2", data: "http://localhost:4200/unidades-de-clase/home"},
          },
          {
            value: { link: "test3", data: "http://localhost:4200/unidades-de-clase/home"},
          }
        ],
      },
      {
        value: 'Maria Rivera',
        children: [{value: 'Pumpkins'}, {value: 'Carrots'}],
      },
    ],
  },
  {
    value: 'Matematicas',
    children: [
      {
        value: 'Katerin Gomez Ramires',
        children: [{value: 'Archivo de unidad'}, {value: 'Brussels sprouts'}],
      },
      {
        value: 'Mario Quillahuaman',
        children: [{value: 'Pumpkins'}, {value: 'Carrots'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  value: string;
  level: number;
}

@Component({
  selector: 'app-class-unit-tree',
  standalone: true,
  imports: [MaterialModule, CommonModule, ClassUnitItemTreeComponent],
  templateUrl: './class-unit-tree.component.html',
  styleUrl: './class-unit-tree.component.css'
})
export class ClassUnitTreeComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      value: node.value,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
