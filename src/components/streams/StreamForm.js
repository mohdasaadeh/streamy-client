import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
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

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.props.onSubmit)}
        className="ui form error"
      >
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

export default reduxForm({
  form: "streamForm",
  validate,
  enableReinitialize: true,
})(StreamForm);
