const sequelize = require('sequelize');
const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');
const { User, Post, Like } = require('../models');
const like = require('../models/like');
const Op = sequelize.Op;

module.exports = {
    createPost: async (req, res) => {
        const { userId, title, description } = req.body;

        try {
            const user = await User.findOne({ where: { id: userId } });
            const post = await post.create({ title, contents });
            await user.addPost(post);
            return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, post));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
        }
    },
    readAllPosts: async (req, res) => {
        const filters = req.query.filters;

        try {
            const post = await Post.findAll({
                group: 'id',
                attributes: ['id', 'title', 'description', 'view_count', 'videoURL', 'thumbnailURL', 'createdAt', [sequelize.fn("COUNT", "Liker.Like.PostId"), 'likeCnt']],
                include: [{
                    model: User,
                    as: 'Liked',
                    attributes: [],
                    through: { attributes: [] }
                }]
            });
            let allPosts = post.map(item => item.dataValues);
            let popular = post.map(item => item.dataValues).sort((a, b) => b.view_count - a.view_count);
            let newest = post.map(item => item.dataValues).sort((a, b) => b.createdAt - a.createdAt);

            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, { post, popular, newest }));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_POST_ALL_SUCCESS));
        }
    },


    postDetail: async (req, res) => {
        const idx = req.query.idx;

        if (!idx) {
            res.status(400).json({
                message: "idx가 비어있습니다."
            })
            return
        }
        try {
            const details = await Post.findOne({
                where: {
                    id: idx,
                },
                attributes: ['title', 'description', 'videoURL', 'thumbnailURL', [sequelize.fn("COUNT", "Liker.Like.PostId"), 'likeCnt'], 'view_count'],
                include: [{
                    model: User,
                    as: 'writern',
                    attributes: ['profileImage'],
                    through: { attributes: [] }
                }]
            });
            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, details));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_POST_SUCCESS));
        }
    },
    postComment: async (req, res) => {

        var newComment = req.body.comment;
        newComment.author = req.user.id;
        Post.update({ _id: req.params.id }, { $push: { comments: newComment } }, function (err, post) {
            if (err) return res.json({ success: false, message: err });
            res.redirect('/posts/' + req.params.id + "?" + req._parsedUrl.query);
        });

        try {

        } catch (err) {

        }
    },
    /*
    //항목별 데이터 받기
    const category = req.query.category;
    
    if (category == 'growth') {
        try {
            const post = await Post.findAll({
                where: {
                    [Op.or]: [{ category_one: '자기개발' }, { category_two: '자기개발' }, { category_three: '자기개발' }]
                },
                group: 'id',
                attributes: ['title', 'description', 'videoURL', 'thumbnailURL', [sequelize.fn("COUNT", "Liker.Like.PostId"), 'likeCnt']]
            });
            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, post));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_USER_ALL_FAIL));
        }
    }
 
    if (category == 'found') {
        try {
            const post = await Post.findAll({
                where: {
                    [Op.or]: [{ category_one: '창업' }, { category_two: '창업' }, { category_three: '창업' }]
                },
                group: 'id',
                attributes: ['title', 'description', 'videoURL', 'thumbnailURL', [sequelize.fn("COUNT", "Liker.Like.PostId"), 'likeCnt']]
            });
            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, post));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_USER_ALL_FAIL));
        }
    }
 
    if (category == 'developer') {
        try {
            const post = await Post.findAll({
                where: {
                    [Op.or]: [{ category_one: '개발자' }, { category_two: '개발자' }, { category_three: '개발자' }]
                },
                group: 'id',
                attributes: ['title', 'description', 'videoURL', 'thumbnailURL', [sequelize.fn("COUNT", "Liker.Like.PostId"), 'likeCnt']]
            });
            return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, post));
        } catch (err) {
            console.log(err);
            return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_USER_ALL_FAIL));
        }
    }
    */
    /*
    try {
        const post = await Post.findAll({
            group: 'id',
            attributes: ['title', 'description', 'videoURL', 'thumbnailURL', [sequelize.fn("COUNT", "Liker.Like.PostId"), 'likeCnt']]
        });
        return res.status(sc.OK).send(ut.success(sc.OK, rm.READ_POST_ALL_SUCCESS, post));
    } catch (err) {
        console.log(err);
        return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.READ_USER_ALL_FAIL));
    }
    */

    createLike: async (req, res) => {
        const PostId = req.params.postId;
        const UserId = req.body.userId;
        try {
            const like = await Like.create({ PostId, UserId });
            return res
                .status(sc.OK)
                .send(ut.success(sc.OK, rm.CREATE_LIKE_SUCCESS, like));
        } catch (err) {
            console.log(err);
            return res
                .status(sc.INTERNAL_SERVER_ERROR)
                .send(ut.success(sc.INTERNAL_SERVER_ERROR, rm.CREATE_LIKE_FAIL));
        }
    },
    deleteLike: async (req, res) => {
        const PostId = req.params.postId;
        const UserId = req.body.userId;
        try {
            await Like.destroy({
                where: {
                    UserId,
                    PostId,
                },
            });
            return res.status(sc.OK).send(ut.success(sc.OK, rm.DELETE_LIKE_SUCCESS));
        } catch (err) {
            console.log(err);
            return res
                .status(sc.INTERNAL_SERVER_ERROR)
                .send(ut.success(sc.INTERNAL_SERVER_ERROR, rm.DELETE_LIKE_FAIL));
        }
    },
};