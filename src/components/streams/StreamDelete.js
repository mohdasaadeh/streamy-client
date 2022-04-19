import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onModalDismiss() {
    history.push("/");
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure that you want to delete this stream?";
    }

    return `Are you sure that you want to delete the stream with title: ${this.props.stream.title}?`;
  }

  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="Delete a Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={this.onModalDismiss}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
