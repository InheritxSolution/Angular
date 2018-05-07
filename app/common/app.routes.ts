import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AuthGuard } from './auth.guard';
import { UnauthGuard } from './auth.guard';

import { UserComponent } from '../user/user.component';
import { LoginComponent } from '../login/login.component';
import { CategoryComponent } from '../category/category.component';
import { VideoComponent } from '../video/video.component';
import { PricePackageComponent } from '../price-package/price-package.component';
import { CmsComponent } from '../cms/cms.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserlistComponent } from '../userlist/userlist.component';
import { CategorylistComponent } from '../categorylist/categorylist.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { VideolistComponent } from '../videolist/videolist.component';
import { CreateVideoComponent } from '../create-video/create-video.component';
import { CmslistComponent } from '../cmslist/cmslist.component';
import { CreateCmsComponent } from '../create-cms/create-cms.component';
import { SettingsComponent } from '../settings/settings.component';
import { PricelistComponent } from '../pricelist/pricelist.component';
import { CreatePriceComponent } from '../create-price/create-price.component';
import { AdvertisementComponent } from '../advertisement/advertisement.component';
import { AdvertisementlistComponent } from '../advertisementlist/advertisementlist.component';
import { CreateAdvertisementComponent } from '../create-advertisement/create-advertisement.component';
import { ImageComponent } from '../image/image.component';
import { ImageListComponent } from '../image-list/image-list.component';
import{CreateImageComponent}from '../create-image/create-image.component'

// Route Configuration
const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [UnauthGuard],
        data: {
            title: 'Login'
        }
    },
    {
        path: 'forgetpassword',
        component: ForgetPasswordComponent,
        canActivate: [UnauthGuard],
        data: {
            title: 'Forget Password'
        }
    },
    {
        path: 'changepassword/:id',
        component: ChangePasswordComponent,
        canActivate: [UnauthGuard],
        data: {
            title: 'Change Password'
        }
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: UserlistComponent,data: {title: 'User'}},  
          {path: 'create', component: CreateUserComponent,data: {title: 'User'}}, 
          {path: 'edit/:id', component: CreateUserComponent,data: {title: 'User'}}, 
        ],
        data: {
            title: 'User'
        }
    },
    {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: CategorylistComponent,data: {title: 'Category'}},  
          {path: 'create', component: CreateCategoryComponent,data: {title: 'Category'}}, 
          {path: 'edit/:id', component: CreateCategoryComponent,data: {title: 'Category'}}, 
        ],
        data: {
            title: 'Category'
        }
    },
    {
        path: 'video',
        component: VideoComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: VideolistComponent,data: {title: 'Video'}},  
          {path: 'create', component: CreateVideoComponent,data: {title: 'Video'}}, 
          {path: 'edit/:id', component: CreateVideoComponent,data: {title: 'Video'}}, 
        ],
        data: {
            title: 'Video'
        }
    },
    {
        path: 'image',
        component: ImageComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: ImageListComponent,data: {title: 'Image'}},  
          {path: 'create', component: CreateImageComponent,data: {title: 'Image'}}, 
          {path: 'edit/:id', component: CreateImageComponent,data: {title: 'Image'}}, 
        ],
        data: {
            title: 'Video'
        }
    },
    {
        path: 'price',
        component: PricePackageComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: PricelistComponent,data: {title: 'Price'}},  
          {path: 'create', component: CreatePriceComponent,data: {title: 'Price'}}, 
          {path: 'edit/:id', component: CreatePriceComponent,data: {title: 'Price'}}, 
        ],
        data: {
            title: 'Price'
        }
    },
    {
        path: 'advertisement',
        component: AdvertisementComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: AdvertisementlistComponent,data: {title: 'Advertisement'}},  
          {path: 'create', component: CreateAdvertisementComponent,data: {title: 'Advertisement'}}, 
          {path: 'edit/:id', component: CreateAdvertisementComponent,data: {title: 'Advertisement'}}, 
        ],
        data: {
            title: 'Advertisement'
        }
    },
    {
        path: 'setting',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Settings'
        }
    },
    {
        path: 'cms',
        component: CmsComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: CmslistComponent,data: {title: 'CMS'}},  
          {path: 'create', component: CreateCmsComponent,data: {title: 'CMS'}}, 
          {path: 'edit/:id', component: CreateCmsComponent,data: {title: 'CMS'}}, 
        ],
        data: {
            title: 'CMS'
        }
    },
    { path: '**', redirectTo: '' }
]
export const routing = RouterModule.forRoot(appRoutes);
