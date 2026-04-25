<!--
 * File: ui/app/pages/NotFound.vue
 * Description: 404 Not Found page component for handling invalid routes
 *
 * Author: iBUHUB
-->

<script setup>
import I18n from "../utils/i18n.js";

const t = I18n.t;
</script>

<template>
    <div class="not-found">
        <h1>{{ t("pageNotFound") }}</h1>
        <p>{{ t("pageNotFoundMessage") }}</p>
        <a href="/">{{ t("returnToStatus") }}</a>
    </div>
</template>

<style lang="less" scoped>
@import "../styles/variables.less";

.not-found {
    align-items: center;
    background: var(--bg-base);
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    font-family: @font-body;
    height: 100vh;
    justify-content: center;
    padding: @spacing-lg;
    transition: all @transition-normal;
}

.not-found h1 {
    font-family: @font-heading;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    transition: color @transition-normal;
}

.not-found p {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-bottom: @spacing-md;
    transition: color @transition-normal;
}

.not-found a {
    color: var(--color-brand-cta);
    font-weight: 500;
    margin-top: 1rem;
    text-decoration: none;
    transition: all @transition-fast;
    padding: @spacing-sm @spacing-md;
    border-radius: @border-radius-md;
}

.not-found a:hover {
    background: rgba(236, 72, 153, 0.1);
    text-decoration: none;
    transform: translateY(-2px);
}

.not-found a:active {
    transform: translateY(0);
}
</style>
