'use client';
import jsQR from 'jsqr';
import { useEffect } from 'react';

const decoder = (imageData) =>
  new Promise((resolve) => {
    const decoded = jsQR(imageData.data, imageData.width, imageData.height);
    if (decoded) resolve(decoded);
    else resolve();
  });

function drawLine(begin, end, color, el) {
  el.beginPath();
  el.moveTo(begin.x, begin.y);
  el.lineTo(end.x, end.y);
  el.lineWidth = 4;
  el.strokeStyle = color;
  el.stroke();
}

export default function QRCodeReader() {
  const els: any = {};
  const setRefFactory = (key: any) => (element: any) => (els[key] = element);
  function runTime() {
    const { canvas, video } = els;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

      decoder(imageData).then((result) => {
        if (result) {
          console.log(result);
        }
      });
    }
    requestAnimationFrame(runTime);
  }

  function init() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
      const { video } = els;
      video.srcObject = stream;
      video.play().then(() => {});
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
