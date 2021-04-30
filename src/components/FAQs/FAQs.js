import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './FAQs.module.css';

const FAQs = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: March 23, 2021</p>
      <h2>How does Give&Gab support local organizations?</h2>
      <p>
        <ul className={css.list}>
          <li>
            Each Give that is purchased on Give&Gab results in a donation to a local organization.
            The Organization that is being supported is listed on the Give information page.
          </li>
          <li>
            Both nonprofits and for-profit organizations can be beneficiaries of purchased Gives.
          </li>
          <li>
            Give&Gab charges a platform fee of 5% for non-profit donations and 15% for for-profit
            donations.
          </li>
          <li>
            Sometimes 100% of the Give proceeds go to the organization, other times the Member
            retains some of the Give proceeds to cover their time or other direct costs they incur
            in the Give. Still other times, the Giver will match the purchase price for the Give
            yielding 200% (or more) of the Give being donated to the organization.
          </li>
        </ul>
      </p>
      <h2>What is the difference between a Give&Gab Member and a Give&Gab User?</h2>
      <p>
        <ul className={css.list}>
          <li>
            A Give&Gab User is anyone who has created a profile in the Give&Gab ecosystem and is
            therefore eligible to purchase Gives from Members. Anyone can sign up to be a Give&Gab
            User. A Give&Gab Member is someone who offers Gives to Users. A Member’s Gives can be
            found on their profile. It is invite-only to become a Give&Gab Member.
          </li>
        </ul>
      </p>
      <h2>How do I become a Give&Gab User?</h2>
      <p>
        <ul className={css.list}>
          <li>
            Make an account on Give&Gab. You will fill out a short set of questions to construct
            your profile and identify your areas of interest.
          </li>
        </ul>
      </p>
      <h2>How do I become a Give&Gab Member?</h2>
      <p>
        <ul className={css.list}>
          <li>
            Becoming a Give&Gab Member is invite-only. Only existing Give&Gab Members can invite you
            to become a Member. However, they only have a limited number of invitations at any given
            time, so you may need to wait. You can request to become a Member in the Give&Gab
            community by submitting your information here.
          </li>
          <li>
            After you’ve received your invitation you will need to create a Profile describing
            yourself and your interests. You will also need to create your minimum of 3 Gives and
            upload them to your profile. Finally, you will need to select at least 2 local
            organizations you wish to support with your Gives.
          </li>
        </ul>
      </p>
      <h2>Are Gives in-person or virtual?</h2>
      <p>
        <ul className={css.list}>
          <li>
            This depends on the particular Give. Some are in-person, such as going out for coffee or
            a meal together. Others are virtual and you will dial-in to attend. The details of the
            Give and whether it is in-person or virtual are listed on each individual Give page.
          </li>
        </ul>
      </p>
      <h2>I’ve purchased a Give, but will no longer be able to attend, what do I do?</h2>
      <p>
        <ul className={css.list}>
          <li>
            Give purchases are fully-refundable within 24 hours of your purchase, unless the booking
            was made less than 24 hours prior to the Give. If you are outside of this window, notify
            the Give&Gab Member you purchased from as soon as you know you will no longer be able to
            attend. On a case-by-case basis, the Give&Gab Member may be able to change the date of
            the Give or to swap your Give to another user.
          </li>
        </ul>
      </p>
      <h2>
        I represent a location non-profit organization and wish to list on Give&Gab, how do I do it?
      </h2>
      <p>
        <ul className={css.list}>
          <li>
            You can register your organization on Give&Gab by creating an organization profile.
            Give&Gab Members will then be able to see and select your orgnaization to be the
            beneficiary of their Gives.
          </li>
        </ul>
      </p>
      <h2>
        I’m a Give&Gab Member and would like to add a local org that is not currently listed, how do
        I do it?
      </h2>
      <p>
        <ul className={css.list}>
          <li>
            The local org will need to create an organization profile on Give&Gab. The fastest way
            to do this is to introduce the Give&Gab team to a contact of yours at the org you wish
            to support. We will then work with the org to set up a profile for them such that they
            can begin receiving donations from your Gives.
          </li>
        </ul>
      </p>
    </div>
  );
};

FAQs.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

FAQs.propTypes = {
  rootClassName: string,
  className: string,
};

export default FAQs;
