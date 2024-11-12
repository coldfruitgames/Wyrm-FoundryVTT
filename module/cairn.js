// Import Modules
import { WyrmActor } from './actor/actor.js'
import { WyrmActorSheet } from './actor/actor-sheet.js'
import { WyrmItem } from './item/item.js'
import { WyrmItemSheet } from './item/item-sheet.js'
import { createCharacter } from './character-generator.js'
import * as characterGenerator from "./character-generator.js"
import { Wyrm } from './config.js'
import { WyrmCombat } from './combat.js'
import { createWyrmMacro, rollItemMacro } from './macros.js'
import { Damage } from './damage.js'
import { registerSettings } from "./settings.js"

Hooks.once('init', async function () {
  game.wyrm = {
    WyrmActor,
    WyrmItem,
    config: Wyrm,
    characterGenerator: characterGenerator,
    rollItemMacro
  }

  // Define custom Entity classes
  CONFIG.Actor.documentClass = WyrmActor;
  CONFIG.Item.documentClass = WyrmItem;

  // configure combat
  CONFIG.Combat.documentClass = WyrmCombat;
  CONFIG.Combat.initiative = {
    formula: "1d20",
  };

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('wyrm', WyrmActorSheet, { makeDefault: true });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('wyrm', WyrmItemSheet, { makeDefault: true });

  registerSettings();
  configureHandleBar();
});

Hooks.once("ready", () => {
  Hooks.on("hotbarDrop", (bar, data, slot) => createWyrmMacro(data, slot));
});

Hooks.on("renderActorDirectory", (app, html) => {
  if (game.user.can("ACTOR_CREATE")) {
    const section = document.createElement("header");
    section.classList.add("character-generator");
    section.classList.add("directory-header");

    const dirHeader = html[0].querySelector(".directory-header");
    dirHeader.parentNode.insertBefore(section, dirHeader);
    section.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="header-actions action-buttons flexrow">
        <button class="create-character-generator-button"><i class="fas fa-skull"></i>${game.i18n.localize("WYRM.CharacterGenerator")}</button>
      </div>
      `
    );
    section.querySelector(".create-character-generator-button").addEventListener("click", async () => {
      const actor = await createCharacter();
      actor.sheet.render(true);
    });
  }
});

Hooks.on("renderChatMessage", (message, html, data) => {

  // Roll Str Save
  const actor = game.actors.get(message.speaker?.actor);

  if (actor !== undefined) {
    if (actor.testUserPermission(game.user, "OWNER") || game.user.isGM) {
      html.find(".roll-str-save").click(ev => Damage._rollStrSave(actor, html));
    } else {
      html.find(".roll-str-save").each((i, btn) => { btn.style.display = "none" });
    }
  } else {
    html.find(".roll-str-save").each((i, btn) => { btn.style.display = "none" });
  }

  if (game.user.isGM) {
    html.find(".apply-dmg").click(ev => Damage.onClickChatMessageApplyButton(ev, html, data));
  }
  else {
    html.find(".apply-dmg").each((i, btn) => { btn.style.display = "none" });
  }
});

const configureHandleBar = () => {
  // Pre-load templates
  const templatePaths = [
    "systems/wyrm/templates/parts/items-list.html",
    "systems/wyrm/templates/parts/container-list.html",
  ];

  loadTemplates(templatePaths);

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function () {
    let outStr = '';

    for (const arg in arguments) {
      if (typeof arguments[arg] !== 'object') {
        outStr += arguments[arg];
      }
    }

    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
  });

  Handlebars.registerHelper('boldIf', function (cond, options) {
    return (cond) ? '<strong>' + options.fn(this) + '</strong>' : options.fn(this);
  });

  Handlebars.registerHelper("ifPrint", (cond, v1) => (cond ? v1 : ""));
  Handlebars.registerHelper("ifPrintElse", (cond, v1, v2) => (cond ? v1 : v2));

  Handlebars.registerHelper('times', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i) {
      block.data.index = i;
      block.data.first = i === 0;
      block.data.last = i === (n - 1);
      accum += block.fn(this);
    }
    return accum;
  });

  Handlebars.registerHelper('isNotNull', function (val) {
    return val !== null && val != undefined;
  });

  Handlebars.registerHelper('not', function (val) {
    return !val;
  });

  Handlebars.registerHelper('markItemUsed', function (item, options) {
    const usable = item.system.uses && item.system.uses.max && item.system.uses.max > 0;
    return (usable && item.system.uses.value >= item.system.uses.max) ? '<span style="text-decoration: line-through;">' + options.fn(this) + '</span>' : options.fn(this);
  });


}
