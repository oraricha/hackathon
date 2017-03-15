/**
 * Created by oriavraham on 26/09/2016.
 */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {LinkBlock, Block, Text, Heading} from 'rebass';
import Radium from 'radium';

const MediaSnippet = (props) => {
  const {tags, articleURL, articleTitle, articleDescription, handleClickOnArticleURL} = props; // eslint-disable-line
  const desktopOnly = {
    '@media (max-width: 640px)': {
      display: 'none'
    }
  };
  const mobileOnly = {
    '@media (min-width: 640px)': {
      display: 'none'
    }
  };
  return (
      <Block mx={0} mt={0}
      onClick={handleClickOnArticleURL}>
        <LinkBlock is={Link} to={articleURL || ''} target="_blank">
          <div style={mobileOnly}>
            <Text style={{
              color: '#A8A7A7',
            }}>
              {articleTitle}
            </Text>
          </div>
        </LinkBlock>
        <LinkBlock is={Link} to={articleURL || ''} target="_blank">
          <div style={desktopOnly}>
            <Heading style={{
              color: '#DBDBDB',
              marginBottom: '4px'
            }} size={3}>
              {articleTitle}
            </Heading>
            <Text style={{
              color: '#DBDBDB',
              marginBottom: '25px'
            }} small>
              {articleDescription}
            </Text>
          </div>
        </LinkBlock>
      </Block>
  );
};

MediaSnippet.propTypes = {
  articleTitle: PropTypes.string,
  articleURL: PropTypes.string,
  articleDescription: PropTypes.string,
  handleClickOnArticleURL: PropTypes.func,
};

export default Radium(MediaSnippet);
