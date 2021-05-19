import React, { Component } from 'react';
import { func, bool, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import {
  Form,
  Avatar,
  Button,
  ImageFromFile,
  IconSpinner,
  FieldTextInput,
  FieldSelect,
  FieldCheckboxGroup,
} from '../../components';

import css from './ProfileSettingsForm.module.css';
import { isEmpty } from 'lodash';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

class ProfileSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = { uploadDelay: false };
    this.submittedValues = {};
  }

  componentDidUpdate(prevProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (prevProps.uploadInProgress && !this.props.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.uploadDelayTimeoutId);
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            intl,
            invalid,
            onImageUpload,
            pristine,
            profileImage,
            rootClassName,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
            form,
            values,
            cities,
            objectiveOptions,
            options,
            submitAsOrg,
            changedSubmitAsOrg,
          } = fieldRenderProps;

          const user = ensureCurrentUser(currentUser);

          const publicData = user &&
            user.attributes &&
            user.attributes.profile &&
            user.attributes.profile.publicData;

          const companyProfile =
          publicData &&
            user.attributes.profile.publicData.companyProfile;

          const inviteCodes = companyProfile && companyProfile.inviteCodes;

          const hasSubmitAsOrg = publicData.submitAsOrg;

          const { inviteNameFirst, inviteAddressFirst, inviteNameSecond, inviteAddressSecond } =
            companyProfile || {};

          const firstInvite =
            !isEmpty(inviteCodes) &&
            Object.values(inviteCodes).find(({ email }) => email === inviteAddressFirst);
          const firstInviteCode = !isEmpty(firstInvite) && firstInvite.id;

          const secondInvite =
            !isEmpty(inviteCodes) &&
            Object.values(inviteCodes).find(({ email }) => email === inviteAddressSecond);
          const secondInviteCode = !isEmpty(secondInvite) && secondInvite.id;

          // First name
          const firstNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameLabel',
          });
          const firstNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNamePlaceholder',
          });
          const firstNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameRequired',
          });
          const firstNameRequired = validators.required(firstNameRequiredMessage);

          // Last name
          const lastNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameLabel',
          });
          const lastNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNamePlaceholder',
          });
          const lastNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });
          const lastNameRequired = validators.required(lastNameRequiredMessage);

          // Company name
          const companyNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.companyNameLabel',
          });
          const companyNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.companyNamePlaceholder',
          });
          const companyNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.companyNameRequired',
          });

          const companyNameRequired = validators.required(companyNameRequiredMessage);

          const uploadingOverlay =
            uploadInProgress || this.state.uploadDelay ? (
              <div className={css.uploadingImageOverlay}>
                <IconSpinner />
              </div>
            ) : null;

          const hasUploadError = !!uploadImageError && !uploadInProgress;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
          const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
          const transientUser = { ...user, profileImage: transientUserProfileImage };

          // Ensure that file exists if imageFromFile is used
          const fileExists = !!profileImage.file;
          const fileUploadInProgress = uploadInProgress && fileExists;
          const delayAfterUpload = profileImage.imageId && this.state.uploadDelay;
          const imageFromFile =
            fileExists && (fileUploadInProgress || delayAfterUpload) ? (
              <ImageFromFile
                id={profileImage.id}
                className={errorClasses}
                rootClassName={css.uploadingImage}
                aspectRatioClassName={css.squareAspectRatio}
                file={profileImage.file}
              >
                {uploadingOverlay}
              </ImageFromFile>
            ) : null;

          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.
          const avatarClasses = classNames(errorClasses, css.avatar, {
            [css.avatarInvisible]: this.state.uploadDelay,
          });
          const avatarComponent =
            !fileUploadInProgress && profileImage.imageId ? (
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
            ) : null;

          const chooseAvatarLabel =
            profileImage.imageId || fileUploadInProgress ? (
              <div className={css.avatarContainer}>
                {imageFromFile}
                {avatarComponent}
                <div className={css.changeAvatar}>
                  <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
                </div>
              </div>
            ) : (
              <div className={css.avatarPlaceholder}>
                <div className={css.avatarPlaceholderText}>
                  <FormattedMessage id={submitAsOrg ? "ProfileSettingsForm.addYourLogo" :"ProfileSettingsForm.addYourProfilePicture"} />
                </div>
                <div className={css.avatarPlaceholderTextMobile}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
                </div>
              </div>
            );

          const submitError = updateProfileError ? (
            <div className={css.error}>
              <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
            </div>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid || pristine || pristineSinceLastSubmit || uploadInProgress || submitInProgress;

          const companyClassifications = [
            { label: 'Non profit', key: 'non-profit' },
            { label: 'For Profit', key: 'for-profit' },
            { label: 'Sole Proprietorship', key: 'sole-proprietorship' },
            { label: 'B Corporation', key: 'b-corporation' },
            { label: 'Other', key: 'other' },
          ];

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage
                    id={
                      submitAsOrg
                        ? 'ProfileSettingsForm.companyProfilePicture'
                        : 'ProfileSettingsForm.yourProfilePicture'
                    }
                  />
                </h3>
                <Field
                  accept={ACCEPT_IMAGES}
                  id="profileImage"
                  name="profileImage"
                  label={chooseAvatarLabel}
                  type="file"
                  form={null}
                  uploadImageError={uploadImageError}
                  disabled={uploadInProgress}
                >
                  {fieldProps => {
                    const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                    const { name, type } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`profileImage`, file);
                      form.blur(`profileImage`);
                      if (file != null) {
                        const tempId = `${file.name}_${Date.now()}`;
                        onImageUpload({ id: tempId, file });
                      }
                    };

                    let error = null;

                    if (isUploadImageOverLimitError(uploadImageError)) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                        </div>
                      );
                    } else if (uploadImageError) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                        </div>
                      );
                    }

                    return (
                      <div className={css.uploadAvatarWrapper}>
                        <label className={css.label} htmlFor={id}>
                          {label}
                        </label>
                        <input
                          accept={accept}
                          id={id}
                          name={name}
                          className={css.uploadAvatarInput}
                          disabled={disabled}
                          onChange={onChange}
                          type={type}
                        />
                        {error}
                      </div>
                    );
                  }}
                </Field>
                {!submitAsOrg && <div className={css.tip}>
                  <FormattedMessage id="ProfileSettingsForm.tip" />
                </div>}
                <div className={css.fileInfo}>
                  <FormattedMessage id="ProfileSettingsForm.fileInfo" />
                </div>
              </div>

              <FieldSelect
                name="submitAsOrg"
                id="submitAsOrg"
                label="Creating profile for an organization"
                onChange={(value) => { changedSubmitAsOrg(value) }}
                disabled={!!hasSubmitAsOrg}
              >
                <option key="No" value="No">
                  No
                </option>
                <option key="Yes" value="Yes">
                  Yes
                </option>
              </FieldSelect>

              {!(submitAsOrg) ? (
                <>
                  <div className={css.sectionContainer}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.yourName" />
                    </h3>
                    <div className={css.nameContainer}>
                      <FieldTextInput
                        className={css.firstName}
                        type="text"
                        id="firstName"
                        name="firstName"
                        label={firstNameLabel}
                        placeholder={firstNamePlaceholder}
                        validate={firstNameRequired}
                      />
                      <FieldTextInput
                        className={css.lastName}
                        type="text"
                        id="lastName"
                        name="lastName"
                        label={lastNameLabel}
                        placeholder={lastNamePlaceholder}
                        validate={lastNameRequired}
                      />
                    </div>
                  </div>
                  <div className={css.sectionContainer}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.about" />
                    </h3>
                    <p className={css.sectionDescription}>
                      Tell us a bit about your background, goals, and what you’re excited about.
                      This will be visible to the other Give&Gab members whose gives you would like
                      to sign up for and helps members get to know you before signing up for one of
                      your gives.
                    </p>
                    {/* TODO: Change the text here */}
                    <div className={css.sectionFields}>
                      <FieldSelect name="city" id="City" label="Which city are you in?">
                        <option disabled value="">
                          Select a city
                        </option>
                        {cities.map(c => (
                          <option key={c.key} value={c.key}>
                            {c.label}
                          </option>
                        ))}
                      </FieldSelect>
                    </div>
                    <div className={css.sectionFields}>
                      <FieldCheckboxGroup
                        id="objectives"
                        name="objectives"
                        options={objectiveOptions}
                        label="What are your objectives?"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="textarea"
                        id="interests"
                        name="interests"
                        label="What are you interested in?"
                        placeholder="Add any social, business, topical, and community based interests separated by a comma.  
                    These will be visible as tags on your profile to other Give&Gab members. 
                    (ex - children's mental health, brewing, mountain biking, AI, woodworking, local youth sports, 
                    real estate development, fine wines, crypto, social impact, data science, inclusion)"
                      />
                    </div>
                  </div>
                  <div className={css.sectionContainer}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.profession" />
                    </h3>
                    <p className={css.sectionDescription}>
                      Our community is comprised of people working in all kinds of industries. This
                      basic information will be visible to Give&Gab members. Tell us what you'd like
                      to show!
                    </p>
                    {/* TODO: Change the text here */}
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="title"
                        name="title"
                        label="Title"
                        placeholder="Please enter the title of your profession"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="company"
                        name="company"
                        label="Company"
                        placeholder="Please enter your comany"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="links"
                        name="links"
                        label="Social and/or Professional Profile links"
                        placeholder="Please add any LinkedIn, Instagram, Twitter, or other URL links that you would like 
                    people to be able to see. If adding more than one, please separate each URL with a comma."
                      />
                    </div>
                  </div>
                  <div className={classNames(css.sectionContainer, css.lastSection)}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.localOrgsToSupport" />
                    </h3>
                    <p className={css.sectionDescription}>
                      Give&Gab is designed to grow support for local businesses, organizations,
                      groups and people in Reno/Tahoe. In this section, find or suggest local
                      organizations that you would like to support with a part of the proceeds from
                      users that purchase any Gives you offer.
                    </p>
                    {/* TODO: Change the text here */}
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="primaryOrganization"
                        name="primaryOrganization"
                        label="Name of the primary organization"
                        placeholder="Please name one primary local organization, business, or group that you 
                    would like to see receive monetary support from Give&Gab members."
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="secondaryOrganization"
                        name="secondaryOrganization"
                        label="Name of the secondary organization"
                        placeholder="Please name one secondary local organization, business, or group that you 
                    would like to see receive monetary support from Give&Gab members."
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="textarea"
                        id="otherOrganizations"
                        name="otherOrganizations"
                        label="Name of any other organizations"
                        placeholder="Please add any other local organizations that you would 
                    like to see receive monetary support from Give&Gab members."
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldSelect
                        name="willingToIntroduce"
                        id="willingToIntroduce"
                        placeholder="Willing to introduce?"
                        label="For any of your indicated organizations that are not yet enlisted
                     on Give&Gab, would you consider making a brief, friendly introduction?"
                      >
                        <option disabled value="">
                          Select an option
                        </option>
                        {options.map(c => (
                          <option key={c.key} value={c.key}>
                            {c.label}
                          </option>
                        ))}
                      </FieldSelect>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={css.sectionContainer}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.yourCompanyName" />
                    </h3>
                    <div className={css.nameContainer}>
                      <FieldTextInput
                        className={css.firstName}
                        type="text"
                        id="firstName"
                        name="firstName"
                        label={companyNameLabel}
                        placeholder={companyNamePlaceholder}
                        validate={companyNameRequired}
                      />
                    </div>
                  </div>
                  <div className={css.sectionContainer}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.aboutCompany" />
                    </h3>
                    <p className={css.sectionDescription}>Tell us a bit about your company.</p>
                    {/* TODO: Change the text here */}
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="website"
                        name="website"
                        label="Website of your company"
                        placeholder="www.johndoe.com"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="address"
                        name="address"
                        label="Address of your company"
                        placeholder="#24, ABC, XYZ"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldSelect
                        name="classification"
                        id="classification"
                        label="What is your company classification?"
                      >
                        <option disabled value="">
                          Company classification
                        </option>
                        {companyClassifications.map(c => (
                          <option key={c.key} value={c.key}>
                            {c.label}
                          </option>
                        ))}
                      </FieldSelect>
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="textarea"
                        id="about"
                        name="about"
                        label="Please briefly describe your organization in 1-3 sentences."
                        placeholder="This will be visible to people on your company’s profile page."
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="tagline"
                        name="tagline"
                        label="Tagline of your company"
                        placeholder="We rule the world"
                      />
                    </div>
                  </div>
                  <div className={css.sectionContainer}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.socialMediaLinks" />
                    </h3>
                    <p className={css.sectionDescription}>
                      Share the social media links of your company
                    </p>
                    {/* TODO: Change the text here */}
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="linkedIn"
                        name="linkedIn"
                        label="LinkedIn Profile URL"
                        placeholder="www.linkedin.com/johndoe"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="twitter"
                        name="twitter"
                        label="Twitter Profile URL"
                        placeholder="www.twitter.com/johndoe"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="facebook"
                        name="facebook"
                        label="Facebook Profile URL"
                        placeholder="www.facebook.com/johndoe"
                      />
                    </div>
                  </div>
                  <div className={css.sectionContainer}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.upcomingEvents" />
                    </h3>
                    <p className={css.sectionDescription}>
                      Highlight any posts or upcoming events on your profile
                    </p>
                    {/* TODO: Change the text here */}
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="postName"
                        name="postName"
                        label="Post name"
                        placeholder="Post name"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="postImage"
                        name="postImage"
                        label="Post image URL"
                        placeholder="Post image URL"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="postUrl"
                        name="postUrl"
                        label="Post URL"
                        placeholder="Post URL"
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="postShortDescription"
                        name="postShortDescription"
                        label="Post short description"
                        placeholder="Post short description"
                      />
                    </div>
                  </div>
                  <div className={css.sectionContainer}>
                    <h3 className={css.sectionTitle}>
                      <FormattedMessage id="ProfileSettingsForm.inviteUsers" />
                    </h3>
                    <p className={css.sectionDescription}>
                      Invite members to Give&Gab that you would like to associate with your
                      organization
                    </p>
                    {/* TODO: Change the text here */}
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="inviteNameFirst"
                        name="inviteNameFirst"
                        label="#1 Name"
                        placeholder="Member name"
                        disabled={inviteNameFirst}
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="inviteAddressFirst"
                        name="inviteAddressFirst"
                        label="#1 Email address"
                        placeholder="Member email address"
                        disabled={inviteAddressFirst}
                      />
                    </div>

                    {firstInviteCode && (
                      <p>
                        <b>Invite code:</b> {firstInviteCode}
                      </p>
                    )}

                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="inviteNameSecond"
                        name="inviteNameSecond"
                        label="#2 Name"
                        placeholder="Member name"
                        disabled={inviteNameSecond}
                      />
                    </div>
                    <div className={css.sectionFields}>
                      <FieldTextInput
                        type="text"
                        id="inviteAddressSecond"
                        name="inviteAddressSecond"
                        label="#2 Email address"
                        placeholder="Member email address"
                        disabled={inviteAddressSecond}
                      />
                    </div>

                    {secondInviteCode && (
                      <p>
                        <b>Invite code:</b> {secondInviteCode}
                      </p>
                    )}
                  </div>
                </>
              )}
              {submitError}
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={pristineSinceLastSubmit}
              >
                <FormattedMessage id="ProfileSettingsForm.saveChanges" />
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

ProfileSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
  updateProfileReady: false,
};

ProfileSettingsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,
  submitAsOrg: bool,
  noProfileYet: bool,
  changedSubmitAsOrg: func,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ProfileSettingsForm = compose(injectIntl)(ProfileSettingsFormComponent);

ProfileSettingsForm.displayName = 'ProfileSettingsForm';

export default ProfileSettingsForm;
