import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './index.scss';

class Header extends React.PureComponent<{}> {
  public render() {
    return (
      <div className="header">
        <h1>
          <Link to="/">Gatsby</Link>
        </h1>
        <Link to="/categories">Categories</Link>
        <Link to="/tags">Tags</Link>
      </div>
    );
  }
}

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location?: {
    pathname: string;
  };
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, {}> {
  public render() {
    return (
      <div>
        <Helmet
          title="Gatsby Typescript Template"
          meta={[{ name: 'description', content: 'template' }, { name: 'keywords', content: 'template, something' }]}
        />
        <Header />
      </div>
    );
  }
}

export default DefaultLayout;
