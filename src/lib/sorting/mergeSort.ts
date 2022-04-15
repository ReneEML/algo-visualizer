import {
  Animation,
  Bar,
} from "../../components/sorting/Animations";
import { pushSelectAnimation, pushSetAnimation } from "./helpers";

const calculateRight = (index: number, middleIndex: number): number => {
  return middleIndex + 1 + index;
};

const calculateLeft = (index: number, leftIndex: number): number => {
  return index + leftIndex;
};

const merge = (
  arr: number[],
  left: number,
  middle: number,
  right: number,
  animations: Animation[]
) => {
  const leftArray: number[] = [];
  const rightArray: number[] = [];
  for (let i = left; i <= middle; i++) {
    leftArray.push(arr[i]);
  }
  for (let i = middle + 1; i <= right; i++) {
    rightArray.push(arr[i]);
  }
  let i = 0,
    j = 0,
    index = left;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] < rightArray[j]) {
      arr[index] = leftArray[i];
      pushSetAnimation(animations, index, leftArray[i]);
      i++;
    } else {
      arr[index] = rightArray[j];
      pushSetAnimation(animations, index, rightArray[j]);
      j++;
    }
    index++;
  }
  if (i < leftArray.length) {
    while (i < leftArray.length) {
      let value = calculateLeft(i, left);
      pushSelectAnimation(animations, value, value);
      pushSetAnimation(animations, index, leftArray[i]);
      arr[index] = leftArray[i];
      i++;
      index++;
    }
  } else if (j < rightArray.length) {
    while (j < rightArray.length) {
      let value = calculateRight(j, middle);
      pushSelectAnimation(animations, value, value);
      pushSetAnimation(animations, index, rightArray[j]);
      arr[index] = rightArray[j];
      j++;
      index++;
    }
  }
};

const mergeSortHelper = (
  arr: number[],
  left: number,
  right: number,
  animations: Animation[]
) => {
  if (right > left) {
    const middle: number = Math.floor((left + right) / 2);
    mergeSortHelper(arr, left, middle, animations);
    mergeSortHelper(arr, middle + 1, right, animations);
    merge(arr, left, middle, right, animations);
  }
};

const mergeSort = (arr: Bar[]): Animation[] => {
  if(arr.length <= 1) return []
  const newArray = arr.map((arr) => arr.value);
  const animations: Animation[] = [];
  mergeSortHelper(newArray, 0, newArray.length - 1, animations);
  return animations;
};

export default mergeSort;
