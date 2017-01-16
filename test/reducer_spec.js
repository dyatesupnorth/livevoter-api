import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', ()=>{

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Con Air']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Con Air']
    }));

  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Con Air', 'Gone In 60 Seconds']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Con Air', 'Gone In 60 Seconds']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Con Air', 'Gone In 60 Seconds']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Con Air'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Con Air', 'Gone In 60 Seconds'],
        tally: {'Con Air': 1}
      },
      entries: []
    }));
  });
  it('has an initial state',() => {
    const action = {type: 'SET_ENTRIES', entries:['Con Air']};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries:['Con Air']
    }));

  });
  it('can be used with reduce', () => {
    const actions = [

      {type: 'SET_ENTRIES', entries: ['Con Air', 'Gone In 60 Seconds']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Con Air'},
      {type: 'VOTE', entry: 'Gone In 60 Seconds'},
      {type: 'VOTE', entry: 'Con Air'},
      {type: 'NEXT'}
  ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Con Air'
    }))
  })

});
