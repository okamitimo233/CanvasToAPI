<!--
  IconBarChart3.vue
  Description: BarChart3 icon component using Lucide Icons

  Author: iBUHUB
-->

<script setup>
import { BarChart3 } from "lucide-vue-next";

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
    <BarChart3 :size="size" :color="color" :stroke-width="strokeWidth" />
</template>
