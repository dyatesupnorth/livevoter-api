import {Map, fromJS} from 'immutable';

import {expect} from 'chai';
import makeStore from '../src/store';

describe('store', () => {
  it('is a Redu sotre configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());
    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Con Air', 'Gone In 60 Seconds']
    });

    expect(store.getState()).to.equal(fromJS({
      entries: ['Con Air', 'Gone In 60 Seconds']
    }));
  })

})
