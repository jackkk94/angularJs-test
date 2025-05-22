function StorageService() {
  this.getItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('localStorage read error', e);
      return null;
    }
  };

  this.setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Ошибка при сохранении в localStorage', e);
    }
  };

  this.removeItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('localStorage remove error', e);
    }
  };
}
