import { Animation, AnimationType } from "../components/sorting/Animations";

export const swap = (array: number[], i: number, j: number) => {
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

export const pushSwapAnimation = (
  animations: Animation[],
  indicie: number,
  indicieOther: number
) => {
  animations.push({
    indices: [indicie, indicieOther],
    type: AnimationType.SWAP,
  });
};

export const pushSelectAnimation = (
  animations: Animation[],
  indicie1: number,
  indicie2: number
) => {
  animations.push({
    indices: [indicie1, indicie2],
    type: AnimationType.SELECTED,
  });
  animations.push({
    indices: [indicie1, indicie2],
    type: AnimationType.UNSELECTED,
  });
};
export const pushSetAnimation = (
  animations: Animation[],
  index: number,
  value: number
) => {
  animations.push({
    indices: [index, value],
    type: AnimationType.SET,
  });
};
