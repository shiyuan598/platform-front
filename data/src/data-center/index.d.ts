// 条件的类型
export type RangeValue = [Moment, Moment] | null;

export type conditionType = {
  [propName: string]: string | RangeValue
}

declare global {
  interface Window {
    globalConfig?: any
  }
}


export declare module "react-highlight" {
  import Highlight from 'react-highlight';
  export default Highlight;
}
