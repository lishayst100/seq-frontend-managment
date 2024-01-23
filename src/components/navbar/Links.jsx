import { useState } from "react";
import { LINKS } from "./navLinks";
import { NavLink } from "react-router-dom";



const Links = () => {
  const [selected, setSelected] = useState(null);

  const toggleSelected = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };


  return (
    <div className="links-social">
      {LINKS.map((link, index) => (
        <NavLink
        
          key={index}
          className={selected === index ? "selected link" : "link"}
          to={link.link}
          onClick={() => {
            toggleSelected(index);
          }}
        >
          {link.label}
        </NavLink>
      ))}
      
      
    </div>
  );
};

export default Links;
