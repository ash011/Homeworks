let heroes = [];
let villains = [];

class HeroesVillains {
  constructor(name, speed, power) {
    this.name = name;
    this.speed = speed;
    this.power = power;
    this.health = 100;
  }
}

for (let i = 0; i < 20; i++) {
  let name = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
  let speed = (Math.random() * 4 + 1).toFixed(2);
  let power = (Math.random() * 9 + 1).toFixed(2);
  if (i < 10) {
    heroes.push(new HeroesVillains(name, speed, power));
  } else {
    villains.push(new HeroesVillains(name, speed, power));
  }
}

for (let i in villains) {
  let villain = villains[i];
  versus(villain);
}

function versus(villain, bat = () => {}) {
  let hero = heroes[Math.floor(Math.random() * heroes.length)];
  villain.vs = hero.name;
  hero.vs = villain.name;
  bat();
}

function vsBatt() {
  if (heroes.length === 0 || villains.length === 0) {
    let text = "";
    if (heroes.length === 0) {
      text += "Villains win\n";
      for (let i in villains) {
        text += villains[i].name + `[` + villains[i].health + `]  `;
      }
      console.log(text);
      return;
    } else if (villains.length === 0) {
      text += "Heroes win\n";
      for (let i in heroes) {
        text += heroes[i].name + `[` + heroes[i].health + `]  `;
      }
      console.log(text);
      return;
    }
  }

  let vil = villains[0],
    her = {};
  let num = 0;
  let thereIs = true;
  for (let i in heroes) {
    if (vil.vs === heroes[i].name) {
      thereIs = false;
      her = heroes[i];
      num = i;
      break;
    }
  }

  if (thereIs) {
    versus(vil, vsBatt);
  } else {
    battle(vil, her, num);
  }
}
vsBatt();

function battle(vil, her, num) {
  let time1 = 0;
  let time2 = 0;
  let timer = setInterval(() => {
    time1++;
    time2++;
    if (time1 >= (1 / vil.speed) * 500) {
      her.health = her.health - vil.power;
      console.log(
        `${vil.name}[${vil.health}] hits ${her.name}[${her.health}]  with a power of ${vil.power}`
      );
      time1 = 0;
      if (her.health <= 0) {
        her.health = 0;
        heroes.splice(num, 1);
        console.log(her.name + " dies");
        clearInterval(timer);
        vsBatt();
      }
    }
    if (time2 >= (1 / her.speed) * 500) {
      vil.health = vil.health - her.power;
      console.log(
        `${her.name}[${her.health}] hits ${vil.name}[${vil.health}]  with a power of ${her.power}`
      );
      time2 = 0;
      if (vil.health <= 0) {
        vil.health = 0;
        villains.shift();
        console.log(vil.name + " dies");
        clearInterval(timer);
        vsBatt();
      }
    }
  }, 1);
}
