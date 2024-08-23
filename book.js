const bookModel = require('../model/bookModel')

exports.create = async (req, res) => {
    if (!req.body.title && !req.body.author && !req.body.publishedDate && !req.body.pages) {
        res.status(400).send({ message: "Content can not be empty!" })
    }

    const book = new bookModel({
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        pages: req.body.pages,
        genre: req.body.genre
    })

    await book.save().then(data => {
        res.send({
            message: "Book was added successfully!",
            book: data
        })
    }).catch(Error => {
        res.status(500).send({
            message: Error.message || "Some error occurred while adding book"
        })
    })
}


exports.findAll = async (req, res) => {
    try {
        const book = await bookModel.find();
        res.status(200).json(book)
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

exports.findOne = async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id)
        res.status(200).json(book)
    } catch(error) {
        res.status(404).json({ message: error.message})
    }
}

exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        })
    }
    
    const id = req.params.id;
    
    await bookModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            })
        }else{
            res.send({ message: "Book was updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.destroy = async (req, res) => {
    await bookModel.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Book not found.`
          })
        } else {
          res.send({
            message: "Book deleted successfully!"
          })
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        })
    })
}

exports.findAuthor= async (req,res)=>{
    try{
    const author = req.params.author;
    var books = await book.find({author:author})
    res.status(200).send(books)
    }catch(err){
        res.status(404).send("404 not found")
    }
}


exports.ascending= async (req,res)=>{
    try{
    var books = await book.find({}).sort({pages:'asc'})
    res.status(200).send(books)
    }catch(err){res.status(404).send("404 not found")
    }
}

exports.descending= async (req,res)=>{
    try{
    var books = await book.find({}).sort({pages:'desc'})
    res.status(200).send(books)
    }catch(err){res.status(404).send("404 not found")
    }
}