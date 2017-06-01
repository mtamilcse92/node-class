class MasterController {
	constructor() {
		this.getMaster = this.getMaster.bind(this);
	}
	getMaster(req, res, next) {
		res.status(200).json("GET MASTER");
	}

}

export default new MasterController();