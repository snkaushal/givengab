import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import { findOptionsForSelectFilter } from '../../util/search';

import css from './ListingPage.module.css';

const SectionFeaturesMaybe = props => {
  const { options, publicData, filterConfig } = props;
  if (!publicData) {
    return null;
  }

  const orgOptions = findOptionsForSelectFilter('orgType', filterConfig);
  const industryOptions = findOptionsForSelectFilter('industry', filterConfig);

  const selectedIndustryOptions = publicData && publicData.industry ? publicData.industry : [];
  const selectedOrgOptions = publicData && publicData.orgType ? publicData.orgType : [];
  const selectedOptions = publicData && publicData.activityType ? publicData.activityType : [];

  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.activitiesTitle" />
      </h2>
      <PropertyGroup
        id="ListingPage.activity"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
      <br />
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.industriesTitle" />
      </h2>
      <PropertyGroup
        id="ListingPage.industry"
        options={industryOptions}
        selectedOptions={selectedIndustryOptions}
        twoColumns={true}
      />
      <br />
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.orgsTitle" />
      </h2>
      <PropertyGroup
        id="ListingPage.orgs"
        options={orgOptions}
        selectedOptions={selectedOrgOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionFeaturesMaybe;
