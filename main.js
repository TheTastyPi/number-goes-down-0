let gameSpeed = 1;
let game;
let app = Vue.createApp({
  data() {
    return {
      player: {
        number: 10,
        numLevel: 1,
        downs: 0,
        downer: 0,
        downReactor: 0
      },
      cooldown: 1,
      lastFrame: 0
    };
  },
  methods: {
    getDownPower() {
      return 1;
    },
    getNumStrength() {
      return 10 ** this.player.numLevel;
    },
    getRefusal() {
      let p = this.player;
      return (this.getNumStrength() - p.number) ** (1 + 0.1 * (p.numLevel - 1));
    },
    getProd() {
      let p = this.player;
      return p.downer * this.getDownReactorMult();
    },
    reduceNum(amt) {
      let p = this.player;
      p.number -= amt;
      p.downs += amt;
      if (p.number < 0) {
        p.downs += p.number;
        p.number = 0;
        p.numLevel++;
        this.setCooldown(5000);
      }
    },
    numberGoesDown() {
      if (this.cooldown > 0) return;
      this.reduceNum(this.getDownPower());
      this.setCooldown(1000);
    },
    setCooldown(t) {
      if (this.cooldown < t) this.cooldown = t;
    },
    getDownerCost() {
      return 10 + 2 * this.player.downer ** 2;
    },
    buyDowner() {
      let p = this.player;
      if (p.downs >= this.getDownerCost()) {
        p.downs -= this.getDownerCost();
        p.downer++;
      }
    },
    downerGoesDown() {
      if (this.player.downer > 0) this.player.downer--;
    },
    getDownReactorCost() {
      return 100 * 10 ** this.player.downReactor;
    },
    buyDownReactor() {
      let p = this.player;
      if (p.downs >= this.getDownReactorCost()) {
        p.downs -= this.getDownReactorCost();
        p.downReactor++;
      }
    },
    getDownReactorMult() {
      let p = this.player;
      return 1 + (10 * 4 ** p.downReactor - 10) / (1 + p.number);
    },
    format(num) {
      return num.toFixed(2);
    },
    step(dt) {
      let p = this.player;
      if (p.number < this.getNumStrength()) {
        p.number += (dt / 1000) * this.getRefusal();
        if (p.number > this.getNumStrength()) {
          p.number = this.getNumStrength();
        }
      }
      this.cooldown -= dt;
      if (this.cooldown < 0) this.cooldown = 0;
      this.reduceNum((dt / 1000) * this.getProd());
    },
    nextFrame(timeStamp) {
      let dt = timeStamp - this.lastFrame;
      this.lastFrame = timeStamp;
      let rep = 1;
      dt *= gameSpeed;
      if (dt > 1000) {
        dt /= 1000;
        rep = 1000;
      }
      for (let i = 0; i < rep; i++) this.step(dt);
      window.requestAnimationFrame(this.nextFrame);
    }
  },
  mounted() {
    game = this;
    window.requestAnimationFrame(this.nextFrame);
  }
});
app.mount("#body");
