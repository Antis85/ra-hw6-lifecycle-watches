import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddClockForm from './AddClockForm';
import DigitalClockClass from './DigitalClockClass';

export default function ClockPanel(props) {
  const { initArray, initForm } = props;
  const [array, setArray] = useState(initArray);
  const [form, setForm] = useState(initForm);

  const handleChange = ({ target }) => {
    setForm((prevForm) =>
      target.name === 'city'
        ? { ...prevForm, id: target.value, city: target.value }
        : { ...prevForm, timezone: target.value }
    );
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setArray((prevArray) => {
      const existClock = prevArray.find((exist) => exist.id === form.id);
      if (existClock) return [...prevArray];
      const newArray = [...prevArray, form];
      return newArray;
    });

    setForm({
      id: '',
      city: '',
      timezone: '',
    });
  };

  const handleRemove = (itemId) => {
    setArray((prevArray) => prevArray.filter((item) => item.id !== itemId));
  };

  const clockList = array.map((item) => (
    <DigitalClockClass key={item.id} clock={item} onRemove={handleRemove} />
  ));

  return (
    <>
      <AddClockForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <section className="Clockes-body">{clockList}</section>
    </>
  );
}

ClockPanel.propTypes = {
  initArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      timezone: PropTypes.string.isRequired,
    })
  ).isRequired,
  initForm: PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  }).isRequired,
};
