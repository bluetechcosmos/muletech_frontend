import { Component } from '@angular/core';
import { AppsWidget } from './components/apps-widget';

@Component({
    selector: 'app-dashboard',
    imports: [AppsWidget],
    template: `
        <div class="card"><div class="font-semibold text-xl mb-4">Your Apps</div></div>
        <div class="grid grid-cols-12 gap-8">
            <app-apps-widget class="contents" />
        </div>
    `
})
export class Dashboard {}
