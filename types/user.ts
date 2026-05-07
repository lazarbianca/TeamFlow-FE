export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: 'student' | 'professor';
  avatar?: string;
}
