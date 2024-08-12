import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, inject, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MaterialModule } from '../../../../material/custom-material.module';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { Unit } from '../../../interface/Unit';
import { ClassUnitTreeComponent } from "../class-unit-tree/class-unit-tree.component";


interface FoodNode {
  value: any;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  value: any;
  level: number;
}

@Component({
  selector: 'app-unit-item-tree',
  standalone: true,
  imports: [MaterialModule, NgIconComponent, ShowEmptyMessageComponent, SkeletonComponent, ClassUnitTreeComponent],
  providers: [provideIcons({ ...iconsList })],
  templateUrl: './unit-item-tree.component.html',
  styleUrl: './unit-item-tree.component.css'
})
export class UnitItemTreeComponent {

  unit_list!: Unit[];
  _loadding = inject(LoaddingService);

  @Input()
  set _unit_list(list: Unit[]) {
    this.unit_list = list;
    // this.teacher_areas = this.cacheService.cacheClassUnit[`id-${this.id_academic_program}`] || []
    this.dataSource.data = this.parseTreeDataUnit(this.unit_list) as any;
  }


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

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(){}

  parseTreeDataUnit (res: Unit[]) {
    return res.map((unit: Unit) => ({
      value: { label: `Unidad ${unit.unit_name}` },
      children: [
        {
          value: { label:null, data: unit }
        }
      ]
    }));

  }


}
