import { Component } from '@angular/core';
import { FinisghItemService } from '../../../shared/Services/finisgh-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinishItemDTO } from '../../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../../shared/Services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-finish-item-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finish-item-manage.component.html',
  styleUrl: './finish-item-manage.component.css'
})
export class FinishItemManageComponent {
  items:FinishItemDTO[]=[];
  finishCategoryId:number=0;
  ImageUrl:string=environment.apiImage
  private subscriptions: Subscription = new Subscription();

  constructor(private ServiceFinish:FinisghItemService,private route :ActivatedRoute, 
    private router: Router,private Massege:ToastService){}

  ngOnInit(): void {
    const paramSub=this.route.params.subscribe(params => {
      this.finishCategoryId = +params['FinishCategory'];
    });
    const Sub=this.ServiceFinish.getAllFinishItem(this.finishCategoryId).subscribe((data)=>{
      this.items=data
      
    })
    this.subscriptions.add(Sub);
    this.subscriptions.add(paramSub);

  }
  AddFinishItem(){
    this.router.navigate([`dashboard/FinishCategory/${this.finishCategoryId}/add`]);

  }
  onDelete(id:number|undefined){
    this.ServiceFinish.DeleteFinishItem(id).subscribe(()=>{
      this.items = this.items.filter(item => item.id !== id);
      this.Massege.showMessage("success","نجاح","تم حذف تشطيب بنجاح")
    })
  }
  onEdit(id:number|undefined){
    this.router.navigate([`dashboard/FinishCategory/${this.finishCategoryId}/edit/${id}`])

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
