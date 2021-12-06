import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DigitalClockClass extends Component {
  initDate = new Date();

  getTimezoneHours = (initDate, timezone) => {
    return (
      (timezone && (initDate.getUTCHours() + Number(timezone)) % 24) ||
      initDate.getHours()
    );
  };

  state = {
    sec: this.initDate.getSeconds(),
    min: this.initDate.getMinutes(),
    hour: this.getTimezoneHours(this.initDate, this.props.clock.timezone),
  };

  changeState = () => {
    this.setState((prevState) => {
      const date = new Date();
      const { sec, min, hour } = prevState;
      if (sec !== date.getSeconds()) return { sec: date.getSeconds() };
      if (min !== date.getMinutes()) return { min: date.getMinutes() };
      const currentHours = this.getTimezoneHours(
        date,
        this.props.clock.timezone
      );
      if (hour !== currentHours) return { hour: currentHours };
    });
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        this.changeState();
      }, 1000);
      this.changeState();
    }, 1000 - new Date().getMilliseconds());
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

  render() {
    const {
      clock: { id, city },
      onRemove,
    } = this.props;
    const { sec, min, hour } = this.state;
    return (
      <article className="Clock-widget">
        <h1>{city || 'Местное время'}</h1>

        <div className="Clock-digital">
          {hour < 10 ? '0' : null}
          {hour}:{min < 10 ? '0' : null}
          {min}:{sec < 10 ? '0' : null}
          {sec}
        </div>

        <button
          onClick={() => onRemove(id)}
          className="Clock-button button-remove"
        >
          &#10008;
        </button>
      </article>
    );
  }
}

DigitalClockClass.propTypes = {
  clock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};
