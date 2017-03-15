import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Overlay from '../Overlay/Overlay';
const styles = require('./CategoriesMenu.scss');

function trafficOut(dispatch, category, callback) {
  const eventAction = category.toUpperCase();
  dispatch({
    type: 'ANALYTICS_EVENT',
    payload: {
      eventCategory: 'Top Bar',
      eventAction: `${eventAction}`,
      eventLabel: ''
    }
  });
  callback();
}

function getCategoryItems(categories, handleSelectedCategory, toggled, dispatch, closeMenu) {
  // handleLinkClick
  function handleLinkClick(category) {
    trafficOut(dispatch, category, closeMenu);
  }
  // generate header items
  return categories.map((relatedCategory, index) => {
    const isStartNowItem = (relatedCategory === 'start');
    const category = (isStartNowItem) ? 'start now' : relatedCategory;
    const isLink = (index > 4);
    // generate attributes
    const key = `${relatedCategory + index}`;
    const className = `${styles[`${relatedCategory}`]} ${(toggled ? styles['menu-open'] : '')}`;
    const func = isLink ? handleLinkClick : handleSelectedCategory;
    return (
      <div className={styles.menu}
           key={key}>
        <div className={className}
           key={key}
           onClick={() => {func(relatedCategory);}}>
          {isLink ? <Link className={className} target={isStartNowItem ? '_blank' : ''}
                          to={isStartNowItem ? 'https://app.apester.com/' : relatedCategory}>
              <p>{category}</p>
            </Link> :
            <p>{relatedCategory}</p>}
        </div>
      </div>
    );
  });
}

const CategoriesMenu = (props) => {
  const {categories, handleSelectedCategory, toggled, dispatch, closeMenu} = props;
  const categoryItems = getCategoryItems(categories, handleSelectedCategory, toggled, dispatch, closeMenu);
  return (
    <Overlay verticalAlign="flex-start" width={100} open={toggled}
             className="Search" margin="60px 0 0" style={{height: '100%'}}>
        {categoryItems}
    </Overlay>
  );
};

CategoriesMenu.propTypes = {
  categories: PropTypes.array,
  handleSelectedCategory: PropTypes.func,
  toggled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func,
  closeMenu: PropTypes.func,
  dispatch: PropTypes.func,
};

CategoriesMenu.defaultProps = {
  categories: ['news', 'sport', 'entertainment', 'tech', 'lifestyle', 'publishers', 'advertisers', 'about', 'start'],
};

export default CategoriesMenu;
