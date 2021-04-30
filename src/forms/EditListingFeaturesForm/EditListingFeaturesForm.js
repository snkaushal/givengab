import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form, FieldTextInput } from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';

import css from './EditListingFeaturesForm.module.css';

const EditListingFeaturesFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        disabled,
        ready,
        rootClassName,
        className,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        intl,
      } = formRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
        </p>
      ) : null;

      const giverTypes = findOptionsForSelectFilter('style', config.custom.filters);
      const activites = findOptionsForSelectFilter('activityType', config.custom.filters);
      const industries = findOptionsForSelectFilter('industry', config.custom.filters);
      const organizationTypes = findOptionsForSelectFilter('orgType', config.custom.filters);
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <CustomCategorySelectFieldMaybe
            id="style"
            name="style"
            options={giverTypes}
            intl={intl}
            label="Style of your give"
            requiredMessage="Style of your give is required"
            placeholder="Style of your give"
          />

          <FieldCheckboxGroup
            className={css.features}
            id="activityType"
            name="activityType"
            label="What is the type of activity?"
            options={activites}
          />
          <FieldTextInput
            id="otherActivities"
            name="otherActivities"
            className={css.otherTags}
            type="text"
            label="Other Activities"
            placeholder="Add any other activities separated by commas"
          />
          <FieldCheckboxGroup
            className={css.features}
            id="industry"
            name="industry"
            label="Which industry does this give belong to?"
            options={industries}
          />
          <FieldTextInput
            id="otherIndustries"
            name="otherIndustries"
            className={css.otherTags}
            type="text"
            label="Other industries"
            placeholder="Add any other activities separated by commas"
          />
          <FieldCheckboxGroup
            className={css.features}
            id="orgType"
            name="orgType"
            label="What is the donee organization type?"
            options={organizationTypes}
          />
          <FieldTextInput
            id="otherOrgType"
            name="otherOrgType"
            className={css.otherTags}
            type="text"
            label="Other organization types"
            placeholder="Add any other organization types separated by commas"
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

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingFeaturesFormComponent.propTypes = {
  rootClassName: string,
  intl: intlShape.isRequired,
  className: string,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

const EditListingFeaturesForm = EditListingFeaturesFormComponent;

export default compose(injectIntl)(EditListingFeaturesForm);
