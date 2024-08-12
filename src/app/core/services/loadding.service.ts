import { computed, Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaddingService {

    private loadding = signal(false);
    private showLoading = computed(() => this.loadding());
    public message = '';

    setLoadding(loadding: boolean) {
        this.loadding.update((() => loadding))
    }

    getLoadding() {
        return this.showLoading();
    }

    setMessage(msg: string) {
        this.message = msg;
    }

    getMessage() {
        return this.message;
    }
}
