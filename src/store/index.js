import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
            if (new Date(task.date) < new Date() && task.status !== 'completed') {
                task.status = 'outdated';
            }

            return task;
        })
    },
    mutations: {
        createTask(state, task) {
            state.tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        updateTask(state, {id, description, date}) {
            const tasks = state.tasks.concat();

            const index = tasks.findIndex(task => task.id === id);
            const task = tasks[index];

            const status = new Date(date) > new Date() ? 'active' : 'outdated';

            tasks[index] = {...task, date, description, status};

            state.tasks = tasks;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        completeTask(state, id) {
            const index = state.tasks.findIndex(task => task.id === id);
            state.tasks[index].status = 'completed';

            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    },
    actions: {
        createTask({commit}, task) {
            commit('createTask', task);
        },
        updateTask({commit}, task) {
            commit('updateTask', task);
        },
        completeTask({commit}, id) {
            commit('completeTask', id);
        }
    },
    modules: {},
    getters: {
        tasks: state => state.tasks,
        taskById: state => id => state.tasks.find(task => task.id === id)
    }
})
