'use client';

import { useEffect } from 'react';
import jsQR, { QRCode } from 'jsqr';
//Typado
import { Point } from 'jsqr/dist/locator';

interface IQRCodeReader {
  readCode: (_data: string) => void;
}

const decoder = (imageData: ImageData): Promise<QRCode> => {
  return new Promise((resolve) => {
    const decoded = jsQR(imageData?.data, imageData?.width, imageData?.height);
    if (decoded) {
      resolve(decoded);
    }
  });
};

function drawLine(begin: Point, end: Point, color: string, el: CanvasRenderingContext2D | null) {
  el?.beginPath();
  el?.moveTo(begin.x, begin.y);
  el?.lineTo(end.x, end.y);
  el ? (el.lineWidth = 4) : null;
  el ? (el.strokeStyle = color) : null;
  el?.stroke();
}

/**
 * Generates the QR code used to create a socket.
 * @param readCode - Receive a promise with the data.
 */
export default function QRCodeReader({ readCode }: IQRCodeReader) {
  let videoElement: HTMLVideoElement;
  let canvasElement: HTMLCanvasElement;
  let canvasContext: CanvasRenderingContext2D | null;

  function runTime() {
    if (videoElement?.readyState === videoElement?.HAVE_ENOUGH_DATA) {
      canvasElement.height = videoElement?.videoHeight;
      canvasElement.width = videoElement?.videoWidth;
      canvasContext?.drawImage(videoElement, 0, 0, canvasElement?.width, canvasElement?.height);
      const imageData = canvasContext?.getImageData(0, 0, canvasElement?.width, canvasElement?.height);
      if (imageData) {
        decoder(imageData).then((code) => {
          if (code) {
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58', canvasContext);
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58', canvasContext);
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58', canvasContext);
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58', canvasContext);
            console.log('decoder:', code);
            const data = JSON.stringify(code.data);
            readCode(data);
          }
        });
      }
    }
    requestAnimationFrame(runTime);
  }

  function init() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      videoElement.srcObject = stream;

      videoElement.play().then(() => {
        canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
        requestAnimationFrame(runTime);
      });
    });
  }

  useEffect(() => {
    init();
  });

  return (
    <>
      <canvas
        ref={(el: HTMLCanvasElement) => {
          canvasElement = el;
        }}
        style={{ display: 'block' }}
      ></canvas>

      <video
        ref={(el: HTMLVideoElement) => {
          videoElement = el;
        }}
        hidden
        playsInline
      ></video>
    </>
  );
}
