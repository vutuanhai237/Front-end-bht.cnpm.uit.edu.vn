import React, { Component } from "react";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getPostCategories } from "redux/services/postCategoryServices";
import { getTagQuickQueryResult } from "redux/services/tagServices"
import { postCreatePost } from "redux/services/postServices"

import "./CreatePost.scss";
import "components/common/CustomCKE/CKEditorContent.scss";
import 'components/styles/DocPostDetail.scss'

//components
import Tag from "components/common/Tag/Tag";
import Titlebar from 'components/common/Titlebar/Titlebar';
import Combobox from 'components/common/Combobox/Combobox';
import Editor from 'components/common/CustomCKE/CKEditor.js';

import liked_btn from 'assets/images/liked_btn.png'
import unliked_btn from 'assets/images/unliked_btn.png'
import full_blue_bookmark_btn from 'assets/images/full_blue_bookmark_btn.png'
import gray_bookmark_btn from 'assets/images/gray_bookmark_btn.png'

//utils
import { ClickAwayListener } from '@material-ui/core';
import { validation, styleFormSubmit } from 'utils/validationUtils'
import { today } from 'utils/timeUtils'
import Metadata from 'components/common/Metadata/Metadata'
import UserSidebar from 'layouts/UserSidebar'
import CustomModal from 'components/common/CustomModalPopup/CustomModal'
import { faSatelliteDish } from "@fortawesome/free-solid-svg-icons";

const validationCondition = {
    form: '#create-post-form',
    formGroupSelector: '.form-group',
    errorSelector: '.form-error-label',
    rules: [
        //truyen vao id, loai component, message
        validation.isRequired('cr-post-title', 'form-input', 'Tên bài viết không được để trống!'),
        validation.isNotAllowSpecialCharacter('cr-post-title', 'form-input', 'Tên bài viết không được chứa ký tự đặc biệt!'),
        validation.isRequired('cr-post-category-combobox', 'form-combobox', 'Danh mục không được để trống'),
        validation.isRequired('cr-post-cke', 'form-ckeditor', 'Nội dung bài viết không được để trống')
    ],
}

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.categoryList = [
            {
                id: 1,
                name: "Chọn danh mục"
            }
        ];
        this.isNotifySuccessOpen = false;
        this.state = {
            currentCategory: "Danh muc 3",
            publishDtm: today.getDateDMY(),

            isUploading: false,
            isPreview: false,
            isSearchingTag: false,

            CREATE_POST_DTO: {
                tags: [],
                title: "Model View Presenter (MVP) in Android with a simple demo project.",//
                content: ``,//
                summary: `null`,
                // authorID: "",// khong co nhe
                categoryID: "",//
                imageURL: "null",
                readingTime: 10
            },

            author: {
                avatarURL: "https://i.imgur.com/SZJgL6C.png",
                displayName: "Nguyễn Văn Đông",
                username: "dongnsince1999"
            },
        };
        this.shownTag = [
            { dmID: 1, id: '', content: '' },
            { dmID: 2, id: '', content: '' },
            { dmID: 3, id: '', content: '' },
            { dmID: 4, id: '', content: '' },
            { dmID: 5, id: '', content: '' },
        ]
        this.isPopupOpen = false;
        this.message = "";

        this.tagQuickQueryResult =
            [
                {
                    id: 1,
                    name: "tag1",
                },
                {
                    id: 2,
                    name: "tag2",
                },
                {
                    id: 3,
                    name: "tag2",
                }
            ];

    }

    componentDidMount() {
        this.props.getPostCategories();
        document.querySelector(".cr-post-form-container.preview").classList.remove("d-block");
        document.querySelector(".cr-post-form-container.edit").classList.remove("d-none");
        document.querySelector(".cr-post-form-container.preview").classList.add("d-none");
        document.querySelector(".cr-post-form-container.edit").classList.add("d-block");
        validation(validationCondition);
    }

    handleModal = () => {

    }

    onCategoryOptionChanged = (selectedOption) => {
        this.setState({
            CREATE_POST_DTO: { ...this.state.CREATE_POST_DTO, categoryID: selectedOption.id },
            currentCategory: selectedOption.name
        })
    }

    handleUploadBtnClick = () => {
        if (styleFormSubmit(validationCondition)) {
            this.props.postCreatePost(this.state.CREATE_POST_DTO);
        }
    }

    handleClosePopup = () => {
        this.setState({
            modalShow: false,
        });
    }

    //#region  tag region
    closeQuickSearchTag = () => {
        document.getElementById("cr-post-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-post-qs-tag-result-container").classList.remove('show');
    }

    quickSearchTags = (e) => {
        if (!e.target.value) {
            this.closeQuickSearchTag();
            return;
        }
        this.setState({ isSearchingTag: true })
        this.props.getTagQuickQueryResult(e.target.value);
        document.getElementById("cr-post-qs-tag-result-container").classList.add('show');
        document.getElementById("cr-post-qs-tag-result-container").classList.remove('hidden');
    }

    keyHandler = (e) => {
        if (!e.target.value) return;
        let tags = this.state.CREATE_POST_DTO.tags;
        let hasOldTag = -1; // khong cos => -1 neu co => id cua tag 
        if (e.charCode === 13) { //press Enter    

            //neu chua search duoc thi khong cho bam enter
            //check voi 3 ket qua tim kiem duoc, neu khong match thi tao moi
            if (this.props.isTagQuickQueryLoadingDone) {

                //compare voi 3 ket qua
                if (this.props.tagQuickQueryResult) {
                    this.props.tagQuickQueryResult.map(tag => {
                        if (e.target.value.localeCompare(tag.content) === 0) {
                            console.log("equal");
                            hasOldTag = tag.id; //co tag giong tag cu
                        }
                    })
                }

                //dong search container
                document.getElementById("cr-post-qs-tag-result-container").classList.add('hidden');
                document.getElementById("cr-post-qs-tag-result-container").classList.remove('show');

                //tao moi hoac dung lai tag cu
                let tmpShownTag = this.shownTag;
                if (hasOldTag !== -1) {
                    tags.push({ id: hasOldTag });
                    for (let i = 0; i < tmpShownTag.length; i++) {
                        if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                            tmpShownTag[i].content = e.target.value; tmpShownTag[i].id = hasOldTag; break;
                        }
                    }
                }
                else {
                    tags.push({ content: e.target.value }); //tao ra tag moi
                    for (let i = 0; i < tmpShownTag.length; i++) {
                        if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                            tmpShownTag[i].content = e.target.value; break;
                        }
                    }
                }

                this.setState({
                    CREATE_POST_DTO: {
                        ...this.state.CREATE_POST_DTO,
                        tags: tags
                    }
                });

                //clear tag input 
                e.target.value = ""
            }
        }
    }

    onTagSearchResultClick = (tag) => {
        //kiem tra xem ten co dang bi trung voi tag nao ben duoi khong, 
        //neu khong thi them co id
        let isTheSameContent = -1; // khong cos => -1 neu co => id cua tag 

        this.shownTag.map(_tag => {
            //kiem tra xem tag dang bam co giong tag cu hay khong
            if (tag.content.localeCompare(_tag.content) === 0) {
                console.log("equal content");
                isTheSameContent = _tag.id; //co tag giong tag cu
                return;
            }
            if (tag.id === _tag.id) {
                console.log("equal id");
                isTheSameContent = _tag.id; //co tag giong tag cu
                return;
            }
        })

        //neu trung tag thi khong cho cạp nhat
        if (isTheSameContent === tag.id) {
            console.log("Không thể chọn tag trùng");
            return;
        }

        let tmpTagDTO = this.state.CREATE_POST_DTO.tags;
        tmpTagDTO.push({ id: tag.id });

        //cap nhat lai shownTag theo tmpDTO
        let tmpShownTag = this.shownTag;
        for (let i = 0; i < tmpShownTag.length; i++) {
            if (tmpShownTag[i].content === '' && tmpShownTag[i].id === '') {
                tmpShownTag[i].content = tag.content; tmpShownTag[i].id = tag.id; break;
            }
        }

        //cap nhat lai shown tag tu state
        document.getElementById("cr-post-qs-tag-result-container").classList.add('hidden');
        document.getElementById("cr-post-qs-tag-result-container").classList.remove('show');

        this.setState({
            CREATE_POST_DTO: {
                ...this.state.CREATE_POST_DTO,
                tags: tmpTagDTO
            }
        });
    }

    deleteTag = (item) => {
        //xoa trong shownTag
        //xoa trong DTO

        //xet theo id va content, cap nhat lai shownTag
        if (item.content)
            this.shownTag.map(tag => {
                if (tag.content === item.content)
                    item.content = ''; item.id = '';
            })

        else if (item.id) {
            this.shownTag.map(tag => {
                if (tag.id === item.id)
                    item.content = ''; item.id = '';
            })
        }

        //cap nhat lai tmpDTO theo shownTag
        let tempTagDTO = [];
        this.shownTag.map(tag => {
            if (tag.id || tag.content) {
                tempTagDTO.push({ id: tag.id, content: tag.content })
            }
        })

        //cap nhat lai shownTag theo tmpDTO
        this.shownTag.map(tag => {
            tag.id = ''; tag.content = '';
        })

        tempTagDTO.map((tag, index) => {
            this.shownTag[index].id = tag.id;
            this.shownTag[index].content = tag.content;
        })

        //cap nhat lai DTO theo tmpDTO
        this.setState({
            CREATE_POST_DTO: {
                ...this.state.CREATE_POST_DTO,
                tags: tempTagDTO,
            }
        });
        this.forceUpdate();
    }

    handleClickTag = (item) => {
    }

    //#endregion
    handleEditorChange = (value) => {
        let dom = document.createElement("DIV");
        dom.innerHTML = this.state.CREATE_POST_DTO.content;
        let plain_text = (dom.textContent || dom.innerText);

        if (value.length < 160) {
            this.setState({ CREATE_POST_DTO: { ...this.state.CREATE_POST_DTO, content: value, summary: plain_text } })
            return;
        }
        else {
            this.setState({ CREATE_POST_DTO: { ...this.state.CREATE_POST_DTO, content: value, summary: plain_text.substring(0, 160) } });
            return;
        }
    };

    handleTitleChange = (e) => {
        this.setState({
            CREATE_POST_DTO: { ...this.state.CREATE_POST_DTO, title: e.target.value }
        })
    }

    render() {
        //render likeBtn
        let likeBtn = <img className="like-btn" alt="like" src={unliked_btn} onClick={this.toggleLikeImage} ></img>

        //render saveBtn
        let saveBtn = <div className="d-flex" onClick={this.toggleSaveImage} >
            <img className="save-btn" alt="dislike" src={gray_bookmark_btn} />
            <div>Lưu</div>
        </div >


        if (!this.props.isCategoryLoading && this.props.categories) {
            this.categoryList = this.props.categories;
        }
        let tagSearchResult = <></>;
        if (this.props.isTagQuickQueryLoadingDone) {
            if (this.state.isSearchingTag) {
                this.setState({ isSearchingTag: false })
            }
            if (this.props.tagQuickQueryResult) {

                //truong hop khong co tag nao thoa man va chua du 5 tag
                if (this.state.CREATE_POST_DTO.tags.length < 5) {
                    document.getElementById("cr-post-tag-input").classList.remove('invalid');
                    if (this.props.tagQuickQueryResult.length === 0)
                        document.getElementById("cr-post-tag-container-tip-label").innerText = "Không có kết quả tìm kiếm phù hợp! Bấm Enter để thêm tag mới."
                    else
                        document.getElementById("cr-post-tag-container-tip-label").innerText = "Chọn tag phù hợp với bài viết của bạn.";
                }
                else {
                    document.getElementById("cr-post-tag-container-tip-label").innerText = "Không thể nhập quá 5 tag."
                    document.getElementById("cr-post-tag-input").classList.add('invalid');
                }
                tagSearchResult =
                    this.props.tagQuickQueryResult.map(tag => {
                        return <div className="tag-search-item"
                            onClick={() => { this.state.CREATE_POST_DTO.tags.length < 5 && this.onTagSearchResultClick(tag) }}>
                            <div className="tag-search-item-content">  {tag.content}</div>
                        </div>
                    })
            }
            else {
                tagSearchResult = <>Loading...</>
            }
        }

        let body =
            <div>
                {/* Preview region */}
                <div className="cr-post-form-container doc-post-detail preview" >
                    <Metadata title={this.state.CREATE_POST_DTO.title}
                        category={this.state.currentCategory}
                        readingTime={this.state.CREATE_POST_DTO.readingTime}
                        authorName={this.state.author.displayName}
                        avartarURL={this.state.author.avatarURL}
                        publishDtm={this.state.publishDtm}
                    />
                    <div className="ck-editor-output" dangerouslySetInnerHTML={{ __html: this.state.CREATE_POST_DTO.content }} />

                    <div className="mg-top-10px pd-10px" >
                        {this.shownTag.map(item =>
                            <Tag isReadOnly={true} onDeleteTag={(item) => this.deleteTag(item)} tag={item} />
                        )}
                    </div>
                    <div className="post-reaction-bar">
                        <div className="d-flex mg-top-5px  mg-left-5px">
                            <div className="d-flex">
                                <div className="like-btn">  {likeBtn}</div>
                                <div className="like-count">{0}</div>
                            </div>

                            <div className="d-flex">
                                <div className="save-text-container" onClick={this.toggleSaveImage}>
                                    <div>{saveBtn}</div>
                                </div>
                                <div className="post-comment-count-container">
                                    Bình luận
                                <div style={{ paddingLeft: "5px" }}>
                                        {0}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit region */}
                <div className="cr-post-form-container edit">
                    <div id="create-post-form" className="form-container" onSubmit={this.handleUpload} tabIndex="1">
                        <div className="mg-top-10px" />

                        <div className="form-group">
                            <label className="form-label-required">Tiêu đề:</label>
                            <input className="form-input" id="cr-post-title"
                                placeholder="Nhập tiêu đề bài viết ..." onChange={e => this.handleTitleChange(e)}
                                type="text" ></input>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        {/* CKEditor */}
                        <div className="form-group">
                            <div className="form-label-required">Nội dung:</div>
                            <Editor
                                id="cr-post-cke"
                                placeholder='Start typing here...'
                                onChange={this.handleEditorChange}
                                data="<p>Nhập nội dung bài viết ...</p>"
                                validation
                            />
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="form-group" >
                            <label className="form-label-required">Danh mục:</label>
                            <Combobox id="cr-post-category-combobox"
                                options={this.categoryList}
                                onOptionChanged={(selectedOption) => this.onCategoryOptionChanged(selectedOption)}
                                placeHolder="Chọn danh mục"
                                validation
                            >
                            </Combobox>
                            <div className="form-error-label-container">
                                <span className="form-error-label" ></span>
                            </div>
                        </div >

                        {/* Tag */}
                        <div className='form-group'>
                            <label className="form-label">Tags:</label>

                            <input onChange={(e) => this.quickSearchTags(e)} id="cr-post-tag-input"
                                onKeyPress={(this.state.CREATE_POST_DTO.tags.length < 5) && this.keyHandler}
                                className="form-input"
                                placeholder="Nhập tag ..." />

                            <ClickAwayListener onClickAway={() => this.closeQuickSearchTag()}>
                                {/* khi load xong thi ntn */}
                                <div id="cr-post-qs-tag-result-container" className="form-input-dropdown-container hidden">
                                    <div className="form-input-dropdown">
                                        <div className="d-flex">
                                            {tagSearchResult}
                                        </div>

                                        <div className="form-tip-label" id="cr-post-tag-container-tip-label">

                                        </div>
                                    </div>
                                </div>

                            </ClickAwayListener>

                            <div className="form-tip-label-container">
                                <div className="form-tip-label">Có thể nhập tối đa 5 tag.</div>
                            </div>

                            <div className="mg-top-10px" >
                                {this.shownTag.map(item =>
                                    <Tag isReadOnly={false} onDeleteTag={(item) => this.deleteTag(item)} tag={item} />
                                )}
                            </div>
                            <div className="form-line" />

                        </div>

                        {/* Button */}
                        <div className="form-group d-flex">
                            <button className="blue-button mg-auto form-submit-btn" onClick={() => this.handleUploadBtnClick()}>Đăng bài</button>
                        </div>
                    </div >
                </div >
            </div >
        let modal = <></>
        if (this.props.isUploadDone) {
            modal = <CustomModal
                open={this.props.isUploadDone}
                shadow={true}
                title={this.props.uploadMessage.type === 'success' ? 'Thành công' : 'Thất bại'}
                text={this.props.uploadMessage.message}
                type={this.props.uploadMessage.type === 'success' ? "alert_success" : "alert_failure"}
                closeModal={() => { this.isNotifySuccessOpen = false; window.location.pathname = '/user/my-posts'; this.setState({}) }}
            >
            </CustomModal>
        }
        return (
            <div className="left-sidebar-layout">
                <UserSidebar />
                <div className="content-layout">
                    <Titlebar title="TẠO BÀI VIẾT MỚI" />
                    <div className="content-container">
                        <div className="form-container">
                            <div className="j-c-end">
                                <div className="j-c-end" >
                                    <button className="blue-button" disabled={!this.state.isPreview} onClick={this.onEditBtnClick} >Soạn bài viết</button>
                                    <div className="mg-right-5px" />
                                    <button className="white-button" disabled={this.state.isPreview} onClick={this.onPreviewBtnClick} >Preview</button>
                                </div>
                            </div>
                            <div className="mg-top-10px decoration-line" />
                        </div>
                        {body}
                    </div>
                </div>

                {/* Custom for notifing success */}
                {modal}

            </div>

        );
    }

    onEditBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".cr-post-form-container.preview").classList.remove("d-block");
        document.querySelector(".cr-post-form-container.edit").classList.remove("d-none");
        document.querySelector(".cr-post-form-container.preview").classList.add("d-none");
        document.querySelector(".cr-post-form-container.edit").classList.add("d-block");

    }

    onPreviewBtnClick = () => {
        this.setState({ isPreview: !this.state.isPreview });
        document.querySelector(".cr-post-form-container.preview").classList.add("d-block");
        document.querySelector(".cr-post-form-container.edit").classList.add("d-none");
        document.querySelector(".cr-post-form-container.preview").classList.remove("d-none");
        document.querySelector(".cr-post-form-container.edit").classList.remove("d-block");
        console.log(this.state);
    }
}

const mapStateToProps = (state) => {
    console.log(state);

    return {
        categories: state.post_category.categories.data,
        isCategoryLoading: state.post_category.categories.isLoading,
        tagQuickQueryResult: state.tag.tagQuickQueryResult.data,
        isTagQuickQueryLoading: state.tag.tagQuickQueryResult.isLoading,
        //sau nay su dung loading de tranh cac truong hop ma 2 bien isSearching va isLoadDone khong xu ly duoc 
        isTagQuickQueryLoadingDone: state.tag.tagQuickQueryResult.isLoadingDone,

        //upload thanh cong hay khong
        isUploadDone: state.post.createPost.isLoadingDone,
        uploadMessage: state.post.createPost.notification
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPostCategories,
    getTagQuickQueryResult,
    postCreatePost
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));

