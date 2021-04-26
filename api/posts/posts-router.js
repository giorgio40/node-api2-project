// implement your posts router here
const Posts =require('./posts-model')

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) =>{
        console.log(err)
        res.status(500).json({message:"Error retrieving posts"})
    } )
})

router.get('/:id', (req, res) =>{
    Posts.findById(req.params.id)
    .then(posts =>{
        if(posts){
        res.status(200).json(posts)
        }else{
            res.status(404).json({message:"cannot find post with id " + req.params.id})
        }
    })
    .catch(err =>{
        res.status(500).json({message:"Error retrieving posts"})
    })
})

router.post('/',(req, res) =>{
    Posts.insert(req.body)
    .then((posts) =>{
     
        res.status(200).json(posts)

    }).catch((err) =>{
        res.status(500).json({message:"Error adding posts"})

    })

})

router.put('/:id',(req, res) =>{
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then((posts) =>{
        if(posts){
            res.status(200).json(posts)
        }else{
            res.status(404).json({message:"Error updating posts"})

        }
    })
    .catch(err =>{
        res.status(500).json({message:"Error updating posts"})
    })

})

router.delete("/:id", (req, res) =>{
    Posts.remove(req.params.id)
    .then((count) => {
        if(count>0){
            res.status(200).json({message:"Success"})
        }else{
            res.status(404).json({message:"the post could not be found"})
        }
    })
    .catch((err) => {
        res.status(500).json({message:"Error deleting post"})
    })
})

router.get('/:id/comments', (req, res)=>{
    Posts.findPostComments(req.params.id)
    .then(comment =>{
        if(comment.length > 0){
            res.status(200).json(comment)
        }else{
            res.status(404).json({message:"Comment not found"})
        }
    })
    .catch(err =>{
        res.status(500).json({message:"Error retrieving comment"})
    })
})


module.exports = router