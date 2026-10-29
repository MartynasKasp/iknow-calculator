<script setup lang="ts">
withDefaults(defineProps<{ color: string; size?: number; square?: boolean }>(), {
    size: 12,
    square: false,
});
</script>

<template>
    <span
        class="inline-block shrink-0 ring-1 ring-black/10 dark:ring-white/15"
        :class="square ? 'rounded-[3px]' : 'rounded-full'"
        :style="{ backgroundColor: `#${color}`, width: `${size}px`, height: `${size}px` }"
        aria-hidden="true"
    ></span>
</template>
