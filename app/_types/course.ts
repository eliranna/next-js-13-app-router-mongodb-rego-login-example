import { User, UserId, UserProfile, UserSummary } from "./user";

export type InputType = 'text' | 'code' | 'math' | 'selection'
export const defaultInputType = 'selection'

export type Addition = {
  type: InputType,
  content?: string
}

export type Answare = {
  content?: string
}

export interface Option {
  id: string;
  caption: string;
  isCorrect: boolean;
}

export interface Question {
    id: number;
    position: number;
    caption?: string;
    additions?: Addition[];
    inputType?: InputType;
    options?: Option[];
    answare?: Answare;
}

export type ExerciseId = string;

export interface Exercise {
    _id: string;
    header?: {
      title?: string,
      description?: string
    };
    questions: Question[];
    dueDate: Date;
    published: boolean;
}

export type ModuleId = string;

export interface Module {
    _id: ModuleId;
    title?: string;
    description?: string;
    exercises?: Exercise[];
}

export type CourseId = string;

export interface CourseSummary {
  iid: CourseId; // internal ID
  courseNumber: string; // University ID
  title: string;
  lecturer: UserProfile,
  location: string,
  date: CourseDate,
  image: string,
}

export interface CourseDate {
  display: string
}

export interface Course {
  iid: CourseId; // internal ID
  courseNumber: string; // University ID
  title: string;
  description: string;
  createdBy: UserId;
  creationDate: Date;
  modules: Module[];
  lecturer: User,
  date: CourseDate,
  location: string,
  image: string,
  coverImage: string
}
