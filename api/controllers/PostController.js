
// dummy database
// const post1 = { id: 1, 
//     title: 'POST TITLE 1', 
//     body: 'HERE IS MY, DO IT WITH WHAT YOU WANT'}

// const post2 = { id: 2, 
//     title: 'TITLE 2', 
//     body: 'IT IS ANOTHER WORLD'}

// const post3 = { id: 3, 
//     title: 'TITLE 3', 
//     body: 'TZUYU'}

// const allPosts = [post1, post2, post3]

module.exports = {
    posts: async function (req, res) {

        try {
            const posts = await Post.find()
            res.send(posts) 
        } catch(err) {
            res.serverError(err.toString())
        }
        
        // Post.find().exec(function (err, posts) {
        //     if (err) {
        //         return res.serverError(err.toString())
        //     }

        //     res.send(posts)
        // })
    },

    create: function (req, res) {

        const title = req.body.title
        const postBody = req.body.postBody

        sails.log.debug('My Title: ' + title)
        sails.log.debug('My Postbody: ' + postBody)

        Post.create({ title: title, body: postBody }).exec(function (err) {

            if (err) {
                return res.serverError(err.toString())
            }

            console.log("Finished creating post object")
            return res.end()
        })
    },

    findById: function (req, res) {
        const postId = req.param('postId')

        const filteredPost = allPosts.filter(p => { return p.id == postId })
        
        if (filteredPost.length > 0 ) {
            res.send(filteredPost[0])
        } else {
            res.send('Failed to find post by id: ' + postId)
        }
    },

    delete: async function (req, res) {
        const postId = req.param('postId')
        await Post.destory({id: postId})
        
        res.send('Trying to delete post now')
    }
}