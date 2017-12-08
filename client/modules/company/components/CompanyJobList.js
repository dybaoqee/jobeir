import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router';

const CompanyJobList = ({ jobs }) => (
  <List>
    {jobs.map(
      ({ company, title, published, location: { address }, _id, pathname }) => (
        <ListItem>
          <StyledLink to={`/jobs/${pathname || _id}?r=${company.displayName}`}>
            <div>
              <JobTitle>{title}</JobTitle>
              <JobLocation>
                {address.locality} . posted {moment(published).fromNow()}
              </JobLocation>
            </div>
            <JobViewContainer>
              <JobView>
                <JobViewText>View</JobViewText> <LeftArrow />
              </JobView>
            </JobViewContainer>
          </StyledLink>
        </ListItem>
      ),
    )}
  </List>
);

export default CompanyJobList;

const LeftArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="18px"
    height="18px"
    viewBox="0 0 32 32"
    strokeWidth="2"
  >
    <g strokeWidth="2" transform="translate(0, 0)">
      <line
        data-cap="butt"
        data-color="color-2"
        fill="none"
        stroke="#0f0f17"
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="2"
        y1="16"
        x2="30"
        y2="16"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <polyline
        fill="none"
        stroke="#0f0f17"
        strokeWidth="2"
        strokeLinecap="square"
        strokeMiterlimit="10"
        points="21,7 30,16 21,25 "
        strokeLinejoin="miter"
      />
    </g>
  </svg>
);

const List = styled.ul`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  list-style: none;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.black};
  background: white;
  padding: 16px 24px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

const JobTitle = styled.h2`
  font-family: ${props => props.theme.fontFamily.tiempos};
  margin-bottom: 8px;
`;

const JobLocation = styled.div`opacity: 0.6;`;

const JobViewContainer = styled.div``;

const JobView = styled.div`
  display: flex;
  align-items: center;
`;

const JobViewText = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 6px 0 0;
`;
