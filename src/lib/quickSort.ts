import { Bar, Animation } from "../components/sorting/Animations";
import { pushSelectAnimation, pushSwapAnimation, swap } from "./helpers";

const quickSort = (arr: Bar[]) => {
  const newArray = arr.map((bar) => bar.value);
  const animations: Animation[] = [];
  quickSortHelper(animations, newArray, 0, newArray.length - 1);
  return animations;
};

const quickSortHelper = (
  animations: Animation[],
  arr: number[],
  low: number,
  high: number
) => {
  if (low < high) {
    const pivot = partition(animations, arr, low, high);
    quickSortHelper(animations, arr, low, pivot - 1);
    quickSortHelper(animations, arr, pivot + 1, high);
  }
};
const partition = (
  animations: Animation[],
  arr: number[],
  low: number,
  high: number
): number => {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
      pushSwapAnimation(animations, i, j);
    }
  }
  i++;
  swap(arr, i, high);
  pushSwapAnimation(animations, i, high);
  pushSelectAnimation(animations, i, i);
  return i;
};

export default quickSort;
