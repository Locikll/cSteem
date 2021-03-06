import  React  from 'react';

class SidebarFilters extends React.Component {

    constructor() {
        super();
        this.state = {
            "filter" : 
            {"repmin" : 25,
             "repmax" : 75,
             "postagemin" : 0,
             "postagemax" : 8640,
             "wordcountmin" : 600,
             "wordcountmax" : 2200,
             "numimagemin" : 0,
             "numimagemax" : 15,
             "payoutmin" : 0,
             "payoutmax" : 2500,
             "numvotesmin" : 0,
             "numvotesmax" : 1500,
             "numcommentsmin" : 0,
             "numcommentsmax" : 600,
             "excludetags": "test,spam",
                
                
            }

        };

        this.filterchanged = this.filterchanged.bind(this);
        
    }

    filterchanged(e)
    {
        console.log(e.target.value + " - " + e.target.name); 
        const copy = Object.assign({}, this.state.filter);
        copy[e.target.name] = e.target.value;
  
         
        this.setState({"filter" : copy});
        console.log("filterchanged in sidebar " + JSON.stringify(copy));
        this.props.filterchanged(copy);
    }

    render() {
        return (
    <div className="c-sidebar__module">
   
        <div className="c-sidebar__header">
            <h3 className="c-sidebar__h3">Filters</h3>
        </div>
        <div className="c-sidebar__content">
            <ul className="c-sidebar__list">
                <li className="c-sidebar__list-item">
                        Author Reputation
                    <input className="c-sidebar__textboxhalf" name="repmin" value={this.state.filter.repmin}  onChange={(e) => this.filterchanged(e)} type="number" placeholder="min rep" ></input><input name="repmax" className="c-sidebar__textboxhalf" value={this.state.filter.repmax} onChange={(e) => this.filterchanged(e)} type="number" placeholder="max rep" ></input>
                </li>
                <li className="c-sidebar__list-item">
                       Post Age (minutes)
                    <input className="c-sidebar__textboxhalf" type="number" name="postagemin" value={this.state.filter.postagemin} onChange={(e) => this.filterchanged(e)} placeholder="min age"></input><input className="c-sidebar__textboxhalf" type="number" name="postagemax" value={this.state.filter.postagemax} onChange={(e) => this.filterchanged(e)} placeholder="max age"></input>
                </li>
                <li className="c-sidebar__list-item">
                    Word Count <br></br>
                    <input className="c-sidebar__textboxhalf" type="number" name="wordcountmin" value={this.state.filter.wordcountmin} onChange={(e) => this.filterchanged(e)} placeholder="min words"></input><input className="c-sidebar__textboxhalf" type="number" name="wordcountmax" value={this.state.filter.wordcountmax} onChange={(e) => this.filterchanged(e)} placeholder="max words"></input>
                </li>
                <li className="c-sidebar__list-item">
                    Image Number <br></br>
                    <input className="c-sidebar__textboxhalf" type="number" name="numimagemin" value={this.state.filter.numimagemin} onChange={(e) => this.filterchanged(e)} placeholder="min words"></input><input className="c-sidebar__textboxhalf" type="number" name="numimagemax" value={this.state.filter.numimagemax} onChange={(e) => this.filterchanged(e)} placeholder="max words"></input>
                </li>
                <li className="c-sidebar__list-item">
                       Pending Payout 
                    <input className="c-sidebar__textboxhalf" type="number" name="payoutmin" value={this.state.filter.payoutmin} onChange={(e) => this.filterchanged(e)} placeholder="min $"></input><input className="c-sidebar__textboxhalf" type="number" name="payoutmax" value={this.state.filter.payoutmax} onChange={(e) => this.filterchanged(e)} placeholder="max $"></input>
                </li>
                <li className="c-sidebar__list-item">
                       Vote Number &nbsp; &nbsp;
                    <input className="c-sidebar__textboxhalf" type="number" name="numvotesmin" value={this.state.filter.numvotesmin} onChange={(e) => this.filterchanged(e)} placeholder="min votes"></input><input className="c-sidebar__textboxhalf" type="number" name="numvotesmax" value={this.state.filter.numvotesmax} onChange={(e) => this.filterchanged(e)} placeholder="max votes"></input>
                </li>
                <li className="c-sidebar__list-item">
                       Comment Number 
                    <input className="c-sidebar__textboxhalf" type="number" name="numcommentsmin" value={this.state.filter.numcommentsmin} onChange={(e) => this.filterchanged(e)} placeholder="min comments"></input><input className="c-sidebar__textboxhalf" type="number" name="numcommentsmax" value={this.state.filter.numcommentsmax} onChange={(e) => this.filterchanged(e)} placeholder="max comments"></input>
                </li>
                <li className="c-sidebar__list-item">
                       Exclude Tags 
                    <input className="c-sidebar__textboxfull" type="text" name="excludetags" value={this.state.filter.excludetags} onChange={(e) => this.filterchanged(e)} placeholder="tag1,tag2,..."></input>
                </li>                
                {/*   <li className="c-sidebar__list-item"><a className="c-sidebar__link" href={username + ''}>Pay someone</a></li> */}
                {/* <li className="c-sidebar__list-item"><a className="c-sidebar__link" href="/market">Token market</a></li>  */}
            </ul>
        </div>
    </div>
        );
    }
    
};

export default SidebarFilters;