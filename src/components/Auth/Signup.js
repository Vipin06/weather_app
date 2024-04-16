import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { notValid, emailValidation } from "../../utils/validations";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createAccount } from "../../redux/actions/auth.actions";

function SignUpModel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intialValue = { name: '', email: '', password: '', confirmPassowrd: '' };
    const alertValue = { message: '', show: false, variant: '' };
    const [alert, setAlert] = useState(alertValue)
    const [user, setUser] = useState(intialValue);
    const [termsChecked, setTermsChecked] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorApi, setErrorApi] = useState(false);
    const [apiError, setApiError] = useState('');
    const apiResult = useSelector(state => state.auth);

    const handleChangeInput = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value })
        setError({ ...error, [name]: '' })
    }


    const handleCheckboxChange = (e) => {
        setTermsChecked(e.target.checked);
    }

    const isValid = () => {
        let isValid = true
        let passwordErrorMessage = "Please provide password";
        let email = "Please enter your email";
        let validEmail = "Please enter a valid email address"
        let errorMessages = {};
        if (notValid(user.name)) {
            errorMessages['name'] = 'Name is required'
            isValid = false;
        }
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

        if (user.password && user.password.length < 8) {
            errorMessages['password'] = 'Password, minimum length must be 8';
            isValid = false;
        }

        if (notValid(user.confirmPassowrd)) {
            errorMessages['confirmPassowrd'] = 'Confirm password is required'
            isValid = false;
        }
        if (user.password !== user.confirmPassowrd) {
            errorMessages['confirmPassowrd'] = ' Password do not match'
            isValid = false;
        }

        if (!termsChecked) {
            errorMessages['termsChecked'] = 'Please Accept Term & Conditions'
            isValid = false;

        }

        if (!isValid) {
            setError({ ...error, ...errorMessages });
        }

        return isValid;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        if (isValid()) {
            setLoading(true)
            dispatch(createAccount(user))
        }
    }


    useEffect(() => {
        console.log("apiResult",apiResult)
        if (apiResult?.error) {
            alert['show'] = true
            alert['message'] = apiResult?.error?.message ? apiResult?.error?.message : apiResult.error
            alert['variant'] = "danger"
            setApiError(apiResult.error)
            setLoading(false)
        }

        if (apiResult && apiResult.created_Account) {
            alert['show'] = true
            alert['message'] = apiResult.created_Account
            alert['variant'] = "success"
            setLoading(false)
            setTimeout(() => {
                navigate('/sign-in')
            }, 1000);
        }

        if (apiResult && apiResult.token) {
            alert['show'] = true
            alert['message'] = 'Success'
            alert['variant'] = "success"
        }
    }, [apiResult])

    useEffect(()=>{
        alert['show'] = false
    },[])

    const showAlertMessage = () => {
        return (
            <Alert variant={alert.variant}> {alert['message']} </Alert>
        )
    }

    return (
        <div className="main-sign-up-form">
            <Container>
                <Row>
                    <Col sm={12} lg={12} className="pl-0">
                         <h2 className="mb-4">Create Account</h2>
                        <Form onSubmit={onSubmit}>
                            {alert['show'] && showAlertMessage()}
                            <Row>
                                <Form.Group className="form-group col-sm-12 mb-3">
                                    <Form.Control type="text" placeholder="Name" name="name" value={user.name} onChange={handleChangeInput} />
                                    {error.name && <span className="error error-message">{error.name}</span>}
                                </Form.Group>
                                <Form.Group className="form-group col-sm-12 mb-3">
                                    <Form.Control type="email" placeholder="Email Address" name="email" value={user.email} onChange={handleChangeInput} />
                                    {error.email && <span className="error error-message">{error.email}</span>}
                                </Form.Group>
                                <Form.Group className="form-group col-sm-12 mb-3">
                                    <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleChangeInput} />
                                    {error.password && <span className="error error-message">{error.password}</span>}
                                </Form.Group>
                                <Form.Group className="form-group col-sm-12 mb-3">
                                    <Form.Control type="password" placeholder="Confirm Password" name="confirmPassowrd" value={user.confirmPassowrd} onChange={handleChangeInput} />
                                    {error.confirmPassowrd && <span className="error error-message">{error.confirmPassowrd}</span>}
                                </Form.Group>
                            </Row>
                            <Form.Group className="form-group form--checkbox mb-0">
                                <Form.Check type="checkbox" label="I accept the site terms & conditions" checked={termsChecked} onChange={handleCheckboxChange} />
                            </Form.Group>
                            {error.termsChecked && <span className="error error-message">{error.termsChecked}</span>}
                            <p>Already have an account? <span className="color-signUp-span">
                               <Link to="/sign-in">Login here </Link></span></p>
                            <Button variant="primary" type="submit" className="mt-3">
                                {loading ? 'Please Wait...' : 'Register'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignUpModel