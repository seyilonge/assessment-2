import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import IndexPage from './index.js';
import Reservation from '../components/Reservation';

describe( 'Index Page', () => {
  it( 'IndexPage loads Reservation component', () => {
    const indexPage = shallow( <IndexPage /> );
    expect( indexPage.find( Reservation ) ).to.have.lengthOf( 1 );
  } );

} );

