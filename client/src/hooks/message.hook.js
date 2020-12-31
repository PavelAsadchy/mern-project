import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback(text => {
    // M - Materialize lib's built in object for pop ups
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, [])
};