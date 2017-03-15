import React, {PropTypes} from 'react';
import {Heading} from 'rebass';

function createMarkup(title) {
  return {__html: title};
}

const TitleBackground = (props) => {
  const {title, image} = props;
  const styles = require('./TitleBackground.scss');
  return (
    <div className={styles.container} style={{
      maxWidth: '1600px',
      margin: 'auto' }}>
      <img src={image} alt="publishers bg" className={styles.image}/>
      <div className={styles.header}>
        <Heading _className="ResponsiveHeading Heading" level={2}>
          <div dangerouslySetInnerHTML={createMarkup(title)}/>
        </Heading>
      </div>
      );
    </div>
  );
};

TitleBackground.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};

export default TitleBackground;
