/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'
import 'pages/management/AdminLayout'
import Titlebar from 'components/common/Titlebar/Titlebar'
import CustomModal from 'components/common/CustomModalPopup/CustomModal'
import { isContainSpecialCharacter } from 'utils/Utils'

//import for Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser, getLogout } from 'services/UserAPI'

import Cookies from 'js-cookie'
import { PORT } from 'constants/constants'

class UpdatePassword extends Component {
    constructor(props) {
        super();

        //check condition to open popups
        this.isChangeRoleConfirmationPopupOpen = false;
        this.isAnyChangeRoleDropdownComboboxOpen = false;
        this.isAnyFailedAlertPopupOpen = false;
        this.isAnySuccessAlertPopupOpen = false;

        //check condition to disable update password button
        this.canClickSavePassword = false;

        //for show error labels
        this.isCurrentPasswordEmpty = false;
        this.isCurrentPasswordLessThan6Characters = false;
        this.isCurrentPasswordContainSpecialCharacters = false;

        this.isNewPasswordEmpty = false;
        this.isNewPasswordLessThan6Characters = false;
        this.isNewPasswordContainSpecialCharacters = false;

        this.isConfirmationPasswordEmpty = false;
        this.isConfirmationPasswordLessThan6Characters = false;
        this.isConfirmationPasswordContainSpecialCharacters = false;

        this.isAnySuccessLogoutAlertPopupOpen = false;

        this.updatePassword_DTO = {
            currentPassword: "",
            newPassword: "",
            confirmationPassword: "",
        }
        this.username = "";
    }


    componentDidMount() {
        this.props.getCurrentUser();
    }


    render() {
        if (this.props.accountInformation) {
            this.username = this.props.username;
            return (

                <div>
                    {/* <div className="Account_Information_Bounding_Layout"> */}
                    <form onSubmit={(e) => this.handlerUpdatePassword(e)} autoComplete="off" >

                        <div className="Simple_Gray_Label " style={{ textAlign: "center", color: "#5279db", fontSize: "1.3rem" }}>Cập nhật mật khẩu</div>

                        {/* Current password */}
                        <div className="position_relative" >
                            <div className="Simple_Gray_Label margin-top-10px">
                                Mật khẩu hiện tại:
                                    </div>
                            <input type="password" autoComplete="new-password" defaultValue="" placeholder="Nhập mật khẩu hiện tại ..." className="form-input" onChange={(e) => this.handlerChangeCurrentPassword(e)} />
                            <div className="error-label" hidden={!this.isCurrentPasswordEmpty} >
                                *Mật khẩu hiện tại không được để trống.
                                    </div>
                        </div>

                        {/* New password */}
                        <div className="position_relative" >
                            <div className="Simple_Gray_Label Is_Form_Label">
                                Mật khẩu mới:
                                    </div>
                            <input type="password" defaultValue="" autoComplete="off" placeholder="Nhập mật khẩu mới ..." className="form-input" onChange={(e) => this.handlerChangeNewPassword(e)} />
                            <div className="error-label" hidden={!this.isNewPasswordEmpty} >
                                *Mật khẩu mới không được để trống.
                                    </div>
                            <div className="error-label" hidden={!this.isNewPasswordLessThan6Characters} >
                                *Mật khẩu mới không được ít hơn 6 ký tự.
                                    </div>
                            <div className="error-label" hidden={this.isNewPasswordLessThan6Characters || !this.isNewPasswordContainSpecialCharacters} >
                                *Mật khẩu mới không được chứa các ký tự đặc biệt.
                                    </div>

                        </div>

                        {/* Confirm new password */}
                        <div className="position_relative" >
                            <div className="Simple_Gray_Label Is_Form_Label">
                                Xác nhận mật khẩu:
                                </div>
                            <input type="password" autoComplete="off" defaultValue="" placeholder="Nhập lại mật khẩu mới ..." className="form-input" onChange={(e) => this.handlerChangeConfirmationPassword(e)} />
                            <div className="error-label" hidden={!this.isConfirmationPasswordEmpty} >
                                *Mật khẩu xác nhận không được để trống.
                                    </div>
                            <div className="error-label" hidden={!this.isConfirmationPasswordLessThan6Characters} >
                                *Mật khẩu xác nhận không được ít hơn 6 ký tự.
                                    </div>
                            <div className="error-label" hidden={this.isConfirmationPasswordLessThan6Characters || !this.isConfirmationPasswordContainSpecialCharacters} >
                                *Mật khẩu xác nhận không được chứa các ký tự đặc biệt.
                                    </div>

                        </div>
                        <div className="flex_container" >
                            <button className="blue-button Is_Form_Button" disabled={!this.canClickSavePassword} onClick={(e) => this.handlerUpdatePassword(e)}>
                                Xác nhận
                                    </button>
                        </div>

                    </form>
                    {/* </div> */}


                    {/* modal for verifing change role */}
                    <CustomModal
                        open={this.isChangeRoleConfirmationPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="confirmation"
                        closeModal={() => this.closeChangeRoleConfirmationPopup()}
                    >

                        {/* code footer to handler event in parent class (if you want to show a confirmation modal) */}
                        <button className="blue-button margin_right_5px" onClick={() => this.handlerVerifyChangeRoleConfirmation()}>OK</button>
                        <button className="white-button" onClick={() => this.handleCancelChangeRoleConfirmation()}>Cancel</button>
                    </CustomModal>

                    {/* modal for notification anything */}
                    <CustomModal
                        open={this.isAnyFailedAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_fail"
                        closeModal={() => this.closeFailedAlertPopup()}
                    >
                    </CustomModal>

                    <CustomModal
                        open={this.isAnySuccessAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_success"
                        closeModal={() => this.closeSuccessAlertPopup()}
                    >
                    </CustomModal>

                    {/* for popup and logout */}
                    <CustomModal
                        open={this.isAnySuccessLogoutAlertPopupOpen}
                        shadow={true}
                        title={this.notifyHeader}
                        text={this.notifyContent}
                        type="alert_success"
                        closeModal={() => { this.props.getLogout(); this.isAnySuccessLogoutAlertPopupOpen = false; window.location.pathname = "/"; this.setState({}) }}
                    >
                    </CustomModal>

                </div >
            );
        }
        return <></>;
    }

    //#region handler popup region
    closeChangeRoleConfirmationPopup = () => {
        this.isChangeRoleConfirmationPopupOpen = false;
        this.setState({});
    }

    openFailedAlertPopup = () => {
        this.isAnyFailedAlertPopupOpen = true;
        this.setState({});
    }
    openSuccessAlertPopup = () => {
        this.isAnySuccessAlertPopupOpen = true;
        this.setState({});
    }
    closeFailedAlertPopup = () => {
        this.isAnyFailedAlertPopupOpen = false;
        this.setState({});
    }

    closeSuccessAlertPopup = () => {
        this.isAnySuccessAlertPopupOpen = false;
        this.setState({});
    }

    //#endregion

    //#region handler change text inputs
    handlerChangeCurrentPassword = (e) => {
        e.preventDefault();
        this.updatePassword_DTO.currentPassword = e.target.value;
        if (this.updatePassword_DTO.currentPassword === "" || this.updatePassword_DTO.currentPassword === null) {
            this.isCurrentPasswordEmpty = true;
        } else
            this.isCurrentPasswordEmpty = false;
        this.handlerChangeStateOfSubmitButton();
    }

    handlerChangeNewPassword = (e) => {
        e.preventDefault();
        this.updatePassword_DTO.newPassword = e.target.value;
        if (this.updatePassword_DTO.newPassword === ""
            || this.updatePassword_DTO.newPassword === null) {
            this.isNewPasswordEmpty = true;
            this.canClickSavePassword = false;

        }
        else
            this.isNewPasswordEmpty = false;

        if ((this.updatePassword_DTO.newPassword !== ""
            && this.updatePassword_DTO.newPassword !== null)
            && this.updatePassword_DTO.newPassword.length < 6) {
            this.isNewPasswordLessThan6Characters = true;
            this.canClickSavePassword = false;

        }
        else
            this.isNewPasswordLessThan6Characters = false;

        if (isContainSpecialCharacter(this.updatePassword_DTO.newPassword)) {
            this.isNewPasswordContainSpecialCharacters = true;
            this.canClickSavePassword = false;

        }
        else
            this.isNewPasswordContainSpecialCharacters = false;

        this.handlerChangeStateOfSubmitButton();
    }

    handlerChangeConfirmationPassword = (e) => {
        e.preventDefault();
        this.updatePassword_DTO.confirmationPassword = e.target.value;
        //check confirmation password
        if (this.updatePassword_DTO.confirmationPassword === ""
            || this.updatePassword_DTO.confirmationPassword === null) {
            this.isConfirmationPasswordEmpty = true;
            this.canClickSavePassword = false;
        }
        else
            this.isConfirmationPasswordEmpty = false;

        if ((this.updatePassword_DTO.confirmationPassword !== ""
            && this.updatePassword_DTO.confirmationPassword !== null)
            && this.updatePassword_DTO.confirmationPassword.length < 6) {
            this.isConfirmationPasswordLessThan6Characters = true;
            this.canClickSavePassword = false;
        }
        else
            this.isConfirmationPasswordLessThan6Characters = false;

        if (isContainSpecialCharacter(this.updatePassword_DTO.confirmationPassword)) {
            this.isConfirmationPasswordContainSpecialCharacters = true;
            this.canClickSavePassword = false;
        }
        else
            this.isConfirmationPasswordContainSpecialCharacters = false;

        this.handlerChangeStateOfSubmitButton();
    }

    handlerChangeStateOfSubmitButton = () => {
        this.canClickSavePassword = true;

        //check current password
        console.log(this.updatePassword_DTO.currentPassword)
        if (this.updatePassword_DTO.currentPassword === ""
            || this.updatePassword_DTO.currentPassword === null) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        //check new password
        if (this.updatePassword_DTO.newPassword === ""
            || this.updatePassword_DTO.newPassword === null) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        if ((this.updatePassword_DTO.newPassword !== ""
            && this.updatePassword_DTO.newPassword !== null)
            && this.updatePassword_DTO.newPassword.length < 6) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        if (isContainSpecialCharacter(this.updatePassword_DTO.newPassword)) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        //check confirmation password
        if (this.updatePassword_DTO.confirmationPassword === ""
            || this.updatePassword_DTO.confirmationPassword === null) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        if ((this.updatePassword_DTO.confirmationPassword !== ""
            && this.updatePassword_DTO.confirmationPassword !== null)
            && this.updatePassword_DTO.confirmationPassword.length < 6) {

            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        if (isContainSpecialCharacter(this.updatePassword_DTO.confirmationPassword)) {
            this.canClickSavePassword = false;
            this.setState({});
            return;
        }

        this.setState({});
    }
    //#endregion

    //#region main handler to call APIs 
    handlerUpdatePassword = (e) => {
        e.preventDefault();
        console.log(this.newPassword);
        //check if new password and confirmation pass word is the same?
        if (this.updatePassword_DTO.confirmationPassword !== this.updatePassword_DTO.newPassword) {
            this.notifyContent = "Thất bại";
            this.notifyContent = "Mật khẩu mới và mật khẩu xác nhận không khớp nhau!";
            this.openFailedAlertPopup();
            return;
        }

        var urlencoded = new URLSearchParams();

        urlencoded.append("username", this.username);
        urlencoded.append("oldPasword", this.updatePassword_DTO.currentPassword);
        urlencoded.append("password", this.updatePassword_DTO.newPassword);

        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`http://${PORT}/account/update?sessionID=` + Cookies.get('JSESSIONID'), requestOptions)
            .then(response => response.text())
            .then(result => {
                if (JSON.parse(result).statusCode === 20) {
                    console.log(result);
                    this.isUpdatePasswordPopupOpen = false;
                    this.canClickSavePassword = false;
                    this.notifyHeader = "Thành công";
                    this.notifyContent = "Bạn cần đăng nhập lại!";
                    this.isAnySuccessLogoutAlertPopupOpen = true;
                    this.setState({});
                    return;
                }
                console.log(result);
                this.isUpdatePasswordPopupOpen = false;
                this.canClickSavePassword = false;
                this.notifyHeader = "Thất bại";
                this.notifyContent = "Cập nhật mật khẩu không thành công!";
                this.isAnyFailedAlertPopupOpen = true;
                this.setState({});

            }
            )
            .catch(error => console.log('error', error));

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
    getCurrentUser, getLogout
}, dispatch);

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UpdatePassword));
 //#endregion