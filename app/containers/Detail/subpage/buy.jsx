import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'

import * as storeActionsFromFile from '../../../actions/store'

import BuyAndStore from '../../../components/BuyAndStore'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        }
    }
    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
        )
    }
    componentDidMount() {
        // check current Store State
        this.checkStoreState()
    }
    // check current Store State
    checkStoreState() {
        const id = this.props.id
        const store = this.props.store

        store.forEach(item => {
            if (item.id === id) {
                // already stored
                this.setState({
                    isStore: true
                })
                return false
            }
        })
    }
    // check login
    loginCheck() {
        const id = this.props.id
        const userinfo = this.props.userinfo
        if (!userinfo.username) {
            hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }
    // buy event
    buyHandle() {
        // check login, if not return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        // redirect to userpage
        hashHistory.push('/User')
    }
    // store event
    storeHandle() {
        // check login, if not return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions
        if (this.state.isStore) {
            // if stored alredy, then cancel
            storeActions.rm({id: id})
        } else {
            // if not stored, then store
            storeActions.add({id: id})
        }
        // revise state
        this.setState({
            isStore: !this.state.isStore
        })
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)