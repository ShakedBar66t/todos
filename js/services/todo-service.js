const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'

_createTodos()
console.log(gTodos);


function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')


}

function addTodo(txt) {
    const todo = _createTodo(txt)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalTodos() {
    if (gTodos.length === 0) return 'no todos'
    return gTodos.length
}

function getActiveTodos() {
    if (gTodos.length === 0) return 'no todos'
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }

}

function _createTodo(txt) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: new Date(Date.now()).toString(),
        importance: document.querySelector('input[name="importance-number"]').valueAsNumber,
    }

}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function setSortBy(value) {
    if (value === "text") {
        gTodos.sort((a, b) => {
            if (a.txt < b.txt) return -1
            return 1
        })
    }

    if (value === "importance") {
        gTodos.sort((a, b) => {
            return b.importance - a.importance
        })
    }

    if (value === "createdAt") {
        gTodos.sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1
            else if (a.createdAt > b.createdAt) return -1
        })
    }

    renderTodos()
    console.log(gTodos);

}
