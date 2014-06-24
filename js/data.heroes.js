Game.heroes = [];

Game.heroTemplates = {
    "Warrior": {
        "name": "Warrior",
        "weapon1": "Sword",
        "shield": "Shield",
        "helm": "Helm",
        "armor": "Medium Armor",
        "speed": 1,
        "success": 1,
        "active": 1
    },
    "Barbarian": {
        "name": "Barbarian",
        "weapon1": "Club",
        "weapon2": "Club",
        "helm": "Cap",
        "armor": "Light Armor",
        "speed": 1.5,
        "success": 0.75,
        "active": 0
    },
    "Paladin": {
        "name": "Paladin",
        "weapon1": "Morningstar",
        "shield": "Heavy Shield",
        "helm": "Full Helm",
        "armor": "Heavy Armor",
        "speed": 0.8,
        "success": 1.2,
        "active": 0
    },
    "Cleric": {
        "name": "Cleric",
        "weapon1": "Mace",
        "shield": "Shield",
        "helm": "Helm",
        "armor": "Medium Armor",
        "speed": 1,
        "success": 1.1,
        "active": 0
    },
    "Wizard": {
        "name": "Wizard",
        "weapon1": "Quarterstaff",
        "helm": "Cap",
        "armor": "Light Armor",
        "speed": 1,
        "success": 1,
        "active": 1
    },
    "Rogue": {
        "name": "Rogue",
        "weapon1": "Dagger",
        "weapon2": "Dagger",
        "helm": "Cap",
        "armor": "Light Armor",
        "speed": 1.2,
        "success": 0.8,
        "active": 1
    },
    "Ninja": {
        "name": "Ninja",
        "weapon1": "Kukri",
        "weapon2": "Kukri",
        "helm": "Cap",
        "armor": "Light Armor",
        "speed": 1.35,
        "success": 0.85,
        "active": 0
    },
    "Samurai": {
        "name": "Samurai",
        "weapon1": "Katana",
        "helm": "Full Helm",
        "armor": "Heavy Armor",
        "speed": 1.1,
        "success": 1,
        "active": 0
    },
    "Farmer": {
        "name": "Farmer",
        "weapon1": "Sickle",
        "shield": "Shield",
        "helm": "Cap",
        "armor": "Light Armor",
        "speed": 0.8,
        "success": 0.8,
        "active": 1
    },
    "Lumberjack": {
        "name": "Lumberjack",
        "weapon1": "Axe",
        "helm": "Cap",
        "armor": "Medium Armor",
        "speed": 0.8,
        "success": 0.85,
        "active": 0
    },
    "Templar": {
        "name": "Templar",
        "weapon1": "Spear",
        "helm": "Helm",
        "armor": "Medium Armor",
        "speed": 1.15,
        "success": 1.15,
        "active": 0
    },
    "Bard": {
        "name": "Bard",
        "weapon1": "Harp",
        "weapon2": "Dagger",
        "helm": "Cap",
        "armor": "Light Armor",
        "speed": 1.1,
        "success": 1,
        "active": 0
    },
    "Monk": {
        "name": "Monk",
        "weapon1": "Quarterstaff",
        "speed": 1.4,
        "success": 0.9,
        "active": 0
    },
    "Engineer": {
        "name": "Engineer",
        "weapon1": "Crossbow",
        "helm": "Cap",
        "armor": "Light Armor",
        "speed": 0.9,
        "success": 1.1,
        "active": 0
    },
    "Knight": {
        "name": "Knight",
        "weapon1": "Sword",
        "shield": "Heavy Shield",
        "helm": "Full Helm",
        "armor": "Heavy Armor",
        "speed": 0.9,
        "success": 1.4,
        "active": 0
    },
    "Phalanx": {
        "name": "Phalanx",
        "weapon1": "Spear",
        "shield": "Tower Shield",
        "helm": "Full Helm",
        "armor": "Heavy Armor",
        "speed": 0.6,
        "success": 1.8,
        "active": 0
    },
    "Pirate": {
        "name": "Pirate",
        "weapon1": "Rapier",
        "weapon2": "Crossbow",
        "helm": "Cap",
        "armor": "Light Armor",
        "speed": 1.25,
        "success": 1,
        "active": 0
    }
};

Game.heroNames = [
  "Brietta","Thais","Atenne","Hadassa","Kate","Constanza","Winna","Jolie",
  "Ancelin","Maxine","Deandra","Maggie","Giacinta","Darlene","Jobey","Maribel",
  "Bernadette","Chelsea","Frances","June","Isaura","Neci","Kaclyn","Anna",
  "Zahirah","Tawnie","Thyra","Marti","Christina","Nailah","Holly","Bethany",
  "Bronwyn","Lari","Bacia","Dania","Valora","Mirielle","Maura","Aderes",
  "Bernice","Elizabeeth","Hilary","Edlyn","Kalare","Nicole","Amelia","Ardis",
  "Carlen","Taipa","Odelia","Ashley","Jaya","diti","Glenna","Amina","Petra",
  "Hilda","Afra","Jane","Dominique","Moriah","Lacey","Ema","Ainsley","Azize",
  "Sarena","Elina","Betony","Karylin","Hester","Frederica","Carma","Karida",
  "Azura","Aurilia","Ryanne","Cyrilla","Efia","Viridis","Alike","Sharri",
  "Dalilia","Raizel","Koren","Eulalia","Acelin","Adimina","Rhianne","Crystal",
  "Briony","Siran","Delphina","Karka","Bayo","Polly","Crescent","Raquel",
  "Amina","Tamara","Weston","Carden","Aitan","Damon","Jed","Lensar","Kip",
  "Dyami","Robi","Theron","Hunter","Rhys","Keelan","Osgood","Herman","Adrian",
  "Kieran","Aleser","Sean","Hadden","Bud","Beagan","Sanders","Terrence","Odion",
  "Gamble","Elad","Roscoe","Jacobe","Allen","Kester","Blake","Garth",
  "Chevalier","Seward","Maxwell","Komor","Blaz","Isaiah","Berthold","Edgan",
  "Stevan","Salim","Rance","Elliot","Payton","Benton","Morris","Greg","Einar",
  "Peder","Beaumont","Sterling","Roth","Maurice","Harper","Ingmar","Tor",
  "Daryl","Forsythe","Saloman","Jake","Terrill","Theodore","Jacson","Zeke",
  "Errol","Ares","Volf","Tabari","Farley","Adeben","Huntley","Elad","Elek",
  "Ciceron","Clinton","Max","Stephan","Platon","Nelson","Audric","Raidon",
  "Pilan","Alan","Kalb","Osmond","Elwood","Reyhan","Tyee","Wade","Duglas",
  "Kaspar","Kersen","Kenyon","Bavol","Frazer","Belen","Baron","Mansur"
];