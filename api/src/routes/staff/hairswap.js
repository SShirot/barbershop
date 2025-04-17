const express = require('express');
const router = express.Router();
const hairswapController = require('../../controllers/staff/hairswapController');
const auth = require("../../middleware/auth");

// Tạo mới kiểu tóc
router.post('/', auth, hairswapController.create);

//  Lấy toàn bộ kiểu tóc
router.get('/', auth, hairswapController.getAll);

//  Lấy kiểu tóc theo ID
router.get('/:id', auth, hairswapController.getById);

// //  Lấy kiểu tóc theo giới tính
// router.get('/gender/:gender', auth, hairswapController.getByGender);

// //  Lấy kiểu tóc theo giới tính + ID
// router.get('/gender/:gender/id/:id', auth, hairswapController.getByGenderAndId);

//  Cập nhật kiểu tóc theo ID
router.put('/:id', auth, hairswapController.update);

//  Xóa kiểu tóc theo ID
router.delete('/:id', auth, hairswapController.delete);

module.exports = router;
