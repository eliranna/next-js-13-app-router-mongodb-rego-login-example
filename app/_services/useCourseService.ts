import { useFetch } from "_helpers/client";
import { create } from "zustand";

const DEMO_MODE = true

const demoCourseseHeb: ICourseInfo[] = [
    {
        _id: 'some-id',
        title: 'מבוא לתכנות בפייתון',
        coverImage: 'https://cdn.midjourney.com/7cdaa524-a266-4797-ba17-f8415f48219d/0_3.webp',
        location: 'כיתה 201',
        dateAndTime: 'מידי יום שני החל מ-12:00 ועד 14:30', 
    },
    {
        _id: 'some-id2',
        title: 'מבוא למדעי המחשב',
        coverImage: 'https://cdn.midjourney.com/08e3b11f-2643-446a-81f2-d35225a2b314/0_0.webp',
        location: 'כיתה 201',
        dateAndTime: 'מידי יום שני החל מ-12:00 ועד 14:30', 
    },
    {
        _id: 'some-id3',
        title: 'תורת החישוביות',
        coverImage: 'https://cdn.midjourney.com/86ef5964-c3fb-445e-9a32-b32b6b0e85d1/0_1.webp',
        location: 'כיתה 201',
        dateAndTime: 'מידי יום שני החל מ-12:00 ועד 14:30', 
    },
    {
        _id: 'some-id4',
        title: 'מבוא למספרים מרוכבים',
        coverImage: 'https://cdn.midjourney.com/9a4924c0-315a-42f8-a2e7-0a7863f31e16/0_3.webp',
        location: 'כיתה 201',
        dateAndTime: 'מידי יום שני החל מ-12:00 ועד 14:30', 
    }
]

const demoCourseHeb: ICourse = {
        _id: 'some-id',
        title: 'מבוא לתכנות ואלגוריתמים בפייתון',
        description: 'קורס יסודי שנועד ללמד מתחילים את היסודות של תכנות בפייתון, כולל תחביר, מבני נתונים ואלגוריתמים בסיסיים, עם גישה מעשית לפתרון בעיות מהעולם האמיתי.',
        coverImage: 'https://cdn.midjourney.com/7cdaa524-a266-4797-ba17-f8415f48219d/0_3.webp',
        modules: [
            {
            _id: "65ef6b8a2a17b1fca9535096",
            title: "הקדמה לפייתון",
            items: [
                    {
                    _id: "65ef6b382a17b1fca9535094",
                    type: "codingChallenge",
                    title: "שלום, פייתון!",
                    description: "כתוב תוכנית שמדפיסה 'שלום, עולם!' לקונסול.",
                    timeLeft: 'נותרו 5 ימים'
                    },
                    {
                    _id: "exercise2",
                    type: "codingChallenge",
                    title: "פייתון פואטי",
                    description: "צור סקריפט שמוציא פואמה או האיקו בשלוש שורות.",
                    timeLeft: 'נותרו 5 ימים'
                    },
                    {
                    _id: "exercise3",
                    type: "codingChallenge",
                    title: "מחשבון שם וגיל",
                    description: "כתוב תוכנית שמקבלת את שם וגיל המשתמש, ואז מחשבת את השנה בה הוא נולד.",
                    timeLeft: 'נותרו 5 ימים'
                    },
                    {
                    _id: "exercise4",
                    type: "codingChallenge",
                    title: "יוצר רשימת קניות",
                    description: "פתח סקריפט שעוזר למשתמשים ליצור רשימה של פריטים לקנות מהסופר.",
                    timeLeft: 'נותרו 5 ימים'
                    },
                ]
            },
            // Follow the same structure for the remaining modules...
            {
                _id: "module2",
                title: "מבני בקרה",
                items: [
                    {
                        _id: "exercise5",
                        type: "codingChallenge",
                        title: "בניית רובוט חלל",
                        description: "צור משחק הרפתקאות טקסטואלי פשוט שנותן למשתמשים לבחור.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise6",
                        type: "codingChallenge",
                        title: "אבן, נייר, מספריים, פייתון!",
                        description: "כתוב משחק של אבן, נייר, מספריים שהמשתמש משחק מול המחשב.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise7",
                        type: "codingChallenge",
                        title: "מיין את הציונים",
                        description: "פתח תוכנית שמיינת רשימת ציונים מהגבוה לנמוך.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise8",
                        type: "codingChallenge",
                        title: "מסע דרך הלולאה",
                        description: "צור סקריפט שמשתמש בלולאות כדי להדפיס את כל המספרים מ-1 עד 100.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                ]
            },
            {
                _id: "module3",
                title: "פונקציות ומודולים",
                items: [
                    {
                        _id: "exercise9",
                        type: "codingChallenge",
                        title: "מחולל מד ליבס",
                        description: "בנה משחק מד ליבס שבו המשתמשים מזינים מילים כדי ליצור סיפור מצחיק.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise10",
                        type: "codingChallenge",
                        title: "ממיר הטמפרטורות",
                        description: "כתוב פונקציה שממירה טמפרטורות בין פרנהייט לצלזיוס.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise11",
                        type: "codingChallenge",
                        title: "כיף פיטנס",
                        description: "פתח מודול שמחשב מדדי כושר שונים, כמו BMI.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise12",
                        type: "codingChallenge",
                        title: "פולט אימייל",
                        description: "צור פונקציה שמוציאה את שם המשתמש ושם הדומיין מכתובת אימייל.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                ]
            },
            {
                _id: "module4",
                title: "מבני נתונים בפייתון",
                items: [
                    {
                        _id: "exercise9",
                        type: "codingChallenge",
                        title: "מחולל מד ליבס",
                        description: "בנה משחק מד ליבס שבו המשתמשים מזינים מילים כדי ליצור סיפור מצחיק.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise10",
                        type: "codingChallenge",
                        title: "ממיר הטמפרטורות",
                        description: "כתוב פונקציה שממירה טמפרטורות בין פרנהייט לצלזיוס.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise11",
                        type: "codingChallenge",
                        title: "כיף פיטנס",
                        description: "פתח מודול שמחשב מדדי כושר שונים, כמו BMI.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise12",
                        type: "codingChallenge",
                        title: "פולט אימייל",
                        description: "צור פונקציה שמוציאה את שם המשתמש ושם הדומיין מכתובת אימייל.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                ]
            },
            {
                _id: "module5",
                title: "טיפול בקבצים",
                items: [
                    {
                        _id: "exercise9",
                        type: "quiz",
                        title: "מחולל מד ליבס",
                        description: "בנה משחק מד ליבס שבו המשתמשים מזינים מילים כדי ליצור סיפור מצחיק.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise10",
                        type: "codingChallenge",
                        title: "ממיר הטמפרטורות",
                        description: "כתוב פונקציה שממירה טמפרטורות בין פרנהייט לצלזיוס.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise11",
                        type: "codingChallenge",
                        title: "כיף פיטנס",
                        description: "פתח מודול שמחשב מדדי כושר שונים, כמו BMI.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise12",
                        type: "codingChallenge",
                        title: "פולט אימייל",
                        description: "צור פונקציה שמוציאה את שם המשתמש ושם הדומיין מכתובת אימייל.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                ]
            },
            {
                _id: "module6",
                title: "תכנות מונחה עצמים",
                items: [
                    {
                        _id: "exercise9",
                        type: "codingChallenge",
                        title: "מחולל מד ליבס",
                        description: "בנה משחק מד ליבס שבו המשתמשים מזינים מילים כדי ליצור סיפור מצחיק.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise10",
                        type: "codingChallenge",
                        title: "ממיר הטמפרטורות",
                        description: "כתוב פונקציה שממירה טמפרטורות בין פרנהייט לצלזיוס.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise11",
                        type: "codingChallenge",
                        title: "כיף פיטנס",
                        description: "פתח מודול שמחשב מדדי כושר שונים, כמו BMI.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise12",
                        type: "codingChallenge",
                        title: "פולט אימייל",
                        description: "צור פונקציה שמוציאה את שם המשתמש ושם הדומיין מכתובת אימייל.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                ]
            },
            {
                _id: "module7",
                title: "ספריות חיצוניות",
                items: [
                    {
                        _id: "exercise9",
                        type: "quiz",
                        title: "מחולל מד ליבס",
                        description: "בנה משחק מד ליבס שבו המשתמשים מזינים מילים כדי ליצור סיפור מצחיק.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise10",
                        type: "codingChallenge",
                        title: "ממיר הטמפרטורות",
                        description: "כתוב פונקציה שממירה טמפרטורות בין פרנהייט לצלזיוס.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise11",
                        type: "codingChallenge",
                        title: "כיף פיטנס",
                        description: "פתח מודול שמחשב מדדי כושר שונים, כמו BMI.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise12",
                        type: "codingChallenge",
                        title: "פולט אימייל",
                        description: "צור פונקציה שמוציאה את שם המשתמש ושם הדומיין מכתובת אימייל.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                ]
            },
            {
                _id: "module8",
                title: "פרוייקט סיום",
                items: [
                    {
                        _id: "exercise9",
                        type: "codingChallenge",
                        title: "מחולל מד ליבס",
                        description: "בנה משחק מד ליבס שבו המשתמשים מזינים מילים כדי ליצור סיפור מצחיק.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise10",
                        type: "codingChallenge",
                        title: "ממיר הטמפרטורות",
                        description: "כתוב פונקציה שממירה טמפרטורות בין פרנהייט לצלזיוס.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise11",
                        type: "codingChallenge",
                        title: "כיף פיטנס",
                        description: "פתח מודול שמחשב מדדי כושר שונים, כמו BMI.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                    {
                        _id: "exercise12",
                        type: "codingChallenge",
                        title: "פולט אימייל",
                        description: "צור פונקציה שמוציאה את שם המשתמש ושם הדומיין מכתובת אימייל.",
                        timeLeft: 'נותרו 5 ימים'
                    },
                ]
            }
            // Add additional modules following the same pattern
          ]
}

const initialState = {
    course: undefined,
    courses: undefined
};

interface ICourseStore {
    course?: ICourse,
    courses?: ICourseInfo[],
}

const courseStore = create<ICourseStore>(() => initialState);

interface ICourseService extends ICourseStore {
    getById: (id: string) => Promise<void>,
    getUserCoursesSummary: () => Promise<void>,
}

function useCourseService(): ICourseService {

    const { course, courses } = courseStore();
    const fetch = useFetch();

    return {
        course,
        courses,
        getById: async (id: string) => {
            courseStore.setState({ course: undefined });
            if (DEMO_MODE) {
                courseStore.setState({ course: demoCourseHeb });
                return 
            }
            try {
                courseStore.setState({ course: await fetch.get(`/api/courses/${id}`) });
            } catch (error: any) {
                console.log(error)
                //alertService.error(error);
            }
        },
        getUserCoursesSummary: async () => {
            if (DEMO_MODE) {
                courseStore.setState({ courses: demoCourseseHeb });
                return 
            }
            courseStore.setState({ courses: await fetch.get('/api/courses') });
        },
    }
}

export { useCourseService };

export interface ICourseInfo {
    _id: string,
    title: string,
    coverImage: string,
    location: string,
    dateAndTime: string,
    teacher?: {
        firstName: string,
        lastName: string,
        avatar: string
    }
}

export interface ICourse {
    _id: string,
    title: string,
    coverImage: string,
    description: string,
    modules: IModule[]
}

export interface IModule {
    _id: string,
    title: string,
    items?: IModuleItem[]
}

export type IModuleItem = {
    _id: string;
    type: IModuleItemType;
    title: string,
    description?: string,
    initialCode?: string,
    questions?: IQuestion[],
    timeLeft?: any
}

export type IInputType = 'text' | 'code' | 'math' | 'selection'

export type IAddition = {
  _id: string;
  type: IInputType,
  content?: string
}

export type IAnsware = {
  _id: string;
  content?: string
}

export interface IOption {
  _id: string;
  caption: string;
  isCorrect: boolean;
}

export interface IQuestion {
    _id: string;
    position: number;
    caption?: string;
    additions?: IAddition[];
    inputType?: IInputType;
    options?: IOption[];
    answare?: IAnsware;
}

export interface ICodingChallange {
    _id: string;
    type: IModuleItemType;
    title: string,
    description?: string,
    initialCode?: string
}

export type IModuleItemType = 'quiz' | 'codingChallenge'





