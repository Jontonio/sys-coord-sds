import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { ClassUnitItemTreeComponent } from '../class-unit-item-tree/class-unit-item-tree.component';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';
import { Dialog } from '@angular/cdk/dialog';
import { LoadFileComponent } from '../../../../shared/components/load-file/load-file.component';
import { MatDialog } from '@angular/material/dialog';


interface FoodNode {
  value: any;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    value: { name:"Ciencia y tecnología", id:10 },
    children: [
      {
        value: { name:"Mario Gomez prueba", id:20 },
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
        value: { name:"Luisa Medina prueba", id:50 },
        children: [{value: 'Pumpkins'}, {value: 'Carrots'}],
      },
    ],
  },
  {
    value: { name:"Matematicas", id:60 },
    children: [
      {
        value: { name:'Katerin Gomez Ramires prueba', id:80 },
        children: [{value: 'Archivo de unidad'}, {value: 'Brussels sprouts'}],
      },
      {
        value: { name:'Mario prueba', id:100 },
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
  imports: [MaterialModule,
            CommonModule,
            ClassUnitItemTreeComponent,
            ShowForRolesDirective,
            NgIconComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './class-unit-tree.component.html',
  styleUrl: './class-unit-tree.component.css'
})
export class ClassUnitTreeComponent {

  private dialog = inject(MatDialog)

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

  addFile() {

    const dialogRef = this.dialog.open(LoadFileComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });

  }
}
