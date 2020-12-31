module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/vue-todo-app/" // Thay tên repository của các bạn vào đây nhé
      : "/"
};
