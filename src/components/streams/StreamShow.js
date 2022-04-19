import React from "react";
import { connect } from "react-redux";
import flvjs from "flv.js";

import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);

    if (this.props.stream) {
      if (flvjs.isSupported()) {
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: `http://localhost:8000/live/${id}.flv`,
        });
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();
      }
    }
  }

  componentWillUnmount() {
    this.flvPlayer.destroy();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{this.props.stream.title}</h1>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h5>{this.props.stream.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
