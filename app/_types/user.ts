import { CourseId } from "./Course";

export type UserId = string;

export interface UserProfile {
  firstName: string,
  lastName: string,
  avatar: string
}

export interface User {
  id: UserId;
  profile: UserProfile;
  lastLogin: Date;
  level: number;
  email: string;
  coursesAttending: CourseId[];
}

export interface UserSummary {
  id: UserId;
  profile: UserProfile;  
}