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
    | "Where does the student shows difficulties?"

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
    'Execute': {
        en: 'Execute', 
        he: 'הרץ'
    },
    'Explain the question': {
        en: 'Explain the question',
        he: 'הסבר את השאלה'
    },
    'Give me a hint': {
        en: 'Give me a hint',
        he: 'תן לי רמז'
    },
    'How to start?': {
        en: 'How to start?',
        he: 'כיצד להתחיל?'
    },
    'How to continue?': {
        en: 'How to continue?',
        he: 'כיצד להמשיך?'
    },
    'Am I on the right track?': {
        en: 'Am I on the right track?',
        he: 'האם אני בדרך הנכונה?'
    },
    "Estimate student's progress": {
        en: "Estimate student's progress",
        he: 'הערך את התקדמות התלמידה'
    },
    "Where does the student shows difficulties?": {
        en: "Where does the student shows difficulties?",
        he: 'באילו נושאים מתקשה התלמידה?'      
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