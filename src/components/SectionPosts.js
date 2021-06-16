import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {htmlToReact, classNames, getPages, Link, withPrefix} from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionPosts extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/blog'), 'frontmatter.date', 'desc');
        let recent_posts = display_posts.slice(0, _.get(section, 'posts_number', null));
        return (
            <section id={_.get(section, 'section_id', null)} className="block block-posts outer">
              <div className="inner">
                {(_.get(section, 'title', null) || _.get(section, 'subtitle', null)) && (
                <div className="block-header inner-sm">
                  {_.get(section, 'title', null) && (
                  <h2 className="block-title line-top">{_.get(section, 'title', null)}</h2>
                  )}
                  {_.get(section, 'subtitle', null) && (
                  <p className="block-subtitle">{htmlToReact(_.get(section, 'subtitle', null))}</p>
                  )}
                </div>
                )}
                <div className="block-content">
                  <div className={classNames('post-feed', 'grid', {'grid-col-2': _.get(section, 'col_number', null) === 'two', 'grid-col-3': _.get(section, 'col_number', null) === 'three'})}>
                    {_.map(recent_posts, (post, post_idx) => (
                    <article key={post_idx} className="post grid-item">
                      <div className="post-inside">
                        {_.get(post, 'frontmatter.thumb_image', null) && (
                        <Link className="post-thumbnail" to={withPrefix(_.get(post, 'url', null))}>
                          <img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(post, 'frontmatter.thumb_image_alt', null)} />
                        </Link>
                        )}
                        <header className="post-header">
                          <h3 className="post-title"><Link to={withPrefix(_.get(post, 'url', null))} rel="bookmark">{_.get(post, 'frontmatter.title', null)}</Link>
                          </h3>
                          <div className="post-meta">
                            <time className="published"
                              dateTime={moment(_.get(post, 'frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                          </div>
                        </header>
                        {_.get(post, 'frontmatter.excerpt', null) && (
                        <p className="post-content">
                          {_.get(post, 'frontmatter.excerpt', null)}
                        </p>
                        )}
                      </div>
                    </article>
                    ))}
                  </div>
                </div>
                {_.get(section, 'actions', null) && (
                <div className="block-buttons inner-sm">
                  <CtaButtons {...this.props} actions={_.get(section, 'actions', null)} />
                </div>
                )}
              </div>
            </section>
        );
    }
}
