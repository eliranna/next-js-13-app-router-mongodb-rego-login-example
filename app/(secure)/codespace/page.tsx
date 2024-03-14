import Codespace from "_components/Codespace"
import { IModuleItem } from "_services"

const task: IModuleItem = {
    _id: 'some-id',
    type: 'codingChallenge',
    title: 'Build a Space Robot',
    description: "Write a Python function named that determines if a string has all unique characters. For the purpose of this question, you can assume the string only contains lowercase letters from the English alphabet. Your function should return if all characters in the string are unique, and otherwise.",
    initialCode: `class Calculator:
    def __init__(self):
        """Initializer for the Calculator class."""
        pass  # This class doesn't need to initialize any attributes
    
    def add(self, a, b):
        """Return the sum of a and b."""
        return a + b
    
    def subtract(self, a, b):
        """Return the difference between a and b."""
        return a - b
    
    def multiply(self, a, b):
        """Return the product of a and b."""
        return a * b
    
    def divide(self, a, b):
        """Return the division of a by b. Raises ValueError on division by zero."""
        if b == 0:
            raise ValueError("Cannot divide by zero.")
        return a / b

# Create an instance of the Calculator class
calc = Calculator()

# Perform some calculations
print("5 + 3 =", calc.add(5, 3))
print("10 - 2 =", calc.subtract(10, 2))
print("4 * 6 =", calc.multiply(4, 6))
print("20 / 5 =", calc.divide(20, 5))

# Attempting to divide by zero will raise an exception
try:
    result = calc.divide(10, 0)
except ValueError as e:
    print(e)  # Output: Cannot divide by zero.
    `
}

const TaskPage = () => {
    return (
        <div className="h-screen">
            <Codespace task={task}/>
        </div>
    )
}

export default TaskPage