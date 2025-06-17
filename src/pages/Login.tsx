import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col, Image } from 'react-bootstrap';
import { Check, Facebook, Google, Linkedin, Twitter } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import loginPic from '../assets/login_pic.svg';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validated, setValidated] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [keepSignedIn, setKeepSignedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password: string) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            setError(
                'Password must be at least 8 characters long (with 1 Capital letter, 1 number & 1 symbol)'
            );
            return;
        }

        if (keepSignedIn) {
            localStorage.setItem('token', JSON.stringify({ email, keepSignedIn }));
        } else {
            sessionStorage.setItem('token', JSON.stringify({ email, keepSignedIn }));
        }

        setError('');
        navigate('/home');
    };

    const loginIcons = [Google, Facebook, Twitter, Linkedin];

    return (
        <Container fluid className="login-container min-vh-100 d-flex justify-content-center align-items-center">
            <Row className="login-container w-100 justify-content-center">
                <Col xs={12} md={6} className="p-4 justify-content-start">
                    <h2 className="text-start fw-bold mb-3">Sign In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <p className="text-start fw-bold mb-4">
                        New user?<a className="text-custom-blue ms-2" href="/register">Create an account</a>
                    </p>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="formEmail">
                            <Form.Control
                                type="email || username"
                                placeholder="username or email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className='custom-form-control fw-semibold small'
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formPassword ">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className='custom-form-control fw-semibold small'
                            />
                            <Form.Control.Feedback type="invalid">
                                Password is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formKeepSignedIn">
                            <div className="d-flex align-items-center gap-2 custom-check-container">
                                <Form.Check
                                    type="checkbox"
                                    id="keepSignedIn"
                                    checked={keepSignedIn}
                                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                                    className="custom-checkbox position-relative"
                                />
                                <label htmlFor="keepSignedIn" className="form-check-label small fw-semibold ms-2">
                                    Keep me signed in
                                </label>
                                {keepSignedIn && (
                                    <Check
                                        className="check-icon"
                                        style={{
                                            backgroundColor: keepSignedIn ? '#3d3d3d' : 'transparent',
                                        }}
                                    />
                                )}
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="custom-button w-100">
                            Login
                        </Button>
                    </Form>
                    <div className="d-flex align-items-center my-5">
                        <hr className="flex-grow-1" />
                        <span className="px-2 small fw-semibold">or sign in with</span>
                        <hr className="flex-grow-1" />
                    </div>
                    <div className="d-flex justify-content-center">
                        {loginIcons.map((Icon, i) => (
                            <div key={i} className="d-flex align-items-center justify-content-center mx-2 icon-circle">
                                <Icon size={20} className="text-muted" />
                            </div>
                        ))}
                    </div>
                </Col>
                <Col
                    md={6}
                    className="d-none d-md-flex align-items-center justify-content-end"
                >
                    <Image
                        src={loginPic}
                        alt="login-pic"
                        loading="lazy"
                        fluid
                        style={{ maxHeight: '480px' }}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
