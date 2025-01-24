import React, { useContext } from 'react';
import './Footer.css';
import { CiLight } from 'react-icons/ci';
import { FaEllipsisH } from 'react-icons/fa';
import { IoWatch } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../store/ThemeContext';

const Footer = () => {
  const { bgColor, setBgColor, fontColor, setFontColor } =
    useContext(ThemeContext);

  const toggleTheme = () => {
    // Toggle between light mode and dark mode
    if (bgColor === 'white') {
      setBgColor('black');
      setFontColor('white');
    } else {
      setBgColor('white');
      setFontColor('black');
    }
  };

  const getSvgColor = (isActive) => {
    if (isActive) {
      return bgColor === 'white' ? 'black' : 'white'; // Active link color based on theme
    }
    return '#7E7E7E'; // Default inactive color
  };

  return (
    <>
      <div className="footer-container" style={{ background: bgColor }}>
        <div className="footer-main">
          <NavLink to="/" isActive={(match) => match != null}>
            {({ isActive }) => (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7582 6.34024C20.0025 4.94658 18.93 3.66992 17.5152 3.66992H5.84711C4.43222 3.66992 3.35981 4.94658 3.604 6.34024"
                  stroke={getSvgColor(isActive)}
                  stroke-width="1.5"
                />
                <path
                  d="M17.5559 3.67032C17.5863 3.39359 17.6014 3.25519 17.6017 3.1409C17.6041 2.04753 16.7805 1.12886 15.6933 1.0122C15.5797 1 15.4405 1 15.1622 1H8.2003C7.9219 1 7.78269 1 7.66904 1.0122C6.58192 1.12886 5.75837 2.04753 5.76075 3.14089C5.76099 3.25519 5.77615 3.39357 5.80645 3.67032"
                  stroke={getSvgColor(isActive)}
                  stroke-width="1.5"
                />
                <path
                  d="M14.8857 18.0898H8.47693"
                  stroke={getSvgColor(isActive)}
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M21.5011 16.801C21.1275 19.4509 20.9408 20.7758 19.9825 21.5693C19.0241 22.3627 17.6107 22.3627 14.7838 22.3627H8.57875C5.7519 22.3627 4.33847 22.3627 3.38015 21.5693C2.42184 20.7758 2.23503 19.4509 1.86142 16.801L1.40964 13.5966C0.933221 10.2175 0.695018 8.52797 1.70744 7.4344C2.71987 6.34082 4.52224 6.34082 8.12697 6.34082H15.2356C18.8403 6.34082 20.6427 6.34082 21.6551 7.4344C22.455 8.29836 22.4742 9.5343 22.2122 11.6815"
                  stroke={getSvgColor(isActive)}
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            )}
          </NavLink>

          <div onClick={toggleTheme}>
            <svg
              width="21"
              height="21"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3782 15.9908C13.9256 15.9908 15.9908 13.9256 15.9908 11.3782C15.9908 8.83074 13.9256 6.76562 11.3782 6.76562C8.83074 6.76562 6.76562 8.83074 6.76562 11.3782C6.76562 13.9256 8.83074 15.9908 11.3782 15.9908Z"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M20.6033 11.3789H21.7564"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M1 11.3789H2.15314"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M11.3782 20.6035V21.7567"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M11.3782 1V2.15314"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M17.9014 17.9014L18.7168 18.7168"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M4.03979 4.04004L4.85518 4.85544"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M4.85519 17.9014L4.03979 18.7168"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M18.7169 4.04004L17.9014 4.85544"
                stroke={fontColor === 'white' ? 'white' : '#7E7E7E'}
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <NavLink to="account">
            {({ isActive }) => (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.72683 11.6814C7.72683 11.8571 7.58441 11.9995 7.4087 11.9995C7.233 11.9995 7.09058 11.8571 7.09058 11.6814C7.09058 11.5057 7.233 11.3633 7.4087 11.3633C7.58441 11.3633 7.72683 11.5057 7.72683 11.6814Z"
                  stroke={getSvgColor(isActive)}
                  stroke-width="1.5"
                />
                <path
                  d="M11.9995 11.6814C11.9995 11.8571 11.8571 11.9995 11.6814 11.9995C11.5057 11.9995 11.3633 11.8571 11.3633 11.6814C11.3633 11.5057 11.5057 11.3633 11.6814 11.3633C11.8571 11.3633 11.9995 11.5057 11.9995 11.6814Z"
                  stroke={getSvgColor(isActive)}
                  stroke-width="1.5"
                />
                <path
                  d="M16.272 11.6814C16.272 11.8571 16.1296 11.9995 15.9539 11.9995C15.7782 11.9995 15.6357 11.8571 15.6357 11.6814C15.6357 11.5057 15.7782 11.3633 15.9539 11.3633C16.1296 11.3633 16.272 11.5057 16.272 11.6814Z"
                  stroke={getSvgColor(isActive)}
                  stroke-width="1.5"
                />
                <path
                  d="M22.3626 11.6813C22.3626 16.7164 22.3626 19.2341 20.7983 20.7983C19.2341 22.3626 16.7164 22.3626 11.6813 22.3626C6.64607 22.3626 4.12847 22.3626 2.56424 20.7983C1 19.2341 1 16.7164 1 11.6813C1 6.64607 1 4.12847 2.56424 2.56424C4.12847 1 6.64607 1 11.6813 1C16.7164 1 19.2341 1 20.7983 2.56424C21.8384 3.60432 22.187 5.06588 22.3037 7.40877"
                  stroke={getSvgColor(isActive)}
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Footer;
