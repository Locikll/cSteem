import React from 'react';

const SidebarFilters = React.createClass ({
    render: function() {
        return (
    <div className="c-sidebar__module">
        <div className="c-sidebar__header">
            <h3 className="c-sidebar__h3">Filters</h3>
        </div>
        <div className="c-sidebar__content">
            <ul className="c-sidebar__list">
                <li className="c-sidebar__list-item">
                        Author Reputation
                    <input className="c-sidebar__textboxhalf" value={this.props.repmin} onChange={this.props.repminChange} type="number" placeholder="min rep" ></input><input className="c-sidebar__textboxhalf" type="number" placeholder="max rep" ></input>
                </li>
                <li className="c-sidebar__list-item">
                       Post Age (minutes)
                    <input className="c-sidebar__textboxhalf" type="number" placeholder="min age"></input><input className="c-sidebar__textboxhalf" type="number" placeholder="max age"></input>
                </li>
                <li className="c-sidebar__list-item">
                    Word Count <br></br>
                    <input className="c-sidebar__textboxhalf" type="number" placeholder="min words"></input><input className="c-sidebar__textboxhalf" type="number" placeholder="max words"></input>
                </li>
                <li className="c-sidebar__list-item">
                       Pending Payout 
                    <input className="c-sidebar__textboxhalf" type="number" placeholder="min $"></input><input className="c-sidebar__textboxhalf" type="number" placeholder="max $"></input>
                </li>
                <li className="c-sidebar__list-item">
                       Vote Number 
                    <input className="c-sidebar__textboxhalf" type="number" placeholder="min votes"></input><input className="c-sidebar__textboxhalf" type="number" placeholder="max votes"></input>
                </li>
                <li className="c-sidebar__list-item">
                       Comment Number 
                    <input className="c-sidebar__textboxhalf" type="number" placeholder="min comments"></input><input className="c-sidebar__textboxhalf" type="number" placeholder="max comments"></input>
                </li>
                <li className="c-sidebar__list-item">
                       Exclude Tags 
                    <input className="c-sidebar__textboxfull" type="number" placeholder="tag1,tag2,..."></input>
                </li>                
                {/*   <li className="c-sidebar__list-item"><a className="c-sidebar__link" href={username + ''}>Pay someone</a></li> */}
                {/* <li className="c-sidebar__list-item"><a className="c-sidebar__link" href="/market">Token market</a></li>  */}
            </ul>
        </div>
    </div>
        );
    },
});

export default SidebarFilters;