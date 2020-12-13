import React, { Component } from "react";
import Tag from "components/common/Tag/Tag"
import { getMyPostsList } from "redux/services/postServices"
import { getPostCategories } from "redux/services/postCategoryServices"

import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ComboBox from 'components/common/Combobox/Combobox';
import { getSearchParamByName, isContainSpecialCharacter, setSearchParam } from 'utils/Utils'
import Paginator from 'components/common/Paginator/ServerPaginator'
import DocSummary from 'components/doc/DocSummary'
import Loader from 'components/common/Loader/Loader'
import {summaryItemType} from 'constants.js'

class SearchDoc extends Component {
    constructor(props) {
        super(props);

        this.postsList = <></>
    }

    async componentDidMount() {

        let page = getSearchParamByName('page');
        this.props.getMyPostsList(page); //api khác, tìm bằng tag
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam("page", pageNumber);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getMyPostsList(page, category);
        this.setState({});
    }
    render() {

        if (!this.props.isListLoading) {
            this.myPostsList = this.props.myPostsList.map((postItem) => (
                <DocSummary
                    type={summaryItemType.normal}
                    key={postItem.id}
                    id={postItem.id}
                    authorName={postItem.authorName}
                    authorID={postItem.authorID}
                    publishDtm={postItem.publishDtm}
                    category={postItem.categoryName}
                    categoryID={postItem.categoryID}
                    title={postItem.title}
                    summary={postItem.summary}
                    imageURL={postItem.imageURL}
                    likedStatus={postItem.likedStatus}
                    savedStatus={postItem.savedStatus}
                    readingTime={postItem.readingTime}
                    likes={postItem.likes}
                    comments={postItem.commentCount}
                    approveStatus={false}
                ></DocSummary >)
            )
        }
        return (
            <div>
                {
                    this.props.isListLoading ?
                        < Loader /> :
                        <>{this.myPostsList}</>
                }

                < Paginator config={{
                    changePage: (pageNumber) => this.onPageChange(pageNumber),
                    pageCount: 7,
                    currentPage: getSearchParamByName('page')
                }} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        myPostsList: state.post.myPosts.data,
        postCategories: state.post_category.categories.data,
        isListLoading: state.post.myPosts.isLoading,
        isCategoryLoading: state.post_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getMyPostsList, getPostCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocSummary));
