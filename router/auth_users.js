const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// 检查用户名是否有效（不存在）
const isValid = (username) => {
    // 检查用户数组中是否存在该用户名
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    return userswithsamename.length > 0;
}

// 验证用户凭据
const authenticatedUser = (username, password) => {
    // 检查用户名和密码是否匹配
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    return validusers.length > 0;
}

// Task 7: 用户登录
// POST /login - 验证用户凭据并生成JWT令牌
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // 检查用户名和密码是否提供
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }

    // 验证用户凭据
    if (authenticatedUser(username, password)) {
        // 生成JWT访问令牌
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // 将访问令牌存储在会话中
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Task 8: 添加或修改书评
// PUT /auth/review/:isbn - 为书籍添加或更新评论（需要认证）
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;
    
    if (books[isbn]) {
        books[isbn].reviews[username] = review;
        return res.status(200).send("Review successfully posted");
    } else {
        return res.status(404).json({message: `ISBN ${isbn} not found`});
    }
});

// Task 9: 删除书评
// DELETE /auth/review/:isbn - 删除用户自己的评论（需要认证）
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    
    if (books[isbn]) {
        if (books[isbn].reviews[username]) {
            delete books[isbn].reviews[username];
            return res.status(200).send("Review successfully deleted");
        } else {
            return res.status(404).json({message: "Review not found for this user"});
        }
    } else {
        return res.status(404).json({message: `ISBN ${isbn} not found`});
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;