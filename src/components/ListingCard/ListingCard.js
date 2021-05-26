import React, { Component } from 'react';
import { array, string, func, bool } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { propTypes } from '../../util/types';
import { findOptionsForSelectFilter } from '../../util/search';
import { formatMoney } from '../../util/currency';
import { ensureListing, ensureUser } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLink, ResponsiveImage } from '../../components';

import css from './ListingCard.module.css';

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

export const ListingCardComponent = props => {
  const {
    className,
    rootClassName,
    intl,
    listing,
    renderSizes,
    setActiveListing,
    showUsers
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const author = ensureUser(listing.author);
  const priceRange = listing.priceRange;
  const id = showUsers ? author.id.uuid : currentListing.id.uuid;
  const { title = '', price, description } = currentListing.attributes;
  const slug = createSlug(title);
  const authorName = author.attributes.profile.displayName;
  const authorTitle = author.attributes.profile.publicData.title;
  const authorCompany = author.attributes.profile.publicData.company;
  const firstImage = showUsers ? currentListing.author.profileImage :
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;
  const supportedOrg = currentListing.attributes.publicData.localOrg;

  const supportedOrgOptions = findOptionsForSelectFilter(
    'supportedOrg',
    config.custom.customFilters
  );

  const findSupportedOrg = supportedOrgOptions.find(({ key }) => key === supportedOrg);
  const { formattedPrice, priceTitle } = priceData(price, intl);
  const minFormattedPrice = priceRange ? priceRange.min / 100 : 0;
  const maxFormattedPrice = priceRange ? priceRange.max / 100 : 0
  const params = showUsers ? { id } : { id, slug };
  
  return (
    <NamedLink className={classes} name={showUsers ? "ProfilePage" : "ListingPage"} params={params}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={() => setActiveListing(currentListing.id)}
        onMouseLeave={() => setActiveListing(null)}
      >
        <div className={css.aspectWrapper}>
          <LazyImage
            rootClassName={css.rootForImage}
            alt={showUsers ? authorName : title}
            image={firstImage}
            variants={['landscape-crop', 'landscape-crop2x']}
            sizes={renderSizes}
          />
        </div>
      </div>
      <div className={css.info}>
        <div className={css.mainInfo}>
           <div className={css.title}>
            {richText(showUsers ? authorName : title, {
              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
              longWordClass: css.longWord,
            })}
          </div>
          {!showUsers && <div className={css.authorInfo}>
            <FormattedMessage id="ListingCard.hostedBy" values={{ authorName }} />
          </div>}
          {showUsers && authorTitle && <div className={css.authorInfo}>
            {authorTitle}{authorCompany && ` @${authorCompany}`}
          </div>}
        </div>
        {showUsers && priceRange && (
          <div className={css.price}>
            <div className={css.priceValue} title={priceTitle}>
              ${minFormattedPrice} - ${maxFormattedPrice}
            </div>
          </div>
        )} 
        {!showUsers && <div className={css.price}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
        </div>}
      </div>
      {/* {findSupportedOrg && <div className={css.description}>{showUsers ? findSupportedOrg.label : description}</div>} */}
    </NamedLink>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  filtersConfig: config.custom.filters,
  setActiveListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  filtersConfig: array,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,
  showUsers: bool,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardComponent);
