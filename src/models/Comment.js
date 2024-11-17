const Comment = new Schema(
  {
    articleId: { type: String, required: true },
    userId: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
