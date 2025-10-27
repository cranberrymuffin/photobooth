import "./Photobooth.css";
import Webcam from "react-webcam";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const Photobooth = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc1, setImgSrc1] = useState<string | undefined>(undefined);
  const [imgSrc2, setImgSrc2] = useState<string | undefined>(undefined);
  const [imgSrc3, setImgSrc3] = useState<string | undefined>(undefined);
  const [imgSrc4, setImgSrc4] = useState<string | undefined>(undefined);
  const [photoStrip, setPhotoStrip] = useState<string | undefined>(undefined);
  const [isTakingPhotos, setIsTakingPhotos] = useState<boolean>(false);
  const [isTakingPhoto, setIsTakingPhoto] = useState<boolean>(false);

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
                border * 3 + img1.height + img2.height,
              );
              ctx!.drawImage(
                img4,
                border,
                border * 4 + img1.height + img2.height + img3.height,
              );

              setPhotoStrip(canvas.toDataURL("image/png"));
            };
          };
        };
      };
    }
  }, [imgSrc1, imgSrc2, imgSrc3, imgSrc4]);

  function capturePhoto(
    photoNumber: number,
    setImgSrc: Dispatch<SetStateAction<string | undefined>>,
  ) {
    setTimeout(
      () => {
        setIsTakingPhoto(true);
      },
      startDelay * photoNumber + photoTakingTime * (photoNumber - 1),
    );
    setTimeout(
      () => {
        setImgSrc(webcamRef.current?.getScreenshot()!);
        setIsTakingPhoto(false);
      },
      (startDelay + photoTakingTime) * photoNumber,
    );
  }

  const startDelay = 3000;
  const photoTakingTime = 1000;

  const capture = useCallback(() => {
    setIsTakingPhotos(true);
    capturePhoto(1, setImgSrc1);
    capturePhoto(2, setImgSrc2);
    capturePhoto(3, setImgSrc3);
    capturePhoto(4, setImgSrc4);
  }, []);

  function getBulbClass() {
    return isTakingPhoto ? "bulb-on" : "bulb";
  }

  if (
    imgSrc1 === undefined ||
    imgSrc2 === undefined ||
    imgSrc3 === undefined ||
    imgSrc4 === undefined
  ) {
    return (
      <div
        className={
          isTakingPhoto
            ? "container photo-booth taking-photo"
            : "container photo-booth"
        }
      >
        <div
          className={
            isTakingPhotos
              ? isTakingPhoto
                ? "picture-time"
                : "instruction-banner"
              : "title-banner"
          }
        >
          {isTakingPhotos
            ? isTakingPhoto
              ? "smile!"
              : "wait for the camera"
            : "Welcome to the photo booth!"}
        </div>

        <div className="btn-container"></div>
        <div id="booth">
          <div className="bulb-container top-row">
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
          </div>

          <div className="bulb-container left-column">
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
          </div>

          <Webcam className="webcam" ref={webcamRef} />

          <div className="bulb-container right-column">
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
          </div>

          <div className="bulb-container bottom-row">
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
            <div className={getBulbClass()}></div>
          </div>
        </div>
        <button onClick={capture} hidden={isTakingPhotos}>
          Capture photos
        </button>
      </div>
    );
  }

  return <img src={photoStrip!} alt="webcam" />;
};

export default Photobooth;
