import express from 'express';
import Router from 'express';
import masterContoller from './controllers/MasterContoller';
let router = express.Router();

// router.get('/masters', masterContoller.getMaster);

class ServiceRouter {
	constructor() {
		this.create = this.create.bind(this);
	}
    create(api = Router()) {
	    api.get('/masters', masterContoller.getMaster);
	    return api;
  }
}

export default new ServiceRouter;
// export default router;