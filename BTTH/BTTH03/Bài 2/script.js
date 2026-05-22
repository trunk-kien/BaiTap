// --- 1. KHỞI TẠO MẢNG DỮ LIỆU & ĐỌC LOCALSTORAGE ---
// Thay thế dòng khởi tạo cũ bằng đoạn này nếu muốn có sẵn 5 bản ghi mẫu khi chưa có localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [
    {
        id: "task_sample_1",
        title: "Hoàn thành bài tập Java OOP",
        desc: "Làm nốt phần kế thừa và ghi đè phương thức cho class Nhân Viên.",
        deadline: "2026-05-25",
        priority: "Cao",
        isCompleted: false
    },
    {
        id: "task_sample_2",
        title: "Thiết kế cơ sở dữ liệu SQL cho ShopTLU",
        desc: "Tạo các bảng Quản lý Sản phẩm, Hóa đơn và viết các ràng buộc khóa ngoại.",
        deadline: "2026-05-28",
        priority: "Cao",
        isCompleted: true
    },
    {
        id: "task_sample_3",
        title: "Dọn dẹp và tối ưu bộ nhớ máy tính",
        desc: "Chạy Disk Cleanup, gỡ driver cũ bằng DDU và cài lại Armoury Crate.",
        deadline: "2026-05-30",
        priority: "Trung bình",
        isCompleted: false
    },
    {
        id: "task_sample_4",
        title: "Mua switch cơ học Bsun Taichi",
        desc: "Đặt mua thêm một pack switch khấc (tactile) phân khúc giá rẻ để chuẩn bị build phím mới.",
        deadline: "2026-06-02",
        priority: "Thấp",
        isCompleted: false
    },
    {
        id: "task_sample_5",
        title: "Lên kế hoạch tổ chức kỷ niệm tại Hà Nội",
        desc: "Tìm quán ăn ấm cúng và chuẩn bị một món quà nhỏ nhân dịp một năm.",
        deadline: "2026-06-05",
        priority: "Trung bình",
        isCompleted: true
    }
]; // [cite: 3, 4]

// --- 2. TRUY XUẤT CÁC PHẦN TỬ DOM BẮT BUỘC ---
const btnOpenForm = document.getElementById('btn-open-form'); // [cite: 72]
const btnCloseForm = document.getElementById('btn-close-form'); // [cite: 73]
const taskModal = document.getElementById('task-modal'); // 
const taskForm = document.getElementById('task-form'); // [cite: 74]
const taskList = document.getElementById('task-list'); // [cite: 75]
const modalTitle = document.getElementById('modal-title');
const toastNode = document.getElementById('toast-notification'); // [cite: 77]

// Các trường thông tin form
const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskDeadlineInput = document.getElementById('task-deadline');
const taskPriorityInput = document.getElementById('task-priority');

// Các phần tử thống kê
const statTotal = document.getElementById('stat-total'); // [cite: 78]
const statCompleted = document.getElementById('stat-completed'); // [cite: 78]
const statPending = document.getElementById('stat-pending'); // [cite: 78]

// Chế độ form: 'add' (Thêm mới) hoặc 'edit' (Cập nhật)
let formMode = 'add'; 

// --- 3. HÀM THÔNG BÁO (TOAST) ---
function showToast(message) { // 
    toastNode.textContent = message;
    toastNode.classList.add('show', 'success');
    setTimeout(() => {
        toastNode.classList.remove('show');
    }, 3000);
}

// --- 4. HÀM CẬP NHẬT THỐNG KÊ ---
function updateStatistics() { // [cite: 14, 22, 29, 35]
    const total = tasks.length; // [cite: 48]
    const completed = tasks.filter(task => task.isCompleted).length; // [cite: 49]
    const pending = total - completed; // [cite: 50]

    statTotal.textContent = total;
    statCompleted.textContent = completed;
    statPending.textContent = pending;
}

// --- 5. HÀM LƯU DỮ LIỆU VÀO LOCALSTORAGE ---
function saveToLocalStorage() { // [cite: 12, 27, 34]
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- 6. HÀM RENDER GIAO DIỆN DANH SÁCH ---
function renderTasks() { // [cite: 5, 13, 21, 28]
    taskList.innerHTML = '';

    // Kiểm tra nếu mảng trống thì hiển thị trạng thái rỗng
    if (tasks.length === 0) { // [cite: 6]
        taskList.innerHTML = `<div class="empty-state">Chưa có công việc nào được tạo. Hãy bấm "Thêm công việc"!</div>`; // [cite: 6]
        return;
    }

    // Duyệt mảng và render ra cấu trúc Card
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.isCompleted ? 'is-completed' : ''}`;
        card.setAttribute('data-id', task.id);

        card.innerHTML = `
            <div>
                <div class="task-header">
                    <input type="checkbox" class="task-checkbox" ${task.isCompleted ? 'checked' : ''}> <span class="task-title-text">${task.title}</span>
                </div>
                <p class="task-desc">${task.desc || '<i>Không có mô tả</i>'}</p>
                <div class="task-meta">
                    <div><strong>Hạn:</strong> ${task.deadline}</div>
                    <div><strong>Ưu tiên:</strong> <span class="priority-badge">${task.priority}</span></div>
                </div>
            </div>
            <div class="task-footer">
                <button class="btn btn-edit btn-small">Sửa</button> <button class="btn btn-delete btn-small">Xóa</button> </div>
        `;

        taskList.appendChild(card);
    });
}

// --- 7. QUẢN LÝ ĐÓNG / MỞ POPUP FORM ---
function openModal(mode = 'add') {
    clearErrors(); // Xóa lỗi cũ mỗi khi mở form mới
    formMode = mode;
    taskModal.classList.add('show');
    if (mode === 'add') {
        modalTitle.textContent = "Thêm công việc mới";
        taskForm.reset();
        taskIdInput.value = '';
    } else {
        modalTitle.textContent = "Cập nhật công việc";
    }
}

function closeModal() { // [cite: 15]
    clearErrors(); // Xóa lỗi khi đóng form
    taskModal.classList.remove('show');
    taskForm.reset();
}

// Lắng nghe sự kiện Đóng/Mở Form
btnOpenForm.addEventListener('click', () => openModal('add')); // [cite: 80]
btnCloseForm.addEventListener('click', closeModal); // [cite: 81]
window.addEventListener('click', (e) => { if (e.target === taskModal) closeModal(); });

// --- 8. XỬ LÝ SỰ KIỆN SUBMIT FORM (THÊM HOẶC SỬA) ---
// Hàm xóa sạch các thông báo lỗi cũ khi mở lại form hoặc chuẩn bị check lại
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
    
    const invalidInputs = document.querySelectorAll('.invalid');
    invalidInputs.forEach(input => input.classList.remove('invalid'));
}

// Hàm thực hiện kiểm tra toàn bộ Form
function validateForm() {
    clearErrors(); // Reset lỗi trước khi check
    let isValid = true;

    // 1. Lấy dữ liệu từ các ô input
    const title = taskTitleInput.value.trim(); //
    const desc = taskDescInput.value.trim(); //
    const deadline = taskDeadlineInput.value; //

    // 2. Validate Tiêu đề công việc 
    if (title === "") {
        document.getElementById('title-error').textContent = "Tiêu đề công việc không được để trống.";
        taskTitleInput.classList.add('invalid');
        isValid = false;
    } else if (title.length > 100) {
        document.getElementById('title-error').textContent = "Tiêu đề không được vượt quá 100 ký tự.";
        taskTitleInput.classList.add('invalid');
        isValid = false;
    }

    // 3. Validate Mô tả ngắn (Nếu có nhập) 
    if (desc.length > 500) {
        document.getElementById('desc-error').textContent = "Mô tả ngắn không được vượt quá 500 ký tự.";
        taskDescInput.classList.add('invalid');
        isValid = false;
    }

    // 4. Validate Hạn hoàn thành 
    if (deadline === "") {
        document.getElementById('deadline-error').textContent = "Vui lòng chọn hạn hoàn thành.";
        taskDeadlineInput.classList.add('invalid');
        isValid = false;
    } else {
        // Tạo object ngày hôm nay nhưng đặt giờ về 00:00:00 để so sánh chuẩn ngày
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const selectedDate = new Date(deadline);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            document.getElementById('deadline-error').textContent = "Hạn hoàn thành không được là ngày trong quá khứ.";
            taskDeadlineInput.classList.add('invalid');
            isValid = false;
        }
    }

    return isValid;
}

// --- 8. XỬ LÝ SỰ KIỆN SUBMIT FORM (THÊM HOẶC SỬA) ---
taskForm.addEventListener('submit', (e) => { //
    e.preventDefault(); // Chặn hành vi tải lại trang mặc định [cite: 82]

    // Gọi hàm kiểm tra dữ liệu, nếu trả về false thì dừng lại luôn, không lưu
    if (!validateForm()) {
        return; 
    }

    // Nếu qua được validation, lấy các giá trị đã chuẩn hóa
    const title = taskTitleInput.value.trim(); //
    const desc = taskDescInput.value.trim(); //
    const deadline = taskDeadlineInput.value; //
    const priority = taskPriorityInput.value; //

    if (formMode === 'add') { // --- B. THÊM CÔNG VIỆC --- [cite: 7]
        const newTask = {
            id: 'task_' + Date.now(), //
            title,
            desc,
            deadline,
            priority,
            isCompleted: false //
        };

        tasks.push(newTask); // [cite: 11]
        showToast("Thêm công việc mới thành công!"); // [cite: 69]

    } else if (formMode === 'edit') { // --- C. SỬA CÔNG VIỆC --- [cite: 16]
        const currentId = taskIdInput.value;
        const taskIndex = tasks.findIndex(t => t.id === currentId);

        if (taskIndex !== -1) {
            tasks[taskIndex].title = title;
            tasks[taskIndex].desc = desc;
            tasks[taskIndex].deadline = deadline;
            tasks[taskIndex].priority = priority; //
            
            showToast("Cập nhật công việc thành công!"); // [cite: 69]
        }
    }

    saveToLocalStorage(); // [cite: 12]
    renderTasks();        // [cite: 13, 21]
    updateStatistics();   // [cite: 14, 22]
    closeModal();         // [cite: 15]
});

// --- 9. ỦY QUYỀN SỰ KIỆN (EVENT DELEGATION) TRÊN DANH SÁCH CÔNG VIỆC ---
// Xử lý chung các thao tác Sửa, Xóa, Thay đổi trạng thái ngay tại vùng taskList
taskList.addEventListener('click', (e) => {
    const cardNode = e.target.closest('.task-card');
    if (!cardNode) return;
    
    const taskId = cardNode.getAttribute('data-id');
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    // A. XỬ LÝ SỰ KIỆN THAY ĐỔI TRẠNG THÁI HOÀN THÀNH
    if (e.target.classList.contains('task-checkbox')) { // [cite: 85]
        tasks[taskIndex].isCompleted = e.target.checked; // Cập nhật mảng [cite: 32]
        
        saveToLocalStorage(); // [cite: 34]
        renderTasks();        // Đổi giao diện hiển thị [cite: 33, 47]
        updateStatistics();   // [cite: 35]
        return;
    }

    // B. XỬ LÝ SỰ KIỆN BẤM NÚT SỬA
    if (e.target.classList.contains('btn-edit')) { // [cite: 83]
        const task = tasks[taskIndex];
        
        // Đổ dữ liệu cũ lên form [cite: 18]
        taskIdInput.value = task.id;
        taskTitleInput.value = task.title;
        taskDescInput.value = task.desc;
        taskDeadlineInput.value = task.deadline;
        taskPriorityInput.value = task.priority;

        openModal('edit'); // Chuyển form sang chế độ cập nhật [cite: 19]
        return;
    }

    // C. XỬ LÝ SỰ KIỆN BẤM NÚT XÓA
    if (e.target.classList.contains('btn-delete')) { // [cite: 84]
        // Hiển thị hộp thoại xác nhận xóa [cite: 25, 45]
        const isConfirmed = confirm(`Bạn có chắc chắn muốn xóa công việc "${tasks[taskIndex].title}" không?`);
        
        if (isConfirmed) { // Nếu đồng ý [cite: 26]
            tasks.splice(taskIndex, 1); // Xóa khỏi mảng [cite: 26]
            
            saveToLocalStorage(); // Lập tức lưu [cite: 27]
            renderTasks();        // Render lại giao diện danh sách [cite: 28, 47]
            updateStatistics();   // Cập nhật số liệu thống kê [cite: 29]
            showToast("Đã xóa công việc!"); // 
        }
        return;
    }
});

// --- 10. CHẠY KHI TẢI TRANG ĐẦU TIÊN ---
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();        // Đọc và render dữ liệu cũ nếu có [cite: 4, 5]
    updateStatistics();   // Cập nhật lại thanh thống kê [cite: 48]
});