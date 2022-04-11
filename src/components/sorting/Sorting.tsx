import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import mergeSort from "../../lib/mergeSort";
import { Animation, AnimationType, Bar } from "./Animations";

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

  const onNumBarsChange = (e: any) => setNumBars(e.target.value);
  const onTimeoutLenghtChange = (e: any) => setTimeoutLenght(e.target.value);

  const animateSet = (animation: Animation) => {
    let newArray = [...array];
    newArray[animation.indices[0]].value = animation.indices[1];
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
      default:
        break;
    }
  };
  const animateSort = (animations: Animation[]) => {
    let animationTimeout = timeoutLength;
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
            animateSort(mergeSort(array));
          }}
        >
          Merge sort
        </Button>
        <Button
          variant="outlined"
          onClick={async () => {
            console.log(animating);
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
      </div>
    </>
  );
};
