// Todo App - JavaScript
const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const itemsLeftSpan = document.querySelector("#itemsLeft");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clearCompleted");

let todos = [];
let currentFilter = "all";

// Load todos từ localStorage
function loadTodos() {
    const saved = localStorage.getItem("todos");
    if (saved) {
        todos = JSON.parse(saved);
    }
    renderTodos();
}

// Save todos vào localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Thêm todo mới
function addTodo(text) {
    if (!text.trim()) return;
    
    const todo = {
        id: Date.now(),
        text: text.trim(),
        completed: false
    };
    
    todos.unshift(todo);
    saveTodos();
    renderTodos();
}

// Xóa todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Toggle completed
function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// Edit todo
function editTodo(id, newText) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.text = newText.trim();
        saveTodos();
        renderTodos();
    }
}

// Clear completed
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

// Update items left count
function updateItemsLeft() {
    const left = todos.filter(todo => !todo.completed).length;
    itemsLeftSpan.textContent = `${left} items left`;
}

// Render todos
function renderTodos() {
    list.innerHTML = "";
    
    if (todos.length === 0) {
        list.innerHTML = '<li class="empty-message">Không có todo nào. Thêm một cái đi!</li>';
        updateItemsLeft();
        return;
    }
    
    todos.forEach(todo => {
        // Lọc theo filter
        if (currentFilter === "active" && todo.completed) return;
        if (currentFilter === "completed" && !todo.completed) return;
        
        // Tạo todo item
        const li = document.createElement("li");
        li.className = "todo-item";
        if (todo.completed) {
            li.classList.add("completed");
        }
        
        // =========================================
        // Checkbox để toggle completed
        // =========================================
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));
        
        // Text
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        
        // Double-click để edit
        span.addEventListener("dblclick", () => {
            startEdit(li, todo);
        });
        
        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        list.appendChild(li);
    });
    
    updateItemsLeft();
}

// Start editing todo
function startEdit(li, todo) {
    li.classList.add("editing");
    
    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = todo.text;
    
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "save-btn";
    saveBtn.textContent = "✓";
    
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.style.display = "none";
    
    li.insertBefore(input, deleteBtn);
    li.insertBefore(saveBtn, deleteBtn);
    
    input.focus();
    
    function save() {
        editTodo(todo.id, input.value);
    }
    
    saveBtn.addEventListener("click", save);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") save();
        if (e.key === "Escape") renderTodos();
    });
    
    input.addEventListener("blur", save);
}

// Form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(input.value);
    input.value = "";
    input.focus();
});

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Clear completed
clearCompletedBtn.addEventListener("click", () => {
    if (confirm("Xóa tất cả todo đã hoàn thành?")) {
        clearCompleted();
    }
});

// Load on init
loadTodos();
