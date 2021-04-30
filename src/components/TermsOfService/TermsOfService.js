import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './TermsOfService.module.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  const privacyLink = text => <NamedLink name="PrivacyPolicyPage">{text}</NamedLink>;

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: March 23, 2021</p>
      <h2>Introduction</h2>
      <p>
        Thank you for using Give&Gab a brand of Ioterra, Inc. Please read the{' '}
        {privacyLink('Privacy Policy')} and the terms and conditions ("Terms of Service") before
        registering on <a href="https://www.givengab.com">givengab.com</a> (the “Site”). These Terms
        of Service and Privacy Policy apply between Give&Gab and any person who accesses, uses or
        interacts with the Site or registers for the purpose of either receiver or providing
        experiences (the "User"), establishing the responsibilities, expectations and obligations
        that every User assumes upon accessing the Site. By using the Site, even without
        registering, you agree that you are subject to all the provisions of the Terms of Service
        and Privacy Policy.
      </p>
      <h2>Purpose of the site</h2>
      <p>
        Give&Gab is an online platform that helps individuals (“Follows”) find, learn frome, and
        build relationships with experts by purchasing experiences “Gives” provided by these
        experts.. Give&Gab allows for the creation of profiles, the posting of available Gives, and
        the ability for providers of the Gives to donate their proceeds to organizations.
      </p>
      <h2>Registration</h2>
      <p>
        Users are required to register through <a href="https://www.givengab.com">givengab.com</a>{' '}
        to use Give&Gab’s services. Registration is free and the personal information you provide is
        used to create a public user profile with information about your background, location, a
        profile photo and a list of your verified information (your "User Profile"). The data and
        information that you provide must be accurate and in no way mislead other Users. You will
        have access to your account with the email address and password provided upon registration.
        You should notify Give&Gab immediately of any unauthorized access of your account,
        unauthorized use of your password by a third party or if you have lost or forgotten their
        password.
      </p>
      <h2>Deactivation</h2>
      <p>
        You may, at any time, deactivate your account, which will remove from the Site personal data
        such as your User Profile. Some content, however, such as your reviews or ratings of another
        User may remain visible to the public.
        <br />
        <br />
        Give&Gab reserves the right, at any time, to deactivate Users from the Site due to
        non-compliance with the conditions of these Terms of Service, communicating the cancellation
        of the account via email.
      </p>
      <h2>Services provided</h2>
      <p>
        Give&Gab allows for the creation of User Profiles by every User, the creation and scheduling
        of individual Gives through the website (the "Service" or "Services"). In particular,
        Give&Gab provides:
        <ul className={css.list}>
          <li>Free search: you can search the Site for Gives offered by other Users.</li>
          <li>
            Free promotion: you are provided virtual spaces to publicize your Profile and Gives.
          </li>
          <li>
            Donations: you can donate proceeds received from your Gives to organizations listed on
            Give&Gab
          </li>
          <li>
            Licensed use of the software: you are licensed to use the Site's software to create and
            schedule Gives, perform evaluations, purchase Gives, receive payment providing Gives,
            donating proceeds from your Gives to other organizations, or any other feature provided
            by the Site.
          </li>
        </ul>
        Give&Gab is (a) NOT a provider of educational services; (b) NOT responsible for the services
        provided by Users; (c) NOT responsible for the accuracy of the information provided or
        registered by Users; and (d) DOES NOT have any employment relationship with the Users
        offering Gives on the Site.
        <br />
        <br />
        Gve&Gab monitors the actions of Users and can, if needed, moderate any content on the Site
        that may be in violation of these Terms of Service, as well as suspend or block the account
        of any User who is found to have violated these Terms of Service.
      </p>
      <h2>Age Restrictions</h2>
      <p>
        You must be at least 18 years of age to register on the Site. The parents, guardians or
        legal representatives of a minor who uses the site are responsible for all actions of that
        minor, including visiting the Site, causing damages to third parties during apprenticing
        experiences, engaging in acts prohibited by law or violations of these Terms of Service.
        Give&Gab is not responsible for the control of access or misuse of the Site by underage
        Users. Give&Gab reserves the right to refuse a registration if these conditions are not met.
      </p>
      <h2>User Profiles</h2>
      <p>
        You are allowed to create and maintain only ONE User Profile on the Site. If you are invited
        to be a Giver on the Site, you can create a Giver Profile which contains all of the relevant
        information other Users will need to make an informed decision about purchasing your Give ,
        including a description about the experience, your expertise, work experience, media,
        restrictions and other useful data.
      </p>
      <h2>Giver Profile</h2>
      <p>
        To create a Giver Profile, you must be at least 18 years of age, provide a verified email
        address and phone number and pass a background check that includes, but is not limited to,
        the National Sex Offender registry (NSOPW), Office of Foreign Assets Control (OFAC)
        terrorist watch list and state and county public records pertaining to criminal convictions.
        <br />
        <br />
        All Giver Profiles, once published, must meet a certain standard of quality, and falling
        short of that, the Giver Profile and the associated User Profile may be removed. When you
        create a Giver Profile, you must, where applicable, fully inform guests about (a) any risks
        associated with the Give, (b) any requirements for participation, including but not limited
        to minimum age, skill level, fitness or other necessary conditions and (c) anything else
        they may need to know to safely engage in the Give you are providing, such as dress code,
        equipment needs, special certifications or licenses, etc.
        <br />
        <br />
        Give&Gab reserves the right to modify or remove any profiles that do not conform to the
        purpose of the site at its discretion, without the User being notified, and without having
        to provide justification. Give&Gab further reserves the right to suspend or terminate the
        Giver Profiles of Users who repeatedly receive negative ratings or reviews by other Users.
        <br />
        <br />
        After creating your Giver Profile, you will be able to add particular Gives and choose to
        make them public or private. By choosing private, you agree that only the individual who
        booked the Give through Give&Gab may attend. You further agree that additional guests for
        private experiences must be added through the platform by the person who booked the
        experience.
      </p>
      <h2>Responsibility</h2>
      <p>
        You are responsible for the experiences you list and provide on your Giver Profile. Give&Gab
        itself is a service-based platform, who’s responsibilities are limited to providing a
        listing for opportunities and does NOT operate, manage, provide or control any Give
        experiences. Consequently, you are responsible for gathering all equipment required for your
        Give and responsible to confirm that all equipment is in good working order, adhering to all
        laws regarding safety, inspection and operational use. Except as otherwise mandated by law,
        you assume all risk of damage or loss to your equipment.
      </p>
      <h2>Compliance</h2>
      <p>
        Before allowing someone to participate in your Give, you agree that (a) you understand and
        comply with all laws that may apply to your type of work or profession, (b) you have
        acquired any necessary licenses, permits or registrations before your participant arries and
        (c) your Give will not breach any contract you may have with a third party. You further
        agree for the Give experience to take place in person with you and not to use a third party
        in your place.
        <br />
        <br />
        The scheduling of Gives must be made through the Site. If a User contacts you through your
        GiverProfile to request a time outside of your calendar, you are required to schedule
        through Give&Gab.
        <br />
        <br />
        Payments for an experience must occur prior to the experience via the platform with a credit
        card or PayPal. Paying through the platform is the only way to guarantee the protection of
        financial information, enforce the provisions of the cancellation policy and allow for
        mediation by Give&Gab in the event of a conflict. Give&Gab utilizes strictly PCI Level 1
        certified payment processors to handle your financial information. Users who request or
        distribute money outside the platform for apprenticing services may have their accounts
        suspended or terminated.
      </p>
      <h2>Contracting Services</h2>
      <p>
        Before choosing to contract the Gives of other Users, you should evaluate their Giver
        Profiles and pay attention to:
        <ul className={css.list}>
          <li>(a) their training</li>
          <li>(b) the ratings and reviews posted by other Users</li>
          <li>(c) the price of the Givers</li>
          <li>(d) the descriptions of the individual Gives</li>
          <li>(e) the time and duration of the Gives</li>
        </ul>
        Contracting the Gives of another User is done directly by you, independently, without any
        intervention of Give&Gab.
      </p>
      <h2>Reviews</h2>
      <p>
        Give&Gab provides a system for you to evaluate completed experiences, respecting the right
        to freedom of opinion. Completed evaluations are publicly published to a User's Giver
        Profile. These ratings, reviews or evaluations do not reflect the opinion of the Site. Only
        Gives selected and purchased through Give&Gab may be evaluated by Users.
      </p>
      <h2>Assumption of Risk</h2>
      <p>
        You agree that by using Give&Gab to provide or contract services, you do so at your own
        risk. Give&Gab is NOT responsible for the accuracy, completeness, adequacy, effectiveness,
        reliability or usefulness of the information or any other content provided on the Site by
        its Users. Consequently, you are advised to verify the accuracy of the information obtained
        and, if necessary, to take appropriate measures to protect yourself against any damages.
        <br />
        <br />
        You further acknowledge that Users who provide Gives are independent contractors who operate
        a separate and distinct business from Give&Gab. As such, Give&Gab does not control the
        manner or method of services provided and is NOT responsible for the quality of the
        experiences or other attributes regarding what is offered.
      </p>
      <h2>Independent Contractor</h2>
      <p>
        Give&Gab collects and publishes information from a variety of Users and DOES NOT act as a
        consulting service or participant in any business that may be conducted between Users. If
        you provide Gives, you are considered an independent contractor, and nothing in these Terms
        of Service, or any agreement, is intended to establish a partnership, agency, employment or
        similar relationship between you and Give&Gab. You are solely responsible for all tax
        returns and payments required to be filed with, or made to, any state or local tax authority
        with respect to payment from other Users. No part of your payout will be subject to
        withholding by Give&Gab for the payment of any social security or any other employee payroll
        taxes.
        <br />
        <br />
        Give&Gab does not participate or interfere, in any way, in the negotiation or execution of
        any transactions between Users. Give&Gab shall not be liable for transactions between Users
        or a User and a third party or be held responsible for any losses or damages incurred in
        connection with these transactions.
      </p>
      <h2>Cancellation and Absence Policy</h2>
      <p>
        You have 24 hours after booking an experience to cancel for a full refund unless you book
        within 24 hours of the experience's scheduled start time. Any cancellations outside the
        24-hour window or made within 24 hours of the experience's scheduled start time will be
        charged at the full rate without refund. However, you can contact Give&Gab to request a
        refund for extenuating circumstances. Give&Gab may distribute a partial or full refund on a
        case-by-case basis. If you miss your experience, you will not be entitled to reimbursement
        of any amount.
        <br />
        <br />
        In the event of an open dispute or complaint against another User, you must contact Give&Gab
        within 5 (five) days of the completed Give experience to receive a refund. While mediating
        the conflict, Give&Gab will block payment to User providing the Giveuntil the issue has been
        resolved.
        <br />
        <br />
        After completing a Give, you may request a refund via email with a full explanation
        justifying the request. Give&Gab reserves the right to deny the request.
      </p>
      <h2>User-created content</h2>
      <p>
        Within your profiles, you may create or include personal information, evaluations, comments,
        messages, photos, video, questions and answers. Anyone can view the content made available
        by you on the Site.
        <br />
        <br />
        You, and NOT Give&Gab, are solely responsible for the images, sounds, videos, materials and
        content on your profiles. You agree that you (a) have the rights, licenses, authorizations
        or permissions necessary to publish that information on the Site and (b) publishing that
        information does not infringe or violate the rights of any third party. Additionally, you
        are solely responsible for all content sent, disclosed or transmitted by email or made
        publicly available.
      </p>
      <h2>Prohibited practices</h2>
      <p>
        You are aware and agree that, in access and use of the Site, it is strictly prohibited to:
        <ul className={css.list}>
          <li>
            Distribute, modify, sell or otherwise exploit Give&Gab’s Services, the data and
            information related to it or use it for the creation or supply of other products or
            services other than Give experiences.
          </li>
          <li>
            Perform or engage in acts that (a) violate the law, the rights of others, privacy or
            morality; (b) infringe upon patents, trademarks, trade secrets, intellectual property or
            copyright; (c) encourage the practice of illicit conduct or acts of discrimination,
            whether on the basis of sex, race, religion, beliefs, age or any other condition; (d)
            make available or allow access to illegal, violent, pornographic, degrading messages,
            products or services; (e) induce or incite dangerous or harmful practices; (f) mislead
            others through false, ambiguous, inaccurate or exaggerated information; (g) transmit
            illegal, harmful, harassing, threatening, abusive, tortuous, defamatory, vulgar,
            obscene, hateful, xenophobic, or otherwise unacceptable material; (h) spam other Users.
          </li>
          <li>
            Provide to Give&Gab, when registering and completing your profiles on the Site, false,
            inaccurate, outdated or incomplete information or intentionally assuming the identity of
            another person;
          </li>
          <li>
            Include means of contact such as a telephone number, email address, work address, social
            media handle and other external communication on the Site in public fields of the
            profile, which non-Users have access to;
          </li>
          <li>
            Disseminate or install viruses or any other code or software for the purpose of
            interrupting, destroying, improperly accessing, limiting or interfering with the
            operation or security of Give&Gab’s Services, as well as Give&Gab information, data,
            equipment and its Users.
          </li>
        </ul>
        Content on the Site is subject to monitoring and moderation. Any content found to violate
        these Terms of Service will be removed. Any person, User or not, who feels injured in
        relation to any content, may send Give&Gab a notice requesting its withdrawal.
      </p>
      <h2>Non-Discrimination Policy</h2>
      <p>
        Give&Gab is committed to establishing meaningful, education-centered relationships between
        professionals and amateurs, regardless of race, color, ethnicity, national origin, religion,
        sexual orientation, gender, marital status, citizenship status or disability. We want to
        promote an inclusive culture within the apprenticing community that goes beyond mere
        compliance with established law by fostering a culture of respect, inclusion and empathy.
        Prejudice, racism, hatred or discrimination will not be tolerated. We hope every member
        feels welcome on the platform and able to grow their knowledge and education regardless of
        upbringing, cultural background or lifestyle differences.
        <br />
        <br />
        Users are not allowed to:
        <ul className={css.list}>
          <li>
            Decline an experience request based on race, color, ethnicity, national origin,
            religion, sexual orientation, gender, marital status, citizenship status or disability.
          </li>
          <li>
            Alter the terms or conditions of the experience based on race, color, ethnicity,
            national origin, religion, sexual orientation, gender, marital status, citizenship
            status or disability.Refuse to reasonably accommodate apprentices with disabilities,
            alter the terms or conditions of the apprenticing experience based on an actual or
            perceived disability, prohibit the use of mobility devices or discourage apprentices
            with disabilities from booking a experience.
          </li>
        </ul>
        Users are allowed to:
        <ul className={css.list}>
          <li>
            Decline a request based on factors not prohibited by law, such as issues of safety or
            legal age restrictions.
          </li>
        </ul>
        <br />
        <br />
        Users should strive to make Give&Gab feel welcome and included regardless of background as
        inclusion only strengthens the community. To that end, Give&Gab may suspend or terminate the
        accounts of experts who have repeatedly demonstrated a pattern of exclusion and disrespect.
      </p>

      <h2>Use and disclosure of user data</h2>
      <p>
        You are aware and agree that Give&Gab may use the email address you provided upon
        registration to send information, of any nature, related to Give&Gab’s Services.
        <br />
        <br />
        You are aware and agree that the data you provide to Give&Gab by using the Site, including
        information regarding your identification and location, may possibly be preserved or
        provided to authorities in order to comply with judicial orders.
        <br />
        <br />
        You grant Give&Gab the right to obtain, store, use, dispose, edit, publish, republish and
        reproduce your self-created content, such as evaluations, comments, questions, answers,
        images, audio, video, drawings, productions and illustrations posted and recorded on the
        Site.
      </p>

      <h2>Non-Profit Organizations</h2>
      <p>
        If you create aProfile on behalf of a non-profit organization, you must comply with the
        eligibility requirements of operating as a 501(c)(3). When you list experiences for the
        non-profit, you agree that (a) you are authorized to act on behalf of the organization and
        (b) all payouts will be placed into an account owned by the non-profit. You and your
        non-profit are responsible for obeying all laws that apply to your organization.
      </p>

      <h2>Liability</h2>
      <p>
        You are aware and agree that Give&Gab is not responsible for:
        <ul className={css.list}>
          <li>
            the potential inadequacy, reliability or usefulness of the maps, addresses,
            establishments, images, information, evaluations, comments or any other content of
            Give&Gab’s Services or the possible damages resulting from their use;
          </li>
          <li>
            any service, advertisement, image, text or other content related to Give&Gab’s Services
            that is created, maintained or provided by Users or by third parties, even if accessible
            or viewable on the Site;
          </li>
          <li>
            any damage suffered by you as a result of the conduct of other Users or third parties,
            even in the scope of Give&Gab’s Services, including illegal interceptions or violations
            of their systems or databases by unauthorized persons;
          </li>
          <li>
            any damage suffered by you as a result of the removal of any content that you have
            created, the cancellation of your account or the preservation and dissemination of
            information about it in compliance with judicial orders;
          </li>
          <li>
            possible modification, suspension or interruption of Give&Gab’s Services or for keeping
            the Services available 24 hours per day, every day of the year;
          </li>
          <li>the loss of information, interruption or malfunction of its Services;</li>
          <li>false statements posted by other Users and damages resulting from them;</li>
          <li>
            fiscal, legal or other financial obligations incurred in transactions carried out across
            the Site between Users.
          </li>
        </ul>
        You acknowledge that Give&Gab is not required to maintain or store any content on the Site
        and may, at any time and for any reason, modify, suspend or discontinue the Site, without
        prior notice or obligation to Users.
        <br />
        <br />
        You agree that Give&Gab may delete or disable your accounts, block your email or IP address,
        or otherwise terminate your access to or use of the Site (or any portion thereof) without
        notice and remove any content from the Site.
      </p>

      <h2>Damages</h2>
      <p>
        You acknowledge and agree that you are fully responsible for any damages arising from your
        actions or omissions in breach of this Terms of Service.
        <br />
        <br />
        You agree to indemnify and hold Give&Gab, its executives, subsidiaries, affiliates,
        successors, directors, agents, Service providers, suppliers and employees harmless from any
        and all claims, losses, damages, liability, costs, debts or expenses (including, but not
        limited to, attorneys' fees and procedural costs) incurred due to: (a) misuse and access to
        the Site; (b) breach or non-observance of any provisions of this term; (c) infringement of
        any third party right, including, but not limited to, any intellectual property or privacy
        right; or (d) any claim that any content caused harm to third parties. Further, you
        understand that you have given up rights by agreeing to the terms in this Terms of Service
        and have done so freely and voluntarily, without inducement or coercion.
      </p>

      <h2>Intellectual Property Rights</h2>
      <p>
        The Site and all of its content, features and functionality, including but not limited to
        all information, images, video and audio, graphics, user interface and software used to
        implement the Services, are owned by Give&Gab, its licensors or other providers of such
        material and are protected by United States and international copyright, trademark, patent,
        trade secret, and other intellectual property or proprietary rights laws. You may access the
        material on the Site only for your own personal, non-commercial use. No portion of the
        Services may be reproduced in any form or by any means, except as expressly permitted by
        these Terms of Service or by written agreement from Give&Gab. Distributing, renting,
        loaning, selling, modifying, downloading, storing, republishing, transmitting or exploiting
        any of the Site's Services or content without Give&Gab's expressed consent is a breach of
        these Terms of Service and may violate copyright, trademark, and other laws.
      </p>

      <h2>Privacy</h2>
      <p>
        Use of the Site is subject to the Privacy Policy and is available for review{' '}
        {privacyLink('here')}.
      </p>

      <h2>Modification to the Terms of Service</h2>
      <p>
        Give&Gab reserves the right to modify the Terms of Service at any time without prior notice
        by posting a new version on the site. Any changes to the Terms of Service will take effect
        immediately after their publication to the Site, with an indefinite term. By accessing the
        Site, after any changes, you automatically express your agreement with the modifications to
        the Terms of Service. If you find the updated terms unacceptable, your recourse is to stop
        using Give&Gab's Services.
      </p>

      <h2>Severability and Applicable Law</h2>
      <p>
        If any provision of these terms is found to be invalid or unenforceable, that part will be
        struck and not influence the validity and enforceability of the remaining provisions.
        <br />
        <br />
        These terms and conditions are subject to United States law. In case of dispute, an amicable
        solution will be sought before taking any legal action. Failing settlement, these terms will
        be used as the legal basis and the Nevada judicial courts will have jurisdiction.
      </p>

      <h2>Contact Us</h2>
      <p>
        Don’t hesitate to reach out to us about any questions, issues, comments or concerns you may
        have!
      </p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
