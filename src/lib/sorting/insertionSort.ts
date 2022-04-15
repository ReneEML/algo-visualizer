import {
  Animation,
  Bar,
} from "../../components/sorting/Animations";
import { pushSelectAnimation, pushSwapAnimation, swap } from "./helpers";

const insertionSort = (arr: Bar[]): Animation[] => {
  if(arr.length <= 1) return []
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
