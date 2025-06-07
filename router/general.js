const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: 用户注册
// POST /register - 注册新用户
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // 检查用户名和密码是否提供
    if (username && password) {
        // 检查用户是否已存在
        if (!isValid(username)) {
            // 添加新用户
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Task 1: 获取所有书籍
// GET / - 获取商店中所有可用的书籍列表
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Task 2: 根据ISBN获取书籍详情
// GET /isbn/:isbn - 根据ISBN检索书籍详情
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});

// Task 3: 根据作者获取书籍
// GET /author/:author - 根据作者姓名检索书籍
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let filtered_books = {};
    
    // 获取所有书籍的键
    let keys = Object.keys(books);
    
    // 遍历书籍并检查作者匹配
    keys.forEach((key) => {
        if (books[key].author === author) {
            filtered_books[key] = books[key];
        }
    });
    
    res.send(filtered_books);
});

// Task 4: 根据标题获取书籍
// GET /title/:title - 根据书籍标题检索书籍
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let filtered_books = {};
    
    // 获取所有书籍的键
    let keys = Object.keys(books);
    
    // 遍历书籍并检查标题匹配
    keys.forEach((key) => {
        if (books[key].title === title) {
            filtered_books[key] = books[key];
        }
    });
    
    res.send(filtered_books);
});

// Task 5: 根据ISBN获取书评
// GET /review/:isbn - 获取特定书籍的评论
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

// Task 10: 使用Promise/Async-Await获取所有书籍
// GET /async/books - 异步方式获取所有书籍
public_users.get('/async/books', async function (req, res) {
    try {
        // 模拟异步操作
        const getAllBooks = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(books);
                }, 1000);
            });
        };
        
        const allBooks = await getAllBooks();
        res.send(JSON.stringify(allBooks, null, 4));
    } catch (error) {
        res.status(500).json({message: "Error fetching books"});
    }
});

// Task 11: 使用Promise/Async-Await根据ISBN获取书籍
// GET /async/isbn/:isbn - 异步方式根据ISBN获取书籍
public_users.get('/async/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn;
        
        const getBookByISBN = (isbn) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (books[isbn]) {
                        resolve(books[isbn]);
                    } else {
                        reject(new Error("Book not found"));
                    }
                }, 1000);
            });
        };
        
        const book = await getBookByISBN(isbn);
        res.send(book);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// Task 12: 使用Promise/Async-Await根据作者获取书籍
// GET /async/author/:author - 异步方式根据作者获取书籍
public_users.get('/async/author/:author', function (req, res) {
    const author = req.params.author;
    
    const getBooksByAuthor = (author) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let filtered_books = {};
                let keys = Object.keys(books);
                
                keys.forEach((key) => {
                    if (books[key].author === author) {
                        filtered_books[key] = books[key];
                    }
                });
                
                resolve(filtered_books);
            }, 1000);
        });
    };
    
    getBooksByAuthor(author)
        .then(result => res.send(result))
        .catch(error => res.status(500).json({message: "Error fetching books"}));
});

// Task 13: 使用Promise/Async-Await根据标题获取书籍
// GET /async/title/:title - 异步方式根据标题获取书籍
public_users.get('/async/title/:title', function (req, res) {
    const title = req.params.title;
    
    const getBooksByTitle = (title) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let filtered_books = {};
                let keys = Object.keys(books);
                
                keys.forEach((key) => {
                    if (books[key].title === title) {
                        filtered_books[key] = books[key];
                    }
                });
                
                resolve(filtered_books);
            }, 1000);
        });
    };
    
    getBooksByTitle(title)
        .then(result => res.send(result))
        .catch(error => res.status(500).json({message: "Error fetching books"}));
});

module.exports.general = public_users;
