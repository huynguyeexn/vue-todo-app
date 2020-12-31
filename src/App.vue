<template>
  <div id="app">
    <article>
      <header>
        <span>Todo list app</span>
      </header>
      <main>
        <div v-if="!todos.length" class="item" style="justify-content: center">
          <p>You don't have any task</p>
        </div>
        <div class="item" v-for="todo in todos" :key="todo['.key']">
          <div class="select">
            <label
              class="checkbox"
              :for="todo['.key']"
              :class="{ active: todo.completed }"
            ></label>
            <input type="checkbox" :id="todo['.key']" v-model="todo.completed" />
          </div>
          <div class="content" :class="{ complete: todo.completed }">
            <span>{{ todo.content }}</span>
          </div>
          <div class="delete" @click="deleteTodo(todo['.key'])">&#10006;</div>
        </div>
      </main>
      <footer>
        <button @click="addTask()">+ New task</button>
      </footer>
    </article>
  </div>
</template>

<script>
import swal from "sweetalert2";
import { db } from "./db";

const todoCollection = db.ref("todos");

const topRightAlert = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", swal.stopTimer);
    toast.addEventListener("mouseleave", swal.resumeTimer);
  },
});

export default {
  name: "app",
  data() {
    return {
      todos: [],
      newTask: null,
    };
  },
  firebase: {
    todos: todoCollection,
  },
  methods: {
    deleteTodo(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#eb7e7e",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // let index = this.todos.findIndex((x) => x.id == id);
            // this.todos.splice(index, 1);
            db.ref("todos/" + id).remove();
            console.log("id: " + id);
            topRightAlert.fire({
              icon: "success",
              title: "Your task has been deleted.",
            });
          }
        });
    },
    addTask() {
      swal
        .fire({
          title: "Add new task",
          input: "text",
          inputLabel: "Enter your task",
          inputValue: this.newTask,
          showCancelButton: true,
          confirmButtonColor: "#af7eeb",
          confirmButtonText: "Add task",
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            } else {
              this.newTask = value;
            }
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            todoCollection.push({
              completed: false,
              content: this.newTask,
            });
            topRightAlert.fire({
              icon: "success",
              title: "Your task has been add.",
            });
            this.newTask = null;
          }
        });
    },
  },
};
</script>

<style>
html,
body {
  color: #8e97b8;
  min-height: 100vh;
  background-color: #e3e9ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.1rem;
}
article {
  max-width: 100vw;
  min-width: 400px;
}
header {
  -webkit-box-shadow: 0px 0px 24px -1px rgba(175, 126, 235, 1);
  -moz-box-shadow: 0px 0px 24px -1px rgba(175, 126, 235, 1);
  box-shadow: 0px 0px 24px -1px rgba(175, 126, 235, 1);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  padding: 20px;
  background-color: #af7eeb;
}
header span {
  font-weight: bold;
  color: white;
}

main {
  -webkit-box-shadow: 0px 0px 24px -1px rgba(216, 216, 216);
  -moz-box-shadow: 0px 0px 24px -1px rgba(216, 216, 216);
  box-shadow: 0px 0px 24px -1px rgb(216, 216, 216);

  background-color: white;
  padding: 40px 25px 50px 25px;
  display: flex;
  flex-direction: column;
}
.item {
  cursor: pointer;
  display: flex;
  padding: 15px 20px;
  transition: 0.3s ease-in-out;
}
.item:hover {
  background-color: #e3e9ff;
}
.content {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
}
.delete {
  /* font-weight: 600; */
  opacity: 0;
  margin-left: 25px;
  color: #ae8baf;
  transition: 0.3s ease-in-out;
}
.delete:hover {
  cursor: pointer;
  color: #eb7e7e;
}

.item:hover .delete {
  opacity: 1;
}

.select {
  margin-right: 25px;
  display: flex;
  align-items: center;
}
input[type="checkbox"] {
  display: none;
}
.checkbox {
  cursor: pointer;
  display: block;
  margin: 0;
  padding: 0;
  content: "";
  border: 2px solid #af7eeb;
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
.active {
  border: 2px solid #af7eeb;
  background-color: #af7eeb;
}
.complete span {
  text-decoration: line-through;
}
.footer {
  margin-top: 20px;
  text-align: center;
  padding: 25px;
  background-color: #af7eeb;
}

footer {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}
footer button {
  cursor: pointer;
  top: -25px;
  position: absolute;
  font-weight: 600;
  border-radius: 25px;
  padding: 15px 40px;
  border: none;
  color: white;
  background-color: #af7eeb;
  -webkit-box-shadow: 0px 0px 24px -1px rgba(175, 126, 235, 1);
  -moz-box-shadow: 0px 0px 24px -1px rgba(175, 126, 235, 1);
  box-shadow: 0px 0px 24px -1px rgba(175, 126, 235, 1);
  transition: 0.3s ease-in-out;
}

footer button:hover {
  transform: scale(1.05);
}
</style>
