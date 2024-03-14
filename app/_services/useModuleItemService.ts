import { useFetch } from "_helpers/client";
import { create } from "zustand";
import { IModuleItem } from "./useCourseService";

const DEMO_MODE = true
const DEMO_MODULE_ITEM: IModuleItem = {
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
    grid_size = 10  # Example grid size (10x10)
    samples = 5  # Number of samples to place
    sample_positions = []  # To store sample positions
    
    # Initialize the grid with None values
    grid = [[None for _ in range(grid_size)] for _ in range(grid_size)]
    
    # Place samples randomly on the grid
    for _ in range(samples):
        x, y = random.randint(0, grid_size-1), random.randint(0, grid_size-1)
        while (x, y) in sample_positions:  # Ensure unique positions for samples
            x, y = random.randint(0, grid_size-1), random.randint(0, grid_size-1)
        sample_positions.append((x, y))
        grid[x][y] = 'Sample'
    
    # Define the robot
    class SpaceRobot:
        def __init__(self):
            self.x = 0  # Start position X
            self.y = 0  # Start position Y
            self.inventory = []  # Collected samples
    
        def move(self, direction):
            if direction == 'up' and self.x > 0:
                self.x -= 1
            elif direction == 'down' and self.x < grid_size - 1:
                self.x += 1
            elif direction == 'left' and self.y > 0:
                self.y -= 1
            elif direction == 'right' and self.y < grid_size - 1:
                self.y += 1
            else:
                print("Movement not allowed.")
    
            self.check_sample()
    
        def check_sample(self):
            if grid[self.x][self.y] == 'Sample':
                self.inventory.append('Sample')
                grid[self.x][self.y] = None
                print("Sample collected at position:", self.x, self.y)
    
        def report(self):
            print("Total samples collected:", len(self.inventory))
            # Add more reporting features as needed
    
    # Initialize the robot
    robot = SpaceRobot()
    
    # Example movements
    robot.move('down')
    robot.move('right')
    
    # Print report
    robot.report()
    `,
}

export { useModuleItemService };

const initialState = {
    moduleItem: undefined
};

const moduleItemStore = create<IModuleItemStore>(() => initialState);

function useModuleItemService(): IModuleItemService {

    const { moduleItem } = moduleItemStore();
    const fetch = useFetch();

    return {
        moduleItem,
        getById: async (courseId: string, moduleId: string, itemId: string) => {

            if (DEMO_MODE) {
                moduleItemStore.setState({ moduleItem: DEMO_MODULE_ITEM });
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