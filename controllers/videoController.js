const Video = require('../models/Video');
const { validationResult } = require('express-validator');

// Create a new video
exports.createVideo = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        // create a new video
        const video = new Video(req.body);

        video.author = req.user.id

        // save video
        video.save();
        res.json(video)

    } catch (error) {

        console.log(error);
        res.status(400).send('Error create video');

    }
}

// List videos
exports.getVideo = async (req, res) => {
    try{
        const videos = await Video.find({ category: 'public'}).sort({created: -1});
        res.json(videos);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error list video")
    }
}

// Preview video
exports.previewVideo = async (req, res) => {

    try{
        
        const video = await Video.findById(req.params.id)
        res.json(video);

    }
    catch(error){
        console.log(error);
        res.status(500).send("Error preview video")
    }
}

// Owner video
exports.meVideo = async (req, res) => {
    try{
        const videos = await Video.find({ author: req.user.id}).sort({created: -1});
        res.json(videos);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error list video")
    }
}

// Update video
exports.updateVideo = async (req, res) => {

    const { name, description, category } = req.body;

    const newVideo=  {};

    name ? newVideo.name = name : "" ;
    description ? newVideo.description = description : "" ;
    category ? newVideo.category = category : "" ;

    try{
        
        let video = await Video.findById(req.params.id)
        
        if(!video){
            return res.status(404).json({ msg: "Video not found" });
        }

        if(video.author.toString() !== req.user.id ){
            return res.status(401).json({ msg: "Not authorized" });
        }

        video = await Video.findByIdAndUpdate(
            { _id: req.params.id } , 
            { $set: newVideo}, 
            {new: true} );

        res.json(video);

    }
    catch(error){
        console.log(error);
        res.status(500).send("Error update video")
    }
}

// Delete video
exports.deleteVideo = async (req, res) => {

    try{

        let video = await Video.findById(req.params.id)
        
        if(!video){
            return res.status(404).json({ msg: "Video not found" });
        }

        if(video.author.toString() !== req.user.id ){
            return res.status(401).json({ msg: "Not authorized" });
        }

        video = await Video.findOneAndRemove({ _id: req.params.id });

        res.json({msg: "Video deleted"});

    }
    catch(error){
        console.log(error);
        res.status(500).send("Error delete video")
    }
}

