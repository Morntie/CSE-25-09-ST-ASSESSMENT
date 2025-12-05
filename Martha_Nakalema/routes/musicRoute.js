const express = require('express');
const multer = require('multer');
const path = require('path');
const flash = require('connect-flash');
const Music = require('../models/Music'); 

const router = express.Router();

router.get("/music", async (req, res) => {
    try {
        const musicList = await Music.find();
        res.render("music", { musicList });
    } catch (error) {
        console.error(error.message)
    }
});

router.post("/music", async (req, res) => {
    try {
        const { title, artist, album, yearOfRelease } = req.body;
        if (!title || !artist || !album || !yearOfRelease) {
            req.flash('error_msg', 'Error: Song title is required.');
        }
        const newMusic = new Music({
            title,
            artist,
            album,
            yearOfRelease,
        });
        await newMusic.save();
        res.render('music', { newMusic: musicList });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send("Could not save music.");
    }
});
module.exports = router;