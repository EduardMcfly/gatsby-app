import Post from './Post';

interface MarkdownRemark {
  totalCount: number;
  edges: { node: Post }[];
}

export default MarkdownRemark;
