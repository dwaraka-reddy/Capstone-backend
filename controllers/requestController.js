const User = require('../models/user');
const Request = require('../models/request');

const requestController = {
  async createRequest(req, res) {
    const { fromUsername, toUsername, postId } = req.body;
    
    try {
      const request = await Request.create({ fromUsername, toUsername, postId });
      res.status(201).send(request);
    } catch (error) {
      res.status(500).send({ message: 'Error creating request' });
    }
  },

  async updateRequestStatus(req, res) {
    const { requestId, status } = req.body;
    
    try {
      await Request.update({ status }, { where: { id: requestId } });
      res.status(200).send({ message: 'Request status updated' });
    } catch (error) {
      res.status(500).send({ message: 'Error updating request status' });
    }
  },

  async listRequestsForUser(req, res) {
    const username = req.params.username;
    
    try {
      const requests = await Request.findAll({
        where: { toUsername: username },
        include: [
          { model: User, as: 'fromUser', attributes: { exclude: ['id', 'password', 'isStep2Completed', 'isStep3Completed'] } },
          { model: User, as: 'toUser', attributes: { exclude: ['id', 'password', 'isStep2Completed', 'isStep3Completed'] } }
        ]
      });
      res.status(200).send(requests);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching requests' });
    }
  }
};

module.exports = requestController;
