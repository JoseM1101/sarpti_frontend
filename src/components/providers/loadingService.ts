import { Dispatch, SetStateAction } from "react";

let setLoadingFn: Dispatch<SetStateAction<boolean>> = () => {};

export function registerLoader(fn: Dispatch<SetStateAction<boolean>>) {
  setLoadingFn = fn;
}

export function showLoader() {
  setLoadingFn(true);
}

export function hideLoader() {
  setLoadingFn(false);
}
