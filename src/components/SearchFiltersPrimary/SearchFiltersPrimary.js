import React from 'react';
import { bool, func, node, number, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { FieldCheckbox } from '../../components';

import css from './SearchFiltersPrimary.module.css';

const SearchFiltersPrimaryComponent = props => {
  const {
    rootClassName,
    className,
    children,
    sortByComponent,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    onMapIconClick,
    isSearchMapOpenOnMobile,
    showPeople,
toggleTypeOfList
  } = props;

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.searchOptions}>
        {listingsAreLoaded ? (
          <div className={css.searchResultSummary}>
            <span className={css.resultsFound}>
              <FormattedMessage
                id="SearchFiltersPrimary.foundResults"
                values={{ count: resultsCount }}
              />
            </span>
          </div>
        ) : null}
        {sortByComponent}
        <div className={css.mapIcon} onClick={() => onMapIconClick(true)}>
          <FormattedMessage
            id={
              isSearchMapOpenOnMobile
                ? 'SearchFiltersMobile.hideMap'
                : 'SearchFiltersMobile.showMap'
            }
            className={css.mapIconText}
          />
        </div>
        <div className={classNames(css.personIcon, !showPeople ? css.giveIcon : null)} onClick={() => toggleTypeOfList()}>
          <FormattedMessage
            id={
              showPeople
                ? 'SearchFiltersMobile.hidePerson'
                : 'SearchFiltersMobile.showPerson'
            }
            className={css.mapIconText}
          />
        </div>
      </div>

      <div className={css.filters}>
        {children}
      </div>
    </div>
  );
};

SearchFiltersPrimaryComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchInProgress: false,
  isSecondaryFiltersOpen: false,
  toggleSecondaryFiltersOpen: null,
  selectedSecondaryFiltersCount: 0,
  sortByComponent: null,
};

SearchFiltersPrimaryComponent.propTypes = {
  rootClassName: string,
  className: string,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchInProgress: bool,
  isSecondaryFiltersOpen: bool,
  toggleSecondaryFiltersOpen: func,
  selectedSecondaryFiltersCount: number,
  sortByComponent: node,
  onMapIconClick: func.isRequired,
  isSearchMapOpenOnMobile: bool,
  showPeople: bool.isRequired,
  toggleTypeOfList: func.isRequired,
};

const SearchFiltersPrimary = SearchFiltersPrimaryComponent;

export default SearchFiltersPrimary;
