const express = require('express');
const { Application, sequelize } = require('../models/user'); // Ensure Application is imported correctly
const router = express.Router();
const { Op, fn, col } = require('sequelize'); // Import necessary Sequelize functions

// Get total applications submitted, sorted by status
router.get('/total-by-status', async (req, res) => {
    try {
        const totals = await Application.findAll({
            attributes: ['status', [fn('COUNT', col('status')), 'count']],
            group: ['status'],
        });
        res.json(totals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get average time to move between stages
router.get('/avg-transition-time', async (req, res) => {
    try {
        const applications = await Application.findAll({
            attributes: ['dateApplied', 'lastUpdated'],
            where: {
                dateApplied: { [Op.not]: null },
                lastUpdated: { [Op.not]: null },
            },
        });

        const transitions = applications.map(app => {
            const appliedDate = new Date(app.dateApplied);
            const updatedDate = new Date(app.lastUpdated);
            return (updatedDate - appliedDate) / (1000 * 60 * 60 * 24); // Difference in days
        });

        const avgTime =
            transitions.length > 0
                ? transitions.reduce((sum, time) => sum + time, 0) / transitions.length
                : 0;

        res.json({ avgTransitionTime: avgTime });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get insights into most common application statuses
router.get('/common-statuses', async (req, res) => {
    try {
        const statuses = await Application.findAll({
            attributes: ['status', [fn('COUNT', col('status')), 'count']],
            group: ['status'],
            order: [[sequelize.literal('count'), 'DESC']],
        });
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
