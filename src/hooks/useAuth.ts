export const useAuth = () => {
  const token = localStorage.getItem('userToken');
  const isAuthenticated = !!token;
  return { isAuthenticated, token };
};
