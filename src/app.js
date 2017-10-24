import React from 'react';
import ReactDOM from 'react-dom';


const store = Redux.createStore((state, action)=>{
    switch(action.type){
        case 'ADD_CARD':
            let newCard = Object.assign({},action.data,{
                score: 1,
                id: +new Date
            });

            return Object.assign({}, state, {
                cards: state.cards ? state.cards.concat([newCard]):[newCard]
            });
        default:
            return state || {};
    }
});

store.subscribe(()=>{
    console.log(store.getState());
});

store.dispatch({
    type: 'ADD_CARD',
    data: {
        front: 'front',
        back: 'back'
    }
});

const Sidebar = React.createClass({
  render() {
    let props = this.props;
    return (<div className="sidebar">
              <h2> All Decks </h2>
              <ul> {props.decks.map((deck, i) =>
                      <li key={i}> {deck.name} </li>
                    )}
              </ul>
              {props.addingDeck && <input ref='add' />}
            </div>);
  }
});

const App = (props) => {
  return (<div className = "app">
              {props.children}
          </div>);
};

ReactDOM.render((<App> <Sidebar decks={[ {name:'Deck 1'} ]} addingDeck={true} />
                  </App>),document.getElementById('root'));
