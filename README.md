FRONTEND
---

## Pages Included

1. **index.html** - Landing page with hero section, features grid, statistics, and testimonials
2. **login.html** - Login page with separate tabs for Student and Admin login
3. **register.html** - Student registration form with validation
4. **student-dashboard.html** - Student portal showing enrolled courses, stats, schedule, assignments, and announcements
5. **courses.html** - Complete course catalog with search, filters, department tabs, and detailed course modals
6. **admin-dashboard.html** - Admin portal with metrics, charts, recent registrations, and quick actions
7. **admin-manage-courses.html** - Course management with add, edit, delete functionality

---

## Demo Credentials

### Student Access
| Field | Value |
|-------|-------|
| Email | sarah@greenfield.edu |
| Password | password123 |

### Admin Access
| Field | Value |
|-------|-------|
| Email | admin@greenfield.edu |
| Password | admin123 |

---

## Course Database

The system includes 14+ pre-loaded courses across 6 departments:

| Department | Number of Courses | Sample Programs |
|------------|-------------------|-----------------|
| Computer Science | 4 | Programming, OOP, Data Structures, Software Engineering |
| Data Science | 3 | Python for Data Science, ML Fundamentals, Deep Learning |
| Information Technology | 2 | Network Fundamentals, Cloud Computing |
| Business Analytics | 1 | Business Statistics |
| Cybersecurity | 1 | Introduction to Cybersecurity |
| Artificial Intelligence | 1 | Introduction to AI |

Each course includes:
- Course code and name
- Credit hours (2-4 credits)
- Difficulty level (Beginner/Intermediate/Advanced)
- Instructor name
- Capacity and current enrollment numbers
- Detailed description
- Key topics covered
- Unit breakdown with subtopics
- Prerequisites
- Learning outcomes

---

## Technical Implementation Details

### HTML Implementation
- Semantic elements (header, nav, main, section, footer)
- Proper form labels and input validation attributes
- Responsive meta viewport tag
- External CSS and JS file linking

### CSS Implementation
- Custom CSS properties for consistent theming
- Flexbox and Grid for layouts
- Media queries for responsive breakpoints
- Keyframe animations for dynamic effects
- Pseudo-elements for decorative elements
- CSS transitions for hover effects
- Glassmorphism with backdrop-filter

### JavaScript Implementation
- ES6+ syntax (let, const, arrow functions, template literals, destructuring)
- localStorage API for data persistence
- DOM manipulation for dynamic content rendering
- Event listeners for user interactions
- Debounce function for search optimization
- Intersection Observer for scroll-triggered animations
- requestAnimationFrame for particle animation
- Modal dialog system
- Toast notification system

---

## Data Persistence

All data is stored locally in the browser using the localStorage API:
- No server or database required
- Data persists between browser sessions
- Works offline after initial load
- Course registrations are saved locally

**Stored data keys:**
- `courses` - Complete course catalog with all details
- `students` - Student registration records with enrolled courses
- `registrations` - Historical registration records

---

## Business Rules Implemented

1. **Credit Limit Rule:** Students cannot exceed 18 total credits per semester
2. **Capacity Rule:** Courses have maximum capacity; students cannot enroll in full courses
3. **Duplicate Prevention:** Students cannot enroll in the same course twice
4. **Role-Based Access:** Separate dashboards for students and administrators
5. **Prerequisite Checking:** Course prerequisites are displayed before enrollment

---

## Responsive Design Breakpoints

| Breakpoint | Target Devices | Layout Changes |
|------------|----------------|----------------|
| 1024px and above | Desktop | Full grid layout with 3-4 columns |
| 768px to 1024px | Tablet | Reduced to 2 columns |
| Below 768px | Mobile | Single column, stacked layout |

---

## Browser Support

- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Apple Safari (latest version)
- Microsoft Edge (latest version)
- Opera (latest version)

---

## Setup Instructions

1. Create the folder structure as shown in the Project Structure section
2. Copy all CSS files into the `css/` folder
3. Copy all JavaScript files into the `js/` folder
4. Copy all HTML files into the `html/` folder
5. Open `html/index.html` in a web browser
6. Alternatively, run a local server: `python -m http.server 8000`

No build process, no installations, no dependencies. The project runs immediately in any modern browser.

---

## Learning Outcomes Demonstrated

Through this project, I have demonstrated proficiency in:

1. **HTML5:** Creating semantic, well-structured web pages with proper document hierarchy
2. **CSS3:** Implementing responsive layouts, custom animations, dark themes, and modern design patterns
3. **JavaScript:** Writing interactive web applications with DOM manipulation, event handling, and data persistence
4. **LocalStorage:** Implementing client-side data storage for user data and application state
5. **Form Validation:** Creating client-side validation for user inputs
6. **Responsive Design:** Ensuring the application works on all device sizes
7. **User Authentication Simulation:** Implementing role-based login systems
8. **Modal Dialogs:** Creating reusable modal components for detailed views
9. **Animation:** Implementing CSS and JavaScript animations for enhanced user experience
10. **Project Organization:** Structuring a multi-page web application with separate CSS and JavaScript files

---

## Submission Details

**Project Completed For:** Internet Application Programming (Year 2, Semester 2)  
**Institution:** Jomo Kenyatta University of Agriculture and Technology  
**Program:** Bachelor of Science in Mathematics and Computer Science