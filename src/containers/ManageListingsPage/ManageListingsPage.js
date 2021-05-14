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
  checkInvitationCode,
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
      checkInvitationCode
    } = this.props;

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
                        checkInvitationCode(this.state.invitationCode, this.props.email).then((res) => {
                          if (res) {
                            this.setState({ isInvited: true });
                            this.setState({
                              successMessage:
                                'Welcome to Give&Gab. Thank you for being an integral member of the Reno/Tahoe community',
                            });
                            setTimeout(() => {
                              this.setState({ successMessage: '' });
                            }, 5000);
                            this.props.updateProfile({
                              publicData: {
                                hasBeenInvited: true,
                                invitationCode: this.state.invitationCode,
                              },
                            });
                          } else {
                            setTimeout(() => {
                              this.setState({ error: '' });
                            }, 3000);
                            this.setState({ error: 'Your invitation code is not valid' });
                          }
                        })
                        
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
  checkInvitationCode: (inviteCode, email) => dispatch(checkInvitationCode(inviteCode, email)),
});

const ManageListingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ManageListingsPageComponent);

export default ManageListingsPage;
