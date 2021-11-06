import React, { useState } from 'react';
const SlideItem = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <i onClick={() => setOpen(!open)} className={props.icon}></i>
      {open && props.children}
    </React.Fragment>
  );
};

export default SlideItem;
