import { updatedEntities, denormalisedEntities } from '../../util/data';
import { storableError } from '../../util/errors';
import { parse } from '../../util/urlHelpers';
import config from '../../config';
const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');

const integrationSdk = sharetribeIntegrationSdk.createInstance({
  clientId: config.integrationClientId,
  clientSecret: config.integrationSecretId,
});

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 42 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 42;

// ================ Action types ================ //

export const FETCH_LISTINGS_REQUEST = 'app/ManageListingsPage/FETCH_LISTINGS_REQUEST';
export const FETCH_LISTINGS_SUCCESS = 'app/ManageListingsPage/FETCH_LISTINGS_SUCCESS';
export const FETCH_LISTINGS_ERROR = 'app/ManageListingsPage/FETCH_LISTINGS_ERROR';

export const OPEN_LISTING_REQUEST = 'app/ManageListingsPage/OPEN_LISTING_REQUEST';
export const OPEN_LISTING_SUCCESS = 'app/ManageListingsPage/OPEN_LISTING_SUCCESS';
export const OPEN_LISTING_ERROR = 'app/ManageListingsPage/OPEN_LISTING_ERROR';

export const CLOSE_LISTING_REQUEST = 'app/ManageListingsPage/CLOSE_LISTING_REQUEST';
export const CLOSE_LISTING_SUCCESS = 'app/ManageListingsPage/CLOSE_LISTING_SUCCESS';
export const CLOSE_LISTING_ERROR = 'app/ManageListingsPage/CLOSE_LISTING_ERROR';

export const ADD_OWN_ENTITIES = 'app/ManageListingsPage/ADD_OWN_ENTITIES';

// ================ Reducer ================ //

const initialState = {
  pagination: null,
  queryParams: null,
  queryInProgress: false,
  queryListingsError: null,
  currentPageResultIds: [],
  ownEntities: {},
  openingListing: null,
  openingListingError: null,
  closingListing: null,
  closingListingError: null,
};

const resultIds = data => data.data.map(l => l.id);

const merge = (state, sdkResponse) => {
  const apiResponse = sdkResponse.data;
  return {
    ...state,
    ownEntities: updatedEntities({ ...state.ownEntities }, apiResponse),
  };
};

const updateListingAttributes = (state, listingEntity) => {
  const oldListing = state.ownEntities.ownListing[listingEntity.id.uuid];
  const updatedListing = { ...oldListing, attributes: listingEntity.attributes };
  const ownListingEntities = {
    ...state.ownEntities.ownListing,
    [listingEntity.id.uuid]: updatedListing,
  };
  return {
    ...state,
    ownEntities: { ...state.ownEntities, ownListing: ownListingEntities },
  };
};

const manageListingsPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_LISTINGS_REQUEST:
      return {
        ...state,
        queryParams: payload.queryParams,
        queryInProgress: true,
        queryListingsError: null,
        currentPageResultIds: [],
      };
    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        currentPageResultIds: resultIds(payload.data),
        pagination: payload.data.meta,
        queryInProgress: false,
      };
    case FETCH_LISTINGS_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, queryInProgress: false, queryListingsError: payload };

    case OPEN_LISTING_REQUEST:
      return {
        ...state,
        openingListing: payload.listingId,
        openingListingError: null,
      };
    case OPEN_LISTING_SUCCESS:
      return {
        ...updateListingAttributes(state, payload.data),
        openingListing: null,
      };
    case OPEN_LISTING_ERROR: {
      // eslint-disable-next-line no-console
      console.error(payload);
      return {
        ...state,
        openingListing: null,
        openingListingError: {
          listingId: state.openingListing,
          error: payload,
        },
      };
    }

    case CLOSE_LISTING_REQUEST:
      return {
        ...state,
        closingListing: payload.listingId,
        closingListingError: null,
      };
    case CLOSE_LISTING_SUCCESS:
      return {
        ...updateListingAttributes(state, payload.data),
        closingListing: null,
      };
    case CLOSE_LISTING_ERROR: {
      // eslint-disable-next-line no-console
      console.error(payload);
      return {
        ...state,
        closingListing: null,
        closingListingError: {
          listingId: state.closingListing,
          error: payload,
        },
      };
    }

    case ADD_OWN_ENTITIES:
      return merge(state, payload);

    default:
      return state;
  }
};

export default manageListingsPageReducer;

// ================ Selectors ================ //

/**
 * Get the denormalised own listing entities with the given IDs
 *
 * @param {Object} state the full Redux store
 * @param {Array<UUID>} listingIds listing IDs to select from the store
 */
export const getOwnListingsById = (state, listingIds) => {
  const { ownEntities } = state.ManageListingsPage;
  const resources = listingIds.map(id => ({
    id,
    type: 'ownListing',
  }));
  const throwIfNotFound = false;
  return denormalisedEntities(ownEntities, resources, throwIfNotFound);
};

// ================ Action creators ================ //

// This works the same way as addMarketplaceEntities,
// but we don't want to mix own listings with searched listings
// (own listings data contains different info - e.g. exact location etc.)
export const addOwnEntities = sdkResponse => ({
  type: ADD_OWN_ENTITIES,
  payload: sdkResponse,
});

export const openListingRequest = listingId => ({
  type: OPEN_LISTING_REQUEST,
  payload: { listingId },
});

export const openListingSuccess = response => ({
  type: OPEN_LISTING_SUCCESS,
  payload: response.data,
});

export const openListingError = e => ({
  type: OPEN_LISTING_ERROR,
  error: true,
  payload: e,
});

export const closeListingRequest = listingId => ({
  type: CLOSE_LISTING_REQUEST,
  payload: { listingId },
});

export const closeListingSuccess = response => ({
  type: CLOSE_LISTING_SUCCESS,
  payload: response.data,
});

export const closeListingError = e => ({
  type: CLOSE_LISTING_ERROR,
  error: true,
  payload: e,
});

export const queryListingsRequest = queryParams => ({
  type: FETCH_LISTINGS_REQUEST,
  payload: { queryParams },
});

export const queryListingsSuccess = response => ({
  type: FETCH_LISTINGS_SUCCESS,
  payload: { data: response.data },
});

export const queryListingsError = e => ({
  type: FETCH_LISTINGS_ERROR,
  error: true,
  payload: e,
});

// Throwing error for new (loadData may need that info)
export const queryOwnListings = queryParams => (dispatch, getState, sdk) => {
  dispatch(queryListingsRequest(queryParams));

  const { perPage, ...rest } = queryParams;
  const params = { ...rest, per_page: perPage };

  return sdk.ownListings
    .query(params)
    .then(response => {
      dispatch(addOwnEntities(response));
      dispatch(queryListingsSuccess(response));
      return response;
    })
    .catch(e => {
      dispatch(queryListingsError(storableError(e)));
      throw e;
    });
};

export const closeListing = listingId => (dispatch, getState, sdk) => {
  dispatch(closeListingRequest(listingId));

  return sdk.ownListings
    .close({ id: listingId }, { expand: true })
    .then(response => {
      dispatch(closeListingSuccess(response));
      return response;
    })
    .catch(e => {
      dispatch(closeListingError(storableError(e)));
    });
};

export const checkInvitationCode = (inviteCode, email) => (dispatch, getState, sdk) => {
  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const newCodes = [
    '3b2ae7d8-e5e0-40e8-b8f6-79571202e26a',
    '1ee6b32c-d439-49c4-8a27-acf0f31df8c9',
    '44bd6c97-a84a-48fe-ac49-8f065b526985',
    '768175cf-52d5-49f5-b733-a34dac47aa62',
    '48d7368b-ad5a-42ca-8285-279a3b1df0d0',
    'ba9c1db3-e25b-4f5f-8ee3-0fc45fb2a0d3',
    'e23f1325-60bc-46b9-a40f-f54c12116341',
    'c21c9397-45a6-486c-bf90-c34315972611',
    '28742134-5a20-4c3f-8a82-a071226e94b2',
    '676bfc74-8d38-4ce7-8b19-ca86b7ec6858',
    '4fe60177-60d7-42f2-b537-ff8fe7497c3a',
    '32709c0f-feb1-48bb-9d58-bfe42509b6ca',
    'dd2d21fa-8dd4-422c-861f-8f45fab2457c',
    'ca8eef88-a5d7-4f9d-be20-6f1514f37c8c',
    '27b79f2d-cb5b-4406-a833-138d2bacba6c',
    '420bab23-7114-4d40-a1a2-d46995393146',
    '1315dbad-0781-4ac2-bc9b-16114f339e2a',
    'd28b2e0a-6c4c-4de0-a5d4-2b458e557d00',
    'd7ef36e1-e278-47f7-ac2f-3ec427eaec06',
    'dd6e8e03-fcd5-4a9d-a76a-304296c76464',
  ];

  if (newCodes.includes(inviteCode)) {
    return Promise.resolve((res) => true);
  }

  return integrationSdk.users.query({ 'fields.listing': 'publicData' }).then(res => {
    const users = res.data.data;
    const userWhoInvited = users.filter(({ attributes }) => {
      const inviteCodes =
        attributes.profile &&
        attributes.profile.publicData &&
        attributes.profile.publicData.companyProfile &&
        attributes.profile.publicData.companyProfile.inviteCodes;
      if (inviteCodes && inviteCodes[inviteCode] && inviteCodes[inviteCode].email === email) {
        return true;
      }

      return false;
    });

    if (userWhoInvited.length > 0) {
      return true;
    }

    return false;
  });
};

export const checkInvited = email => (dispatch, getState, sdk) => {
  return sdk.listings
    .query({ 'fields.listing': 'publicData' })
    .then(response => {
      const usersAllowed = response.data.data.map(
        ({
          attributes: {
            publicData: { inviteMails },
          },
        }) => inviteMails
      );

      const decode = str => str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
      const isInvited =
        !!usersAllowed.find(user => decode(user).includes(email)) ||
        ['skaushal@ioterra.com', 'ddelaveaga@ioterra.com', 'dprice@ioterra.com'].includes(email);

      return isInvited;
    })
    .catch(e => {});
};

export const updateProfile = actionPayload => {
  return (dispatch, getState, sdk) => {
    const queryParams = {
      expand: true,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    };

    return sdk.currentUser.updateProfile(actionPayload, queryParams);
  };
};

export const openListing = listingId => (dispatch, getState, sdk) => {
  dispatch(openListingRequest(listingId));

  return sdk.ownListings
    .open({ id: listingId }, { expand: true })
    .then(response => {
      dispatch(openListingSuccess(response));
      return response;
    })
    .catch(e => {
      dispatch(openListingError(storableError(e)));
    });
};

export const loadData = (params, search) => {
  const queryParams = parse(search);
  const page = queryParams.page || 1;
  return queryOwnListings({
    ...queryParams,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['images'],
    'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
    'limit.images': 1,
  });
};
