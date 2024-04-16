import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { notValid, emailValidation } from "../../utils/validations";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Login } from "../../redux/actions/auth.actions";

function SignInModel() {
    const dispatch = useDispatch();
    const intialValue = { email: '', password: '' };
    const alertValue = { message: '', show: false, variant: '' };
    const [alert, setAlert] = useState(alertValue)
    const [user, setUser] = useState(intialValue);
    const [error, setError] = useState(intialValue);
    const [loading, setLoading] = useState(false);
    const [errorApi, setErrorApi] = useState(false);
    const [apiError, setApiError] = useState('')
    const apiResult = useSelector(state => state.auth);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        setError({ ...error, [name]: '' })
    }

    const isValid = () => {
        let isValid = true
        let passwordErrorMessage = "Please provide password";
        let email = "Please enter your email";
        let validEmail = "Please enter a valid email address"
        let errorMessages = {};

        if (notValid(user.email)) {
            errorMessages['email'] = email;
            isValid = false;
        } else if (!emailValidation(user.email)) {
            errorMessages['email'] = validEmail;
            isValid = false;
        }

        if (notValid(user.password)) {
            errorMessages['password'] = passwordErrorMessage;
            isValid = false;
        }

        if (!isValid) {
            setError({ ...error, ...errorMessages });
        }

        return isValid;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isValid()) {
            setLoading(true)
            await dispatch(Login(user))
            setErrorApi(true)
            setLoading(false)

        }
    }

    useEffect(() => {
        if (errorApi) {
            if (apiResult.error) {
                alert['show'] = true
                alert['message'] = apiResult.error
                alert['variant'] = "danger"
                setApiError(apiResult.error)
            }
        }
    }, [errorApi])

    useEffect(() => {
        if (apiResult && apiResult.token) {
            alert['show'] = true
            alert['message'] = 'Success'
            alert['variant'] = "success"
        }

    }, [apiResult])

    const showAlertMessage = () => {
        return (
            <Alert variant={alert.variant}> {alert['message']} </Alert>
        )
    }

    return (
        <>
            <div className="main-sign-up-form">
                <Container>
                    <Row>
                        <Col sm={12} lg={12} className="pl-0">
                            <h2 className="mb-4">Login Page</h2>
                            <Form onSubmit={onSubmit}>
                                {alert['show'] && showAlertMessage()}
                                <Form.Group className="form-group mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                        name="email"
                                        value={user.email}
                                        onChange={handleChangeInput}
                                    />
                                </Form.Group>
                                <Form.Group className="form-group mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={user.password || ''}
                                        onChange={handleChangeInput}
                                    />
                                </Form.Group>
                                <p>Don’t have an account? <span
                                    className="color-signUp-span">
                                    <Link to="/sign-up">Sign Up</Link></span></p>
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? 'Please Wait...' : 'Login'}
                                </Button>
                            </Form>

                        </Col>
                    </Row>
                </Container>
            </div>
        </>




    )
}

export default SignInModel