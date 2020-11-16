import React, { Component } from 'react'

import 'components/shared_components/DocPostSummary.scss'
import 'styles/SimpleButton.scss'
import CustomModal from 'components/common/CustomModalPopup/CustomModal'
import gray_btn_element from 'assets/images/gray_btn_element.png'

class RequestedDocSummary extends Component {

    constructor(props) {
        super(props);

        this.id = this.props.id;
        this.authorName = this.props.authorName;
        this.authorID = this.props.authorID;
        this.requestedDate = this.props.requestedDate;
        this.requestedTime = this.props.requestedTime;
        this.requestedCategory = this.props.requestedCategory;
        this.requestedCategoryID = this.props.requestedCategoryID;
        this.semester = this.props.semester;
        this.year = this.props.year;
        this.subject = this.props.subject;
        this.title = this.props.title;
        this.content = this.props.content;
        this.image = this.props.image;
        this.tags = this.props.tags;
        this.viewCount = this.props.viewCount;
        this.downCount = this.props.downCount;

        this.isRejectRequestedPopupOpen = false;

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

            <div className="DocPost_Summary" >
                <div className="DocPost_Summary_Main_Layout">
                    <div className="DocPost_Summary_Author_Date_Metadata">
                        <div className="DocPost_Summary_Author_Link" onClick={() => this.navigateToAuthorPersonalPage()}>
                            {this.authorName}
                        </div>
                        <div className="DocPost_Summary_Requested_Date">
                            {this.requestedDate}
                        </div>
                    </div>

                    <div className="Requested_DocPost_Summary_Header_2">
                        vào lúc {this.requestedTime} đã yêu cầu phê duyệt một tài liệu trong danh mục
                    <div className="Requested_DocPost_Summary_Category" onClick={() => this.navigateToSameCategoryDocsPage()}>
                            {this.requestedCategory}
                        </div>
                    </div>

                    <div className="DocPost_Summary_Title">
                        {this.props.title}
                    </div>

                    <div className="DocPost_Summary_Content">
                        {this.props.content}
                    </div>

                    <div className="DocPost_Summary_Image_Layout">
                        <img alt="post" className="DocPost_Summary_Image" src={this.props.image}></img>
                    </div>

                </div>
                <div className="DocPost_Summary_Footer">
                    <div className="Simple_Blue_Button" style={{ marginRight: "5px", fontSize: "16px" }} onClick={() => this.handlerPreviewRequestedPost()}>Xem trước</div>
                    <div className="Simple_Red_Button" style={{ fontSize: "16px" }} onClick={() => { this.handlerRejectRequestedPost() }}>Từ chối</div>
                </div>

                {/* Popup for reject requested post */}
                <CustomModal
                    shadow={true}
                    type="confirmation"
                    open={this.isRejectRequestedPopupOpen}
                    title="Xác nhận?"
                    text="Xác nhận từ chối tiếp nhận bài viết này?"
                    closeModal={() => { this.isRejectRequestedPopupOpen = false; this.setState({}); }}
                >
                    <button className="Simple_Blue_Button margin_right_5px" onClick={() => this.handlerVerifyRejectRequestedPostConfirmation()}>OK</button>
                    <button className="Simple_White_Button" onClick={() => this.handleCancelRejectRequestedPostConfirmation()}>Cancel</button>

                </CustomModal>


            </div>
        );
    }

    navigateToAuthorPersonalPage = () => {
        if (window.location.pathname.substring(0, 6) === "/admin") {
            window.location.href = "/admin/user/" + this.authorID;
            return;
        }
        if (window.location.pathname.substring(0, 5) === "/user")
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