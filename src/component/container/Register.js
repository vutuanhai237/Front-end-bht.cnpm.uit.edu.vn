import React from "react";
import { Form, Button, Col, Modal, Image } from "react-bootstrap";
import "./Register.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import logo from "../../img/logo-bht.png";
import { bindActionCreators } from 'redux';
import { postRegister } from "../../service/UserAPI"
class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            modalMessage: "Đăng ký thất bại",
            usernameAlert: "",
            emailAlert: "",
            passwordAlert: "",
            password2Alert: "",
       
            

            isRegisterSuccess: false,
            uploadFileName: "",
            account: {
                username: "",
                password: "",
                password2: "",
                email: "",
                file: null,

            }
        };

        this.username = React.createRef("");
        this.password = React.createRef("");
        this.password2 = React.createRef("");
        this.email = React.createRef("");
        this.handleClose = this.handleClose.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.changeUploadFileName = this.changeUploadFileName.bind(this);
       
    }

    componentDidMount() {
        this.myInterval = null;
        function myTimer() {
            if (this.state.usernameAlert === "" && this.state.passwordAlert === ""
            && this.state.password2Alert === "" && this.state.emailAlert === "") {
                this.setState({
                    isRegisterSuccess: true,
                }) 
            } else {
                this.setState({
                    isRegisterSuccess: false,
                }) 
            }
            console.log(this.state.isRegisterSuccess);
        }
      
        this.myInterval = setInterval(myTimer.bind(this), 1000);
    }

    changeUploadFileName(evt) {
        this.setState({
            account: { ...this.state.account, uploadFileName: evt.target.files[0].name, file: evt.target.files[0] }
        })
    }

    handleUsernameChange() {
        if (this.username.current.value === "") {
            this.setState({
                usernameAlert: "Tên đăng nhập không được bỏ trống!",
            })
        } else {
            this.setState({
                usernameAlert: "",
            })
        }
        this.setState({
            account: { ...this.state.account, username: this.username.current.value, }
        });
    }

    handlePasswordChange() {
        if (this.password.current.value === "") {
            this.setState({
                passwordAlert: "Mật khẩu không được bỏ trống!",
            })
        } else {
            this.setState({
                passwordAlert: "",
            })
        }
        this.setState({
            account: { ...this.state.account, password: this.password.current.value, }
        })
    }

    handlePassword2Change() {
        if (this.password2.current.value !== this.password.current.value) {
            this.setState({
                password2Alert: "Mật khẩu xác nhận chưa khớp!",
            })
        } else {
            this.setState({
                password2Alert: "",
            })
        }
        this.setState({
            account: { ...this.state.account, password2: this.password2.current.value, }
        })
    }

    handleEmailChange() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(this.email.current.value).toLowerCase())) {
            this.setState({
                emailAlert: "",
            })
        } else {
            this.setState({
                emailAlert: "Email không đúng định dạng!",
            })
        }
        this.setState({
            account: { ...this.state.account, email: this.email.current.value, }
        })
    }

    register() {
        this.setState({
            isRegisterSuccess: true,
            modalShow: true,
        });
        console.log(this.state.account);
        this.props.postRegister(this.state.account);
    }
    handleClose() {
        this.setState({
            modalShow: false,
        });
    }
    render() {
        var modalBody = null;
        if (this.state.isRegisterSuccess) {
            modalBody = <div>
                <Modal.Body>{this.state.modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" href="/login" onClick={this.handleClose}>
                        Đồng ý
                </Button>
                </Modal.Footer>
            </div>
        } else {
            modalBody = <div>
                <Modal.Body>{this.state.modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Đồng ý
                </Button>
                </Modal.Footer>
            </div>
        }
        return (
            <div>
                <Modal centered show={this.state.modalShow} onHide={this.handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title contained-modal-title-vcenter="true">
                            Thông báo
                        </Modal.Title>
                    </Modal.Header>
                    {modalBody}
                </Modal>
                <div className="d-flex justify-content-center">
                    <Form id="register-form">
                        <Image className="rounded mx-auto d-block" height="200px" width="200px" alt="logo" src={logo} center="true"></Image>
                        <p className="title text-center">ĐĂNG KÝ</p>
                        <br />
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control onChange={this.handleUsernameChange} ref={this.username} placeholder="Ví dụ: haimeohung" />
                            <Form.Text className="text-danger">{this.state.usernameAlert}</Form.Text>

                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control onChange={this.handlePasswordChange} type="password" ref={this.password} placeholder="Ví dụ: ***" />
                                <Form.Text className="text-danger">{this.state.passwordAlert}</Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPassword2">
                                <Form.Label>Xác nhận Mật khẩu</Form.Label>
                                <Form.Control onChange={this.handlePassword2Change} type="password" ref={this.password2} placeholder="Ví dụ: ***" />
                                <Form.Text className="text-danger">{this.state.password2Alert}</Form.Text>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <br />
                            <Form.Control onChange={this.handleEmailChange} size="md" ref={this.email} type="text" placeholder="Ví dụ: a@gmail.com" />
                            <Form.Text className="text-danger">{this.state.emailAlert}</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Avatar</Form.Label>
                            <br />
                            <Form.File id="formcheck-api-custom" onChange={this.changeUploadFileName} custom>
                                <Form.File.Input onChange={this.changeUploadFileName} isValid />
                                <Form.File.Label data-browse="Tải lên">
                                    {this.state.uploadFileName}
                                </Form.File.Label>
                            </Form.File>
                        </Form.Group>

                        <Button disabled={!this.state.isRegisterSuccess}className="btn-block" onClick={this.register.bind(this)}>
                            Đăng ký
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    postRegister
}, dispatch);


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
);