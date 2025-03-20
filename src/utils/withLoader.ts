import { showLoader, hideLoader } from "../components/providers/loadingService";

export async function withLoader<T>(asyncFunc: () => Promise<T>): Promise<T> {
  try {
    showLoader();
    return await asyncFunc();
  } finally {
    hideLoader();
  }
}
