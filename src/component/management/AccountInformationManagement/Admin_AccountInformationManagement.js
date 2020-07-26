/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import '../ManagementPage'
import Management_Titlebar from '../management_components/Management_Titlebar/Management_Titlebar'
import CustomModal from '../../shared_components/CustomModalPopup/CustomModal'
import gray_upload_icon from '../../../img/gray_upload_icon.png'
import gray_write_icon from '../../../img/gray_write_icon.png'

import './Management_AccountInformationManagement.scss'
import './Management_AIMResponsiveLayout.scss'
import { ClickAwayListener, CircularProgress } from '@material-ui/core'
import dropdown_btn from '../../../img/dropdown_icon.png'
import white_dropdown_btn from '../../../img/white_dropdown_icon.png'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Management_UpdatePassword from './Management_UpdatePassword'
import { isContainSpecialCharacter } from '../../../utils/Utils'
import ImageUploader from 'react-images-upload'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from '../../../service/UserAPI'

class Management_AccountInformationManagement extends Component {
    constructor(props) {
        super(props);
        //initiate data from props:
        //if value been set by a string, db didn't match it.

        //from user API
        this.accountInformation = [];
        this.displayName = "Nguyễn Văn Đông";
        this.userID = "";
        this.password = "";
        this.avatar = "";
        this.email = "";
        this.score = "";
        this.postCount = 0;
        this.documentCount = 0;
        this.roleID = 2;
        this.roleName = "";

        //from Role API:
        this.roleList = [
            {
                roleID: 1,
                roleName: "MANAGEMENT",
                role: "Management"
            },
            {

                roleID: 2,
                roleName: "COLLABORATOR",
                role: "Collaborator"
            },
            {
                id: 2,
                roleName: "USER",
                role: "User"
            }
        ];

        //for popup
        this.isChangeRoleConfirmationPopupOpen = false;
        this.passwordString = "";
        this.canClickSaveInformation = false;
        this.isAnySuccessAlertPopupOpen = false;
        this.isAnyFailedAlertPopupOpen = false;

        this.isChangeRoleConfirmationPopupOpen = false;
        this.isUpdateInformationPopupOpen = false;
        this.isAnyChangeRoleDropdownComboboxOpen = false;

        this.isUpdateAvatarPopupOpen = false;
        this.isHaveAnyImageInFileLoader = false;
        //for valid input
        this.isDisplayNameEmpty = false;
        this.isDisplayNameContainSpecialCharacters = false;



        this.updateInformation_DTO = {
            displayName: "",
            avatarFile: []
        }

        this.state = {
            pictures: []
        }
    }

    componentDidMount() {
        // (this.props);
        this.props.getCurrentUser();
        // this.props.roleList = this.roleList;
    }



    render() {

        if (!this.props.accountInformation !== null && this.props.accountInformation !== undefined) {
            this.accountInformation = this.props.accountInformation;
            this.displayName = this.accountInformation.displayName;
            this.userID = "";
            this.password = "";
            this.avatar = "";
            this.email = "";
            this.score = "";
            this.postCount = 0;
            this.documentCount = 0;
            this.roleID = 2;
            this.roleName = "";

            let roles_Combobox =
                // this.props.roleList.map(role =>
                this.roleList.map(role =>
                    this.props.accountInformation.roleID === role.id ?
                        <div className="Activated_Dropdown_Combobox_Sub_Item" id={"user-role-dropdown-combobox-sub-item-" + role.id} value={role.role} key={role.id}>{role.role}</div> :
                        <div className="Dropdown_Combobox_Sub_Item" id={"user-role-dropdown-combobox-sub-item-" + role.id} value={role.role} key={role.id}
                            onClick={() => this.handleDropDownMenuItemClick(role.id)}> {role.role}
                        </div>
                )
            // ("*");
            // (this.userID);

            return (
                <div>

                    <Management_Titlebar title="THÔNG TIN TÀI KHOẢN" />

                    <div className="Management_Show_Port">
                        <div className="Management_Show_Port_Bounding_Port">


                            <div className="Management_Account_Information_Bounding_Port">
                                <div className="Account_Information_Port">

                                    {/* <div className="Simple_Gray_Label">Avatar: </div> */}
                                    <div className="Account_Information_Avatar_Port">
                                        <img className="Account_Information_Avatar_Image" alt="avatar" src="https://i.imgur.com/SZJgL6C.jpg" ></img>
                                        {/* // src={this.props.accountInformation.avartar} /> */}

                                        {/* <div className="margin_left_10px"></div> */}

                                        {/* <div>{this.props.</div> */}
                                    </div>
                                    <div className="Simple_Blue_Button margin_auto " style={{ marginBottom: "20px", marginTop: "10px" }} onClick={() => this.handlerClickUpdateAvatar()}>Cập nhật avatar</div>

                                    <div className="display_flex">
                                        <div className="Simple_Gray_Label" style={{ lineHeight: "25px" }}>Role:</div>
                                        <ClickAwayListener onClickAway={() => { this.closeAllChangeRoleDropdownCombobox() }}>

                                            <div style={{ position: "relative", display: "flex", width: "100%", zIndex: 10000 }}>
                                                <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                                    <div style={{ position: "absolute", width: "200px" }}>
                                                        <div className="Disable_Parent_Dropdown_Combobox" id={"user-role-parent-dropdown-combobox"}>
                                                            {/* // onClick={(e) => this.handleDropDownMenuClick(e, "user-role-parent-dropdown-combobox", "user-role-parent-dropdown-combobox-text", "user-role-dropdown-btn-element", "user-role-dropdown-combobox-container")}> */}
                                                            <div className="display_flex">
                                                                <div className="Vertical_Menu_Item_Text" id={"user-role-parent-dropdown-combobox-text"}>
                                                                    {this.props.accountInformation.roleId ?
                                                                        this.roleList[this.props.accountInformation.roleId].role : "User"
                                                                    }
                                                                </div>
                                                            </div>
                                                            <img alt="v" className="Dropdown_Btn_Element" src={dropdown_btn} id={"user-role-dropdown-btn-element"} />
                                                        </div>

                                                        {this.isChangeRoleDropdownComboboxOpen ? (
                                                            <div className="Dropdown_Combobox_Container" id={"user-role-dropdown-combobox-container"}>
                                                                {roles_Combobox}
                                                                <div className="margin_bottom_5px" />
                                                                <div className="margin_bottom_5px" />
                                                            </div>
                                                        ) : <div id={"user-role-dropdown-combobox-container"}></div>}

                                                    </div>
                                                </div>
                                            </div>
                                        </ClickAwayListener>
                                    </div>

                                    <div className="margin_top_5px" />

                                    <div className="Account_Information_Achivement_Port">
                                        <div className="Account_Information_Achivement_Score">Scrore: {this.props.accountInformation.score}</div>
                                        <div className="Account_Information_Achivement_Post_Doc_Count_Port">
                                            <div className="display_flex width_50_percents">
                                                <img alt="post count" src={gray_write_icon} className="User_Item_Element" ></img>
                                                <div className="margin_left_5px">{this.props.accountInformation.postCount}</div>
                                            </div>
                                            <div className="display_flex width_50_percents">
                                                <img alt="upload count" src={gray_upload_icon} className="User_Item_Element"></img>
                                                <div className="margin_left_5px"> {this.props.accountInformation.documentCount}</div>
                                            </div>
                                        </div>
                                    </div >
                                </div>
                            </div>
                            <div className="Management_Account_Information_Bounding_Port">

                                <div className="Account_Information_Port">
                                    {(window.location.pathname === "/management" || window.location.pathname === "/management/") ?
                                        <div>
                                            {/* Display name */}
                                            <div className="position_relative">
                                                < div className="Simple_Gray_Label Is_Form_Label">
                                                    Họ tên:
                                                </div>
                                                <input type="text" className="Simple_Text_Input"
                                                    defaultValue={this.displayName} id="management-display-name-text-input"
                                                    onChange={(e) => this.handlerChangeUserDisplay(e)} />
                                                <div className="Simple_Error_Label" hidden={!this.isDisplayNameEmpty} >
                                                    *Tên không được để trống.
                                                </div>
                                                <div className="Simple_Error_Label" hidden={!this.isDisplayNameContainSpecialCharacters} >
                                                    *Tên không được chứa các ký tự đặc biệt.
                                                </div>
                                            </div>

                                            {/* Username */}
                                            <div className="Simple_Gray_Label Is_Form_Label">
                                                Username:
                                            </div>
                                            <input disabled type="text" className="Simple_Text_Input" defaultValue={this.props.accountInformation.username} />

                                            {/* Password */}
                                            <div className="Simple_Gray_Label Is_Form_Label">
                                                Password:
                                            </div>
                                            <input disabled type="text" className="Simple_Text_Input" value={this.generatePassword()} />

                                            {/* Email */}
                                            <div className="Simple_Gray_Label Is_Form_Label">
                                                Email:
                                            </div>
                                            <input disabled type="text" className="Simple_Text_Input" defaultValue={this.props.accountInformation.email} />

                                            <div className="display_flex margin_top_10px" >
                                                <button disabled={!this.canClickSaveInformation} className="Simple_Blue_Button margin_auto" onClick={() => this.handlerClickSaveInformation()} >
                                                    Lưu thay đổi
                                            </button>
                                            </div>
                                        </div>
                                        :
                                        < Management_UpdatePassword />
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* </div > */}

                    {/* #region Popup region */}

                    {/* modal success alert */}
                    <CustomModal
                        open={this.isAnySuccessAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_success"
                        closeModal={() => { this.isAnySuccessAlertPopupOpen = false; this.setState({}) }}
                    />

                    {/* modal success alert */}
                    <CustomModal
                        open={this.isAnyFailedAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_failed"
                        closeModal={() => { this.isAnyFailedAlertPopupOpen = false; this.setState({}) }}
                    />

                    {/* for verify change role */}
                    <CustomModal
                        open={this.isChangeRoleConfirmationPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="confirmation"
                        closeModal={() => this.closeChangeRoleConfirmationPopup()}
                    >

                        {/* code footer to handler event in parent class (if you want to show a confirmation modal) */}
                        <button className="Simple_Blue_Button margin_right_5px" onClick={() => this.handlerVerifyChangeRoleConfirmation()}>OK</button>
                        <button className="Simple_White_Button" onClick={() => this.handlerCancelChangeRoleConfirmation()}>Cancel</button>
                    </CustomModal>

                    {/* modal for veritfy update informartion */}
                    <CustomModal
                        open={this.isUpdateInformationPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="confirmation"
                        closeModal={() => this.closeUpdateInformationConfirmationPopup()}
                    >

                        {/* code footer to handler event in parent class (if you want to show a confirmation modal) */}
                        <div className="Simple_Gray_Label">Xác nhận?</div>
                        <div style={{ display: "flex" }}>
                            <button className="Simple_Blue_Button margin_right_5px" onClick={() => this.handlerVerifyUpdateInformation()}>OK</button>
                            <button className="Simple_White_Button" onClick={() => this.handlerCancelVerifyUpdateInformation()}>Cancel</button>
                        </div>
                    </CustomModal>

                    {/* Popup for update avatar */}
                    <CustomModal open={this.isUpdateAvatarPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="custom"
                        closeModal={() => this.closeUpdateAvatarPopup()}
                    >
                        <div className="Custom_Modal_Body">
                            <ImageUploader
                                withIcon={true}
                                buttonText='Tải ảnh lên'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                singleImage={true}
                                withPreview={true}
                                labelClass="Simple_Gray_Label"
                            ></ImageUploader>
                        </div>
                        {this.isHaveAnyImageInFileLoader
                            ?
                            <div className="Custom_Modal_Footer">

                                <div className="Simple_Gray_Label">Xác nhận?</div>
                                <div style={{ display: "flex" }}>
                                    <button className="Simple_Blue_Button margin_right_5px" onClick={() => this.handlerVerifyUpdateAvatarConfirmation()}>OK</button>
                                    <button className="Simple_White_Button" onClick={() => { this.isUpdateAvatarPopupOpen = false; this.setState({}) }}>Cancel</button>
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </CustomModal>
                    {/* #endregion */}
                    <div src={this.state.pictures[0]}></div>
                </div >

            );
        }
        return <></>
    }

    //#region handle for popup 

    //for general alert popup
    openSuccessAlertPopup = () => {
        this.isAnySuccessAlertPopupOpen = true;
        this.setState();
    }

    openFailedSuccessAlertPopup = () => {
        this.isAnyFailedAlertPopupOpen = true;
        this.setState({});
    }

    //for change role
    closeChangeRoleConfirmationPopup = (roleID) => {
        this.isChangeRoleConfirmationPopupOpen = false;
        this.setState({});
    }

    closeUpdateInformationConfirmationPopup = () => {
        this.isUpdateInformationPopupOpen = false;
        this.setState({});
    }

    //for update avatar
    closeUpdateAvatarPopup = () => {
        this.isUpdateAvatarPopupOpen = false;
        this.setState({});
    }


    //for update information
    //#endregion


    //#region support initate value for rendering and handler image drop
    generatePassword = () => {
        let _passwordString = "";
        (String(this.props.accountInformation.password));
        if (this.props.accountInformation.password !== undefined) {
            for (let i = 0; i < this.props.accountInformation.password.length; i++) {
                _passwordString += "*";
            }
        }
        return _passwordString;
    }

    onDrop = (pictureFile) => {
        this.setState({
            pictures: this.state.pictures.concat(pictureFile),
        });
        this.updateInformation_DTO.avatarFile = pictureFile;
        this.isHaveAnyImageInFileLoader = true;
        if (this.updateInformation_DTO.avatarFile[0] === undefined || this.updateInformation_DTO.avatarFile[0] === null)
            this.isHaveAnyImageInFileLoader = false;
        this.setState({});
    }
    //#endregion

    //#region handler combobox role and change role

    handleDropDownMenuClick = (e, parent_id, show_text_id, dropdown_element_id, container_id) => {
        e.preventDefault();

        let parent_menu_item = document.getElementById(parent_id);
        let dropdown_element = document.getElementById(dropdown_element_id);
        let show_text = document.getElementById(show_text_id);
        let dropdown_container = document.getElementById(container_id);

        if (dropdown_container.style.display === "block") {
            dropdown_container.style.display = "none";
            parent_menu_item.style.background = "white";
            parent_menu_item.style.paddingLeft = "0px";
            show_text.style.color = "#363636";
            dropdown_element.src = dropdown_btn;
        }
        else {
            parent_menu_item.style.background = "#5279DB"
            dropdown_container.style.display = "block";
            parent_menu_item.style.paddingLeft = "10px";
            show_text.style.color = "white";
            dropdown_element.src = white_dropdown_btn;
        }

        this.isChangeRoleDropdownComboboxOpen = true;
        this.setState({});
    }

    handleDropDownMenuItemClick = (roleID) => {
        //change current UI
        let item_id = "user-role-dropdown-combobox-sub-item-" + roleID;
        let sub_dropdown_item = document.getElementById(item_id);

        for (let i = 0; i < this.roleList.length; i++) {
            let sub_dropdown_item_index_id = "user-role-dropdown-combobox-sub-item-" + i;
            // (sub_dropdown_item_index_id);
            let sub_dropdown_item_index = document.getElementById(sub_dropdown_item_index_id);
            sub_dropdown_item_index.className = "Dropdown_Combobox_Sub_Item";
        }

        sub_dropdown_item.className = "Activated_Dropdown_Combobox_Sub_Item";
        this.props.accountInformation.roleID = roleID;

        // open a confirmation popup
        this.openChangeRoleConfirmationPopup(roleID);
    }

    openChangeRoleConfirmationPopup = (roleID) => {
        this.closeAllChangeRoleDropdownCombobox();
        this.notifyHeader = "Xác nhận?";
        this.notifyContent = "Xác nhận thay đổi quyền người dùng?";
        this.setState({ isChangeRoleConfirmationPopupOpen: true });
    }

    closeAllChangeRoleDropdownCombobox = () => {

        if (this.isChangeRoleDropdownComboboxOpen === true) {
            let parent_id = "user-role-parent-dropdown-combobox";
            let show_text_id = "user-role-parent-dropdown-combobox-text";
            let dropdown_element_id = "user-role-dropdown-btn-element";
            let container_id = "user-role-dropdown-combobox-container";

            let parent_menu_item = document.getElementById(parent_id);
            let dropdown_element = document.getElementById(dropdown_element_id);
            let show_text = document.getElementById(show_text_id);
            let dropdown_container = document.getElementById(container_id);

            if (dropdown_container.style.display === "block") {
                dropdown_container.style.display = "none";
                parent_menu_item.style.background = "white";
                parent_menu_item.style.paddingLeft = "0px";
                show_text.style.color = "#363636";
                dropdown_element.src = dropdown_btn;
            }
            this.isChangeRoleDropdownComboboxOpen = false;
            this.setState({})
        }

    }

    //#endregion

    //#region validator for display name input
    handlerChangeStateOfSubmitButton = () => {
        this.canClickSaveInformation = true;
        this.isDisplayNameEmpty = false;
        this.isDisplayNameContainSpecialCharacters = false;

        if ((this.updateInformation_DTO.displayName === ""
            || this.updateInformation_DTO.displayName === null)) {
            this.canClickSaveInformation = false;
            this.isDisplayNameEmpty = true;
            console.log(
                "A"
            )
            this.setState({});
            return;
        }

        if (isContainSpecialCharacter(this.updateInformation_DTO.displayName)) {
            this.canClickSaveInformation = false;
            this.isDisplayNameContainSpecialCharacters = true;
            this.setState({});
            return;
        }

        this.setState({});
    }

    handlerChangeUserDisplay = (e) => {
        this.updateInformation_DTO.displayName = e.target.value;
        console.log(this.updateInformation_DTO.displayName);
        this.handlerChangeStateOfSubmitButton();
    }

    //#endregion

    //#region main handler event and call APIs

    handlerClickSaveInformation = () => {
        this.notifyContent = "Xác nhận cập nhật thông tin?";
        this.notifyHeader = "Cập nhật thông tin";
        this.isUpdateInformationPopupOpen = true;
        this.setState({});
    }

    handlerVerifyUpdateInformation = () => {
        //.. call API
        this.isUpdateInformationPopupOpen = false;
        this.canClickSaveInformation = false;
        this.notifyHeader = "Thành công";
        this.notifyContent = "Cập nhật thông tin thành công!";
        this.openSuccessAlertPopup();
        this.setState({});

    }

    handlerCancelVerifyUpdateInformation = () => {
        document.getElementById("management-display-name-text-input").value = this.displayName;
        this.isUpdateInformationPopupOpen = false;
        this.canClickSaveInformation = false;
        this.setState({});
    }

    handlerVerifyChangeRoleConfirmation = (roleID) => {
        // send request to server   
        //...

        this.closeChangeRoleConfirmationPopup();
    }

    handlerCancelChangeRoleConfirmation = () => { //phai co popup thi moi test duoc
        this.roleID = this.recover_roleID;
        this.closeChangeRoleConfirmationPopup();
    }

    handlerClickUpdateAvatar = () => {
        this.isUpdateAvatarPopupOpen = true;
        this.notifyContent = "Chọn ảnh:";
        this.notifyHeader = "Cập nhật avatar";
        this.setState({});
    }

    handlerVerifyUpdateAvatarConfirmation = () => {

        //call API to update avatar.
        this.isUpdateAvatarPopupOpen = false;
        this.notifyContent = "Cập nhật ảnh đại diện thành công!";
        this.notifyHeader = "Thành công";
        this.isAnySuccessAlertPopupOpen = true;
        this.setState({});
    }

    //#endregion
}

//#region for Redux
const mapStatetoProps = (state) => {
    // (state);
    return {
        accountInformation: state.user.account
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCurrentUser
}, dispatch);

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Management_AccountInformationManagement));
 //#endregion