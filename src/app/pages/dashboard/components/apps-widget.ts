import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AppInfo {
    name: string;
    icon: string;
    background: string;
}
@Component({
    standalone: true,
    selector: 'app-apps-widget',
    imports: [CommonModule],
    template: `
        <div *ngFor="let app of apps" class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ app.name }}
                        </div>
                    </div>

                    <div class="flex items-center justify-center rounded-border" [ngClass]="app.background" style="width: 2.5rem; height: 2.5rem">
                        <i class="text-2xl!" [ngClass]="['pi', 'pi-fw', app.icon]"></i>
                        <!-- Equivalent: [class]="'pi pi-fw ' + app.icon" -->
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppsWidget {
    apps: AppInfo[] = [
        { name: 'STEM EDUCATION', background: 'bg-orange-200', icon: 'pi-star' },
        { name: 'COGNITIVE CANVA', background: 'bg-cyan-200', icon: 'pi-palette' },
        { name: 'BILLING', background: 'bg-teal-200', icon: 'pi-shopping-cart' }
    ];
}
