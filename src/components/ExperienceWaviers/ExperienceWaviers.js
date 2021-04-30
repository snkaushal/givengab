import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './ExperienceWaviers.module.css';

const ExperienceWaviers = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: March 23, 2021</p>
      In order to purchase and participate in a Give from Give&Gab, you must agree to this
      experience waiver upon booking.
      <br />
      <h2>Representation</h2>
      <p>
        You represent that you are at least 18 years old and if not, you meet the minimum age set
        out by the provider of the Give you are purchasing and have obtained the necessary
        permission to participate without accompaniment. If you are 18 years of age or older and
        bringing a minor as a guest, you acknowledge and agree that you must supervise the minor
        throughout the duration of the session and have read this experience waiver and agree to it
        on behalf of the minor. If you are booking an experience on behalf of other guests, you
        acknowledge and agree that the terms “you” serve as reference to those on whose behalf you
        book and that each said guest has read and agrees to this experience waiver.
      </p>
      <h2>Assumption of Risks</h2>
      <p>
        You understand that the experience(s) you book may be hazardous, carrying the risk of
        physical injury, property damage, disability, permanent paralysis, illness and death. To the
        maximum extent permitted under applicable law you knowingly, voluntarily and freely assume
        all risks, both known and unknown, of participating in experiences, even if those risks
        arise from the negligence or carelessness of the provider or others, or defects in the
        equipment, premise or facility used during the session, or otherwise, and you assume full
        responsibility for participating in the experience.
      </p>
      <h2>Release and Waiver</h2>
      <p>
        You acknowledge and agree that (a) you have reasonably evaluated the risks associated with
        following and have made an informed and voluntary decision to participate, (b) you alone,
        and not the provider of the Give, nor Give&Gab, are responsible for determining your fitness
        for following and your ability to fully comprehend any instructions, directions or cautions
        presented, (c) you will not participate in any experience if you have a physical, medical or
        mental disability that may limit or impede you from safely following and (d) you will act
        reasonably and responsibly while following, complying with all instructions, directions, or
        precautions as expressed verbally or otherwise by your expert and others and you will stop
        following immediately if a hazard is present.
        <br />
        <br />
        To the maximum extent permitted by law, you release and agree not to sue the provider of
        your Give for any claims, damages, demands, causes of action, expenses, costs, losses (both
        economic or non-economic) or liability of any nature whatsoever stemming from or in
        conjunction with your experience(s), whether based on warranty, contract, tort (including
        negligence or carelessness), product liability or any other legal theory. To the maximum
        extent permitted by law, you intend this experience waiver to be a complete and
        unconditional release of all liability. You acknowledge and agree that if any section of
        this experience waiver is found to be invalid, the balance shall continue, notwithstanding,
        in full legal force and effect.
      </p>
      <h2>Disclaimer of Warranties</h2>
      <p>
        To the maximum extent permitted by law, providers of Gives on Give&Gab offer the
        experience(s) “as is,” without warranties of any nature, whether expressed or implied and,
        without limited the foregoing, expressly disclaim any warranties of safety, fitness for a
        particular purpose, quiet enjoyment or sufficiency of the instructions and precautions
        provided to you.
      </p>
      <h2>Indemnification</h2>
      <p>
        You acknowledge and agree that if you or anyone on your behalf, despite this experience
        waiver, makes a claim against the provider of the Give relating to an experience, you will
        indemnify and hold the expert harmless from any damages, demands, losses or liabilities,
        which the expert may incur as a consequence of such a claim. You confirm that you have read
        this experience waiver and fully understand the assumption of risk, release, waiver and
        consent contained within it. Further, you understand that you have given up rights by
        agreeing to the terms in this experience waiver and have done so freely and voluntarily,
        without inducement or coercion.
      </p>
    </div>
  );
};

ExperienceWaviers.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

ExperienceWaviers.propTypes = {
  rootClassName: string,
  className: string,
};

export default ExperienceWaviers;
