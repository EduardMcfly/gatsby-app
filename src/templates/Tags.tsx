import React from 'react';
import Link from 'gatsby-link';
import './Tags.scss';
import PageProps from '../models/PageProps';
import DefaultLayout from '../layouts';

class TagsTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { posts, tagName } = this.props.pathContext;

    return (
      <>
        <DefaultLayout />
        <div className="tags-content">
          <span>Posts about {tagName}:</span>
          <ul>
            {posts
              ? posts.map((post: any, index: number) => {
                  return (
                    <li key={index}>
                      <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </>
    );
  }
}

export default TagsTemplate;
