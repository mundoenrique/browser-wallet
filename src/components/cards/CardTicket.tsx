'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Avatar, Box, Button, Card } from '@mui/material';
import ShareIcon from '@mui/icons-material/ShareOutlined';
//Internal app
import { CardTicketProps } from '@/interfaces';
import { handleDownload } from '@/utils/toolHelper';
import { fuchsiaBlue } from '@/theme/theme-default';
import CheckCircleIcon from '%/images/arts/CheckCircleIcon';

/**
 * Card used to display the generated result
 *
 * @param children - Child elements.
 * @param textBotton - Button text when in ticket form.
 * @param download - Handle image download.
 * @param shared - Handles the action of sharing an image.
 * @param onClick - Action handling for a button.
 */
export default function CardTicket(props: CardTicketProps) {
  const { children, textBotton, download, shared, onClick } = props;
  const componentRef = useRef<any>(null);

  const handleDownloadClick = () => {
    handleDownload(componentRef.current, 'comprobante.png', fuchsiaBlue[800]);
  };

  const handleShare = async () => {
    const webShareSupported = 'canShare' in navigator;
    const shareData: any = { files: [] };

    try {
      const canvas = await html2canvas(componentRef.current, {
        removeContainer: false,
        allowTaint: true,
        backgroundColor: fuchsiaBlue[800],
      });
      if (webShareSupported) {
        const blob: Blob = await new Promise((resolve: any) => canvas.toBlob(resolve, 'image/png'));
        const file: File = new File([blob], 'cobro.png', { type: 'image/png' });
        shareData['files'].push(file);
        await navigator.share(shareData);
      } else {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'ticket.png';
        link.click();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ padding: '24px 4px 4px 4px', position: 'relative', mb: 3 }}>
      <Avatar
        sx={{
          bgcolor: fuchsiaBlue[50],
          position: 'absolute',
          top: '19px',
          left: '127px',
          zIndex: 2,
          width: 67,
          height: 67,
        }}
        variant="circular"
      >
        <CheckCircleIcon />
      </Avatar>
      <Card
        ref={componentRef}
        sx={{
          bgcolor: fuchsiaBlue[50],
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          pt: 7,
          px: 2,
          pb: 3 / 2,
          mask: 'radial-gradient(15px at 20px 100%, #0000 98%, #000) -20px',
        }}
      >
        {children}
      </Card>
      <Card
        sx={{
          bgcolor: fuchsiaBlue[50],
          borderRadius: '16px',
          borderTop: `2px dashed ${fuchsiaBlue[800]}`,
          borderTopWidth: '1px',
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          py: 3,
          mb: 3 / 2,
          gap: 3,
          mask: 'radial-gradient(15px at 20px 0, #0000 98%, #000) -20px',
        }}
      >
        {shared && (
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={handleShare}
            sx={{ minWidth: 52, '&> span': { mr: 0 } }}
          />
        )}

        {onClick && (
          <Button variant="contained" fullWidth onClick={onClick}>
            {textBotton}
          </Button>
        )}

        {download && (
          <Button variant="contained" fullWidth onClick={handleDownloadClick}>
            {textBotton}
          </Button>
        )}
      </Card>
    </Box>
  );
}
