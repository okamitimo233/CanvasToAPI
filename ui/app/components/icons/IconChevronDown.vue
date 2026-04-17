<!--
  IconChevronDown.vue
  Description: Chevron down icon component using Lucide Icons

  Author: iBUHUB
-->

<script setup>
import { ChevronDown } from "lucide-vue-next";

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
    <ChevronDown :size="size" :color="color" :stroke-width="strokeWidth" />
</template>
