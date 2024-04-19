import React from "react";
const columns = [
  // {name: "ID", uid: "id", sortable: true},
  // {name: "NAME", uid: "name", sortable: true},
  // {name: "AGE", uid: "age", sortable: true},
  // {name: "ROLE", uid: "role", sortable: true},
  // {name: "TEAM", uid: "team"},
  // {name: "EMAIL", uid: "email"},
  // {name: "STATUS", uid: "status", sortable: true},
  // {name: "ACTIONS", uid: "actions"},
  {name: "Нийтлэгч", uid: "ownerId", sortable: true},
  {name: "Гарчиг", uid: "header", sortable: true},
  {name: "Төрөл", uid: "category", sortable: true},
  {name: "Ангилал", uid: "about", sortable: true},
  {name: "Он сар", uid: "date", sortable:true},
  {name: "Цэс", uid: "actions"},
];

const users = [
  {
    id: 1,
    header: "Гарчиг",
    category: "CEO",
    about: "Management",
    date: "29",
    content: "this is content",
    imageURL: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    ownerId : "thisisownerid"
  },
];

export {columns, users};
