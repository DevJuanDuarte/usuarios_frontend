export interface Post {
  status:  number;
  message: string;
  data:    Datum[];
}

export interface Datum {
  id:         number;
  title:      string;
  content:    string;
  userid:     number;
  created_at: Date;
  updated_at: Date;
}
