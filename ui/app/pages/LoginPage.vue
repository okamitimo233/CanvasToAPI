<!--
 * File: ui/app/pages/LoginPage.vue
 * Description: Login page component with modern dark theme design
 *
 * Author: iBUHUB
-->

<template>
    <div class="login-page">
        <form action="/login" method="post" class="login-form">
            <!-- Language Switcher -->
            <button type="button" class="lang-switcher" :title="t('switchLanguage')" @click="toggleLanguage">
                <IconLanguages :size="20" :stroke-width="1.5" />
            </button>

            <!-- Login Content -->
            <div v-if="configLoaded" class="login-content">
                <!-- Brand/Logo -->
                <div class="brand">
                    <h1 class="brand-title">CanvasToAPI</h1>
                    <p class="brand-subtitle">API Proxy Dashboard</p>
                </div>

                <!-- Heading -->
                <h2 class="login-title">
                    {{ requirePassword ? t("loginHeadingAuth") : t("loginHeading") }}
                </h2>

                <!-- Username Field (if required) -->
                <div v-if="requireUsername" class="input-group">
                    <input
                        type="text"
                        name="username"
                        :placeholder="t('usernamePlaceholder')"
                        required
                        autofocus
                        class="input-field"
                    />
                </div>

                <!-- Password/API Key Field -->
                <div class="input-group">
                    <input
                        type="password"
                        :name="requirePassword ? 'password' : 'apiKey'"
                        :placeholder="requirePassword ? t('passwordPlaceholder') : t('apiKeyPlaceholder')"
                        required
                        :autofocus="!requireUsername"
                        class="input-field"
                    />
                </div>

                <!-- Submit Button -->
                <div class="submit-wrapper">
                    <button type="submit" class="submit-button">
                        {{ t("loginBtn") }}
                    </button>
                </div>
            </div>

            <!-- Error Message -->
            <p v-if="errorText" class="error-message">
                {{ errorText }}
            </p>
        </form>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import I18n from "../utils/i18n";
import { useTheme } from "../utils/useTheme";
import IconLanguages from "../components/icons/IconLanguages.vue";

const route = useRoute();

// Create reactive version counter
const langVersion = ref(0);
const requireUsername = ref(false);
const requirePassword = ref(false);
const configLoaded = ref(false);

// Listen for language changes
const onLangChange = () => {
    langVersion.value++;
};

// Initialize theme
useTheme();

onMounted(async () => {
    I18n.onChange(onLangChange);
    try {
        const res = await fetch("/api/auth/config");
        if (res.ok) {
            const data = await res.json();
            requireUsername.value = data.requireUsername;
            requirePassword.value = data.requirePassword;
        }
    } catch (err) {
        console.error("Failed to load auth config", err);
    } finally {
        configLoaded.value = true;
    }
});

const t = (key, options) => {
    langVersion.value; // Access to track changes
    return I18n.t(key, options);
};

const errorText = computed(() => {
    const code = String(route.query.error || "");
    if (code === "1") {
        return requirePassword.value ? t("loginErrorInvalidCredentials") : t("loginErrorInvalidKey");
    }
    if (code === "2") {
        return t("loginErrorRateLimit");
    }
    return "";
});

const toggleLanguage = async () => {
    await I18n.toggleLang();
};

watchEffect(() => {
    document.title = t("loginTitle");
});
</script>

<style lang="less" scoped>
@import "../styles/variables.less";

// ========== Main Container ==========
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: @spacing-lg;
    background: var(--bg-base);
    transition: background @transition-normal;
}

// ========== Login Form Card ==========
.login-form {
    position: relative;
    width: 100%;
    max-width: 420px;
    background: var(--bg-elevated);
    border-radius: @border-radius-xl;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    padding: @spacing-xl;
    transition: all @transition-normal;

    // Dark mode enhancement
    [data-theme="dark"] & {
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
}

// ========== Language Switcher ==========
.lang-switcher {
    position: absolute;
    top: @spacing-md;
    right: @spacing-md;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid var(--border-light);
    border-radius: @border-radius-md;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all @transition-fast;

    &:hover {
        color: var(--color-brand-cta);
        border-color: var(--color-brand-cta);
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
}

// ========== Login Content ==========
.login-content {
    width: 100%;
}

// ========== Brand Section ==========
.brand {
    text-align: center;
    margin-bottom: @spacing-xl;
}

.brand-title {
    font-family: @font-heading;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 @spacing-xs 0;
    letter-spacing: -0.02em;
    transition: color @transition-normal;
}

.brand-subtitle {
    font-family: @font-body;
    font-size: 0.875rem;
    color: var(--text-muted);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color @transition-normal;
}

// ========== Login Title ==========
.login-title {
    font-family: @font-body;
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0 0 @spacing-lg 0;
    text-align: center;
    transition: color @transition-normal;
}

// ========== Input Group ==========
.input-group {
    margin-bottom: @spacing-md;

    &:first-of-type {
        margin-top: @spacing-md;
    }
}

.input-field {
    width: 100%;
    padding: 14px @spacing-md;
    font-family: @font-body;
    font-size: 1rem;
    color: var(--text-primary);
    background: var(--bg-base);
    border: 1px solid var(--border-color);
    border-radius: @border-radius-md;
    transition: all @transition-fast;
    outline: none;

    &::placeholder {
        color: var(--text-muted);
    }

    &:hover {
        border-color: var(--text-secondary);
    }

    &:focus {
        border-color: var(--color-brand-cta);
        background: var(--bg-elevated);
        box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
    }

    // Dark mode input enhancement
    [data-theme="dark"] & {
        background: var(--bg-surface);

        &:focus {
            background: var(--bg-base);
        }
    }
}

// ========== Submit Button ==========
.submit-wrapper {
    margin-top: @spacing-lg;
}

.submit-button {
    width: 100%;
    padding: 14px @spacing-md;
    font-family: @font-body;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background: var(--color-brand-cta);
    border: none;
    border-radius: @border-radius-md;
    cursor: pointer;
    transition: all @transition-fast;
    outline: none;

    &:hover {
        background: #db2777;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(236, 72, 153, 0.2);
    }

    &:focus {
        box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.25);
    }
}

// ========== Error Message ==========
.error-message {
    margin: @spacing-md 0 0 0;
    padding: @spacing-sm @spacing-md;
    font-family: @font-body;
    font-size: 0.875rem;
    color: var(--color-error);
    background: rgba(239, 68, 68, 0.1);
    border-left: 3px solid var(--color-error);
    border-radius: @border-radius-sm;
    text-align: left;
    animation: slideIn @transition-normal ease-out;
}

// ========== Animations ==========
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// ========== Responsive Design ==========
@media (max-width: 480px) {
    .login-page {
        padding: @spacing-md;
    }

    .login-form {
        padding: @spacing-lg;
    }

    .brand-title {
        font-size: 2rem;
    }

    .brand-subtitle {
        font-size: 0.75rem;
    }

    .login-title {
        font-size: 1.125rem;
    }

    .input-field,
    .submit-button {
        padding: 12px @spacing-sm;
        font-size: 0.9375rem;
    }
}
</style>
