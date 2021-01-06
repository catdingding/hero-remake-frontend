import Vue from "vue";

Vue.filter("currency", value => {
  if (value >= 100000000) {
    return Math.floor(value / 100000000) + "億" + Math.floor((value % 100000000) / 10000) + "萬";
  }
  if (value >= 10000) {
    return Math.floor(value / 10000) + "萬" + (value % 10000);
  }
  return value;
});

Vue.filter("cd", datetime_string => {
  var ms = Date.parse(datetime_string) - new Date();
  if (ms > 3600000) {
    return Math.floor(ms / 3600000) + "小時" + Math.floor((ms % 3600000) / 60000) + "分鐘";
  }
  if (ms > 60000) {
    return Math.floor(ms / 60000) + "分鐘" + Math.floor((ms % 60000) / 1000) + "秒";
  }
  if (ms > 0) {
    return (ms / 1000).toFixed(1) + "秒";
  }
  return 0 + "秒";
});

Vue.filter("object_ability", obj => {
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
