export enum AnimationType {
  SET,
  SELECTED,
  UNSELECTED,
  SWAP,
}

export interface Animation {
  indices: [number, number];
  type: AnimationType;
}

export interface Bar {
  selected: boolean;
  value: number;
}
