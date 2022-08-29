const router = require('express').Router();
const noteRoutes = require('./notes');
// const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');

 router.use(noteRoutes);
// router.use(zookeeperRoutes);

module.exports = router;
