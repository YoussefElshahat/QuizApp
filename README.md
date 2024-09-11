Quiz App
This is a simple, interactive Quiz Application built with HTML, CSS, and JavaScript. The app dynamically fetches questions from a JSON file and allows users to select answers, providing results at the end based on their performance.

Features
Dynamic Questions: Fetches questions from a JSON file (html_questions.json).
Answer Selection: Users can select their answers using radio buttons.
Result Calculation: At the end of the quiz, users receive feedback on their performance (Perfect, Good, or Bad).
Timer: Each question is timed, and the answer is automatically submitted when the time runs out.
Progress Tracking: The app tracks how many questions the user has answered using a bullet system.
Technologies Used
HTML: For structuring the quiz app layout.
CSS: For styling the quiz interface.
JavaScript: For dynamic functionalities like loading questions, processing answers, managing the countdown timer, and displaying results.
How It Works
The app loads questions from a JSON file using an XMLHttpRequest.
A countdown timer starts for each question. If time runs out before the user submits, the app automatically moves to the next question.
The user answers questions by selecting from multiple-choice options.
After all questions are answered, the app displays the total score and provides feedback (Perfect, Good, or Bad).
Setup
To run this app locally:

Download or clone the repository.
Ensure that the html_questions.json file contains the quiz questions.
Open the index.html file in your web browser.
File Structure
index.html: The main HTML file for the quiz app interface.
style.css: Contains the styles for the app's layout and appearance.
main.js: The JavaScript file that handles quiz logic, including fetching questions, processing answers, and managing the countdown.
Future Improvements
Add support for multiple categories.
Implement user authentication to save quiz progress.
Add more customization options for quiz difficulty and time per question.
License
This project is licensed under the MIT License.
