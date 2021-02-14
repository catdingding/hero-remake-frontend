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
  return `${Vue.filter("item_name")(item)} ${Vue.filter("item_attr")(item)} ${Vue.filter("object_ability")(
    item
  )} (擁有${item.number})`;
});
