import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
export const Home: FC = () => {
    return (
        <>
            <div id='sidebar' style={{ backgroundColor: '#093892' }}>
                <h1>React Router Contacts</h1>
                <div>
                    <form id='search-form' role='search'>
                        <input id='q' aria-label='Search contacts' placeholder='Search' type='search' name='q' />
                        <div id='search-spinner' aria-hidden hidden={true} />
                        <div className='sr-only' aria-live='polite' />
                    </form>
                    <form method='post'>
                        <button type='submit'>New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`contacts/1`}>Your Name</Link>
                        </li>
                        <li>
                            <Link to={`contacts/2`}>Your Friend</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id='detail'>
                <Outlet />
            </div>
        </>
    );
};
