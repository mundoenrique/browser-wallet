'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const DashLine = ({ symbol = '-', isContinuous = false, width = '100%' }) => {
  const [pattern, setPattern] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const charWidth = 8;
        const charCount = Math.floor(containerWidth / charWidth);

        let newPattern;
        if (isContinuous) {
          newPattern = symbol.repeat(charCount);
        } else {
          newPattern = Array.from({ length: charCount }, (_, i) => (i % 2 === 0 ? symbol : ' ')).join('');
        }

        setPattern(newPattern);
      }
    });

    if (containerRef.current) {
      const currentContainer = containerRef.current;
      resizeObserver.observe(currentContainer);

      return () => {
        if (currentContainer) {
          resizeObserver.unobserve(currentContainer);
        }
      };
    }
  }, [symbol, isContinuous]);

  return (
    <Box ref={containerRef} sx={{ width, overflow: 'hidden', textAlign: 'center' }}>
      <Typography variant="body1" component="div">
        {pattern}
      </Typography>
    </Box>
  );
};

export default DashLine;
