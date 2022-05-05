const { successHandler, errorHandler } = require('../services/handler');
const Post = require('../models/postmodel');
const posts = {
    getData: async (req, res) => {
        const posts =await Post.find(); ;
        successHandler(res, "取得成功", posts);
    },
    postData: async (req, res) => {
        try {
            const PostData = req.body;
            const newPost = await Post.create(PostData);
            successHandler(res, "新增成功", newPost);
        } catch(error) {
            let errorStr = error;
            if (error.errors) {
                errorStr = Object.values(error.errors).map(item => item.message).join('、');
            }
            errorHandler(res, errorStr);
        }
    },
    deleteAllData: async (req, res) => {
        if (req.originalUrl === '/posts/') {
            errorHandler(res, "無此網站路由", 404);
        } else {
            await Post.deleteMany({});
            successHandler(res, "刪除成功");
        }
    },
    deleteSingleData: async (req, res) => {
        try {
            const deletePost = await Post.findByIdAndDelete(req.params.id);
            if (!deletePost) { 
                errorHandler(res, "刪除失敗，查無此id");
            } else {
                successHandler(res, "刪除成功");
            }
        } catch(error) {
            errorHandler(res, "刪除失敗，查無此id");
        }
    },
    patchData: async (req, res) => {
        try {
            const PostData = req.body;
            console.log(req.params.id);
            console.log(PostData);
            const editPost = await Post.findByIdAndUpdate(req.params.id, PostData,{ new: true });
            console.log(editPost);
                if (editPost=== null) { 
                    errorHandler(res, "更新失敗，查無此id或欄位格式錯誤");
                } else {
                    successHandler(res, "更新成功", editPost);
                }
        } catch(error) {
            errorHandler(res, "更新失敗，查無此id或欄位格式錯誤");
        }
    }
}

module.exports = posts;