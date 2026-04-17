<!--
  DesignSystemDemo.vue
  Description: Demo component to test the new design system (colors, fonts, icons, theme)

  Author: iBUHUB
-->

<template>
    <div class="design-system-demo">
        <h1 class="demo-title">Design System Demo</h1>

        <!-- Color Palette -->
        <section class="demo-section">
            <h2>Color Palette</h2>
            <div class="color-grid">
                <div class="color-card">
                    <div class="color-swatch brand-primary"></div>
                    <p>Brand Primary</p>
                    <code>#18181B</code>
                </div>
                <div class="color-card">
                    <div class="color-swatch brand-secondary"></div>
                    <p>Brand Secondary</p>
                    <code>#3F3F46</code>
                </div>
                <div class="color-card">
                    <div class="color-swatch brand-cta"></div>
                    <p>Brand CTA</p>
                    <code>#EC4899</code>
                </div>
                <div class="color-card">
                    <div class="color-swatch success"></div>
                    <p>Success</p>
                    <code>#22C55E</code>
                </div>
                <div class="color-card">
                    <div class="color-swatch warning"></div>
                    <p>Warning</p>
                    <code>#F97316</code>
                </div>
                <div class="color-card">
                    <div class="color-swatch error"></div>
                    <p>Error</p>
                    <code>#EF4444</code>
                </div>
            </div>
        </section>

        <!-- Typography -->
        <section class="demo-section">
            <h2>Typography</h2>
            <div class="typography-demo">
                <h1 class="heading-font">Heading Font: Bodoni Moda</h1>
                <h2 class="heading-font">Heading 2 - Elegant Typography</h2>
                <h3 class="heading-font">Heading 3 - High Contrast</h3>
                <p class="body-font">
                    Body Font: Jost. This is a sample paragraph text to demonstrate the body typography. Jost is a
                    modern geometric sans-serif that works well for UI text.
                </p>
                <p class="body-font small">Smaller body text for secondary information and captions.</p>
            </div>
        </section>

        <!-- Icons -->
        <section class="demo-section">
            <h2>Icons (Lucide)</h2>
            <div class="icon-grid">
                <div class="icon-item">
                    <IconHome :size="32" />
                    <p>Home</p>
                </div>
                <div class="icon-item">
                    <IconSettings :size="32" />
                    <p>Settings</p>
                </div>
                <div class="icon-item">
                    <IconFileText :size="32" />
                    <p>File/Logs</p>
                </div>
                <div class="icon-item">
                    <IconLanguages :size="32" />
                    <p>Languages</p>
                </div>
                <div class="icon-item">
                    <IconLogOut :size="32" />
                    <p>Logout</p>
                </div>
                <div class="icon-item">
                    <IconCheckCircle :size="32" color="var(--color-success)" />
                    <p>Success</p>
                </div>
                <div class="icon-item">
                    <IconAlertCircle :size="32" color="var(--color-warning)" />
                    <p>Warning</p>
                </div>
                <div class="icon-item">
                    <IconXCircle :size="32" color="var(--color-error)" />
                    <p>Error</p>
                </div>
                <div class="icon-item">
                    <IconActivity :size="32" />
                    <p>Activity</p>
                </div>
                <div class="icon-item">
                    <IconUsers :size="32" />
                    <p>Users</p>
                </div>
            </div>
        </section>

        <!-- Theme Toggle -->
        <section class="demo-section">
            <h2>Theme</h2>
            <button class="theme-toggle-btn" @click="toggleTheme">Toggle Theme (Current: {{ theme }})</button>
        </section>

        <!-- Background Colors Demo -->
        <section class="demo-section">
            <h2>Background Colors</h2>
            <div class="bg-demo">
                <div class="bg-item bg-base">Base Background</div>
                <div class="bg-item bg-elevated">Elevated</div>
                <div class="bg-item bg-surface">Surface</div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useTheme } from "../utils/useTheme";
import {
    IconHome,
    IconSettings,
    IconFileText,
    IconLanguages,
    IconLogOut,
    IconCheckCircle,
    IconXCircle,
    IconAlertCircle,
    IconActivity,
    IconUsers,
} from "./icons";

const { theme, setTheme } = useTheme();

const toggleTheme = () => {
    const newTheme = theme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
};
</script>

<style lang="less" scoped>
@import "../styles/variables.less";

.design-system-demo {
    max-width: 1200px;
    margin: 0 auto;
    padding: @spacing-xl;
    background: var(--bg-base);
    color: var(--text-primary);
}

.demo-title {
    font-family: @font-heading;
    font-size: 2.5em;
    margin-bottom: @spacing-xl;
    color: var(--text-primary);
}

.demo-section {
    margin-bottom: @spacing-xl;

    h2 {
        font-family: @font-heading;
        font-size: 1.8em;
        margin-bottom: @spacing-lg;
        color: var(--text-secondary);
    }
}

.color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: @spacing-md;
}

.color-card {
    text-align: center;

    .color-swatch {
        width: 100%;
        height: 80px;
        border-radius: @border-radius-md;
        margin-bottom: @spacing-sm;
        border: 1px solid var(--border-color);
    }

    p {
        margin: @spacing-xs 0;
        font-family: @font-body;
    }

    code {
        font-family: @font-family-mono;
        font-size: @font-size-small;
        color: var(--text-muted);
    }
}

.brand-primary {
    background: var(--color-brand-primary);
}

.brand-secondary {
    background: var(--color-brand-secondary);
}

.brand-cta {
    background: var(--color-brand-cta);
}

.success {
    background: var(--color-success);
}

.warning {
    background: var(--color-warning);
}

.error {
    background: var(--color-error);
}

.typography-demo {
    h1,
    h2,
    h3 {
        margin: @spacing-md 0;
    }

    p {
        margin: @spacing-sm 0;
        line-height: 1.6;
    }

    .heading-font {
        font-family: @font-heading;
    }

    .body-font {
        font-family: @font-body;

        &.small {
            font-size: @font-size-small;
            color: var(--text-secondary);
        }
    }
}

.icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: @spacing-md;
}

.icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: @spacing-md;
    background: var(--bg-elevated);
    border-radius: @border-radius-md;
    border: 1px solid var(--border-light);

    p {
        margin-top: @spacing-sm;
        font-size: @font-size-small;
        color: var(--text-secondary);
    }

    &:hover {
        background: var(--bg-surface);
        border-color: var(--color-brand-cta);
    }
}

.theme-toggle-btn {
    padding: @spacing-sm @spacing-lg;
    background: var(--color-brand-cta);
    color: #fff;
    border: none;
    border-radius: @border-radius-sm;
    cursor: pointer;
    font-family: @font-body;
    font-size: @font-size-base;
    transition: all @transition-normal;

    &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
}

.bg-demo {
    display: flex;
    gap: @spacing-md;
    flex-wrap: wrap;
}

.bg-item {
    flex: 1;
    min-width: 150px;
    padding: @spacing-lg;
    border-radius: @border-radius-md;
    text-align: center;
    font-family: @font-body;
    border: 1px solid var(--border-color);
}

.bg-base {
    background: var(--bg-base);
    color: var(--text-primary);
}

.bg-elevated {
    background: var(--bg-elevated);
    color: var(--text-primary);
}

.bg-surface {
    background: var(--bg-surface);
    color: var(--text-primary);
}
</style>
