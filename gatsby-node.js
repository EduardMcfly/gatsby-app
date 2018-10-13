const path = require('path');

const createClassificationPages = (createPage, posts) => {
  const classifications = [
    {
      singularName: "category",
      pluralName: "categories",
      template: {
        part: path.resolve(`src/templates/Categories.tsx`),
        all: path.resolve(`src/templates/AllCategories.tsx`)
      },
      postsByClassificationNames: postsByType(posts, "categories")
    },
    {
      singularName: "tag",
      pluralName: "tags",
      template: {
        part: path.resolve(`src/templates/Tags.tsx`),
        all: path.resolve(`src/templates/AllTags.tsx`)
      },
      postsByClassificationNames: postsByType(posts, "tags")
    }
  ]

  classifications.forEach(classification => {
    const names = Object.keys(classification.postsByClassificationNames)

    createPage({
      path: `/${classification.pluralName}`,
      component: classification.template.all,
      context: {
        [`${classification.pluralName}`]: names.sort(),
      },
    });
    
    names.forEach(name => {
      const postsByName = classification.postsByClassificationNames[name];
      createPage({
        path: `/${classification.pluralName}/${name}`,
        component: classification.template.part,
        context: {
          posts: postsByName,
          [`${classification.singularName}Name`]: name,
        },
      });
    });
  })
};

const postsByType = (posts, classificationType) => {
  const postsByTypes = {}
  posts.forEach(({ node }) => {
    if (node.frontmatter[classificationType]) {
      node.frontmatter[classificationType].forEach(name => {
        if (!postsByTypes[name]) {
          postsByTypes[name] = [];
        }
        postsByTypes[name].push(node);
      });
    }
  });
  return postsByTypes;
}

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

      createClassificationPages(createPage, posts);

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