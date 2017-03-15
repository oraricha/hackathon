import React, {PropTypes} from 'react';
const styles = require('./CategoriesBar.scss');

function getDesktopCategoryItems(categories, handleSelectedCategory, currentCategory) {
  const items = categories.map((relatedCategory, index) => {
    const selectedCategory = (currentCategory === 'default') ? 'news' : currentCategory;
    const isSelected = (selectedCategory === relatedCategory);
    const key = `${relatedCategory + index}`;
    return (
      <div className={styles['related-list']} key={key}>
        <div className={styles[`${relatedCategory}`]}
             key={key}
             onClick={() => handleSelectedCategory(relatedCategory)}>
          <dl className={(isSelected) ? styles.selected : {}}>{relatedCategory}</dl>
        </div>
      </div>
    );
  });
  return (
    <div>{items}</div>
  );
}

function getMobileCategoryItems(categories, handleSelectedCategory, currentCategory) {
  const item = (relatedCategory, isSelected) => {
    const selectedStyle = (isSelected) ? styles.selected : {};
    return (
      <div className={`${styles[`${relatedCategory}`]} ${selectedStyle}`}
         onClick={() => handleSelectedCategory(relatedCategory)}
           key={`${relatedCategory}`}>
        <dl>{(isSelected) ? <i className={`ic icon-arrow-left`}></i> : <span></span>}
          <p>{relatedCategory}</p>
        </dl>
      </div>
    );
  };

  const items = categories.map((relatedCategory) => {
    return (
      item(relatedCategory)
    );
  });

  const selected = categories.find((name) => {
    return (name === currentCategory) && (name !== 'all');
  });

  return (
    <div className={styles['related-list-mobile']}>
      {
        (selected) ?
        item(currentCategory, true)
        : items
      }
    </div>
  );
}

const CategoriesBar = (props) => {
  const {categories, handleSelectedCategory, currentCategory, forMobile} = props;
  const categoryItems = (forMobile) ?
    getMobileCategoryItems(categories, handleSelectedCategory, currentCategory) :
    getDesktopCategoryItems(categories, handleSelectedCategory, currentCategory);
  return (
    <div> {categoryItems} </div>
  );
};

CategoriesBar.propTypes = {
  categories: PropTypes.array,
  displayBar: PropTypes.bool,
  handleSelectedCategory: PropTypes.func,
  currentCategory: PropTypes.string,
  forMobile: PropTypes.bool,
};

CategoriesBar.defaultProps = {
  categories: ['news', 'sport', 'entertainment', 'tech', 'lifestyle'],
  displayBar: false,
  forMobile: false,
};

export default CategoriesBar;
