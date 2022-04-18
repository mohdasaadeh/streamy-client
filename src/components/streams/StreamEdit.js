import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";

import { editStream, fetchStream } from "../../actions";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderError({ error, touched }) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, meta, label }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label> {label} </label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (values) => {
    this.props.editStream(this.props.stream.id, values);

    console.log("Submitted!");
  };

  render() {
    const { handleSubmit } = this.props;

    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="title" />
        <Field
          name="description"
          component={this.renderInput}
          label="description"
        />
        <button type="submit" className="ui button primary">
          Submit
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Enter the title";
  }

  if (!formValues.description) {
    errors.description = "Enter the description";
  }

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const stream = state.streams[ownProps.match.params.id];

  return {
    stream,
    initialValues: _.pick(stream, "title", "description"),
  };
};

const wrappedForm = reduxForm({
  form: "streamEdit",
  validate,
  enableReinitialize: true,
})(StreamEdit);

export default connect(mapStateToProps, { editStream, fetchStream })(
  wrappedForm
);
