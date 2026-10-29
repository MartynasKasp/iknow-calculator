<script setup lang="ts">
import { CircleAlert, Info, X } from 'lucide-vue-next';
import { dismissToast, useToasts } from '@/composables/useToast';

const toasts = useToasts();
</script>

<template>
    <div class="toast-region toast-region--bottom" role="region" aria-label="Notifications">
        <TransitionGroup name="toast">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                class="toast toast--bottom"
                :class="`toast--${toast.tone}`"
                data-frontmost="true"
                role="status"
                aria-live="polite"
            >
                <span class="toast__indicator">
                    <CircleAlert v-if="toast.tone === 'warning' || toast.tone === 'danger'" class="size-4" />
                    <Info v-else class="size-4" />
                </span>
                <div class="toast__content">
                    <div class="toast__title">{{ toast.title }}</div>
                    <div v-if="toast.description" class="toast__description">{{ toast.description }}</div>
                </div>
                <button
                    class="toast__close-button close-button close-button--default"
                    data-slot="toast-close"
                    aria-label="Dismiss"
                    @click="dismissToast(toast.id)"
                >
                    <X class="size-4" />
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: opacity 180ms ease, transform 180ms ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(8px);
}
</style>
