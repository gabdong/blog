const express = require("express");
const router = express.Router();
const db = require("../config/db");

//* 태그 리스트 요청
router.get('/', async (req, res) => {
    try {
        const [selectTagListRes] = await db.query(`
            SELECT idx, auth, name 
            FROM tags 
            WHERE delete_datetime IS NULL
        `);
    
        res.json({ msg: "SUCCESS",  tagList: selectTagListRes});
    } catch (err) {
        throw err;
    }
});

//* 태그 추가
router.post('/', async (req, res) => {
    const { tags, user: userData } = req.body;
    const { idx: userIdx } = userData;
    
    for (const tagName of tags) {
        try {
            const [selectTagNameRes] = await db.query(`
                SELECT idx, delete_datetime 
                FROM tags 
                WHERE name=?
            `, tagName);

            if (selectTagNameRes.length > 0) {
                const {idx: duplicateIdx, delete_datetime} = selectTagNameRes[0];

                if (delete_datetime !== null) {
                    await db.query(`
                        UPDATE tags SET
                        delete_datetime=NULL
                        WHERE idx=?
                    `, duplicateIdx);
                }
            } else {
                await db.query(`
                    INSERT INTO tags SET 
                    auth=0, 
                    member=?, 
                    name=?
                `, [userIdx, tagName]);
            }
        } catch (err) {
            throw err;
        }
    }

    res.json({ msg: "SUCCESS" });
});

module.exports = router;