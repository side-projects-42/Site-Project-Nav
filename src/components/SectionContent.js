import React from 'react';
import _ from 'lodash';

import {htmlToReact, withPrefix, markdownify} from '../utils';

export default class SectionContent extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section id={_.get(section, 'section_id', null)} className="block block-text outer">
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
                {_.get(section, 'image', null) && (
                <div className="block-image">
                  <img src={withPrefix(_.get(section, 'image', null))} alt={_.get(section, 'image_alt', null)} />
                </div>
                )}
                {_.get(section, 'content', null) && (
                <div className="block-content inner-sm">
                  {markdownify(_.get(section, 'content', null))}
                </div>
                )}
              </div>
            </section>
        );
    }
}
