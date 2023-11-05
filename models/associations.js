const User = require('./user');
const Request = require('./request');
const Post = require('./post');

const associations = {
    userToSentRequests: User.hasMany(Request, { as: 'sentRequests', foreignKey: 'fromUsername', sourceKey: 'username' }),
    userToReceivedRequests: User.hasMany(Request, { as: 'receivedRequests', foreignKey: 'toUsername', sourceKey: 'username' }),
    
    requestFromUser: Request.belongsTo(User, { as: 'fromUser', foreignKey: 'fromUsername', targetKey: 'username' }),
    requestToUser: Request.belongsTo(User, { as: 'toUser', foreignKey: 'toUsername', targetKey: 'username' }),
    
    requestToPost: Request.belongsTo(Post, { foreignKey: 'postId' }),
    postToRequests: Post.hasMany(Request, { foreignKey: 'postId' })
};

module.exports = associations;
