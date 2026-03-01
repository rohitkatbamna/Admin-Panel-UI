export const delay = async (ms = 500): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
