class ArticleController {
  getArticle = (req, res) => {
    const articleId = req.params.id;

    res.send(`Article ID: ${articleId}`);
  };

  createArticle = (req, res) => {
    res.send('Article created');
  };

  updateArticle = (req, res) => {
    const articleId = req.params.id;

    res.send(`Article ID: ${articleId}`);
  };

  getArticles = (req, res) => {
    //const { _limit, _expand, _page, _sort, _order, q, type } = req.params;

    res.send('Articles');
  };
}

module.exports = new ArticleController();
