import React from 'react';
import {Match} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import preload from '../public/data.json';
import AsyncRoute from './AsyncRoute';
if(global){
    global.System = { import () {}}
}

//using stateless component
const App = () =>{
    return (
        <Provider store={store}>
            <div className='app'>
                <Match exactly
                       pattern='/'
                       component={
                           (props) => {
                               return (<AsyncRoute props={props} loadingPromise={System.import('./Landing')} />)
                           }
                       }
                />
                <Match
                    pattern='/search'
                    component={
                        (props) =>{
                            return (
                                <AsyncRoute
                                    props={Object.assign({shows: preload.shows}, props)}
                                    loadingPromise={System.import('./Search')}
                                />
                            )
                        }
                    }
                />
                <Match
                    pattern='/details/:id'
                    component={(props) =>{
                        const shows = preload.shows.filter((show) => props.params.id === show.imdbID);
                        return <AsyncRoute props={Object.assign({show: shows[0]}, props)} loadingPromise={System.import('./Details')} />
                    }}
                />
            </div>
        </Provider>
    )
};

// using create class
// const App = React.createClass({
//     render () {
//         return (
//             <BrowserRouter>
//                 <Provider store={store}>
//                     <div className='app'>
//                         <Match exactly pattern='/' component={Landing} />
//                         <Match
//                             pattern='/search'
//                             component={(props) => <Search shows={preload.shows} {...props} />}
//                         />
//                         <Match
//                             pattern='/details/:id'
//                             component={(props) => {
//                                 const shows = preload.shows.filter((show) => props.params.id === show.imdbID);
//                                 return <Details show={shows[0]} {...props} />
//                             }}
//                         />
//                     </div>
//                 </Provider>
//             </BrowserRouter>
//         )
//     }
// });

export default App;