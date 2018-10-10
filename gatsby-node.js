const path = require('path');

const createCategoryPages = (createPage, posts) => {
  const categoryPageTemplate = path.resolve(`src/templates/Categories.tsx`);
  const allCategoriesTemplate = path.resolve(`src/templates/AllCategories.tsx`);

  const postsByCategories = {};

  posts.forEach(({ node }) => {
    if (node.frontmatter.categories) {
      node.frontmatter.categories.forEach(category => {
        if (!postsByCategories[category]) {
          postsByCategories[category] = [];
        }
        postsByCategories[category].push(node);
      });
    }
  });

  const categories = Object.keys(postsByCategories);

  createPage({
    path: `/categories`,
    component: allCategoriesTemplate,
    context: {
      categories: categories.sort(),
    },
  });

  categories.forEach(categoryName => {
    const posts = postsByCategories[categoryName];

    createPage({
      path: `/categories/${categoryName}`,
      component: categoryPageTemplate,
      context: {
        posts,
        categoryName,
      },
    });
  });
};

const createTagPages = (createPage, posts) => {
  const tagPageTemplate = path.resolve(`src/templates/Tags.tsx`);
  const allTagsTemplate = path.resolve(`src/templates/AllTags.tsx`);

  const postsByTags = {};

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = [];
        }
        postsByTags[tag].push(node);
      });
    }
  });

  const tags = Object.keys(postsByTags);

  createPage({
    path: `/tags`,
    component: allTagsTemplate,
    context: {
      tags: tags.sort(),
    },
  });

  tags.forEach(tagName => {
    const posts = postsByTags[tagName];
    createPage({
      path: `/tags/${tagName}`,
      component: tagPageTemplate,
      context: {
        posts,
        tagName,
      },
    });
  });
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve(`src/templates/Post.tsx`);

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          frontmatter {
            date
            path
            title
            categories
            tags
          }
        }
      }
    }
  }`).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }
      const posts = result.data.allMarkdownRemark.edges;

      createTagPages(createPage, posts);
      createCategoryPages(createPage, posts);

      posts.forEach(({ node }) => {
        createPage({

          path: node.frontmatter.path,
          component: postTemplate,
          context: {
            post: node
          }
        });
      });
    });
}