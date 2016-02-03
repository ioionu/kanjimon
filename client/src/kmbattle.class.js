var KMBattle = class {
  constructor(km1, km2) {
    this.kanjimon = [
      {
        kanji: km1,
        life: 100,
        strength: Math.random() * km1.getStrokeCount(),
        defense: Math.random() * km1.getJLPT(),
      },
      {
        kanji: km2,
        life: 100,
        strength: Math.random() * km2.getStrokeCount(),
        defense: Math.random() * km2.getJLPT(),
      }
    ];

    this.round = 0;
  }

  attack() {
    var p1, p2;

    //is it km1 or km2 turn to attack?
    if(this.round%2) {
      p1 = 0; p2 = 1;
    } else {
      p1 = 1; p2 = 0;
    }

    var apower = this.kanjimon[p1].strength * (Math.random() * 10);
    var dpower = this.kanjimon[p2].strength * (Math.random() * 10);

    var effect = apower - dpower;

    this.kanjimon[p1].life -= effect;
    console.log("attack", this);
    this.round++;
  }


};

module.exports = KMBattle;
