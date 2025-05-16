const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all staff list for user
router.get('/staff-list', async (req, res) => {
    try {
        const staff = await prisma.user.findMany({
            where: {
                role: 'staff',
                is_active: true
            },
            select: {
                id: true,
                name: true,
                experience: true,
                rating: true,
                avatar: true
            }
        });

        res.json({
            status: 'success',
            data: staff
        });
    } catch (error) {
        console.error('Error fetching staff list:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
});

module.exports = router; 