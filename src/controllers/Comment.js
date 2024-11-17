class Comment {
  //   constructor() {
  //     this.model = require('../models/Comment');
  //   }

  //   async getComments(req, res) {
  //     // const comments = await this.model.getComments();
  //     // res.json(comments);
  //   }

  //   async getComment(req, res) {
  //     // const comment = await this.model.getComment(req.params.id);
  //     // res.json(comment);
  //   }

  async addComment(req, res) {
    const { articleId, userId, text } = req.body;
    //const comment = await this.model.addComment(req.body);
    //res.json(comment);
  }

  //   async updateComment(req, res) {
  //     // const comment = await this.model.updateComment(req.params.id, req.body);
  //     // res.json(comment);
  //   }

  //   async deleteComment(req, res) {
  //     // const comment = await this.model.deleteComment(req.params.id);
  //     // res.json(comment);
  //   }
}

module.exports = new Comment();
