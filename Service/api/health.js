/**
 * Route to expose health endpoints.
 */
import Express from 'express'
const router = Express.Router();


/**
 * Returns ok as health response
 */
router.get('/health', (req, res) => {
  res.send('Server Status : UP!...');
});

router.get('/', (req, res) => {
  res.send('Node + Express Framework');
});

export default router;
