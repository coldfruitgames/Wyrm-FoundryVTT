/** @name CONFIG.Cairn */
export const Cairn = {};

Cairn.characterGenerator = {
  ability: "3d6",
  hitProtection: "1d6",
  gold: "3d6",
  name: {
    text: "{name} {surname}",
    items: {
      name: "wyrm.character-creation-tables-srd;Names",
      surname: "wyrm.character-traits;Surnames"
    }
  },
  background: "wyrm.character-traits;Background",
  startingItems: [
    "wyrm.expeditionary-gear;Rations;1",
    "wyrm.expeditionary-gear;Torch;1"
  ],
  startingGear: [
    "wyrm.character-creation-tables-srd;Starting Gear - Armor",
    "wyrm.character-creation-tables-srd;Starting Gear - Helmet & Shields",
    "wyrm.character-creation-tables-srd;Starting Gear - Weapons",
    "wyrm.character-creation-tables-srd;Starting Gear - Expeditionary Gear",
    "wyrm.character-creation-tables-srd;Starting Gear - Tools",
    "wyrm.character-creation-tables-srd;Starting Gear - Trinkets",
    "wyrm.character-creation-tables-srd;Starting Gear - Bonus Item"
  ],
  biography: {
    text: "I have a <strong>{physique}</strong> physique, <strong>{skin}</strong> skin, <strong>{hair}</strong> hair, and a <strong>{face}</strong> face. I speak in a <strong>{speech}</strong> manner and wear <strong>{clothing}</strong> clothing. I am <strong>{vice}</strong> yet <strong>{virtue}</strong>, and I am generally regarded as <strong>{reputation}</strong>. I have had the misfortune of being <strong>{misfortune}</strong>. I am <strong>{age}</strong> years old.",
    age: "2d20 + 10",
    items: {
      physique: "wyrm.character-traits;Physique",
      skin: "wyrm.character-traits;Skin",
      hair: "wyrm.character-traits;Hair",
      face: "wyrm.character-traits;Face",
      speech: "wyrm.character-traits;Speech",
      clothing: "wyrm.character-traits;Clothing",
      vice: "wyrm.character-traits;Vice",
      virtue: "wyrm.character-traits;Virtue",
      misfortune: "wyrm.character-traits;Misfortunes",
      reputation: "wyrm.character-traits;Reputation"
    }
  }
};

CONFIG.Cairn = Cairn;

