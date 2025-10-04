import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react"; // import useRef

const CustomWebcam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc1, setImgSrc1] = useState<string | null>(null);
  const [imgSrc2, setImgSrc2] = useState<string | null>(null);

  useEffect(() => {
    console.log({ imgSrc1, imgSrc2 });
  }, [imgSrc1, imgSrc2]);

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      if (!imgSrc1) setImgSrc1(imageSrc);
      else if (!imgSrc2) setImgSrc2(imageSrc);
    }
  }, [imgSrc1, imgSrc2]);

  return (
    <div className="container">
      {imgSrc1 && imgSrc2 ? (
        <>
          <img src={imgSrc1} alt="webcam" />
          <br />
          <img src={imgSrc2} alt="webcam" />
        </>
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
};

export default CustomWebcam;
