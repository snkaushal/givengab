import React from 'react';
import {  bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { required } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';
import config from '../../config';

import css from './EditListingCustomAvailabilitiyForm.module.css';

const EditListingCustomAvailabilityPanel = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const daysAvailableOptions = new Array(31).fill(1).map((item, i) => ({
        key: item + i,
        label: item + i
      }));

      const supportedOrgOptions = findOptionsForSelectFilter('supportedOrg', config.custom.customFilters);

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <CustomCategorySelectFieldMaybe
            id="daysAvailable"
            name="daysAvailable"
            options={daysAvailableOptions}
            intl={intl}
            label="Number of gives per month"
            requiredMessage="Number of gives per month is required"
            placeholder="How many of these gives will you make available per month"
          />

          <FieldTextInput
            id="dayTimeAvailable"
            name="dayTimeAvailable"
            className={css.description}
            label="What day and time are you generally most available for this give? (Exact times will be set with user when give is purchased)"
            placeholder="eg. Mon-Fri, 6 - 9 pm"
            validate={required('This field is required')}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingCustomAvailabilityPanel.defaultProps = { className: null, fetchErrors: null };

EditListingCustomAvailabilityPanel.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingCustomAvailabilityPanel);
