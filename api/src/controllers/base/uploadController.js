const formatResponse = require('../../utils/response');

exports.uploadFile = (req, res) => {
    if (!req.file) {
        console.info("===========[exports.uploadFile] ===========[Không tồn tại file upload] : ");
        return res.status(400).json(formatResponse('error', null, 'No file uploaded'));
    }

    const fileUrl = `http://localhost:3014/uploads/images/${req.file.filename}`;
    res.status(201).json({
        status: "success",
        errorCode: 0,
        message: "Upload successful",
        data: fileUrl
    });
};
