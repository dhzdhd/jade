import { PersistedState } from "runed";

interface SidebarSettings {
    isButtonVisible: boolean;
    isSidebarVisible: boolean;
}

interface Settings {
    treeVisibility: SidebarSettings;
    tocVisibility: SidebarSettings;
    isBreadcrumbVisible: boolean;
    isBottomNavVisible: boolean;
    isHeaderVisible: boolean;
    isLowContrast: boolean;
}


const settings: PersistedState<Settings> = new PersistedState("settings", {
    treeVisibility: {
        isButtonVisible: true,
        isSidebarVisible: true,
    },
    tocVisibility: {
        isButtonVisible: true,
        isSidebarVisible: true,
    },
    isBreadcrumbVisible: true,
    isBottomNavVisible: true,
    isHeaderVisible: true,
    isLowContrast: false,
}) satisfies PersistedState<Settings>;

export function getSettings() {
    return settings;
}

export function toggleTreeVisibility(setting?: Partial<SidebarSettings>) {
    if (setting) {
        settings.current = {
            ...settings.current,
            treeVisibility: {
                isButtonVisible: setting.isButtonVisible ?? settings.current.treeVisibility.isButtonVisible,
                isSidebarVisible: setting.isSidebarVisible ?? settings.current.treeVisibility.isSidebarVisible,
            },
        };
    } else {
        settings.current = {
            ...settings.current,
            treeVisibility: {
                isButtonVisible: !settings.current.treeVisibility.isButtonVisible,
                isSidebarVisible: !settings.current.treeVisibility.isSidebarVisible,
            },
        };
    }
}

export function toggleTOCVisibility(setting?: Partial<SidebarSettings>) {
    if (setting) {
        settings.current = {
            ...settings.current,
            tocVisibility: {
                isButtonVisible: setting.isButtonVisible ?? settings.current.tocVisibility.isButtonVisible,
                isSidebarVisible: setting.isSidebarVisible ?? settings.current.tocVisibility.isSidebarVisible,
            },
        };
    } else {
        settings.current = {
            ...settings.current,
            tocVisibility: {
                isButtonVisible: !settings.current.tocVisibility.isButtonVisible,
                isSidebarVisible: !settings.current.tocVisibility.isSidebarVisible,
            },
        };
    }
}

export function toggleBreadcrumbVisibility(setting?: boolean) {
    settings.current = {
        ...settings.current,
        isBreadcrumbVisible: setting ?? !settings.current.isBreadcrumbVisible
    }
}

export function toggleBottomNavVisibility(setting?: boolean) {
    settings.current = {
        ...settings.current,
        isBottomNavVisible: setting ?? !settings.current.isBottomNavVisible
    }
}

export function toggleHeaderVisibility(setting?: boolean) {
    settings.current = {
        ...settings.current,
        isHeaderVisible: setting ?? !settings.current.isHeaderVisible
    }
}


export function toggleLowContrast(setting?: boolean) {
    settings.current = {
        ...settings.current,
        isLowContrast: setting ?? !settings.current.isLowContrast
    }
}