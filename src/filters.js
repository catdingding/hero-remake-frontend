import Vue from "vue";

Vue.filter("currency", (value) => {
  if (value === 0) {
    return "0";
  }

  var output = "";
  if (value >= 100000000) {
    output = Math.floor(value / 100000000) + "億";
    value = value % 100000000;
  }
  if (value >= 10000) {
    output = output + Math.floor(value / 10000) + "萬";
    value = value % 10000;
  }
  if (value >= 1) {
    output = output + value;
  }
  return output;
});

Vue.filter("object_ability", (object) => {
  if (!object) {
    return "";
  }
  var abilities = [];
  if (object.ability_1) {
    abilities.push(object.ability_1.name);
  }
  if (object.ability_2) {
    abilities.push(object.ability_2.name);
  }
  return abilities.join("/");
});

Vue.filter("item_ability", (item) => {
  return Vue.filter("object_ability")(item.equipment);
});

// datetime
Vue.filter("datetime_display", (date) => {
  var d = new Date(date);

  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}時${d.getMinutes()}分`;
});

// item

Vue.filter("item_name", (item) => {
  return item.equipment ? item.equipment.display_name : item.type.name;
});
Vue.filter("item_description", (item) => {
  return item.type.description;
});
Vue.filter("item_type", (item) => {
  return item.equipment ? item.type.slot_type.name : "道具";
});
Vue.filter("item_attr", (item) => {
  if (item.equipment) {
    return `${item.equipment.attack}/${item.equipment.defense}/${item.equipment.weight}`;
  } else {
    return "";
  }
});
Vue.filter("item_field_value", (item, field) => {
  return item[field];
});

Vue.filter("item_string", (item) => {
  return `${Vue.filter("item_name")(item)} ${Vue.filter("item_attr")(item)} ${Vue.filter("item_ability")(item)} (擁有${
    item.number
  })`;
});
