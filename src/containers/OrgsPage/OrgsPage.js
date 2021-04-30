import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';
import background from './assets/background.svg';
import SPCANorthernNevada from './assets/SPCANorthernNevada.svg';
import SundanceBooksandMusic from './assets/SundanceBooksandMusic.svg';
import deLaveagaDesigns from './assets/deLaveagaDesigns.svg';
import renoArtown from './assets/renoArtown.svg';
import bigBrothersBigSisters from './assets/bigBrothersBigSisters.svg';
import waldenCoffeehouse from './assets/WaldensCoffeehouse.svg';
import nevadaIndustryExcellence from './assets/nevadaIndustryExcellence.svg';
import startupNV from './assets/startupNV.svg';
import boysGirlsClubOfTruckeeMeadows from './assets/boys&GirlsClubOfTruckeeMeadows.svg';
import renoSportsdome from './assets/renoSportsdome.svg';
import mementomorium from './assets/mementomorium.svg';
import theGenerator from './assets/theGenerator.svg';
import ioterra from './assets/ioterra.svg';
import greatRenoBalloonRace from './assets/greatRenoBalloonRace.svg';
import renoRollerKingdom from './assets/renoRollerKingdom.svg';

const companies = [
  {
    card: SPCANorthernNevada,
    name: 'SPCA Northern Nevada',
    url: 'https://spcanevada.org/',
  },
  {
    card: SundanceBooksandMusic,
    name: 'Sundance Books and Music',
    url: 'https://www.sundancebookstore.com/',
  },
  {
    card: boysGirlsClubOfTruckeeMeadows,
    name: 'Boys & Girls Club Of Truckee Meadows',
    url: 'https://bgctm.org/',
  },
  {
    card: renoArtown,
    name: 'Reno Artown',
    url: 'https://artown.org/',
  },
  {
    card: bigBrothersBigSisters,
    name: 'Big Brothers Big Sisters',
    url: 'http://www.bbbsnn.org/',
  },
  {
    card: waldenCoffeehouse,
    name: 'Walden’s Coffeehouse',
    url: 'https://www.waldenscoffeehouse.com/',
  },
  {
    card: deLaveagaDesigns,
    name: 'deLaveaga Designs',
    url: 'http://delaveagadesigns.com/',
  },
  {
    card: nevadaIndustryExcellence,
    name: 'Nevada Industry Excellence',
    url: 'https://www.nevadaie.com/',
  },
  {
    card: startupNV,
    name: 'Startup NV',
    url: 'https://startupnv.org/',
  },
  {
    card: renoSportsdome,
    name: 'Reno Sportsdome',
    url: 'https://renosportsdome.com/',
  },
  {
    card: mementomorium,
    name: 'Mementomorium',
    url: 'https://www.mementomorium.org/',
  },
  {
    card: theGenerator,
    name: 'The Generator',
    url: 'https://www.therenogenerator.com/',
  },
  {
    card: ioterra,
    name: 'Ioterra',
    url: 'ioterra.com',
  },
  {
    card: greatRenoBalloonRace,
    name: 'Great Reno Balloon Race',
    url: 'https://renoballoon.com/',
  },
  {
    card: renoRollerKingdom,
    name: 'Reno Roller Kingdom',
    url: 'https://www.rollerkingdom.org/',
  },
];

import css from './OrgsPage.module.css';

export class OrgsPageComponent extends Component {
  constructor(props) {
    super(props);
    // The StaticRouter component used in server side rendering
    // provides the context object. We attach a `notfound` flag to
    // the context to tell the server to change the response status
    // code into a 404.
    this.props.staticContext.notfound = true;
  }

  render() {
    const { history, intl, scrollingDisabled } = this.props;

    const title = intl.formatMessage({
      id: 'OrgsPage.title',
    });

    const handleSearchSubmit = values => {
      const { search, selectedPlace } = values.location;
      const { origin, bounds } = selectedPlace;
      const searchParams = { address: search, origin, bounds };
      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams)
      );
    };

    return (
      <Page title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.root}>
              <img className={css.banner} src={background} />
              <div className={css.companies}>
                {companies.map(({ card, url, name }) => (
                  <a href={url} target="_blank">
                    <img src={card} alt={name} />
                  </a>
                ))}
              </div>
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

OrgsPageComponent.defaultProps = {
  staticContext: {},
};

const { bool, func, object, shape } = PropTypes;

OrgsPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // context object from StaticRouter, injected by the withRouter wrapper
  staticContext: object,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const OrgsPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(OrgsPageComponent);

export default OrgsPage;
