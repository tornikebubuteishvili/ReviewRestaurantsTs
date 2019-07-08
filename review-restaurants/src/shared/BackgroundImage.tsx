import React, { CSSProperties } from "react";

export default function BackgroundImage() {
  return (
    <div style={styles.divStyle}>
      <img
        src={"https://www.theriverside.co.uk/images/Inside-Restaurant.jpg"}
        style={styles.imgStyle}
      />
    </div>
  );
}

const styles = {
  divStyle: {
    width: window.innerWidth,
    height: window.innerHeight,
    position: "absolute",
    zIndex: -1,
    filter: "blur(8px)"
  } as CSSProperties,
  imgStyle: {
    width: window.innerWidth,
    height: window.innerHeight,
    objectFit: "cover"
  } as CSSProperties
};
