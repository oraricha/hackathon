import React, {PropTypes} from 'react';
import {Grid, Cell} from 'radium-grid';
import {Text} from 'rebass';
import {Link} from 'react-router';
const styles = require('./TagResults.scss');

const MAX_TAGS_NUMBER = 10;

function getRelatedTags(tags, isDesktop) {
  const tagItem = (relatedTag, index) => {
    const itemStyle = isDesktop ? styles['tag-related'] : styles['tag-related-mobile'];
    return (
      <li className={itemStyle} key={`${relatedTag}-${index}`}>
        <Link to={`/tags/${relatedTag}`}>
          #{relatedTag}
        </Link>
      </li>
    );
  };
  const tagsList = tags.map((relatedTag, index)=> {
    return tagItem(relatedTag, index);
  });
  const line1 = tags.slice((tags.length / 2), tags.length);
  const tagsList1 = line1.map( (relatedTag, index)=> {
    return tagItem(relatedTag, index);
  });
  const line2 = tags.slice(0, (tags.length / 2));
  const tagsList2 = line2.map( (relatedTag, index)=> {
    return tagItem(relatedTag, index);
  });
  //
  return (isDesktop) ?
    (
      <div className={`${styles['tags-suggestions']} ${styles.list}`}>
        <ul>{tagsList}</ul>
      </div>
    )
  :
    (
      <div className={`${styles['tags-suggestions']} ${styles['mobile-list']}`}>
        <ul>{tagsList1}</ul>
        <ul>{tagsList2}</ul>
      </div>
    );
}

function getMobileTagResults(tagsArray) {
  // convert tags to items.
  const relatedItems = (tagsArray.length > 0) ? getRelatedTags(tagsArray) : [];
  const style = {marginTop: '20px', minWidth: '100%', height: `${(tagsArray.length > 0) ? '75px' : '0'}`};
  return (
    <Cell cellWidth="1/1" style={style}>
      {relatedItems}
    </Cell>
  );
}

function getDesktopTagResults(tagsArray) {
  // convert tags to items.
  const relatedItems = (tagsArray.length > 0) ? getRelatedTags(tagsArray, true) : [];
  const style = {minWidth: '100%'};
  return (
    <Grid cellWidth="1/1" style={style}>
      <Cell cellWidth="1/1">
        <Text style={{
          display: 'inline',
          fontFamily: 'Lato',
          fontWeight: '800',
          fontSize: '18px',
          margin: '5px 5px 0'
        }} bold>{`Tags`}</Text>
        <Text style={{display: 'inline', opacity: 0.8, fontWeight: '100', fontSize: '15px', margin: '7px 3px 0'}}>{`(${tagsArray.length})`}</Text>
      </Cell>
      <Cell cellWidth="1/1">
        {relatedItems}
      </Cell>
    </Grid>
  );
}

const TagResults = (props) => {
  const {tagsArray, forMobile} = props;
  const tags = tagsArray.slice(0, MAX_TAGS_NUMBER);
  const content = (forMobile) ? getMobileTagResults(tags) : getDesktopTagResults(tags);
  return content;
};

TagResults.propTypes = {
  tagsArray: PropTypes.array.isRequired,
  forMobile: PropTypes.bool,
};

TagResults.defaultProps = {
  tagsArray: [],
  forMobile: false,
};

export default TagResults;
