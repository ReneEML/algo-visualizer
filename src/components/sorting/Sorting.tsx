import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import insertionSort from "../../lib/insertionSort";
import mergeSort from "../../lib/mergeSort";
import quickSort from "../../lib/quickSort";
import { Animation, AnimationType, Bar } from "./Animations";

enum SortingAlgo {
  MERGE,
  INSERTION,
  QUICK,
}

const generateData = (size: number): Bar[] => {
  const result: Bar[] = [];
  for (let i = 0; i < size; i++) {
    result.push({
      selected: false,
      value: Math.floor(Math.random() * 1000),
    });
  }
  return result;
};

const calculateHeight = (num: number, denom: number) => {
  return Math.round((num / denom) * 100);
};

export const Sorting = () => {
  const [animating, setAnimating] = useState(false);
  const [numBars, setNumBars] = useState(50);
  const [timeoutLength, setTimeoutLenght] = useState(20);
  const [array, setArray] = useState(generateData(numBars));
  const [max, setMax] = useState(Math.max(...array.map((bar) => bar.value)));
  const [algorithm, setAlgorithm] = useState(SortingAlgo.MERGE);

  const onNumBarsChange = (e: any) => setNumBars(e.target.value);
  const onTimeoutLenghtChange = (e: any) => setTimeoutLenght(e.target.value);
  const onAlgorithmChange = (e: any) => setAlgorithm(e.target.value);

  const animateSet = (animation: Animation) => {
    let newArray = [...array];
    newArray[animation.indices[0]].value = animation.indices[1];
    setArray(newArray);
  };

  const animateSwap = (animation: Animation) => {
    let newArray = [...array];
    let temp = newArray[animation.indices[0]].value;
    newArray[animation.indices[0]].value = newArray[animation.indices[1]].value;
    newArray[animation.indices[1]].value = temp;
    setArray(newArray);
  };

  const animateSelected = (animation: Animation) => {
    let newArray = [...array];
    newArray[animation.indices[0]].selected = true;
    newArray[animation.indices[1]].selected = true;
    setArray(newArray);
  };
  const animateUnselected = (animation: Animation) => {
    let newArray = [...array];
    newArray[animation.indices[0]].selected = false;
    newArray[animation.indices[1]].selected = false;
    setArray(newArray);
  };

  const animate = (animation: Animation) => {
    let type = animation.type;
    console.log();
    switch (type) {
      case AnimationType.SET:
        animateSet(animation);
        break;
      case AnimationType.SELECTED:
        animateSelected(animation);
        break;
      case AnimationType.UNSELECTED:
        animateUnselected(animation);
        break;
      case AnimationType.SWAP:
        animateSwap(animation);
        break;
      default:
        break;
    }
  };

  const sort = (): Animation[] => {
    switch (algorithm) {
      case SortingAlgo.MERGE:
        return mergeSort(array);
      case SortingAlgo.INSERTION:
        return insertionSort(array);
      case SortingAlgo.QUICK:
        return quickSort(array);
      default:
        break;
    }
    return [];
  };

  const animateSort = () => {
    const animationTimeout = timeoutLength;
    const animations = sort();
    setAnimating(true);
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => animate(animations[i]), i * animationTimeout);
      if (i === animations.length - 1)
        setTimeout(() => setAnimating(false), i * animationTimeout);
    }
  };

  return (
    <>
      <div className="flex flex-row space-x-0.5 h-80">
        {array.map((bar, index) => {
          const color = bar.selected ? "bg-red-500" : "bg-indigo-500";
          return (
            <div
              key={`sort_grid_${index}`}
              className={`${color} pl-0.5 py-1`}
              style={{ height: `${calculateHeight(bar.value, max)}%` }}
            ></div>
          );
        })}
      </div>
      <div className="flex flex-row py-4 px-4 space-x-4">
        <Button
          variant="outlined"
          onClick={() => {
            animateSort();
          }}
        >
          Sort
        </Button>
        {animating ? (
          <Button variant="outlined" onClick={() => global.location.reload()}>
            Cancel
          </Button>
        ) : (
          <></>
        )}
        <Button
          variant="outlined"
          onClick={async () => {
            if (!animating) {
              setArray(generateData(numBars));
              setMax(Math.max(...array.map((bar) => bar.value)));
            }
          }}
        >
          Generate Array
        </Button>
      </div>
      <div className="flex flex-row px-4 space-x-4">
        <TextField
          variant="filled"
          color="secondary"
          onChange={onNumBarsChange}
          value={numBars}
          label="Size of Array"
        ></TextField>
        <TextField
          variant="filled"
          color="secondary"
          onChange={onTimeoutLenghtChange}
          value={timeoutLength}
          label="Timeout Lenght"
        ></TextField>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={algorithm}
          label="Algorithm"
          onChange={onAlgorithmChange}
        >
          <MenuItem value={SortingAlgo.MERGE}>Merge Sort</MenuItem>
          <MenuItem value={SortingAlgo.INSERTION}>Insertion Sort</MenuItem>
          <MenuItem value={SortingAlgo.QUICK}>Quick Sort</MenuItem>
        </Select>
      </div>
    </>
  );
};
