import { useFetch } from "_helpers/client";
import { create } from "zustand";
import { IModuleItem } from "./useCourseService";
import { useLocality } from "_helpers/client/useLocality";
import { useEffect, useState } from "react";

const DEMO_MODE = true
const demoSampleEng: IModuleItem = {
    _id: 'demo',
    type: 'codingChallenge',
    title: 'Build a Space Robot',
    description: `
### Exercise: Build a Space Robot

#### Objective:
Design and implement a Python program that simulates a space robot capable of collecting samples on a distant planet. The robot should be able to navigate a grid representing the planet's surface, identify and collect samples, and return data about the collected samples.

#### Requirements:

1. **Planet Grid Initialization**:
- Create a grid representing the planet's surface. The grid should be customizable in size (e.g., 10x10, 20x20).
- Randomly place a certain number of samples on the grid. The types and quantities of samples can vary.

2. **Robot Design**:
- The robot should start at a predefined grid position (e.g., top-left corner).
- Implement movement commands for the robot: forward, backward, left, and right. Ensure the robot does not move off the grid.

3. **Sample Collection**:
- When the robot encounters a sample, it should be able to collect it. This means removing the sample from the grid and adding it to the robot's inventory.
- Implement an inventory system for the robot to track collected samples. Each sample can have a type (e.g., mineral, rock) and a unique ID.

4. **Data Reporting**:
- The robot should be able to report the following:
    - Total number of samples collected.
    - Types of samples collected and their quantities.
    - The path taken by the robot across the grid.

5. **Challenges** (Optional Enhancements):
- Implement energy consumption for the robot. Moving and collecting samples consumes energy, and the robot has a limited energy supply.
- Add obstacles to the grid that the robot must navigate around.
- Implement a feature where the robot can analyze samples on-site, providing instant data before returning.

#### Deliverables:

- A Python script that simulates the space robot's exploration and sample collection.
- A brief report or set of comments within the script explaining your design choices, how to run the script, and any interesting findings or challenges you encountered.

#### Evaluation Criteria:

- Correctness and efficiency of the implemented features.
- Code readability and documentation.
- Creativeness in extending beyond the basic requirements (if applicable).

This exercise will test your ability to apply Python programming concepts in a complex, real-world scenario, requiring problem-solving, basic algorithm implementation, and data manipulation skills.
    `,

    initialCode: `
    import random

    # Define the planet grid and robot parameters
    
    # Initialize the grid with None values
    
    # Place samples randomly on the grid
    
    # Define the robot
    class SpaceRobot:
        def __init__(self):
    
        def move(self, direction):
    
        def check_sample(self):
    
        def report(self):
    
    # Initialize the robot
    robot = SpaceRobot()
    
    # Example movements

    
    # Print report
    `,
}

const demoSampleHeb: IModuleItem = {
    _id: 'demo',
    type: 'codingChallenge',
    title: 'בנה רובוט חלל',
    description: `
### תרגיל: בנה רובוט חלל
#### מטרה: לתכנן וליישם תוכנית פייתון המדמה רובוט חלל המסוגל לאסוף דוגמיות בכוכב רחוק. הרובוט צריך להיות מסוגל לנווט ברשת המייצגת את פני השטח של הכוכב, לזהות ולאסוף דוגמיות, ולהחזיר נתונים אודות הדוגמיות שנאספו.

#### דרישות:
1. **אתחול רשת הכוכב**:
- יצירת רשת המייצגת את פני השטח של הכוכב. גודל הרשת צריך להיות ניתן להתאמה אישית (למשל, 10x10, 20x20).
- מיקום אקראי של מספר מסוים של דוגמיות על הרשת. סוגי הדוגמיות וכמויותיהן יכולים להשתנות.

2. **עיצוב הרובוט**:
- הרובוט צריך להתחיל בעמדת רשת מוגדרת מראש (למשל, בפינה השמאלית העליונה).
- יישום פקודות תנועה עבור הרובוט: קדימה, אחורה, שמאלה וימינה. יש להבטיח שהרובוט לא יזוז מחוץ לרשת.

3. **איסוף דוגמיות**:
- כאשר הרובוט פוגש דוגמית, עליו להיות מסוגל לאסוף אותה. זה אומר להסיר את הדוגמית מהרשת ולהוסיף אותה למלאי של הרובוט.
- יישום מערכת מלאי עבור הרובוט כדי לעקוב אחר הדוגמיות שנאספו. לכל דוגמית יכול להיות סוג (למשל, מינרל, סלע) ומזהה ייחודי.

4. **דיווח נתונים**:
- הרובוט צריך להיות מסוגל לדווח את הבאים:
- מספר הדוגמיות הכולל שנאסף.
- סוגי הדוגמיות שנאספו וכמויותיהן.
- הנתיב שעבר הרובוט ברשת.

5. **אתגרים** (שיפורים אופציונליים):
- יישום צריכת אנרגיה עבור הרובוט. תנועה ואיסוף דוגמיות צורכים אנרגיה, והרובוט בעל אספקת אנרגיה מוגבלת.
- הוספת מכשולים לרשת שהרובוט חייב לנווט סביבם.
- יישום תכונה שבה הרובוט יכול לנתח דוגמיות בשטח, ולספק נתונים מיידיים לפני החזרה.

#### מסירות:
- סקריפט פייתון המדמה את חקירת הרובוט ואיסוף הדוגמיות.
- דוח קצר או סדרת הערות בתוך הסקריפט המסבירים את בחירות העיצוב שלך, כיצד להריץ את הסקריפט, וכל ממצא מעניין או אתגרים שנתקלת בהם.

#### קריטריונים להערכה:
- נכונות ויעילות של התכונות שיושמו.
- קריאות קוד ותיעוד.
- יצירתיות בהרחבה מעבר לדרישות הבסיסיות (אם רלוונטי).

תרגיל זה יבחן את יכולתך ליישם מושגי תכנות פייתון במצב מורכב ודומה למציאות, הדורש פתרון בעיות, יישום אלגוריתמים בסיסיים ומיומנויות עיבוד נתונים.
    
    `,
    initialCode: `
    import random

    # Define the planet grid and robot parameters
    
    # Initialize the grid with None values
    
    # Place samples randomly on the grid
    
    # Define the robot
    class SpaceRobot:
        def __init__(self):
    
        def move(self, direction):
    
        def check_sample(self):
    
        def report(self):
    
    # Initialize the robot
    robot = SpaceRobot()
    
    # Example movements

    
    # Print report
    `,
}

export { useModuleItemService };

const initialState = {
    moduleItem: undefined
};

const moduleItemStore = create<IModuleItemStore>(() => initialState);

function useModuleItemService(): IModuleItemService {

    const { language } = useLocality()
    const [demoSample, setDemoSample] = useState<IModuleItem>(demoSampleEng)

    const { moduleItem } = moduleItemStore();
    const fetch = useFetch();

    useEffect(() => {
        moduleItemStore.setState({moduleItem: language === 'en' ? demoSampleEng : demoSampleHeb})
    }, [language])

    return {
        moduleItem,
        getById: async (courseId: string, moduleId: string, itemId: string) => {

            if (DEMO_MODE) {
                moduleItemStore.setState({ moduleItem: demoSample });
                return
            }
            moduleItemStore.setState({ moduleItem: undefined });
            try {
                moduleItemStore.setState({ moduleItem: await fetch.get(`/api/moduleItem/${courseId}/${moduleId}/${itemId}`) });
            } catch (error: any) {
                console.log(error)
                //alertService.error(error);
            }
        }
    }
}

interface IModuleItemStore {
    moduleItem?: IModuleItem
}

interface IModuleItemService extends IModuleItemStore {
    getById: (courseId: string, moduleId: string, itemId: string) => Promise<void>
}