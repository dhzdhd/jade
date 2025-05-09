interface SidebarSettings {
    isButtonVisible: boolean;
    isSidebarVisible: boolean;
}

interface Settings {
    treeVisibility: SidebarSettings;
    tocVisibility: SidebarSettings;
    isHeaderVisible: boolean;
    isLowContrast: boolean;
}

const settings: Settings = $state({
    treeVisibility: {
        isButtonVisible: true,
        isSidebarVisible: true,
    },
    tocVisibility: {
        isButtonVisible: true,
        isSidebarVisible: true,
    },
    isHeaderVisible: true,
    isLowContrast: false,
}) satisfies Settings;

export function getSettings() {
    return settings;
}

export function toggleTreeVisibility(setting?: Partial<SidebarSettings>) {
    if (setting) {
        settings.treeVisibility.isButtonVisible = setting.isButtonVisible ?? settings.treeVisibility.isButtonVisible;
        settings.treeVisibility.isSidebarVisible = setting.isSidebarVisible ?? settings.treeVisibility.isSidebarVisible;
    } else {
        settings.treeVisibility.isButtonVisible = !settings.treeVisibility.isButtonVisible;
        settings.treeVisibility.isSidebarVisible = !settings.treeVisibility.isSidebarVisible;
    }
}

export function toggleTOCVisibility(setting?: Partial<SidebarSettings>) {
    if (setting) {
        settings.tocVisibility.isButtonVisible = setting.isButtonVisible ?? settings.tocVisibility.isButtonVisible;
        settings.tocVisibility.isSidebarVisible = setting.isSidebarVisible ?? settings.tocVisibility.isSidebarVisible;
    } else {
        settings.tocVisibility.isButtonVisible = !settings.tocVisibility.isButtonVisible;
        settings.tocVisibility.isSidebarVisible = !settings.tocVisibility.isSidebarVisible;
    }
}

export function toggleHeaderVisibility(setting?: boolean) {
    settings.isHeaderVisible = setting ?? !settings.isHeaderVisible;
}

export function toggleLowContrast(setting?: boolean) {
    settings.isLowContrast = setting ?? !settings.isLowContrast;
}