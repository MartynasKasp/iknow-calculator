<script setup lang="ts">
import {
    SelectContent, SelectIcon, SelectItem, SelectItemIndicator, SelectItemText, SelectPortal,
    SelectRoot, SelectTrigger, SelectValue, SelectViewport,
} from 'reka-ui';
import { Check, ChevronDown } from 'lucide-vue-next';
import type { FigureColorType } from '@/stores/types';
import { colorName } from '@/stores/constants';
import ColorDot from './ColorDot.vue';

const color = defineModel<string>({ default: '' });

defineProps<{
    label: string;
    options: FigureColorType[];
    error?: string;
    disabled?: boolean;
}>();
</script>

<template>
    <div class="select select--secondary select--full-width" :data-invalid="error ? 'true' : undefined">
        <label class="label" for="figure-color">{{ label }}</label>
        <SelectRoot v-model="color" :disabled="disabled || options.length === 0">
            <SelectTrigger
                id="figure-color"
                class="select__trigger select__trigger--full-width items-center gap-2"
                :aria-invalid="error ? 'true' : undefined"
            >
                <ColorDot v-if="color" :color="color" :size="14" />
                <SelectValue
                    class="select__value"
                    :data-placeholder="color ? undefined : 'true'"
                    placeholder="Choose a color"
                >
                    {{ color ? colorName(color) : 'Choose a color' }}
                </SelectValue>
                <SelectIcon class="select__indicator absolute end-2 text-muted">
                    <ChevronDown class="size-4" />
                </SelectIcon>
            </SelectTrigger>

            <SelectPortal>
                <SelectContent
                    position="popper"
                    :side-offset="6"
                    class="select__popover popover z-50 min-w-(--reka-select-trigger-width) rounded-xl shadow-overlay"
                >
                    <SelectViewport class="list-box" data-slot="list-box">
                        <SelectItem
                            v-for="option in options"
                            :key="option.value"
                            :value="option.value"
                            class="list-box-item list-box-item--default flex items-center gap-3"
                            data-slot="list-box-item"
                        >
                            <ColorDot :color="option.value" :size="14" />
                            <SelectItemText>{{ option.name }}</SelectItemText>
                            <SelectItemIndicator class="ms-auto">
                                <Check class="size-4" />
                            </SelectItemIndicator>
                        </SelectItem>
                    </SelectViewport>
                </SelectContent>
            </SelectPortal>
        </SelectRoot>
        <p class="field-error" :data-visible="error ? 'true' : undefined">{{ error }}</p>
    </div>
</template>
