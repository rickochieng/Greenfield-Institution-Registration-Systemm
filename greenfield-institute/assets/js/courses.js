let allCourses = [];
let currentModalCourse = null;

const courseDatabase = {
    cs: {
        name: "Computer Science",
        courses: [
            {
                id: 101,
                code: "CS101",
                name: "Introduction to Programming",
                credits: 3,
                level: "beginner",
                instructor: "Dr. James Wilson",
                capacity: 40,
                enrolled: 35,
                description: "Learn the fundamentals of programming using Python. This course covers variables, loops, functions, and basic data structures.",
                topics: ["Variables & Data Types", "Control Flow", "Functions", "Lists & Dictionaries", "File I/O", "Basic Algorithms"],
                units: [
                    { name: "Unit 1: Programming Basics", topics: ["What is Programming", "Setting up Environment", "Variables and Data Types", "Basic Input/Output", "Comments and Documentation"] },
                    { name: "Unit 2: Control Flow", topics: ["Conditional Statements (if/elif/else)", "Loops (for/while)", "Loop Control Statements", "Nested Loops", "Debugging Techniques"] },
                    { name: "Unit 3: Functions", topics: ["Function Definition", "Parameters and Arguments", "Return Values", "Scope and Lifetime", "Recursion Basics"] },
                    { name: "Unit 4: Data Structures", topics: ["Lists and Tuples", "Dictionaries", "Sets", "List Comprehensions", "Working with Collections"] },
                    { name: "Unit 5: File Handling", topics: ["Reading Files", "Writing Files", "CSV Processing", "Exception Handling", "Working with JSON"] }
                ],
                prerequisites: "None",
                outcomes: ["Write basic Python programs", "Understand programming logic", "Debug simple errors", "Work with data structures"]
            },
            {
                id: 102,
                code: "CS201",
                name: "Object-Oriented Programming",
                credits: 3,
                level: "intermediate",
                instructor: "Prof. Sarah Chen",
                capacity: 35,
                enrolled: 30,
                description: "Master object-oriented programming concepts including classes, inheritance, polymorphism, and encapsulation using Java.",
                topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Encapsulation", "Abstract Classes", "Interfaces"],
                units: [
                    { name: "Unit 1: Classes and Objects", topics: ["Creating Classes", "Constructors", "Instance Variables", "Methods", "Object Instantiation"] },
                    { name: "Unit 2: Inheritance", topics: ["Superclass/Subclass", "Method Overriding", "Super Keyword", "Protected Members", "Inheritance Hierarchies"] },
                    { name: "Unit 3: Polymorphism", topics: ["Method Overloading", "Runtime Polymorphism", "Dynamic Method Dispatch", "Polymorphic Arrays", "Instanceof Operator"] },
                    { name: "Unit 4: Encapsulation", topics: ["Access Modifiers", "Getters/Setters", "Data Hiding", "Package Organization", "Information Security"] },
                    { name: "Unit 5: Advanced OOP", topics: ["Abstract Classes", "Interfaces", "Inner Classes", "Anonymous Classes", "Lambda Expressions"] }
                ],
                prerequisites: "CS101 or equivalent programming experience",
                outcomes: ["Design object-oriented solutions", "Implement inheritance hierarchies", "Apply polymorphism effectively", "Create reusable code components"]
            },
            {
                id: 103,
                code: "CS301",
                name: "Data Structures & Algorithms",
                credits: 4,
                level: "advanced",
                instructor: "Dr. Robert Williams",
                capacity: 30,
                enrolled: 28,
                description: "Study fundamental data structures and algorithms for efficient problem solving.",
                topics: ["Arrays & Lists", "Stacks & Queues", "Linked Lists", "Trees & BSTs", "Graphs", "Sorting Algorithms"],
                units: [
                    { name: "Unit 1: Complexity Analysis", topics: ["Big O Notation", "Time Complexity", "Space Complexity", "Best/Average/Worst Case", "Complexity Classes"] },
                    { name: "Unit 2: Linear Structures", topics: ["Dynamic Arrays", "Singly Linked Lists", "Doubly Linked Lists", "Circular Lists", "Stack Implementation", "Queue Implementation"] },
                    { name: "Unit 3: Trees", topics: ["Binary Trees", "Binary Search Trees", "Tree Traversals", "AVL Trees", "Red-Black Trees", "Heap Data Structure"] },
                    { name: "Unit 4: Sorting Algorithms", topics: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Radix Sort"] },
                    { name: "Unit 5: Graphs", topics: ["Graph Representation", "BFS/DFS", "Shortest Path (Dijkstra)", "Minimum Spanning Tree", "Topological Sort"] }
                ],
                prerequisites: "CS201",
                outcomes: ["Analyze algorithm efficiency", "Implement complex data structures", "Solve optimization problems", "Write efficient code"]
            }
        ]
    },
    ds: {
        name: "Data Science",
        courses: [
            {
                id: 201,
                code: "DS101",
                name: "Python for Data Science",
                credits: 3,
                level: "beginner",
                instructor: "Prof. Angela Davis",
                capacity: 45,
                enrolled: 42,
                description: "Master Python libraries essential for data science including NumPy, Pandas, and Matplotlib.",
                topics: ["NumPy Arrays", "Pandas DataFrames", "Data Visualization", "Data Cleaning", "Statistical Analysis"],
                units: [
                    { name: "Unit 1: NumPy Fundamentals", topics: ["Array Creation", "Array Operations", "Indexing/Slicing", "Broadcasting", "Linear Algebra with NumPy"] },
                    { name: "Unit 2: Pandas for Data Analysis", topics: ["Series and DataFrames", "Data Import/Export", "Data Manipulation", "Grouping/Aggregation", "Handling Missing Data"] },
                    { name: "Unit 3: Data Visualization", topics: ["Matplotlib Basics", "Plot Types", "Customizing Plots", "Seaborn Library", "Interactive Visualizations"] },
                    { name: "Unit 4: Data Cleaning", topics: ["Handling Null Values", "Data Type Conversion", "Removing Duplicates", "Outlier Detection", "Feature Engineering"] },
                    { name: "Unit 5: Exploratory Analysis", topics: ["Summary Statistics", "Correlation Analysis", "Distribution Analysis", "Pattern Discovery", "Data Storytelling"] }
                ],
                prerequisites: "Basic programming knowledge",
                outcomes: ["Manipulate data with Pandas", "Create visualizations", "Clean messy datasets", "Perform exploratory analysis"]
            },
            {
                id: 202,
                code: "DS202",
                name: "Machine Learning Fundamentals",
                credits: 4,
                level: "intermediate",
                instructor: "Dr. Andrew Ng",
                capacity: 35,
                enrolled: 33,
                description: "Introduction to machine learning algorithms including regression, classification, clustering.",
                topics: ["Supervised Learning", "Regression Models", "Classification", "Clustering", "Model Evaluation"],
                units: [
                    { name: "Unit 1: Regression", topics: ["Linear Regression", "Polynomial Regression", "Regularization", "Gradient Descent", "Model Metrics"] },
                    { name: "Unit 2: Classification", topics: ["Logistic Regression", "k-Nearest Neighbors", "Decision Trees", "Random Forest", "SVM"] },
                    { name: "Unit 3: Clustering", topics: ["k-Means Clustering", "Hierarchical Clustering", "DBSCAN", "Cluster Evaluation", "Dimensionality Reduction"] },
                    { name: "Unit 4: Model Evaluation", topics: ["Train/Test Split", "Cross-Validation", "Confusion Matrix", "Precision/Recall", "ROC Curves"] }
                ],
                prerequisites: "DS101",
                outcomes: ["Build predictive models", "Evaluate model performance", "Choose appropriate algorithms", "Tune model parameters"]
            }
        ]
    },
    it: {
        name: "Information Technology",
        courses: [
            {
                id: 301,
                code: "IT101",
                name: "Network Fundamentals",
                credits: 3,
                level: "beginner",
                instructor: "Dr. Robert Taylor",
                capacity: 35,
                enrolled: 30,
                description: "Learn networking concepts including OSI model, TCP/IP, routing, switching, and network security.",
                topics: ["OSI Model", "TCP/IP Suite", "IP Addressing", "Routing Protocols", "Switching", "Network Security"],
                units: [
                    { name: "Unit 1: Networking Basics", topics: ["What is a Network", "Network Topologies", "OSI Model Layers", "TCP/IP Model", "Protocols Overview"] },
                    { name: "Unit 2: IP Addressing", topics: ["IPv4 Addresses", "Subnetting", "CIDR Notation", "IPv6 Basics", "DHCP Protocol"] },
                    { name: "Unit 3: Routing", topics: ["Static vs Dynamic Routing", "RIP Protocol", "OSPF", "EIGRP", "Routing Tables"] },
                    { name: "Unit 4: Switching", topics: ["Ethernet Switching", "VLANs", "STP Protocol", "Trunking", "Switch Security"] },
                    { name: "Unit 5: Network Security", topics: ["Firewalls", "VPNs", "IDS/IPS", "Access Control Lists", "Network Monitoring"] }
                ],
                prerequisites: "None",
                outcomes: ["Configure basic networks", "Understand routing/switching", "Implement network security", "Troubleshoot connectivity"]
            }
        ]
    },
    ba: {
        name: "Business Analytics",
        courses: [
            {
                id: 401,
                code: "BA201",
                name: "Business Statistics",
                credits: 3,
                level: "beginner",
                instructor: "Prof. Linda White",
                capacity: 40,
                enrolled: 35,
                description: "Statistical methods for business decision making including probability, hypothesis testing, regression.",
                topics: ["Descriptive Stats", "Probability", "Hypothesis Testing", "Regression", "Time Series"],
                units: [
                    { name: "Unit 1: Descriptive Statistics", topics: ["Measures of Central Tendency", "Measures of Dispersion", "Data Visualization", "Sampling Methods"] },
                    { name: "Unit 2: Probability", topics: ["Basic Probability", "Conditional Probability", "Bayes Theorem", "Probability Distributions"] },
                    { name: "Unit 3: Hypothesis Testing", topics: ["Null/Alternative Hypothesis", "Z-tests", "T-tests", "Chi-square Tests", "P-values"] },
                    { name: "Unit 4: Regression Analysis", topics: ["Simple Linear Regression", "Multiple Regression", "Model Assumptions", "Interpretation"] }
                ],
                prerequisites: "Basic math",
                outcomes: ["Analyze business data", "Perform statistical tests", "Build regression models", "Make data-driven decisions"]
            }
        ]
    },
    cyber: {
        name: "Cybersecurity",
        courses: [
            {
                id: 501,
                code: "SEC101",
                name: "Introduction to Cybersecurity",
                credits: 3,
                level: "beginner",
                instructor: "Dr. Kevin Mitnick",
                capacity: 35,
                enrolled: 32,
                description: "Fundamentals of cybersecurity including threats, vulnerabilities, cryptography, and security best practices.",
                topics: ["Security Concepts", "Threat Landscape", "Cryptography", "Network Security", "Web Security"],
                units: [
                    { name: "Unit 1: Security Fundamentals", topics: ["CIA Triad", "Authentication Methods", "Access Control Models", "Security Policies"] },
                    { name: "Unit 2: Cryptography", topics: ["Symmetric Encryption", "Asymmetric Encryption", "Hash Functions", "Digital Signatures", "PKI"] },
                    { name: "Unit 3: Network Security", topics: ["Firewalls", "IDS/IPS Systems", "VPN Technologies", "Secure Protocols"] },
                    { name: "Unit 4: Web Security", topics: ["OWASP Top 10", "SQL Injection", "XSS Attacks", "CSRF", "Secure Coding"] }
                ],
                prerequisites: "Networking basics",
                outcomes: ["Identify security threats", "Implement security controls", "Respond to incidents", "Apply cryptography"]
            }
        ]
    },
    ai: {
        name: "Artificial Intelligence",
        courses: [
            {
                id: 601,
                code: "AI101",
                name: "Introduction to AI",
                credits: 3,
                level: "beginner",
                instructor: "Prof. Stuart Russell",
                capacity: 40,
                enrolled: 37,
                description: "Foundations of artificial intelligence including search algorithms, knowledge representation, and intelligent agents.",
                topics: ["AI History", "Intelligent Agents", "Search Algorithms", "Game Playing", "Knowledge Representation"],
                units: [
                    { name: "Unit 1: AI Foundations", topics: ["History of AI", "Turing Test", "Intelligent Agents", "AI Applications"] },
                    { name: "Unit 2: Search Algorithms", topics: ["Uninformed Search", "Informed Search (A*)", "Heuristics", "Local Search"] },
                    { name: "Unit 3: Knowledge Representation", topics: ["Logic and Reasoning", "Semantic Networks", "Ontologies", "Rule-Based Systems"] },
                    { name: "Unit 4: Game Playing", topics: ["Minimax Algorithm", "Alpha-Beta Pruning", "Game Theory", "Monte Carlo Tree Search"] }
                ],
                prerequisites: "Programming basics",
                outcomes: ["Implement search algorithms", "Design intelligent agents", "Understand AI ethics", "Build simple AI systems"]
            }
        ]
    }
};

// Build courses array from database
function buildCourseDatabase() {
    const courses = [];
    for (const [deptKey, deptData] of Object.entries(courseDatabase)) {
        for (const course of deptData.courses) {
            courses.push({
                ...course,
                department: deptKey,
                departmentName: deptData.name
            });
        }
    }
    return courses;
}

function loadCourses() {
    allCourses = buildCourseDatabase();
    saveData('courses', allCourses);
    
    const students = loadData('students') || [];
    const currentStudent = students[0];
    
    renderCourses(allCourses, currentStudent);
    updateCourseCount(allCourses.length);
}

function renderCourses(courses, currentStudent) {
    const container = document.getElementById('courses-container');
    if (!container) return;
    
    if (courses.length === 0) {
        container.innerHTML = '<div class="no-results"><div class="no-results-icon"><i class="fas fa-search"></i></div><h3>No courses found</h3><p>Try adjusting your search or filters</p></div>';
        return;
    }
    
    container.innerHTML = courses.map(course => {
        const isEnrolled = currentStudent && currentStudent.enrolledCourses.includes(course.id);
        const isFull = course.enrolled >= course.capacity;
        const availableSeats = course.capacity - course.enrolled;
        
        let status = 'open';
        let statusText = 'Open';
        let statusClass = 'status-open';
        
        if (isFull) {
            status = 'full';
            statusText = 'Full';
            statusClass = 'status-full';
        } else if (availableSeats <= 5) {
            status = 'closing';
            statusText = 'Almost Full';
            statusClass = 'status-closing';
        }
        
        return `
            <div class="course-card" onclick="viewCourseDetails(${course.id})">
                <div class="course-header">
                    <span class="course-code">${course.code}</span>
                    <h3>${course.name}</h3>
                    <div class="course-dept">
                        <i class="fas fa-building"></i>
                        <span>${course.departmentName}</span>
                    </div>
                </div>
                <div class="course-body">
                    <div class="course-stats">
                        <div class="stat">
                            <span class="stat-value">${course.credits}</span>
                            <span class="stat-label">Credits</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</span>
                            <span class="stat-label">Level</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value ${statusClass}">${statusText}</span>
                            <span class="stat-label">Status</span>
                        </div>
                    </div>
                    <p class="course-description">${course.description.substring(0, 100)}...</p>
                    <div class="course-topics">
                        ${course.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                    </div>
                    <div class="course-actions" onclick="event.stopPropagation()">
                        ${!isEnrolled && !isFull ? 
                            `<button class="btn btn-primary btn-sm" onclick="registerForCourse(${course.id})">Enroll Now</button>` : 
                            isEnrolled ? 
                            `<button class="btn btn-outline btn-sm" disabled style="opacity:0.5;"><i class="fas fa-check"></i> Enrolled</button>` :
                            `<button class="btn btn-outline btn-sm" disabled>Join Waitlist</button>`
                        }
                        <button class="btn btn-outline btn-sm" onclick="viewCourseDetails(${course.id})">View Details</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function viewCourseDetails(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;
    
    currentModalCourse = course;
    
    const modalContent = document.getElementById('course-detail-content');
    const modalTitle = document.getElementById('modalCourseTitle');
    const enrollBtn = document.getElementById('modalEnrollBtn');
    
    if (modalTitle) modalTitle.textContent = `${course.code}: ${course.name}`;
    
    // Check enrollment status for button
    const students = loadData('students') || [];
    const currentStudent = students[0];
    const isEnrolled = currentStudent && currentStudent.enrolledCourses.includes(course.id);
    const isFull = course.enrolled >= course.capacity;
    
    if (enrollBtn) {
        if (isEnrolled) {
            enrollBtn.textContent = 'Already Enrolled';
            enrollBtn.disabled = true;
            enrollBtn.style.opacity = '0.5';
            enrollBtn.style.cursor = 'not-allowed';
        } else if (isFull) {
            enrollBtn.textContent = 'Join Waitlist';
            enrollBtn.disabled = false;
            enrollBtn.style.opacity = '1';
        } else {
            enrollBtn.textContent = 'Enroll Now';
            enrollBtn.disabled = false;
            enrollBtn.style.opacity = '1';
        }
    }
    
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="course-detail">
                <div class="detail-header">
                    <div class="detail-meta">
                        <span class="meta-item"><i class="fas fa-star"></i> ${course.credits} Credits</span>
                        <span class="meta-item"><i class="fas fa-user"></i> ${course.instructor}</span>
                        <span class="meta-item"><i class="fas fa-chart-line"></i> ${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</span>
                        <span class="meta-item"><i class="fas fa-users"></i> ${course.enrolled}/${course.capacity} Enrolled</span>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Course Description</h4>
                    <p>${course.description}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Topics Covered</h4>
                    <div class="topics-grid">
                        ${course.topics.map(topic => `<span class="topic-badge">${topic}</span>`).join('')}
                    </div>
                </div>
                
                <div class="units-section">
                    <h4>Course Units</h4>
                    <div class="unit-list">
                        ${course.units.map((unit, idx) => `
                            <div class="unit-item">
                                <div class="unit-header" onclick="toggleUnit(${idx})">
                                    <span class="unit-name">${unit.name}</span>
                                    <span class="unit-toggle"><i class="fas fa-chevron-down" id="unitIcon${idx}"></i></span>
                                </div>
                                <div class="unit-topics" id="unitTopics${idx}">
                                    <ul class="topic-list">
                                        ${unit.topics.map(topic => `<li><i class="fas fa-circle"></i> ${topic}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="prerequisites">
                    <h4>Prerequisites</h4>
                    <p>${course.prerequisites}</p>
                </div>
                
                <div class="learning-outcomes">
                    <h4>Learning Outcomes</h4>
                    <ul>
                        ${course.outcomes.map(outcome => `<li><i class="fas fa-check-circle"></i> ${outcome}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    openModal('courseDetailModal');
}

// Global toggle function for units
function toggleUnit(index) {
    const topicsDiv = document.getElementById(`unitTopics${index}`);
    const icon = document.getElementById(`unitIcon${index}`);
    
    if (topicsDiv) {
        if (topicsDiv.classList.contains('expanded')) {
            topicsDiv.classList.remove('expanded');
            if (icon) icon.className = 'fas fa-chevron-down';
        } else {
            topicsDiv.classList.add('expanded');
            if (icon) icon.className = 'fas fa-chevron-up';
        }
    }
}

function enrollFromModal() {
    if (currentModalCourse) {
        registerForCourse(currentModalCourse.id);
        closeModal('courseDetailModal');
    }
}

function registerForCourse(courseId) {
    const students = loadData('students') || [];
    const currentStudent = students[0];
    
    if (!currentStudent) {
        showToast('Please login first', 'error');
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }
    
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;
    
    if (course.enrolled >= course.capacity) {
        showToast(`${course.code} is full. Join waitlist?`, 'warning');
        return;
    }
    
    if (currentStudent.enrolledCourses.includes(course.id)) {
        showToast(`Already enrolled in ${course.code}`, 'warning');
        return;
    }
    
    const totalCredits = currentStudent.enrolledCourses.reduce((sum, id) => {
        const c = allCourses.find(c => c.id === id);
        return sum + (c ? c.credits : 0);
    }, 0);
    
    if (totalCredits + course.credits > 18) {
        showToast(`Credit limit exceeded. Max 18 credits.`, 'error');
        return;
    }
    
    currentStudent.enrolledCourses.push(course.id);
    saveData('students', students);
    
    // Update course enrollment in database
    const courseIndex = allCourses.findIndex(c => c.id === courseId);
    if (courseIndex !== -1) {
        allCourses[courseIndex].enrolled += 1;
        saveData('courses', allCourses);
    }
    
    showToast(`Enrolled in ${course.code}: ${course.name}`, 'success');
    
    // Refresh the display
    const studentsUpdated = loadData('students') || [];
    const updatedStudent = studentsUpdated[0];
    renderCourses(allCourses, updatedStudent);
    updateCourseCount(allCourses.length);
}

function updateCourseCount(count) {
    const countElement = document.getElementById('visibleCount');
    if (countElement) countElement.textContent = count;
}

function filterCourses() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const levelFilter = document.getElementById('levelFilter')?.value || 'all';
    const creditFilter = document.getElementById('creditFilter')?.value || 'all';
    const activeDept = document.querySelector('.dept-tab.active')?.dataset.dept || 'all';
    
    const students = loadData('students') || [];
    const currentStudent = students[0];
    
    const filtered = allCourses.filter(course => {
        const matchesSearch = course.code.toLowerCase().includes(searchTerm) || 
                             course.name.toLowerCase().includes(searchTerm) ||
                             course.instructor.toLowerCase().includes(searchTerm) ||
                             course.departmentName.toLowerCase().includes(searchTerm);
        const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
        const matchesCredit = creditFilter === 'all' || course.credits === parseInt(creditFilter);
        const matchesDept = activeDept === 'all' || course.department === activeDept;
        
        return matchesSearch && matchesLevel && matchesCredit && matchesDept;
    });
    
    renderCourses(filtered, currentStudent);
    updateCourseCount(filtered.length);
    updateActiveFilters();
    
    const clearBtn = document.getElementById('clearSearch');
    if (clearBtn) clearBtn.classList.toggle('visible', searchTerm.length > 0);
}

function updateActiveFilters() {
    const searchTerm = document.getElementById('searchInput')?.value || '';
    const levelFilter = document.getElementById('levelFilter')?.value || 'all';
    const creditFilter = document.getElementById('creditFilter')?.value || 'all';
    
    const container = document.getElementById('activeFilters');
    if (!container) return;
    
    const filters = [];
    if (searchTerm) filters.push({ type: 'search', value: searchTerm, label: `Search: ${searchTerm}` });
    if (levelFilter !== 'all') filters.push({ type: 'level', value: levelFilter, label: `Level: ${levelFilter}` });
    if (creditFilter !== 'all') filters.push({ type: 'credit', value: creditFilter, label: `${creditFilter} Credits` });
    
    if (filters.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        ${filters.map(filter => `
            <div class="filter-badge">
                <span>${filter.label}</span>
                <button class="remove-filter" data-type="${filter.type}" data-value="${filter.value}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('')}
        <button class="clear-all" id="clearAllFilters">Clear All</button>
    `;
    
    document.querySelectorAll('.remove-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = btn.dataset.type;
            removeFilter(type);
        });
    });
    
    const clearAllBtn = document.getElementById('clearAllFilters');
    if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllFilters);
}

function removeFilter(type) {
    if (type === 'search') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
    } else if (type === 'level') {
        const levelFilter = document.getElementById('levelFilter');
        if (levelFilter) levelFilter.value = 'all';
    } else if (type === 'credit') {
        const creditFilter = document.getElementById('creditFilter');
        if (creditFilter) creditFilter.value = 'all';
    }
    filterCourses();
}

function clearAllFilters() {
    const searchInput = document.getElementById('searchInput');
    const levelFilter = document.getElementById('levelFilter');
    const creditFilter = document.getElementById('creditFilter');
    
    if (searchInput) searchInput.value = '';
    if (levelFilter) levelFilter.value = 'all';
    if (creditFilter) creditFilter.value = 'all';
    
    filterCourses();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', debounce(filterCourses, 300));
    
    const clearSearchBtn = document.getElementById('clearSearch');
    if (clearSearchBtn) clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        filterCourses();
    });
    
    const levelFilter = document.getElementById('levelFilter');
    if (levelFilter) levelFilter.addEventListener('change', filterCourses);
    
    const creditFilter = document.getElementById('creditFilter');
    if (creditFilter) creditFilter.addEventListener('change', filterCourses);
    
    // Department tabs
    const deptTabs = document.querySelectorAll('.dept-tab');
    deptTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            deptTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterCourses();
        });
    });
});

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}