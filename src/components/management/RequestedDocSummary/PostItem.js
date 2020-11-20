import React, { Component } from 'react'

import 'components/shared_components/DocPostSummary.scss'
import 'styles/SimpleButton.scss'
import CustomModal from 'components/common/CustomModalPopup/CustomModal'
import gray_btn_element from 'assets/images/gray_btn_element.png'

class RequestedDocSummary extends Component {

    constructor(props) {
        super(props);

        //type: isNormalItem
        this.id = this.props.id;
        this.authorName = this.props.authorName;
        this.authorID = this.props.authorID;

        //for approving
        this.publishDate = this.props.publishDate;
        this.categoryName = this.props.categoryName;
        this.requestedCategoryID = this.props.requestedCategoryID;

        //post information
        this.title = this.props.title;
        this.content = this.props.content;
        this.image = this.props.image;
        this.tags = this.props.tags;
        this.viewCount = this.props.viewCount;
        this.downCount = this.props.downCount;

        //this.isRejectRequestedPopupOpen = false;

        this.state = {
            // isRejectRequestedPopupOpen: false,
        }
    }


    componentDidMount() {

    }

    getFirstImage() {

    }

    render() {
        return (

            <div className="summary-item" >
                <div className="summary-item-main-layout">
                    <div className="summary-item-author-date-metadata">
                        <div className="summary-item" onClick={() => this.navigateToAuthorPersonalPage()}>
                            {this.authorName}
                        </div>
                        <div className="summary-item-publish-date">
                            {this.publishDate}
                        </div>
                    </div>

                    <div className="summary-item-title">
                        {this.props.title}
                    </div>

                    <div className="summary-item_Content">
                        {this.props.content}
                    </div>

                    <div className="summary-item-image-layout">
                        <img alt="post" className="summary-item-image" src={this.props.image}></img>
                    </div>

                </div>
                {/* <div className="summary-item_Footer">
                    <div className="blue-button" style={{ marginRight: "5px", fontSize: "16px" }} onClick={() => this.handlerPreviewRequestedPost()}>Xem trước</div>
                    <div className="red-button" style={{ fontSize: "16px" }} onClick={() => { this.handlerRejectRequestedPost() }}>Từ chối</div>
                </div> */}

                {/* Popup for reject requested post */}
                {/* <CustomModal
                    shadow={true}
                    type="confirmation"
                    open={this.isRejectRequestedPopupOpen}
                    title="Xác nhận?"
                    text="Xác nhận từ chối tiếp nhận bài viết này?"
                    closeModal={() => { this.isRejectRequestedPopupOpen = false; this.setState({}); }}
                >
                    <button className="blue-button margin-right-5px" onClick={() => this.handlerVerifyRejectRequestedPostConfirmation()}>OK</button>
                    <button className="white-button" onClick={() => this.handleCancelRejectRequestedPostConfirmation()}>Cancel</button>

                </CustomModal> */}


            </div>


        );
    }

    navigateToAuthorPersonalPage = () => {
        window.location.href = "/user/" + this.authorID;
    }

    navigateToSameCategoryDocsPage = () => {
        window.location.href = "/docs/category?id=" + this.requestedCategoryID;
    }

    handlerPreviewRequestedPost = () => {
        if (window.location.pathname.substring(0, 6) === "/admin") {
            window.location.href = "/admin/doc_approving/" + this.id;
            return;
        }
        if (window.location.pathname.substring(0, 5) === "/user")
            window.location.href = "/user/doc_approving/" + this.id;

    }

    handlerRejectRequestedPost = () => {
        this.isRejectRequestedPopupOpen = true;
        this.setState({});
    }

    handleCancelRejectRequestedPostConfirmation = () => {
        this.isRejectRequestedPopupOpen = false;
        this.setState({});
    }

    handlerVerifyRejectRequestedPostConfirmation = () => {
        this.isRejectRequestedPopupOpen = false;
        this.setState({});
    }



}
export default RequestedDocSummary;