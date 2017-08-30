import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="city-list-container">
                <h3>Popular city</h3>
                <ul className="clear-fix">
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Buffalo')}>Buffalo</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Miami')}>Miami</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Boston')}>Boston</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Atlanta')}>Atlanta</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Chicago')}>Chicago</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Salem')}>Salem</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Seattle')}>Seattle</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Orlando')}>Orlando</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'San Diego')}>San Diego</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Austin')}>Austin</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Dayton')}>Dayton</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this, 'Phoenix')}>Phoenix</span>
                    </li>
                </ul>
            </div>
        )
    }
    clickHandle(cityName) {
        const changeFn = this.props.changeFn
        changeFn(cityName)
    }
}

export default CityList