const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {validationResult} = require('express-validator');
const {successResponse, errorResponse} = require("../../utils/response");
const db = require('./../../config/dbMysql');

// Register a new user
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, "Lỗi validate dữ liệu", 404, 404);
    }

    const {name, email, password, avatar = 'https://via.placeholder.com/150', phone} = req.body;

    try {
        // Tìm người dùng theo email
        let user = await User.findOne(email);

        if (user) {
            return errorResponse(res, "Người dùng đã tồn tại", 404, 404);
        }

        // Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo mới người dùng
        const newUser = {
            name,
            email,
            password: hashedPassword,
            avatar,
            phone
        };

        const userId = await User.create(newUser);

        // Tạo token
        const payload = {
            user: {
                id: userId
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '100h'});

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationLink = `http://localhost:3000/verify/${verificationToken}`;
        await User.update(userId, {
            remember_token: verificationToken,
        });
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: 'svdtxl123@gmail.com', pass: 'jruejvxlzzejhzjd' }
        });
        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">Kích hoạt tài khoản</h2>
                <p>Nhấn vào nút bên dưới để tiến hành kích hoạt tài khoản:</p>
                <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Kích hoạt</a>
                <p style="margin-top: 20px;">Hoặc, bạn có thể sao chép và dán đường link sau vào trình duyệt của mình:</p>
                <p><a href="${verificationLink}" target="_blank" style="color: #007bff;">${verificationLink}</a></p>
                <p>Trân trọng,<br/>Đội ngũ hỗ trợ của chúng tôi</p>
            </div>
        `;

        const mailOptions = {
            to: email,
            from: 'codethue94@gmail.com',
            subject: 'Kích hoạt tài khoản',
            html: htmlTemplate
        };

        transporter.sendMail(mailOptions);

        // Trả về token và thông tin người dùng
        return successResponse(res, {token}, 'Registered successfully');
    } catch (err) {
        console.error(err.message);
        return errorResponse(res);
    }
};

// Login user
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Kiểm tra email tồn tại
        let user = await User.findOne(email);
        if (!user) {
            return errorResponse(res, 'Email không tồn tại', 400, 1);
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse(res, 'Mật khẩu không chính xác', 400, 1);
        }
        if(user.status !== 2) {
            return errorResponse(res, "Tài khoản chưa được kích hoạt", 404, 404);
        }

        // Tạo token
        const payload = {
            user: {
                id: user.id,
                user_type: user.user_type
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '100h'});

        // Trả về token và thông tin người dùng
        return successResponse(res, {token, user}, 'Login thành công');
    } catch (err) {
        console.error(err.message);
        return errorResponse(res);
    }
};
exports.forgotPassword = async (req, res) => {
    const {email} = req.body;

    try {
        // Kiểm tra email tồn tại
        let user = await User.findOne(email);
        if (!user) {
            return errorResponse(res, 'Email không tồn tại', 400, 1);
        }

        // Tạo token và thời gian hết hạn
        const resetToken = crypto.randomBytes(32).toString('hex');
        let dataUpdate = {
            remember_token: resetToken,
            email_verified_at: new Date(Date.now() + 3600000)
        }
        await User.update(user.id, dataUpdate);

        // Gửi email chứa token
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: 'svdtxl123@gmail.com', pass: 'jruejvxlzzejhzjd' }
        });

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const htmlTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">Đặt lại mật khẩu của bạn</h2>
                <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
                <p>Nhấn vào nút bên dưới để tiến hành đặt lại mật khẩu:</p>
                <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Đặt lại mật khẩu</a>
                <p style="margin-top: 20px;">Hoặc, bạn có thể sao chép và dán đường link sau vào trình duyệt của mình:</p>
                <p><a href="${resetUrl}" style="color: #007bff;">${resetUrl}</a></p>
                <p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
                <p>Trân trọng,<br/>Đội ngũ hỗ trợ của chúng tôi</p>
            </div>
        `;

        const mailOptions = {
            to: user.email,
            from: 'codethue94@gmail.com',
            subject: 'Đặt lại mật khẩu',
            html: htmlTemplate
        };

        transporter.sendMail(mailOptions);

        // Trả về token và thông tin người dùng
        return successResponse(res, {user}, 'Vui lòng kiểm tra email của bạn');
    } catch (err) {
        console.error(err.message);
        return errorResponse(res);
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const [rows] = await db.execute(
            `SELECT * FROM users WHERE remember_token = ? AND email_verified_at > ?`,
            [token, new Date()]
        );


        if (rows.length === 0) {
            return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }
        const user = rows[0];
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Cập nhật mật khẩu và xóa token
        await db.execute(
            `UPDATE users SET password = ?, remember_token = NULL, email_verified_at = NULL WHERE id = ?`,
            [hashedPassword, user.id]
        );

        // Trả về token và thông tin người dùng
        return successResponse(res, {user}, 'Đổi mật khẩu thành công, xin vui lòng đăng nhập');
    } catch (err) {
        console.error(err.message);
        return errorResponse(res);
    }
};
exports.verifyAccount = async (req, res) => {
    try {

        let token = req.params.token;
        console.info("===========[] ===========[] : ",token);
        const [rows] = await db.execute(
            `SELECT * FROM users WHERE remember_token = ?`,
            [token]
        );

        if (rows.length === 0) {
            return errorResponse(res, "Token không hợp lệ hoặc đã hết hạn", 404, 404);
        }
        const user = rows[0];

        await db.execute(
            `UPDATE users SET status = ?, remember_token = NULL WHERE id = ?`,
            [2, user.id]
        );

        // Tạo token
        const payload = {
            user: {
                id: user.id
            }
        };

        token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '100h'});

        // Trả về token và thông tin người dùng
        return successResponse(res, {token}, 'Kích hoạt tài khoản thành công');
    } catch (err) {
        console.error(err.message);
        return errorResponse(res);
    }
};
exports.me = async (req, res) => {
    try {
        // Lấy token từ header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return errorResponse(res, 'Token không hợp lệ', 401, 1);
        }

        const token = authHeader.split(' ')[1];

        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id;

        // Tìm người dùng dựa trên userId
        const user = await User.findOneById(userId);
        if (!user) {
            return errorResponse(res, 'Người dùng không tồn tại', 404, 1);
        }

        // Trả về thông tin người dùng
        return successResponse(res, {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            phone: user.phone,
            user_type: user.user_type,
        }, 'User details fetched successfully');
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, 'Token không hợp lệ hoặc đã hết hạn', 401, 1);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.info("===========[] ===========[req.user] : ", req.user);
        const userId = req.user.id; // Giả sử bạn lấy userId từ token
        const updatedData = req.body; // Dữ liệu cập nhật từ client (ví dụ: name, avatar)
        console.info("===========[] ===========[updatedData] : ", updatedData);
        const updated = await User.update(userId, updatedData);
        if (!updated) {
            return errorResponse(res, 'Không thể cập nhật thông tin người dùng', 500, 1);
        }

        const updatedUser = await User.findOneById(userId);
        return successResponse(res, {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            avatar: updatedUser.avatar,
            phone: updatedUser.phone,
        }, 'User details updated successfully');
    } catch (err) {
        console.error(err.message);
        return errorResponse(res, 'Lỗi khi cập nhật thông tin', 500, 1);
    }
};
