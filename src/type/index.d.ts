import Echo from "laravel-echo";

export {};

declare global {
  interface Window {
    Pusher: any;
    Echo: Echo | any
  }
}
