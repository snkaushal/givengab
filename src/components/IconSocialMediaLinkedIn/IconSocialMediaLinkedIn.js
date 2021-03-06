import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaLinkedIn.module.css';

const IconSocialMediaLinkedIn = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" className={classes} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.9999 0C29.4926 0 38 8.50725 38 19.0001C38 29.4941 29.4928 38 18.9999 38C8.50711 38 0 29.4939 0 19.0001C0 8.50725 8.50607 0 18.9999 0Z" fill="white"/>
    <path d="M28.5 20.1781V26.9167H24.7671V20.6294C24.7671 19.05 24.2271 17.9722 22.8759 17.9722C21.8444 17.9722 21.2306 18.6986 20.9606 19.4013C20.8621 19.6525 20.8367 20.0021 20.8367 20.3538V26.9167H17.1025C17.1025 26.9167 17.1528 16.2682 17.1025 15.1649H20.8364V16.8307C20.8288 16.8431 20.819 16.8566 20.8118 16.8687H20.8364V16.8307C21.3324 16.0311 22.2184 14.8888 24.2014 14.8888C26.6582 14.8888 28.5 16.5685 28.5 20.1781ZM13.1964 9.5C11.9189 9.5 11.0833 10.3769 11.0833 11.53C11.0833 12.658 11.8947 13.5615 13.1468 13.5615H13.1718C14.474 13.5615 15.2838 12.6582 15.2838 11.53C15.2593 10.3769 14.474 9.5 13.1964 9.5ZM11.3051 26.9167H15.0379V15.1649H11.3051V26.9167Z" fill="#457B9D"/>
    </svg>
    
  );
};

IconSocialMediaLinkedIn.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaLinkedIn.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaLinkedIn;
