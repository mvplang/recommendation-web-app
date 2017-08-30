import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { postComment } from '../../../fetch/user/orderlist.js'
import Star from '../../Star'

import './style.less'

class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            commentState: 2,  // commentState  0-未评价 1-评价中 2-已评价
            stars: {}
        }
    }
    render() {
        const data = this.props.data

        return (
            <div className="order-item-container">
                <div className="clear-fix">
                    <div className="order-item-img float-left">
                        <img src={data.img}/>
                    </div>
                    <div className="order-item-comment float-right">
                        {
                            this.state.commentState === 0
                            // not comment yet
                            ? <button className="btn" onClick={this.showComment.bind(this)}>comment</button>
                            :
                                this.state.commentState === 1
                                // typing
                                ? ''
                                // commented
                                : <button className="btn unseleted-btn">commented</button>
                        }
                    </div>
                    <div className="order-item-content">
                        <span>Restaurant：{data.title}</span>
                        <span>Num Customer：{data.count}</span>
                        <span>Price：${data.price}</span>
                    </div>
                </div>
                {
                    // input shows when state is typing
                    this.state.commentState === 1
                    ? <div className="comment-text-container">
                        <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref="commentText"></textarea>
                        <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <Star star="0" clickCallback={this.starClickCallback.bind(this)}/>
                        </div>
                        <button className="btn" onClick={this.submitComment.bind(this)}>Submit</button>
                        &nbsp;
                        <button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>Cancel</button>
                    </div>
                    : ''
                }
            </div>
        )
    }
    componentDidMount() {
        this.setState({
            commentState: this.props.data.commentState
        })
    }
    showComment() {
        this.setState({
            commentState: 1
        })
    }
    submitComment() {
        const submitComment = this.props.submitComment
        // get id
        const id = this.props.data.id
        // get star
        const stars = this.state.stars
        const star = stars[id] || '0'
        // get comment
        const commentText = this.refs.commentText
        const value = commentText.value.trim()
        if (!value) {
            return
        }

        // submit 
        submitComment(id, value, star, this.commentOk.bind(this))
    }
    commentOk() {
        // already comment
        this.setState({
            commentState: 2
        })
    }
    hideComment() {
        // hide input
        this.setState({
            commentState: 0
        })
    }
    starClickCallback(star) {
        let stars = this.state.stars
        const id = this.props.data.id
        stars[id] = star

        this.setState({
            stars: stars
        })
    }
}

export default Item