import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.module.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: March 23, 2021</p>
      <h2>Information We Require</h2>
      <p>
        The following information is integral to platform performance and services. When you first
        sign up, we require and collect personal information such as your first name, last name,
        email address and date of birth in order to create and verify your account. When you create
        a profile, we require and collect your address, phone number and profile picture.
        Additionally, in order to facilitate and process payments, we may require you to provide
        certain financial information such as your bank account, PayPal account or credit card
        information. Information about communications through the Give&Gab platform may also be
        collected for fraud prevention, risk assessment, product development and research. We will
        not scan your communications to send third-party marketing materials to you.
      </p>
      <h2>Information You Provide</h2>
      <p>
        Additional information you provide is collected in order to enhance user experience on the
        platform. You may choose to provide extra information and media as part of your account,
        user profile or lead profiles, including your gender, preferred language, city or other
        personal descriptions such as your employment history and professional accomplishments. You
        may also choose to provide information when you favorite a profile, save an experience,
        conduct a search, respond to surveys, participate in promotions or use other features on the
        platform. If you have a profile, reviews from users will be published on your page with your
        consent and may be collected by Give&Gab.
      </p>
      <h2>Payment Information</h2>
      <p>
        In order to handle payments and comply with applicable law, we require certain financial
        information including your credit card information, bank account or PayPal account. If you
        plan on creating a profile, you may be required to provide identity-verification information
        as well such as a driver's license, passport or government-issued ID in order to confirm
        your identity and comply with applicable law. Upon booking a Give, payment information is
        collected regarding date and time, price and other transaction details.
      </p>
      <h2>Information Automatically Collected</h2>
      <p>
        The following information is automatically collected to provide users with the best platform
        experience. When you access Give&Gab, we collect geolocation information through your IP
        address or mobile device's GPS to provide relevant recommendations. Usage information is
        also automatically collected such as the profiles, experiences and pages you view, search
        inputs, bookings you have made and other actions on the platform.
      </p>
      <h2>Personal Information Security</h2>
      <p>
        We make reasonable efforts to secure and protect personal information by maintaining
        organizational, technical and administrative measures designed to minimize unauthorized
        access, loss, destruction or misuse. Your personal information is only accessible to a small
        number of developers, who need access to it in order to perform their duties.
      </p>
      <h2>Background-Check Information</h2>
      <p>
        Give&Gab may obtain public records pertaining to criminal convictions or sex offender
        registrations as permitted by applicable law, using your full name and date of birth to
        obtain such records. If you are asked to submit a photo of your ID and a separate photo of
        yourself for verification purposes, neither photo will be shared with anyone else who uses
        Give&Gab.
      </p>
      <h2>Privacy of Minors</h2>
      <p>
        Give&Gab is not directed toward individuals under the age of 18 and we request that they not
        provide personal information on the platform unless they have consulted and received
        permission from their legal guardian.
      </p>
      <h2>Information Available to the General Public</h2>
      <p>
        Give&Gab lets you publish information visible to the general public, including parts of your
        personal and profile pages such as your name, city, general location of the workplace
        (within a few blocks), calendar availability, public profile photo, uploaded media, reviews,
        ratings and any other information you choose to share.
      </p>
      <h2>How We Use Collected Information</h2>
      <p>
        We collect information provided by you to improve the platform in an effort to create trust
        between users, establish a safe method for lead and fulfill our legal obligations.
        Information collected allows access to the platform, customized results and communication on
        the platform including internal messaging, security alerts and customer service assistance.
        Customization from information you provide allows for individualized promotions, marketing
        and advertising based on your preferences and other information we think may be of interest
        to you. Collected information also may also be used to verify your identity and improve
        security in an effort to detect abuse, fraud, spam and other harmful or illicit activity.
      </p>
      <h2>How We Share Collected Information</h2>
      <p>
        When you book a Give, certain information about you is shared with the provider of the Give
        including your full name, age and your cancellation history. If asked to submit a government
        ID, information about whether or not your ID was successfully added may also be shared. As
        provider of Gives, when an Give is booked, information about you is shared with the Give&Gab
        including your full name, phone number, workplace address and other information you choose
        to share.
      </p>
      <h2>Cookie Policy</h2>
      <p>
        Give&Gab uses small data files known as cookies and other similar technologies to improve
        the platform. These files are transferred to your computer, enabling you to access the
        platform, to recognize your browser, understand your interactions, assist with tailored
        recommendations, enforce legal agreements, enable fraud detection and for purposes of
        support, research and product development. You can modify your browser settings to accept or
        decline cookies.
      </p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
