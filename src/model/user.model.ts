export interface IUser 
{
  username: string;
  password: string;
  
  // admin, user
  role: {
    rolename: string;
    account: number;
  };
}