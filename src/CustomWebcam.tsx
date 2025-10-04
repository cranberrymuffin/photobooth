import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react"; // import useRef

const CustomWebcam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc1, setImgSrc1] = useState<string | undefined>(undefined);
  const [imgSrc2, setImgSrc2] = useState<string | undefined>(undefined);
  const [photoStrip, setPhotoStrip] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log({imgSrc1, imgSrc2});

    if (imgSrc1 && imgSrc2) {
      const img1 = new Image();
      const img2 = new Image();
      img1.src = imgSrc1;
      img2.src = imgSrc2;
      img1.onload = () => {
        img2.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const border = 5
          canvas.width = img1.width + border * 2;
          canvas.height = img1.height + img2.height + border * 3;

          ctx!.fillStyle = "pink"
          ctx!.fillRect(0, 0, canvas.width, canvas.height);

          ctx!.drawImage(img1, border, border)
          ctx!.drawImage(img2, border, border * 2 + img1.height);

          setPhotoStrip(canvas.toDataURL("image/png"))

        }
      }
    }

  }, [imgSrc1, imgSrc2]);

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      if (!imgSrc1) setImgSrc1(imageSrc);
      else if (!imgSrc2) setImgSrc2(imageSrc);
    }
  }, [imgSrc1, imgSrc2]);

  if (imgSrc1 === undefined || imgSrc2 === undefined) {
    return (
        <div className="container">
          {imgSrc1 && imgSrc2 ? (
              <>
                <img src={imgSrc1} alt="webcam"/>
                <br/>
                <img src={imgSrc2} alt="webcam"/>
              </>
          ) : (
              <Webcam height={600} width={600} ref={webcamRef}/>
          )}
          <div className="btn-container">
            <button onClick={capture}>Capture photo</button>
          </div>
        </div>
    );
  }

  return <img src={photoStrip!} alt="webcam"/>


};

export default CustomWebcam;
