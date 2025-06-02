const formatResponse = require('../../utils/response');

exports.uploadFile = (req, res) => {
    if (!req.file) {
        console.info("===========[exports.uploadFile] ===========[Không tồn tại file upload] : ");
        return res.status(400).json(formatResponse('error', null, 'No file uploaded'));
    }

    const fileUrl = `${process.env.IMAGE_BASE_URL}/${req.file.filename}`;
    res.status(201).json({
        status: "success",
        errorCode: 0,
        message: "Upload successful",
        data: fileUrl
    });
};
