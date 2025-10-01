import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { ChooseSubscriptionWidget } from './subscription/components/choose-subscription';
import { UserSubscriptionWidget } from './subscription/components/user-subsciption';

export default [
    { path: 'empty', component: Empty },
    { path: 'choose-subscription', component: ChooseSubscriptionWidget },
    { path: 'user-subscription', component: UserSubscriptionWidget },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
