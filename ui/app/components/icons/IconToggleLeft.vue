<!--
  IconToggleLeft.vue
  Description: Toggle left (off) icon component using Lucide Icons

  Author: iBUHUB
-->

<script setup>
import { ToggleLeft } from "lucide-vue-next";

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
    <ToggleLeft :size="size" :color="color" :stroke-width="strokeWidth" />
</template>
