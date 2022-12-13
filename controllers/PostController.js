import PostModel from '../models/Post.js'



export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to get posts.'
        })
    }
}

export const getOne = async (req, res) => {
    try {

        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            }, 
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                         message: 'Failed to get or update post viewcount.'
                    })
                }

                if (!doc) {
                    return res.status(404).json({ 
                        message: 'Could not find the post.'
                     })
                }

                res.json(doc)
            }
        ).populate('user')

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to get posts.'
        })
    }
}

export const create = async (req, res) => {
    try {
        
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId, //not from the body
        })

        const post = await doc.save()

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Failed to post.'
        })
    }
}

export const remove = async (req, res) => {
    try {

        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                     message: 'Failed to delete post.'
                })
            }

            if (!doc) {
                return res.status(404).json({ 
                    message: 'Could not find the post youre trying to delete.'
                 })
            }

            res.json({
                success: true,
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Failed to get posts.'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            }
        )
        
        res.json({
            success: true,
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Failed to update post.'
        })
    }
}