import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingGrowCommunityForm } from '../../forms';
import config from '../../config';

import css from './EditListingGrowCommunityPanel.module.css';

const EditListingGrowCommunityPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingGrowCommunityPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingGrowCommunityPanel.createListingTitle" />
  );

  const encodeMails = str => {
    const buf = [];

    for (var i = str.length - 1; i >= 0; i--) {
      buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }

    return buf.join('');
  };

  const decode = str => str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));

  const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingGrowCommunityForm
        className={css.form}
        initialValues={{
          inviteMails: publicData.inviteMails ? decode(publicData.inviteMails) : undefined,
        }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { inviteMails } = values;
          const updateValues = {
            publicData: { inviteMails: encodeMails(inviteMails || "") },
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={categoryOptions}
      />
    </div>
  );
};

EditListingGrowCommunityPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingGrowCommunityPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingGrowCommunityPanel;
