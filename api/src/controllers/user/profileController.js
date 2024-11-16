const User = require('../../models/User');
const formatResponse = require('../../utils/response');
const bcrypt = require('bcryptjs');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json(formatResponse('error', [], 'User not found'));
        }
        const userProfile = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            dateOfBirth: user.dateOfBirth,
        };
        res.json(formatResponse('success', { user: userProfile }, 'Profile retrieved successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
exports.updateProfile = async (req, res) => {
    const { name, email, password, newPassword, avatar, dateOfBirth } = req.body;
    console.info("===========[] ===========[req.body] : ",req.body);

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json(formatResponse('error', [], 'User not found'));
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (avatar) user.avatar = avatar;
        if (avatar) user.dateOfBirth = dateOfBirth;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        await user.save();

        const updatedProfile = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            dateOfBirth: user.dateOfBirth,
        };
        console.info("===========[] ===========[updatedProfile] : ",updatedProfile);
        res.json(formatResponse('success', { user: updatedProfile }, 'Profile updated successfully'));
    } catch (err) {
        console.info("===========[] ===========[] : ",err);
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
