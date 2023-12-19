'use client';

import { useEffect } from 'react';
import jsQR, { QRCode } from 'jsqr';
import { Point } from 'jsqr/dist/locator';

const decoder = (imageData: ImageData): Promise<QRCode> => {
  return new Promise((resolve) => {
    const decoded = jsQR(imageData.data, imageData.width, imageData.height);
    if (decoded) {
      resolve(decoded);
    }
  });
};

function drawLine(begin: Point, end: Point, color: string, el: CanvasRenderingContext2D) {
  el.beginPath();
  el.moveTo(begin.x, begin.y);
  el.lineTo(end.x, end.y);
  el.lineWidth = 4;
  el.strokeStyle = color;
  el.stroke();
}

export default function QRCodeReader() {
  const els: any = {};
  const setRefFactory = (key: string) => (element: any) => (els[key] = element);
  let canvasContext: CanvasRenderingContext2D;

  function runTime() {
    const { canvas, video } = els;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

      decoder(imageData).then((code) => {
        if (code) {
          drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58', canvasContext);
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58', canvasContext);
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58', canvasContext);
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58', canvasContext);
        }
      });
    }
    requestAnimationFrame(runTime);
  }

  function init() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      const { video } = els;
      video.srcObject = stream;
      video.play().then(() => {
        canvasContext = els.canvas.getContext('2d', { willReadFrequently: true });
        requestAnimationFrame(runTime);
      });
    });
  }

  useEffect(() => {
    init();
  });

  return (
    <>
      <canvas ref={setRefFactory('canvas')} style={{ display: 'block' }}></canvas>
      <video ref={setRefFactory('video')}></video>
    </>
  );
}
