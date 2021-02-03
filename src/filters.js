import Vue from "vue";

Vue.filter("currency", (value) => {
  var output = value % 10000 || "0";
  if (value >= 10000) {
    output = Math.floor((value / 10000) % 10000) + "萬" + output;
  }
  if (value >= 100000000) {
    output = Math.floor(value / 100000000) + "億" + output;
  }
  return output;
});

Vue.filter("object_ability", (obj) => {
  if (!obj) {
    return "";
  }
  var abilities = [];
  if (obj.ability_1) {
    abilities.push(obj.ability_1.name);
  }
  if (obj.ability_2) {
    abilities.push(obj.ability_2.name);
  }
  return abilities.join("/");
});
