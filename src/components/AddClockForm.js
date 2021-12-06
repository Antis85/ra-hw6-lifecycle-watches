import React from 'react';
import PropTypes from 'prop-types';

export default function AddClockForm(props) {
  const { form, onChange, onSubmit } = props;

  return (
    <form className="AddClockForm" onSubmit={onSubmit}>
      <div className="AddClockForm-inputs-wrapper">
        <div className="AddClockForm-input-wrapper city-wrapper">
          <label className="AddClockForm-label label-city" htmlFor="city">
            Название
          </label>
          <input
            className="AddClockForm-input input-city"
            id="city"
            name="city"
            value={form.id}
            type="text"
            required
            placeholder="Например, Москва..."
            onChange={onChange}
          />
        </div>

        <div className="AddClockForm-input-wrapper timezone-wrapper">
          <label
            className="AddClockForm-label label-timezone"
            htmlFor="timezone"
          >
            Временная зона
          </label>
          <input
            className="AddClockForm-input input-timezone"
            id="timezone"
            name="timezone"
            value={form.timezone}
            type="number"
            min="-12"
            max="12"
            required
            placeholder="От -12 до 12..."
            onChange={onChange}
          />
        </div>

        <button className="AddClockForm-submit" type="submit">
          Добавить
        </button>
      </div>
    </form>
  );
}

AddClockForm.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
