// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styled from 'styled-components';
import { media } from '../../../styles/breakpoints';
import AuthOAuth from '../../auth/components/AuthOAuth';
import AppHead from '../../app/components/AppHead';

const Pricing = (props: { activeCompany: { _id: string } }) => {
  const { _id } = props.activeCompany;
  const link: string = _id
    ? `/create/job/about/${_id}`
    : '/create/company/about';

  return (
    <PricingContainer>
      <AppHead title="Pricing" />
      <TopHeaderContainer>
        <PricingAmountContainer>
          <PricingAmountContent>
            <PricingCurrency>$</PricingCurrency>
            <PricingAmount>0</PricingAmount>
            <PricingTerm>per job post</PricingTerm>
          </PricingAmountContent>
          <BetaText>
            Original price, $49 per job post, does not apply for launch period.
            *This is a limited time offer*
          </BetaText>
          <AuthOAuth />
          <TermsText>
            By clicking “Continue with Google", or “Continue with Twitter" or
            “Continue with Github", you agree to our{' '}
            <StyledTermsLink to="/terms-of-service">
              Terms of Service
            </StyledTermsLink>{' '}
            and{' '}
            <StyledTermsLink to="/privacy-policy">
              Privacy Policy
            </StyledTermsLink>.
          </TermsText>
        </PricingAmountContainer>
        <PricingIncludesContainer>
          <PricingIncludesContent>
            <List>
              <ListItem>
                <ListHeader>Reach top tech talent</ListHeader>
                <ListSubheader>
                  Job postings are also shared amongst all our social media
                  channels and developer pools.
                </ListSubheader>
              </ListItem>
              <ListItem>
                <ListHeader>Show case your company amongst the best</ListHeader>
                <ListSubheader>
                  We work with the best companies in tech to help them find the
                  talent they need. Gain access to a high quality talent pool.
                </ListSubheader>
              </ListItem>
              <ListItem>
                <ListHeader>45 days of active listing, minimum.</ListHeader>
                <ListSubheader>
                  If you're not happy with the results we'll gladly extend your
                  posting length. Our goal is to find you the best talent
                  possible.
                </ListSubheader>
              </ListItem>
            </List>
          </PricingIncludesContent>
        </PricingIncludesContainer>
      </TopHeaderContainer>
      <ImageContainer>
        <StyledImage
          src="/public/static/imgs/pricing/tech-companies-grey-scale-logos-single-row-light-grey.png"
          alt="Airbnb, Stripe, Shopify, Dropbox, Asana, Slack, Shopify"
        />
      </ImageContainer>
    </PricingContainer>
  );
};

const mapStateToProps = state => ({
  activeCompany: state.account.companies.activeCompany,
});

export default connect(mapStateToProps)(Pricing);

const PricingContainer = styled.div`
  max-width: 1052px;
  margin: 0 auto;
  width: 100%;
  display: block;
  padding: 75px 0 0;

  ${media.tablet`
    padding: 0;
  `};
`;

const TopHeaderContainer = styled.div`
  display: flex;
  position: relative;
  border-radius: 3px;
  margin: 0 auto 50px;

  ${media.desktop`
    flex-direction: column;
  `};
`;

const PricingIncludesContainer = styled.div`
  flex: 1;
  background: ${props => props.theme.colors.grey.bg};
`;

const PricingIncludesContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 75px;

  ${media.desktop`
    padding: 50px;
  `};
`;

const List = styled.ul`list-style: none;`;

const ListItem = styled.ul`
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }

  ${media.tablet`
    margin-bottom: 20px;
  `};
`;

const ListHeader = styled.h3`
  font-family: ${props => props.theme.fontFamily.tiempos};
  list-style: none;
  font-size: 38px;
  margin-bottom: 12px;

  ${media.tablet`
    font-size: 26px;
    margin-bottom: 8px;
  `};
`;

const ListSubheader = styled.p`
  list-style: none;
  line-height: 1.6;
  color: ${props => props.theme.colors.grey.mid};
`;

const PricingAmountContainer = styled.div`
  margin: 40px;
  padding: 30px 50px;
  box-shadow: 0 5px 30px -6px rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: 2px;
  width: 420px;

  &::before {
    content: '';
    background: ${props => props.theme.colors.grey.bg};
    position: absolute;
    top: 0;
    left: 250px;
    height: 100%;
    width: 500px;
    z-index: -1;
  }

  ${media.desktop`
    margin: 0 auto 25px;

    &::before {
      content: none;
    }
  `};

  ${media.phablet`
    margin: 0 auto;
  `};
`;

const PricingAmountContent = styled.div`
  position: relative;
  display: flex;
  align-self: flex-start;
  font-family: ${props => props.theme.fontFamily.tiempos};
  margin-bottom: 30px;

  ${media.tablet`
    margin-bottom: 16px;
  `};
`;

const PricingAmount = styled.div`
  font-size: 124px;
  font-weight: 800;
  margin-left: 5px;

  ${media.tablet`
    font-size: 100px;
  `};
`;

const PricingTerm = styled.div`
  position: relative;
  bottom: 24px;
  left: 10px;
  font-size: 24px;
  align-self: flex-end;
`;

const PricingCurrency = styled.div`
  position: relative;
  top: 30px;
  font-size: 60px;

  ${media.tablet`
    font-size: 50px;
    top: 20px;
  `};
`;

const StyledImage = styled.img`width: 100%;`;

const ImageContainer = styled.div`
  display: inline-block;
  margin: 75px auto 150px;
`;

const TermsText = styled.p`
  color: ${props => props.theme.colors.grey.mid};
  line-height: 1.6;
  margin-top: 50px;

  ${media.tablet`
    margin-top: 16px;
  `};
`;
const BetaText = styled.p`
  color: ${props => props.theme.colors.black};
  line-height: 1.6;
  margin: 0 auto 20px;

  ${media.tablet`
    margin-top: 16px;
  `};
`;

const StyledTermsLink = styled(Link)`
  text-decoration: underline;
  text-decoration-skip: ink;
  color: ${props => props.theme.colors.black};
`;
