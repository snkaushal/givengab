import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER, propTypes } from '../../util/types';
import { ensureCurrentUser, ensureUser } from '../../util/data';
import { withViewport } from '../../util/contextHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  AvatarLarge,
  NamedLink,
  ListingCard,
  Reviews,
  ButtonTabNavHorizontal,
  IconSocialMediaFacebook,
  IconSocialMediaTwitter,
  ExternalLink,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '..';
import config from '../../config';
import UserIcon from './UserIcon.svg';
import Location from './Location.svg';
import Links from './Links.svg';
import { findOptionsForSelectFilter } from '../../util/search';

import css from './ProfilePage.module.css';
import { isEmpty, omit } from 'lodash';

const MAX_MOBILE_SCREEN_WIDTH = 768;

export class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // keep track of which reviews tab to show in desktop viewport
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    };

    this.showOfProviderReviews = this.showOfProviderReviews.bind(this);
    this.showOfCustomerReviews = this.showOfCustomerReviews.bind(this);
  }

  showOfProviderReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    });
  }

  showOfCustomerReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_CUSTOMER,
    });
  }

  render() {
    const {
      scrollingDisabled,
      currentUser,
      user,
      userShowError,
      queryListingsError,
      listings,
      reviews,
      queryReviewsError,
      viewport,
      intl,
    } = this.props;
    const getLabels = (data, options) =>
      options.reduce((list, { key, label }) => {
        if (data && data.includes(key)) {
          list.push(label);
        }

        return list;
      }, []);
    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const profileUser = ensureUser(user);
    const isCurrentUser =
      ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
    const displayName = profileUser.attributes.profile.displayName;
    const bio = profileUser.attributes.profile.bio;
    const publicData =
      profileUser.attributes.profile &&
      profileUser.attributes.profile &&
      profileUser.attributes.profile.publicData;

    const companyProfile = publicData && publicData.companyProfile ? publicData.companyProfile : {};
    const isCompany = !isEmpty(omit(companyProfile, 'name'));

    const {
      name,
      website,
      address,
      classification,
      about,
      tagline,
      linkedIn,
      twitter,
      facebook,
      postName,
      postImage,
      postUrl,
      postShortDescription,
    } = companyProfile;

    const citiesOptions = findOptionsForSelectFilter('cities', config.custom.customFilters);
    const objectiveOptions = findOptionsForSelectFilter('objectives', config.custom.customFilters);
    const city = getLabels(publicData && publicData.city, citiesOptions);
    const hasCity = !!city.length;
    const company = publicData && publicData.company;
    const hasCompany = !!company;
    const interests = publicData && publicData.interests;
    const hasInterests = !!interests;
    const links = publicData && publicData.links;
    const hasLinks = !!links;
    const objectives = getLabels(publicData && publicData.objectives, objectiveOptions);
    const hasObjectives = !!objectives.length;
    const primaryOrganization = publicData && publicData.primaryOrganization;
    const secondaryOrganization = publicData && publicData.secondaryOrganization;
    const otherOrganizations = publicData && publicData.otherOrganizations;
    const hasOrganizations =
      !!primaryOrganization || !!secondaryOrganization || !!otherOrganizations;
    const title = publicData && publicData.title;
    const hasTitle = !!title;
    const hasBio = !!bio;
    const hasListings = listings.length > 0;
    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;

    const editLinkMobile = isCurrentUser ? (
      <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkMobile" />
      </NamedLink>
    ) : null;
    const editLinkDesktop = isCurrentUser ? (
      <NamedLink className={css.editLinkDesktop} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkDesktop" />
      </NamedLink>
    ) : null;

    const asideContent = (
      <div className={css.asideContent}>
        <AvatarLarge className={css.avatar} user={user} disableProfileLink />
        <h1 className={css.mobileHeading}>
          {displayName ? (
            <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: displayName }} />
          ) : null}
        </h1>
        {editLinkMobile}
        {editLinkDesktop}
      </div>
    );

    const listingsContainerClasses = classNames(css.listingsContainer, {
      [css.withBioMissingAbove]:
        !hasBio &&
        !hasCity &&
        !hasCompany &&
        !hasInterests &&
        !hasLinks &&
        !hasObjectives &&
        !hasOrganizations,
    });

    const reviewsError = (
      <p className={css.error}>
        <FormattedMessage id="ProfilePage.loadingReviewsFailed" />
      </p>
    );

    const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);

    const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

    const mobileReviews = (
      <div className={css.mobileReviews}>
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfProviderTitle"
            values={{ count: reviewsOfProvider.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviewsOfProvider} />
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfCustomerTitle"
            values={{ count: reviewsOfCustomer.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviewsOfCustomer} />
      </div>
    );

    const desktopReviewTabs = [
      {
        text: (
          <h3 className={css.desktopReviewsTitle}>
            <FormattedMessage
              id="ProfilePage.reviewsOfProviderTitle"
              values={{ count: reviewsOfProvider.length }}
            />
          </h3>
        ),
        selected: this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER,
        onClick: this.showOfProviderReviews,
      },
      {
        text: (
          <h3 className={css.desktopReviewsTitle}>
            <FormattedMessage
              id="ProfilePage.reviewsOfCustomerTitle"
              values={{ count: reviewsOfCustomer.length }}
            />
          </h3>
        ),
        selected: this.state.showReviewsType === REVIEW_TYPE_OF_CUSTOMER,
        onClick: this.showOfCustomerReviews,
      },
    ];

    const desktopReviews = (
      <div className={css.desktopReviews}>
        <ButtonTabNavHorizontal className={css.desktopReviewsTabNav} tabs={desktopReviewTabs} />

        {queryReviewsError ? reviewsError : null}

        {this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER ? (
          <Reviews reviews={reviewsOfProvider} />
        ) : (
          <Reviews reviews={reviewsOfCustomer} />
        )}
      </div>
    );

    const mainContent = (
      <div>
        <h1 className={css.desktopHeading}>
          {isCompany ? (
            <FormattedMessage id="ProfilePage.desktopCompanyHeading" values={{ name }} />
          ) : (
            <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: displayName }} />
          )}
        </h1>
        {isCompany && (
          <>
            {facebook && (
              <ExternalLink
                key="linkToFacebook"
                href={facebook}
                className={css.icon}
                title={'Facebook link'}
              >
                <IconSocialMediaFacebook />
              </ExternalLink>
            )}
            {twitter && (
              <ExternalLink
                key="linkToTwitter"
                href={twitter}
                className={css.icon}
                title={"Twitter link"}
              >
                <IconSocialMediaTwitter />
              </ExternalLink>
            )}
          </>
        )}
        <div className={css.userDetails}>
          {(hasCompany || hasTitle) && (
            <div>
              <img src={UserIcon} /> <span>{`${title || ''} ${company ? '@' + company : ''}`}</span>
            </div>
          )}
          {classification && (
            <div>
              <img src={UserIcon} /> <span>{classification}</span>
            </div>
          )}
          {hasCity && (
            <div>
              <img src={Location} /> <span>{city}</span>
            </div>
          )}
          {address && (
            <div>
              <img src={Location} /> <span>{address}</span>
            </div>
          )}
          {hasLinks && (
            <div>
              <img src={Links} />
              <span>{links.split(',').map(link => link)}</span>
            </div>
          )}
          {website && (
            <div>
              <img src={Links} />
              {website}
            </div>
          )}
        </div>
        {(hasOrganizations || hasObjectives) && (
          <div className={css.objectivesOrgs}>
            {hasInterests && (
              <div className={css.objectives}>
                <h2>My Interests</h2>
                {/* {objectives.map(objective => (
                    <div className={css.listItems}>{objective}</div>
                  ))} */}
                <p className={css.interests}>{interests}</p>
              </div>
            )}
            {hasOrganizations && (
              <div className={css.orgs}>
                <h2>Supported Orgs</h2>
                <div className={css.list}>
                  {`${primaryOrganization || ''} ${
                    secondaryOrganization ? ',' + secondaryOrganization : ''
                  } ${otherOrganizations ? ',' + otherOrganizations : ''}`
                    .split(',')
                    .map(org => (
                      <div className={css.listItems}>{org}</div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
        {(about || tagline) && (
          <div className={css.objectivesOrgs}>
            {about && (
              <div className={css.objectives}>
                <h2>About the company</h2>
                <p className={css.interests}>{about}</p>
              </div>
            )}
            {tagline && (
              <div className={css.orgs}>
                <h2>Tagline of the company</h2>
                <div className={css.list}>{tagline}</div>
              </div>
            )}
          </div>
        )}
        {hasListings && !isCompany ? (
          <div className={listingsContainerClasses}>
            <h2 className={css.listingsTitle}>
              <FormattedMessage
                id="ProfilePage.listingsTitle"
                values={{ count: listings.length }}
              />
            </h2>
            <ul className={css.listings}>
              {listings.map(l => (
                <li className={css.listing} key={l.id.uuid}>
                  <ListingCard listing={l} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {!isCompany && (isMobileLayout ? mobileReviews : desktopReviews)}
      </div>
    );

    let content;

    if (userShowError && userShowError.status === 404) {
      return <NotFoundPage />;
    } else if (userShowError || queryListingsError) {
      content = (
        <p className={css.error}>
          <FormattedMessage id="ProfilePage.loadingDataFailed" />
        </p>
      );
    } else {
      content = mainContent;
    }

    const schemaTitle = intl.formatMessage(
      {
        id: 'ProfilePage.schemaTitle',
      },
      {
        name: displayName,
        siteTitle: config.siteTitle,
      }
    );

    return (
      <Page
        scrollingDisabled={scrollingDisabled}
        title={schemaTitle}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ProfilePage',
          name: schemaTitle,
        }}
      >
        <LayoutSideNavigation>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfilePage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperSideNav className={css.aside}>{asideContent}</LayoutWrapperSideNav>
          <LayoutWrapperMain>{content}</LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSideNavigation>
      </Page>
    );
  }
}

ProfilePageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  queryListingsError: null,
  reviews: [],
  queryReviewsError: null,
};

const { bool, arrayOf, number, shape } = PropTypes;

ProfilePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUser: propTypes.currentUser,
  user: propTypes.user,
  userShowError: propTypes.error,
  queryListingsError: propTypes.error,
  listings: arrayOf(propTypes.listing).isRequired,
  reviews: arrayOf(propTypes.review),
  queryReviewsError: propTypes.error,

  // form withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    userId,
    userShowError,
    queryListingsError,
    userListingRefs,
    reviews,
    queryReviewsError,
  } = state.ProfilePage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user,
    userShowError,
    queryListingsError,
    listings,
    reviews,
    queryReviewsError,
  };
};

const ProfilePage = compose(
  connect(mapStateToProps),
  withViewport,
  injectIntl
)(ProfilePageComponent);

export default ProfilePage;
