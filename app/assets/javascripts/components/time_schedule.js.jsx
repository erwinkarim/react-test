var TimeListing = React.createClass({
  getInitialState: function(){
      return {times:this.props.times}
  },
  handleClick: function(){
      console.log('close attempted');
  },
  render: function(){
    return (
        <div>
          {this.props.times.map( (time,timeIndex) =>
            <div className="btn-group" key={timeIndex}>
              <button type="button" className="btn btn-secondary">{time}</button>
              <button type="button" className="btn btn-secondary" onClick={this.props.deleteTime} value={timeIndex}>
                <i className="fa fa-close"></i>
              </button>
            </div>
          )}
        </div>
    );
  }
});

var TimeSchedule = React.createClass({
  propTypes: {
    times: React.PropTypes.array
  },
  handleClick: function(e){
    var newTimeSchedule = this.state.times.concat(this.state.text);
    this.setState({times:newTimeSchedule, text:''});
  },
  getInitialState: function(){
      return { times:this.props.times, text:''};
  },
  handleChange: function(e){
      this.setState({text:e.target.value})
  },
  deleteTime: function(e){
      var timeIndex = parseInt(e.target.value, 10);
      this.setState(state => {
          state.times.splice(timeIndex,1);
          return {times: state.times};
      });
  },
  render: function() {
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div className="btn-toolbar">
            <TimeListing times={this.state.times} deleteTime={this.deleteTime} />
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-group">
            <input type="text" className="form-control" onChange={this.handleChange} value={this.state.text} />
            <button type="button" className="btn btn-secondary" onClick={this.handleClick}>
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </li>
      </ul>
    );
  }
});
