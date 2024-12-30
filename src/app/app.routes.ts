import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { InfoContentComponent } from './info-content/info-content.component';
import { ProjectCategoryComponent } from './project-category/project-category.component';
import { FinishCategoryComponent } from './finish-category/finish-category.component';
import { MediaCategoryComponent } from './media-category/media-category.component';
import { PorjectAreaComponent } from './porject-area/porject-area.component';
import { ProjectComponent } from './project/project.component';
import { MediaListComponent } from './media-list/media-list.component';
import { DetailMediaComponent } from './detail-media/detail-media.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import { DetailUnitComponent } from './detail-unit/detail-unit.component';
import { MainLayoutProjectComponent } from './main-layout-project/main-layout-project.component';
import { MainLayoutComponent } from './Dashboard/main-layout/main-layout.component';
import { HomeDashboardComponent } from './Dashboard/home-dashboard/home-dashboard.component';
import { CityComponent } from './Dashboard/city/city.component';
import { AreaComponent } from './Dashboard/area/area.component';
import { ProjectManageComponent } from './Dashboard/project-manage/project-manage.component';
import { AddProjectComponent } from './Dashboard/project-manage/add-project/add-project.component';
import { EditProjectComponent } from './Dashboard/project-manage/edit-project/edit-project.component';
import { UnitComponent } from './Dashboard/unit/unit.component';
import { AddUnitComponent } from './Dashboard/unit/add-unit/add-unit.component';
import { EditUnitComponent } from './Dashboard/unit/edit-unit/edit-unit.component';
import { MediaCategoriesComponent } from './Dashboard/media-category/media-category.component';
import { MediaComponent } from './Dashboard/media-category/media/media.component';
import { AddMediaComponent } from './Dashboard/media-category/media/add-media/add-media.component';
import { EditMediaComponent } from './Dashboard/media-category/media/edit-media/edit-media.component';
import { LoginComponent } from './Dashboard/login/login.component';
import { authGuard } from '../shared/Guards/auth.guard';
import { CallUsComponent } from './call-us/call-us.component';
import { ContactManageComponent } from './Dashboard/contact-manage/contact-manage.component';
import { WhyUsManageComponent } from './Dashboard/why-us/why-us.component';
import { SliderManageComponent } from './Dashboard/slider-manage/slider-manage.component';
import { AllUnitComponent } from './all-unit/all-unit.component';
import { SearchComponent } from './search/search.component';
import { FinishCategoryManageComponent } from './Dashboard/finish-category-manage/finish-category-manage.component';
import { FinishItemManageComponent } from './Dashboard/finish-item-manage/finish-item-manage.component';
import { AddFinishItemComponent } from './Dashboard/finish-item-manage/add-finish-item/add-finish-item.component';
import { EditFinishItemComponent } from './Dashboard/finish-item-manage/edit-finish-item/edit-finish-item.component';
import { FinishItemListComponent } from './finish-item-list/finish-item-list.component';
import { FinishItemDetailComponent } from './finish-item-detail/finish-item-detail.component';
import { AllPaidUnitComponent } from './all-paid-unit/all-paid-unit.component';
import { CoverImageComponent } from './Dashboard/cover-image/cover-image.component';
import { PaidCityComponent } from './paid-city/paid-city.component';
import { PaidAreaComponent } from './paid-area/paid-area.component';
import { PaidProjectComponent } from './paid-project/paid-project.component';
import { WhyUsPageComponent } from './Dashboard/why-us-page/why-us-page.component';

export const routes: Routes = [
  
  
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo:"Cities" , pathMatch:"full" },
      { path: 'Login', loadComponent: () =>
        import('./Dashboard/login/login.component').then((m) => m.LoginComponent)},
      { path: 'Cities', component: CityComponent  ,canActivate: [authGuard]   },
      { path: 'WhyUs/PageSection', component: WhyUsPageComponent,canActivate:[authGuard] },
      { path: 'WhyUs', component: WhyUsManageComponent  ,canActivate: [authGuard]   },
      { path: 'Slider', component: SliderManageComponent  ,canActivate: [authGuard]   },
      { path: 'ContactManage', component: ContactManageComponent  ,canActivate: [authGuard]   },
      { path: 'Projects', component: ProjectManageComponent,canActivate: [authGuard] },
      { path:'Projects/:areaId/add' , component:AddProjectComponent,canActivate: [authGuard]},
      { path:'Projects/unit/edit/:unitId' , component:EditUnitComponent,canActivate: [authGuard]},
      { path:'Projects/:areaId/edit/:projectId' , component:EditProjectComponent,canActivate: [authGuard]},
      { path:'Projects/AllUnit/:projectId' , component:UnitComponent,canActivate: [authGuard]},
      { path:'Projects/unit/:projectId/add' , component:AddUnitComponent,canActivate: [authGuard]},
      { path: 'MediaCategory/:MediaCategoryId/edit/:mediaId' , component:EditMediaComponent,canActivate: [authGuard]},
      { path: 'MediaCategory/:MediaCategoryId/add' , component:AddMediaComponent,canActivate: [authGuard]},
      { path: 'MediaCategory/:MediaCategoryId' , component:MediaComponent,canActivate: [authGuard]},
      { path: 'coverimage' , component: CoverImageComponent , canActivate:[authGuard]  },
      { path: 'MediaCategory' , component:MediaCategoriesComponent,canActivate: [authGuard]},
      { path: 'allarea', component: AreaComponent , canActivate: [authGuard] },
      { path: "FinishCategory" , component:FinishCategoryManageComponent , canActivate: [authGuard]},
      { path: "FinishCategory/:FinishCategory" , component:FinishItemManageComponent , canActivate: [authGuard]},
      { path: "FinishCategory/:FinishCategory/add" , component:AddFinishItemComponent , canActivate: [authGuard]},
      { path: "FinishCategory/:FinishCategory/edit/:finishItem" , component:EditFinishItemComponent , canActivate: [authGuard]},

      { path: '**', redirectTo:"Cities" , pathMatch:"full" },
    ],
  },
  {
    path: '',
    component: MainLayoutProjectComponent,
    children: [
      {path:"home", loadComponent: () =>
        import('./home/home.component').then((m) => m.HomeComponent),
        data: { headerImageUrl: '../../assets/Images/k1.webp', customClass: 'home' }
      },
      {path:"callus", loadComponent: () =>
        import('./call-us/call-us.component').then((m) => m.CallUsComponent)},
      {path:"whyus", loadComponent: () =>
        import('./why-us/why-us.component').then((m) => m.WhyUsComponent)},
      {path: 'info/:id',  loadComponent: () =>
        import('./info-content/info-content.component').then((m) => m.InfoContentComponent)},
        {path:'search/:CityId/project/:AreaId',component:SearchComponent},

      { path: 'projectcategory/:categoryId/project/:projectId/detail/:DetailProject',  loadComponent: () =>
        import('./detail-project/detail-project.component').then((m) => m.DetailProjectComponent)},
      { path: 'projectcategory/:categoryId/project/:projectId', loadComponent: () =>
        import('./project/project.component').then((m) => m.ProjectComponent), },
      { path: 'projectcategory/:categoryId', component: PorjectAreaComponent },
      {
        path: 'projectcategory', component:ProjectCategoryComponent,
      },
      {path:'finishcategory',component:FinishCategoryComponent},
      {path:'finishcategory/:finishCategoryId',component:FinishItemListComponent},
      {path:'finishcategory/:finishCategoryId/detail/:FinishItemDetail',component:FinishItemDetailComponent},
      {path:'mediaCategories/:mediaId/media/:DetailId',component:DetailMediaComponent},
      {path:'mediaCategories/:mediaId',component:MediaListComponent},
      {path:'mediaCategories',component:MediaCategoryComponent},
      {path:"project",component:DetailProjectComponent},
      {path:"unit/paid",component:AllPaidUnitComponent},
      {path:"comprojects",component:PaidCityComponent},
      {path:"comprojects/:categoryId",component:PaidAreaComponent},
      {path:"comprojects/:categoryId/project/:projectId",component:PaidProjectComponent},

      {path:"unit/:unitId",component:DetailUnitComponent},
      {path:"unit",component:AllUnitComponent},
      {path: '', redirectTo:"home" , pathMatch:"full"},
      {path: '**', redirectTo:"home" , pathMatch:"full"},
    ],
  },
  
  

];
