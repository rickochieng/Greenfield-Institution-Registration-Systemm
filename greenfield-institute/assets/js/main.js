function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    toast.innerHTML = `<i style="margin-right: 8px;">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</i> ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    if (event.target.classList && event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function getCourseById(courseId) {
    const courses = loadData('courses') || [];
    return courses.find(c => c.id === parseInt(courseId));
}

function updateCourseEnrollment(courseId, change) {
    const courses = loadData('courses') || [];
    const index = courses.findIndex(c => c.id === parseInt(courseId));
    if (index !== -1) {
        courses[index].enrolled += change;
        saveData('courses', courses);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function initSampleData() {
    if (!loadData('courses')) {
        const sampleCourses = [
            { id: 1, code: 'CS101', name: 'Introduction to Programming', credits: 3, instructor: 'Dr. James Wilson', capacity: 40, enrolled: 35, department: 'cs', schedule: 'Mon/Wed 9:00 AM - 10:30 AM' },
            { id: 2, code: 'DS201', name: 'Data Analytics', credits: 4, instructor: 'Prof. Angela Davis', capacity: 30, enrolled: 28, department: 'ds', schedule: 'Tue/Thu 11:00 AM - 1:00 PM' },
            { id: 3, code: 'IT150', name: 'Network Security', credits: 3, instructor: 'Dr. Robert Taylor', capacity: 25, enrolled: 22, department: 'it', schedule: 'Mon/Wed 2:00 PM - 3:30 PM' },
            { id: 4, code: 'BA301', name: 'Business Strategy', credits: 3, instructor: 'Prof. Linda White', capacity: 30, enrolled: 30, department: 'ba', schedule: 'Friday 10:00 AM - 1:00 PM' },
            { id: 5, code: 'CS305', name: 'Data Structures and Algorithms', credits: 4, instructor: 'Dr. Alan Turing', capacity: 25, enrolled: 18, department: 'cs', schedule: 'Tue/Thu 3:00 PM - 5:00 PM' },
            { id: 6, code: 'DS101', name: 'Python for Data Science', credits: 2, instructor: 'Prof. Sarah Johnson', capacity: 50, enrolled: 45, department: 'ds', schedule: 'Online - Asynchronous' },
            { id: 7, code: 'CS402', name: 'Web Development', credits: 3, instructor: 'Prof. Michael Brown', capacity: 35, enrolled: 32, department: 'cs', schedule: 'Mon/Wed 1:00 PM - 2:30 PM' },
            { id: 8, code: 'MAT210', name: 'DevOps Fundamentals', credits: 3, instructor: 'Dr. Sarah Martinez', capacity: 35, enrolled: 30, department: 'math', schedule: 'Tue/Thu 9:00 AM - 10:30 AM' }
        ];
        saveData('courses', sampleCourses);
    }
    
    if (!loadData('students')) {
        const sampleStudents = [
            { id: 'GF2024001', name: 'Sarah Johnson', email: 'sarah@greenfield.edu', phone: '+1 234 567 8900', department: 'cs', enrolledCourses: [1, 3, 5, 8], gpa: 3.8 }
        ];
        saveData('students', sampleStudents);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', initSampleData);