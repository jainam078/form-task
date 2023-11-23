export type Gender = 'male' | 'female' | 'other';

export type City = 'New York' | 'London' | 'Tokyo' | 'Paris';
export type FormData = {
  firstName: string;
  lastName: string;
  photo: string | null;
  gender: Gender;
  email: string;
  mobileNo: string;
  dateOfBirth: string;
  city: City;
  skills: string[];
};
