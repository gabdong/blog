const express = require("express");
const router = express.Router();
const db = require("../config/db");

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

module.exports = router;