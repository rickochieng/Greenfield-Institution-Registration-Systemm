let allCourses = [];
let editMode = false;
let editingId = null;

function loadCoursesTable() {
    allCourses = loadData('courses') || [];
    const container = document.getElementById('courses-table-body');
    
    if (!container) return;
    
    if (allCourses.length === 0) {
        container.innerHTML = '<tr><td colspan="8" style="text-align: center;">No courses found. Click "Add New Course" to create one.</td></tr>';
        return;
    }
    
    container.innerHTML = allCourses.map(course => `
        <tr>
            <td>${course.id}</td>
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.credits}</td>
            <td>${course.instructor}</td>
            <td>${course.capacity}</td>
            <td>${course.enrolled}</td>
            <td class="action-icons">
                <a onclick="editCourse(${course.id})">✏️</a>
                <a onclick="deleteCourse(${course.id})" class="delete">🗑️</a>
                <a onclick="viewCourseDetails(${course.id})">👁️</a>
            </td>
        </tr>
    `).join('');
}

function openCourseModal(edit = false, course = null) {
    editMode = edit;
    editingId = course?.id || null;
    
    document.getElementById('modal-title').textContent = edit ? 'Edit Course' : 'Add New Course';
    const form = document.getElementById('course-form');
    
    if (edit && course) {
        document.getElementById('course-code').value = course.code;
        document.getElementById('course-name').value = course.name;
        document.getElementById('course-credits').value = course.credits;
        document.getElementById('course-instructor').value = course.instructor;
        document.getElementById('course-capacity').value = course.capacity;
        document.getElementById('course-department').value = course.department;
        document.getElementById('course-schedule').value = course.schedule || '';
    } else {
        form?.reset();
    }
    
    openModal('courseModal');
}

function saveCourse() {
    const code = document.getElementById('course-code')?.value.trim();
    const name = document.getElementById('course-name')?.value.trim();
    const credits = parseInt(document.getElementById('course-credits')?.value);
    const instructor = document.getElementById('course-instructor')?.value.trim();
    const capacity = parseInt(document.getElementById('course-capacity')?.value);
    const department = document.getElementById('course-department')?.value;
    const schedule = document.getElementById('course-schedule')?.value.trim();
    
    if (!code || !name || !credits || !instructor || !capacity || !department) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    const courses = loadData('courses') || [];
    
    if (editMode && editingId) {
        const index = courses.findIndex(c => c.id === editingId);
        if (index !== -1) {
            courses[index] = { ...courses[index], code, name, credits, instructor, capacity, department, schedule: schedule || 'TBA' };
            showToast(`Course ${code} updated`, 'success');
        }
    } else {
        const newId = Math.max(...courses.map(c => c.id), 0) + 1;
        courses.push({
            id: newId, code, name, credits, instructor, capacity, enrolled: 0, department, schedule: schedule || 'TBA'
        });
        showToast(`Course ${code} added`, 'success');
    }
    
    saveData('courses', courses);
    closeModal('courseModal');
    loadCoursesTable();
}

function editCourse(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    if (course) openCourseModal(true, course);
}

function deleteCourse(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;
    
    if (confirm(`Delete ${course.code} - ${course.name}?`)) {
        const courses = allCourses.filter(c => c.id !== courseId);
        saveData('courses', courses);
        allCourses = courses;
        loadCoursesTable();
        showToast(`Course ${course.code} deleted`, 'warning');
    }
}

function viewCourseDetails(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;
    
    const modalContent = document.getElementById('course-detail-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <h3>${course.code} - ${course.name}</h3>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Department:</strong> ${course.department.toUpperCase()}</p>
            <p><strong>Schedule:</strong> ${course.schedule || 'TBA'}</p>
            <p><strong>Enrolled:</strong> ${course.enrolled}/${course.capacity}</p>
        `;
        openModal('courseDetailModal');
    }
}

function filterTable() {
    const searchTerm = document.getElementById('tableSearch')?.value.toLowerCase() || '';
    const creditFilter = document.getElementById('creditFilter')?.value || 'all';
    const rows = document.querySelectorAll('#courses-table-body tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            const code = cells[1]?.textContent.toLowerCase() || '';
            const name = cells[2]?.textContent.toLowerCase() || '';
            const credits = cells[3]?.textContent || '';
            const matchesSearch = code.includes(searchTerm) || name.includes(searchTerm);
            const matchesCredit = creditFilter === 'all' || credits === creditFilter;
            row.style.display = matchesSearch && matchesCredit ? '' : 'none';
        }
    });
}

const debouncedFilter = debounce(filterTable, 300);

document.addEventListener('DOMContentLoaded', () => {
    loadCoursesTable();
    
    const searchInput = document.getElementById('tableSearch');
    if (searchInput) searchInput.addEventListener('input', debouncedFilter);
    
    const creditFilter = document.getElementById('creditFilter');
    if (creditFilter) creditFilter.addEventListener('change', filterTable);
});