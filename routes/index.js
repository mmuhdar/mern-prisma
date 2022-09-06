const router = require('express').Router();
const ProductsRouter = require('../routes/ProductRoute');
const AuthRouter = require('../routes/AuthControllers');
const TodosRouter = require('./TodoRoutes');
const errorMidlewares = require('../middlewares/errorHandler');

router.use('/', AuthRouter)
router.use('/products', ProductsRouter);
router.use('/todos', TodosRouter);
router.use(errorMidlewares);


module.exports = router;