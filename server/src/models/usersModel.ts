export interface User {
  id?: string;
  username: string;
  password: string;
  profilePicture: string; // URL to the profile picture
  credentials: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
