import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import axios from "axios";
import LeaderTable from "../../components/Leaderboard/LeaderTable";

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("/leaderboard")
      .then((res) => {
        return this.setState({
          data: Array.isArray(res.data) ? res.data : [],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    return this.state.data ? <LeaderTable data={this.state.data} /> : "";
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Leaderboard));
