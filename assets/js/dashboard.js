let currentStudent = null;
let enrolledCourses = [];

function loadDashboard() {
    const students = loadData('students') || [];
    currentStudent = students[0];
    
    if (!currentStudent) return;
    
    document.getElementById('student-name').textContent = currentStudent.name;
    document.getElementById('student-id').textContent = currentStudent.id;
    document.getElementById('student-email').textContent = currentStudent.email;
    
    loadEnrolledCourses();
    updateStats();
    loadTodaySchedule();
    loadUpcomingAssignments();
    loadAnnouncements();
}

function loadEnrolledCourses() {
    const allCourses = loadData('courses') || [];
    enrolledCourses = allCourses.filter(c => currentStudent.enrolledCourses.includes(c.id));
    
    const container = document.getElementById('enrolled-courses-container');
    if (!container) return;
    
    if (enrolledCourses.length === 0) {
        container.innerHTML = '<div class="card" style="text-align: center; padding: 2rem;"><p>No courses enrolled yet.</p><a href="courses.html" class="btn btn-primary" style="margin-top: 1rem;">Browse Courses</a></div>';
        return;
    }
    
    container.innerHTML = enrolledCourses.map(course => `
        <div class="course-item">
            <div class="course-info">
                <h3>${course.code} - ${course.name}</h3>
                <p>${course.instructor}</p>
                <p style="font-size: 0.8rem; color: var(--gray);">${course.schedule || 'Schedule TBA'}</p>
            </div>
            <div class="course-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.floor(Math.random() * 40 + 50)}%"></div>
                </div>
                <div class="progress-text">${Math.floor(Math.random() * 40 + 50)}% complete</div>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const totalCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);
    const completionRate = Math.min(100, Math.floor((enrolledCourses.length / 5) * 100));
    
    document.getElementById('courses-count').textContent = enrolledCourses.length;
    document.getElementById('credits-count').textContent = totalCredits;
    document.getElementById('completion-rate').textContent = completionRate + '%';
    document.getElementById('gpa-value').textContent = currentStudent.gpa || '3.6';
}

function loadTodaySchedule() {
    const container = document.getElementById('today-schedule');
    if (!container) return;
    
    const todayCourses = enrolledCourses.slice(0, 3);
    
    if (todayCourses.length === 0) {
        container.innerHTML = '<p>No classes scheduled for today.</p>';
        return;
    }
    
    container.innerHTML = todayCourses.map((course, index) => `
        <div class="schedule-item">
            <div class="schedule-time">${index === 0 ? '10:00 AM' : index === 1 ? '1:00 PM' : '3:00 PM'}</div>
            <div class="schedule-details">
                <h4>${course.code} - ${course.name}</h4>
                <p>${course.instructor}</p>
            </div>
        </div>
    `).join('');
}

function loadUpcomingAssignments() {
    const assignments = [
        { course: 'CS301 - Data Structures', title: 'Binary Tree Implementation', due: '2024-03-20' },
        { course: 'CS402 - Web Development', title: 'React Project Phase 1', due: '2024-03-22' },
        { course: 'MAT210 - Linear Algebra', title: 'Matrix Operations Quiz', due: '2024-03-18' }
    ];
    
    const container = document.getElementById('upcoming-assignments');
    if (!container) return;
    
    container.innerHTML = assignments.map(assignment => `
        <div class="assignment-item">
            <div>
                <div class="assignment-name">${assignment.title}</div>
                <div class="assignment-course">${assignment.course}</div>
            </div>
            <div class="assignment-due">Due: ${formatDate(assignment.due)}</div>
        </div>
    `).join('');
}

function loadAnnouncements() {
    const announcements = [
        { title: 'Final Exam Schedule Released', content: 'Final exams will be held from April 25-30.', date: '2024-03-10' },
        { title: 'Career Fair 2024', content: 'Top tech companies visiting campus on March 20th.', date: '2024-03-08' },
        { title: 'Library Hours Extended', content: 'Library open until midnight during finals week.', date: '2024-03-12' }
    ];
    
    const container = document.getElementById('announcements-container');
    if (!container) return;
    
    container.innerHTML = announcements.map(announcement => `
        <div class="announcement-item">
            <div class="announcement-title">${announcement.title}</div>
            <div class="announcement-date">${formatDate(announcement.date)}</div>
            <div class="announcement-content">${announcement.content}</div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadDashboard);