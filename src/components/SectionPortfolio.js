import React from 'react';
import _ from 'lodash';

import {htmlToReact, getPages, Link, withPrefix} from '../utils';

export default class SectionPortfolio extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let display_projects = _.orderBy(getPages(this.props.pageContext.pages, '/portfolio'), 'frontmatter.date', 'desc');
        let recent_projects = display_projects.slice(0, _.get(section, 'projects_number', null));
        let post_len = _.size(recent_projects);
        return (
            <section id={_.get(section, 'section_id', null)} className="block-portfolio block outer">
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
                  <div className={'portfolio-feed layout-' + _.get(section, 'layout_style', null)}>
                    {
                    _.map(recent_projects, (post, post_idx) => (
                    <article key={post_idx} className="project">
                      {(((post_idx === post_len - 1) && _.get(section, 'view_all_label', null)) && _.get(section, 'view_all_url', null)) ? (
                      <Link to={withPrefix(_.get(section, 'view_all_url', null))} className="project-link view-all-link">
                        {_.get(post, 'frontmatter.thumb_image', null) && (
                        <div className="project-thumbnail">
                          <img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(post, 'frontmatter.thumb_image_alt', null)} />
                        </div>
                        )}
                        <span className="view-all-button">{_.get(section, 'view_all_label', null)}</span>
                      </Link>
                      ) : 
                      <Link to={withPrefix(_.get(post, 'url', null))} className="project-link">
                        {_.get(post, 'frontmatter.thumb_image', null) && (
                        <div className="project-thumbnail">
                          <img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(post, 'frontmatter.thumb_image_alt', null)} />
                        </div>
                        )}
                        <header className="project-header">
                          <h3 className="project-title">{_.get(post, 'frontmatter.title', null)}</h3>
                        </header>
                      </Link>
                      }
                    </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
        );
    }
}
