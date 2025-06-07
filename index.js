const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// 为客户路由设置会话中间件
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true, 
    saveUninitialized: true
}));

// JWT认证中间件 - 用于保护需要认证的路由
app.use("/customer/auth/*", function auth(req, res, next) {
    // 检查会话中是否有访问令牌
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];
        // 验证JWT令牌
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next(); // 继续到下一个中间件
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

const PORT = 5000;

// 路由配置
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));