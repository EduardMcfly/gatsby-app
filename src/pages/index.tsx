import * as React from 'react';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';
import './index.scss';

class IndexPage extends React.Component<PageProps> {
  public render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    return (
      <>
        <DefaultLayout />
        {edges ? (
          <div className="content">
            {edges.map(({ node }) => {
              const post = node;
              return (
                <div className="post-wrapper" key={post.id}>
                  <div className="post">
                    <h2>
                      <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                    </h2>
                    <p>{post.frontmatter.excerpt}</p>
                    <p>{post.frontmatter.date}</p>
                  </div>
                  <ul key={post.id}>
                    {post.frontmatter.tags.map((tag, index) => (
                      <li key={index}>
                        <Link to={`/tags/${tag}`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            categories
            tags
            excerpt
          }
        }
      }
    }
  }
`;
