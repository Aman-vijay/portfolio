declare module 'react-hot-toast' {
    export function toast(message: string, options?: any): void;
    export function success(message: string, options?: any): void;
    export function error(message: string, options?: any): void;
    export function loading(message: string, options?: any): void;
    export function dismiss(id?: string): void;
    export function remove(id?: string): void;
    export function Toaster(props?: any): JSX.Element;
  }