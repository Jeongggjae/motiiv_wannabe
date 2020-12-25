const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

/** 1 : N   User : Post */
db.User.hasMany(db.Post, { onDelete: 'cascade' });
db.Post.belongsTo(db.User);


/** N: M    User : Post => Comment */
db.User.belongsToMany(db.Post, { through: 'Comment', as: 'writern' });
db.Post.belongsToMany(db.User, { through: 'Comment', as: 'writtenpost' });


/** 1 : N   User : Comment */
//db.User.hasMany(db.Comment, { onDelete: 'cascade' });
//db.Comment.belongsTo(db.User);

/** N:M     User : Post => Like */
db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liker' });
db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liked' });


module.exports = db;

