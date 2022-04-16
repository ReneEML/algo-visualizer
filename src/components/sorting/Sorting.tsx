import React, { useState } from "react";
import insertionSort from "../../lib/sorting/insertionSort";
import mergeSort from "../../lib/sorting/mergeSort";
import quickSort from "../../lib/sorting/quickSort";
import Button from "../shared/button";
import { Option, Select } from "../shared/select";
import TextField from "../shared/textfield";
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
  return Math.floor((num / denom) * 100);
};

export const Sorting = () => {
  const [animating, setAnimating] = useState(false);
  const [numBars, setNumBars] = useState(50);
  const [timeoutLength, setTimeoutLenght] = useState(20);
  const [array, setArray] = useState(generateData(numBars));
  const [max, setMax] = useState(Math.max(...array.map((bar) => bar.value)));
  const [algorithm, setAlgorithm] = useState(SortingAlgo.MERGE);
  const [sorted, setSorted] = useState(false);

  const onNumBarsChange = (e: any) => setNumBars(e.target.value);
  const onTimeoutLenghtChange = (e: any) => setTimeoutLenght(e.target.value);
  const onAlgorithmChange = (e: any) => {
    setAlgorithm(parseInt(e.target.value));
  };

  const validateBarsInput = (): number => {
    if (numBars < 2) {
      setNumBars(2);
      return 2;
    }
    if (numBars > 300) {
      setNumBars(300);
      return 300;
    }
    return numBars;
  };

  const validateTimeoutLengthInput = (): number => {
    if (timeoutLength < 10) {
      setTimeoutLenght(10);
      return 10;
    }
    if (timeoutLength > 200) {
      setTimeoutLenght(200);
      return 200;
    }
    return timeoutLength;
  };
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
        console.log(typeof algorithm);
        break;
    }
    return [];
  };

  const animateSort = () => {
    const animationTimeout = validateTimeoutLengthInput();
    const animations = sort();
    setAnimating(true);
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => animate(animations[i]), i * animationTimeout);
      if (i === animations.length - 1)
        setTimeout(() => {
          setAnimating(false);
          setSorted(true);
        }, i * animationTimeout);
    }
  };

  const options: Option[] = [
    { label: "Merge Sort", value: SortingAlgo.MERGE, selected: true },
    { label: "Quick Sort", value: SortingAlgo.QUICK, selected: false },
    { label: "Insertion Sort", value: SortingAlgo.INSERTION, selected: false },
  ];
  return (
    <>
      <div
        className={`flex flex-row space-x-0.5 h-96 border-2 ${
          animating && !sorted ? "border-red-500" : (sorted ? "border-green-500" : "border-indigo-500")
        } rounded-sm px-4 py-4`}
      >
        {array.map((bar, index) => {
          const color = bar.selected ? "bg-red-500" : "bg-indigo-500";
          return (
            <div
              key={`sort_grid_${index}`}
              className={`${color} pl-0.5`}
              style={{ height: `${calculateHeight(bar.value, max)}%` }}
            ></div>
          );
        })}
      </div>
      <div className="flex flex-row py-4 px-4 space-x-4">
        <Button
          onClick={async () => {
            if (!sorted) animateSort();
          }}
          text=" Sort"
        />
        {animating ? (
          <Button onClick={() => global.location.reload()} text="Cancel" />
        ) : (
          <></>
        )}
        <Button
          onClick={() => {
            if (!animating) {
              setArray(generateData(validateBarsInput()));
              setSorted(false);
              setMax(Math.max(...array.map((bar) => bar.value)));
            }
          }}
          text="Generate Array"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-start px-4 md:space-x-4">
        <div className="hidden md:flex">
          <TextField label="Size" value={numBars} onChange={onNumBarsChange} />
        </div>
        <TextField
          label="Timeout"
          value={timeoutLength}
          onChange={onTimeoutLenghtChange}
        />
        <Select
          label="Algorithm"
          value={algorithm}
          onChange={onAlgorithmChange}
          options={options}
        />
      </div>
    </>
  );
};
