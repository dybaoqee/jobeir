import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../containers/FormWrapper';
import { Email, Password, SubmitButton, Text } from '../../inputs/input/';
import { email, minLength, required } from '../../validation';
import { signup, login } from '../../../auth/ducks';
import { queryParams } from '../../../../utils/queryParams';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(data) {
    const { dispatch } = this.props;
    const nextValue = queryParams(window.location.search).next;
    const redirectPathname = nextValue ? nextValue : '/account/dashboard';

    dispatch(signup(data, redirectPathname));
  }

  render() {
    return (
      <FormWrapper
        handleSubmit={this.props.handleSubmit}
        formSubmit={this.formSubmit}
        formErrors={this.props.auth.errors}
        theme="auth"
      >
        <Field
          name="firstName"
          placeholder="First name"
          validate={[required]}
          component={Text}
        />
        <Field
          name="lastName"
          placeholder="Last name"
          validate={[required]}
          component={Text}
        />
        <Field
          name="email"
          placeholder="Email address"
          validate={[required, email]}
          component={Email}
        />
        <Field
          name="password"
          placeholder="Create a password"
          validate={[required, minLength(6)]}
          component={Password}
        />
        <Field
          name="submitButton"
          buttonText="Sign up"
          ui={{ maxWidth: '100%' }}
          component={SubmitButton}
        />
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.session.auth
});

SignupForm = reduxForm({
  form: 'signup'
})(SignupForm);

export default connect(mapStateToProps)(SignupForm);
