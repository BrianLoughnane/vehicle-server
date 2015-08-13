var controller = require('./controller.js');

module.exports = function (app) {
    app.route('/1')
      .get(controller.hello)
      // .post(messageController.newMessage);

    app.route('/2')
      .get(controller.yo)
      // .post(messageController.getMessagesForIncident); 
};
