<!--
 * File: ui/app/pages/StatusPage.vue
 * Description: Status page component for displaying system status and logs
 *
 * Author: iBUHUB
-->

<template>
    <div class="main-layout">
        <!-- Mobile Header -->
        <header class="mobile-header">
            <button class="hamburger-button" :title="t('menu')" @click="mobileMenuOpen = true">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>
            <h1 class="mobile-title">{{ t("statusHeading") }}</h1>
        </header>

        <!-- Desktop Sidebar -->
        <aside class="sidebar desktop-only">
            <div class="sidebar-menu">
                <button
                    class="menu-item"
                    :class="{ active: activeTab === 'home' }"
                    :title="t('statusHeading')"
                    @click="switchTab('home')"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </button>
                <button
                    class="menu-item"
                    :class="{ active: activeTab === 'settings' }"
                    :title="t('actionsPanel')"
                    @click="switchTab('settings')"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path
                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        />
                    </svg>
                </button>
                <button
                    class="menu-item"
                    :class="{ active: activeTab === 'logs' }"
                    :title="t('realtimeLogs')"
                    @click="switchTab('logs')"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                </button>
            </div>
            <div class="sidebar-footer">
                <button class="menu-item" :title="t('switchLanguage')" @click="toggleLanguage">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="m5 8 6 6" />
                        <path d="m4 14 6-6 2-3" />
                        <path d="M2 5h12" />
                        <path d="M7 2h1" />
                        <path d="m22 22-5-10-5 10" />
                        <path d="M14 18h6" />
                    </svg>
                </button>
                <button class="menu-item logout-button" :title="t('logout')" @click="handleLogout">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </aside>

        <!-- Mobile Drawer Menu -->
        <el-drawer v-model="mobileMenuOpen" direction="ltr" :title="t('menu')" size="280px" class="mobile-drawer">
            <div class="drawer-menu">
                <button class="drawer-menu-item" :class="{ active: activeTab === 'home' }" @click="switchTab('home')">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span>{{ t("statusHeading") }}</span>
                </button>
                <button
                    class="drawer-menu-item"
                    :class="{ active: activeTab === 'settings' }"
                    @click="switchTab('settings')"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path
                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        />
                    </svg>
                    <span>{{ t("actionsPanel") }}</span>
                </button>
                <button class="drawer-menu-item" :class="{ active: activeTab === 'logs' }" @click="switchTab('logs')">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <span>{{ t("realtimeLogs") }}</span>
                </button>
                <div class="drawer-divider"></div>
                <button class="drawer-menu-item" @click="toggleLanguage">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="m5 8 6 6" />
                        <path d="m4 14 6-6 2-3" />
                        <path d="M2 5h12" />
                        <path d="M7 2h1" />
                        <path d="m22 22-5-10-5 10" />
                        <path d="M14 18h6" />
                    </svg>
                    <span>{{ t("switchLanguage") }}</span>
                </button>
                <button class="drawer-menu-item logout-button" @click="handleLogout">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>{{ t("logout") }}</span>
                </button>
            </div>
        </el-drawer>

        <main class="content-area">
            <transition name="fade-slide" mode="out-in">
                <div v-if="activeTab === 'home'" key="home" class="view-container">
                    <header class="page-header">
                        <h1>{{ t("statusHeading") }}</h1>
                    </header>
                    <div v-if="state.loading" class="loading-state">
                        <div class="loading-spinner"></div>
                        <p>{{ tf("loadingStatus", "Loading status...") }}</p>
                    </div>
                    <div v-else class="dashboard-grid">
                        <!-- System Overview Card -->
                        <section class="status-card">
                            <h3 class="card-title">
                                <IconActivity
                                    :size="18"
                                    :stroke-width="1.5"
                                    style="margin-right: 8px; vertical-align: text-bottom"
                                />
                                {{ t("serviceStatus") }}
                                <span
                                    class="dot"
                                    :class="state.serviceConnected ? 'status-running' : 'status-error'"
                                    style="display: inline-block; vertical-align: middle; margin-left: 8px"
                                ></span>
                            </h3>
                            <div class="status-list">
                                <div class="status-item">
                                    <span class="label">
                                        <IconServer :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        {{ t("serviceConnection") }} </span
                                    ><span class="value status-text-bold" :class="serviceConnectedClass">{{
                                        serviceConnectedText
                                    }}</span>
                                </div>
                                <div v-if="state.serviceConnected" class="status-item">
                                    <span class="label">
                                        <IconCloud :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        {{ t("browserConnection") }} </span
                                    ><span class="value status-text-bold" :class="browserConnectedClass">{{
                                        browserConnectedText
                                    }}</span>
                                </div>
                                <div v-if="state.serviceConnected" class="status-item">
                                    <span class="label">
                                        <IconUserCheck :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        {{ tf("activeSessionsLabel", "Active Sessions") }} </span
                                    ><span class="value">{{ activeSessionCount }} / {{ sessions.length }}</span>
                                </div>
                                <div class="status-item status-item-ws-endpoint">
                                    <span class="label">
                                        <IconColumns :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        <span>{{ t("wsEndpointLabel") }}</span> </span
                                    ><span class="value mono value-copy-wrap">
                                        <span
                                            class="clickable-version clickable-copy-value"
                                            :title="t('copy')"
                                            @click="copyBrowserWsEndpoint"
                                        >
                                            {{ browserWsEndpointText }}
                                            <span class="copy-icon">
                                                <IconCopy :size="14" :stroke-width="1.5" />
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <div v-if="state.serviceConnected" class="status-item">
                                    <span class="label">
                                        <IconSliders :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        <span>
                                            {{ tf("selectionStrategyLabel", "Selection Strategy") }}
                                            <EnvVarTooltip env-var="ROUND" doc-section="proxy-config" />
                                        </span> </span
                                    ><span class="value mono status-text-bold">{{ selectionStrategyText }}</span>
                                </div>
                                <div v-if="state.serviceConnected" class="status-item">
                                    <span class="label">
                                        <IconAlertTriangle :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        <span>
                                            {{ tf("errorThresholdLabel", "Error Threshold") }}
                                            <EnvVarTooltip
                                                env-var="SESSION_ERROR_THRESHOLD"
                                                doc-section="proxy-config"
                                            />
                                        </span> </span
                                    ><span :class="sessionErrorThresholdClass">{{ sessionErrorThresholdText }}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                    <section v-if="state.serviceConnected" class="full-width-section">
                        <div class="status-card">
                            <div class="section-header">
                                <h3 class="card-title card-title-tight">
                                    <IconUsers
                                        :size="18"
                                        :stroke-width="1.5"
                                        style="margin-right: 8px; vertical-align: text-bottom"
                                    />
                                    {{ tf("browserSessionsHeading", "Browser Sessions") }}
                                </h3>
                                <div class="section-actions">
                                    <a
                                        class="status-link"
                                        :href="state.sharePageUrl || '#'"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {{ t("newSessionLinkLabel") }}
                                    </a>
                                </div>
                            </div>
                            <div v-if="sessions.length === 0" class="empty-state">
                                {{ tf("noBrowserSessions", "No browser sessions are currently connected.") }}
                            </div>
                            <div v-else class="session-list">
                                <div v-for="session in sessions" :key="session.connectionId" class="session-row">
                                    <div class="session-main">
                                        <div
                                            class="session-id"
                                            :title="`${tf('browserIdentifierLabel', 'Browser Tag')}: ${sessionDisplayDetail(session)}`"
                                        >
                                            {{ sessionDisplayName(session) }}
                                        </div>
                                        <div class="session-meta">
                                            <span
                                                >{{ tf("connectedAtLabel", "Connected At") }}:
                                                {{ formatTime(session.connectedAt) }}</span
                                            >
                                            <span class="mono session-ip">
                                                {{ tf("ipAddressLabel", "IP") }}:
                                                {{ sessionAddress(session) }}
                                            </span>
                                            <span :title="sessionUserAgent(session)">
                                                {{ tf("browserModelLabel", "Browser / OS") }}:
                                                {{ sessionBrowser(session) }}
                                            </span>
                                            <span
                                                v-if="sessionLastErrorText(session)"
                                                class="status-error session-last-error"
                                            >
                                                {{ tf("lastErrorLabel", "Last Error") }}:
                                                {{ sessionLastErrorText(session) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="session-side">
                                        <button
                                            v-if="session.disabledAt"
                                            type="button"
                                            class="session-badge session-badge-button status-error"
                                            :title="
                                                tf(
                                                    'sessionResetActionHint',
                                                    'Click to mark this session healthy again and clear errors.'
                                                )
                                            "
                                            @click="handleSessionStatusClick(session)"
                                        >
                                            {{ tf("disabledLabel", "Disabled") }}
                                        </button>
                                        <span v-else class="session-badge status-ok">
                                            {{ tf("onlineLabel", "Online") }}
                                        </span>
                                        <span class="mono"
                                            >{{ tf("usageCount", "Usage Count") }} {{ session.usageCount || 0 }}</span
                                        >
                                        <span class="mono"
                                            >{{ tf("errorsLabel", "Errors") }} {{ session.failureCount || 0 }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div v-else-if="activeTab === 'settings'" key="settings" class="view-container">
                    <header class="page-header">
                        <h1>{{ t("settings") }}</h1>
                    </header>
                    <div class="dashboard-grid settings-grid">
                        <div class="status-card">
                            <h3 class="card-title">
                                <IconInfo
                                    :size="18"
                                    :stroke-width="1.5"
                                    style="margin-right: 8px; vertical-align: text-bottom"
                                />
                                {{ t("versionInfo") }}
                            </h3>
                            <div class="status-list">
                                <div class="status-item">
                                    <span class="label">
                                        <IconGithub
                                            :size="14"
                                            :stroke-width="1.5"
                                            style="margin-right: 6px; vertical-align: middle"
                                        />
                                        GitHub {{ t("repo") }}
                                    </span>
                                    <a href="https://github.com/iBUHub/CanvasToAPI" target="_blank" class="repo-link">
                                        iBUHub/CanvasToAPI
                                    </a>
                                </div>
                                <div class="status-item">
                                    <span class="label">
                                        <IconBookmark
                                            :size="14"
                                            :stroke-width="1.5"
                                            style="margin-right: 6px; vertical-align: middle"
                                        />
                                        {{ t("currentVersion") }}
                                    </span>
                                    <span class="value">
                                        <span class="clickable-version" :title="t('copy')" @click="copyAppVersion">
                                            {{ appVersion }}
                                            <span class="copy-icon">
                                                <IconCopy :size="14" :stroke-width="1.5" />
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <div class="status-item">
                                    <span class="label">
                                        <IconClock
                                            :size="14"
                                            :stroke-width="1.5"
                                            style="margin-right: 6px; vertical-align: middle"
                                        />
                                        <span>
                                            {{ t("latestVersion") }}
                                            <EnvVarTooltip env-var="CHECK_UPDATE" doc-section="app-config" />
                                        </span>
                                    </span>
                                    <span class="value">
                                        <span
                                            v-if="state.hasUpdate"
                                            class="clickable-version"
                                            :title="t('newVersionAvailable')"
                                        >
                                            <a
                                                :href="
                                                    state.releaseUrl || 'https://github.com/iBUHub/CanvasToAPI/releases'
                                                "
                                                target="_blank"
                                                class="update-link"
                                            >
                                                {{ latestVersionFormatted }}
                                            </a>
                                            <a
                                                class="copy-icon"
                                                :href="
                                                    state.releaseUrl || 'https://github.com/iBUHub/CanvasToAPI/releases'
                                                "
                                                target="_blank"
                                                style="color: inherit; display: inline-flex"
                                            >
                                                <IconExternalLink :size="14" :stroke-width="1.5" />
                                            </a>
                                        </span>
                                        <span v-else class="clickable-version" :title="t('viewRelease')">
                                            <a
                                                href="https://github.com/iBUHub/CanvasToAPI/releases"
                                                target="_blank"
                                                style="color: inherit; text-decoration: none"
                                            >
                                                {{ latestVersionFormatted }}
                                            </a>
                                            <a
                                                class="copy-icon"
                                                href="https://github.com/iBUHub/CanvasToAPI/releases"
                                                target="_blank"
                                                style="color: inherit; display: inline-flex"
                                            >
                                                <IconExternalLink :size="14" :stroke-width="1.5" />
                                            </a>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="status-card">
                            <h3 class="card-title">
                                <IconFileText
                                    :size="18"
                                    :stroke-width="1.5"
                                    style="margin-right: 8px; vertical-align: text-bottom"
                                />
                                {{ t("log") }}
                            </h3>
                            <div class="status-list">
                                <div class="status-item">
                                    <span class="label">
                                        <IconList :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        <span>
                                            {{ t("logLevel") }}
                                            <EnvVarTooltip env-var="LOG_LEVEL" doc-section="app-config" />
                                        </span>
                                    </span>
                                    <el-select
                                        :model-value="state.debugMode"
                                        style="width: 120px"
                                        @change="handleDebugModeChange"
                                    >
                                        <el-option :label="t('normal')" :value="false" />
                                        <el-option :label="t('debug')" :value="true" />
                                    </el-select>
                                </div>
                                <div class="status-item">
                                    <span class="label">
                                        <IconMonitor :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        {{ t("logMaxCount") }}
                                    </span>
                                    <el-input-number
                                        :model-value="state.logMaxCount"
                                        :min="1"
                                        :max="1000"
                                        style="width: 120px"
                                        @change="handleLogMaxCountChange"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="status-card">
                            <h3 class="card-title">
                                <IconSun
                                    :size="18"
                                    :stroke-width="1.5"
                                    style="margin-right: 8px; vertical-align: text-bottom"
                                />
                                {{ t("appearance") }}
                            </h3>
                            <div class="status-list">
                                <div class="switch-container">
                                    <span class="label">
                                        <IconSun :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        {{ t("theme") }}
                                    </span>
                                    <el-select :model-value="theme" style="width: 150px" @update:model-value="setTheme">
                                        <el-option :label="t('followSystem')" value="auto" />
                                        <el-option :label="t('light')" value="light" />
                                        <el-option :label="t('dark')" value="dark" />
                                    </el-select>
                                </div>
                                <div class="switch-container">
                                    <span class="label">
                                        <IconGlobe :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        {{ t("language") }}
                                    </span>
                                    <el-select
                                        :model-value="state.currentLang"
                                        style="width: 150px"
                                        @change="handleLanguageChange"
                                    >
                                        <el-option label="中文" value="zh" />
                                        <el-option label="English" value="en" />
                                    </el-select>
                                </div>
                            </div>
                        </div>

                        <div class="status-card">
                            <h3 class="card-title">
                                <IconBarChart3
                                    :size="18"
                                    :stroke-width="1.5"
                                    style="margin-right: 8px; vertical-align: text-bottom"
                                />
                                {{ t("proxySettings") }}
                            </h3>
                            <div class="settings-switches">
                                <div class="switch-container">
                                    <span class="label">
                                        <IconZap
                                            :size="14"
                                            :stroke-width="1.5"
                                            style="margin-right: 6px; vertical-align: middle"
                                        />
                                        {{ t("streamingMode") }}
                                    </span>
                                    <el-switch
                                        :model-value="state.streamingMode === 'real'"
                                        inline-prompt
                                        :width="50"
                                        :active-text="t('real')"
                                        :inactive-text="t('fake')"
                                        @change="handleStreamingModeChange"
                                    />
                                </div>
                                <div class="switch-container">
                                    <span class="label">
                                        <IconBrain
                                            :size="14"
                                            :stroke-width="1.5"
                                            style="margin-right: 6px; vertical-align: middle"
                                        />
                                        {{ t("forceThinking") }}
                                    </span>
                                    <el-switch
                                        :model-value="state.forceThinking"
                                        :width="50"
                                        @change="
                                            value =>
                                                handleBooleanSettingChange('force-thinking', value, state.forceThinking)
                                        "
                                    />
                                </div>
                                <div class="switch-container">
                                    <span class="label">
                                        <IconGlobe
                                            :size="14"
                                            :stroke-width="1.5"
                                            style="margin-right: 6px; vertical-align: middle"
                                        />
                                        {{ t("forceWebSearch") }}
                                    </span>
                                    <el-switch
                                        :model-value="state.forceWebSearch"
                                        :width="50"
                                        @change="
                                            value =>
                                                handleBooleanSettingChange(
                                                    'force-web-search',
                                                    value,
                                                    state.forceWebSearch
                                                )
                                        "
                                    />
                                </div>
                                <div class="switch-container">
                                    <span class="label">
                                        <IconLink
                                            :size="14"
                                            :stroke-width="1.5"
                                            style="margin-right: 6px; vertical-align: middle"
                                        />
                                        {{ t("forceUrlContext") }}
                                    </span>
                                    <el-switch
                                        :model-value="state.forceUrlContext"
                                        :width="50"
                                        @change="
                                            value =>
                                                handleBooleanSettingChange(
                                                    'force-url-context',
                                                    value,
                                                    state.forceUrlContext
                                                )
                                        "
                                    />
                                </div>
                                <div class="switch-container">
                                    <span class="label">
                                        <IconSliders :size="14" :stroke-width="1.5" style="margin-right: 6px" />
                                        {{ tf("selectionStrategyLabel", "Selection Strategy") }}
                                    </span>
                                    <el-select
                                        :model-value="state.selectionStrategy"
                                        style="width: 150px"
                                        @change="handleSelectionStrategyChange"
                                    >
                                        <el-option :label="t('selectionStrategyRound')" value="round" />
                                        <el-option :label="t('selectionStrategyRandom')" value="random" />
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else key="logs" class="view-container logs-view-container">
                    <header class="page-header page-header-split">
                        <h1>{{ t("realtimeLogs") }} ({{ state.logCount }})</h1>
                        <button class="btn-icon" :title="t('downloadLogs')" @click="downloadLogs">
                            <IconDownload :size="18" :stroke-width="1.5" />
                            <span>{{ t("downloadLogs") }}</span>
                        </button>
                    </header>
                    <div class="status-card logs-card">
                        <pre id="log-container" v-html="formattedLogs"></pre>
                    </div>
                </div>
            </transition>
        </main>

        <el-affix
            :offset="90"
            position="bottom"
            class="mobile-only"
            style="position: fixed; right: 0; bottom: calc(90px + env(safe-area-inset-bottom, 0px)); z-index: 999"
        >
            <div class="floating-actions" :class="{ 'is-expanded': state.floatingActionsExpanded }">
                <button
                    class="floating-btn toggle-btn primary-btn"
                    :class="{ 'is-active': state.floatingActionsExpanded }"
                    :title="state.floatingActionsExpanded ? t('collapse') : t('expand')"
                    @click="state.floatingActionsExpanded = !state.floatingActionsExpanded"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <button class="floating-btn logout-button secondary-btn" :title="t('logout')" @click="handleLogout">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
                <button
                    class="floating-btn lang-switcher secondary-btn"
                    :title="t('switchLanguage')"
                    @click="toggleLanguage"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="m5 8 6 6" />
                        <path d="m4 14 6-6 2-3" />
                        <path d="M2 5h12" />
                        <path d="M7 2h1" />
                        <path d="m22 22-5-10-5 10" />
                        <path d="M14 18h6" />
                    </svg>
                </button>
            </div>
        </el-affix>
    </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import EnvVarTooltip from "../components/EnvVarTooltip.vue";
import I18n from "../utils/i18n";
import escapeHtml from "../utils/escapeHtml";
import { useTheme } from "../utils/useTheme";
import {
    IconActivity,
    IconAlertTriangle,
    IconBookmark,
    IconClock,
    IconCloud,
    IconColumns,
    IconCopy,
    IconDownload,
    IconExternalLink,
    IconFileText,
    IconGlobe,
    IconInfo,
    IconList,
    IconMonitor,
    IconServer,
    IconSliders,
    IconSun,
    IconUserCheck,
    IconUsers,
} from "../components/icons";

const router = useRouter();
const activeTab = ref("home");
const mobileMenuOpen = ref(false);
const sessions = ref([]);
const updateTimer = ref(null);
const langVersion = ref(I18n.state.version);
const { theme, setTheme } = useTheme();

const state = reactive({
    browserWsPath: "/ws",
    currentLang: I18n.getLang(),
    currentVersion: "",
    debugMode: false,
    floatingActionsExpanded: false,
    forceThinking: false,
    forceUrlContext: false,
    forceWebSearch: false,
    hasUpdate: false,
    latestVersion: "",
    loading: true,
    logCount: 0,
    logMaxCount: 100,
    logs: "",
    logScrollTop: 0,
    maxRetries: 3,
    releaseUrl: "",
    selectionStrategy: "round",
    serviceConnected: false,
    sessionErrorThreshold: 3,
    sharePageUrl: "",
    streamingMode: "fake",
});
const t = (key, options) => (langVersion.value, I18n.t(key, options));
const tf = (key, fallback) => t(key, { fallback });
const appVersion = computed(() => {
    const version = state.currentVersion || (typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev");
    if (/^\d/.test(version)) {
        return `v${version}`;
    }
    if (version.startsWith("preview")) {
        return version.charAt(0).toUpperCase() + version.slice(1);
    }
    return version;
});
const latestVersionFormatted = computed(() => {
    const version =
        state.latestVersion ||
        state.currentVersion ||
        (typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev");
    if (/^\d/.test(version)) {
        return `v${version}`;
    }
    if (version.startsWith("preview")) {
        return version.charAt(0).toUpperCase() + version.slice(1);
    }
    return version;
});
const highlightLogLevel = (content, level, color) =>
    content.replace(
        new RegExp(`(^|\\r?\\n)(\\[${level}\\])(?=\\s)`, "g"),
        `$1<span style="color: ${color}; font-weight: bold;">$2</span>`
    );
const formattedLogs = computed(() => {
    let safeLogs = escapeHtml(state.logs || t("loading"));

    safeLogs = highlightLogLevel(safeLogs, "DEBUG", "#3498db");
    safeLogs = highlightLogLevel(safeLogs, "WARN", "#f39c12");
    safeLogs = highlightLogLevel(safeLogs, "ERROR", "#e74c3c");

    return safeLogs;
});
computed(() => [
    { label: t("followSystem"), value: "auto" },
    { label: t("light"), value: "light" },
    { label: t("dark"), value: "dark" },
]);
const activeSessionCount = computed(() => sessions.value.filter(session => !session.disabledAt).length);
const sessionErrorThresholdText = computed(() =>
    state.sessionErrorThreshold > 0 ? String(state.sessionErrorThreshold) : t("disabled")
);
const sessionErrorThresholdClass = computed(() =>
    state.sessionErrorThreshold > 0 ? "value" : "value status-text-bold status-error"
);
const serviceConnectedText = computed(() => (state.serviceConnected ? t("running") : t("disconnected")));
const serviceConnectedClass = computed(() => (state.serviceConnected ? "status-ok" : "status-error"));
const browserConnectedText = computed(() =>
    activeSessionCount.value > 0 ? t("connected", { fallback: "Connected" }) : t("disconnected")
);
const browserConnectedClass = computed(() => (activeSessionCount.value > 0 ? "status-ok" : "status-error"));
const browserWsEndpointText = computed(() => {
    if (typeof window === "undefined") {
        return state.browserWsPath || "/ws";
    }

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${window.location.host}${state.browserWsPath || "/ws"}`;
});
const selectionStrategyText = computed(() =>
    state.selectionStrategy === "random" ? t("selectionStrategyRandom") : t("selectionStrategyRound")
);
const formatTime = value => (value ? new Date(value).toLocaleString() : "-");
const sessionAddress = session => session?.meta?.address || session?.meta?.ip || session?.meta?.host || "unknown";
const sessionClientLabel = session => session?.meta?.clientLabel || "";
const sessionDisplayName = session => sessionClientLabel(session) || session?.connectionId || "unknown";
const sessionDisplayDetail = session => {
    const clientLabel = sessionClientLabel(session);
    const connectionId = session?.connectionId || "";

    if (clientLabel && connectionId) {
        return `${clientLabel} (${connectionId})`;
    }

    return clientLabel || connectionId || "unknown";
};
const sessionUserAgent = session => session?.meta?.userAgent || "";
const parseBrowserInfo = userAgent => {
    if (!userAgent) {
        return "unknown";
    }

    const browserMatchers = [
        { name: "Edge", pattern: /Edg\/(\d+)/i },
        { name: "Opera", pattern: /OPR\/(\d+)/i },
        { name: "Firefox", pattern: /Firefox\/(\d+)/i },
        { name: "Chrome", pattern: /Chrome\/(\d+)/i },
        { name: "Safari", pattern: /Version\/(\d+).+Safari/i },
    ];
    const platformMatchers = [
        { name: "Windows", pattern: /Windows/i },
        { name: "macOS", pattern: /Mac OS X|Macintosh/i },
        { name: "Linux", pattern: /Linux/i },
        { name: "Android", pattern: /Android/i },
        { name: "iPhone", pattern: /iPhone/i },
        { name: "iPad", pattern: /iPad/i },
    ];

    const browserMatch = browserMatchers.find(({ pattern }) => pattern.test(userAgent));
    const platformMatch = platformMatchers.find(({ pattern }) => pattern.test(userAgent));
    const browserVersion = browserMatch ? userAgent.match(browserMatch.pattern)?.[1] : "";
    const browserName = browserMatch ? `${browserMatch.name}${browserVersion ? ` ${browserVersion}` : ""}` : "";
    const platformName = platformMatch?.name || "";

    if (browserName && platformName) {
        return `${browserName} / ${platformName}`;
    }
    return browserName || platformName || "unknown";
};
const sessionBrowser = session => parseBrowserInfo(sessionUserAgent(session));
const sessionLastErrorText = session => {
    if (!session?.lastError) {
        return "";
    }
    if (typeof session.lastError === "string") {
        return session.lastError;
    }
    return session.lastError.message || session.lastError.type || "";
};
const fallbackCopyText = text => {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(tempInput);
    return copied;
};
const copyText = async text => {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
        } else if (!fallbackCopyText(text)) {
            throw new Error("Clipboard API unavailable");
        }
        ElMessage.success(`${t("copySuccess")}: ${text}`);
    } catch (error) {
        console.error("Failed to copy:", error);
        ElMessage.error(t("copyFailed"));
    }
};
const copyAppVersion = () => copyText(appVersion.value);
const copyBrowserWsEndpoint = () => copyText(browserWsEndpointText.value);

const applyStatusPayload = payload => {
    const status = payload?.status || {};
    state.sessionErrorThreshold = Number.isFinite(Number(status.sessionErrorThreshold))
        ? Number(status.sessionErrorThreshold)
        : 3;
    state.debugMode = Boolean(status.debugMode);
    state.forceThinking = Boolean(status.forceThinking);
    state.forceUrlContext = Boolean(status.forceUrlContext);
    state.forceWebSearch = Boolean(status.forceWebSearch);
    state.logCount = Number(payload?.logCount || 0);
    state.logMaxCount = Number(status.logMaxCount || 100);
    state.logs = payload?.logs || "";
    state.maxRetries = Number(status.maxRetries || 3);
    state.selectionStrategy = status.selectionStrategy || "round";
    state.serviceConnected = Boolean(status.serviceConnected);
    state.streamingMode = status.streamingMode || "fake";
    state.browserWsPath = status.browserWsPath || "/ws";
    state.sharePageUrl = status.sharePageUrl || "";
    sessions.value = Array.isArray(status.browserSessions) ? status.browserSessions : [];
};

const fetchVersionInfo = async () => {
    try {
        const response = await fetch("/api/version/check");
        if (!response.ok) {
            return;
        }

        const data = await response.json();
        state.currentVersion = data.current || "";
        state.hasUpdate = Boolean(data.hasUpdate);
        state.latestVersion = data.latest || "";
        state.releaseUrl = data.releaseUrl || "";
    } catch {
        state.hasUpdate = false;
    }
};

const refresh = async () => {
    try {
        const logContainer = activeTab.value === "logs" ? document.getElementById("log-container") : null;
        if (logContainer) {
            state.logScrollTop = logContainer.scrollTop;
        }

        const response = await fetch("/api/status");
        if (response.redirected) {
            window.location.href = response.url;
            return;
        }
        if (response.status === 401) {
            window.location.href = "/login";
            return;
        }
        if (!response.ok) throw new Error(`status ${response.status}`);
        applyStatusPayload(await response.json());
        state.loading = false;
        if (activeTab.value === "logs") {
            nextTick(() => {
                const updatedLogContainer = document.getElementById("log-container");
                if (updatedLogContainer) {
                    updatedLogContainer.scrollTop = state.logScrollTop || 0;
                }
            });
        }
    } catch (error) {
        state.serviceConnected = false;
        state.loading = false;
    }
};
const switchTab = tabName => {
    mobileMenuOpen.value = false; // Close mobile menu when switching tabs
    if (activeTab.value === "logs") {
        const logContainer = document.getElementById("log-container");
        if (logContainer) {
            state.logScrollTop = logContainer.scrollTop;
        }
    }

    activeTab.value = tabName;

    if (tabName === "logs") {
        nextTick(() => {
            const logContainer = document.getElementById("log-container");
            if (logContainer) {
                logContainer.scrollTop = state.logScrollTop || 0;
            }
        });
    }
};

const readJsonSafely = async response => {
    try {
        return await response.json();
    } catch {
        return {};
    }
};

const getSettingLabel = setting => {
    const settingLabelMap = {
        "debug-mode": t("logLevel"),
        "force-thinking": t("forceThinking"),
        "force-url-context": t("forceUrlContext"),
        "force-web-search": t("forceWebSearch"),
        "log-max-count": t("logMaxCount"),
        "selection-strategy": t("selectionStrategyLabel"),
        "streaming-mode": t("streamingMode"),
    };
    return settingLabelMap[setting] || setting;
};

const getSettingValueLabel = (setting, value) => {
    if (setting === "streaming-mode" && typeof value === "string") {
        return t(value);
    }

    if (setting === "debug-mode" && typeof value === "string") {
        return t(value);
    }

    if (setting === "selection-strategy" && typeof value === "string") {
        const selectionStrategyKeyMap = {
            random: "selectionStrategyRandom",
            round: "selectionStrategyRound",
        };
        return t(selectionStrategyKeyMap[value] || value);
    }

    if (typeof value === "boolean") {
        return t(value ? "enabled" : "disabled");
    }

    if (value === undefined || value === null || value === "") {
        return "";
    }

    return String(value);
};

const postSetting = async (setting, body = {}) => {
    try {
        const response = await fetch(`/api/settings/${setting}`, {
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
            method: "PUT",
        });
        const data = await readJsonSafely(response);

        if (!response.ok) {
            const errorMessage = data.error || data.message || `setting ${setting} failed`;
            ElMessage.error(t("settingFailed", { message: errorMessage }));
            return false;
        }

        await refresh();

        if (data.message === "settingUpdateSuccess") {
            ElMessage.success(
                t("settingUpdateSuccess", {
                    setting: getSettingLabel(setting),
                    value: getSettingValueLabel(setting, data.value),
                })
            );
        }

        return true;
    } catch (error) {
        ElMessage.error(t("settingFailed", { message: error.message || error }));
        return false;
    }
};

const toggleStreamingMode = () =>
    postSetting("streaming-mode", { mode: state.streamingMode === "real" ? "fake" : "real" });
const toggleFlag = setting => postSetting(setting);
const confirmExperimentalToggle = async messageKey => {
    try {
        await ElMessageBox.confirm(t(messageKey), t("warningTitle"), {
            cancelButtonText: t("cancel"),
            confirmButtonText: t("ok"),
            type: "warning",
        });
        return true;
    } catch {
        return false;
    }
};
const handleStreamingModeChange = async value => {
    if ((state.streamingMode === "real") !== value) {
        if (value) {
            const confirmed = await confirmExperimentalToggle("streamingModeEnableConfirm");
            if (!confirmed) {
                return false;
            }
        }
        return toggleStreamingMode();
    }
    return true;
};
const handleSelectionStrategyChange = async value => {
    if (value && value !== state.selectionStrategy) {
        await postSetting("selection-strategy", { strategy: value });
    }
};
const handleBooleanSettingChange = async (setting, value, currentValue) => {
    if (value !== currentValue) {
        if (setting === "force-web-search" && value) {
            const confirmed = await confirmExperimentalToggle("forceWebSearchEnableConfirm");
            if (!confirmed) {
                return false;
            }
        }
        return toggleFlag(setting);
    }
    return true;
};
const handleDebugModeChange = value => {
    if (value !== state.debugMode) {
        return toggleFlag("debug-mode");
    }
    return true;
};
const handleLogMaxCountChange = async value => {
    if (!value || value === state.logMaxCount) {
        return true;
    }

    return postSetting("log-max-count", { count: value });
};
const resetSessionHealth = async session => {
    const sessionId = session?.connectionId;
    const response = await fetch(`/api/sessions/${encodeURIComponent(sessionId)}/reset-health`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
    });
    if (!response.ok) {
        throw new Error(`session reset failed (${response.status})`);
    }
    await refresh();
    ElMessage.success(
        t("sessionResetSuccess", {
            fallback: `Session ${sessionDisplayName(session)} restored successfully.`,
            session: sessionDisplayName(session),
        })
    );
};
const handleSessionStatusClick = async session => {
    if (!session?.disabledAt || !session?.connectionId) {
        return;
    }

    const sessionName = sessionDisplayName(session);

    try {
        await ElMessageBox.confirm(
            t("sessionResetConfirm", {
                fallback: `Mark session ${sessionName} healthy again and clear its error state?`,
                session: sessionName,
            }),
            t("warningTitle"),
            {
                cancelButtonText: t("cancel"),
                confirmButtonText: t("ok"),
                type: "warning",
            }
        );
    } catch {
        return;
    }

    await resetSessionHealth(session);
};
const handleLanguageChange = async value => {
    await I18n.setLang(value);
    state.currentLang = value;
    langVersion.value = I18n.state.version;
};
const toggleLanguage = () => handleLanguageChange(state.currentLang === "en" ? "zh" : "en");
const downloadLogs = () => {
    const blob = new Blob([state.logs || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const now = new Date();
    link.href = url;
    link.download = `CanvasProxy_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}_${state.logCount}.log`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
const handleLogout = () =>
    ElMessageBox.confirm(t("logoutConfirm"), {
        cancelButtonText: t("cancel"),
        confirmButtonText: t("ok"),
        type: "warning",
    })
        .then(async () => {
            await fetch("/logout", { method: "POST" });
            router.push("/login");
        })
        .catch(() => {});
const scheduleNextUpdate = () => {
    updateTimer.value = window.setTimeout(async () => {
        await refresh();
        scheduleNextUpdate();
    }, 3000);
};

onMounted(async () => {
    I18n.onChange(() => {
        state.currentLang = I18n.getLang();
        langVersion.value = I18n.state.version;
    });
    await refresh();
    await fetchVersionInfo();
    scheduleNextUpdate();
});
onBeforeUnmount(() => {
    if (updateTimer.value) clearTimeout(updateTimer.value);
});
watchEffect(() => {
    document.title = t("statusTitle");
});
</script>

<style lang="less" scoped>
@import "../styles/variables.less";
.main-layout {
    display: flex;
    min-height: 100vh;
    background: @background-light;
}
.mobile-header {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: @background-white;
    border-bottom: 1px solid @border-light;
    padding: 0 16px;
    align-items: center;
    gap: 16px;
    z-index: 90;
}
.hamburger-button {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @text-secondary;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background: transparent;
}
.hamburger-button:hover {
    background: @background-light;
    color: @primary-color;
}
.mobile-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: @text-primary;
    margin: 0;
}
.sidebar {
    width: 60px;
    background: @background-white;
    border-right: 1px solid @border-light;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0;
    align-items: center;
    position: fixed;
    height: 100vh;
    z-index: 100;
}
.sidebar-menu,
.sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
}
.menu-item {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: @text-secondary;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background: transparent;
}
.menu-item:hover {
    background: @background-light;
    color: @primary-color;
}
.menu-item.active {
    background: @primary-color;
    color: @text-on-primary;
    box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}
.menu-item svg {
    fill: none;
}
.menu-item.logout-button:hover {
    color: @error-color;
    background: rgba(var(--color-error-rgb), 0.1);
}
.content-area {
    flex: 1;
    margin-left: 60px;
    padding: 2rem;
    min-width: 0;
}
.page-header {
    margin-bottom: 2rem;
}
.page-header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: @text-primary;
    display: flex;
    align-items: center;
    gap: 10px;
}
.page-header-split {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}
.view-container {
    animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
/* Tab transition animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}
.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}
.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
.dashboard-grid {
    display: grid;
    gap: 24px;
    width: 100%;
    align-items: stretch;
}
@media (max-width: 599px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}
@media (min-width: 600px) and (max-width: 1023px) {
    .dashboard-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (min-width: 1024px) {
    .dashboard-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
.full-width-section {
    margin-top: 24px;
    width: 100%;
}
.status-card {
    display: flex;
    flex-direction: column;
    background: @background-white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: @shadow-light;
    border: 1px solid @border-light;
    min-width: 0;
    height: 100%;
    box-sizing: border-box;
}
.card-title {
    font-size: 0.9rem;
    color: @text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    margin-bottom: 20px;
    border-bottom: 1px solid @border-light;
    padding-bottom: 15px;
}
.card-title-tight {
    margin-bottom: 0;
}
.section-header {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
}
.section-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-end;
}
.status-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.settings-switches {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.session-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;
    min-height: 32px;
}

.switch-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;
    min-height: 32px;
}

.session-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
}
.label,
.session-meta {
    color: @text-secondary;
    display: inline-flex;
    align-items: center;
}
.label svg {
    flex-shrink: 0;
    fill: none;
    transform: translateY(1px);
}
.label-note {
    color: @text-secondary;
    font-size: 0.8em;
    font-weight: 400;
    margin-left: 4px;
}
.value {
    color: @text-primary;
    font-weight: 500;
    font-family: @font-family-mono;
}
.status-item-ws-endpoint {
    align-items: flex-start;
    gap: 12px;
}
.value-copy-wrap {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    justify-content: flex-end;
    text-align: right;
}
.clickable-copy-value {
    max-width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
    text-align: right;
    white-space: normal;
    word-break: break-all;
}
.mono {
    font-family: @font-family-mono;
}
.status-ok {
    color: @success-color;
}
.status-warning {
    color: @warning-color;
}
.status-error {
    color: @error-color;
}
.status-text-bold {
    font-weight: 700 !important;
    opacity: 1 !important;
}
.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: @border-color;
}
.dot.status-running {
    background-color: @success-color;
    box-shadow: 0 0 8px @success-color;
}
.dot.status-error {
    background-color: @error-color;
}
.action-btn {
    border: 1px solid @border-color;
    border-radius: 10px;
    background: @background-white;
    color: @text-primary;
    cursor: pointer;
    padding: 8px 14px;
    transition: all 0.2s;
}
.status-link {
    color: @primary-color;
    text-decoration: none;
    font-weight: 500;
}
.status-link:hover {
    text-decoration: underline;
}
.repo-link {
    color: @primary-color;
    text-decoration: none;
    font-weight: 500;
}
.repo-link:hover {
    text-decoration: underline;
}
.update-link {
    color: @error-color;
    text-decoration: none;
    font-weight: 700;
}
.update-link:hover {
    text-decoration: none;
}
.clickable-version,
.version-align {
    display: inline-flex;
    align-items: center;
    gap: 0;
}
.clickable-version {
    cursor: pointer;
    transition: color 0.2s;
}
.clickable-version:hover {
    color: @primary-color;
}
.clickable-version:hover .copy-icon {
    opacity: 1;
}
.copy-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
}
.action-btn:hover {
    border-color: @primary-color;
    color: @primary-color;
}
.action-btn-secondary:hover {
    border-color: @warning-color;
    color: @warning-color;
}
.btn-icon {
    padding: 8px;
    border-radius: 8px;
    background: var(--bg-card);
    border: 1px solid var(--border-light);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-primary);
    transition: all 0.2s;
}
.btn-icon:hover {
    border-color: @primary-color;
    color: @primary-color;
}
.btn-icon span {
    font-size: 0.9rem;
    font-weight: 500;
}
.session-row {
    padding: 14px 16px;
    border-radius: 8px;
    background: @background-light;
    border: 1px solid transparent;
    transition: all 0.2s;
}
.session-row:hover {
    background: var(--bg-list-item-hover);
}
.session-row .status-ok,
.session-row .status-error {
    font-weight: 600;
}
.session-main {
    min-width: 0;
    flex: 1;
}
.session-id {
    color: @text-primary;
    margin-bottom: 6px;
    font-weight: 700;
    word-break: break-word;
}
.session-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    font-size: 0.9rem;
}
.session-meta > span {
    min-width: 0;
    line-height: 1;
}
.session-ip {
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
    line-height: 1;
}
.session-last-error {
    flex: 1 1 100%;
    display: block;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
    line-height: 1;
}
.session-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    flex-shrink: 0;
    white-space: nowrap;
    text-align: right;
}
.session-badge {
    font-weight: 700;
    font-size: 0.75rem;
    padding: 2px 8px;
    border-radius: 12px;
    color: @text-on-primary;
}
.session-badge-button {
    border: none;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;
}
.session-badge-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(var(--color-error-rgb), 0.18);
}
.session-badge.status-ok {
    background: @success-color;
}
.session-badge.status-error {
    background: @error-color;
}
.empty-state {
    padding: 24px;
    text-align: center;
    color: @text-secondary;
    font-size: 0.9rem;
}
.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    color: @text-secondary;
    gap: 16px;
}
.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid @border-light;
    border-top-color: @primary-color;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.logs-view-container {
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.logs-view-container .page-header {
    flex-shrink: 0;
    margin-bottom: 20px;
}
.logs-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
    padding: 0;
    margin-bottom: 0;
}
#log-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    margin: 0;
    background: @background-white;
    color: @text-primary;
    font-family: @font-family-mono;
    font-size: 0.85rem;
    line-height: 1.5;
    border-radius: 0 0 16px 16px;
    white-space: pre-wrap;
    word-break: break-all;
    max-width: 100%;
    width: 100%;
}
.mobile-only {
    display: block;
}
.floating-actions {
    align-items: flex-end;
    display: flex;
    flex-direction: column-reverse;
    gap: 12px;
    transition: all @transition-normal;
}
.floating-actions:not(.is-expanded) {
    opacity: 0.5;
    transform: translateX(15px);
}
.floating-actions:not(.is-expanded):hover {
    opacity: 1;
    transform: translateX(0);
}
.floating-actions.is-expanded {
    opacity: 1;
    transform: translateX(-30px);
}
.floating-btn {
    align-items: center;
    backdrop-filter: blur(10px);
    background: @affix-button-bg;
    border: 1px solid @affix-button-border;
    border-radius: @border-radius-circle 0 0 @border-radius-circle;
    box-shadow: @affix-button-shadow;
    cursor: pointer;
    display: flex;
    height: @affix-button-size;
    justify-content: center;
    position: relative;
    transition: all @transition-normal;
    width: @affix-button-size;
    z-index: 1;
}
.floating-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
.floating-btn svg {
    display: block;
    width: 24px;
    height: 24px;
    fill: none;
    transition: transform @transition-normal;
}
.floating-btn.secondary-btn {
    opacity: 0;
    transform: translateY(20px) scale(0.5);
    pointer-events: none;
    visibility: hidden;
    border-radius: @border-radius-circle;
}
.floating-btn.lang-switcher {
    color: @text-secondary;
}
.floating-btn.lang-switcher:hover:not(:disabled) {
    background: @primary-color;
    box-shadow: @affix-button-hover-shadow;
    color: @background-white;
    transform: scale(1.05);
}
.floating-btn.logout-button {
    color: @text-secondary;
}
.floating-btn.logout-button:hover:not(:disabled) {
    background: @error-color;
    box-shadow: @affix-button-hover-shadow;
    color: @background-white;
    transform: scale(1.05);
}
.floating-btn.toggle-btn {
    color: @text-secondary;
    z-index: 2;
}
.floating-btn.toggle-btn:hover:not(:disabled) {
    background: @background-white;
    color: @primary-color;
}
.floating-btn.toggle-btn.is-active {
    background: @primary-color;
    color: @text-on-primary;
    border-radius: @border-radius-circle;
}
.floating-btn.toggle-btn.is-active svg {
    transform: rotate(45deg);
}
.floating-actions.is-expanded .secondary-btn {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
    visibility: visible;
}
@media (max-width: 767px) {
    .mobile-header {
        display: flex;
    }
    .desktop-only {
        display: none !important;
    }
    .content-area {
        margin-left: 0;
        margin-top: 60px;
        padding: 16px;
        padding-bottom: 32px;
    }
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
    .logs-view-container {
        height: calc(100vh - 106px);
    }
    .session-row {
        flex-direction: column;
        align-items: flex-start;
    }
    .session-side {
        align-items: flex-start;
    }
}
@media (min-width: 768px) {
    .mobile-only {
        display: none !important;
    }
}
.drawer-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.drawer-menu-item {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: @text-secondary;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background: transparent;
    font-size: 1rem;
    font-weight: 500;
}
.drawer-menu-item:hover {
    background: @background-light;
    color: @primary-color;
}
.drawer-menu-item.active {
    background: @primary-color;
    color: @text-on-primary;
    box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.3);
}
.drawer-menu-item.logout-button:hover {
    color: @error-color;
    background: rgba(var(--color-error-rgb), 0.1);
}
.drawer-divider {
    height: 1px;
    background: @border-light;
    margin: 8px 0;
}
</style>
