<script setup lang="ts">
import { computed } from 'vue';
import {
    ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxPortal, ComboboxRoot,
    ComboboxViewport,
} from 'reka-ui';
import type { SavedPlayerType } from '@/utils/player-history';
import ColorDot from './ColorDot.vue';

// The typed name. Suggestions only help fill it in; any name can be typed.
const name = defineModel<string>({ default: '' });

const props = defineProps<{
    label: string;
    suggestions: SavedPlayerType[];
    error?: string;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    pick: [player: SavedPlayerType];
    submit: [];
}>();

const matches = computed(() => {
    const term = name.value.trim().toLowerCase();
    return props.suggestions.filter((player) => player.name.toLowerCase().includes(term));
});

const onPick = (value: unknown) => {
    const player = props.suggestions.find((p) => p.name === value);
    if (player) {
        name.value = player.name;
        emit('pick', player);
    }
};
</script>

<template>
    <div class="combo-box combo-box--full-width" :data-invalid="error ? 'true' : undefined">
        <label class="label" for="player-name">{{ label }}</label>
        <ComboboxRoot
            :model-value="undefined"
            ignore-filter
            open-on-click
            :reset-search-term-on-blur="false"
            :reset-search-term-on-select="false"
            :disabled="disabled"
            @update:model-value="onPick"
        >
            <ComboboxAnchor class="combo-box__input-group combo-box__input-group--full-width">
                <ComboboxInput
                    id="player-name"
                    v-model="name"
                    class="input input--secondary input--full-width"
                    placeholder="e.g. Grandma Ona"
                    autocomplete="off"
                    :aria-invalid="error ? 'true' : undefined"
                    :data-invalid="error ? 'true' : undefined"
                    @keydown.enter="matches.length === 0 && emit('submit')"
                />
            </ComboboxAnchor>

            <ComboboxPortal>
                <ComboboxContent
                    v-if="matches.length"
                    position="popper"
                    :side-offset="6"
                    class="combo-box__popover popover z-50 min-w-(--reka-combobox-trigger-width) rounded-xl shadow-overlay"
                >
                    <ComboboxViewport class="list-box" data-slot="list-box">
                        <div class="px-2 pt-1 pb-0.5 text-xs text-muted">Played before</div>
                        <ComboboxItem
                            v-for="player in matches"
                            :key="player.name"
                            :value="player.name"
                            class="list-box-item list-box-item--default flex items-center gap-3"
                            data-slot="list-box-item"
                        >
                            <ColorDot :color="player.color" :size="14" />
                            <span>{{ player.name }}</span>
                        </ComboboxItem>
                    </ComboboxViewport>
                </ComboboxContent>
            </ComboboxPortal>
        </ComboboxRoot>
        <p class="field-error" :data-visible="error ? 'true' : undefined">{{ error }}</p>
    </div>
</template>
