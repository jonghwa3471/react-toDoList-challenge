import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

let newCategory =
  localStorage.getItem("newCategory") || '["TO_DO", "DOING", "DONE"]';
let localCategory = JSON.parse(newCategory);

export const categoriesState = atom<string[]>({
  key: "categoreis",
  default: localCategory,
});

export const categoryState = atom({
  key: "category",
  default: Categories.TO_DO,
});

let output = localStorage.getItem("toDos") || "[]";
let localData = JSON.parse(output as any);

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localData,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
