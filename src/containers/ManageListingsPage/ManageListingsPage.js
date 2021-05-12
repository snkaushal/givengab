import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  ManageListingCard,
  Page,
  PaginationLinks,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
  MenuItem,
  Menu,
  MenuLabel,
  MenuContent,
} from '../../components';
import { TopbarContainer } from '../../containers';

import {
  closeListing,
  openListing,
  getOwnListingsById,
  checkInvited,
  updateProfile,
} from './ManageListingsPage.duck';
import css from './ManageListingsPage.module.css';

export class ManageListingsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listingMenuOpen: null,
      isInvited: null,
      invitationCode: '',
      error: '',
      successMessage: '',
    };
    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  onToggleMenu(listing) {
    this.setState({ listingMenuOpen: listing });
  }

  componentDidMount() {
    this.props.checkIfInvited(this.props.email).then(res => {
      this.setState({ isInvited: this.props.isAlreadyInvited || res });
    });
  }

  render() {
    const {
      closingListing,
      closingListingError,
      listings,
      onCloseListing,
      onOpenListing,
      openingListing,
      openingListingError,
      pagination,
      queryInProgress,
      queryListingsError,
      queryParams,
      scrollingDisabled,
      intl,
    } = this.props;

    const invitationCodes = [
      '3b4ef84c-76a4-4ad7-b435-550b267299b8',
      '6ae1c8d9-6a30-4fc2-b49b-9072c451a176',
      '8d18b618-865c-4f8d-9956-0651e59b2e49',
      '25071067-9de5-453e-b087-1911ba913df3',
      '12a2d0f2-9251-4ae3-9343-b391954161ac',
      'bd9099cc-b28c-4964-928a-3a33015057e4',
      '59080364-946b-46a5-81e7-b4339a7443e3',
      '2686d5f9-c897-49e0-987f-d015aa339434',
      'cb364155-6bf7-4d2e-b6c2-d9ae476b49a2',
      '52323d0c-4eae-4ef1-b887-ebd6b290390c',
      '3230536b-ceca-4534-9dae-8534d1286529',
      '1d8dc0b4-432e-4343-997a-e54f40dba3ac',
      '5712d2d8-cea9-402f-9cb5-29d316c31c33',
      'cc27d6dd-737a-43d8-baff-5081b41346c6',
      '17d3e357-b3fb-4313-8009-d1e22de8e604',
    ];

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const listingsAreLoaded = !queryInProgress && hasPaginationInfo;

    const loadingResults = (
      <h2>
        <FormattedMessage id="ManageListingsPage.loadingOwnListings" />
      </h2>
    );

    const queryError = (
      <h2 className={css.error}>
        <FormattedMessage id="ManageListingsPage.queryError" />
      </h2>
    );

    const noResults =
      listingsAreLoaded && pagination.totalItems === 0 ? (
        <div className={css.title}>
          <h1>
            <FormattedMessage id="ManageListingsPage.noResults" />
          </h1>
          {this.state.isInvited !== null &&
            (this.state.isInvited ? (
              <>
                <NamedLink className={css.createListingLink} name="NewListingPage">
                  <span>
                    <FormattedMessage id="TopbarDesktop.createListing" />
                  </span>
                  {this.state.successMessage && (
                    <p className={css.success}>{this.state.successMessage}</p>
                  )}
                </NamedLink>
              </>
            ) : (
              <div>
                <div className={css.inviteInput}>
                  Please enter your Give&Gab member invitation code here
                  <input
                    onChange={e => this.setState({ invitationCode: e.target.value })}
                    value={this.state.invitationCode}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        if (invitationCodes.includes(this.state.invitationCode)) {
                          this.props.updateProfile({
                            publicData: {
                              hasBeenInvited: true,
                              invitationCode: this.state.invitationCode,
                            },
                          });
                          this.setState({ isInvited: true });
                          this.setState({
                            successMessage:
                              'Welcome to Give&Gab. Thank you for being an integral member of the Reno/Tahoe community',
                          });
                          setTimeout(() => {
                            this.setState({ successMessage: '' });
                          }, 3000);
                        } else {
                          setTimeout(() => {
                            this.setState({ error: '' });
                          }, 3000);
                          this.setState({ error: 'Your invitation code is not valid' });
                        }
                      }
                    }}
                  />
                </div>
                {this.state.error && <p className={css.error}>{this.state.error}</p>}
                <Menu>
                  <MenuLabel
                    className={css.profileMenuLabel}
                    isOpenClassName={css.profileMenuIsOpen}
                  >
                    How do I become a Give&Gab Member?
                  </MenuLabel>
                  <MenuContent className={css.profileMenuContent}>
                    <MenuItem key="tooltip">
                      Becoming a Give&Gab Member is invite-only. Only existing Give&Gab Members can
                      invite you to become a Member. However, they only have a limited number of
                      invitations at any given time, so you may need to wait. You can request to
                      become a Member in the Give&Gab community by submitting your information here.
                      After you’ve received your invitation you will need to create a Profile
                      describing yourself and your interests. You will also need to create your
                      minimum of 3 Gives and upload them to your profile. Finally, you will need to
                      select at least 2 local organizations you wish to support with your Gives.
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </div>
            ))}
        </div>
      ) : null;

    const heading =
      listingsAreLoaded && pagination.totalItems > 0 ? (
        <div className={css.title}>
          <h1>
            <FormattedMessage
              id="ManageListingsPage.youHaveListings"
              values={{ count: pagination.totalItems }}
            />
          </h1>
          {this.state.isInvited && (
            <NamedLink className={css.createListingLink} name="NewListingPage">
              <span className={css.createListing}>
                <FormattedMessage id="TopbarDesktop.createListing" />
              </span>
            </NamedLink>
          )}
        </div>
      ) : (
        noResults
      );

    const page = queryParams ? queryParams.page : 1;
    const paginationLinks =
      listingsAreLoaded && pagination && pagination.totalPages > 1 ? (
        <PaginationLinks
          className={css.pagination}
          pageName="ManageListingsPage"
          pageSearchParams={{ page }}
          pagination={pagination}
        />
      ) : null;

    const listingMenuOpen = this.state.listingMenuOpen;
    const closingErrorListingId = !!closingListingError && closingListingError.listingId;
    const openingErrorListingId = !!openingListingError && openingListingError.listingId;

    const title = intl.formatMessage({ id: 'ManageListingsPage.title' });

    const panelWidth = 62.5;
    // Render hints for responsive image
    const renderSizes = [
      `(max-width: 767px) 100vw`,
      `(max-width: 1920px) ${panelWidth / 2}vw`,
      `${panelWidth / 3}vw`,
    ].join(', ');

    return (
      <Page title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ManageListingsPage" />
            <UserNav selectedPageName="ManageListingsPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            {queryInProgress ? loadingResults : null}
            {queryListingsError ? queryError : null}
            <div className={css.listingPanel}>
              {heading}
              <div className={css.listingCards}>
                {listings.map(l => (
                  <ManageListingCard
                    className={css.listingCard}
                    key={l.id.uuid}
                    listing={l}
                    isMenuOpen={!!listingMenuOpen && listingMenuOpen.id.uuid === l.id.uuid}
                    actionsInProgressListingId={openingListing || closingListing}
                    onToggleMenu={this.onToggleMenu}
                    onCloseListing={onCloseListing}
                    onOpenListing={onOpenListing}
                    hasOpeningError={openingErrorListingId.uuid === l.id.uuid}
                    hasClosingError={closingErrorListingId.uuid === l.id.uuid}
                    renderSizes={renderSizes}
                  />
                ))}
              </div>
              {paginationLinks}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ManageListingsPageComponent.defaultProps = {
  listings: [],
  pagination: null,
  queryListingsError: null,
  queryParams: null,
  closingListing: null,
  closingListingError: null,
  openingListing: null,
  openingListingError: null,
};

const { arrayOf, bool, func, object, shape, string } = PropTypes;

ManageListingsPageComponent.propTypes = {
  closingListing: shape({ uuid: string.isRequired }),
  closingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  listings: arrayOf(propTypes.ownListing),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  openingListing: shape({ uuid: string.isRequired }),
  openingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  pagination: propTypes.pagination,
  queryInProgress: bool.isRequired,
  queryListingsError: propTypes.error,
  queryParams: object,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  } = state.ManageListingsPage;
  const { currentUser } = state.user;
  const email = currentUser && currentUser.attributes.email;
  const isAlreadyInvited =
    currentUser &&
    currentUser.attributes &&
    currentUser.attributes.profile &&
    currentUser.attributes.profile.publicData &&
    currentUser.attributes.profile.publicData.hasBeenInvited;
  const listings = getOwnListingsById(state, currentPageResultIds);
  return {
    currentPageResultIds,
    listings,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    scrollingDisabled: isScrollingDisabled(state),
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
    email,
    isAlreadyInvited,
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseListing: listingId => dispatch(closeListing(listingId)),
  onOpenListing: listingId => dispatch(openListing(listingId)),
  checkIfInvited: email => dispatch(checkInvited(email)),
  updateProfile: payload => dispatch(updateProfile(payload)),
});

const ManageListingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ManageListingsPageComponent);

export default ManageListingsPage;
