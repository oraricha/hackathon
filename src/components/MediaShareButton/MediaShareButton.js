/**
 * Created by oriavraham on 26/09/2016.
 */

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Hashtags} from 'components';
import {Block, Text, Heading} from 'rebass';

const MediaSnippet = (props) => {
  const {tags, articleURL, articleTitle, articleDescription} = props; // eslint-disable-line
  return (
      <Block style={{textAlign: 'left'}}>
        <Link to={articleURL} target="_blank">
          <Text style={{
            color: '#7E7F7F',
            marginBottom: '7px'
          }} small>Source</Text>
        </Link>
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
        <Hashtags tags={tags}/>
      </Block>
  );
};

MediaSnippet.propTypes = {
  tags: PropTypes.array.isRequired,
  articleTitle: PropTypes.string,
  articleURL: PropTypes.string,
  articleDescription: PropTypes.string,
};

export default MediaSnippet;
