import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import { ProfileSettingsForm } from '../../forms';
import { TopbarContainer } from '../../containers';
import config from '../../config';

import { updateProfile, uploadImage } from './ProfileSettingsPage.duck';
import css from './ProfileSettingsPage.module.css';
import { useLocation } from 'react-router-dom';
import { isEmpty, isNil, omit, omitBy } from 'lodash';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class ProfileSettingsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitAsOrg: "No",
    };
  }

  render() {
    const {
      currentUser,
      image,
      onImageUpload,
      onUpdateProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      intl,
    } = this.props;

    const citiesOptions = findOptionsForSelectFilter('cities', config.custom.customFilters);
    const objectiveOptions = findOptionsForSelectFilter('objectives', config.custom.customFilters);

    const options = [
      {
        key: 'yes',
        label: 'Yes',
      },
      {
        key: 'no',
        label: 'No',
      },
      {
        key: 'maybe',
        label: 'May be',
      },
    ];

    const handleSubmit = values => {
      const {
        firstName,
        lastName,
        city,
        objectives,
        interests,
        title,
        company,
        links,
        primaryOrganization,
        secondaryOrganization,
        otherOrganizations,
        willingToIntroduce,
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
        inviteNameFirst,
        inviteAddressFirst,
        inviteNameSecond,
        inviteAddressSecond,
        submitAsOrg: submitAsOrgFromForm,
        bio: rawBio,
      } = values;

      // Ensure that the optional bio is a string
      const bio = rawBio || '';
      const removeNullProfileValues = omitBy(
        {
          city,
          objectives,
          interests,
          title,
          company,
          links,
          primaryOrganization,
          secondaryOrganization,
          otherOrganizations,
          willingToIntroduce,
        },
        isNil
      );

      const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

      const inviteCodes = {};
      [inviteAddressFirst, inviteAddressSecond].filter(v => v).map((address, i) => {
        const id = uuidv4();
        inviteCodes[id] = {
          email: address,
          name: i === 0 ? inviteNameFirst : inviteNameSecond,
          id,
          used: false,
        };
      })
      

      const removeNullCompanyValues = omitBy(
        {
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
          inviteNameFirst,
          inviteAddressFirst,
          inviteNameSecond,
          inviteAddressSecond,
          name: firstName,
          inviteCodes,
        },
        isNil
      );

      const profile = {
        firstName: firstName.trim(),
        lastName: submitAsOrgFromForm !== "Yes" ?  lastName.trim() : " ",
        bio,
        publicData: {},
        publicData: {
          ...removeNullProfileValues,
          submitAsOrg: submitAsOrgFromForm,
          companyProfile: removeNullCompanyValues,
        },
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? { ...profile, profileImageId: uploadedImage.imageId }
          : profile;

      onUpdateProfile(updatedValues);
    };

    const user = ensureCurrentUser(currentUser);
    const { firstName, lastName, bio, publicData } = user.attributes.profile;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    const companyProfile = publicData && publicData.companyProfile ? publicData.companyProfile : {};

    const submitAsOrg = this.state.submitAsOrg === "Yes" || publicData && publicData.submitAsOrg === "Yes";

    const profileSettingsForm = user.id ? (
      <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{
          city: publicData.city,
          objectives: publicData.objectives,
          interests: publicData.interests,
          title: publicData.title,
          company: publicData.company,
          links: publicData.links,
          primaryOrganization: publicData.primaryOrganization,
          secondaryOrganization: publicData.secondaryOrganization,
          otherOrganizations: publicData.otherOrganizations,
          willingToIntroduce: publicData.willingToIntroduce,
          website: companyProfile.website,
          address: companyProfile.address,
          classification: companyProfile.classification,
          about: companyProfile.about,
          tagline: companyProfile.tagline,
          linkedIn: companyProfile.linkedIn,
          twitter: companyProfile.twitter,
          facebook: companyProfile.facebook,
          postName: companyProfile.postName,
          postImage: companyProfile.postImage,
          postUrl: companyProfile.postUrl,
          postShortDescription: companyProfile.postShortDescription,
          inviteNameFirst: companyProfile.inviteNameFirst,
          inviteAddressFirst: companyProfile.inviteAddressFirst,
          inviteNameSecond: companyProfile.inviteNameSecond,
          inviteAddressSecond: companyProfile.inviteAddressSecond,
          submitAsOrg: publicData.submitAsOrg,
          firstName,
          lastName,
          bio,
          profileImage: user.profileImage,
        }}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onSubmit={handleSubmit}
        cities={citiesOptions}
        objectiveOptions={objectiveOptions}
        options={options}
        profileImage={profileImage}
        submitAsOrg={submitAsOrg}
        changedSubmitAsOrg={(submitAsOrg) => this.setState(({ submitAsOrg }))}
      />
    ) : null;

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfileSettingsPage" />
            <UserNav selectedPageName="ProfileSettingsPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="ProfileSettingsPage.heading" />
                </h1>
                {user.id ? (
                  <NamedLink
                    className={css.profileLink}
                    name="ProfilePage"
                    params={{ id: user.id.uuid }}
                  >
                    <FormattedMessage id="ProfileSettingsPage.viewProfileLink" />
                  </NamedLink>
                ) : null}
              </div>
              {profileSettingsForm}
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

ProfileSettingsPageComponent.defaultProps = {
  currentUser: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

ProfileSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    currentUser,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const ProfileSettingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ProfileSettingsPageComponent);

export default ProfileSettingsPage;
