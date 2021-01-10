/* eslint-disable react/jsx-pascal-case */
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from 'react'

//services
import { getDocumentsList } from "redux/services/docServices"
import { getDocCategories } from "redux/services/docCategoryServices"

//utils
import { getSearchParamByName, isContainSpecialCharacter, setSearchParam } from 'utils/urlUtils'
import { summaryItemType } from 'constants.js'

//components
import Loader from "components/common/Loader/Loader"
import Titlebar from 'components/common/Titlebar/Titlebar'
import DocSummary from 'components/doc/DocSummary'
import Paginator from 'components/common/Paginator/ServerPaginator';
import ComboBox from 'components/common/Combobox/Combobox';

class DocumentsList extends Component {
    constructor(props) {
        super();
        this.maxItemPerPage = 5;

        this.documentsList = [];

        this.filter = [
            { id: 1, name: "Tất cả" },
            { id: 2, name: "Chưa phê duyệt" },
            { id: 3, name: "Đã phê duyệt" },
            { id: 4, name: "Cần xem lại" }
        ]
    }

    componentDidMount() {
        this.props.getDocCategories()

        //get filter
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');

        this.props.getDocumentsList(page, category);
    }

    //server paginator
    onPageChange = (pageNumber) => {
        setSearchParam("page", pageNumber);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getDocumentsList(page, category);
        this.setState({});
    }

    //combobox
    onFilterOptionChanged = (selectedOption) => {
        setSearchParam("category", selectedOption.id);
        let page = getSearchParamByName('page');
        let category = getSearchParamByName('category');
        this.props.getDocumentsList(page, category);
        this.setState({});
    }

    render() {

        let documentsList = <></>;

        if (!this.props.isListLoading) {
            if (this.props.documentsList) {
                this.documentsList = this.props.documentsList;

                documentsList = this.documentsList.map((documentItem) => (
                    < DocSummary
                        type={summaryItemType.normal}
                        key={documentItem.id}
                        id={"document-item" + documentItem.id}
                        authorName={documentItem.authorName}
                        authorID={documentItem.authorID}
                        publishDtm={documentItem.publishDtm}
                        category={documentItem.category}
                        categoryID={documentItem.categoryID}
                        title={documentItem.title}
                        views={documentItem.views}
                        downloads={documentItem.downloads}
                        subject={documentItem.subject}
                        subjectID={documentItem.subjectID}
                        likes={documentItem.likes}
                        dislikes={documentItem.dislikes}
                        description={documentItem.description}
                        imageURL={documentItem.imageURL}

                    ></DocSummary >)
                )
            }
        }
        return (
            <div className="nm-bl-layout">
                <Titlebar title="TÀI LIỆU" />
                <div className="left-side-bar-layout-content-container">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>

                        <div className="filter-label display-flex">
                            <div className="mg-right-5px">Tổng số:</div>
                            <div>{this.documentsList.length}</div>
                        </div>

                        <div style={{ display: "flex" }}>
                            <div className="filter-label text-align-right mg-right-5px">Bộ lọc:</div>
                            <div style={{ marginLeft: "5px" }}>
                                <ComboBox
                                    options={this.filter}
                                    selectedOptionID={1}
                                    onOptionChanged={(selectedOption) => this.onFilterOptionChanged(selectedOption)}
                                    id="my-doc-list-search-filter-combobox"
                                ></ComboBox></div>
                        </div>

                    </div>
                    {this.props.isListLoading ?
                        < Loader /> :
                        <>  {documentsList}
                        </>
                    }

                    <Paginator config={{
                        changePage: (pageNumber) => this.onPageChange(pageNumber),
                        pageCount: 20,
                        currentPage: getSearchParamByName('page')
                    }}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        documentsList: state.document.documentSearchResult.data,
        isListLoading: state.document.documentSearchResult.isLoading,
        isCategoryLoading: state.doc_category.categories.isLoading
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDocumentsList, getDocCategories
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocumentsList));
