<script setup lang="ts">
import {
    DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle,
} from 'reka-ui';
import { X } from 'lucide-vue-next';

const open = defineModel<boolean>('open', { default: false });

const props = withDefaults(defineProps<{
    title: string;
    description?: string;
    // When false the dialog can only be closed with its own buttons.
    dismissable?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
}>(), {
    description: undefined,
    dismissable: true,
    size: 'sm',
});

const preventIfLocked = (event: Event) => {
    if (!props.dismissable) event.preventDefault();
};
</script>

<template>
    <DialogRoot v-model:open="open">
        <DialogPortal>
            <DialogOverlay class="modal__backdrop modal__backdrop--opaque">
                <div class="modal__container justify-center">
                    <DialogContent
                        class="modal__dialog"
                        :class="`modal__dialog--${size}`"
                        @escape-key-down="preventIfLocked"
                        @pointer-down-outside="preventIfLocked"
                        @interact-outside="preventIfLocked"
                    >
                        <DialogClose
                            v-if="dismissable"
                            class="modal__close-trigger close-button close-button--default"
                            aria-label="Close"
                        >
                            <X class="size-4" />
                        </DialogClose>

                        <div class="modal__header">
                            <slot name="icon" />
                            <DialogTitle class="modal__heading text-lg">{{ title }}</DialogTitle>
                        </div>

                        <div class="modal__body">
                            <DialogDescription v-if="description">{{ description }}</DialogDescription>
                            <slot />
                        </div>

                        <div v-if="$slots.footer" class="modal__footer">
                            <slot name="footer" />
                        </div>
                    </DialogContent>
                </div>
            </DialogOverlay>
        </DialogPortal>
    </DialogRoot>
</template>
