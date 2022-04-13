import {
  Animation,
  AnimationType,
  Bar,
} from "../components/sorting/Animations";

const swap = (array: number[], i: number, j: number) => {
  let tmp = array[i]
  array[i] = array[j]
  array[j] = tmp
};

const pushSelectAnimation = (
  animations: Animation[],
  indicie: number,
  indicieOther: number
) => {
  animations.push({
    indices: [indicie, indicieOther],
    type: AnimationType.SELECTED,
  });
  animations.push({
    indices: [indicie, indicieOther],
    type: AnimationType.UNSELECTED,
  });
};
const pushSwapAnimation = (
  animations: Animation[],
  indicie: number,
  indicieOther: number
) => {
  animations.push({
    indices: [indicie, indicieOther],
    type: AnimationType.SWAP,
  });
};

const insertionSort = (arr: Bar[]): Animation[] => {
  const newArray = arr.map((arr) => arr.value);
  const animations: Animation[] = [];
  for (let i = 0; i < newArray.length; i++) {
    for (let j = i + 1; j < newArray.length; j++) {
      pushSelectAnimation(animations, i, j);
      if (newArray[j] < newArray[i]) {
        pushSwapAnimation(animations, i, j);
        swap(newArray, i, j);
      }
    }
  }
  return animations;
};

export default insertionSort;
