document.addEventListener('DOMContentLoaded', () => {
    // Phân tích thành phần DOM cần xử lý [cite: 29, 30]
    const btnOpenAddForm = document.getElementById('btnOpenAddForm'); // [cite: 31]
    const btnCloseForm = document.getElementById('btnCloseForm'); // [cite: 32]
    const studentModal = document.getElementById('studentModal');
    const studentForm = document.getElementById('studentForm'); // [cite: 33]
    const studentTableBody = document.getElementById('studentTableBody'); // [cite: 35]
    const notification = document.getElementById('notification'); // [cite: 36]
    
    // Thống kê DOM [cite: 37]
    const elTotalStudents = document.getElementById('totalStudents');
    const elAverageGpa = document.getElementById('averageGpa');

    // Các trường thông tin [cite: 15]
    const inputId = document.getElementById('studentId'); // [cite: 16]
    const inputName = document.getElementById('studentName'); // [cite: 17]
    const inputDob = document.getElementById('studentDob'); // [cite: 18]
    const inputClass = document.getElementById('studentClass'); // [cite: 19]
    const inputGpa = document.getElementById('studentGpa'); // [cite: 20]
    const inputEmail = document.getElementById('studentEmail'); // [cite: 21]

    let students = []; // Tạo mảng dữ liệu sinh viên [cite: 47]
    let currentEditId = null;

    function showError(inputElement, message) {
        inputElement.classList.add('input-error');
        // Kiểm tra xem đã có thẻ báo lỗi nào dưới input này chưa, nếu chưa thì tạo mới
        let errorSpan = inputElement.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains('error-msg')) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-msg';
            inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
        }
        errorSpan.textContent = message;
    }

    // Hàm xóa toàn bộ lỗi trước khi kiểm tra lại
    function clearErrors() {
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        document.querySelectorAll('.error-msg').forEach(el => el.remove());
    }

    // Hàm kiểm tra toàn bộ form
    function validateForm() {
        clearErrors();
        let isValid = true;

        // 1. Validate Mã Sinh Viên (Không trống, không chứa khoảng trắng)
        const idVal = inputId.value.trim();
        if (idVal === '') {
            showError(inputId, 'Mã sinh viên không được để trống.');
            isValid = false;
        } else if (/\s/.test(idVal)) {
            showError(inputId, 'Mã sinh viên không được chứa khoảng trắng.');
            isValid = false;
        }

        // 2. Validate Họ Tên (Không trống, độ dài tối thiểu 3 ký tự)
        const nameVal = inputName.value.trim();
        if (nameVal === '') {
            showError(inputName, 'Họ và tên không được để trống.');
            isValid = false;
        } else if (nameVal.length < 3) {
            showError(inputName, 'Họ và tên phải có ít nhất 3 ký tự.');
            isValid = false;
        }

        // 3. Validate Ngày Sinh (Không trống, không được chọn ngày trong tương lai)
        const dobVal = inputDob.value;
        if (!dobVal) {
            showError(inputDob, 'Vui lòng chọn ngày sinh.');
            isValid = false;
        } else {
            const selectedDate = new Date(dobVal);
            const today = new Date();
            // Đặt giờ của today về 0 để so sánh đúng ngày
            today.setHours(0, 0, 0, 0); 
            if (selectedDate > today) {
                showError(inputDob, 'Ngày sinh không thể là một ngày trong tương lai.');
                isValid = false;
            }
        }

        // 4. Validate Lớp Học (Không trống)
        if (inputClass.value.trim() === '') {
            showError(inputClass, 'Lớp học không được để trống.');
            isValid = false;
        }

        // 5. Validate Điểm Trung Bình (Từ 0 đến 10)
        const gpaVal = parseFloat(inputGpa.value);
        if (isNaN(gpaVal) || inputGpa.value === '') {
            showError(inputGpa, 'Vui lòng nhập điểm trung bình.');
            isValid = false;
        } else if (gpaVal < 0 || gpaVal > 10) {
            showError(inputGpa, 'Điểm trung bình phải nằm trong khoảng từ 0 đến 10.');
            isValid = false;
        }

        // 6. Validate Email (Đúng định dạng chuẩn)
        const emailVal = inputEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailVal === '') {
            showError(inputEmail, 'Email không được để trống.');
            isValid = false;
        } else if (!emailRegex.test(emailVal)) {
            showError(inputEmail, 'Vui lòng nhập đúng định dạng email hợp lệ.');
            isValid = false;
        }

        return isValid;
    }




    // --- A. LUỒNG HIỂN THỊ DANH SÁCH ---
    function init() {
        // Đọc dữ liệu từ localStorage khi tải trang [cite: 48]
        const storedData = localStorage.getItem('students');
        if (storedData) {
            students = JSON.parse(storedData);
        } else {
            // Yêu cầu có 1 bản ghi mẫu nếu chưa có dữ liệu
            students = [{
                id: "SV001",
                name: "Nguyễn Văn A",
                dob: "2004-05-15",
                className: "KTPM01",
                gpa: 8.5,
                email: "nguyenvana@example.com"
            },
                {
                    id: "SV002",
                    name: "Trần Thị B",
                    dob: "2005-08-22",
                    className: "HTTT02",
                    gpa: 7.2,
                    email: "tranthib@example.com"
                },
                {
                    id: "SV003",
                    name: "Lê Hoàng C",
                    dob: "2004-11-10",
                    className: "KTPM01",
                    gpa: 9.1,
                    email: "lehoangc@example.com"
                },
                {
                    id: "SV004",
                    name: "Phạm Minh D",
                    dob: "2003-02-28",
                    className: "KHMT01",
                    gpa: 6.8,
                    email: "phamminhd@example.com"
                }];
            saveToLocalStorage();
        }
        renderTable();
    }

    function saveToLocalStorage() {
        // Lưu lại localStorage [cite: 67, 74]
        localStorage.setItem('students', JSON.stringify(students));
    }

    function renderTable() {
        studentTableBody.innerHTML = '';
        
        if (students.length === 0) {
            // Nếu chưa có dữ liệu, hiển thị dòng thông báo trống [cite: 50]
            studentTableBody.innerHTML = `<tr><td colspan="7" class="empty-row">Chưa có dữ liệu sinh viên</td></tr>`;
        } else {
            // Duyệt mảng và render từng sinh viên lên bảng [cite: 49]
            students.forEach(student => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.dob}</td>
                    <td>${student.className}</td>
                    <td>${student.gpa}</td>
                    <td>${student.email}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-edit" data-id="${student.id}">Sửa</button>
                        <button class="btn btn-danger btn-sm btn-delete" data-id="${student.id}">Xóa</button>
                    </td>
                `;
                studentTableBody.appendChild(tr);
            });
        }
        updateStats(); // Cập nhật khu vực thống kê [cite: 59, 69, 76]
    }

    function updateStats() {
        // Hiển thị tổng số sinh viên [cite: 12]
        elTotalStudents.textContent = students.length;
        
        // Hiển thị điểm trung bình của cả lớp [cite: 13]
        if (students.length === 0) {
            elAverageGpa.textContent = '0.0';
            return;
        }
        const totalGpa = students.reduce((sum, stu) => sum + parseFloat(stu.gpa), 0);
        elAverageGpa.textContent = (totalGpa / students.length).toFixed(2);
    }

    function showNotification(msg) {
        notification.textContent = msg;
        notification.className = 'notification success';
        setTimeout(() => notification.className = 'notification hidden', 3000);
    }

    // --- B. & C. LUỒNG THÊM & SỬA SINH VIÊN ---
    
    // Sự kiện bấm nút Thêm sinh viên để mở form [cite: 39, 52]
    btnOpenAddForm.addEventListener('click', () => {
        currentEditId = null;
        studentForm.reset(); // Xóa dữ liệu cũ trong form [cite: 60]
        inputId.readOnly = false;
        document.getElementById('modalTitle').textContent = 'Thêm sinh viên'; // [cite: 65]
        studentModal.classList.remove('hidden');
    });

    // Sự kiện bấm nút Đóng/Hủy để ẩn form [cite: 40, 60]
    btnCloseForm.addEventListener('click', () => {
        studentModal.classList.add('hidden');
        clearErrors(); // Xóa các thông báo lỗi nếu có
    });

    // Sự kiện submit form để thêm mới/cập nhật dữ liệu [cite: 41, 43]
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return; // Dừng lại nếu có lỗi
        }
        // Bấm lưu để lấy dữ liệu từ input [cite: 54]
        const studentData = {
            id: inputId.value.trim(),
            name: inputName.value.trim(),
            dob: inputDob.value,
            className: inputClass.value.trim(),
            gpa: parseFloat(inputGpa.value),
            email: inputEmail.value.trim()
        }; // Tạo object sinh viên [cite: 55]

        if (currentEditId) {
            // Chế độ Cập nhật
            const index = students.findIndex(s => s.id === currentEditId); // Xác định đúng sinh viên cần sửa [cite: 63]
            if (index !== -1) {
                students[index] = studentData; // Sau khi lưu, cập nhật lại dữ liệu trong mảng [cite: 66]
                showNotification('Cập nhật sinh viên thành công!');
            }
        } else {
            // Chế độ Thêm mới
            if (students.some(s => s.id === studentData.id)) {
                alert('Mã sinh viên đã tồn tại!');
                return;
            }
            students.push(studentData); // Thêm object vào mảng [cite: 56]
            showNotification('Thêm sinh viên thành công!');
        }

        saveToLocalStorage(); // Lưu mảng xuống localStorage [cite: 57]
        renderTable(); // Bảng dữ liệu phải cập nhật ngay [cite: 11], Render lại bảng [cite: 58]
        studentModal.classList.add('hidden'); // Đóng popup [cite: 60]
    });

    // --- Event Delegation cho nút Sửa và Xóa trong bảng ---
    studentTableBody.addEventListener('click', (e) => {
        const target = e.target;
        const id = target.getAttribute('data-id');

        // Bấm nút sửa ở một dòng bất kỳ [cite: 62]
        if (target.classList.contains('btn-edit')) {
            const student = students.find(s => s.id === id); // Sự kiện bấm nút Sửa để nạp dữ liệu cũ lên form [cite: 42]
            if (student) {
                currentEditId = id;
                // Đưa dữ liệu hiện tại lên form [cite: 9, 64]
                inputId.value = student.id;
                inputId.readOnly = true; // Không cho sửa mã SV
                inputName.value = student.name;
                inputDob.value = student.dob;
                inputClass.value = student.className;
                inputGpa.value = student.gpa;
                inputEmail.value = student.email;

                document.getElementById('modalTitle').textContent = 'Sửa sinh viên'; // Đổi tiêu đề form sang trạng thái cập nhật [cite: 65]
                studentModal.classList.remove('hidden');
            }
        }

        // Bấm nút xóa ở dòng dữ liệu [cite: 71]
        if (target.classList.contains('btn-delete')) {
            // Sự kiện bấm nút Xóa để xác nhận và xóa dữ liệu [cite: 44]
            // Hiển thị thông báo xác nhận trước khi xóa [cite: 10, 72]
            if (confirm(`Bạn có chắc chắn muốn xóa sinh viên mã ${id}?`)) {
                // Nếu đồng ý thì xóa phần tử khỏi mảng [cite: 73]
                students = students.filter(s => s.id !== id);
                saveToLocalStorage();
                renderTable(); // Sau khi xóa, bảng dữ liệu phải cập nhật ngay [cite: 11]
                showNotification('Xóa sinh viên thành công!');
            }
        }
    });

    // Khởi chạy ứng dụng
    init();
});