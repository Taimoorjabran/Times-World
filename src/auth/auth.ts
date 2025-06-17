export const isAuthenticated = (): boolean => {
  return (
    localStorage.getItem('token') !== null ||
    sessionStorage.getItem('token') !== null
  );
};

export const getToken = (): string | null => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const login = (token: string, remember: boolean) => {
  if (remember) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};
