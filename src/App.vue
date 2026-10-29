<script setup lang="ts">
import { useHead } from '@unhead/vue';
import BugReportDialog from '@/components/BugReportDialog.vue';
import ToastRegion from '@/components/ui/ToastRegion.vue';

useHead({
    titleTemplate: (title) => (title ? `${title} | iKNOW Calculator` : 'iKNOW Calculator'),
});
</script>

<template>
    <RouterView />
    <BugReportDialog />
    <ToastRegion />
</template>
