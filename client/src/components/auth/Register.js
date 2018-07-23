import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
      super();
      this.state = {
        login: '',
        password: '',
        password2: ''
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
      if (this.props.auth.isAuthenticated) {
          this.props.history.push('/');
      }
  }

  onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
      e.preventDefault();
      const newUser = {
          login: this.state.login,
          password: this.state.password,
          password2: this.state.password2
      }

      this.props.registerUser(newUser, this.props.history);
  }

  render() {
    return (
        <div className="auth-form">
            <p className="login-text">Login</p>
            <div className="change">already have account?
                <Link to="/login"><button className="reg-button">Login</button></Link>
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
                <input 
                    className="password"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                />
                <button className="login-button">Register</button>
            </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));