import React from 'react';
import Switch from 'react-switch';
import useDarkMode from 'use-dark-mode';

const DarkToggle = () => {
  const darkMode = useDarkMode(false);
  return (
    <Switch
      checked={darkMode.value}
      onChange={() => darkMode.toggle()}
      width={50}
      height={25}
      handleDiameter={18}
      offColor="#D2D2D2"
      onColor="#F1C945"
    />
  );
};

export default DarkToggle;
