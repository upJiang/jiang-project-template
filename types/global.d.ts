import type {
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
} from "vue";

declare global {
  // vue
  declare type VueNode = VNodeChild | JSX.Element;

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  declare interface WheelEvent {
    path?: EventTarget[];
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob: any;
  }

  interface ImportMetaEnv {
    NODE_ENV: string;
    VITE_MAIN_HOST: string;
  }

  declare function parseInt(s: string | number, radix?: number): number;

  declare function parseFloat(string: string | number): number;
}

declare module "vue" {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
