const Slide = require('../../models/Slide');
const formatResponse = require("../../utils/response");
const {successResponse, errorResponse} = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        const { page =  1, page_size: pageSize = 10, name, page_site = null } = req.query;
        const result = await Slide.getAll(Number(page), Number(pageSize), name, page_site);

        return successResponse(res, { meta: result.meta, data: result.data });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.findById = async (req, res) => {
    try {
        const category = await Slide.findById(req.params.id)
            .populate('createdBy', 'name');
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(formatResponse('success', { category }, 'Get category successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

