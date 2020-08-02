
const db = require('../../common/db.common');
const { Blog } = require("../../model/blog.model");
const { sequelize } = require('../../common/db.common');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');



/* ユーザ新規作成
 * 登録データ：メールアドレス、パスワード
 * 検索テーブル: ユーザ情報テーブル
 */
const createBlog = async(queryInfo) => {
    try {
        // トランザクション処理開始
        const t = await sequelize.transaction();
        const result = await Blog.create({
            // ユーザID
            UserID: queryInfo.UserID,
            // タイトル
            Title: queryInfo.Title,
            // Content
            Content: queryInfo.Content,
            
        });
        // トランザクションコンミット
        await t.commit();
        // 結果を返す
        return result;
    } catch (error) {
        await t.rollback();
        console.error("情報取得エラー:" + error.stack);
        return error;
    }
}

//ブログリスト
const getBlogList = async(queryInfo) => {
    try {
        // 結果を返す
        const result = await Blog.findAll({
            where: {
                [Op.and]: [{
                        [queryInfo.key]: queryInfo.val
                    },
                ]
            }
        });
        return result;
    } catch (error) {
        console.error("情報取得エラー:" + error.stack);
        throw error;
    }
}

//ブログ詳細
const getBlogDetail = async(queryInfo) => {
    try {
        // 結果を返す
        const result = await Blog.findOne({
            where: {
                [Op.and]: [{
                        [queryInfo.key]: queryInfo.val
                    },
                ]
            }
        });
        return result;
    } catch (error) {
        console.error("情報取得エラー:" + error.stack);
        throw error;
    }
}

const blogDelete = async(queryInfo) => {
    try {
        // 結果を返す
        const result = await Blog.destroy({
            where: {
                [Op.and]: [{
                        [queryInfo.key]: queryInfo.val
                    },
                ]
            }
        });
        return result;
    } catch (error) {
        console.error("情報取得エラー:" + error.stack);
        throw error;
    }
}

const blogUpdate = async(queryInfo) => {
    try {
        const result = await Blog.update({

            // タイトル
            Title: queryInfo.Title,
            // Content
            Content: queryInfo.Content,
            
        },{where: {
            
            [Op.and]: [{
                [queryInfo.key]: queryInfo.val
            }
        ]
        }
            
        });
        // 結果を返す
        return result;
    } catch (error) {
        console.error("情報取得エラー:" + error.stack);
        return error;
    }
}


module.exports = {
    createBlog: createBlog,
    getBlogList:getBlogList,
    getBlogDetail:getBlogDetail,
    blogDelete:blogDelete,
    blogUpdate:blogUpdate
}
