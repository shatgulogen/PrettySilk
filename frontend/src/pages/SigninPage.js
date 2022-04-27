import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';

export default function SigninPage() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign in</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form>
                <FormGroup className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </FormGroup>

                <FormGroup className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
                </FormGroup>
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New customer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>
                        Create your account
                    </Link>
                </div>
            </Form>
        </Container>
    );
}
