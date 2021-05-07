import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ListingCard, PaginationLinks } from '../../components';
import { FormattedMessage } from '../../util/reactIntl';
import uniqBy from 'lodash/uniqBy';
import css from './SearchResultsPanel.module.css';

const SearchResultsPanel = props => {
  const {
    className,
    rootClassName,
    listings,
    pagination,
    search,
    setActiveListing,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    showPeople,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const paginationLinks =
    pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="SearchPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    ) : null;

  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const usersListings = uniqBy(listings, 'author.id');

  return (
    <div className={classes}>
      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFiltersPrimary.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFiltersPrimary.loadingResults" />
        </div>
      ) : null}
      <div className={css.listingCards}>
        
        {(showPeople ? usersListings : listings).map(l => (
          <ListingCard
            className={showPeople ? css.peopleCard : css.listingCard}
            key={l.id.uuid}
            listing={l}
            renderSizes={cardRenderSizes}
            setActiveListing={setActiveListing}
            showUsers={showPeople}
          />
        ))}
        {props.children}
      </div>
      {paginationLinks}
    </div>
  );
};

SearchResultsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
};

const { array, node, object, string, number, bool } = PropTypes;

SearchResultsPanel.propTypes = {
  children: node,
  className: string,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
  listingsAreLoaded: bool,
  resultsCount: number,
  searchInProgress: bool,
  showPeople: bool,
};

export default SearchResultsPanel;
