const mongojs = require("mongojs");
const db = mongojs(
    process.env.MONGO_URL,
  ["task"]
);
exports.getItems = (req,res,next)=>{
    db.task.find(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.send(docs);
        }
      });
}
exports.getItem = (req,res,next)=>{
    db.task.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(
        err,
        doc
      ) {
        if (err) {
          res.send(err);
        } else {
          if (!doc) {
            res.status(404).send("Not Found.");
          } else {
            res.send(doc);
          }
        }
      });
}

exports.createItem = (req, res, next) =>{
    const {body:item} = req;
    db.task.save(item, (err, doc) => {
        if (err) {
            res.send(err);
        } else {
            res.send(doc);
        }
      });
}
exports.removeItem  =(req,res,next)=>{
        db.task.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, doc) => {
          if (err) {
            res.send(err);
          } else {
            if (!doc) {
              res.status(404).send("Not Found.");
            } else {
              db.task.remove({ _id: mongojs.ObjectId(req.params.id) }, function(
                err,
                task
              ) {
                if (err) {
                  res.send(err);
                } else {
                  res.json(task);
                }
              });
            }
          }
        });
}
exports.updateItem = (req,res,next)=>{
    const {body:updateData} = req;
    db.task.findAndModify({
        query:{ _id: mongojs.ObjectId(req.params.id) },
        update: { $set: updateData },
        new: false
    }, function (err, doc) {
        if (err) {
            res.send(err);
          } else {
            res.send(doc);
          }
    })


}