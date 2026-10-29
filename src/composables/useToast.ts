import { ref } from 'vue';

export type ToastTone = 'default' | 'accent' | 'success' | 'warning' | 'danger';

export type Toast = {
    id: number;
    title: string;
    description?: string;
    tone: ToastTone;
};

const toasts = ref<Toast[]>([]);
let nextId = 1;

export function dismissToast(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
}

// Shows a short message at the bottom of the screen. A new toast replaces the old one.
export function showToast(title: string, options: { description?: string; tone?: ToastTone } = {}) {
    const toast: Toast = {
        id: nextId++, title, description: options.description, tone: options.tone ?? 'default',
    };
    toasts.value = [toast];
    setTimeout(() => dismissToast(toast.id), 4000);
}

export function clearToasts() {
    toasts.value = [];
}

export function useToasts() {
    return toasts;
}
