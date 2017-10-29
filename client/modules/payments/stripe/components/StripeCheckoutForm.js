// CheckoutForm.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StripeCardForm from './StripeCardForm';
import StripeAboutForm from './StripeAboutForm';
import StripeErrorHandler from './StripeErrorHandler';
import { injectStripe } from 'react-stripe-elements';
import { stripePaymentRequest } from '../ducks';

const StripeLogo = ({ width, height }) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 468 222.5"
  >
    <style type="text/css">
      {`.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#6772E5;}`}
    </style>
    <g id="Stripe">
      <path
        className="st0"
        d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3
		c11.9,0,20.9-2.7,27.7-6.5V132c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z
		 M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z"
      />
      <path
        className="st0"
        d="M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22l0,116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3
		c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1
		c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z"
      />
      <polygon
        className="st0"
        points="223.8,61.7 248.9,56.3 248.9,36 223.8,41.3 	"
      />
      <rect x="223.8" y="69.3" className="st0" width="25.1" height="87.5" />
      <path
        className="st0"
        d="M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z"
      />
      <path
        className="st0"
        d="M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135
		c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z"
      />
      <path
        className="st0"
        d="M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6
		C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7
		c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z"
      />
    </g>
  </svg>
);

class StripeCheckoutForm extends Component {
  state = {
    error: undefined
  };

  handleSubmit = event => {
    event.preventDefault();
    const { activeCompany, dispatch, stripe, stripeForm } = this.props;

    if (!stripeForm) {
      return this.setState({
        error: {
          type: 'stripeForm',
          message: 'Please complete all missing fields'
        }
      });
    }
    // Gather additional customer data we may have collected in our form.

    const additionalData = {
      name: stripeForm.name ? stripeForm.value : undefined,
      address_line1: stripeForm.address ? stripeForm.address : undefined,
      address_city: stripeForm.city ? stripeForm.city : undefined,
      address_state: stripeForm.state ? stripeForm.state : undefined,
      address_zip: stripeForm.zip ? stripeForm.zip : undefined
    };

    stripe.createToken(stripe.elements[0], additionalData).then(payload => {
      console.log({ payload, additionalData });

      if (payload.error) {
        return this.setState({ error: payload.error });
      }

      this.setState({ error: undefined });
      dispatch(
        stripePaymentRequest({
          activeCompany,
          job: {},
          token: payload.token
        })
      );
    });
  };

  render() {
    const { error } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        id="StripeCheckoutForm"
        style={{ width: '100%', display: 'inline-block' }}
      >
        <CheckoutHeader>
          Payments powered by <StripeLogo width="80" />
        </CheckoutHeader>
        <CheckoutContainer>
          <StripeErrorHandler error={error} />
          <StripeAboutForm />
          <StripeCardForm error={error} />
        </CheckoutContainer>
      </form>
    );
  }
}

export default injectStripe(
  connect(state => ({
    stripeForm: state.form.stripe && state.form.stripe.values,
    activeCompany: state.account.companies.activeCompany
  }))(StripeCheckoutForm)
);

const CheckoutContainer = styled.div`
  width: 420px;
  margin: 0 auto;
  font-family: Source Code Pro, monospace;
`;

const CheckoutHeader = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fontFamily.avenir};
  background: #f9f8f7;
  font-size: 20px;
  font-weight: 800;
  padding: 16px;
  margin-bottom: 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
