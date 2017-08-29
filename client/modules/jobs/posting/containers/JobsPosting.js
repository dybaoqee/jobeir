// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import styled from 'styled-components';
import { serverGetJob } from '../server/';
import { shouldGetJob, getJobPosting, resetJobPosting } from '../ducks/';
import JobPosting from '../../../account/jobs/posting/containers/JobPosting';
import JobsPostingReturn from '../components/JobsPostingReturn';

@asyncConnect([
  {
    promise: ({ store: { dispatch, getState }, helpers: { req } }) => {
      const state = getState();

      if (shouldGetJob(state)) {
        return dispatch(serverGetJob(req.originalUrl, req));
      }
    }
  }
])
class JobsPosting extends Component {
  componentDidMount() {
    const { dispatch, isLoaded, params } = this.props;

    if (!isLoaded) {
      dispatch(getJobPosting(params.id));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetJobPosting());
  }

  render() {
    const { params, posting } = this.props;

    return (
      <JobsPostingContainer>
        <JobsPostingReturn />
        <JobPosting activePosting={posting} params={params} />
      </JobsPostingContainer>
    );
  }
}

const mapStateToProps = state => ({
  posting: state.posting.posting,
  isLoaded: state.posting.isLoaded
});

export default connect(mapStateToProps)(JobsPosting);

const JobsPostingContainer = styled.div`
  max-width: 670px;
  margin: 0 auto;
`;
