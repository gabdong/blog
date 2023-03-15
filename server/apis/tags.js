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

//* 태그 수정
router.put('/:tagIdx', async (req, res) => {
    const { tagIdx } = req.params;
    const { name } = req.body;

    try {
        const [duplicateTagRes] = await db.query(`
            SELECT idx 
            FROM tags 
            WHERE name=? 
            AND delete_datetime IS NULL
        `, [name]);

        if (duplicateTagRes.length > 0) {
            const err = new Error('중복된 태그명이 존재합니다.')
            err.code = 409;

            throw err;
        } else {
            await db.query(`
                UPDATE tags SET 
                name=? 
                WHERE idx=?
            `, [name, tagIdx]);

            res.json({msg: 'SUCCESS'});
        }
    } catch (err) {
        if (err.code) {
            res.status(err.code).json({msg: "중복된 태그명이 존재합니다."});
        } else {
            throw err;
        }
    }
});

//* 태그 삭제
router.delete('/:tagIdx', async (req, res) => {
    const { tagIdx } = req.params;

    try {
        await db.query(`
            UPDATE tags SET 
            delete_datetime=CURRENT_TIMESTAMP() 
            WHERE idx=?
        `, [tagIdx]);

        res.json({msg: "SUCCESS"});
    } catch (err) {
        res.status(500).json({msg: "태그 삭제를 실패하였습니다."});
    }
});

module.exports = router;