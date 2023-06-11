import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navigation-header'>
			<div className='header'>
				<ul>
					<div className='home-button'>
						<li id='home-button'>
							<NavLink exact to="/"
								className='logo-link'>Home</NavLink>
						</li>
						{isLoaded && (
							<div className='profile-button'>
								<li>
									<ProfileButton user={sessionUser} />
								</li>
							</div>
						)}
					</div>
				</ul>
			</div>
		</div>
	);
}

export default Navigation;
