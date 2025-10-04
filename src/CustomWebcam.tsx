import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react"; // import useRef

const CustomWebcam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc1, setImgSrc1] = useState<string | undefined>(undefined);
  const [imgSrc2, setImgSrc2] = useState<string | undefined>(undefined);
  const [imgSrc3, setImgSrc3] = useState<string | undefined>(undefined);
  const [imgSrc4, setImgSrc4] = useState<string | undefined>(undefined);
  const [photoStrip, setPhotoStrip] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log({ imgSrc1, imgSrc2, imgSrc3, imgSrc4 });

    if (imgSrc1 && imgSrc2 && imgSrc3 && imgSrc4) {
      const img1 = new Image();
      const img2 = new Image();
      const img3 = new Image();
      const img4 = new Image();

      img1.src = imgSrc1;
      img2.src = imgSrc2;
      img3.src = imgSrc3!;
      img4.src = imgSrc4!;

      img1.onload = () => {
        img2.onload = () => {
          img3.onload = () => {
            img4.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              const border = 5;
              canvas.width = img1.width + border * 2;
              canvas.height =
                img1.height +
                img2.height +
                img3.height +
                img4.height +
                border * 5;

              ctx!.fillStyle = "pink";
              ctx!.fillRect(0, 0, canvas.width, canvas.height);

              ctx!.drawImage(img1, border, border);
              ctx!.drawImage(img2, border, border * 2 + img1.height);
              ctx!.drawImage(
                img3,
                border,
                border * 3 + img1.height + img2.height
              );
              ctx!.drawImage(
                img4,
                border,
                border * 4 + img1.height + img2.height + img3.height
              );

              setPhotoStrip(canvas.toDataURL("image/png"));
            };
          };
        };
      };
    }
  }, [imgSrc1, imgSrc2, imgSrc3, imgSrc4]);

  // create a capture function
  const capture = useCallback(() => {
    setTimeout(() => {
      setImgSrc1(webcamRef.current?.getScreenshot()!);
    }, 3000);
    setTimeout(() => {
      setImgSrc2(webcamRef.current?.getScreenshot()!);
    }, 6000);
    setTimeout(() => {
      setImgSrc3(webcamRef.current?.getScreenshot()!);
    }, 9000);
    setTimeout(() => {
      setImgSrc4(webcamRef.current?.getScreenshot()!);
    }, 12000);
  }, []);

  if (
    imgSrc1 === undefined ||
    imgSrc2 === undefined ||
    imgSrc3 === undefined ||
    imgSrc4 === undefined
  ) {
    return (
      <div className="container">
        <Webcam height={600} width={600} ref={webcamRef} />
        <div className="btn-container">
          <button onClick={capture}>Capture photo</button>
        </div>
      </div>
    );
  }

  return <img src={photoStrip!} alt="webcam" />;
};

export default CustomWebcam;
