<!--
  IconLanguages.vue
  Description: Language switch icon component using Lucide Icons

  Author: iBUHUB
-->

<script setup>
import { Languages } from "lucide-vue-next";

defineProps({
    color: {
        default: "currentColor",
        type: String,
    },
    size: {
        default: 24,
        type: Number,
    },
    strokeWidth: {
        default: 1.5,
        type: Number,
    },
});
</script>

<template>
    <Languages :size="size" :color="color" :stroke-width="strokeWidth" />
</template>
