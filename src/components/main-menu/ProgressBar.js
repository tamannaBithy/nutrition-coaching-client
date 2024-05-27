"use client";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/**
 * @component ProgressBar
 * @description Renders a circular progress bar with text content.
 * @param {number} myProps - The value for the progress bar.
 * @param {string} name - The name or label associated with the progress bar.
 * @returns {JSX.Element} The JSX representation of the ProgressBar component.
 */
export default function ProgressBar({ myProps, name }) {
  return (
    <>
      {/* Container with custom width for the circular progress bar */}
      <div className='custom_width'>
        <CircularProgressbarWithChildren
          value={myProps}
          //   text={`${myProps}`}
          styles={buildStyles({
            textSize: "20px",
            pathColor: `rgba(42, 86, 49, 1)`,
            textColor: "#092635",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}>
          {/* Content inside the circular progress bar */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              textTransform: "uppercase",
            }}>
            {/* Display the progress value */}
            {`${myProps}`}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              textTransform: "uppercase",
            }}>
            {/* Display the progress name (e.g., "Protein", "Fat") */}
            {`${name}`}
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </>
  );
}
