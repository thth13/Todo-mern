import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
      super();
      this.state = {
          login: '',
          password: ''
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
      if (this.props.auth.isAuthenticated) {
          this.props.history.push('/');
      }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
          this.props.history.push('/');
      }
  }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
      e.preventDefault();
      const userData = {
          login: this.state.login,
          password: this.state.password
      }

      this.props.loginUser(userData);
  }

  render() {
    return (
        <div className="auth-form">
            <p className="login-text">Login</p>
            <div className="change">
                no have account?
                <Link to="/register"><button className="reg-button">Register</button></Link>
            </div>
            <div className="border" />
            <form onSubmit={this.onSubmit}>
                <input 
                    className="login"
                    placeholder="Username"
                    name="login"
                    value={this.state.login}
                    onChange={this.onChange}
                />
                <input 
                    className="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                />
                <button className="login-button">Login</button>
            </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);