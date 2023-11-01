const { Router } = require('express');
const { getTickets, saveTickets, getOneTickets, deleteTickets, updateTickets, login} = require('../controllers/TicketController');


const router = Router();

router.get('/get/:_id', getOneTickets);
router.post('/login', login);
router.post('/save', saveTickets);
router.get('/get', getTickets);
router.put('/update/:_id', updateTickets);

router.delete('/delete/:_id', deleteTickets);

module.exports = router;