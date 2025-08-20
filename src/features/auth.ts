export const authProvider = {
    isAuthenticated: localStorage.getItem('token') !== null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  };