import { Language, useLocality } from "./useLocality"

export type CaptionToken = 
    'Python Assistant' 
    | 'Execute'
    | 'Explain the question'
    | 'Give me a hint'
    | 'How to start?'
    | 'How to continue?'
    | 'Am I on the right track?'
    | "Estimate student's progress"
    | "Where does the student show difficulties?"
    | "Fundamentals"
    | "Control Structures"
    | "Functions and Modules"
    | "Data Structures"
    | "Object-Oriented Programming"
    | "Exception Handling"
    | "Working with Files"
    | "Iterators"
    | "Generators"
    | "Decorators"
    | "Basic"
    | "Advanced"
    | "Expert"
    | "Space"
    | "Biology"
    | "Finance"
    | "Sports Analytics"
    | "Environmental Science"
    | "Artificial Intelligence"
    | "Web Development"
    | "Game Development"
    | "Data Visualization"
    | "Cybersecurity"
    | "Healthcare"
    | "Music"
    | "Social Media Analysis"
    | "Robotics"
    | "Education"
    | "Geography"
    | "Automotive"
    | "Fashion"
    | "Culinary Arts"
    | "Astronomy"
    | "Topics"
    | "Level"
    | "Themes"
    | "Generate Question"
    | "Publish"
    | "Title"

type Dictionary = {
    [key in CaptionToken]: {
        [lang in Language]: string;
    };
};

const dictionary: Dictionary = {
    'Python Assistant': {
        en: 'Python Assistant',
        he: 'העוזר הוירטואלי'
    },
    "Execute": {
        en: "Execute",
        he: "בצע"
    },
    "Explain the question": {
        en: "Explain the question",
        he: "הסבר את השאלה"
    },
    "Give me a hint": {
        en: "Give me a hint",
        he: "תן לי רמז"
    },
    "How to start?": {
        en: "How to start?",
        he: "איך להתחיל?"
    },
    "How to continue?": {
        en: "How to continue?",
        he: "איך להמשיך?"
    },
    "Am I on the right track?": {
        en: "Am I on the right track?",
        he: "האם אני בדרך הנכונה?"
    },
    "Estimate student's progress": {
        en: "Estimate student's progress",
        he: 'הערך את התקדמות התלמידה'
    },
    "Where does the student show difficulties?": {
        en: "Where does the student show difficulties?",
        he: 'באילו נושאים מתקשה התלמידה?'
    },
    "Fundamentals": {
        en: "Fundamentals",
        he: "יסודות"
    },
    "Control Structures": {
        en: "Control Structures",
        he: "מבני בקרה"
    },
    "Functions and Modules": {
        en: "Functions and Modules",
        he: "פונקציות ומודולים"
    },
    "Data Structures": {
        en: "Data Structures",
        he: "מבני נתונים"
    },
    "Object-Oriented Programming": {
        en: "Object-Oriented Programming",
        he: "תכנות מונחה עצמים"
    },
    "Exception Handling": {
        en: "Exception Handling",
        he: "טיפול בחריגים"
    },
    "Working with Files": {
        en: "Working with Files",
        he: "עבודה עם קבצים"
    },
    "Iterators": {
        en: "Iterators",
        he: "איטרטורים"
    },
    "Generators": {
        en: "Generators",
        he: "גנרטורים"
    },
    "Decorators": {
        en: "Decorators",
        he: "דקורטורים"
    },
    "Basic": {
        en: "Basic",
        he: "בסיסי"
    },
    "Advanced": {
        en: "Advanced",
        he: "מתקדם"
    },
    "Expert": {
        en: "Expert",
        he: "מומחה"
    },
    "Space": {
        en: "Space",
        he: "חלל"
    },
    "Biology": {
        en: "Biology",
        he: "ביולוגיה"
    },
    "Finance": {
        en: "Finance",
        he: "פיננסים"
    },
    "Sports Analytics": {
        en: "Sports Analytics",
        he: "ניתוח ספורט"
    },
    "Environmental Science": {
        en: "Environmental Science",
        he: "מדעי הסביבה"
    },
    "Artificial Intelligence": {
        en: "Artificial Intelligence",
        he: "בינה מלאכותית"
    },
    "Web Development": {
        en: "Web Development",
        he: "פיתוח אתרים"
    },
    "Game Development": {
        en: "Game Development",
        he: "פיתוח משחקים"
    },
    "Data Visualization": {
        en: "Data Visualization",
        he: "ויזואליזציה של נתונים"
    },
    "Cybersecurity": {
        en: "Cybersecurity",
        he: "אבטחת מידע"
    },
    "Healthcare": {
        en: "Healthcare",
        he: "בריאות"
    },
    "Music": {
        en: "Music",
        he: "מוזיקה"
    },
    "Social Media Analysis": {
        en: "Social Media Analysis",
        he: "ניתוח מדיה חברתית"
    },
    "Robotics": {
        en: "Robotics",
        he: "רובוטיקה"
    },
    "Education": {
        en: "Education",
        he: "חינוך"
    },
    "Geography": {
        en: "Geography",
        he: "גאוגרפיה"
    },
    "Automotive": {
        en: "Automotive",
        he: "רכב"
    },
    "Fashion": {
        en: "Fashion",
        he: "אופנה"
    },
    "Culinary Arts": {
        en: "Culinary Arts",
        he: "אומנויות הקולינריה"
    },
    "Astronomy": {
        en: "Astronomy",
        he: "אסטרונומיה"
    },
    "Topics": {
        en: "Topics",
        he: "נושאים"        
    },
    "Level": {
        en: "Level",
        he: "רמת הקושי"        
    },
    "Themes": {
        en: "Themes",
        he: "מוטיבי השאלה"        
    },
    "Generate Question": {
        en: "Generate Question",
        he: "צור שאלה"
    },
    "Publish": {
        en: "Publish",
        he: "פרסם"        
    },
    "Title": {
        en: "Title",
        he: "כותרת"
    }

}

export const useCaptions = () => {

    const { language } = useLocality()

    return {
        getCaption: (token: CaptionToken) => {
            if (!token) {
                return ''
            }
            if (!dictionary[token] || !dictionary[token][language]) {
                return token
            }
            return dictionary[token][language]
        }
    }
}