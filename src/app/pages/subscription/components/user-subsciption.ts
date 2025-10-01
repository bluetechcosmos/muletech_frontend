import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
    selector: 'user-subscription',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
        <div class="bg-surface-0 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
            <div class="flex items-center flex-col lg:flex-row lg:justify-between">
                <div class="flex items-start flex-col md:flex-row gap-8">
                    <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/pageheading/kathryn.png" class="w-[6.42rem] h-[6.42rem]" />
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center">
                            <span class="text-surface-900 dark:text-surface-0 font-bold text-3xl">Kathryn Murphy</span>
                        </div>
                        <div class="flex items-center flex-wrap gap-8">
                            <div>
                                <span class="text-surface-500 dark:text-surface-300">Subscription</span>
                                <div class="text-surface-700 dark:text-surface-100 mt-1 text-sm font-semibold">FREE</div>
                            </div>
                            <div>
                                <span class="text-surface-500 dark:text-surface-300">APPS</span>
                                <div class="text-surface-700 dark:text-surface-100 mt-1 text-sm font-semibold">10</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 lg:mt-0 flex items-center gap-4">
                    <button pButton [rounded]="true" [severity]="'secondary'">
                        <i pButtonIcon class="pi pi-bookmark"></i>
                    </button>
                    <!-- <button pButton [rounded]="true" [severity]="'secondary'">
                        <i pButtonIcon class="pi pi-heart"></i>
                    </button>
                    <button pButton [rounded]="true" [severity]="'secondary'">
                        <i pButtonIcon class="pi pi-list"></i>
                    </button> -->
                    <button (click)="changeSubscription()" pButton class="whitespace-nowrap">
                        <i pButtonIcon class="pi pi-check"></i>
                        <span pButtonLabel>Upgrade</span>
                    </button>
                </div>
            </div>
        </div>
    `
})
export class UserSubscriptionWidget {
    router = inject(Router);

    changeSubscription() {
        this.router.navigate(['/pages/choose-subscription']);
    }
}
