declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.svg?react" {
  import { ComponentType, SVGProps } from "react";
  const Component: ComponentType<SVGProps<SVGSVGElement>>;
  export default Component;
}
