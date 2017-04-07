import React from 'react';

import * as ProblemApi from '~/api/Problem';

import { Problem } from '~/components/Problem';

class OldProblem extends React.Component {
  static propTypes = {
    problem: React.PropTypes.object.isRequired,
    updateOldProblem: React.PropTypes.func.isRequired,
    removeOldProblem: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      speUpdateProblem: {},
      speDestroyProblem: {}
    };
  }

  save = (content) =>
    ProblemApi.update(
      (spe) => this.setState({ speUpdateProblem: spe }),
      this.props.problem.id,
      { content }
    )
      .then((updatedProblem) => {
        this.props.updateOldProblem(updatedProblem);
      });

  destroy = () => {
    ProblemApi.destroy(
      (spe) => this.setState({ speDestroyProblem: spe }),
      this.props.problem.id
    )
      .then(() => {
        this.props.removeOldProblem(this.props.problem.id);
      });
  }

  render = () =>
    <Problem
      mode="editing"
      saveFn={this.save}
      destroyFn={this.destroy}
      problemContent={this.props.problem.content}
    />
}

export { OldProblem };