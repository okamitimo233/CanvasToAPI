<!--
  IconTrash2.vue
  Description: Trash icon component using Lucide Icons

  Author: iBUHUB
-->

<script setup>
import { Trash2 } from "lucide-vue-next";

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
    <Trash2 :size="size" :color="color" :stroke-width="strokeWidth" />
</template>
