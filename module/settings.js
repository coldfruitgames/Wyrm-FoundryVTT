export const registerSettings = () => {
    game.settings.register("wyrm", "max-equip-slots", {
        name: game.i18n.localize("WYRM.Settings.MaxEquipSlots.label"),
        hint: game.i18n.localize("WYRM.Settings.MaxEquipSlots.hint"),
        scope: "world",
        config: true,
        type: Number,
        default: 10,
        requiresReload: true,
    });

    game.settings.register("wyrm", "use-gold-threshold", {
        name: game.i18n.localize("WYRM.Settings.UseGoldThreshold.label"),
        hint: game.i18n.localize("WYRM.Settings.UseGoldThreshold.hint"),
        scope: "world",
        config: true,
        type: Number,
        default: 0,
        requiresReload: true,
    });

    game.settings.register("wyrm", "use-panic", {
        name: game.i18n.localize("WYRM.Settings.UsePanic.label"),
        hint: game.i18n.localize("WYRM.Settings.UsePanic.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false,
        requiresReload: true,
    });
}