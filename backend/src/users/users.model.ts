export interface AuthResponseModel {
  id: number;

  username: string;

  created_at: Date;

  updated_at: Date;
}

export interface ValidatedUserModel {
  id: number;
  username: string;
}
