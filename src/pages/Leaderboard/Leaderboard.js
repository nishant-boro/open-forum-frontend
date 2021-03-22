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
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/leaderboard")
      .then((res) => {
        this.setState({ loading: false });
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
    return this.state.data ? (
      <LeaderTable isLoading={this.state.loading} data={this.state.data} />
    ) : (
      ""
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Leaderboard));
