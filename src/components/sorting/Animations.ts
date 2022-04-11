export enum AnimationType {
    SET,
    SELECTED,
    UNSELECTED
  }
  
export interface Animation {
    indices: [number, number];
    type: AnimationType;
  }

export interface Bar {
    selected: boolean;
    value: number;
  }