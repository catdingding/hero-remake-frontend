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
  var abilities = [
    object.ability_1 ? object.ability_1.name : "(無)",
    object.ability_2 ? object.ability_2.name : "(無)",
  ];
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
  return item.equipment ? item.equipment.display_name + (item.equipment.is_locked ? "[綁]" : "") : item.type.name;
});
Vue.filter("item_description", (item) => {
  return item.type.description;
});
Vue.filter("item_type", (item) => {
  if (item.equipment) {
    return item.type.slot_type.name;
  } else if (item.type.category == 3) {
    return "奧義石";
  } else {
    return "道具";
  }
});
Vue.filter("item_attr", (item) => {
  if (item.equipment) {
    return `${item.equipment.attack}/${item.equipment.defense}/${item.equipment.weight}`;
  } else {
    return "";
  }
});
Vue.filter("item_element_type", (item) => {
  return item.equipment ? item.equipment.element_type.name : "";
});
Vue.filter("item_field_value", (item, field) => {
  return item[field];
});

Vue.filter("item_string", (item) => {
  return `${Vue.filter("item_name")(item)} ${Vue.filter("item_attr")(item)} ${Vue.filter("item_ability")(item)} (擁有${
    item.number
  })`;
});

//country
Vue.filter("country_name", (country) => {
  return country === null ? "無所屬" : country.name;
});
//team
Vue.filter("team_name", (team) => {
  return team === null ? "無隊伍" : team.name;
});
//partner
Vue.filter("partner", (partner) => {
  if (!partner) {
    return "";
  }
  var due_time = `至${Vue.filter("datetime_display")(partner.due_time)}`;
  if (new Date(partner.due_time) < new Date()) {
    due_time = "已失效";
  }
  return (partner.target_monster || partner.target_chara || partner.target_npc).name + `(${due_time})`;
});
