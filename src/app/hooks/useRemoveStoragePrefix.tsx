export const useRemoveStoragePrefix = () => {
  const removeLocalStorageItemsWithPrefix = (prefix: string) => {
    const keysToRemove: string[] = [];

    //find keys to remove
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    // Remove the identified keys
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  return {
    removeLocalStorageItemsWithPrefix,
  };
};
