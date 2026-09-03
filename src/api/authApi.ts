// 預留登入 API 串接與 JWT 驗證格式
export interface LoginCredentials {
  username?: string;
  password?: string;
}

export const login = async (credentials: LoginCredentials) => {
  console.log('Login attempt with', credentials);
  // 預期回傳格式包含 JWT Token: { token: 'eyJhbG...', user: {...} }
  return Promise.resolve({ token: 'mock-jwt-token' });
};
