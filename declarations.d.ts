declare module "*.webp" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
