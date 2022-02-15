import React, {useState} from 'react'
import Config from '../../config.json'
import { Container, Content, ButtonToolbar, Header, Navbar, FlexboxGrid, Panel, Form, FormGroup, ControlLabel, FormControl, Button } from 'rsuite'
import * as AuthenticationService from '../../services/authenticationService'
import {BrowserRouter as Router, Route, Redirect, useHistory} from 'react-router-dom'

function Login() {

	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit () {
	
		const response = await AuthenticationService.loginUser({
			email,
			password
		});

		console.log(response.msg);
		
		if(response.token){		
            localStorage.setItem('currentUser', email);
            localStorage.setItem('userToken', response.token);
			history.push('/app');//guardar en el localstorage (podriamos delegar la resp al auth service)
		}
	}

    return (
		<Container>
			<Header>
				<Navbar appearance="inverse">
				<Navbar.Header>
					<a className="navbar-brand logo"></a>
				</Navbar.Header>
				</Navbar>
			</Header>
			<Content style={{padding : 20}}>
				<FlexboxGrid justify="center">
					<FlexboxGrid.Item colspan={12}>
						<Panel header={<h3>Login</h3>} bordered>
							<Form fluid onSubmit={handleSubmit}>
								<FormGroup>
									<ControlLabel>Email address</ControlLabel>
									<FormControl type="text" name="email" onChange={setEmail}/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Password</ControlLabel>
									<FormControl name="password" type="password" onChange={setPassword}/>
								</FormGroup>
								<FormGroup>
									<ButtonToolbar>
										<Button appearance="primary" type="submit">Sign in</Button>
										<Button appearance="link">Forgot password?</Button>
									</ButtonToolbar>
								</FormGroup>
							</Form>
						</Panel>
					</FlexboxGrid.Item>
				</FlexboxGrid>
			</Content>
		</Container>
    );
}

export default Login;