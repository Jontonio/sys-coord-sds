import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { ClassUnitItemTreeComponent } from '../class-unit-item-tree/class-unit-item-tree.component';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';
import { LoadFileComponent } from '../../../../shared/components/load-file/load-file.component';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { map } from 'rxjs';
import { CacheService } from '../../../../core/services/cache.service';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { AuthenticationService } from '../../../../core/services/auth.service';
import { Unit } from '../../../interface/Unit';


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
  selector: 'app-class-unit-tree',
  standalone: true,
  imports: [MaterialModule,
            CommonModule,
            ClassUnitItemTreeComponent,
            ShowForRolesDirective,
            ShowEmptyMessageComponent,
            SkeletonComponent,
            NgIconComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
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

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(){}

  public unit!: Unit;
  private dialog = inject(MatDialog)
  private dbService = inject(DbService)
  private cacheService = inject(CacheService)
  public loaddingService = inject(LoaddingService)
  private notificationService = inject(NotificationService)
  private authService = inject(AuthenticationService)

  @Input() teacher_areas:any[]= [];

  @Input()
  set _unit(value: Unit) {
    this.unit = value;
    this.teacher_areas = this.cacheService.cacheClassUnit[`id-${this.unit.id_unit}`] || []
    this.dataSource.data = this.teacher_areas;
  }


  ngOnInit(): void {
    this.getDataAreasWithTeacherAndClassUnit();
  }

  getDataAreasWithTeacherAndClassUnit(){

    const userRoles = this.authService.getUserAuth.roles.map(role => role.name.toUpperCase());
    const isDocenteUser = userRoles.includes(this.authService.role.DOCENTE_USER);
    const isCoordinatorUser = userRoles.includes(this.authService.role.COORD_USER);

    const data = {
      id_ie_teacher: this.cacheService.getIdIETeacher(),
      id_unit: this.unit.id_unit
    };
    if (isDocenteUser && !isCoordinatorUser && userRoles.length === 1) {
      this.getAreasWithTeacherAndClassUnit(data);
    } else {
      this.getAreasWithTeachersAndClassUnitAll(data);
    }

  }

  getAreasWithTeacherAndClassUnit({ id_ie_teacher, id_unit}: any) {
    this.dbService.getAreasWithTeacherAndClassUnit({id_ie_teacher, id_unit})
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error fetching areas:', err);
        }
      });
  }

  getAreasWithTeachersAndClassUnitAll({ id_unit }: any) {
    this.dbService.getAreasWithTeachersAndClassUnitAll({id_unit})
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error fetching areas:', err);
        }
      });
  }

  addFile(id_teacher_area:number) {

    if(!id_teacher_area){
      this.notificationService.warning('Validación de datos', 'El id del docente asignado al área es requerido')
      return;
    }

    if(!this.unit.id_unit){
      this.notificationService.warning('Validación de datos', 'El id de la programación académica es requerido')
      return;
    }

    const dialogRef = this.dialog.open(LoadFileComponent, {
      data: {
        'id_teacher_area':id_teacher_area,
        'id_unit':this.unit.id_unit
      },
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.getDataAreasWithTeacherAndClassUnit();
      }
    });
  }
}
