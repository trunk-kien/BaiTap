// --- KHỞI TẠO STATE & DOM ELEMENTS ---
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todo-count');
const filtersContainer = document.getElementById('filters');
const filterBtns = filtersContainer.querySelectorAll('a');
const clearCompletedBtn = document.getElementById('clear-completed');

// Lấy dữ liệu từ LocalStorage hoặc khởi tạo mảng rỗng
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // all | active | completed

// --- HÀM LƯU VÀ RENDER ---
function saveToLocal() {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
}

function render() {
    // Làm sạch danh sách hiện tại (Không dùng innerHTML để tạo item, 
    // nhưng dùng để xoá trắng container trước khi render lại là hợp lý)
    todoList.innerHTML = ''; 

    // Lọc mảng theo trạng thái
    let filteredTodos = todos;
    if (currentFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

    // Dùng createElement để tạo TỪNG PHẦN TỬ (Đúng yêu cầu đề bài)
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'toggle';
        checkbox.checked = todo.completed;

        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'destroy';
        deleteBtn.textContent = '❌';

        // Gắn các thẻ con vào thẻ li
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        // Gắn li vào DOM
        todoList.appendChild(li);
    });

    // Cập nhật đếm số lượng
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

    // Ẩn hiện nút Clear Completed
    const hasCompleted = todos.some(t => t.completed);
    clearCompletedBtn.style.visibility = hasCompleted ? 'visible' : 'hidden';

    // Cập nhật UI nút Filter
    filterBtns.forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`.filters a[data-filter="${currentFilter}"]`).classList.add('selected');
}

// --- XỬ LÝ SỰ KIỆN ---

// 1. Thêm Todo (Lắng nghe sự kiện submit form bao trọn cả click nút và gõ Enter)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text !== '') {
        const newTodo = {
            id: Date.now().toString(), // Tạo ID duy nhất
            text: text,
            completed: false
        };
        todos.push(newTodo);
        todoInput.value = '';
        saveToLocal();
    }
});

// 2. EVENT DELEGATION: Lắng nghe Click (Cho tính năng Toggle và Xóa)
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = li.dataset.id;

    // Nếu click vào nút Xóa
    if (e.target.classList.contains('destroy')) {
        todos = todos.filter(t => t.id !== id);
        saveToLocal();
    }
    
    // Nếu click vào checkbox hoặc text để Toggle
    if (e.target.classList.contains('toggle') || e.target.classList.contains('text')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveToLocal();
    }
});

// 3. EVENT DELEGATION: Lắng nghe Double Click (Cho tính năng Edit)
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('text')) {
        const li = e.target.closest('.todo-item');
        const id = li.dataset.id;
        const todo = todos.find(t => t.id === id);

        // Tạo thẻ input để thay thế thẻ span text
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        li.replaceChild(editInput, e.target);
        editInput.focus();

        // Hàm xử lý lưu khi sửa xong
        const saveEdit = () => {
            const newText = editInput.value.trim();
            if (newText) {
                todo.text = newText;
            } else {
                todos = todos.filter(t => t.id !== id); // Nếu xoá hết chữ thì xoá luôn todo
            }
            saveToLocal();
        };

        // Lưu khi nhấn Enter hoặc khi click ra ngoài (blur)
        editInput.addEventListener('blur', saveEdit);
        editInput.addEventListener('keydown', (e2) => {
            if (e2.key === 'Enter') editInput.blur();
            if (e2.key === 'Escape') saveToLocal(); // Hủy edit nếu nhấn Esc
        });
    }
});

// 4. Lọc Todo
filtersContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        currentFilter = e.target.dataset.filter;
        render();
    }
});

// 5. Clear Completed
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveToLocal();
});

// Khởi chạy lần đầu tiên khi load trang
render();


