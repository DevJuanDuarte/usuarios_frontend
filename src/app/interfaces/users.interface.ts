export interface Usuario {
  status:  number;
  message: string;
  data:    Data;
}

export interface Data {
  user: User;
}

export interface User {
  id:         number;
  name:       string;
  email:      string;
  password:   string;
  created_at: Date;
  updated_at: Date;
  token:      string;
}
