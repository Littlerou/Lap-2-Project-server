const Habit = require('../models/Habit')

async function show(req, res) {
    try {
        const habits = await Habit.findById(parseInt(req.params.id))
        res.status(200).json(habits)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function create (req, res) {
    try {
        const habits = await Habit.create(req.body);
        res.status(201).json(habits)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function destroy (req, res) {
    try {
        const habits = await Habit.findById(parseInt(req.params.id))
        const resp = habits.destroy()
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}

module.exports = { show, create, destroy}
