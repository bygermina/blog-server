const Article = require('../models/Article');

class ArticleController {
  async getArticle(req, res) {
    try {
      const articleId = req.params.id;
      const article = await Article.findByPk(articleId);

      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async createArticle(req, res) {
    try {
      const { title, subtitle, img, views, userId, type, blocks } = req.body;

      const newArticle = await Article.create({
        title,
        subtitle,
        img,
        views,
        userId,
        type,
        blocks,
      });

      res.status(201).json(newArticle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateArticle(req, res) {
    try {
      //const articleId = req.params.id;
      const { id, title, subtitle, img, views, userId, type, blocks } =
        req.body;

      const article = await Article.findByPk(id);

      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      await article.update({
        title,
        subtitle,
        img,
        views,
        userId,
        type,
        blocks,
      });

      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getArticles(req, res) {
    try {
      const {
        _limit = 10,
        _page = 1,
        _sort = 'createdAt',
        _order = 'DESC',
      } = req.query;
      const offset = (_page - 1) * _limit;

      const articles = await Article.findAndCountAll({
        limit: parseInt(_limit),
        offset: parseInt(offset),
        order: [[_sort, _order]],
      });

      res.status(200).json({
        total: articles.count,
        pages: Math.ceil(articles.count / _limit),
        data: articles.rows,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ArticleController();
