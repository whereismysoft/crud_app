import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import Adverts from './components/Adverts';
import NewAdvert from './components/NewAdvert';
import AdvertItem from './components/AdvertItem';

export default class ElementsRoute extends React.Component {

	render(){
		return(
			<div>
				<Route path='/'>
						<Switch>
							<Route exact path='/adverts' component={Adverts} />
                            <Route path='/adverts/:id' component={AdvertItem} />
		                    <Route exact path='/new_advert' component={NewAdvert} />
                            <Redirect from='*' to='/adverts'/>
		                </Switch>
				</Route>
			</div>
			)
	}
}