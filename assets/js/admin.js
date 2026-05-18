function loadAdminDashboard() {
    const students = loadData('students') || [];
    const courses = loadData('courses') || [];
    
    const totalStudents = students.length;
    const totalCourses = courses.length;
    const totalRegistrations = students.reduce((sum, s) => sum + (s.enrolledCourses?.length || 0), 0);
    const revenue = totalRegistrations * 500;
    
    document.getElementById('total-students').textContent = totalStudents;
    document.getElementById('total-courses').textContent = totalCourses;
    document.getElementById('total-registrations').textContent = totalRegistrations;
    document.getElementById('total-revenue').textContent = '$' + revenue.toLocaleString();
    
    loadRecentRegistrations();
    loadEnrollmentChart();
    loadCourseDistribution();
}

function loadRecentRegistrations() {
    const students = loadData('students') || [];
    const courses = loadData('courses') || [];
    const container = document.getElementById('recent-registrations');
    
    if (!container) return;
    
    const registrations = [];
    students.forEach(student => {
        student.enrolledCourses?.forEach(courseId => {
            const course = courses.find(c => c.id === courseId);
            if (course) {
                registrations.push({
                    studentId: student.id,
                    studentName: student.name,
                    course: course.code,
                    date: new Date().toISOString().split('T')[0]
                });
            }
        });
    });
    
    if (registrations.length === 0) {
        container.innerHTML = '<tr><td colspan="4" style="text-align: center;">No registrations yet</td></tr>';
        return;
    }
    
    container.innerHTML = registrations.slice(0, 5).map(reg => `
        <tr>
            <td>${reg.studentId}</td>
            <td>${reg.studentName}</td>
            <td>${reg.course}</td>
            <td><span style="color: #10b981;">Confirmed</span></td>
        </tr>
    `).join('');
}

function loadEnrollmentChart() {
    const courses = loadData('courses') || [];
    const topCourses = [...courses].sort((a, b) => b.enrolled - a.enrolled).slice(0, 5);
    const container = document.getElementById('enrollment-chart');
    
    if (!container) return;
    
    container.innerHTML = topCourses.map(course => `
        <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span style="font-size: 0.85rem;">${course.code}</span>
                <span style="font-size: 0.85rem;">${course.enrolled}/${course.capacity}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(course.enrolled / course.capacity) * 100}%"></div>
            </div>
        </div>
    `).join('');
}

function loadCourseDistribution() {
    const courses = loadData('courses') || [];
    const departments = {};
    
    courses.forEach(course => {
        departments[course.department] = (departments[course.department] || 0) + 1;
    });
    
    const total = courses.length;
    const colors = { cs: '#3b82f6', ds: '#8b5cf6', it: '#10b981', ba: '#f59e0b', math: '#ef4444' };
    const container = document.getElementById('course-distribution');
    
    if (!container) return;
    
    container.innerHTML = Object.entries(departments).map(([dept, count]) => `
        <div class="distribution-item">
            <div class="distribution-color" style="background: ${colors[dept] || '#3b82f6'}"></div>
            <div class="distribution-name">${dept.toUpperCase()}</div>
            <div class="distribution-bar">
                <div class="distribution-fill" style="width: ${(count/total)*100}%; background: ${colors[dept] || '#3b82f6'}"></div>
            </div>
            <div class="distribution-percent">${Math.round((count/total)*100)}%</div>
        </div>
    `).join('');
}

function quickAction(action) {
    switch(action) {
        case 'add-course':
            window.location.href = 'admin-manage-courses.html';
            break;
        default:
            showToast('Feature coming soon', 'info');
    }
}

document.addEventListener('DOMContentLoaded', loadAdminDashboard);