//export const DOMAIN = 'http://localhost:8015/api';
export const DOMAIN = 'https://garbrix.com/developers/api';

export interface LoginState {
  empID: number;
  empName: string;
  empSurname: string;
  position_id: number;
  empEmail: string;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}
